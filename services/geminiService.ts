import { GoogleGenAI } from "@google/genai";
import { WishStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWeddingWish = async (
  coupleNames: string,
  style: WishStyle
): Promise<string> => {
  try {
    const prompt = `
      Escribe un mensaje de felicitación de boda para los novios ${coupleNames}.
      El estilo del mensaje debe ser: ${style}.
      El mensaje debe ser cálido, personal y en español.
      Máximo 50 palabras.
      No pongas comillas al principio ni al final.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "¡Felicidades por su boda!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "¡Les deseo toda la felicidad del mundo en esta nueva etapa!";
  }
};