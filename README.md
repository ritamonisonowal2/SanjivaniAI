# Sajivani AI 🩺❤️

**Sajivani AI** is an advanced, high-fidelity cardiovascular educational companion, emergency locator, and first-responder triage assistant. Engineered with Vite, React, and Tailwind CSS, it delivers real-time emergency preparedness tools, dynamic CPR pacing guides, geographical cardiac care mappings, and portable diagnostic profile cards.

---

## 🌟 Core Modules

### 1. Scannable Emergency Medical ID & QR Passport
* **Universal Text-Based QR Triage**: Dynamically generates an offline-first QR code encoding clinical patient information (Blood type, severe allergies, cardiac conditions, medications, and next-of-kin contacts).
* **Zero-Network Dependency**: Rescuers or medical professionals can scan the QR code with any standard camera to immediately obtain the raw text records, removing any dependencies on internet connectivity, external database queries, or browser redirection.
* **Streamlined UI Integration**: Custom inputs with responsive placeholders ("type here") allow patients to register critical cardiovascular history instantly.
* **Portable Formats**: Features high-density static downloads for pure QR passcodes and full composite ID cards.

### 2. High-Performance CPR & AED Deployment Guide
* **Acoustic and Visual Metronome**: Includes a precise visual compressor gauge with optional auditory metronome tones pacing at exactly **110 BPM**—the clinical sweet spot for chest compressions.
* **Dynamic AED Voice Simulation**: Simulated high-contrast guidelines instructing steps for deploying Automated External Defibrillators, applying clinical pads, and executing rhythm scanning safely.

### 3. Emergency & Cardiac Unit Locator
* **Coordinate Triangulation**: Leverages high-accuracy browser geolocation to detect nearby emergency clinics, hospitals, and critical cardiac care units.
* **Instant Zone Search**: Integrated with local landmarks and meteorological zone queries, delivering offline routing fallbacks and detailed facilities tracking.

### 4. Interactive Cardiovascular Comparison Matrix
* **Diagnostic Distinction Hub**: High-fidelity side-by-side matrices comparing cardiac arrest, heart failure, and myocardial ischemia (heart attacks) on cellular, mechanical, and symptom levels.
* **Educational Health Simulator**: Guided steps, interactive quizzes, and diagnostic checkups designed to train bystanders on spotting symptoms early.

---

## 🛠️ Technical Stack

- **Framework**: [React 18 + TypeScript](https://react.dev/)
- **Build System**: [Vite](https://vite.dev/)
- **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icon Library**: [Lucide React](https://lucide.dev/)
- **QR Generation**: `qrcode.react` (with high-density SVG/Canvas renders)
- **Animation System**: `motion`

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* npm (v9.0.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ritamonisonowal2/SanjivaniAI.git
   cd sajivaniai
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory mirroring the declarations inside `.env.example`:
   ```env
   # .env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Launch the development server**:
   ```bash
   npm run dev
   ```
   *The server is pre-configured to bind on host `0.0.0.0` at port `3000` for seamless network accessibility.*

5. **Build the production bundle**:
   ```bash
   npm run build
   ```

---

## 🗄️ Storage & Local Persistence

* **Offline-First Security**: To prevent leakage of highly sensitive medical details, patient medical registry data remains securely persisted inside the client-side browser's `localStorage` sandbox. No clinical records are pushed to a central database unless explicitly authorized.

---

## 🛡️ License

This project is open-source and available under the MIT License.
