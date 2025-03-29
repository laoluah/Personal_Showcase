import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');
  
  // Get all waitlist entries
  app.get('/api/waitlist', async (_req: Request, res: Response) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.json(entries);
    } catch (error) {
      console.error('Error fetching waitlist entries:', error);
      res.status(500).json({ message: 'Error fetching waitlist entries' });
    }
  });

  // Add a new waitlist entry
  app.post('/api/waitlist', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const result = insertWaitlistSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: 'Validation error',
          errors: validationError.message
        });
      }

      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(result.data.email);
      if (existingEntry) {
        return res.status(409).json({ 
          message: 'Email already registered on the waitlist'
        });
      }

      // Create waitlist entry
      const newEntry = await storage.createWaitlistEntry(result.data);
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error creating waitlist entry:', error);
      res.status(500).json({ message: 'Error adding to waitlist' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
