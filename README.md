# 📅 Planora - Interactive Calendar Application

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
</div>

<br />

<div align="center">
  <h3>🚀 A modern, feature-rich calendar application built with vanilla HTML, CSS, and JavaScript</h3>
  <p>Planora combines elegant design with powerful productivity features to help you manage your schedule and tasks efficiently.</p>
</div>

---

## ✨ Features

### 📅 **Calendar Management**
- **Interactive Calendar**: Click on any date to add events
- **Month Navigation**: Seamless navigation between months
- **Today Highlight**: Current date is prominently displayed
- **Event Indicators**: Visual dots and previews on dates with events

### 🎯 **Event Management**
- **Add Events**: Create events with title, date, time, and description
- **Event Categories**: Organize events by type (Work, Personal, Health, Education, Social)
- **Visual Categories**: Color-coded event indicators for easy identification
- **Event Search**: Real-time search functionality to find specific events

### ✅ **Task Management**
- **Task Creation**: Add tasks with priority levels and due dates
- **Priority System**: Low, Medium, and High priority classification
- **Task Completion**: Mark tasks as completed with visual feedback
- **Task Actions**: Complete or delete tasks with one click

### 🎨 **Modern UI/UX**
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Typography**: Clean Inter font family for excellent readability
- **Smooth Animations**: Professional micro-interactions and transitions

### 📊 **Productivity Dashboard**
- **Statistics Panel**: Track your events, tasks, and completion rates
- **Upcoming Events**: Quick preview of next 7 days
- **Task Overview**: View pending tasks at a glance
- **Completion Metrics**: Visual progress tracking

### ⌨️ **Keyboard Shortcuts**
- `Ctrl/Cmd + N`: Create new event
- `Ctrl/Cmd + T`: Create new task
- `Ctrl/Cmd + D`: Toggle dark/light theme
- `Shift + ←/→`: Navigate between months
- `Home`: Jump to current month
- `Escape`: Close open modals

### 💾 **Data Persistence**
- **Local Storage**: All data persists between browser sessions
- **No Server Required**: Fully client-side application
- **Export/Import**: Backup and restore your data (feature ready)

---

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/raza-abidii/Calendar-made-with-HTML-CSS-JS.git
cd Calendar-made-with-HTML-CSS-JS
```

### 2. **Open the Application**
Simply open `calendar.html` in your web browser, or serve it locally:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

### 3. **Start Using Planora**
- Navigate to `http://localhost:8000` (if using a local server)
- Click on any date to add events
- Use the sidebar to add tasks and view statistics
- Toggle between light and dark themes using the header button

---

## 📱 Screenshots

### Light Theme
*Modern, clean interface with intuitive navigation*

### Dark Theme
*Eye-friendly dark mode for extended use*

### Mobile View
*Fully responsive design that works on all devices*

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Structure and semantic markup | Latest |
| **CSS3** | Styling, animations, and responsive design | Latest |
| **JavaScript** | Interactive functionality and app logic | ES6+ |
| **Font Awesome** | Professional icons | 6.4.0 |
| **Google Fonts** | Typography (Inter & JetBrains Mono) | Latest |

---

## 🏗️ Project Structure

```
Calendar-master/
├── 📄 calendar.html      # Main HTML file
├── 🎨 style.css          # CSS styles and themes
├── ⚡ script.js          # JavaScript functionality
└── 📖 README.md          # Project documentation
```

---

## 🎯 Key Features Explained

### **Theme System**
- CSS custom properties for easy theme switching
- Persistent theme preference using localStorage
- Smooth transitions between light and dark modes

### **Event Management**
- Object-oriented JavaScript architecture
- Local storage for data persistence
- Category-based organization with color coding

### **Responsive Design**
- Mobile-first approach using CSS Grid and Flexbox
- Breakpoints for desktop, tablet, and mobile devices
- Touch-friendly interface elements

### **Accessibility**
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly markup
- Reduced motion support for accessibility preferences

---

## 🔧 Customization

### **Adding New Event Categories**
Edit the event category options in `calendar.html`:
```html
<select id="event-category" name="category">
  <option value="work">Work</option>
  <option value="personal">Personal</option>
  <option value="your-category">Your Category</option>
</select>
```

And add corresponding styles in `style.css`:
```css
.event-indicator.your-category { 
  background-color: #your-color; 
}
```

### **Customizing Colors**
Modify CSS custom properties in `style.css`:
```css
:root {
  --primary-color: #your-primary-color;
  --accent-color: #your-accent-color;
  /* ... other variables */
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### **Ideas for Contributions**
- 📱 Progressive Web App (PWA) features
- 🔄 Data synchronization with cloud services
- 📧 Email reminders for events
- 🔗 Calendar import/export (iCal format)
- 🎨 Additional themes and customization options
- 🌐 Internationalization (i18n) support

---

## 📋 Roadmap

- [ ] **Week and Day Views**: Additional calendar view modes
- [ ] **Recurring Events**: Support for repeating events
- [ ] **Reminders**: Browser notifications for upcoming events
- [ ] **Data Export**: Export to popular calendar formats
- [ ] **Collaboration**: Share calendars with others
- [ ] **Calendar Integration**: Sync with Google Calendar, Outlook
- [ ] **PWA Features**: Offline support and app installation

---

## 🐛 Known Issues

- None currently reported. Please [open an issue](https://github.com/raza-abidii/Calendar-made-with-HTML-CSS-JS/issues) if you find any bugs.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Raza Abidi**
- 🌐 Portfolio: [razaabidi.vercel.app](https://razaabidi.vercel.app/)
- 💼 LinkedIn: [raza-abidi](https://www.linkedin.com/in/raza-abidi-53675020b/)
- 📧 Email: razaabidi030@gmail.com
- 🐙 GitHub: [@raza-abidii](https://github.com/raza-abidii)

---

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Google Fonts for the typography
- The open-source community for inspiration and best practices

---

## ⭐ Show Your Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the code

---

<div align="center">
  <p>Made with ❤️ by <a href="https://razaabidi.vercel.app/">Raza Abidi</a></p>
  <p>© 2025 Planora. All rights reserved.</p>
</div>