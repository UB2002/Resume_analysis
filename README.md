# Resume Processor API

## Overview
This project is an AI-powered Resume Processor API built with Express.js. It fetches a resume in PDF format, extracts text using `pdf-parse`, sends the extracted text to Google's Gemini AI for structured data extraction, encrypts sensitive fields, and stores the data in MongoDB.

## Features
- Parses text from PDF resumes
- Uses Gemini AI to extract structured JSON data
- Encrypts sensitive information (name, email)
- Stores extracted data in MongoDB

## Tech Stack
- **Backend:** Node.js, Express.js
- **AI Processing:** Gemini AI
- **Database:** MongoDB (Mongoose)
- **Encryption:** Crypto.js

## Installation

### Prerequisites
- Node.js & npm installed
- MongoDB running
- Google Gemini API Key

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/resume-processor.git
   cd resume-processor
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   SECRET_KEY=your_secret_key_here
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```sh
   npm build
   npm start
   ```

## API Endpoints
Use the postman collection for using the API endpoints
### 1. Process Resume
**POST** `/api/process`
#### Request Body:
```json
{
  "url": "https://example.com/resume.pdf"
}
```
#### Response:
```json
{
  "message": "Resume processed successfully",
  "data": {
    "name": "encrypted_value",
    "email": "encrypted_value",
    "education": {
      "degree": "B.Tech",
      "branch": "CS",
      "institution": "XYZ University",
      "year": "2023"
    },
    "experience": {
      "job_title": "Software Engineer",
      "company": "ABC Corp",
      "start_date": "2021",
      "end_date": "Present"
    },
    "skills": ["JavaScript", "Node.js", "MongoDB"],
    "summary": "Experienced software engineer..."
  }
}
```

### 2. Search for an Applicant
**POST** `/api/search`
#### Request Body:
```json
{
  "name": "PRABHAT BHARDWAJ"
}
```
#### Response:
```json
{
  "message": "Resume processed successfully",
  "data": {
    "name": "encrypted_value",
    "email": "encrypted_value",
    "education": {
      "degree": "B.Tech",
      "branch": "CS",
      "institution": "XYZ University",
      "year": "2023"
    },
    "experience": {
      "job_title": "Software Engineer",
      "company": "ABC Corp",
      "start_date": "2021",
      "end_date": "Present"
    },
    "skills": ["JavaScript", "Node.js", "MongoDB"],
    "summary": "Experienced software engineer..."
  }
}
```

## Project Structure
```
resume-processor/
│── model/
│   ├── Application.js
│── middleware/
│   ├── check.js
│── routes/
│   ├── process.js
|   ├── resume.js
|   ├── Authentication.js
│── crypto.js
│── server.js
│── .env
│── .gitignore
│── package.json
│── README.md
```
