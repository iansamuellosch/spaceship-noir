// Minimal noir poster, art kept to the edges so the chat column stays clear.
// Context fill p (0 to 100) drives it: the fighter climbs the speed lines on
// the right edge, shrinking into the dark, while the fuel gauge on the left drains.

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const f = n => n.toFixed(1)

const CREAM = '#efe6d2'
const RED = '#d23a2a'
const SHADE = '#a92b1f'
const DEEP = '#7a1d14'
const SAGE = '#8aa592'

function stars() {
  const r = rng(11)
  let out = ''
  for (let i = 0; i < 150; i++) {
    const x = r() * 1600
    const y = r() * 1000
    const big = r()
    const rad = big > 0.96 ? 1.8 : big > 0.8 ? 1.1 : 0.6
    const tw = i % 5 === 0 ? ` class="tw t${i % 3}"` : ''
    out += `<circle cx="${f(x)}" cy="${f(y)}" r="${rad}" fill="${CREAM}" opacity="${f(0.2 + r() * 0.55)}"${tw}/>`
  }
  return out
}
const STARS = stars()

// A handful of four-point glints that open and close now and then, mostly near the edges.
function glints() {
  const spots = [
    [140, 120, 0], [260, 640, 3], [90, 880, 7], [380, 300, 11],
    [1240, 140, 2], [1330, 520, 6], [1540, 760, 9], [1180, 880, 13], [820, 60, 5],
  ]
  return spots
    .map(([x, y, d], i) => {
      const s = i % 3 === 0 ? 9 : 6
      return `<g transform="translate(${x} ${y})"><path class="glint" style="animation-delay:${d}s" d="M0 ${-s} L1 -1 L${s} 0 L1 1 L0 ${s} L-1 1 L${-s} 0 L-1 -1 Z" fill="${CREAM}"/></g>`
    })
    .join('')
}
const GLINTS = glints()

// An original interceptor, top view, nose up, origin at the engine plane.
// One flat silhouette, poster style.
const SHIP = `
<g>
  <ellipse class="burn" cx="0" cy="9" rx="5" ry="14" fill="${CREAM}"/>
  <path d="M0 -210 L8 -170 L10 -150 L28 -128 L28 -120 L11 -126 L13 -90 L68 -20 L70 -6 L40 -10 L14 -24 L12 0 L-12 0 L-14 -24 L-40 -10 L-70 -6 L-68 -20 L-13 -90 L-11 -126 L-28 -120 L-28 -128 L-10 -150 L-8 -170 Z" fill="${RED}"/>
  <path d="M0 -174 L4 -160 L4 -138 L0 -132 L-4 -138 L-4 -160 Z" fill="#0a0a0c"/>
</g>`

const STYLE = `
  .tw { animation: tw 7s ease-in-out infinite; }
  .t1 { animation-delay: 2.5s; animation-duration: 9s; }
  .t2 { animation-delay: 5s; animation-duration: 11s; }
  @keyframes tw { 0%, 100% { opacity: 0.75; } 50% { opacity: 0.2; } }
  .burn { animation: burn 2.4s ease-in-out infinite; }
  @keyframes burn { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }
  .sway { animation: sway 12s ease-in-out infinite; }
  @keyframes sway { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-3px, -5px); } }
  .rush { animation: rush 14s linear infinite; }
  @keyframes rush { to { stroke-dashoffset: -400; } }
  .glint { animation: glint 15s ease-in-out infinite; transform-origin: 0px 0px; transform: scale(0); opacity: 0; }
  @keyframes glint { 0%, 86%, 100% { transform: scale(0) rotate(0deg); opacity: 0; } 91% { transform: scale(1) rotate(20deg); opacity: 0.95; } 96% { transform: scale(0.2) rotate(40deg); opacity: 0; } }
  .low { animation: low 3s ease-in-out infinite; }
  @keyframes low { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
`

const DEFS = `
<defs>
  <radialGradient id="sky" cx="1" cy="1" r="1.2">
    <stop offset="0" stop-color="#170b0b"/>
    <stop offset="0.5" stop-color="#0c0b0e"/>
    <stop offset="1" stop-color="#060608"/>
  </radialGradient>
  <linearGradient id="rise" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="#ffffff" stop-opacity="1"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity="0.15"/>
  </linearGradient>
  <mask id="risemask"><rect x="0" y="0" width="1600" height="1000" fill="url(#rise)"/></mask>
  <linearGradient id="trail" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${CREAM}" stop-opacity="0.95"/>
    <stop offset="1" stop-color="${CREAM}" stop-opacity="0.3"/>
  </linearGradient>
</defs>`

// The right edge: speed lines, contrail and the fighter climbing them.
function flight(p) {
  const t = p / 100
  const sx = 1500
  const sy = 830 - t * 620
  const sc = 1 - t * 0.55
  // Contrail in the ship's own units, so it sways with the ship and stays centered.
  const len = (1000 - sy) / sc + 20
  const w0 = 1.2 / sc
  const w1 = 2.5 / sc
  return `
<svg width="100%" height="100%" viewBox="0 0 1600 1000" preserveAspectRatio="xMaxYMid meet">
  <g mask="url(#risemask)" fill="none" stroke-width="8" stroke-linejoin="miter">
    <path d="M1412 1010 L1412 440 C1412 360 1380 310 1320 250 L1190 -20" stroke="${RED}" opacity="0.9"/>
    <line x1="1425" y1="1000" x2="1425" y2="0" stroke="${CREAM}" opacity="0.8"/>
    <line x1="1438" y1="1000" x2="1438" y2="0" stroke="${SAGE}" opacity="0.8"/>
    <line x1="1584" y1="0" x2="1584" y2="1000" stroke="${CREAM}" stroke-width="1.5" stroke-dasharray="60 140" opacity="0.3" class="rush"/>
  </g>
  <g transform="translate(${f(sx)} ${f(sy)}) scale(${f(sc)})">
    <g class="sway"><polygon points="${f(-w0)},12 ${f(w0)},12 ${f(w1)},${f(len)} ${f(-w1)},${f(len)}" fill="url(#trail)"/>${SHIP}</g>
  </g>
</svg>`
}

// The left edge: a thin rule and the fuel gauge.
function gauge(p) {
  const left = 100 - p
  const top = 300
  const h = 400
  const fillH = (h * left) / 100
  const low = left <= 25
  const color = low ? RED : CREAM
  let ticks = ''
  for (let i = 0; i <= 10; i++) {
    const y = top + (h * i) / 10
    const w = i % 5 === 0 ? 14 : 7
    ticks += `<line x1="${76 - w}" y1="${y}" x2="76" y2="${y}" stroke="${CREAM}" stroke-width="1" opacity="0.45"/>`
  }
  return `
<svg width="100%" height="100%" viewBox="0 0 1600 1000" preserveAspectRatio="xMinYMid meet">
  <g mask="url(#risemask)" fill="none" stroke-width="4" stroke-linejoin="miter">
    <line x1="30" y1="0" x2="30" y2="1000" stroke="${RED}" opacity="0.7"/>
    <line x1="37" y1="0" x2="37" y2="1000" stroke="${CREAM}" opacity="0.5"/>
    <polyline points="44,-10 44,820 -40,930" stroke="${SAGE}" opacity="0.7"/>
  </g>
  <g font-family="monospace" fill="${CREAM}">
    <text x="62" y="270" font-size="13" letter-spacing="4" opacity="0.6">FUEL</text>
    <text x="88" y="${top + 5}" font-size="12" opacity="0.5">F</text>
    <text x="88" y="${top + h + 5}" font-size="12" opacity="0.5">E</text>
    <text x="62" y="${top + h + 36}" font-size="15" letter-spacing="2" fill="${color}" opacity="0.85">${String(left).padStart(3, '0')}</text>
  </g>
  ${ticks}
  <line x1="78" y1="${top}" x2="78" y2="${top + h}" stroke="#2c2a2e" stroke-width="4"/>
  <rect x="76" y="${f(top + h - fillH)}" width="4" height="${f(fillH)}" fill="${color}"${low ? ' class="low"' : ''}/>
</svg>`
}

export function scene(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>${STYLE}</style>
${DEFS}
<rect width="1600" height="1000" fill="url(#sky)"/>
${STARS}
${GLINTS}
${flight(p)}
${gauge(p)}
</svg>`
}
