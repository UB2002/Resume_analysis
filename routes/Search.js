const express = require("express");
const router = express.Router();
const Applicant = require("../model/Application");
const authMiddleware = require("../middleware/check");
const {decrypt} = require("../crypto");
require("dotenv").config(); // Ensure environment variables are loaded



router.post("/search", authMiddleware, async (req, res) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required for search" });
    }

    // 🔹 Decrypt the search query
    const decryptedName = decrypt(name);

    // 🔹 Search for encrypted names in MongoDB
    const regex = new RegExp(decryptedName, "i");
    const applicants = await Applicant.find({ name: { $regex: regex } });

    if (!applicants || applicants.length === 0) {
      return res.status(404).json({ error: "No matching resumes found" });
    }

    // 🔹 Decrypt each applicant's data
    const decryptedApplicants = applicants.map((applicant) => ({
      ...applicant.toObject(), // Convert Mongoose document to plain object
      name: decrypt(applicant.name),
      email: decrypt(applicant.email),
    }));

    return res.status(200).json({ results: decryptedApplicants });
  } catch (err) {
    console.error("Error searching resumes:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
