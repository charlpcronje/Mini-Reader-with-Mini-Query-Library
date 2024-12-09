# Mini Reader

Mini Reader is a cross-platform document reading system designed to synchronize reader interactions with documents to a server. This enables playback and detailed analysis of user interactions with reading material, providing valuable insights into user behavior.

---

## Features

- **Cross-Platform Compatibility**: Works seamlessly across various devices and platforms.
- **User Interaction Tracking**: Logs user actions, such as page scrolling, text highlighting, and more.
- **Server Synchronization**: Syncs user interaction data to the server for playback and analysis.
- **Custom Components**: Built with modular components for flexibility and reusability.
- **AJAX & DOM Manipulation**: Lightweight MiniQuery framework included for enhanced interactivity.

---

## File Analysis Report

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | `./tsconfig.json`                    | 19       | 60       | 212       |
|  2    | `./env.js`                           | 14       | 37       | 49        |
|  3    | `./components/page-fx.js`            | 10       | 21       | 37        |
|  4    | `./components/text-fx.js`            | 10       | 21       | 37        |
|  5    | `./components/section-fx.js`         | 10       | 21       | 37        |
|  6    | `./components/row-fx.js`             | 10       | 21       | 37        |
|  7    | `./components/column-fx.js`          | 10       | 21       | 37        |
|  8    | `./components/heading-fx.js`         | 10       | 21       | 37        |
|  9    | `./components/link-fx.js`            | 10       | 21       | 37        |
| 10    | `./components/audio-fx.js`           | 10       | 21       | 37        |
| 11    | `./components/video-fx.js`           | 10       | 21       | 37        |
| 12    | `./components/image-fx.js`           | 10       | 21       | 37        |
| 13    | `./scripts/miniQuery.js`             | 180      | 500      | 903       |
| 14    | `./scripts/ComponentLoader.js`       | 18       | 72       | 155       |
| 15    | `./scripts/app.js`                   | 1        | 0        | 0         |
|       | **Total**                            | **332**  | **879**  | **1689**  |

---

## File Descriptions

### Configuration and Environment
- **`tsconfig.json`**: TypeScript configuration file specifying project setup, file paths, and output structure.
- **`env.js`**: Defines environment settings such as application host and port.

### Components
Modular Web Components built with `Lit` for specific UI features:
- **`page-fx.js`**: A container for rendering the main page.
- **`text-fx.js`**: Displays text elements.
- **`section-fx.js`**: Represents sections of content.
- **`row-fx.js`**: Creates horizontal row layouts.
- **`column-fx.js`**: Creates vertical column layouts.
- **`heading-fx.js`**: Displays headings.
- **`link-fx.js`**: Renders clickable links.
- **`audio-fx.js`**: Embeds audio players.
- **`video-fx.js`**: Embeds video players.
- **`image-fx.js`**: Renders images.

### Scripts
- **`miniQuery.js`**: A lightweight library for DOM manipulation and AJAX, similar to jQuery.
- **`ComponentLoader.js`**: Registers custom components and defines them for use in the project.
- **`app.js`**: Placeholder for initializing the Mini Reader application.

---

## Installation

1. Clone the repository:
   ```bash
   mkdir miniReader && cd miniReader
   git clone https://github.com/charlpcronje/Mini-Reader-with-Mini-Query-Library.git .
   ```

2. Install dependencies (if applicable):
   ```bash
   npm install
   ```

---

## Usage

1. **Start the Application**:
   Run the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

2. **Customize Components**:
   Modify the component files in the `./components` directory to suit your needs.

3. **View Interaction Playback**:
   Interaction data is synced to the server and can be played back to analyze user engagement.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Future Enhancements

- **Advanced Analytics**: Provide deeper insights into user behavior with visual reports.
- **Cross-Platform Support**: Enhance compatibility with mobile and desktop platforms.
- **Real-Time Synchronization**: Improve interaction data syncing to provide real-time updates.

For more information, visit [Mini Reader Documentation](./docs/README.md).