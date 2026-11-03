# Unused: Floating 3D Puck (archived)

These files are the old homepage hero, which rendered an interactive, spinning
3D puck in the browser with React Three Fiber (`three`, `@react-three/fiber`,
`@react-three/drei`). They're kept for reference but are no longer used.

## Why it was replaced

The 3D version was causing high bandwidth usage on Netlify.

- **The model was too heavy.** `finalPuck2-optimized.glb` was ~6.8 MB. The mesh
  alone had ~196K triangles (~99K vertices) stored uncompressed (no Draco or
  meshopt compression), which is far more detail than a puck needs. The compressed version, 
  however lost a lot of detail so I decided to move on from furtehr compression.
- **Every visitor downloaded it.** The model was preloaded when the app loaded,
  so every page visit pulled the full file. That included visits that went
  straight to `/schedule`.
- **Bandwidth kept climbing.** Monthly bandwidth grew from ~5 GB to ~16 GB to
  ~43 GB as hockey season picked up, while requests only went from ~14K to ~40K.
  Almost all of that bandwidth was this one model, and on Netlify's credit-based
  plan, bandwidth costs credits.
- **It was also heavy on phones.** Loading WebGL, an HDRI environment and a
  large mesh slowed the first load on mobile.

## What replaced it

The puck was animated in Blender `animation.blend` as a seamless 4-second loop (120 frames at
30 fps), rendered as transparent PNG frames, and encoded with ffmpeg into a
small looping WebM video. The new `Hero` component plays it with
`<video autoPlay muted loop playsInline>`.

Benefits:
- Much smaller download per visit
- Removes the three.js packages from the JS bundle
- Plays smoothly on every device, with no WebGL needed
- Looks the same as the 3D version (except it can't be dragged to rotate)

