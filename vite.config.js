import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: resolve(__dirname, 'src/app'), // Entry point for the app
    server: {
        port: 5645, // Dev server port
        strictPort: true, // Fails if the port is already in use
        open: true, // Opens the browser automatically on start
    },
    build: {
        outDir: resolve(__dirname, 'dist'), // Output directory for production
        emptyOutDir: true, // Cleans the output directory before building
    },
    resolve: {
        alias: {
            '@app': resolve(__dirname, 'src/app'), // Alias '@app' to 'src/app'
            '@api': resolve(__dirname, 'src/api'), // Alias '@api' to 'src/api'
        },
    },
    plugins: [
        {
            name: 'serve-api-mock',
            configureServer(server) {
                server.middlewares.use('/api', (req, res, next) => {
                    const filePath = resolve(__dirname, `src/api${req.url}`);
                    res.sendFile(filePath);
                });
            },
        },
    ],
});
