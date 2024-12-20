// src/app/app.js
import { $ } from "@fx/boot.js";
import "./router.js";
import "@fx/lit/debug/error-panel-fx.js"
import { env } from '@src/env.js';
// Initialize the app
$.loadSetup({ base: env.APP_HOST });
$.auth.check();

// Add the router component to the DOM
const appRouter = document.createElement('app-router');
document.body.appendChild(appRouter);