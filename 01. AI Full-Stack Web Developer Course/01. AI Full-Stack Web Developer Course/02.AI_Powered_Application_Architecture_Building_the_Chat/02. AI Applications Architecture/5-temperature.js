async function runExperiment(temp, topP, mode) {
  const prompt =
    'Complete this sentence: The mysterious box in the attic contained...';

  console.log(`\n--- ${mode}: Temp: ${temp}, TopP: ${topP} ---`);
  console.log(`Prompt: "${prompt}"`);

  for (let i = 1; i <= 3; i++) {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
      config: {
        temperature: temp,
        topP: topP,
        maxOutputTokens: 100,
      },
    });

    console.log(`Attempt ${i}: ${result.text.trim()}`);
  }
}