// ./env.js

// Define the environment configuration object
const env = {
    APP_HOST: 'https://mini.reader.webally.co.za/',
    APP_PORT: 80,
    STORAGE_KEY: 'mini-reader-storage'
};

// Freeze the object to prevent modifications
Object.freeze(env);

// Export the frozen object for use elsewhere
export { env };
