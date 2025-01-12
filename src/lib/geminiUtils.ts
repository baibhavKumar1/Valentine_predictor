import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable")
}

const genAI = new GoogleGenerativeAI(API_KEY)

export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    console.log('Initializing Gemini model');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    console.log('Generating content');
    const result = await model.generateContent(prompt)
    console.log('Content generated');
    const response = result.response
    return response.text()
  } catch (error: any) {
    console.error("Error generating content with Gemini:", error)
    if (error.message.includes("safety")) {
      throw new Error("Content flagged for safety reasons. Please try different inputs.")
    } else {
      throw new Error(`Failed to generate content: ${error.message}`)
    }
  }
}

