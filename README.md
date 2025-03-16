 Agent Management System (MERN Stack)
 📌 Overview
Agent Management System is a full-stack MERN application that allows admins to manage agents, distribute tasks from a CSV file, and track task completion. 
The application includes secure JWT authentication and a clean,
modern UI built with Material UI (MUI).

---

 🏗️ Tech Stack
| Technology | Description |
|------------|-------------|
| **React.js** | Frontend library for building the user interface |
| **Node.js + Express.js** | Backend framework for handling server-side logic |
| **MongoDB** | NoSQL database for storing agents and tasks |
| **Material UI** | UI framework for a clean, responsive design |
| **JWT** | Secure token-based authentication |
| **Axios** | HTTP client for API calls |
| **CSV Parsing** | Handling and distributing CSV data |


 🌟 Features
✅ **Admin Authentication** – Secure login using JWT  
✅ **Agent Management** – Create, update, and delete agents  
✅ **Task Distribution** – Upload CSV and automatically assign tasks to agents  
✅ **Progress Tracking** – Track task completion status  
✅ **Modern UI** – Responsive and professional UI with MUI  
✅ **Dark Mode** – Clean gradient background and dark mode support  



🚀 Setup Instructions

1. Clone the repository**
```bash
git clone https://github.com/RohithRagavender/CSTech.git
```

2. Navigate to the project folder**
```bash
cd your-repo
```

3. Install dependencies**
```bash
npm install
```

4. Create `.env` file in the root directory**
```env
# Backend Configuration
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```

5. Start the backend server**
```bash
npm run server
```

6. Start the frontend**
```bash
npm start
```

---

 🎯 API Endpoints

🔑 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Admin login with JWT |

👥 Agents
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents` | Get list of all agents |
| `POST` | `/agents` | Create a new agent |
| `PUT` | `/agents/:id` | Update agent details |
| `DELETE` | `/agents/:id` | Delete an agent |

 📂 CSV Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload and distribute CSV data |

---

 🎬 Video Demo
[📹 Watch the Demo](https://drive.google.com/your-demo-link)

---

 🏆 Folder Structure
```
📁 src
├── 📁 components
├── 📁 pages
├── 📁 services
├── 📁 utils
├── 📄 App.js
├── 📄 index.js
├── 📄 routes.js
📁 backend
├── 📁 controllers
├── 📁 models
├── 📁 routes
├── 📄 server.js
├── 📄 .env
```

---

How It Works
1. **Admin Login** – Admin logs in using secure credentials.  
2. **Agent Creation** – Admin creates new agents with name, email, phone, and password.  
3. **CSV Upload** – Upload CSV file to automatically assign tasks to agents.  
4. **Task Management** – View tasks under each agent's profile.  
5. **Edit/Delete** – Update or delete agents as needed.  

---

 🚨 Troubleshooting
 
 | Issue | Solution |
|-------|----------|
| **CORS Error** | Ensure the backend and frontend are running on the correct ports |
| **MongoDB Connection Error** | Check if MongoDB is running and the URI is correct |
| **JWT Expired** | Ensure the JWT secret is correct and tokens are not expired |

---

🏅 Acknowledgements
- Thanks to **OpenAI** for providing technical assistance ❤️  
- Inspired by modern admin dashboards for professional agent management  

---

 🔒 License
This project is licensed under the **MIT License** – feel free to use and modify it!  

---

🚀 Happy Coding!😎

