// Calendar Application with Enhanced Features
class CalendarApp {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = null;
    this.events = this.loadFromStorage('events') || [];
    this.tasks = this.loadFromStorage('tasks') || [];
    this.theme = this.loadFromStorage('theme') || 'light';
    
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    this.init();
  }

  init() {
    this.setTheme(this.theme);
    this.renderCalendar();
    this.updateSidebarStats();
    this.renderUpcomingEvents();
    this.renderTaskList();
    this.bindEvents();
    this.showWelcomeMessage();
  }

  // Event Binding
  bindEvents() {
    // Navigation
    document.querySelector('.prev').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    document.querySelector('.next').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      this.toggleTheme();
    });

    // Today button
    document.getElementById('today-btn').addEventListener('click', () => {
      this.goToToday();
    });

    // Add event button
    document.getElementById('add-event-btn').addEventListener('click', () => {
      this.openEventModal();
    });

    // Add task button
    document.getElementById('add-task-btn').addEventListener('click', () => {
      this.openTaskModal();
    });

    // Modal events
    this.bindModalEvents();

    // Search functionality
    document.getElementById('search-events').addEventListener('input', (e) => {
      this.searchEvents(e.target.value);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });
  }

  bindModalEvents() {
    // Event modal
    const eventModal = document.getElementById('event-modal');
    const eventForm = document.getElementById('event-form');
    const closeEventModal = document.getElementById('close-modal');
    const cancelEventBtn = document.getElementById('cancel-btn');

    closeEventModal.addEventListener('click', () => {
      this.closeModal('event-modal');
    });

    cancelEventBtn.addEventListener('click', () => {
      this.closeModal('event-modal');
    });

    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEvent();
    });

    // Task modal
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const closeTaskModal = document.getElementById('close-task-modal');
    const cancelTaskBtn = document.getElementById('cancel-task-btn');

    closeTaskModal.addEventListener('click', () => {
      this.closeModal('task-modal');
    });

    cancelTaskBtn.addEventListener('click', () => {
      this.closeModal('task-modal');
    });

    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveTask();
    });

    // Close modal when clicking outside
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) {
        this.closeModal('event-modal');
      }
    });

    taskModal.addEventListener('click', (e) => {
      if (e.target === taskModal) {
        this.closeModal('task-modal');
      }
    });
  }

  // Calendar Rendering
  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Set first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = prevLastDay.getDate();
    
    // Update header
    document.querySelector('.month-year').textContent = 
      `${this.months[month]} ${year}`;
    document.querySelector('.current-date').textContent = 
      new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

    // Generate calendar days
    let daysHTML = '';
    
    // Previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const dateStr = this.formatDate(new Date(year, month - 1, day));
      daysHTML += `
        <div class="prev-date" data-date="${dateStr}">
          ${day}
          ${this.renderDateEvents(dateStr)}
        </div>
      `;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = this.formatDate(date);
      const isToday = this.isToday(date);
      const hasEvents = this.getEventsForDate(dateStr).length > 0;
      
      daysHTML += `
        <div class="${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
             data-date="${dateStr}" 
             onclick="app.selectDate('${dateStr}')">
          ${day}
          ${this.renderDateEvents(dateStr)}
        </div>
      `;
    }
    
    // Next month days
    const remainingCells = 42 - (firstDayIndex + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
      const dateStr = this.formatDate(new Date(year, month + 1, day));
      daysHTML += `
        <div class="next-date" data-date="${dateStr}">
          ${day}
          ${this.renderDateEvents(dateStr)}
        </div>
      `;
    }
    
    document.getElementById('calendar-days').innerHTML = daysHTML;
  }

  renderDateEvents(dateStr) {
    const events = this.getEventsForDate(dateStr);
    if (events.length === 0) return '';
    
    const maxVisible = 2;
    let eventsHTML = '';
    
    events.slice(0, maxVisible).forEach(event => {
      eventsHTML += `
        <div class="event-indicator ${event.category}" title="${event.title}">
          ${event.title}
        </div>
      `;
    });
    
    if (events.length > maxVisible) {
      eventsHTML += `
        <div class="event-indicator more">
          +${events.length - maxVisible} more
        </div>
      `;
    }
    
    return eventsHTML;
  }

  // Date Selection
  selectDate(dateStr) {
    this.selectedDate = dateStr;
    this.openEventModal(dateStr);
  }

  // Event Management
  openEventModal(date = null) {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    
    if (date) {
      document.getElementById('event-date').value = date;
    } else if (this.selectedDate) {
      document.getElementById('event-date').value = this.selectedDate;
    } else {
      document.getElementById('event-date').value = this.formatDate(new Date());
    }
    
    form.reset();
    if (date) {
      document.getElementById('event-date').value = date;
    }
    
    modal.classList.add('show');
    document.getElementById('event-title').focus();
  }

  saveEvent() {
    const form = document.getElementById('event-form');
    const formData = new FormData(form);
    
    const event = {
      id: Date.now().toString(),
      title: formData.get('title'),
      date: formData.get('date'),
      time: formData.get('time'),
      description: formData.get('description'),
      category: formData.get('category'),
      createdAt: new Date().toISOString()
    };
    
    this.events.push(event);
    this.saveToStorage('events', this.events);
    this.closeModal('event-modal');
    this.renderCalendar();
    this.renderUpcomingEvents();
    this.updateSidebarStats();
    this.showNotification('Event added successfully!', 'success');
  }

  // Task Management
  openTaskModal() {
    const modal = document.getElementById('task-modal');
    const form = document.getElementById('task-form');
    
    form.reset();
    modal.classList.add('show');
    document.getElementById('task-title').focus();
  }

  saveTask() {
    const form = document.getElementById('task-form');
    const formData = new FormData(form);
    
    const task = {
      id: Date.now().toString(),
      title: formData.get('title'),
      priority: formData.get('priority'),
      dueDate: formData.get('dueDate'),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.tasks.push(task);
    this.saveToStorage('tasks', this.tasks);
    this.closeModal('task-modal');
    this.renderTaskList();
    this.updateSidebarStats();
    this.showNotification('Task added successfully!', 'success');
  }

  toggleTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveToStorage('tasks', this.tasks);
      this.renderTaskList();
      this.updateSidebarStats();
    }
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveToStorage('tasks', this.tasks);
    this.renderTaskList();
    this.updateSidebarStats();
    this.showNotification('Task deleted!', 'info');
  }

  // Rendering Functions
  renderUpcomingEvents() {
    const container = document.getElementById('upcoming-events');
    const upcoming = this.getUpcomingEvents(7); // Next 7 days
    
    if (upcoming.length === 0) {
      container.innerHTML = '<p class="text-muted">No upcoming events</p>';
      return;
    }
    
    const eventsHTML = upcoming.map(event => `
      <div class="event-item">
        <h4>${event.title}</h4>
        <p>${this.formatEventDate(event)}</p>
      </div>
    `).join('');
    
    container.innerHTML = eventsHTML;
  }

  renderTaskList() {
    const container = document.getElementById('task-list');
    const incompleteTasks = this.tasks.filter(t => !t.completed).slice(0, 5);
    
    if (incompleteTasks.length === 0) {
      container.innerHTML = '<p class="text-muted">No pending tasks</p>';
      return;
    }
    
    const tasksHTML = incompleteTasks.map(task => `
      <div class="task-item ${task.completed ? 'completed' : ''}">
        <h4>${task.title}</h4>
        <p>Priority: ${task.priority}</p>
        ${task.dueDate ? `<p>Due: ${new Date(task.dueDate).toLocaleDateString()}</p>` : ''}
        <div class="task-actions">
          <button onclick="app.toggleTask('${task.id}')" title="Toggle completion">
            <i class="fas fa-check"></i>
          </button>
          <button onclick="app.deleteTask('${task.id}')" title="Delete task">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = tasksHTML;
  }

  updateSidebarStats() {
    const eventsCount = this.events.length;
    const tasksCount = this.tasks.length;
    const completedTasks = this.tasks.filter(t => t.completed).length;
    const completionRate = tasksCount > 0 ? Math.round((completedTasks / tasksCount) * 100) : 0;
    
    document.getElementById('events-count').textContent = eventsCount;
    document.getElementById('tasks-count').textContent = tasksCount;
    document.getElementById('completion-rate').textContent = `${completionRate}%`;
  }

  // Theme Management
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
    this.saveToStorage('theme', this.theme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // Utility Functions
  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  formatEventDate(event) {
    const date = new Date(event.date);
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    if (event.time) {
      const time = new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
      return `${dateStr} at ${time}`;
    }
    
    return dateStr;
  }

  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  getEventsForDate(dateStr) {
    return this.events.filter(event => event.date === dateStr);
  }

  getUpcomingEvents(days = 7) {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return this.events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= futureDate;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  goToToday() {
    this.currentDate = new Date();
    this.renderCalendar();
    this.showNotification('Jumped to today!', 'info');
  }

  searchEvents(query) {
    if (!query.trim()) {
      this.renderCalendar();
      return;
    }
    
    const filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    );
    
    this.highlightSearchResults(filteredEvents);
  }

  highlightSearchResults(events) {
    // Remove existing highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
    
    // Highlight matching dates
    events.forEach(event => {
      const dateElement = document.querySelector(`[data-date="${event.date}"]`);
      if (dateElement) {
        dateElement.classList.add('search-highlight');
      }
    });
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  showWelcomeMessage() {
    if (!this.loadFromStorage('hasVisited')) {
      setTimeout(() => {
        this.showNotification('Welcome to Calendar Pro! Click on dates to add events.', 'info');
        this.saveToStorage('hasVisited', true);
      }, 1000);
    }
  }

  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + N: New event
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      this.openEventModal();
    }
    
    // Ctrl/Cmd + T: New task
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault();
      this.openTaskModal();
    }
    
    // Ctrl/Cmd + D: Toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      this.toggleTheme();
    }
    
    // Escape: Close modals
    if (e.key === 'Escape') {
      this.closeModal('event-modal');
      this.closeModal('task-modal');
    }
    
    // Arrow keys: Navigate calendar
    if (e.key === 'ArrowLeft' && e.shiftKey) {
      e.preventDefault();
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    }
    
    if (e.key === 'ArrowRight' && e.shiftKey) {
      e.preventDefault();
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    }
    
    // Home: Go to today
    if (e.key === 'Home') {
      e.preventDefault();
      this.goToToday();
    }
  }

  // Storage Functions
  saveToStorage(key, data) {
    try {
      localStorage.setItem(`calendar_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  loadFromStorage(key) {
    try {
      const data = localStorage.getItem(`calendar_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  // Export/Import functionality
  exportData() {
    const data = {
      events: this.events,
      tasks: this.tasks,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showNotification('Data exported successfully!', 'success');
  }

  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.events) this.events = data.events;
        if (data.tasks) this.tasks = data.tasks;
        
        this.saveToStorage('events', this.events);
        this.saveToStorage('tasks', this.tasks);
        
        this.renderCalendar();
        this.renderUpcomingEvents();
        this.renderTaskList();
        this.updateSidebarStats();
        
        this.showNotification('Data imported successfully!', 'success');
      } catch (error) {
        this.showNotification('Failed to import data. Please check the file format.', 'error');
      }
    };
    reader.readAsText(file);
  }
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-lg);
    z-index: 1002;
    transform: translateX(100%);
    opacity: 0;
    transition: all var(--transition-normal);
    max-width: 300px;
  }
  
  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .notification-success {
    border-left: 4px solid var(--success-color);
  }
  
  .notification-error {
    border-left: 4px solid var(--danger-color);
  }
  
  .notification-info {
    border-left: 4px solid var(--primary-color);
  }
  
  .search-highlight {
    background-color: var(--accent-color) !important;
    color: var(--text-inverse) !important;
  }
`;
document.head.appendChild(style);

// Initialize the application
const app = new CalendarApp();

// Make app globally available for inline event handlers
window.app = app;