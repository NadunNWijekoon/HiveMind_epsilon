# HiveMind | Smart Beekeeping IoT Monitor

HiveMind is a modern, minimalist dashboard designed for beekeepers to monitor their colonies in real-time. By integrating with IoT devices (like ESP32), beekeepers can track critical metrics such as temperature, humidity, hive weight, and bee activity levels to ensure colony health and optimize honey production.

## 🚀 Features

- **Real-time Dashboard**: Live overview of all registered hives with online/offline status indicators.
- **Deep Analytics**: Interactive charts powered by `recharts` to visualize historical performance over daily, weekly, and monthly periods.
- **IoT Integration**: Dedicated REST API endpoint for seamless data ingestion from hardware like ESP32 or Arduino.
- **Smart Alerts**: Automatic notification system for high-priority environmental conditions (e.g., overheating or moisture spikes).
- **Device Management**: Intuitive registration flow to pair new IoT monitoring kits with your apiary.
- **Responsive Design**: Fully optimized for mobile and desktop beekeeping management.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Generative AI**: [Genkit](https://github.com/firebase/genkit) (Google Gemini)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 💻 How to Run This Locally

Follow these steps to set up the development environment on your local machine.

### 1. Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: Version 20.x or later.
- **npm**: Usually comes bundled with Node.js.
- **Google Gemini API Key**: Required for the AI-powered diagnostics. [Get one here](https://aistudio.google.com/).

### 2. Clone and Install
First, navigate to your project directory and install the necessary dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root of your project and add your Gemini API key:
```env
GOOGLE_GENAI_API_KEY=your_actual_api_key_here
```

### 4. Launch the Application
Start the Next.js development server:
```bash
npm run dev
```
Once the server starts, open your browser and navigate to **http://localhost:9002**.

### 5. (Optional) Run Genkit Developer UI
To test or debug AI flows independently, you can run the Genkit UI:
```bash
npm run genkit:dev
```

## 📡 IoT Device Integration

IoT devices can send real-time sensor data to the application via the following REST endpoint:

**Endpoint**: `POST /api/iot/data`

**Request Body (JSON)**:
```json
{
  "device_id": "hive_unique_id",
  "temperature": 34.5,
  "humidity": 72,
  "weight": 45.2,
  "bee_activity": 150
}
```

The server processes this data, triggers any necessary health alerts, and updates the dashboard in real-time.

## 📂 Project Structure

- `src/app/`: Next.js pages, layouts, and API routes.
- `src/components/`: Reusable React components and ShadCN UI elements.
- `src/ai/`: Genkit configuration and AI flow definitions.
- `src/lib/`: Mock data generators, TypeScript types, and utility functions.
- `src/hooks/`: Custom React hooks for state and UI logic.

## 📄 License

This project is licensed under the MIT License. © 2024 HiveMind IoT.