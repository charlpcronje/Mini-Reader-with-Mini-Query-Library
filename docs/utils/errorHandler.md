### **Error Handler and Panel Documentation**

This guide explains how to use the **BaseClass Error Handler** and the **ErrorPanel** Web Component in your project.

---

## **1. BaseClass Error Handler**

### **Purpose**
The `BaseClass` provides centralized error and warning logging for your application. It ensures that:
- Errors and warnings are logged to the console.
- Logs are saved in `localStorage` (FIFO for the last 100 messages).
- Notifications can be toggled on or off for future enhancements.

---

### **Usage**

#### **Extending BaseClass**
To use the error handler, extend the `BaseClass` in your classes. Errors in your methods will automatically be caught and logged.

```javascript
import { BaseClass } from './utils/BaseClass.js';

class MyComponent extends BaseClass {
  riskyMethod() {
    // Simulate an error
    throw new Error('Something went wrong!');
  }
}

const component = new MyComponent();
component.riskyMethod(); // Automatically logs the error to console and saves it in localStorage
```

#### **Manually Logging Errors**
You can manually log errors, warnings, or other types of messages using the static methods provided by `BaseClass`.

```javascript
BaseClass.error('This is an error message');
BaseClass.warn('This is a warning message');
BaseClass.success('This is a success message');
BaseClass.info('This is an info message');
```

---

### **Notifications**
By default, notifications are **disabled**. To enable notifications, set `BaseClass.enableNotifications = true`. Notifications are currently commented out for customization.

```javascript
BaseClass.enableNotifications = true;
```

---

### **LocalStorage Key**
Logs are saved under the `localStorage` key: `error-panel-storage`.

---

### **Customizing Behavior**
You can modify the following settings in `BaseClass`:
- **`BaseClass.maxLogs`**: Maximum number of logs to retain (default: `100`).
- **`BaseClass.enableNotifications`**: Enable or disable notifications (default: `false`).

---

## **2. ErrorPanel Web Component**

### **Purpose**
The `ErrorPanel` is a LitElement-based Web Component that provides a visual interface for managing and viewing errors logged by the `BaseClass`.

---

### **Usage**

#### **Adding the ErrorPanel to Your Project**
Add the `ErrorPanel` to your HTML or dynamically register it in JavaScript.

##### **Static HTML Example**
```html
<error-panel></error-panel>
```

##### **Dynamic Registration**
```javascript
import './components/ErrorPanel.js';

const panel = document.createElement('error-panel');
document.body.appendChild(panel);
```

#### **Opening the Panel**
- **Shortcut Key**: Press `Ctrl + E` (default) to toggle the panel.
- **Programmatically**: Use the `togglePanel()` method.

```javascript
document.querySelector('error-panel').togglePanel();
```

---

### **Panel Features**

#### **1. Filters**
Filter logs by type using the footer buttons:
- **Errors**: Show only error messages.
- **Warnings**: Show only warning messages.
- **Info**: Show only informational messages.
- **All**: Show all log types.

#### **2. Copy to Clipboard**
- **Copy Last**: Copies the last log entry to the clipboard.
- **Copy All**: Copies all visible log entries to the clipboard.

#### **3. Tabbed Interface**
- **Errors Tab**: Displays the list of logs.
- **Details Tab**: Shows detailed information about a selected log. To open:
  - **Single Click**: Highlights a log entry.
  - **Double Click**: Opens the log details in the "Details" tab.

#### **4. Clear Logs**
Click the "Clear" button to remove all logs from `localStorage` and the panel.

---

### **Panel Persistence**
The panel remembers its:
- **Visibility**: If the panel is open or closed.
- **Position**: Drag the panel to reposition it; the position is saved.
- **Size**: Resize the panel, and the size is saved.

---

### **Shortcut Key Configuration**
You can modify the shortcut key for toggling the panel:
1. **Locate `ErrorPanel` in your code.**
2. Modify the `shortcutKey` in the `ErrorPanel` constructor or dynamically:

```javascript
const panel = document.querySelector('error-panel');
panel.shortcutKey = 'p'; // Changes to Ctrl + P
```

---

### **Development Notes**

#### Notifications (Future)
The `BaseClass` has a placeholder for notifications. You can uncomment and customize the notification logic in the future as needed.

#### Theming
The panel uses a dark theme with color-coded logs:
- **Red**: Errors
- **Orange**: Warnings
- **Blue**: Info
- **Green**: Success

---

### **Example Workflow**
1. **Log an Error**
   ```javascript
   BaseClass.error('Critical issue occurred!');
   ```

2. **View in Panel**
   Press `Ctrl + E` to open the error panel and review the log.

3. **Copy Logs**
   Use "Copy All" to copy visible logs or "Copy Last" for the latest entry.

4. **View Details**
   Double-click a log to view detailed information in the "Details" tab.

---

This documentation provides a complete overview of the Error Handler and Error Panel functionality, making it easy to debug and monitor your application errors. Let me know if you'd like additional features or refinements!