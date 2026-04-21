# Cadet Stationery Store

Welcome to the **Cadet Stationery Store** project! This is a premium e-commerce web application meticulously crafted to showcase luxury office supplies, writing instruments, and handcrafted journals. 

## 🌟 Overview

The Cadet Stationery Store is designed with an **Obsidian & Champagne** luxury color palette, ensuring a high-end, professional user experience. The platform features an elegant front-end for customers to explore collections and securely contact the team, accompanied by a dedicated admin portal for seamless, dynamic inventory management.

## ✨ Key Features

- **Premium Design Aesthetics**: Rich dark mode (Obsidian) combined with striking gold accents (Champagne) to deliver a modern, visually stunning experience.
- **Dynamic Product Rendering**: Products are injected dynamically through JavaScript (`products.js`) allowing for infinite scalability without hardcoding HTML.
- **Dynamic Category Filters**: Shop by categories that are completely customizable and updatable via the admin panel.
- **Admin CMS Dashboard**: An exclusive and secured `admin.html` page running `admin.js` to manage the product inventory straight from the browser (create, edit, delete).
- **Data Persistence**: Integrated with Firebase Realtime Database and LocalStorage mechanisms to make sure data is perfectly synced across all pages in real time.
- **WhatsApp Integration**: Floating quick-action button seamlessly connects customers directly to support/sales via WhatsApp.
- **Content Protection**: Custom scripts implemented to prevent unauthorized text selection, image copying, saving, and inspect element to ensure content uniqueness. 
- **Fully Responsive**: Optimized for desktops, tablets, and mobile devices to ensure the Masterpiece Collection can be viewed anywhere.

## 🛠️ Technology Stack

- **Frontend core**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Styling**: Custom CSS properties natively avoiding heavier frameworks, delivering blazingly fast load times.
- **Google Fonts**: Modern elegant typography (Inter & Playfair Display).
- **Icons**: FontAwesome 6.4.0.
- **Backend / DB**: Firebase SDK (10.7.1) for database persistence. 

## 🚀 Live Demo

This application is configured and ready to be deployed to **GitHub Pages**. 
*(See `PUBLISHING.md` for specific deployment instructions.)*

## 📁 File Structure

- `index.html`: The main landing page showcasing the Hero section and complete Masterpiece collection.
- `about.html`: Detailed page containing "Our Story".
- `contact.html`: Contact forms and further info page.
- `admin.html` & `admin.js`: The Content Management System (CMS) for managing the catalogue.
- `products.js`: The central script handling product rendering and data logic on the front end.
- `firebase-init.js`: Configuration script for Firebase integration.
- `style.css`: The massive, robust core styling sheet ensuring structural integrity and premium feel.
- `PUBLISHING.md`: Developer guide indicating exactly how this site gets published to GitHub Pages.

## 👨‍💻 Developer

**Designed & Developed by Mudasir**

*Cadet Stationery Store - Crafted for Excellence.*
