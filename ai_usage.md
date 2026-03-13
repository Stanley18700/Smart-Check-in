# AI Usage Report

**Project:** Smart Class Check-in & Learning Reflection App  
**Course:** 1305216 Mobile Application Development  
**Exam Date:** 13 March 2026  

---

## AI Tools Used

| Tool | Purpose |
|------|---------|
| **Google Antigravity (Gemini)** | Primary AI assistant for code generation |

---

## What AI Generated

1. **Project scaffolding** — Expo project initialization and dependency selection
2. **Firebase integration** — `firebase.js` config and Firestore `addDoc`/`getDocs` calls
3. **Navigation setup** — React Navigation `createStackNavigator` with styled headers
4. **Screen components** — `HomeScreen`, `CheckInScreen`, `FinishClassScreen`, `HistoryScreen` layout and logic
5. **QR Code scanner** — `CameraView` with `onBarcodeScanned` and platform-aware web fallback
6. **GPS location** — `expo-location` permission requests and coordinate capture
7. **MoodSelector component** — Emoji-based 1–5 scale input
8. **Documentation** — PRD.md, README.md structure and content

---

## What I Understand and Can Explain

1. **Firebase Firestore flow** — `addDoc` writes a new document to `checkin_records`, `getDocs` with `orderBy` retrieves all records sorted by timestamp. I understand how collections and documents work in Firestore.

2. **Expo Location API** — `requestForegroundPermissionsAsync()` asks for permission, then `getCurrentPositionAsync()` returns `coords.latitude` and `coords.longitude`.

3. **expo-camera barcode scanning** — `CameraView` with `onBarcodeScanned` prop fires when a QR code enters the frame, returning `{ type, data }`. `useCameraPermissions()` handles the permission flow.

4. **React Navigation** — `createStackNavigator()` creates a stack of screens. Each screen receives `navigation.navigate("ScreenName")` to push a new screen.

5. **3-step UX flow** — Using `useState(1)` for `step`, each step advances the state: 1=GPS capture, 2=QR scan, 3=form + submit. Conditional rendering shows one step at a time.

6. **Platform.OS check** — Since `expo-camera` doesn't fully work on web, `Platform.OS === "web"` detects the web environment and generates a mock QR string instead.

---

## What I Modified / Implemented Understanding

- Chose **React Native (Expo)** over Flutter as permitted by instructor, since it achieves the same Firebase integration
- Designed the 3-step UX flow for both check-in and finish-class screens
- Structured the Firestore document schema to handle both `checkin` and `checkout` record types in a single collection
- Added web platform fallback for QR scanning (since camera API differs between native and web)
- Applied a dark, modern theme with accent colors to differentiate check-in (red) and finish-class (green) flows
