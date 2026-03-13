# Smart Class Check-in & Learning Reflection App

A **React Native (Expo)** mobile application for university class attendance and learning reflection. Built for the Mobile Application Development midterm exam.

## Features

- ✅ **Class Check-in** — GPS location + QR code scan + pre-class reflection form
- 🎓 **Finish Class** — GPS + QR scan + post-class learning reflection
- 📋 **History** — View all check-in/checkout records from Firebase Firestore
- ☁️ **Firebase Firestore** — All data stored and retrieved in real-time
- 🌐 **Firebase Hosting** — Deployed as a web app

## Tech Stack

- React Native + Expo
- Firebase Firestore
- expo-location (GPS)
- expo-camera (QR Code Scanning)
- @react-navigation/stack

## Project Structure

```
smart-checkin-app/
├── App.js                  # Root navigator
├── firebase.js             # Firebase config
├── screens/
│   ├── HomeScreen.js
│   ├── CheckInScreen.js
│   ├── FinishClassScreen.js
│   └── HistoryScreen.js
├── components/
│   └── MoodSelector.js
├── PRD.md
├── README.md
└── ai_usage.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Expo CLI: `npm install -g expo-cli`
- Firebase account

### Installation

```bash
git clone <your-repo-url>
cd smart-checkin-app
npm install --legacy-peer-deps
```

### Firebase Configuration

The `firebase.js` file is pre-configured for the `smart-class-check-in-app` project.

To use your own Firebase project:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project → Add Web app
3. Enable **Firestore Database** (start in test mode)
4. Replace the config in `firebase.js`

### How to Run

**Mobile (Expo Go app):**
```bash
npx expo start
# Scan the QR code with Expo Go on your phone
```

**Web browser:**
```bash
npx expo start --web
```

## Firebase Configuration Notes

- **Project ID:** `smart-class-check-in-app`
- **Firestore Collection:** `checkin_records`
- **Rules:** Currently in test mode (allow all reads/writes)
- For production, add authentication and tighten Firestore rules

## Deployment (Firebase Hosting)

```bash
# Build web version
npx expo export --platform web

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Live URL: *(see Firebase Hosting URL after deployment)*

## Firestore Data Structure

```
checkin_records/{docId}
  studentId:     string
  type:          "checkin" | "checkout"
  timestamp:     Timestamp
  gpsLat:        number
  gpsLng:        number
  qrData:        string
  previousTopic: string   (checkin)
  expectedTopic: string   (checkin)
  moodBefore:    number   (checkin, 1-5)
  learnedToday:  string   (checkout)
  feedback:      string   (checkout)
```
