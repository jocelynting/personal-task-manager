# Personal Task Manager

A simple Expo + React Native task manager built with TypeScript and Expo Router.

## Features

- View tasks with title, description, and status
- Add, edit, delete, and toggle task status
- Task details screen with inline editing
- Search tasks by title

## Usage Notes

- Add: tap the + button in the header to create a task.
- Edit: open a task, edit fields inline, then press Save Changes.
- List delete: swipe left on a task and tap Delete.
- Details delete: tap the Delete pill in the title row.
- Status toggle (list): tap the status circle or the status text.
- Status toggle (details): tap the status row, then press Save Changes.

## Prerequisites

- Node.js 20+
- Expo Go app (optional for device testing)
- iOS Simulator or Android Emulator

## Installation

```bash
npm install --legacy-peer-deps
```

## Run

Start the dev server:

```bash
npx expo start
```

Open the app:

- iOS: press `i`
- Android: press `a`

## Notes

- This project uses Expo Router for navigation (see the `app/` directory).
- `npm install --legacy-peer-deps` avoids optional peer conflicts from `react-dom` (required by Expo tooling but not used for native apps).
