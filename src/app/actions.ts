'use server'

import { generateWithGemini } from '@/lib/geminiUtils'

interface GeminiResponse {
  meaning: string;
  valentinePrediction: string;
}

export async function generateMeaning(name: string, gender: string, country: string) {
  console.log(`Generating meaning for: ${name}, ${gender}, ${country}`);

  const prompt = `Generate a family-friendly, under safety guidelines , culturally appropriate name meaning and Valentine's Day prediction in json format for:
Name: ${name}
Gender: ${gender}
Country: ${country}

JSON FORMAT:
{
  "meaning": "A personalized meaning of the name (2-3 sentences)",
  "valentinePrediction": "A Valentine's Day-themed prediction (1-2 sentences)"
}

// Please provide the following in your response:
//   1. A personalized meaning of the name (2-3 sentences)
//   2. A Valentine's Day-themed prediction (1-2 sentences)

  For male names:
  - Use a sarcastic and roasting tone
  - Include popular memes or cultural references from their country
  - For the valentine prediction, be sarcastic or roast them in their country's language

  For female names:
  - Use a cute, flirty, and sweet tone
  - Include cute memes or references that would make them blush
  - For the valentine prediction, give a boy's name and a cute message, meme, or movie scene reference
  - Occasionally (about 20% of the time for Indian girls), suggest "Vivek Panchal" as the valentine with the message: "If we start talking today, we could be together on Valentine's Day! Message me on Twitter @vivekpanchaal"

  Ensure the content is engaging, culturally relevant, and appropriate for the gender and country. Do not use any asterisks or special formatting in your response.`

  const maxRetries = 3; // Maximum number of retries
  let attempt = 0; // Current attempt count

  while (attempt < maxRetries) {
    try {
      console.log('Calling generateWithGemini');
      const responseString = await generateWithGemini(prompt);
      const response: GeminiResponse = JSON.parse(responseString);
      console.log('Response received:', response);
      
      // Check if response has the required keys
      if (!response.meaning || !response.valentinePrediction) {
        console.error("Unexpected response format:", response);
        throw new Error("Received an unexpected response format from the AI.");
      }

      return {
        meaning: response.meaning.trim(),
        valentinePrediction: response.valentinePrediction.trim()
      };
    } catch (error: any) {
      console.error("Error in generateMeaning:", error);
      attempt++;

      if (attempt >= maxRetries) {
        if (error.message.includes("safety")) {
          throw new Error("We couldn't generate a response due to content guidelines. Please try different inputs.");
        } else {
          throw new Error("An error occurred while generating the name meaning. Please try again later.");
        }
      }
      console.log(`Retrying... (${attempt}/${maxRetries})`);
    }
  }
}

