require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function runExperiment(temp, topP) {
  const prompt =
    'Explain why use arrow function in javascript? in 100 words';

  console.log(`\n--- Temp: ${temp}, TopP: ${topP} ---`);
  console.log(`Prompt: "${prompt}"`);

  // Run 3 times to see variety (or lack of it)
  for (let i = 1; i <= 3; i++) {
    const result = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        temperature: temp, // 0.0 to 2.0
        topP: topP,        // 0.0 to 1.0
        maxOutputTokens: 100, // keep it short
      },
    });

    console.log(`Attempt ${i}: ${result.text}`);
  }
}

async function run() {
  // Experiment 1: The "Strict Librarian" (Low Temp)
  // Expectation: All 3 answers should be almost identical and boring.
  await runExperiment(0.0, 0.1, 'Strict Mode');

  // Experiment 2: The "Crazy Artist" (High Temp)
  // Expectation: Answers should be wild, different, and maybe weird.
  await runExperiment(1.5, 0.95, 'Creative Mode');
}

run();