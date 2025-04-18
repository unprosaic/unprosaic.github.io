// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import fs from "fs";
import path from "path";
async function registerRoutes(app2) {
  app2.get("/api/config", async (req, res) => {
    try {
      const configPath = path.resolve(process.cwd(), "birthday-config.json");
      if (fs.existsSync(configPath)) {
        const configData = await fs.promises.readFile(configPath, "utf-8");
        res.json(JSON.parse(configData));
      } else {
        res.json({
          recipientName: "Gracelynn",
          birthdayDate: new Date(2025, 3, 18, 0, 0, 0),
          // April 18, 2025 at 12AM
          birthdayMessage: "Wishing you all the joy, happiness, and cake your heart desires on this special day!",
          age: 22,
          theme: "default",
          photos: []
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get birthday configuration" });
    }
  });
  app2.post("/api/config", async (req, res) => {
    try {
      const config = req.body;
      const configPath = path.resolve(process.cwd(), "birthday-config.json");
      await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
      res.json({ success: true, config });
    } catch (error) {
      res.status(500).json({ error: "Failed to save birthday configuration" });
    }
  });
  app2.get("/api/songs", (req, res) => {
    const musicDir = path.join(process.cwd(), "client", "public", "music");
    try {
      if (!fs.existsSync(musicDir)) {
        fs.mkdirSync(musicDir, { recursive: true });
      }
      const files = fs.readdirSync(musicDir).filter((file) => file.endsWith(".mp3")).map((file) => `/music/${file}`);
      res.json(files);
    } catch (error) {
      console.error("Error reading music directory:", error);
      res.status(500).json({ error: "Failed to list music files" });
    }
  });
  app2.get("/api/images", (req, res) => {
    const picsDir = path.join(process.cwd(), "client", "public", "pics");
    try {
      if (!fs.existsSync(picsDir)) {
        fs.mkdirSync(picsDir, { recursive: true });
      }
      const files = fs.readdirSync(picsDir).filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file)).map((file) => ({
        id: file,
        src: `/pics/${file}`,
        description: file.split(".")[0]
      }));
      res.json(files);
    } catch (error) {
      console.error("Error reading pics directory:", error);
      res.status(500).json({ error: "Failed to list images" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
