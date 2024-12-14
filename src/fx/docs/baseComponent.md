### **`BaseComponent.js` Overview**

Refers to: `/src/fx/components/baseComponent.js`

The `BaseComponent` is a reusable base class for creating custom web components using the LitElement framework. It includes a comprehensive set of properties, lifecycle methods, and utility integrations to streamline the development of advanced, interactive, and trackable components.

---

### **Attributes**
The component defines the following customizable attributes, supporting reflection and synchronization with the DOM:

#### **User & Session Info**
- `user_id` (String): Identifies the user interacting with the component.
- `session_id` (String): Automatically generated unique session identifier.

#### **Component Metadata**
- `componentSlug` (String): Unique identifier for the component.
- `slug` (String): General-purpose identifier.
- `title` (String): Title of the component.
- `topicSlug` (String): Identifier for associated topics.
- `author` (String): Author metadata.
- `createdAt`, `publishAt`, `updatedAt` (String): Timestamps for creation, publishing, and updates.

#### **Styling**
- **Border & Shadow**: `styleBorder`, `styleShadow` (String): CSS styling for borders and shadows.
- **Background**: `styleBgColor`, `styleBgGradient` (String): Background color or gradient.
- **Font**: `styleFont`, `styleFontSize`, `styleFontWeight` (String): Font family, size, and weight.
- **Padding & Margin**: `stylePadding`, `styleMargin` (String): Padding and margin settings.
- **Width**: `styleWidth`, `styleTabletWidth`, `styleMobileWidth` (String): Width settings for desktop, tablet, and mobile layouts.
- **Gutter**: `styleGutterWidth` (String): Gutter width for spacing.

#### **Layout**
- `layoutColumns` (Number): Number of layout columns.

#### **Visibility Controls**
- `showComments`, `showInfo` (Boolean): Toggles for displaying comments and informational sections.
- `protected` (Boolean): Indicates if the component is password-protected.
- `passcode` (String): Password for accessing the protected component.

#### **API Configuration**
- `apiHost`, `apiKey`, `apiEndpoint` (String): API settings for host, authentication key, and endpoint.
- `apiInterval` (Number): API polling interval in milliseconds.
- `apiSlug` (String): API-specific identifier.

#### **Event Handlers**
- `onLoad`, `onReady`, `onScroll`, `onClose`, `onResize` (String): Event handlers for various lifecycle events.
- `debounceTime` (Number): Debouncing time for throttling events like scroll and resize.

#### **Hierarchy & Context**
- `node_id`, `parent_id`, `page_id`, `topic_id` (String): Identifiers for component relationships and hierarchy.

---

### **Key Features**
1. **Lifecycle Methods**:  
   The component integrates key LitElement lifecycle hooks:
   - `connectedCallback` and `disconnectedCallback` for DOM lifecycle management.
   - `firstUpdated` for initializing event listeners and observers.
   - `updated` for handling property changes.

2. **Event Logging**:  
   The `Logger` utility records user interactions (`click`, `mouseover`), window events (`scroll`, `resize`), and visibility changes. It tracks:
   - Timestamps since the session started.
   - Time elapsed since the last event.
   - Contextual data (e.g., event target, visibility ratio).

3. **Intersection Observer**:  
   Tracks the component’s visibility within the viewport, logging changes with fine-grained thresholds (0–100%).

4. **Error Handling**:  
   All methods include error handling with the `ErrorHandler` utility.

5. **Utility Integrations**:  
   - `IDBManager` for IndexedDB initialization.
   - `LocalStorageManager` for saving logged events locally.

6. **Default Styling**:  
   Provides basic CSS styles for layout consistency and a slot for dynamic content insertion.

---

### **Example Use Cases**
- **Trackable UI Components**: Capture user interactions for analytics or debugging.
- **Content Blocks**: Build configurable page sections with custom styling.
- **Interactive Widgets**: Develop reusable, dynamic elements like sliders, modals, or galleries.