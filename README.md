# 🦅 **Abin Raj | Industrial Futurism Portfolio**

> *"Building the future through embedded systems, AI, and creative technology."*

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge&logo=github)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Three.js_|_Framer_Motion-cyan?style=for-the-badge)

A cutting-edge, **immersive 3D portfolio website** designed for the modern engineer. Built with **React 18**, **Three.js (R3F)**, and **Framer Motion**, it features interactive 3D avatars, flying birds, floating code symbols, and a seamless "industrial futurism" aesthetic.

---

## 🌟 **Features**

*   **🎭 3D Hero Avatar**: An animated 3D character (GLB+FBX) that greets visitors with a "Stretching" animation.
*   **🕊️ 3D Flying Birds**: A flock of realistic storks flying through the background using instanced mesh rendering.
*   **💻 Industrial Aesthetics**: Dark-mode design with cyan/emerald accents, glassmorphism, and smooth parallax effects.
*   **🎵 Interactive Audio**: Custom background music player ("The Foundation") with mute/unmute and autoplay handling.
*   **🚀 Dynamic Content**:
    *   **Experience Timeline**: Vertical timeline with tech stack tags.
    *   **Selected Works**: Project cards with hover effects and gradient borders.
    *   **Education & Awards**: Detailed sections for academic background and achievements.
*   **📱 Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

---

## 🛠️ **Tech Stack**

*   **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
*   **3D Engine**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/), [React Three Drei](https://github.com/pmndrs/drei)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)

---

## 📂 **Project Structure**

```bash
Abin_Portfolio/
├── public/                 # Static assets (models, music)
│   ├── models/             # 3D Models (GLB, FBX)
│   │   ├── model-5.glb     # Hero Avatar Mesh
│   │   ├── Stork.glb       # Flying Bird Model
│   │   └── ...
│   └── The Foundation.mp3  # Background Music
├── src/
│   ├── index.css           # Global Styles & Tailwind
│   └── main.jsx            # Entry Point
├── starter.jsx             # MAIN APPLICATION COMPONENT (All Logic Here)
├── index.html              # HTML Root
├── tailwind.config.js      # Tailwind Configuration
└── vite.config.js          # Vite Configuration
```

---

## 🚀 **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/Sedulous-sedu/Abin_Portfolio.git
cd Abin_Portfolio
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Run Development Server**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🎨 **Customization Guide**

### **Changing the Avatar**
1.  Place your `.glb` (mesh) or `.fbx` (animation) files in `public/models/`.
2.  Open `starter.jsx`.
3.  Update the `MODELS` constant at the top:
    ```javascript
    const MODELS = {
      hero: {
        path: '/models/your-avatar.glb',          // Your 3D Model
        animationPath: '/models/animation.fbx',   // Your Animation
        type: 'animated-glb',                     // Blends GLB + FBX
        scale: 4.5,                               // Adjust size
        position: [0, -6.5, 0]                    // Adjust [x, y, z]
      },
      ...
    };
    ```

### **Updating Data (CV)**
All personal data is stored in **constants** at the top of `starter.jsx`. Simply edit these objects:
*   `PROFILE`: Name, Role, Summary, Contact Info.
*   `experienceData`: Work history and internships.
*   `projectsData`: Portfolio projects.
*   `AWARDS`, `CERTIFICATIONS`, `MEMBERSHIPS`.

---

## 🌍 **Deployment**

### **Deploy to GitHub Pages**
This project is configured for easy deployment.

1.  **Push your changes** to GitHub:
    ```bash
    git add .
    git commit -m "Update portfolio"
    git push
    ```
2.  Go to **GitHub Repository > Settings > Pages**.
3.  Select **Source**: `Deploy from a branch`.
4.  Select **Branch**: `main` (or `master`) and folder `/(root)`.
5.  Click **Save**. Your site will be live at `https://yourusername.github.io/Abin_Portfolio/`.

---

## 📄 **License**

This project is open-source and available under the **MIT License**.

---

<p align="center">
  Built with ❤️ by <b>Abin Raj</b>
</p>
