# Spaceship Noir

A dark, minimal space-poster theme for Claude Code. It is inspired by retro sci-fi poster art.

- **Backdrop:** a near-black starfield with occasional star glints. All the art is kept to the screen edges, so the chat stays clear.
- **The ship:** a flat red fighter rides three parallel stripes (red, cream and sage) up the right edge. The red stripe curves away to the left near the top.
- **Context window:** as your context fills, the ship climbs higher and shrinks into the distance on a lengthening contrail. A `FUEL` gauge on the left edge drains at the same time and turns red at 25% or less. Run `/compact` and the ship is back low with a full tank.
- **App colors:** ink-black surfaces, cream text, one red accent and sage for success.

The theme draws in the Claude desktop app (Code tab) and the mobile app. Claude Code in a terminal or an editor doesn't draw themes. It is dark mode only.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install space-cowboy --marketplace iansamuellosch/spaceship-noir
```

Answer `y` to add the marketplace, then press Enter to install it for your user.

From a shell:

```
claude plugin install space-cowboy --marketplace iansamuellosch/spaceship-noir
```

In the desktop app, where `/plugin` doesn't run:
1. Click **+** next to the prompt box, then **Plugins**.
2. Choose **Add marketplace** and enter `iansamuellosch/spaceship-noir`.
3. Choose **Add plugin**.

New sessions pick it up after it is installed.
