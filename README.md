
# 🌙 Quran Web Application

A modern, fast, and responsive Quran web application built with **Next.js**, **Tailwind CSS**, and a **Node.js backend**.  
Designed for a smooth reading experience with powerful search and customizable settings.


## 🔗 Live Demo

- 🌐 Frontend: https://quran-web-app-client.vercel.app/
- ⚙️ Backend API: https://quran-web-app-server.vercel.app

## ✨ Features

### 📖 Surah List
- Browse all **114 Surahs**
- Displays **Arabic & English names**
- Clean and paginated layout

### 📜 Ayat View
- Read all verses of a selected Surah
- Includes:
  - Arabic text
  - English translation

### 🔍 Search System
- Search across the **entire Quran**
- Instant results based on translation text
- Paginated results for performance

### ⚙️ Settings Panel
Customize your reading experience:
- Choose Arabic fonts:
  - Amiri
  - Noto Naskh
- Adjust:
  - Arabic font size
  - Translation font size
- Preferences saved using **localStorage**

### 📱 Responsive UI
- Fully mobile-friendly
- Built with **Tailwind CSS only**
- Clean, minimal design

### 🧾 Global Footer
- Simple and consistent footer across all pages

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router, SSG)
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js / Hono
- REST API

## 📂 Project Structure

```

quran-web-app/
│
├── client/        # Frontend (Next.js)
├── server/        # Backend (Node.js API)
└── README.md

````


## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/quran-web-app.git
cd quran-web-app
````

### 2️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

### 3️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```


## 🌐 API Example

```bash
GET /surahs
GET /surah/:id
GET /search?q=keyword
```

## 🎯 Key Highlights

* ⚡ Fast performance with **SSG**
* 🔎 Powerful full-text search
* 🎨 Customizable reading experience
* 📱 Fully responsive design
* 🧠 Clean and scalable architecture


## 📌 Future Improvements

* 🔊 Audio recitation support
* 🌙 Dark mode toggle
* 📌 Bookmark & favorites
* 🌍 Multi-language translations

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.

## 💡 Author

Developed by **Piash Islam**
