
## 🧪 User Profile Manager (Backend)

A simple full-stack backend built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **SQLite**.
This server handles:

* 🔐 User registration and login (JWT-based auth)
* 👤 Profile view and update
* ⚙️ Secure API setup (helmet, rate limiting)
* 🧱 SQLite database with Prisma ORM

---

## 🛠️ Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Runtime   | Node.js (TypeScript)             |
| Framework | Express                          |
| ORM       | Prisma                           |
| Database  | SQLite (file-based, lightweight) |
| Security  | Helmet, Rate limiting            |
| Auth      | JWT (JSON Web Token)             |
| Logging   | Morgan                           |

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the project root with the following:

```bash
DATABASE_URL="file:./dev.db"
PORT=5000
JWT_SECRET=supersecretkey
NODE_ENV=development
```

> 🧩 **Note:**
>
> * `JWT_SECRET` is used to sign your authentication tokens.
> * `PORT` is the port your server will run on.

---

## 🧰 Installation

### 1️⃣ Install dependencies

```bash
npm install
```


## 💾 Database Setup (Prisma + SQLite)

### 1️⃣ Apply Database migrations

Prisma is already initialized. Just set up the database:

```bash
npx prisma migrate deploy
```

This will generate a local `dev.db` SQLite file inside the `/prisma` folder.

---


### 2️⃣ Generate Prisma client

```bash
npx prisma generate
```

---

## 🚀 Run the Server

### ▶️ **Development mode**

Runs TypeScript directly with auto-reload on changes.

```bash
npm run dev
```

* Server starts at: [http://localhost:5000](http://localhost:5000)
* Logs incoming requests (via Morgan)
* Auto-restarts when files change

---

### 🧱 **Build for Production**

Compiles TypeScript into JavaScript.

```bash
npm run build
```

Then start the compiled app:

```bash
npm start
```

* This runs the code from the `/dist` folder.
* Best for production deployment.

---

## 🔑 API Endpoints

| Method | Route                   | Description                |
| ------ | ----------------------- | -------------------------- |
| `POST` | `/api/v1/auth/register` | Register a new user        |
| `POST` | `/api/v1/auth/login`    | Log in existing user       |
| `GET`  | `/api/v1/users/me`      | Get logged-in user profile |
| `PUT`  | `/api/v1/users/me`      | Update user profile        |

> 🧩 **Authorization:**
> Routes starting with `/api/v1/users` require an **Authorization header**:
>
> ```
> Authorization: Bearer <your_jwt_token>
> ```

---


## 🔒 Security Features

* ✅ Helmet → Adds secure HTTP headers
* ✅ Rate Limiter → Prevents abuse by limiting requests per minute
* ✅ CORS → Allows frontend to access backend securely
* ✅ JWT Auth → Stateless authentication
* ✅ Password Hashing → Securely stores passwords (bcrypt)

---

## 🧰 Troubleshooting

| Problem                                  | Solution                                             |
| ---------------------------------------- | ---------------------------------------------------- |
| `Error: PrismaClientInitializationError` | Run `npx prisma generate` and ensure `dev.db` exists |
| `JWT invalid or missing`                 | Make sure to include `Authorization: Bearer <token>` |
| Server won’t start                       | Check `.env` file and that PORT isn’t already in use |

---

## 💡 Notes

* The database (`dev.db`) is local — deleting it resets your data.
* You can open it visually with **Prisma Studio**:

  ```bash
  npx prisma studio
  ```
* To reset database:

  ```bash
  npx prisma migrate reset
  ```

---

## 👨‍💻 Author

**Sourav Pusti**
Fullstack Developer | React + Node.js + AI Integrations