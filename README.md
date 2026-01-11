# FinTrack - Personal Finance Tracker

A minimalist personal finance tracker with budget management, built with the MERN stack.

## Features

- 📊 **Dashboard** - Track income & expenses with visual summaries
- 💰 **Budget Management** - Set category-wise budgets with warnings
- 📈 **Analytics** - View spending patterns by category
- 📤 **Export** - Download transactions as CSV
- 🎨 **Beautiful UI** - Minimalist black & white theme with Indian-inspired patterns

## Tech Stack

- **Frontend**: React, Vite, Ant Design, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas

---

## Deployment on Render

### 1. Backend Deployment (Web Service)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:

   - **Name**: `fintrack-backend`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

5. Add **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `MONGO_URL` | `mongodb+srv://sathvikskemtur_db_user:2SON03bbGILxnKDx@cluster0.ckpkcny.mongodb.net/fintrack?retryWrites=true&w=majority&appName=Cluster0` |
   | `PORT` | `8080` |
   | `FRONTEND_URL` | `https://your-frontend.onrender.com` (update after frontend deployment) |

6. Click **Create Web Service**
7. Copy the backend URL (e.g., `https://fintrack-backend.onrender.com`)

### 2. Frontend Deployment (Static Site)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Static Site**
3. Connect your GitHub repository
4. Configure:

   - **Name**: `fintrack-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. Add **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://fintrack-backend.onrender.com` (your backend URL) |

6. Add **Redirect/Rewrite Rules** (for React Router):

   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

7. Click **Create Static Site**

### 3. Update Backend CORS

After frontend deployment:

1. Go to your backend service on Render
2. Update the `FRONTEND_URL` environment variable with your actual frontend URL
3. Click **Save Changes** (service will restart automatically)

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Cloud\ ESA
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   # Create .env file with your MongoDB URL
   node server.js
   ```

3. **Frontend Setup**

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

### Environment Variables

**Backend (`server/.env`)**:

```
MONGO_URL=mongodb+srv://...
PORT=8080
FRONTEND_URL=http://localhost:5173
```

**Frontend (`client/.env`)**:

```
VITE_API_URL=http://localhost:8080
```

---

## Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utilities (api.js)
│   │   └── index.css       # Global styles
│   ├── .env                # Environment variables
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/             # Database config
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint                                  | Description          |
| ------ | ----------------------------------------- | -------------------- |
| POST   | `/api/v1/users/register`                  | Register new user    |
| POST   | `/api/v1/users/login`                     | User login           |
| POST   | `/api/v1/transactions/add-transaction`    | Add transaction      |
| POST   | `/api/v1/transactions/get-transaction`    | Get transactions     |
| POST   | `/api/v1/transactions/delete-transaction` | Delete transaction   |
| POST   | `/api/v1/transactions/edit-transaction`   | Edit transaction     |
| POST   | `/api/v1/transactions/export-transaction` | Export to CSV        |
| POST   | `/api/v1/budgets/set-budget`              | Create/update budget |
| POST   | `/api/v1/budgets/get-budgets`             | Get all budgets      |
| POST   | `/api/v1/budgets/delete-budget`           | Delete budget        |
| POST   | `/api/v1/budgets/budget-status`           | Get budget status    |

---

## License

MIT
