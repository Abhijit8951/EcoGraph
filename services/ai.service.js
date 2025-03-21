const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash", 
    systemInstruction: `You are a financial advisor. You answer all the questions in a professional manner. You only provide data based on the Indian market and you answer questions only related to finance, GDP, stocks, bonds, mutual funds, etc.`
});

const generateResult = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = { generateResult };