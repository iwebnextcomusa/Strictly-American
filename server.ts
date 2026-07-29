import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const getGeminiAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Chat API Endpoint for AI Stylist & Customer Support Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const ai = getGeminiAI();
      if (!ai) {
        // Fallback response if API key is not yet configured or injected
        return res.json({
          reply: `Thank you for reaching out to Strictly American! I am your AI Brand Concierge. I can assist with our 100% Made in the USA apparel, sizing guides, order history, and domestic sourcing details (e.g. Texas heavyweight cotton, Los Angeles denim, and North Carolina knitwear). How can I assist your luxury shopping experience today?`
        });
      }

      const systemInstruction = `You are "Liberty", the AI Concierge and Brand Ambassador for Strictly American - a luxury 100% Made in the USA apparel brand.
Brand Attributes:
- Tagline: 100% Made in the USA.
- Mission: Premium American craftsmanship, supporting domestic workers, ethical manufacturing, timeless luxury style (inspired by heritage American brands like Ralph Lauren but uniquely patriotic and modern).
- Sourcing: Texas organic cotton, North Carolina heritage looms, Los Angeles precision tailoring, Detroit full-grain leather, New England wool.
- Customer Service Contact: Phone 530-249-1368, Email conquestgd@gmail.com.
- Free shipping on orders over $150. Easy 30-day domestic returns.
- Tone: Sophisticated, polite, helpful, proud of American quality, knowledgeable about fits, fabrics, and care.
Provide concise, helpful, and elegant answers. Keep formatting clean with bullet points when listing specs or advice.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          if (h.role === 'user') {
            contents.push({ role: 'user', parts: [{ text: h.content }] });
          } else if (h.role === 'assistant') {
            contents.push({ role: 'model', parts: [{ text: h.content }] });
          }
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I'd be honored to assist you with our 100% Made in the USA collection.";
      return res.json({ reply });

    } catch (err: any) {
      console.error('Gemini Chat Error:', err);
      return res.status(500).json({
        reply: "Pardon me, I encountered a brief connection issue. Our customer support team is always available at 530-249-1368 or conquestgd@gmail.com to assist you directly!"
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'Strictly American', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Strictly American Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
