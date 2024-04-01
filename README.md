# Booking App built using React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

Project: Booking System project in React with an API with these requirements:

1. Able to list all bookings
2. Able to create a booking
3. Able to update a specific booking
4. Able to delete a specific booking

---

Tools used:

- Backend: ExpressJS & PostgreSQL to create the API ; used [Neon](https://neon.tech/) for this project
- Frontend: React.js & Javascript; styling with React Bootstrap, Bootstrap Icons & Material UI
- Authentication: JSON Web Token

---

Features:

- Authentication Page: Google login is currently disabled. To access Admin page, use "admin@honey.com" as username & "admin123" as password.
- Admin page: there is no checkbox to select all since the Admin is only supposed to select incomplete entries.
- User main page: Sidebar buttons are non-functional, except for booking & sign-out button. Header has 2 Accordions for Terms & Conditions and Terms of Use. All bookings will show up under the header section.
- Booking Modal: clicking on the "Book A Room" button will trigger the Booking Modal.
- Edit booking Modal: clicking on the "Edit booking" button in the booking section will trigger another Modal. The date and time inputs are disabled.
- Creating and deleting a booking will cause the page to automatically reload itself without manually refreshing the page. A Spinner will appear while the page is loading.

IMPORTANT NOTICE: if you're making multiple bookings, please manually refresh the page to reload the Booking Modal. It still has minor reload/refresh issues, so this is one solution.
