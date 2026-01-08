
import { GoogleGenAI, Type } from "@google/genai";
import { Category } from "../types";

const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const suggestCategoryAndPrice = async (title: string): Promise<{ category: Category; suggestedPriceRange: string }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest the most appropriate category and a realistic price range (in US Dollars $) for a handmade, artisanal item with the title: "${title}". Categories are: ${Object.values(Category).join(", ")}. Consider US market trends for small-batch handmade goods.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          suggestedPriceRange: { type: Type.STRING }
        },
        required: ["category", "suggestedPriceRange"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return {
    category: (Object.values(Category).includes(result.category as Category) ? result.category : Category.SUPPLIES) as Category,
    suggestedPriceRange: result.suggestedPriceRange
  };
};

export const generateSmartDescription = async (title: string, category: Category, condition: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a compelling, storytelling description for a handmade/artisanal item for a US audience:
      Title: ${title}
      Category: ${category}
      Condition: ${condition}
      Focus on craftsmanship, quality materials, and the unique story behind the item. Avoid generic corporate language; use a warm, personal, maker-centric tone. Keep it concise but soulful.`,
  });

  return response.text.trim();
};
