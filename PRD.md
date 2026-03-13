# PRD — Smart Class Check-in & Learning Reflection App

**Course:** 1305216 Mobile Application Development  
**Date:** 13 March 2026  

---

## Problem Statement

University attendance tracking is typically done manually by sign-in sheets or verbal calls — which are easy to fake and offer no learning insight. **Smart Check-in** solves this by combining GPS location, QR code verification, and structured learning reflections to confirm both **physical presence** and **active participation**.

---

## Target Users

| User | Role |
|------|------|
| **Students** | Check in, reflect on learning, view history |
| **Instructor** | Displays QR code at start/end of class; reviews Firebase data |

---

## Feature List

### 1. Class Check-in (Before Class)
- Capture **GPS coordinates** to confirm classroom presence
- **Scan QR code** shown by instructor to verify session
- Pre-class reflection form:
  - What was covered in the **previous class**
  - What topic they **expect to learn today**
  - **Mood before class** (1–5 emoji scale)

### 2. Finish Class (After Class)
- Capture **GPS coordinates** at end of session
- **Scan end-of-class QR code**
- Post-class reflection form:
  - **What they learned today**
  - **Feedback** about class/instructor (optional)

### 3. History View
- Display all personal check-in and checkout records from Firebase
- Shows timestamps, GPS, mood, and reflection answers

---

## User Flow

```
Launch App
    │
    ├── [Check In]
    │       ├── Step 1: Get GPS Location
    │       ├── Step 2: Scan Class QR Code
    │       └── Step 3: Fill Pre-class Form → Save to Firebase
    │
    ├── [Finish Class]
    │       ├── Step 1: Get GPS Location
    │       ├── Step 2: Scan End QR Code
    │       └── Step 3: Fill Reflection Form → Save to Firebase
    │
    └── [My Records] → Fetch & display Firestore records
```

---

## Data Fields

| Field | Type | Source |
|-------|------|--------|
| `studentId` | string | Manual input |
| `type` | `"checkin"` \| `"checkout"` | Auto |
| `timestamp` | Timestamp | Auto (Firestore) |
| `gpsLat` / `gpsLng` | number | expo-location |
| `qrData` | string | QR scan |
| `previousTopic` | string | Form (check-in) |
| `expectedTopic` | string | Form (check-in) |
| `moodBefore` | number 1–5 | Emoji selector (check-in) |
| `learnedToday` | string | Form (checkout) |
| `feedback` | string | Form (checkout, optional) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo SDK 52) |
| Navigation | React Navigation v6 (Stack) |
| QR Scanning | expo-camera (barcodeScannerSettings) |
| GPS | expo-location |
| Database | Firebase Firestore (JS SDK v9) |
| Hosting | Firebase Hosting (Expo web export) |

---

## System Requirements

- **Mobile:** Android / iOS with Expo Go app
- **Web:** Modern browser (Chrome, Safari, Firefox)
- **Backend:** Firebase project `smart-class-check-in-app`
- **Permissions:** Camera (QR), Location (GPS)
