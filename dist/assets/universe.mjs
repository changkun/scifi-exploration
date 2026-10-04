import * as THREE from './vendor/three.module.min.js';
import { publish, setControl } from './atlas-store.mjs';

/**
 * 3D atlas. Every record handed to mountUniverse is one star, and nothing else in the scene is
 * drawn as a star, so the field can be read as the collection itself. Three lenses arrange the
 * same stars: by story scale (Earth outwards), by publication year, and by primary topic.
 * Star brightness is research depth. Positions are reading aids, not astronomy.
 */

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const PAGE = 25;
const FOV = 38;
const NO_YEAR = 1e6;

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const number = value => Number(value).toLocaleString('zh-CN');
const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
const list = value => Array.isArray(value) ? value : [];
const yearOf = work => Number.isFinite(work.sort_year) ? work.sort_year : Number.isFinite(work.first_year) ? work.first_year : null;
const titleOf = work => work.title_zh || work.title || '标题未知';
// Deterministic scatter: the same record lands in the same place on every visit.
const scatter = (index, salt) => { const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453; return x - Math.floor(x); };
const gaussian = (index, salt) => Math.sqrt(-2 * Math.log(Math.max(1e-6, scatter(index, salt)))) * Math.cos(2 * Math.PI * scatter(index, salt + 11));

const ZONES = [
  { id: 'earth', name: '地球与社会', code: '01', inner: 3.3, outer: 5.2, description: '城市、海洋、地底与社会生活。从人的日常处境出发，检验制度、身体与技术。' },
  { id: 'planetary', name: '行星与轨道', code: '02', inner: 7.4, outer: 9.8, description: '地月、太阳系与虚构行星。航行、生态改造、资源与行星社会。' },
  { id: 'interstellar', name: '恒星际与深空', code: '03', inner: 12.4, outer: 15.2, description: '恒星之间的航行与深空遭遇。距离、通信与陌生生命改变理解和合作的条件。' },
  { id: 'galactic', name: '星系与文明网络', code: '04', inner: 18.4, outer: 22.2, description: '帝国、文明网络与银河舞台。多种主体相遇时，秩序、语言与长期历史如何被组织。' },
  { id: 'cosmic', name: '宇宙与演化', code: '05', inner: 26, outer: 30.5, description: '宇宙的生成、消亡与整体工程。人的选择面对远超生命尺度的条件。' },
  { id: 'abstract', name: '抽象与多维', code: '06', ring: 17, description: '几何、模拟、梦境与平行世界。它不在尺度阶梯上，所以画成一道与各层相交的斜环。' }
];
const UNCHARTED = { id: 'unknown', name: '未测绘', code: '07', inner: 36, outer: 64, description: '还没有空间判断的记录。外圈光带只是排列，不代表故事发生的位置；这里不按年份、体裁或作者推断空间。' };
const ALL_ZONES = [...ZONES, UNCHARTED];
const zoneById = new Map(ALL_ZONES.map(zone => [zone.id, zone]));

const ERAS = [
  { id: 'before1800', name: '1800 年以前', note: '早期与前史', min: null, max: 1799 },
  { id: '1800', name: '1800—1899', note: '工业与远航', min: 1800, max: 1899 },
  { id: '1900', name: '1900—1939', note: '现代类型成形', min: 1900, max: 1939 },
  { id: '1940', name: '1940—1959', note: '太空与系统', min: 1940, max: 1959 },
  { id: '1960', name: '1960—1979', note: '社会与意识', min: 1960, max: 1979 },
  { id: '1980', name: '1980—1999', note: '网络与后人类', min: 1980, max: 1999 },
  { id: '2000', name: '2000—2009', note: '技术与风险', min: 2000, max: 2009 },
  { id: '2010', name: '2010—2019', note: '多元文明', min: 2010, max: 2019 },
  { id: '2020', name: '2020 年及以后', note: '当代与未来年份', min: 2020, max: null }
];
const eraIndexOf = year => year === null ? -1 : ERAS.findIndex(era => (era.min === null || year >= era.min) && (era.max === null || year <= era.max));

const LEVELS = [
  { id: 'bibliographic', name: '基础书目', size: 1, alpha: .5 },
  { id: 'candidate', name: '议题候选', size: 1.3, alpha: .74 },
  { id: 'enriched', name: '知识补充', size: 1.75, alpha: .92 },
  { id: 'researched', name: '已有研究', size: 2.7, alpha: 1 }
];
const levelIndexOf = work => Math.max(0, LEVELS.findIndex(level => level.id === work.research_level));

const LENSES = [
  { id: 'scale', name: '尺度', hint: '从地球到宇宙' },
  { id: 'time', name: '时间', hint: '发表年代的长河' },
  { id: 'topic', name: '议题', hint: '按底层问题聚成星团' }
];

// The time axis is compressed before 1900, where records are sparse.
const TIME_KNOTS = [[100, -62], [1500, -55], [1800, -45], [1900, -29], [2030, 62]];
function xOfYear(year) {
  if (year <= TIME_KNOTS[0][0]) return TIME_KNOTS[0][1];
  for (let i = 1; i < TIME_KNOTS.length; i++) {
    const [y0, x0] = TIME_KNOTS[i - 1], [y1, x1] = TIME_KNOTS[i];
    if (year <= y1) return x0 + (year - y0) / (y1 - y0) * (x1 - x0);
  }
  return TIME_KNOTS.at(-1)[1];
}
const TIME_TICKS = [1500, 1800, 1850, 1900, 1920, 1940, 1960, 1980, 2000, 2020];
const AXIS_Y = -17;
const UNDATED_CENTER = [4, -27, 0];
const TOPIC_RING = 30;

const VERTEX = `
attribute vec3 aFrom;
attribute vec3 aColor;
attribute vec2 aStyle;
attribute float aYear;
attribute float aLit;
attribute float aSeed;
uniform float uMix;
uniform float uCursor;
uniform float uPixel;
uniform float uRef;
uniform float uBase;
uniform float uTime;
uniform float uGhost;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float m = clamp((uMix - aSeed * 0.3) / 0.7, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec4 mv = modelViewMatrix * vec4(mix(aFrom, position, m), 1.0);
  gl_Position = projectionMatrix * mv;
  float depth = max(-mv.z, 0.001);
  float lit = aLit * step(aYear, uCursor);
  float size = aStyle.x * uPixel * pow(uRef / depth, 0.6) * pow(uBase / uRef, 0.3);
  gl_PointSize = clamp(size * mix(0.62, 1.0, lit), 1.6, 54.0);
  vAlpha = mix(uGhost, aStyle.y, lit) * (0.9 + 0.1 * sin(uTime * (0.5 + aSeed) + aSeed * 40.0));
  vColor = aColor;
}`;
const FRAGMENT = `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float glow = exp(-d * d * 4.2);
  float core = smoothstep(0.42, 0.0, d);
  gl_FragColor = vec4(vColor * (0.85 + core * 0.75), vAlpha * glow);
  #include <colorspace_fragment>
}`;

function circle(radius, color, opacity, segments = 200) {
  const points = [];
  for (let i = 0; i <= segments; i++) { const a = i / segments * Math.PI * 2; points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)); }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
}
function segment(a, b, color, opacity) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]), new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
}
function marsTexture() {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = '#9b492e'; ctx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 1300; i++) {
    const r = 1 + scatter(i, 3) * 26;
    ctx.fillStyle = i % 2 ? 'rgba(250,160,101,.08)' : 'rgba(35,19,24,.09)';
    ctx.beginPath(); ctx.ellipse(scatter(i, 1) * 512, scatter(i, 2) * 256, r, r * .55, 0, 0, Math.PI * 2); ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}

export function mountUniverse(container, { works = [], spatial, onWork = () => {}, onTopic = () => {}, onReset = () => {}, onTimeline = () => {}, onZone = () => {} } = {}) {
  const spatialById = new Map((spatial?.works || []).map(work => [work.id, work]));
  const zoneIdOf = work => { const id = work.spatial_primary || spatialById.get(work.id)?.primary; return zoneById.has(id) ? id : 'unknown'; };

  // ----- records -----
  let stars = [], indexById = new Map(), searchText = [], years, zones, levels, eras, primaryTopic, topics = [], topicIndex = new Map();
  let layouts = {}, topicCenters = [], topicRadii = [], maxYear = 2027, yearTotals = new Map();
  let lit, current = [], litCount = 0;
  let lens = 'scale';
  const focus = { scale: 'all', time: 'all', topic: 'all' };
  let cursor = Infinity, playing = false, listPage = 1, listQuery = '', selected = -1, hovered = -1;
  let disposed = false, sceneReady = false, introduced = false, introUntil = 0, pendingLocate = '';
  let motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  function register(input) {
    const seen = new Set();
    stars = list(input).filter(work => work && typeof work.id === 'string' && work.id && !seen.has(work.id) && seen.add(work.id))
      .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    const n = stars.length;
    indexById = new Map(stars.map((work, i) => [work.id, i]));
    searchText = stars.map(work => normalize([work.search_text, work.id, titleOf(work), work.author].join(' ')));
    years = new Float32Array(n); zones = new Uint8Array(n); levels = new Uint8Array(n); eras = new Int8Array(n); primaryTopic = new Int16Array(n);
    topics = [...new Set(stars.flatMap(work => list(work.topics)))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
    topicIndex = new Map(topics.map((topic, i) => [topic, i]));
    yearTotals = new Map(); maxYear = 1800;
    stars.forEach((work, i) => {
      const year = yearOf(work);
      years[i] = year === null ? NO_YEAR : year;
      if (year !== null) { yearTotals.set(year, (yearTotals.get(year) || 0) + 1); if (year > maxYear) maxYear = year; }
      zones[i] = ALL_ZONES.findIndex(zone => zone.id === zoneIdOf(work));
      levels[i] = levelIndexOf(work);
      eras[i] = eraIndexOf(year);
      primaryTopic[i] = list(work.topics).length ? topicIndex.get(work.topics[0]) : -1;
    });
    lit = new Float32Array(n).fill(1); litCount = n; current = stars;
    layouts = { scale: scaleLayout(), time: timeLayout(), topic: topicLayout() };
  }

  const chronological = members => members.sort((a, b) => years[a] - years[b] || a - b);
  function scaleLayout() {
    const out = new Float32Array(stars.length * 3), groups = ALL_ZONES.map(() => []);
    for (let i = 0; i < stars.length; i++) groups[zones[i]].push(i);
    ALL_ZONES.forEach((zone, z) => chronological(groups[z]).forEach((i, k) => {
      let x, y, zz;
      if (zone.id === 'unknown') {
        const r = Math.sqrt(zone.inner ** 2 + scatter(i, 2) * (zone.outer ** 2 - zone.inner ** 2)), a = scatter(i, 3) * Math.PI * 2;
        x = Math.cos(a) * r; zz = Math.sin(a) * r; y = gaussian(i, 4) * .75 * (r / 50);
      } else if (zone.ring) {
        // a ring tilted out of the plane of the scale ladder
        const r = zone.ring + (scatter(i, 5) - .5) * 1.8, a = k * GOLDEN, tilt = 1.02;
        const px = Math.cos(a) * r, pz = Math.sin(a) * r, py = (scatter(i, 6) - .5) * .5;
        x = px; y = py * Math.cos(tilt) + pz * Math.sin(tilt); zz = -py * Math.sin(tilt) + pz * Math.cos(tilt);
      } else {
        const r = Math.sqrt(zone.inner ** 2 + ((k * .6180339887) % 1) * (zone.outer ** 2 - zone.inner ** 2)), a = k * GOLDEN;
        x = Math.cos(a) * r; zz = Math.sin(a) * r; y = (scatter(i, 1) - .5) * .7;
      }
      out.set([x, y, zz], i * 3);
    }));
    return out;
  }
  function timeLayout() {
    const out = new Float32Array(stars.length * 3), byYear = new Map(), undated = [];
    for (let i = 0; i < stars.length; i++) {
      if (years[i] === NO_YEAR) { undated.push(i); continue; }
      if (!byYear.has(years[i])) byYear.set(years[i], []);
      byYear.get(years[i]).push(i);
    }
    for (const [year, members] of byYear) {
      // each year is a disc across the river; its area grows with the number of records
      const radius = 1.2 + .8 * Math.sqrt(members.length), width = Math.min(.7, Math.abs(xOfYear(year + 1) - xOfYear(year)));
      members.forEach((i, k) => {
        const r = radius * Math.sqrt((k + .5) / members.length), a = k * GOLDEN + year * .7;
        out.set([xOfYear(year) + (scatter(i, 7) - .5) * width, Math.cos(a) * r, Math.sin(a) * r], i * 3);
      });
    }
    undated.forEach(i => {
      const r = Math.sqrt(scatter(i, 8)), a = scatter(i, 9) * Math.PI * 2;
      out.set([UNDATED_CENTER[0] + Math.cos(a) * r * 26, UNDATED_CENTER[1] + gaussian(i, 10) * .5, UNDATED_CENTER[2] + Math.sin(a) * r * 6.5], i * 3);
    });
    return out;
  }
  function topicLayout() {
    const out = new Float32Array(stars.length * 3), groups = topics.map(() => []), rest = [];
    for (let i = 0; i < stars.length; i++) (primaryTopic[i] < 0 ? rest : groups[primaryTopic[i]]).push(i);
    topicCenters = topics.map((_, t) => { const a = t / Math.max(1, topics.length) * Math.PI * 2 - Math.PI / 2; return [Math.cos(a) * TOPIC_RING, 0, Math.sin(a) * TOPIC_RING]; });
    topicRadii = groups.map(members => 1.4 + .46 * Math.cbrt(members.length));
    const sphere = (i, k, n, radius, squash) => {
      const phi = Math.acos(1 - 2 * (k + .5) / n), theta = k * GOLDEN, r = radius * Math.cbrt(scatter(i, 12));
      return [Math.sin(phi) * Math.cos(theta) * r, Math.cos(phi) * r * squash, Math.sin(phi) * Math.sin(theta) * r];
    };
    groups.forEach((members, t) => chronological(members).forEach((i, k) => {
      const p = sphere(i, k, members.length, topicRadii[t], 1);
      out.set([topicCenters[t][0] + p[0], p[1], topicCenters[t][2] + p[2]], i * 3);
    }));
    rest.forEach((i, k) => out.set(sphere(i, k, rest.length, 12.5, .42), i * 3));
    return out;
  }

  register(works);

  // ----- markup -----
  container.innerHTML = `
  <div class="atlas" data-lens="scale">
    <header class="atlas-head">
      <p class="atlas-kicker">SCIENCE FICTION ATLAS</p>
      <h1><span class="atlas-total">${number(stars.length)}</span> 颗星，<br>每一颗是一条书目。</h1>
      <p class="atlas-summary"></p>
      <div class="atlas-lenses" role="group" aria-label="地图透镜">${LENSES.map(item => `<button type="button" data-lens="${item.id}" aria-pressed="${item.id === lens}" title="${item.hint}"><strong>${item.name}</strong><span>${item.hint}</span></button>`).join('')}</div>
    </header>
    <div class="atlas-stage">
      <div class="atlas-canvas" tabindex="0" role="img" aria-label="可交互的三维书目星图。拖动旋转，滚轮或双指缩放，按住 Shift 拖动平移；方向键旋转，加减键缩放，Home 回到全景。星可点击打开详情，全部记录也可在右侧列表中查找。"></div>
      <div class="atlas-labels" aria-hidden="true"></div>
      <div class="atlas-names" aria-hidden="true"></div>
      <div class="atlas-mark" hidden aria-hidden="true"></div>
      <div class="atlas-tip" hidden></div>
      <div class="atlas-tools"><button type="button" data-camera="out" aria-label="拉远">−</button><button type="button" data-camera="in" aria-label="拉近">＋</button><button type="button" data-camera="reset" aria-label="回到全景">全景</button><button type="button" data-camera="motion" aria-pressed="${motion}" aria-label="切换缓慢转动">${motion ? '停转' : '转动'}</button></div>
    </div>
    <nav class="atlas-rail" aria-label="当前透镜的分区"><h2></h2><ol></ol></nav>
    <div class="atlas-dock">
      <div class="atlas-dock-top">
        <div class="atlas-legend" role="group" aria-label="星的亮度表示研究深度，点击可按层级筛选"><span>亮度 = 研究深度</span>${LEVELS.map((level, i) => `<button type="button" data-level="${level.id}" aria-pressed="false"><i data-mag="${i}"></i>${level.name}<b></b></button>`).join('')}</div>
      </div>
      <div class="atlas-time">
        <button type="button" class="atlas-play" aria-label="按发表时间依次点亮">▶</button>
        <div class="atlas-time-readout"><strong></strong><span></span></div>
        <div class="atlas-time-track" tabindex="0" role="slider" aria-label="时间游标：只点亮此年及以前发表的记录" aria-valuemin="1799"><canvas></canvas><i class="atlas-time-cursor"></i><div class="atlas-time-ticks" aria-hidden="true"></div></div>
        <button type="button" class="atlas-time-all" hidden>显示全部年份</button>
      </div>
    </div>
    <aside class="atlas-inspector" aria-label="当前范围内的记录">
      <div class="atlas-focus"></div>
      <label class="atlas-search"><span class="sr-only">在当前范围内搜索</span><input type="search" placeholder="在当前范围内搜索标题、作者、编号…" autocomplete="off"></label>
      <p class="atlas-list-status" role="status" aria-live="polite"></p>
      <div class="atlas-list"></div>
      <nav class="atlas-pager" aria-label="记录分页"><button type="button" data-page="first" aria-label="第一页">«</button><button type="button" data-page="previous" aria-label="上一页">‹</button><label>第 <input type="number" min="1" step="1" aria-label="跳转页码"> / <span class="atlas-pages">1</span> 页</label><button type="button" data-page="next" aria-label="下一页">›</button><button type="button" data-page="last" aria-label="最后一页">»</button></nav>
    </aside>
  </div>
  <div class="atlas-note"><p>星的位置是阅读导航，不是天文测量。<strong>尺度</strong>只为已有空间判断的记录定位，其余排在外圈“未测绘”光带；<strong>时间</strong>按来源发表年排列，1900 年以前的轴线经过压缩，年份未知的记录另成一片；<strong>议题</strong>按每条记录的第一个议题归位。画面里没有装饰用的星。地球纹理来自 NASA Blue Marble。</p><button type="button" class="atlas-reset">清除所有筛选</button><button type="button" class="atlas-timeline">打开时间长廊 →</button></div>`;

  const q = selector => container.querySelector(selector);
  const root = q('.atlas'), stage = q('.atlas-stage'), canvasHost = q('.atlas-canvas'), tip = q('.atlas-tip'), mark = q('.atlas-mark');
  const cleanups = [];
  const listen = (element, type, handler, options) => { element.addEventListener(type, handler, options); cleanups.push(() => element.removeEventListener(type, handler, options)); };
  const tone = (name, fallback) => getComputedStyle(root).getPropertyValue(name).trim() || fallback;

  // ----- camera state -----
  const target = new THREE.Vector3(), desiredTarget = new THREE.Vector3();
  let yaw = .35, pitch = .5, distance = 12, desiredYaw = .35, desiredPitch = .5, desiredDistance = 90, baseDistance = 90, flying = true, lastTouch = 0;
  let renderer, scene, camera, points, uniforms, frame = 0, mix = 1, mixFrom = 1, stageWidth = 1, stageHeight = 1;
  const decor = {}, labels = [], nameLabels = [];

  let areaCache = null, areaAt = -1e9;
  function freeArea(fresh = false) {
    const stamp = performance.now();
    if (!fresh && areaCache && stamp - areaAt < 400) return areaCache;
    areaAt = stamp;
    const box = stage.getBoundingClientRect(), area = { left: 0, right: box.width, top: 0, bottom: box.height };
    const overlap = element => { const r = element.getBoundingClientRect(); return r.width && r.bottom > box.top + 4 && r.top < box.bottom - 4 && r.right > box.left + 4 && r.left < box.right - 4 ? r : null; };
    const rail = overlap(q('.atlas-rail')), inspector = overlap(q('.atlas-inspector')), dock = overlap(q('.atlas-dock')), head = overlap(q('.atlas-head'));
    if (rail) area.left = Math.max(area.left, rail.right - box.left);
    if (head && head.width < box.width * .6) area.left = Math.max(area.left, head.right - box.left);
    if (inspector) area.right = Math.min(area.right, inspector.left - box.left);
    if (dock) area.bottom = Math.min(area.bottom, dock.top - box.top);
    if (head && head.width >= box.width * .6) area.top = Math.max(area.top, head.bottom - box.top);
    if (area.right - area.left < 160) { area.left = 0; area.right = box.width; }
    if (area.bottom - area.top < 160) { area.top = 0; area.bottom = box.height; }
    return areaCache = area;
  }
  function fitDistance(halfWidth, halfHeight) {
    const area = freeArea(), tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const fracW = (area.right - area.left) / stageWidth, fracH = (area.bottom - area.top) / stageHeight;
    return Math.max(halfHeight / (tan * fracH), halfWidth / (tan * (stageWidth / stageHeight) * fracW)) * 1.08;
  }
  function eraSpan(era) { return [xOfYear(era.min ?? 100), xOfYear((era.max ?? maxYear) + 1)]; }
  function frameOf(lensId, value) {
    if (lensId === 'scale') {
      const zone = zoneById.get(value), radius = !zone ? 33 : zone.ring ? 19.5 : zone.outer * 1.08;
      const tilt = zone?.id === 'unknown' ? .78 : .5;
      return { target: [0, 0, 0], halfWidth: radius, halfHeight: radius * Math.sin(tilt) + 2.5, yaw: .35, pitch: tilt };
    }
    if (lensId === 'time') {
      const era = ERAS.find(item => item.id === value);
      if (era) { const [a, b] = eraSpan(era); return { target: [(a + b) / 2, -1, 0], halfWidth: Math.max(13, (b - a) / 2 + 6), halfHeight: 17, yaw: .42, pitch: .16 }; }
      if (value === 'unknown') return { target: UNDATED_CENTER, halfWidth: 29, halfHeight: 10, yaw: .2, pitch: .55 };
      return { target: [6, -7, 0], halfWidth: 58, halfHeight: 25, yaw: .62, pitch: .17 };
    }
    const t = topicIndex.get(value);
    if (t !== undefined) return { target: topicCenters[t], halfWidth: topicRadii[t] * 2.5, halfHeight: topicRadii[t] * 1.9, yaw: .3, pitch: .42 };
    if (value === '__unknown__') return { target: [0, 0, 0], halfWidth: 16, halfHeight: 9, yaw: .3, pitch: .5 };
    return { target: [0, 0, 0], halfWidth: TOPIC_RING + 8, halfHeight: (TOPIC_RING + 8) * Math.sin(.62) + 4, yaw: .3, pitch: .62 };
  }
  function fly(snap = false) {
    const frameSpec = frameOf(lens, focus[lens]);
    desiredTarget.fromArray(frameSpec.target); desiredYaw = frameSpec.yaw; desiredPitch = frameSpec.pitch;
    desiredDistance = fitDistance(frameSpec.halfWidth, frameSpec.halfHeight);
    const overview = frameOf(lens, 'all'); baseDistance = fitDistance(overview.halfWidth, overview.halfHeight);
    flying = true;
    if (snap || !motion) { target.copy(desiredTarget); yaw = desiredYaw; pitch = desiredPitch; distance = desiredDistance; }
  }

  // ----- groups, counts, lists -----
  const inCursor = i => cursor === Infinity || years[i] <= cursor;
  const groupOf = { scale: i => zones[i], time: i => eras[i], topic: i => primaryTopic[i] };
  function inFocus(i) {
    const value = focus[lens];
    if (value === 'all') return true;
    if (lens === 'scale') return ALL_ZONES[zones[i]].id === value;
    if (lens === 'time') return value === 'unknown' ? years[i] === NO_YEAR : ERAS[eras[i]]?.id === value;
    return value === '__unknown__' ? primaryTopic[i] < 0 : list(stars[i].topics).includes(value);
  }
  function visibleRecords() {
    const terms = normalize(listQuery).split(' ').filter(Boolean), out = [];
    for (let i = 0; i < stars.length; i++) if (lit[i] && inCursor(i) && inFocus(i) && terms.every(term => searchText[i].includes(term))) out.push(i);
    return out.sort((a, b) => years[a] - years[b] || a - b);
  }
  function railItems() {
    const matched = new Map(), total = new Map(), bump = (map, key) => map.set(key, (map.get(key) || 0) + 1);
    for (let i = 0; i < stars.length; i++) {
      const keys = lens === 'scale' ? [ALL_ZONES[zones[i]].id] : lens === 'time' ? [years[i] === NO_YEAR ? 'unknown' : ERAS[eras[i]].id] : list(stars[i].topics).length ? stars[i].topics : ['__unknown__'];
      for (const key of keys) { bump(total, key); if (lit[i] && inCursor(i)) bump(matched, key); }
    }
    const row = (id, name, note, uncharted = false) => ({ id, name, note, uncharted, total: total.get(id) || 0, matched: matched.get(id) || 0 });
    if (lens === 'scale') return [...ZONES.map(zone => row(zone.id, zone.name, zone.code)), row('unknown', UNCHARTED.name, UNCHARTED.code, true)];
    if (lens === 'time') return [...ERAS.map(era => row(era.id, era.name, era.note)), row('unknown', '年份未知', '不在时间轴上', true)];
    return [...topics.map(topic => row(topic, topic, '')), row('__unknown__', '议题待分类', '', true)];
  }
  const railTitle = { scale: ['尺度阶梯', '全景'], time: ['年代', '全部年代'], topic: ['底层议题', '全部议题'] };
  function renderRail() {
    const items = railItems(), scaleMax = Math.max(1, ...items.filter(item => !item.uncharted).map(item => item.total));
    let visible = 0; for (let i = 0; i < stars.length; i++) if (lit[i] && inCursor(i)) visible++;
    q('.atlas-rail h2').textContent = railTitle[lens][0];
    q('.atlas-rail ol').innerHTML = `<li><button type="button" data-focus="all" aria-pressed="${focus[lens] === 'all'}"><span class="atlas-rail-name">${railTitle[lens][1]}</span><span class="atlas-rail-count">${number(visible)}</span></button></li>` + items.map(item => `<li><button type="button" data-focus="${escapeHTML(item.id)}" aria-pressed="${focus[lens] === item.id}"${item.uncharted ? ' class="is-uncharted"' : ''}${item.total ? '' : ' disabled'}><span class="atlas-rail-name">${escapeHTML(item.name)}${item.note ? `<small>${escapeHTML(item.note)}</small>` : ''}</span><span class="atlas-rail-count" title="当前点亮 ${number(item.matched)} / 全部 ${number(item.total)}">${number(item.matched)}${item.matched !== item.total ? `<small>/ ${number(item.total)}</small>` : ''}</span>${item.uncharted ? '' : `<i class="atlas-rail-bar"><b style="width:${(item.total / scaleMax * 100).toFixed(2)}%"><b style="width:${item.total ? (item.matched / item.total * 100).toFixed(2) : 0}%"></b></b></i>`}</button></li>`).join('');
  }
  function describeFocus() {
    const value = focus[lens];
    if (lens === 'scale') { const zone = zoneById.get(value); return zone ? [`${zone.code} · 尺度`, zone.name, zone.description] : ['00 · 尺度', '从地球到宇宙', '由内向外五层尺度，外加一道与它们相交的“抽象与多维”斜环。滚轮拉远，就是从地球走向宇宙。最外圈是尚未测绘的记录。']; }
    if (lens === 'time') {
      const era = ERAS.find(item => item.id === value);
      if (era) return ['时间', era.name, `${era.note}。这一段里每一年是河道上的一个截面，记录越多，截面越宽。`];
      if (value === 'unknown') return ['时间', '年份未知', '来源没有给出可用纪年的记录。它们不在时间轴上，单独铺在河道下方。'];
      return ['时间', '发表年代的长河', '从左到右是发表年。河道的粗细就是那一年的记录数；拖动下方的时间游标，可以看着它一年一年亮起来。'];
    }
    if (value === '__unknown__') return ['议题', '议题待分类', '尚无议题判断的记录，聚在中心。它们没有被排除，只是还没有被读过。'];
    if (topicIndex.has(value)) return ['议题', value, '这个星团收的是把它列为第一个议题的记录；列表则包含所有带这个议题的记录，所以数量会更多。'];
    return ['议题', `${topics.length} 个底层问题`, '每个星团是一个议题，按记录的第一个议题归位。中心是还没有议题判断的记录。'];
  }
  let listed = [];
  function renderList() {
    listed = visibleRecords();
    const pages = Math.max(1, Math.ceil(listed.length / PAGE)); listPage = Math.max(1, Math.min(listPage, pages));
    const start = (listPage - 1) * PAGE;
    q('.atlas-list').innerHTML = listed.slice(start, start + PAGE).map(i => { const work = stars[i]; return `<button type="button" class="atlas-work" data-work="${escapeHTML(work.id)}" data-star="${i}"><i data-mag="${levels[i]}" title="${LEVELS[levels[i]].name}"></i><span>${escapeHTML(work.year_display || '年份未知')}</span><strong>${escapeHTML(titleOf(work))}</strong><small>${escapeHTML(work.author || '作者未知')}${list(work.topics).length ? ' · ' + escapeHTML(work.topics.slice(0, 2).join('、')) : ''}</small></button>`; }).join('') || '<p class="atlas-empty">这个范围里没有点亮的记录。可以清除搜索、放宽筛选，或把时间游标拉回最右。</p>';
    q('.atlas-list-status').textContent = listed.length ? `${number(start + 1)}—${number(Math.min(start + PAGE, listed.length))} / ${number(listed.length)} 条` : '0 条';
    q('.atlas-pages').textContent = number(pages);
    const field = q('.atlas-pager input'); field.value = String(listPage); field.max = String(pages);
    container.querySelectorAll('.atlas-pager [data-page]').forEach(button => { button.disabled = ['first', 'previous'].includes(button.dataset.page) ? listPage === 1 : listPage === pages; });
    q('.atlas-pager').hidden = pages < 2;
  }
  function renderFocus() {
    const [kicker, title, description] = describeFocus();
    let count = 0; for (let i = 0; i < stars.length; i++) if (lit[i] && inCursor(i) && inFocus(i)) count++;
    q('.atlas-focus').innerHTML = `<p class="atlas-kicker">${escapeHTML(kicker)}</p><h2>${escapeHTML(title)}</h2><p>${escapeHTML(description)}</p><div class="atlas-focus-count"><strong>${number(count)}</strong><span>条点亮的记录${cursor === Infinity ? '' : ` · 截至 ${cursor <= 1799 ? '1799' : cursor} 年`}</span></div>`;
  }
  function renderSummary() {
    const n = stars.length; let placed = 0, dated = 0, themed = 0;
    for (let i = 0; i < n; i++) { if (ALL_ZONES[zones[i]].id !== 'unknown') placed++; if (years[i] !== NO_YEAR) dated++; if (primaryTopic[i] >= 0) themed++; }
    q('.atlas-total').textContent = number(n);
    q('.atlas-summary').textContent = lens === 'scale' ? `${number(placed)} 条已有空间判断，${number(n - placed)} 条尚未测绘。`
      : lens === 'time' ? `${number(dated)} 条有纪年，${number(n - dated)} 条年份未知。`
      : `${number(themed)} 条已有议题，${number(n - themed)} 条待分类。`;
    const counts = LEVELS.map(() => 0); for (let i = 0; i < n; i++) if (lit[i]) counts[levels[i]]++;
    container.querySelectorAll('.atlas-legend [data-level]').forEach((button, i) => { button.querySelector('b').textContent = number(counts[i]); button.setAttribute('aria-pressed', String(document.getElementById('global-level')?.value === button.dataset.level)); });
  }
  function refresh() { if (disposed) return; renderRail(); renderFocus(); renderList(); renderSummary(); drawTimeline(); labelCounts(); }

  // ----- time cursor -----
  const track = q('.atlas-time-track'), timeCanvas = track.querySelector('canvas');
  const binCount = () => maxYear - 1798, binOf = year => Math.max(0, Math.min(binCount() - 1, year - 1799));
  function drawTimeline() {
    const box = track.getBoundingClientRect(); if (box.width < 2) return;
    const ratio = Math.min(devicePixelRatio || 1, 2), width = box.width, height = box.height - 18, bins = binCount();
    timeCanvas.width = Math.round(width * ratio); timeCanvas.height = Math.round(height * ratio); timeCanvas.style.height = `${height}px`;
    const ctx = timeCanvas.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height);
    const all = new Float32Array(bins), on = new Float32Array(bins);
    for (let i = 0; i < stars.length; i++) { if (years[i] === NO_YEAR) continue; const b = binOf(years[i]); all[b]++; if (lit[i]) on[b]++; }
    const peak = Math.max(1, ...all), step = width / bins, bar = Math.max(1, step - 1), stop = cursor === Infinity ? bins : binOf(cursor) + 1;
    const colors = [tone('--atlas-bar-rest', '#22252d'), tone('--atlas-bar-later', '#5c4619'), tone('--atlas-bar', '#e6b84f')];
    for (let b = 0; b < bins; b++) {
      const h = all[b] / peak * (height - 2);
      ctx.fillStyle = colors[0]; ctx.fillRect(b * step, height - h, bar, h);
      if (on[b]) { const lh = Math.max(1.5, on[b] / peak * (height - 2)); ctx.fillStyle = b < stop ? colors[2] : colors[1]; ctx.fillRect(b * step, height - lh, bar, lh); }
    }
    const at = cursor === Infinity ? 1 : (binOf(cursor) + 1) / bins;
    q('.atlas-time-cursor').style.left = `${at * 100}%`;
    q('.atlas-time-ticks').innerHTML = [1800, 1850, 1900, 1950, 2000].filter(year => year <= maxYear).map(year => `<span style="left:${(binOf(year) + .5) / bins * 100}%">${year}</span>`).join('');
    let shown = 0; for (let i = 0; i < stars.length; i++) if (lit[i] && inCursor(i)) shown++;
    q('.atlas-time-readout strong').textContent = cursor === Infinity ? '全部年份' : cursor <= 1799 ? '1800 年以前' : `截至 ${cursor} 年`;
    q('.atlas-time-readout span').textContent = `${number(shown)} 条点亮`;
    q('.atlas-time-all').hidden = cursor === Infinity;
    track.setAttribute('aria-valuemax', String(maxYear)); track.setAttribute('aria-valuenow', String(cursor === Infinity ? maxYear : cursor));
    track.setAttribute('aria-valuetext', cursor === Infinity ? `全部年份，${number(shown)} 条` : `截至 ${cursor} 年，${number(shown)} 条`);
  }
  let cursorTimer = 0;
  function setCursor(value, settle = true) {
    cursor = value === Infinity || value >= maxYear ? Infinity : Math.max(1799, Math.round(value));
    if (uniforms) uniforms.uCursor.value = cursor === Infinity ? NO_YEAR * 2 : cursor;
    drawTimeline();
    const settleNow = () => { clearTimeout(cursorTimer); cursorTimer = 0; listPage = 1; renderRail(); renderFocus(); renderList(); labelCounts(); };
    // while scrubbing or playing, the counts and list follow a few times a second rather than every frame
    if (settle) settleNow(); else if (!cursorTimer) cursorTimer = setTimeout(settleNow, 300);
  }
  function setPlaying(next) {
    playing = next; q('.atlas-play').textContent = playing ? '❚❚' : '▶'; q('.atlas-play').setAttribute('aria-label', playing ? '暂停' : '按发表时间依次点亮');
    if (playing && (cursor === Infinity || cursor >= maxYear - 1)) setCursor(1799, false);
    if (!playing) setCursor(cursor);
  }
  let playCarry = 0;
  const yearFromPointer = event => { const box = track.getBoundingClientRect(); return 1799 + Math.floor(Math.max(0, Math.min(.9999, (event.clientX - box.left) / box.width)) * binCount()); };
  let scrubbing = false;
  listen(track, 'pointerdown', event => { scrubbing = true; track.setPointerCapture(event.pointerId); setPlaying(false); setCursor(yearFromPointer(event), false); });
  listen(track, 'pointermove', event => { if (scrubbing) setCursor(yearFromPointer(event), false); });
  listen(track, 'pointerup', () => { if (scrubbing) { scrubbing = false; setCursor(cursor); } });
  listen(track, 'pointercancel', () => { scrubbing = false; });
  listen(track, 'keydown', event => {
    const now = cursor === Infinity ? maxYear : cursor, step = event.shiftKey ? 10 : 1;
    const next = { ArrowLeft: now - step, ArrowDown: now - step, ArrowRight: now + step, ArrowUp: now + step, Home: 1799, End: Infinity, PageDown: now - 25, PageUp: now + 25 }[event.key];
    if (next === undefined) return; event.preventDefault(); setPlaying(false); setCursor(next);
  });
  listen(q('.atlas-play'), 'click', () => setPlaying(!playing));
  listen(q('.atlas-time-all'), 'click', () => { setPlaying(false); setCursor(Infinity); });

  // ----- focus and lens -----
  function applyFocus(lensId, value) {
    // The rail is the site-wide filter for its dimension, so every other view follows.
    if (lensId === 'scale') onZone(value);
    else if (lensId === 'topic') onTopic(value === 'all' ? '' : value);
    else {
      setControl('global-yearStatus', value === 'unknown' ? 'unknown' : '');
      setControl('filter-era', value === 'all' || value === 'unknown' ? '' : value);
    }
  }
  function setFocus(lensId, value, { notify = false, move = true } = {}) {
    const changed = focus[lensId] !== value;
    focus[lensId] = value;
    if (changed && lensId === lens) { listPage = 1; if (move) fly(); refresh(); }
    if (changed && notify) applyFocus(lensId, value);
  }
  function setLens(next) {
    if (next === lens || !layouts[next]) return;
    const previous = lens; lens = next; root.dataset.lens = lens; listPage = 1;
    container.querySelectorAll('.atlas-lenses [data-lens]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lens === lens)));
    if (points) {
      const geometry = points.geometry;
      geometry.attributes.aFrom.array.set(layouts[previous]); geometry.attributes.aFrom.needsUpdate = true;
      geometry.attributes.position.array.set(layouts[lens]); geometry.attributes.position.needsUpdate = true;
      mixFrom = performance.now(); mix = motion ? 0 : 1; uniforms.uMix.value = mix;
    }
    hideTip(); fly(); refresh(); publish({ lens });
  }

  listen(container, 'click', event => {
    const button = event.target.closest('button'); if (!button || !container.contains(button)) return;
    lastTouch = performance.now();
    if (button.dataset.lens && button.closest('.atlas-lenses')) setLens(button.dataset.lens);
    else if (button.dataset.focus) setFocus(lens, focus[lens] === button.dataset.focus ? 'all' : button.dataset.focus, { notify: true });
    else if (button.dataset.work) { select(Number(button.dataset.star)); onWork(button.dataset.work); }
    else if (button.dataset.level) setControl('global-level', button.getAttribute('aria-pressed') === 'true' ? '' : button.dataset.level);
    else if (button.dataset.page) {
      const pages = Math.max(1, Math.ceil(listed.length / PAGE));
      listPage = { first: 1, last: pages, next: listPage + 1, previous: listPage - 1 }[button.dataset.page]; renderList(); q('.atlas-list').scrollTop = 0;
    } else if (button.dataset.camera) {
      const action = button.dataset.camera;
      if (action === 'in') { desiredDistance = Math.max(3.5, desiredDistance * .72); flying = true; }
      if (action === 'out') { desiredDistance = Math.min(420, desiredDistance * 1.38); flying = true; }
      if (action === 'reset') { if (focus[lens] !== 'all') setFocus(lens, 'all', { notify: true }); else fly(); }
      if (action === 'motion') { motion = !motion; button.textContent = motion ? '停转' : '转动'; button.setAttribute('aria-pressed', String(motion)); }
    } else if (button.classList.contains('atlas-reset')) { listQuery = ''; q('.atlas-search input').value = ''; setPlaying(false); setCursor(Infinity); onReset(); }
    else if (button.classList.contains('atlas-timeline')) onTimeline();
  });
  let searchTimer = 0;
  listen(q('.atlas-search input'), 'input', event => { clearTimeout(searchTimer); listQuery = event.target.value; listPage = 1; searchTimer = setTimeout(renderList, 120); });
  listen(q('.atlas-pager input'), 'change', event => { const pages = Math.max(1, Math.ceil(listed.length / PAGE)); listPage = Math.max(1, Math.min(pages, Math.trunc(Number(event.target.value)) || 1)); renderList(); q('.atlas-list').scrollTop = 0; });

  // ----- hover, selection -----
  const projected = new THREE.Vector3();
  function screenOf(i, out = projected) {
    const p = layouts[lens]; out.set(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]).project(camera);
    return out.z > -1 && out.z < 1 ? [(out.x * .5 + .5) * stageWidth, (-out.y * .5 + .5) * stageHeight, out.z] : null;
  }
  function pick(x, y) {
    let best = -1, bestScore = Infinity;
    for (let i = 0; i < stars.length; i++) {
      if (!lit[i] || !inCursor(i)) continue;
      const s = screenOf(i); if (!s) continue;
      const d = Math.hypot(s[0] - x, s[1] - y), reach = 7 + levels[i] * 2.5;
      if (d > reach) continue;
      const score = d - levels[i] * 2.2 + s[2] * 2;
      if (score < bestScore) { bestScore = score; best = i; }
    }
    return best;
  }
  function hideTip() { hovered = -1; tip.hidden = true; canvasHost.style.cursor = ''; }
  function showTip(i, x, y) {
    hovered = i; const work = stars[i];
    tip.innerHTML = `<span>${escapeHTML(work.year_display || '年份未知')} · ${LEVELS[levels[i]].name}</span><strong>${escapeHTML(titleOf(work))}</strong><small>${escapeHTML(work.author || '作者未知')}</small>`;
    tip.hidden = false;
    tip.style.left = `${Math.max(10, Math.min(x + 16, stageWidth - 250))}px`; tip.style.top = `${Math.max(10, y - 70)}px`;
    canvasHost.style.cursor = 'pointer';
  }
  function select(i) { selected = Number.isInteger(i) && i >= 0 && i < stars.length ? i : -1; mark.hidden = selected < 0; }
  function locate(id) {
    const i = indexById.get(id); if (i === undefined) return false;
    select(i);
    if (sceneReady && !introduced) pendingLocate = id;
    else if (sceneReady) {
      const p = layouts[lens]; desiredTarget.set(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
      desiredDistance = Math.min(distance, lens === 'scale' && ALL_ZONES[zones[i]].id === 'unknown' ? 26 : 16); flying = true; lastTouch = performance.now();
    }
    return true;
  }

  // ----- labels -----
  function addLabel(lensId, html, position, className = '') {
    const element = document.createElement('div'); element.className = `atlas-label ${className}`.trim(); element.innerHTML = html; element.style.visibility = 'hidden';
    q('.atlas-labels').appendChild(element); const label = { lens: lensId, element, position }; labels.push(label); return label;
  }
  function labelCounts() {
    const items = railItems(), counts = new Map(items.map(item => [item.id, item]));
    for (const label of labels) if (label.key && counts.has(label.key) && label.lens === lens) { const b = label.element.querySelector('b'); if (b) { b.textContent = number(counts.get(label.key).matched); label.reach = undefined; } }
  }
  function buildLabels() {
    ZONES.forEach(zone => { const label = addLabel('scale', `<span>${zone.code}</span>${zone.name}<b></b>`, zone.ring ? () => [0, zone.ring * Math.sin(1.02) + 1.4, zone.ring * Math.cos(1.02)] : view => [Math.sin(view) * (zone.inner + zone.outer) / 2, -.6, Math.cos(view) * (zone.inner + zone.outer) / 2]); label.key = zone.id; });
    const belt = addLabel('scale', `<span>${UNCHARTED.code}</span>${UNCHARTED.name}<b></b>`, view => [Math.sin(view) * 40, -.6, Math.cos(view) * 40], 'is-uncharted'); belt.key = 'unknown';
    TIME_TICKS.forEach(year => addLabel('time', String(year), () => [xOfYear(year), AXIS_Y - 1.3, 0], 'is-tick'));
    const undated = addLabel('time', '年份未知<b></b>', () => [UNDATED_CENTER[0], UNDATED_CENTER[1] - 1.5, UNDATED_CENTER[2] + 7.5], 'is-uncharted'); undated.key = 'unknown';
    topics.forEach((topic, t) => { const label = addLabel('topic', `${escapeHTML(topic)}<b></b>`, () => [topicCenters[t][0], topicRadii[t] + 1.6, topicCenters[t][2]]); label.key = topic; });
    const unthemed = addLabel('topic', '议题待分类<b></b>', () => [0, -7.5, 0], 'is-uncharted'); unthemed.key = '__unknown__';
    for (let k = 0; k < 12; k++) { const element = document.createElement('div'); element.className = 'atlas-name'; element.hidden = true; q('.atlas-names').appendChild(element); nameLabels.push(element); }
  }
  // Titles appear for the brightest stars once few enough are in view to read them.
  let namesAt = 0;
  function updateNames(now) {
    if (now - namesAt < 240) return; namesAt = now;
    const area = freeArea(), candidates = [], positions = layouts[lens], reach = (distance * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * 2.2) ** 2;
    if (mix >= 1) for (let i = 0; i < stars.length; i++) {
      if (!lit[i] || !inCursor(i)) continue;
      if ((positions[i * 3] - target.x) ** 2 + (positions[i * 3 + 1] - target.y) ** 2 + (positions[i * 3 + 2] - target.z) ** 2 > reach) continue;
      const s = screenOf(i); if (!s || s[0] < area.left + 20 || s[0] > area.right - 150 || s[1] < area.top + 24 || s[1] > area.bottom - 16) continue;
      candidates.push([i, s[0], s[1], s[2]]);
      if (candidates.length > 900) break;
    }
    const crowded = candidates.length > 900, placed = [];
    if (!crowded) {
      candidates.sort((a, b) => levels[b[0]] - levels[a[0]] || a[3] - b[3]);
      for (const [i, x, y] of candidates) {
        if (placed.length >= nameLabels.length) break;
        if (candidates.length > 70 && levels[i] < 3) break;
        if (candidates.length > 320) break;
        if (placed.some(p => Math.abs(p[1] - x) < 150 && Math.abs(p[2] - y) < 17)) continue;
        placed.push([i, x, y]);
      }
    }
    nameLabels.forEach((element, k) => {
      const item = placed[k]; element.hidden = !item; if (!item) return;
      if (element.dataset.star !== String(item[0])) { element.dataset.star = String(item[0]); element.textContent = titleOf(stars[item[0]]); }
      element.style.transform = `translate(${item[1] + 9}px, ${item[2] - 8}px)`;
    });
  }

  // ----- scene -----
  function setOpacity(group, k) {
    group.visible = k > .01;
    group.traverse(object => {
      const material = object.material; if (!material) return;
      if (material.uniforms?.uOpacity) material.uniforms.uOpacity.value = k;
      else if (object.isMesh) object.visible = k > .5;
      else { if (material.userData.base === undefined) material.userData.base = material.opacity; material.opacity = material.userData.base * k; }
    });
  }
  function buildPoints() {
    if (points) { scene.remove(points); points.geometry.dispose(); points.material.dispose(); }

    const n = stars.length, geometry = new THREE.BufferGeometry();
    const colors = new Float32Array(n * 3), style = new Float32Array(n * 2), seed = new Float32Array(n);
    const palette = LEVELS.map((_, k) => new THREE.Color(tone(`--star-${k + 1}`, ['#7a5a1e', '#b0842d', '#e6b84f', '#ffe9a8'][k])));
    for (let i = 0; i < n; i++) { const level = LEVELS[levels[i]], color = palette[levels[i]]; colors.set([color.r, color.g, color.b], i * 3); style.set([level.size, level.alpha], i * 2); seed[i] = scatter(i, 21); }
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(layouts[lens]), 3));
    geometry.setAttribute('aFrom', new THREE.BufferAttribute(new Float32Array(layouts[lens]), 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aStyle', new THREE.BufferAttribute(style, 2));
    geometry.setAttribute('aYear', new THREE.BufferAttribute(new Float32Array(years), 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const litAttribute = new THREE.BufferAttribute(new Float32Array(lit), 1); litAttribute.setUsage(THREE.DynamicDrawUsage); geometry.setAttribute('aLit', litAttribute);
    uniforms = { uMix: { value: 1 }, uCursor: { value: cursor === Infinity ? NO_YEAR * 2 : cursor }, uPixel: { value: 3 * renderer.getPixelRatio() }, uRef: { value: 90 }, uBase: { value: 90 }, uTime: { value: 0 }, uGhost: { value: .05 } };
    points = new THREE.Points(geometry, new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader: FRAGMENT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    points.frustumCulled = false; points.renderOrder = 2; scene.add(points);
  }
  function createScene() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(new THREE.Color(tone('--void', '#05060a')), 1);
    renderer.domElement.setAttribute('aria-hidden', 'true'); canvasHost.appendChild(renderer.domElement);
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(FOV, 1, .1, 1200);
    scene.add(new THREE.AmbientLight(0x8a93a6, 1.1));
    const sun = new THREE.DirectionalLight(0xfff1dc, 3.1); sun.position.set(-9, 6, 11); scene.add(sun);

    const line = new THREE.Color(tone('--atlas-line', '#e6b84f')), cool = new THREE.Color(tone('--atlas-line-cool', '#8fbcff'));

    // scale lens: Earth at the centre, each scale a ring further out
    const scale = decor.scale = new THREE.Group(); scene.add(scale);
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x1b4a66, shininess: 16 });
    new THREE.TextureLoader().load('./assets/earth-day.jpg', map => { if (disposed) { map.dispose(); return; } map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8); earthMaterial.map = map; earthMaterial.needsUpdate = true; }, undefined, () => { if (!disposed) earthMaterial.color.set(0x1d5a86); });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(2.2, 72, 48), earthMaterial); earth.rotation.y = 2.5; earth.rotation.z = .2; scale.add(earth);
    scale.add(new THREE.Mesh(new THREE.SphereGeometry(2.34, 48, 32), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending, uniforms: { uOpacity: { value: 1 } }, vertexShader: 'varying vec3 vn;varying vec3 vp;void main(){vn=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.0);vp=p.xyz;gl_Position=projectionMatrix*p;}', fragmentShader: 'uniform float uOpacity;varying vec3 vn;varying vec3 vp;void main(){float f=pow(1.0-abs(dot(normalize(vn),normalize(-vp))),2.6);gl_FragColor=vec4(0.35,0.66,1.0,f*0.8*uOpacity);}' })));
    for (const zone of ZONES) {
      if (zone.ring) { const ring = circle(zone.ring, cool, .3); ring.rotation.x = -1.02; scale.add(ring); continue; }
      scale.add(circle(zone.inner, line, .13), circle(zone.outer, line, .2));
    }
    scale.add(circle(UNCHARTED.inner, line, .07), circle(UNCHARTED.outer, line, .05));
    const moonOrbit = new THREE.Group(); const moon = new THREE.Mesh(new THREE.SphereGeometry(.42, 24, 16), new THREE.MeshPhongMaterial({ color: 0xb9bcc2, shininess: 2 })); moon.position.set(6.3, 0, 0); moonOrbit.add(moon); moonOrbit.rotation.y = 2.2; scale.add(moonOrbit, circle(6.3, line, .1));
    const marsOrbit = new THREE.Group(); const mars = new THREE.Mesh(new THREE.SphereGeometry(.78, 32, 24), new THREE.MeshPhongMaterial({ map: marsTexture(), shininess: 4 })); mars.position.set(10.9, 0, 0); marsOrbit.add(mars); marsOrbit.rotation.y = -.7; scale.add(marsOrbit, circle(10.9, line, .1));

    // time lens: an axis with year ticks and a gate at each era boundary
    const time = decor.time = new THREE.Group(); scene.add(time);
    time.add(segment([xOfYear(100), AXIS_Y, 0], [xOfYear(maxYear + 2), AXIS_Y, 0], line, .3));
    for (const year of TIME_TICKS) time.add(segment([xOfYear(year), AXIS_Y, 0], [xOfYear(year), AXIS_Y - .9, 0], line, .5));
    for (const era of ERAS.slice(1)) { const gate = circle(15, line, .12, 120); gate.rotation.z = Math.PI / 2; gate.position.x = xOfYear(era.min); time.add(gate); }
    const undatedOutline = circle(1, cool, .16); undatedOutline.scale.set(27, 1, 7.4); undatedOutline.position.fromArray(UNDATED_CENTER); time.add(undatedOutline);

    // topic lens: the ring the clusters sit on
    const topic = decor.topic = new THREE.Group(); scene.add(topic);
    topic.add(circle(TOPIC_RING, line, .14));
    topicCenters.forEach(center => topic.add(segment([0, 0, 0], center, line, .05)));

    for (const [id, group] of Object.entries(decor)) setOpacity(group, id === lens ? 1 : 0);

    buildPoints();
    buildLabels();

    // pointer: drag to orbit, Shift or secondary button to pan, wheel or pinch to zoom, click a star to open it
    const pointers = new Map(); let drag = null, pinch = 0;
    const touched = () => { lastTouch = performance.now(); flying = false; desiredYaw = yaw; desiredPitch = pitch; };
    listen(canvasHost, 'contextmenu', event => event.preventDefault());
    listen(canvasHost, 'pointerdown', event => { canvasHost.setPointerCapture(event.pointerId); pointers.set(event.pointerId, [event.clientX, event.clientY]); drag = { x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, moved: false, pan: event.shiftKey || event.button === 2 }; hideTip(); });
    listen(canvasHost, 'pointermove', event => {
      if (pointers.has(event.pointerId)) pointers.set(event.pointerId, [event.clientX, event.clientY]);
      if (pointers.size === 2) { const [a, b] = [...pointers.values()], gap = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch > 0 && gap > 0) { distance = desiredDistance = THREE.MathUtils.clamp(distance * pinch / gap, 3.5, 420); touched(); } pinch = gap; if (drag) drag.moved = true; return; }
      pinch = 0;
      if (drag && pointers.size === 1) {
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (drag.pan) {
          const unit = 2 * distance * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) / stageHeight;
          const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0), up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
          target.addScaledVector(right, -dx * unit).addScaledVector(up, dy * unit); desiredTarget.copy(target);
        } else { yaw -= dx * .006; pitch = THREE.MathUtils.clamp(pitch + dy * .005, -1.35, 1.35); }
        touched(); drag.moved ||= Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5; drag.x = event.clientX; drag.y = event.clientY; return;
      }
      const box = stage.getBoundingClientRect(), x = event.clientX - box.left, y = event.clientY - box.top, i = pick(x, y);
      if (i >= 0) showTip(i, x, y); else hideTip();
    });
    listen(canvasHost, 'pointerup', event => {
      const click = drag && !drag.moved && pointers.size === 1; pointers.delete(event.pointerId);
      if (click) { const box = stage.getBoundingClientRect(), i = pick(event.clientX - box.left, event.clientY - box.top); if (i >= 0) { select(i); onWork(stars[i].id); } }
      if (!pointers.size) drag = null; pinch = 0;
    });
    listen(canvasHost, 'pointercancel', () => { pointers.clear(); drag = null; pinch = 0; });
    listen(canvasHost, 'pointerleave', hideTip);
    listen(canvasHost, 'wheel', event => { event.preventDefault(); distance = desiredDistance = THREE.MathUtils.clamp(distance * Math.exp(event.deltaY * .0011), 3.5, 420); touched(); }, { passive: false });
    listen(canvasHost, 'keydown', event => {
      const key = event.key; if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-', '=', 'Home'].includes(key)) return; event.preventDefault();
      if (key === 'Home') { fly(); return; }
      if (key === 'ArrowLeft') yaw += .13; if (key === 'ArrowRight') yaw -= .13;
      if (key === 'ArrowUp') pitch = Math.min(1.35, pitch + .1); if (key === 'ArrowDown') pitch = Math.max(-1.35, pitch - .1);
      if (key === '+' || key === '=') distance = desiredDistance = Math.max(3.5, distance * .8); if (key === '-') distance = desiredDistance = Math.min(420, distance * 1.25);
      touched();
    });

    let aspect = 0;
    const observer = new ResizeObserver(() => {
      const box = stage.getBoundingClientRect(); if (box.width < 2 || box.height < 2) return;
      stageWidth = box.width; stageHeight = box.height; renderer.setSize(box.width, box.height, false); camera.aspect = box.width / box.height;
      const area = freeArea(true);
      camera.setViewOffset(box.width, box.height, -((area.left + area.right) / 2 - box.width / 2), -((area.top + area.bottom) / 2 - box.height / 2), box.width, box.height);
      camera.updateProjectionMatrix();
      if (Math.abs(aspect - camera.aspect) > .001 || !introduced) {
        aspect = camera.aspect;
        if (!introduced) {
          introduced = true; fly(true);
          if (pendingLocate) { const id = pendingLocate; pendingLocate = ''; locate(id); }
          else if (motion && lens === 'scale') { distance = 8.5; introUntil = performance.now() + 5200; }
          flying = true;
        } else fly();
      }
      drawTimeline();
    });
    observer.observe(stage); cleanups.push(() => observer.disconnect());

    let last = 0;
    function animate(now) {
      if (disposed) return; frame = requestAnimationFrame(animate);
      if (container.closest('[hidden]') || document.hidden) { last = now; return; }
      const delta = Math.min((now - last) / 1000, .05) || .016; last = now;
      if (playing) { playCarry += delta * (cursor < 1900 ? 26 : 13); if (playCarry >= 1) { const stepYears = Math.floor(playCarry); playCarry -= stepYears; const next = (cursor === Infinity ? maxYear : cursor) + stepYears; if (next >= maxYear) { setPlaying(false); setCursor(Infinity); } else setCursor(next, false); } }
      if (motion && !flying && !drag && now - lastTouch > 5000 && lens !== 'time') { yaw += delta * .018; desiredYaw = yaw; }
      const ease = motion ? 1 - Math.exp(-delta * 3.2) : 1;
      target.lerp(desiredTarget, ease);
      if (flying) { yaw += (desiredYaw - yaw) * ease; pitch += (desiredPitch - pitch) * ease; }
      distance += (desiredDistance - distance) * (motion ? 1 - Math.exp(-delta * (now < introUntil ? 1.25 : 3.2)) : 1);
      if (flying && Math.abs(desiredDistance - distance) < .05 && target.distanceTo(desiredTarget) < .05 && Math.abs(desiredYaw - yaw) < .003) flying = false;
      camera.position.set(target.x + Math.sin(yaw) * Math.cos(pitch) * distance, target.y + Math.sin(pitch) * distance, target.z + Math.cos(yaw) * Math.cos(pitch) * distance);
      camera.lookAt(target); camera.updateMatrixWorld();
      if (mix < 1) { mix = Math.min(1, (now - mixFrom) / 1500); uniforms.uMix.value = mix; }
      for (const [id, group] of Object.entries(decor)) { const goal = id === lens ? Math.max(0, (mix - .35) / .65) : Math.max(0, 1 - mix * 2.6); if (group.userData.k !== goal) { group.userData.k = goal; setOpacity(group, goal); } }
      if (motion) { earth.rotation.y += delta * .03; moonOrbit.rotation.y += delta * .05; marsOrbit.rotation.y += delta * .02; mars.rotation.y += delta * .04; }
      uniforms.uTime.value = motion ? now / 1000 : 0; uniforms.uRef.value = distance; uniforms.uBase.value = baseDistance;
      renderer.render(scene, camera);

      const view = Math.atan2(camera.position.x - target.x, camera.position.z - target.z), clear = freeArea();
      const shown = [];
      for (const label of labels) {
        const show = label.lens === lens && mix > .6; let visible = false;
        if (show) {
          projected.fromArray(label.position(view)).project(camera); const x = (projected.x * .5 + .5) * stageWidth, y = (-projected.y * .5 + .5) * stageHeight;
          visible = projected.z > -1 && projected.z < 1 && x > clear.left + 30 && x < clear.right - 30 && y > clear.top + 6 && y < clear.bottom - 22;
          // earlier labels win; a later one that would sit on top of them waits until there is room
          if (visible) { const reach = label.reach ??= label.element.offsetWidth / 2 + 6; visible = !shown.some(other => Math.abs(other[1] - y) < 17 && Math.abs(other[0] - x) < other[2] + reach); if (visible) { shown.push([x, y, reach]); label.element.style.transform = `translate(${x}px, ${y}px)`; } }
        }
        label.element.style.visibility = visible ? '' : 'hidden';
      }
      if (selected >= 0) { const s = mix >= 1 && lit[selected] ? screenOf(selected) : null; mark.hidden = !s; if (s) mark.style.transform = `translate(${s[0]}px, ${s[1]}px)`; }
      updateNames(now);
    }
    sceneReady = true; frame = requestAnimationFrame(animate);
  }

  try { createScene(); }
  catch (error) { root.classList.add('is-flat'); canvasHost.innerHTML = '<p class="atlas-fallback">当前设备没有启用三维渲染。<br>左侧分区、时间游标与右侧列表仍可使用。</p>'; console.warn('3D atlas unavailable', error); }

  function update(input, topic = '') {
    if (disposed) return;
    const incoming = list(input);
    if (incoming.some(work => work && !indexById.has(work.id))) {
      // new records: rebuild the registry and every layout
      register([...stars, ...incoming.filter(work => work && !indexById.has(work.id))]);
      if (points) buildPoints();
    }
    lit.fill(0); litCount = 0;
    for (const work of incoming) { const i = indexById.get(work?.id); if (i !== undefined && !lit[i]) { lit[i] = 1; litCount++; stars[i] = work; } }
    current = incoming;
    if (points) { const attribute = points.geometry.attributes.aLit; if (attribute.array.length === lit.length) { attribute.array.set(lit); attribute.needsUpdate = true; } }
    // keep each lens's focus in step with the site-wide filters
    const before = focus[lens];
    const era = document.getElementById('filter-era')?.value, yearStatus = document.getElementById('global-yearStatus')?.value;
    focus.topic = topic || 'all';
    focus.time = yearStatus === 'unknown' ? 'unknown' : ERAS.some(item => item.id === era) ? era : 'all';
    const moved = focus[lens] !== before;
    hideTip(); listPage = 1; if (moved && sceneReady && introduced) fly(); refresh();
    publish({ works: stars, current, lens, locate, setLens });
  }
  function goZone(id, { notify = false } = {}) { if (disposed || (id !== 'all' && !zoneById.has(id))) return; setFocus('scale', id, { notify }); }

  refresh();
  publish({ works: stars, current, lens, locate, setLens });
  return {
    update, goZone, setZone: id => goZone(id), locate, setLens,
    destroy() {
      if (disposed) return; disposed = true; clearTimeout(searchTimer); clearTimeout(cursorTimer); cancelAnimationFrame(frame); cleanups.forEach(fn => fn());
      if (scene) scene.traverse(object => { object.geometry?.dispose(); for (const material of [].concat(object.material || [])) { material.map?.dispose(); material.dispose(); } });
      renderer?.dispose(); container.replaceChildren();
    }
  };
}
