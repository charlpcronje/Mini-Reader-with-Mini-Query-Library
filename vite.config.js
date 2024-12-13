import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
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
                server.middlewares.use('/api', (req, res) => {
                    const filePath = resolve(__dirname, `src/api${req.url}`);
                    fs.access(filePath, fs.constants.F_OK, err => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Not Found');
                        } else {
                            const stream = fs.createReadStream(filePath);
                            stream.pipe(res);
                        }
                    });
                });
            },
        },
    ],
});
