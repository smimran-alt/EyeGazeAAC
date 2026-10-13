# EyeGaze AAC — Web Version 2.4

Experimental static eye-gaze assisted communication application. Run in browsers with webcam support, or use six large buttons by touch.

## Features
- Water, Food, Help, More, Yes, No with text-to-speech
- Browser webcam tracking via MediaPipe Face Mesh (loaded from CDN)
- Nine-point gaze calibration and independent accuracy testing
- Blink rejection, tracking timeout, adaptive smoothing and dwell-based selection
- Adjustable dwell time, saved local profile, center recheck
- Accuracy summary and downloadable JSON report

## GitHub Pages
In the repository open **Settings → Pages → Build and deployment**:
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)
- Save

Published website (once Pages is enabled): https://smimran-alt.github.io/EyeGazeAAC/

## Use
1. On HTTPS page tap Start webcam and allow camera.
2. Run 9-point calibration and keep your head and phone stable.
3. Run accuracy test and review measurements.
4. Look at a communication button for the chosen dwell duration, or select by touch.

## Safety and privacy
This is an experimental accessibility prototype, **not a medical device or validated primary AAC system**. Always keep an alternative communication method available. Camera frames are processed in the visitor's browser, with MediaPipe runtime/model downloaded from a third-party CDN. No server-side video upload feature is implemented. Saved profiles use localStorage; clearing browser data removes them. Test browser/phone compatibility before sharing widely, and avoid uploading identifiable children's recordings or private calibration reports to a public repository.
