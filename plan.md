# Plan: Photo to Slow Motion Animator

A frontend-only application that allows users to upload a photo and apply a "slow motion" animation effect. Since true AI-based video generation (interpolating frames) is a heavy server-side task, this plan focuses on high-quality frontend simulations of slow-motion effects (Ken Burns effect, parallax, or CSS-based fluid motion).

## Scope Summary
- **Upload:** Users can drag-and-drop or click to upload an image.
- **Preview:** Display the original image.
- **Animation Engine:** Apply a CSS/Canvas-based "slow motion" effect (pan, zoom, and subtle distortion/shift).
- **Controls:** Adjust speed, intensity, and direction of the slow-motion effect.
- **Export:** (Optional/Bonus) Simple download of the current frame or instructions on how to screen record (since real video export requires heavy libraries like ffmpeg.wasm).

## Non-Goals
- Real AI video generation (e.g., Sora/Runway style).
- Server-side processing.
- Multi-image video editing.

## Assumptions
- The "slow motion" effect will be a simulated visual effect (Ken Burns or parallax) using CSS/Framer Motion.
- Persistence is not required; state will be lost on refresh.

## Affected Areas
- `src/App.tsx`: Main application structure and layout.
- `src/components/PhotoUpload.tsx`: Component for handling file selection.
- `src/components/SlowMotionViewer.tsx`: The core component that renders the animated photo.
- `src/components/Controls.tsx`: UI for adjusting animation parameters.

## Phases

### Phase 1: Setup & Basic UI
- Initialize project structure.
- Add necessary UI components from the pre-installed library (Button, Slider, Card).
- Implement the basic layout (Upload section and Preview section).

### Phase 2: Upload Logic
- Implement image file handling.
- Generate a preview URL for the uploaded image.
- Handle state management for the active photo.

### Phase 3: Animation Engine (Slow Motion)
- Build the `SlowMotionViewer` component.
- Use CSS `keyframes` or `framer-motion` to create a smooth, slow zooming/panning effect (Ken Burns).
- Add a "depth" or "fluid" effect using CSS filters or subtle SVG displacement maps if possible.

### Phase 4: Control Panel
- Add sliders for:
    - Speed (duration of the animation loop).
    - Zoom Level (scale factor).
    - Panning intensity.
- Bind these controls to the animation properties in Phase 3.

### Phase 5: Refinement
- Improve the "slow motion" feel with easing functions.
- Add a "Reset" and "Play/Pause" functionality.
- Ensure responsiveness for mobile viewing.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup UI, upload logic, and the animation engine.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** Build the entire Photo-to-Slow-Motion application.
- **Key Deliverables:**
    - A drag-and-drop upload zone.
    - A preview window that applies a smooth `transform: scale() translate()` animation to the image.
    - UI controls (using Shadcn components) to adjust the duration and scale of the animation.
- **Files:** `src/App.tsx`, `src/components/SlowMotionViewer.tsx`, `src/components/Controls.tsx`.
- **Depends on:** none
- **Acceptance criteria:** User can upload a photo and see it moving slowly in a loop; they can adjust the speed using a slider.
