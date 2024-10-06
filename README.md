# Windows Task Scheduler Manager

This project is a web-based interface for managing Windows Task Scheduler tasks. It allows users to view, create, update, and delete scheduled tasks on a Windows system.

## Features

- View all scheduled tasks
- Create new tasks
- Update existing tasks
- Delete tasks
- Real-time synchronization with Windows Task Scheduler

## Technology Stack

- Frontend: React with TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Backend: Express.js with Node-PowerShell
- Build Tool: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Windows OS (for the backend to interact with Task Scheduler)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/bing-open/windows-task-scheduler-manager.git
   cd windows-task-scheduler-manager
   ```
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   cd server
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   node server.js
   ```
2. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the frontend for production, run:

```
npm run build
```

This will create a `dist` folder with the production-ready files.

## Deployment

The frontend can be deployed to any static site hosting service (e.g., Netlify, Vercel, GitHub Pages).

The backend needs to be run on a Windows machine to interact with the Task Scheduler.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## GitHub Repository

[Windows Task Scheduler Manager Repository](https://github.com/bing-open/windows-task-scheduler-manager)
