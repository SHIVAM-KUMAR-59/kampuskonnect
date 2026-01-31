![ChatApp Banner](./banner.png)

# Kampus Konnect

A comprehensive platform connecting KIIT alumni with current students for mentorship, networking, and career guidance.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Environment Variables Setup](#environment-variables-setup)
- [Running the Project](#running-the-project)
- [Contributing to the Project](#contributing)
- [Troubleshooting](#troubleshooting)

## About

Kampus Konnect is a digital platform designed to bridge the gap between KIIT alumni and current students. It facilitates meaningful connections, mentorship opportunities, and career guidance through a centralized web application.

## Features

- **User Authentication** - Email/Password and Google OAuth for Students and Alumni
- **Profile Management** - Detailed profiles with skills, interests, and LinkedIn integration
- **Alumni Discovery** - Smart matching based on interests and skills with advanced filtering
- **Connection System** - Send/accept connection requests with personalized messages
- **Real-time Messaging** - Socket.io powered chat with typing indicators and read receipts
- **Event Management** - Create and manage alumni events with Google Meet integration
- **Google Meet Integration** - Generate meeting links for virtual mentorship sessions

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Socket.io, JWT  
**Frontend:** Next.js 14, NextAuth.js, Tailwind CSS, Axios

## Prerequisites

Before you start, you need to have these installed on your computer:

### 1. Node.js (v18 or higher)

- **Download from:** https://nodejs.org/
- Choose the **LTS (Long Term Support)** version
- **Verify installation:** Open terminal/command prompt and type:
```bash
  node --version
```
  You should see something like `v18.x.x` or `v20.x.x`

### 2. npm (comes with Node.js)

- **Verify installation:**
```bash
  npm --version
```
  You should see something like `9.x.x` or `10.x.x`

### 3. Git

- **Download from:** https://git-scm.com/downloads
- **Verify installation:**
```bash
  git --version
```

### 4. A Code Editor

- **Recommended:** Visual Studio Code - https://code.visualstudio.com/
- Or any text editor you prefer

## Installation Guide

### For Beginners: Understanding the Folder Structure

This project has two main folders:
- `server` - Backend code (Node.js/Express)
- `client` - Frontend code (Next.js)

You'll need to run both to make the application work.

### Step 1: Get the Project Files

#### Option A: Using Git (Recommended)

1. **Open terminal/command prompt**
2. **Navigate to where you want the project:**
```bash
   cd Desktop
```
   (or any folder you prefer)

3. **Clone the repository:**
```bash
   git clone https://github.com/your-username/kampuskonnect.git
```

4. **Enter the project folder:**
```bash
   cd kampuskonnect
```

#### Option B: Download as ZIP (If you don't have Git)

1. Go to the GitHub repository page
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your desired location
5. Open terminal/command prompt and navigate to that folder:
```bash
   cd path/to/kampuskonnect
```
   Example: `cd C:\Users\YourName\Downloads\kampuskonnect`

### Step 2: Install Backend Dependencies

1. **Navigate to the server folder:**
```bash
   cd server
```

2. **Install packages:**
```bash
   npm install
```
   
   **Note:** This will take 2-5 minutes. You'll see a lot of text scrolling - this is normal!

3. **What just happened?**
   - npm downloaded all the packages (libraries) the backend needs
   - These are listed in `package.json` file
   - All packages are stored in a new folder called `node_modules`

### Step 3: Install Frontend Dependencies

1. **Go back to the main project folder:**
```bash
   cd ..
```

2. **Navigate to the client folder:**
```bash
   cd client
```

3. **Install packages:**
```bash
   npm install
```

   **Note:** This will also take 2-5 minutes.

## Environment Variables Setup

Environment variables are like secret configuration files that contain sensitive information like database URLs and passwords. You need to create these files manually.

### Backend Environment Variables

1. **Navigate to the server folder** (if not already there):
```bash
   cd server
```

2. **Create a file named `.env`** (exactly this name, with the dot at the start)
   - On Windows: Right-click > New > Text Document > Rename to `.env` (remove .txt)
   - On Mac/Linux: Use terminal or your code editor to create `.env`

3. **Open `.env` in your text editor and add the following:**
```env
   DB_URL=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE_TIME=24h
   PORT=8000
```

4. **How to get these values:**
   - **DB_URL:** Get this from your team lead or database admin. It looks like:
```
     mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/alumni-konnect
```
   - **JWT_SECRET:** Get this from your team lead. It's a random secret string used for authentication.
   - **JWT_EXPIRE_TIME:** Leave as `1d` (tokens expire after 24 hours)
   - **PORT:** Leave as `8000` (the backend server will run on this port)

5. **Save the file**

### Frontend Environment Variables

1. **Navigate to the client folder:**
```bash
   cd ../client
```
   (The `..` means go back one folder, then enter client)

2. **Create a file named `.env.local`** (exactly this name)

3. **Open `.env.local` in your text editor and add the following:**
```env
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   BACKEND_URL=http://localhost:8000
```

4. **How to get these values:**
   - **GOOGLE_CLIENT_ID:** Get this from your team lead
   - **GOOGLE_CLIENT_SECRET:** Get this from your team lead
   - **BACKEND_URL:** Keep as `http://localhost:8000`

5. **Save the file**

### Important Notes About Environment Variables

- **Never commit these files to Git!** They contain secrets
- Both `.env` and `.env.local` are already in `.gitignore`
- If you don't have these values, contact your team lead
- The `.env` files won't show up in file explorer by default (they're hidden files)

## Running the Project

You need to run both the backend and frontend at the same time. The easiest way is to open **two separate terminal windows**.

### Terminal 1: Start the Backend Server

1. **Open first terminal and navigate to server folder:**
```bash
   cd path/to/kampuskonnect/server
```

2. **Start the backend:**
```bash
   npm start
```
   
   or for development mode with auto-restart:
```bash
   npm run dev
```

3. **You should see:**
```
   Server running on port 8000
   Connected to MongoDB successfully
```

4. **Leave this terminal running!** Don't close it.

### Terminal 2: Start the Frontend

1. **Open second terminal and navigate to client folder:**
```bash
   cd path/to/kampuskonnect/client
```

2. **Start the frontend:**
```bash
   npm run dev
```

3. **You should see:**
```
   ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

4. **Leave this terminal running too!**

### Access the Application

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)
2. **Go to:** http://localhost:3000
3. **You should see the Alumni Konnect login page!**

### To Stop the Application

- Press `Ctrl + C` in each terminal window
- This will stop both servers

## Contributing

Thank you for considering contributing to Alumni Konnect! Follow these steps to contribute to the project.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/kampuskonnect.git
cd kampuskonnect
```

### 2. Create Your Branch

Always create a new branch for your work. Use a descriptive name:
```bash
git checkout -b your-name/feature-name
```

**Branch naming convention:**
- `your-name/feature-name` - For new features (e.g., `john/add-chat-feature`)
- `your-name/fix-name` - For bug fixes (e.g., `sarah/fix-login-bug`)
- `your-name/update-name` - For updates (e.g., `mike/update-readme`)

**Examples:**
```bash
git checkout -b rahul/add-event-management
git checkout -b priya/fix-connection-request
git checkout -b amit/update-profile-page
```

### 3. Make Your Changes

1. **Write your code**
   - Follow the existing code style
   - Keep your changes focused on one feature/fix
   - Test your changes thoroughly

2. **Add comments** where necessary to explain complex logic

3. **Test your changes:**
   - Make sure backend still runs without errors
   - Make sure frontend displays correctly
   - Test the specific feature you worked on

### 4. Commit Your Changes

**Stage your changes:**
```bash
git add .
```

**Commit with a clear message:**
```bash
git commit -m "Add: brief description of what you added/changed"
```

**Commit message format:**
- `Add: description` - For new features
- `Fix: description` - For bug fixes
- `Update: description` - For updates to existing code
- `Remove: description` - For removing code/features

**Examples:**
```bash
git commit -m "Add: real-time messaging feature with Socket.io"
git commit -m "Fix: connection request not sending properly"
git commit -m "Update: improve alumni search filtering"
git commit -m "Remove: deprecated authentication method"
```

### 5. Pull Latest Changes

Before pushing, make sure you have the latest code from main branch:
```bash
git checkout main
git pull origin main
git checkout your-name/feature-name
git merge main
```

**Resolve any conflicts if they appear:**
- Open conflicted files in your code editor
- Look for `<<<<<<<`, `=======`, `>>>>>>>` markers
- Keep the correct code and remove the markers
- Save the file
- Run `git add .` and `git commit -m "Resolve merge conflicts"`

### 6. Push Your Branch
```bash
git push origin your-name/feature-name
```

### 7. Create a Pull Request

1. Go to the repository on GitHub
2. You'll see a yellow banner saying "Compare & pull request" - click it
3. **Fill in the PR template:**
   - **Title:** Brief description of your changes
   - **Description:** Explain what you did and why
   - **Screenshots:** Add screenshots if you changed the UI
   - **Testing:** Describe how you tested your changes

**Example PR description:**
```
## Description
Added real-time messaging feature using Socket.io for alumni-student communication.

## Changes Made
- Implemented Socket.io server setup
- Created message model and API endpoints
- Built chat UI components
- Added typing indicators and read receipts

## Testing Done
- Tested messaging between two users
- Verified real-time updates work correctly
- Checked on Chrome and Firefox browsers

## Screenshots
[Attach screenshots here]
```

4. Click **"Create Pull Request"**

### 8. Code Review Process

1. **Wait for review** from team members or team lead
2. **Address feedback** if requested:
   - Make the requested changes
   - Commit and push again to the same branch
   - The PR will automatically update
3. **Once approved**, your code will be merged into main branch

### Important Guidelines

**Do's:**
- Keep commits small and focused
- Write clear commit messages
- Test your changes before pushing
- Ask questions if you're unsure
- Comment your code where necessary
- Follow existing code patterns
- Update documentation if needed

**Don'ts:**
- Don't commit directly to `main` branch
- Don't commit `.env` or `.env.local` files
- Don't commit `node_modules` folder
- Don't make unrelated changes in the same branch
- Don't push broken code
- Don't copy-paste code without understanding it

### Git Commands Cheat Sheet

**Check current branch:**
```bash
git branch
```

**Check status of your changes:**
```bash
git status
```

**See what changed:**
```bash
git diff
```

**View commit history:**
```bash
git log
```

**Undo uncommitted changes:**
```bash
git checkout -- filename.js
```

**Switch to existing branch:**
```bash
git checkout branch-name
```

**Delete a local branch:**
```bash
git branch -d branch-name
```

**Pull latest changes from remote:**
```bash
git pull origin main
```

### Need Help with Git?

**First time using Git?**
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- GitHub Guides: https://guides.github.com/

**Common Issues:**

**Forgot to create a branch and worked on main:**
```bash
# Stash your changes
git stash

# Create and checkout new branch
git checkout -b your-name/feature-name

# Apply your changes
git stash pop
```

**Need to undo last commit (before push):**
```bash
git reset --soft HEAD~1
```

**Accidentally committed to wrong branch:**
```bash
# On wrong branch
git log  # Copy the commit hash

# Switch to correct branch
git checkout correct-branch
git cherry-pick commit-hash
```

**Merge conflicts help:**
- Open the file in VS Code (it highlights conflicts nicely)
- Choose which changes to keep
- Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- Save, add, and commit

### Questions?

If you're stuck or have questions:
1. Check this guide again
2. Ask your team members
3. Contact your team lead
4. Create an issue on GitHub describing your problem

## Troubleshooting

### Problem: "npm: command not found" or "node: command not found"

**Solution:** Node.js is not installed or not in your PATH
- Reinstall Node.js from https://nodejs.org/
- Make sure to check "Add to PATH" during installation
- Restart your terminal after installation

### Problem: "Cannot find module" errors

**Solution:** Dependencies not installed properly
```bash
# In server folder
cd server
rm -rf node_modules
npm install

# In client folder
cd ../client
rm -rf node_modules
npm install
```

### Problem: "Port 3000 is already in use"

**Solution:** Another application is using that port
```bash
# Find what's using the port (Windows)
netstat -ano | findstr :3000

# Find what's using the port (Mac/Linux)
lsof -i :3000

# Then kill that process or use a different port
# In client folder, run:
npm run dev -- -p 3001
```

### Problem: "Port 8000 is already in use"

**Solution:** 
- Change the PORT in your server `.env` file to something else like `5001`
- Update `BACKEND_URL` in client `.env.local` to match

### Problem: "MongoDB connection failed"

**Solution:** 
- Check if DB_URL in `.env` is correct
- Make sure you have internet connection
- Contact your team lead to verify database access

### Problem: ".env file not loading"

**Solution:**
- Make sure the file is named exactly `.env` (not `.env.txt`)
- Make sure it's in the correct folder (server/.env for backend)
- Restart the server after creating/modifying .env file

### Problem: Google OAuth not working

**Solution:**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`

### Problem: "Cannot connect to backend" or API errors

**Solution:**
- Make sure the backend server is running (check Terminal 1)
- Check if backend shows "Connected to MongoDB successfully"

### Problem: Changes not showing up

**Solution:**
- For frontend: Save the file, wait a few seconds, page should auto-reload
- For backend: Stop server (Ctrl+C) and restart with `npm start`
- Clear browser cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Still Having Issues?

1. Make sure both backend and frontend are running
2. Check both terminal windows for error messages
3. Verify all environment variables are set correctly
4. Try closing and reopening your terminals
5. Contact your team lead with:
   - Screenshot of the error
   - What you were trying to do
   - Contents of terminal output

## Project Structure
```
kampuskonnect/
├── server/                 # Backend (Node.js + Express)
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   ├── .env                # Environment variables (create this)
│   ├── package.json        # Backend dependencies
│   └── index.js            # Entry point
│
├── client/                 # Frontend (Next.js)
│   ├── app/                # Next.js pages and layouts
│   ├── components/         # React components
│   ├── config/             # Basic configurations and exports
│   ├── context/            # Custom react contexts
│   ├── public/             # Static files
│   ├── utils/              # Utility files and functions
│   ├── .env.local          # Environment variables (create this)
│   ├── package.json        # Frontend dependencies
│   └── next.config.js      # Next.js configuration
│
└── README.md               # This file
```

## Quick Start Checklist

Use this checklist to make sure you've done everything:

- [ ] Node.js installed (v18+)
- [ ] npm installed
- [ ] Git installed
- [ ] Project cloned/downloaded
- [ ] Backend dependencies installed (`npm install` in server folder)
- [ ] Frontend dependencies installed (`npm install` in client folder)
- [ ] `.env` file created in server folder with all required variables
- [ ] `.env.local` file created in client folder with all required variables
- [ ] Backend server started in one terminal
- [ ] Frontend server started in another terminal
- [ ] Application accessible at http://localhost:3000

## Need Help?

If you're stuck, don't hesitate to ask your team members or team lead. Common questions are totally normal when setting up a project for the first time!

**Happy Coding!**