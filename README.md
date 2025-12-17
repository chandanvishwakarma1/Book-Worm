# 📚 BookWorm — Full‑Stack React Native App

A **full‑stack social book sharing app** built with **React Native (Expo)**, **Node.js**, **Express**, and **MongoDB**. Users can create book posts with images, rate books, explore a feed with infinite scrolling, and manage their profiles.

> 🚀 Built to run on **Android, iOS** using **only free tools & services**.

---
## 📑 Table of Contents

- [📸 Screenshots](#-screenshots)
- [✨ Features](#-features)
- [⬇️ APK Download](#️-apk-download)
- [🚀 Deployment](#-deployment)
- [🧠 What You’ll Learn From This Project](#-what-youll-learn-from-this-project)
- [🏗️ Tech Stack](#️-tech-stack)
  - [Frontend (Mobile)](#frontend-mobile)
  - [Backend](#backend)
- [🔐 Environment Variables](#-environment-variables)
- [▶️ Running the Project Locally](#️-running-the-project-locally)
- [🧪 Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙌 Author](#-author)
---


## 📸 Screenshots

| Home Feed | Create Post | Profile |
| --------- | ----------- | ------- |
| <img src="https://github.com/user-attachments/assets/430ba7d3-3017-426e-8a83-c848c6682d72" alt="Home Feed Screen" width="220" /> | <img src="https://github.com/user-attachments/assets/ca72b4af-514a-4dba-aced-8facc8d60bbc" alt="Create Post Screen" width="220" /> | <img src="https://github.com/user-attachments/assets/e4781ae2-eb0b-41e2-a258-0eb3d5035539" alt="Profile Screen" width="220" /> |
| 🏠 | ➕ | 👤 |

---

## ✨ Features

* 🔐 **Authentication** – Secure signup & login using **JWT**
* 🏠 **Home Feed** – Latest posts first with **infinite scrolling**
* ➕ **Create Book Post** – Title, rating, image & caption (all required)
* 🖼️ **Image Upload** – Base64 upload → **Cloudinary**
* 👤 **User Profile** – View user details & their posts
* 🗑️ **Delete Post** – Confirmation dialog before deletion
* 🎨 **Multiple Themes** – Switch themes by changing one config
* 🌐 **Web Support** – Runs in browser via Expo Web
* 🚪 **Logout**

---
## ⬇️ APK Download

<p align="center">
  <a href="https://github.com/chandanvishwakarma1/Book-Worm/releases/download/v1.0/BookWorm.apk">
    <img src="https://img.shields.io/badge/⬇️%20Download-APK-brightgreen?style=for-the-badge" alt="Download APK" />
  </a>
</p>

> 📱 Android only. Enable **Install from unknown sources** if prompted.
---
## 🚀 Deployment

* **Backend**: Vercel
* **Database**: MongoDB Atlas (Free tier)
* **Images**: Cloudinary (Free tier)
---

## 🧠 What You’ll Learn From This Project

* Building a **REST API** using Node.js & Express
* **JWT‑based authentication** (stateless auth)
* **MongoDB & Mongoose** data modeling
* Add performant **infinite loading** with pagination cursors
* Handling **image uploads** efficiently
* Creating a real‑world **React Native + Expo Router** app

---

## 🏗️ Tech Stack

### Frontend (Mobile)

* React Native
* Expo
* Expo Router

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Token (JWT)
* Cloudinary

---

## 🔐 Environment Variables

### Backend (`/backend/.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

```
### Frontend (`/mobile/.env`)

```env
# Backend API
BACKEND_API_URL = "https://book-worm-server-kappa.vercel.app/api"

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset


```
---

## ▶️ Running the Project Locally

### 1️⃣ Run Backend

```bash
cd backend
npm install
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

### 2️⃣ Run Mobile App

```bash
cd mobile
npm install
npx expo start
```

Then:

* Scan QR using **Expo Go** (Android/iOS)
* Press **w** for Web
* Press **a** for Android emulator
* Press **i** for IOS emulator

---

## 🧪 Future Improvements

* ❤️ Like & comment system
* 🔍 Search books & users
* 📚 Book categories & tags
* 🔔 Notifications
* ✏️ Edit post feature

---

## 🤝 Contributing

Contributions are welcome!

```bash
1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Author

**Chandan Vishwakarma**
🔗 GitHub: [https://github.com/chandanvishwakarma1](https://github.com/chandanvishwakarma1)

If you found this project helpful, ⭐ the repo and share it!
