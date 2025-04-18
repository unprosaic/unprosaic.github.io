import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for birthday configuration
  app.get("/api/config", async (req, res) => {
    try {
      // In a real app, this would fetch from database
      // For now, we'll check if a config file exists
      const configPath = path.resolve(process.cwd(), 'birthday-config.json');

      if (fs.existsSync(configPath)) {
        const configData = await fs.promises.readFile(configPath, 'utf-8');
        res.json(JSON.parse(configData));
      } else {
        // Return default config if none exists
        res.json({
          recipientName: "Gracelynn",
          birthdayDate: new Date(2025, 3, 18, 0, 0, 0), // April 18, 2025 at 12AM
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

  app.post("/api/config", async (req, res) => {
    try {
      const config = req.body;

      // In a real app, this would save to database
      // For now, we'll save to a JSON file
      const configPath = path.resolve(process.cwd(), 'birthday-config.json');
      await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));

      res.json({ success: true, config });
    } catch (error) {
      res.status(500).json({ error: "Failed to save birthday configuration" });
    }
  });

  // Endpoint to list music files
  app.get('/api/songs', (req, res) => {
    const musicDir = path.join(process.cwd(), 'client', 'public', 'music');

    try {
      if (!fs.existsSync(musicDir)) {
        fs.mkdirSync(musicDir, { recursive: true });
      }

      const files = fs.readdirSync(musicDir)
        .filter(file => file.endsWith('.mp3'))
        .map(file => `/music/${file}`);

      res.json(files);
    } catch (error) {
      console.error('Error reading music directory:', error);
      res.status(500).json({ error: 'Failed to list music files' });
    }
  });

  // Endpoint to list images
  app.get('/api/images', (req, res) => {
    const picsDir = path.join(process.cwd(), 'client', 'public', 'pics');

    try {
      if (!fs.existsSync(picsDir)) {
        fs.mkdirSync(picsDir, { recursive: true });
      }

      const files = fs.readdirSync(picsDir)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(file => ({
          id: file,
          src: `/pics/${file}`,
          description: file.split('.')[0]
        }));

      res.json(files);
    } catch (error) {
      console.error('Error reading pics directory:', error);
      res.status(500).json({ error: 'Failed to list images' });
    }
  });


  const httpServer = createServer(app);

  return httpServer;
}