# Hero alternatives

Three proposals for the homepage decoration. The application source and its current orbit remain unchanged. This directory is not included in the published `out/` export.

## View

Build the app first if `out/` is absent, then run from the project root:

```sh
node design/hero-alternatives/serve.mjs
```

Open http://localhost:4175/. Switch concepts, use Desktop/Mobile, or pause the animation. Direct links: `?variant=cross`, `?variant=mobius`, `?variant=waves`.

The preview serves a static copy of the actual first screen from the production export. Its React scripts are stripped in the preview response so editing the decoration does not interfere with hydration. No production files are modified. The local server listens only on 127.0.0.1.

## Design direction

The existing palette, fonts, layout and left alignment are preserved: background #08090b, surfaces #101114, text #f1f0f5, secondary text #96979f and restrained lavender #b6acf5. The right-hand decoration is the only changed visual element. Each concept has a distinct silhouette and a single calm movement.

1. **Glass cross:** the approved transparent brand artwork, at a larger size with restrained floating motion. The strongest connection to the personal brand.
2. **Möbius ribbon:** an original parametric SVG surface with a half twist. A continuous loop, slow three-dimensional rotation and thin silver-lavender lines. Recommended for an abstract direction.
3. **Wave field:** an original parametric SVG surface with moving waves. A planar, quieter alternative with a flowing mesh rather than a revolving object.

The cross reuses the existing approved asset; no new bitmap generation was needed. The ribbon and wave field are code-native animated geometry. Geometry updates are limited to approximately 30 fps; updates pause when the document is hidden. Reduced motion starts the preview paused. No WebGL or added dependencies.

## Captures and checks

```sh
node design/hero-alternatives/capture.mjs
```

Saves the three desktop screenshots and a mobile screenshot under `previews/`. The capture script checks variant selection, actual geometry movement, pause behavior, mobile layout, reduced motion and browser runtime errors. These are preview checks, not changes to the production app test suite.
