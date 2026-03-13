# AI Usage Report
**Midterm Lab Test: Smart Class Check-in App**

For this midterm project, I used AI tools to help me build the app faster and troubleshoot bugs, but I made sure to carefully read and understand the code it provided before adding it to my project. 

### How I used AI:
1. **Setting up the Project & Navigation:** I knew I wanted separate screens for Onboarding, Dashboard, Check-In, and History. I used the AI to help me write the boilerplate code for `@react-navigation/stack` so I could easily route between these screens.
2. **Firebase Firestore Integration:** I designed the data fields I wanted to save (Student ID, GPS, QR data, topics, mood, feedback). I used AI to get the exact syntax for `addDoc` and `getDocs` using the newer Firebase v9 Modular SDK. I structured the database collection myself.
3. **Camera & GPS permissions:** I used AI to help me quickly figure out how to ask the user for `expo-camera` and `expo-location` permissions, since mobile devices require very specific permission code (`requestForegroundPermissionsAsync()`).
4. **UI Design (Academic Theme):** I asked the AI to suggest a professional "university" color palette (Navy Blue, White, and Gold). I then used those HEX codes to style my own custom buttons, input fields, and success popups to make the app look clean and modern.
5. **Debugging & Fixing Errors:** Whenever my app crashed or the navigation back button did something weird, I asked the AI to explain the error. For example, it helped me write a custom step-by-step back button so I wouldn't accidentally exit the form entirely.

### My Engineering Understanding:
Even though AI helped generate some of the code, I directed the entire system design. I mapped out the user flow in the PRD, decided how the screens should connect, and structured the database. 

I know exactly how the app works under the hood:
- The app uses React state (`useState`) to track what step of the form the user is on.
- When they scan a QR code or get GPS, it saves that data temporarily in the app's memory.
- When they click submit, the `handleSubmit` function packages all the state variables into an object and uses Firebase's `addDoc` to push it to the `checkin_records` collection on the cloud.

I used the AI as a coding assistant to speed up my work, not as a shortcut to skip learning the concepts.
