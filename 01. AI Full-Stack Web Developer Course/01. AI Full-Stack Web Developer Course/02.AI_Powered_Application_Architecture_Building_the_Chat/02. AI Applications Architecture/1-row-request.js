require('dotenv').config();

const {GoogleGenAI} = require()
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

