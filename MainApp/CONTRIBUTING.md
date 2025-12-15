# Contributing to TaskLance

Welcome to the TaskLance team! We want to make it easy for you to contribute to this project.

## 📂 Project Structure

- **`src/pages`**: All page views go here. Structure them by user role (`client/`, `freelancer/`).
- **`src/components`**: Reusable UI components.
    - **`layout/`**: Structural components (Sidebar, Navbar).
    - **`ui/`**: Generic UI elements (Buttons, Inputs).
- **`src/data`**: Mock data for frontend development.
- **`src/lib`**: Utility functions.

## 🚀 Adding a New Feature

1.  **Create a Branch**: Always work on a new branch.
    ```bash
    git checkout -b feature/your-feature-name
    ```

2.  **Add Your Page**:
    - Create a new file in `src/pages/[role]/YourPage.jsx`.
    - Use the `PanelLayout` wrapper to ensure consistent design.
    ```jsx
    import PanelLayout from "../../components/layout/PanelLayout";
    
    const YourPage = () => {
      return (
        <PanelLayout role="freelancer" title="Your Page Title">
          {/* Your Content Here */}
        </PanelLayout>
      );
    }
    ```

3.  **Register Route**:
    - Add your new route in `src/App.jsx`.
    - Ensure it is placed under the correct role section.

4.  **Update Navigation**:
    - If your page needs a sidebar link, update `src/components/layout/Sidebar.jsx`.

## 🎨 Styling Guidelines

- We use **Tailwind CSS v4**.
- Use the predefined color variables in `src/index.css` (e.g., `bg-primary`, `text-secondary`) instead of hardcoded hex values.
- Ensure your design is responsive (mobile-first or desktop-adaptive).

## 📡 Backend Integration

- Currently, we use mock data in `src/data/mock.js`.
- If you are implementing a real API, create a new service file in `src/services/` and swap the mock data import with your API call.

## ✅ Pull Request Checklist

- [ ] I have tested my changes locally.
- [ ] My code follows the project style.
- [ ] I have added necessary route configurations.
- [ ] I have updated the `mock.js` if I added new data requirements.
