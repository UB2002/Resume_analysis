const express = require("express");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const Applicant = require("../model/Application");
const authMiddleware = require("../middleware/check");
const router = express.Router();
const { encrypt } = require("../crypto")
require("dotenv").config();


router.post("/process", authMiddleware, async (req, res) => {
  const { url } = req.body;

  try {
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Fetch PDF
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const pdfData = await pdfParse(response.data);
    let extractedText = pdfData.text;

    if (!extractedText || extractedText.trim() === "") {
      return res.status(500).json({ error: "No text detected in file" });
    }

    // Preprocess extracted text
    extractedText = extractedText.replace(/\s+/g, " ").trim();

    // AI Prompt
    const formattedPrompt = `
      You are an AI that extracts structured JSON from resumes.
      Given the following resume text, extract and return JSON in this format:
      {
        "name": "Full Name",
        "email": "example@email.com",
        "education": {
          "degree": "Degree Name",
          "branch": "Field of Study",
          "institution": "University Name",
          "year": "Graduation Year"
        },
        "experience": {
          "job_title": "Job Title",
          "company": "Company Name",
          "start_date": "Start Date",
          "end_date": "End Date"
        },
        "skills": ["Skill 1", "Skill 2", "Skill 3"],
        "summary": "Short summary of candidate profile"
      }

      Resume Text:
      "${extractedText}"
    `;

    // AI Request (Fixed)
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        contents: [{ role: "user", parts: [{ text: formattedPrompt }] }],
      },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    //console.log("Gemini Response:", JSON.stringify(geminiResponse.data, null, 2));

    // Extract AI-generated JSON
    let aiGeneratedData = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiGeneratedData) {
      return res.status(500).json({ error: "AI processing failed" });
    }
    aiGeneratedData = aiGeneratedData.replace(/```json|```/g, "").trim();
    // Parse JSON output from AI
    const parsedData = JSON.parse(aiGeneratedData);
    parsedData.name = encrypt(parsedData.name);
    parsedData.email = encrypt(parsedData.email);
    // Save to MongoDB
    const applicant = new Applicant(parsedData);
    await applicant.save();

    res.json({ message: "Resume processed successfully", data: parsedData });
  } catch (err) {
    console.error("Error processing resume:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
