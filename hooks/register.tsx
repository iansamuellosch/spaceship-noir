import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { scene } from './scene.js'
// scene.js holds the SVG; it is plain JS so the engine loads it like make-colors.js.

// Noir poster: ink-black grays, aged-paper cream type, one red, a little sage.
const { theme, problems } = makeColors({
  label: 'Space Cowboy',
  only: 'dark',
  roles: { accent: '#d23a2a', danger: '#e0603a', success: '#8aa592', warning: '#d6b25e', pro: '#a993c4' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0a0a0c',
        'surface-1': '#111113',
        'surface-2': '#17171a',
        'surface-3': '#1c1c20',
        'text-primary': '#efe6d2',
        'text-secondary': '#c9bfa9',
        'text-muted': '#9d9482',
      },
    },
  },
})

const BASE: ThemeSetArgs = {
  colors: theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'space-cowboy', glass: { blur: 16, tint: '#0a0a0c', opacity: 0.6 } },
}

const LOOK: ThemeSetArgs = {
  ...BASE,
  style: {
    Heading: { color: '#efe6d2', letterSpacing: 2, fontWeight: 'semibold' },
    UserMessage: {
      backgroundColor: '#141416',
      borderColor: '#2e2b2a',
      borderWidth: 1,
      radius: 0,
      color: '#efe6d2',
    },
    ToolUse: { fontFamily: ['mono'] },
  },
}

// Context fill, rounded to 5% steps so the scene only redraws when it moves.
let fill = 0
const bucket = (p: number | undefined) => Math.max(0, Math.min(100, Math.round((p ?? 0) / 5) * 5))

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) $.ui.toast(unpainted)

    try {
      fill = bucket((await $.session.usage()).context.percent)
    } catch {
      fill = 0
    }

    let set
    try {
      set = await $.theme.set(LOOK)
    } catch (error) {
      $.ui.log(String(error))
      set = await $.theme.set(BASE)
    }
    if (!set.isDrawn) $.ui.status(set.reason)

    return next(e)
  })

  on('session.measure', ($, e, next) => {
    const now = bucket(e.context.percent)
    if (now !== fill) {
      fill = now
      $.ui.invalidate('ui.render')
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') return next(e)
    if (e.props.scene !== 'space-cowboy') return next(e)

    const { Svg } = $.ui.resolve(e)
    const fuel = 100 - fill
    return (
      <Svg
        source={scene(fill)}
        alt={`A red interceptor climbs vertical speed lines on the right edge, trailing a long contrail, fuel at ${fuel} percent`}
        isInteractive
      />
    )
  })
}
