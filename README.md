# Chill-Gamer

**Chill-Gamer** is a dynamic and interactive gaming review platform where users can explore game reviews, share their opinions, and engage with a community of gamers. The platform allows users to rate games, write reviews, and discover new titles through curated sections like top-rated games, user recommendations, and more.

## 🚀 Live Demo
🔗 [Visit Chill-Gamer](https://chill-gamer-6e64e.web.app/)

---

## 📌 Features
- 🏆 **Game Reviews** – Browse and explore detailed reviews from gamers.
- ✍ **Write & Share Reviews** – Users can post their own game reviews.
- ⭐ **Rating System** – Rate games based on personal experience.
- 🔥 **Top-Rated Games** – Discover the highest-rated games.
- 🎮 **User Watchlist** – Add games to a personal watchlist.
- 🔄 **Responsive Design** – Optimized for all devices.
- 🔐 **Secure Authentication** – Firebase authentication for secure user login & signup.
- 🎭 **Interactive UI** – Smooth animations and engaging UI elements.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Libraries & Tools:**
  - dotenv
  - firebase
  - lottie-react
  - prop-types
  - react-awesome-reveal
  - react-router
  - react-simple-typewriter
  - react-star-ratings
  - react-toastify
  - sweetalert
  - swiper
  - prettier

---

## 📦 Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/KYusufbd/Chill-Gamer-Client-Side.git
cd chill-gamer
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and configure your Firebase and MongoDB credentials.

### **4. Run the Development Server**
```sh
npm run dev
```

### **5. Build for Production**
```sh
npm run build
npm run preview
```

---

## Server Side Code Repository: 
- https://github.com/KYusufbd/Chill-Gamer-Server-Side


## 🔥 API Endpoints

### **Reviews API**
- `GET /api/reviews` - Fetch all reviews
- `GET /api/top-rated` - Get top rated reviews
- `GET /api/my-reviews` - Get reviews of logged in user
- `GET /api/review/:id` - Fetch a single review by ID
- `POST /api/review` - Add a new review (Authenticated users only)
- `DELETE /api/review/:id` - Delete a review (Review owner only)
- `PUT /api/review/:id` -Update a review (Review owner only)

### **Watchlist API**
- `GET /api/watchlist` - Fetch full watchlist
- `POST /api/watchlist` - Add to watchlist
- `DELETE /api/watchlist/:gameId` - Remove from watchlist

---

## 🛡️ Authentication & Authorization
- Firebase authentication handles user login & signup.
- Protected routes ensure only authorized users can post/edit reviews.
- Users can manage their own reviews but cannot delete others' reviews.

---

## 🎨 UI & Design
- **Swiper.js** for interactive banners & carousels.
- **DaisyUI & Tailwind CSS** for a clean and modern UI.
- **Animations & Transitions** for enhanced user experience.

---

## 📝 Future Enhancements
- 📢 **Community Discussions** – Allow users to discuss games.
- 🎯 **Game Recommendations** – Personalized game suggestions.
- 🏅 **Achievements & Badges** – Reward users for contributions.

---

## 🤝 Contribution
Want to contribute? Feel free to fork this repository and submit a pull request!

---

## 📄 License
This project is licensed under the MIT License.

---

## 🌟 Show Your Support
If you liked this project, don’t forget to ⭐ the repo!

Happy Gaming! 🎮🔥

