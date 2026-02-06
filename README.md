# Utility Tools

**Live Demo:** [https://imdeepmind.com/utility-tools](https://imdeepmind.com/utility-tools)

A collection of simple yet powerful utility tools for developers, built with modern web technologies. This project aims to provide a clean, fast, and offline-capable set of tools for everyday development tasks.

![Utility Tools Screenshot](/public/logo.png)

## 🚀 Features

### **1. JSON Formatter**
-   **Format & Beautify**: Instantly format minified JSON.
-   **Validation**: Real-time error detection for invalid JSON.
-   **Monaco Editor**: Powerful code editing experience with syntax highlighting.
-   **Dark Mode**: Optimized for low-light environments.
-   **Copy & Paste**: Quick buttons to manage your data.

### **2. Text Comparison Tool**
-   **Diff Check**: Compare two texts side-by-side.
-   **Granular Highlighting**: Spot differences at the character and word level.
-   **Visual Gutter Indicators**: Quickly identify lines with additions or removals.
-   **Dark Mode Support**: Custom contrasting colors for readability in dark mode.

## 🛠️ Tech Stack

-   **Frontend Framework**: React 19 + TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Code Editor**: Monaco Editor (`@monaco-editor/react`)
-   **Routing**: React Router DOM 7
-   **Diff Logic**: `diff` package
-   **SEO**: Native React 19 Metadata

## 📦 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
-   Node.js (v20 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/imdeepmind/utility-tools.git
    cd utility-tools
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173/utility-tools/` (Base path is configured for production).

## 📂 Project Structure

```
utility-tools/
├── public/              # Static assets (logo, favicon)
├── src/
│   ├── components/      # Reusable components (Navbar, CodeEditor, SEO)
│   ├── context/         # Global state (ThemeContext)
│   ├── pages/           # Page components (Home, JsonFormatter, TextComparison)
│   ├── App.tsx          # Main application component & Routing
│   ├── main.tsx         # Entry point & Providers
│   └── index.css        # Global styles & Tailwind directives
├── package.json         # Dependencies & Scripts
└── vite.config.ts       # Vite Configuration
```

## 🤝 Contribution Guidelines

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```
3.  **Commit your changes**:
    ```bash
    git commit -m "Add some amazing feature"
    ```
4.  **Push to the branch**:
    ```bash
    git push origin feature/amazing-feature
    ```
5.  **Open a Pull Request**.

### Guidelines
-   Ensure your code follows the existing style and conventions.
-   Test common components like `CodeEditor` to ensure no regression.
-   Check your changes in both Light and Dark modes.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

