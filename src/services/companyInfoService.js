import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const getCompanyInfo = async (url) => {
  try {
    // Fetch the webpage content
    const response = await fetch(url);
    const html = await response.text();

    // Create a temporary div to parse HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract text content and remove extra whitespace
    const textContent = doc.body.textContent.replace(/\s+/g, ' ').trim();

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate summary using Gemini
    const prompt = `Summarize the following content about company culture and work environment. Focus on key aspects like work culture, benefits, and growth opportunities: ${textContent}`;
    
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return summary;
  } catch (error) {
    console.error('Error processing company info:', error);
    return null;
  }
}; 