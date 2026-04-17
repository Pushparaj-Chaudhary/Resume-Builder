import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

// controller for enhancing a resumes professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. your task is to enhance the professional summary of a resume. The summary should be 1-2 sentence also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for enhancing a resume job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. your task is to enhance the job description of a resume. The job description should be 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI agent to extract data from resume";

    const userPrompt = `extract data from this resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:

        {
            "professional_summary": "",
            "skills": [""],
            "personal_info": {
                "image": "",
                "full_name": "",
                "profession": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": ""
            },
            "experience": [
                {
                    "company": "",
                    "position": "",
                    "start_date": "",
                    "end_date": "",
                    "description": "",
                    "is_current": false
                }
            ],
            "project": [
                {
                    "name": "",
                    "type": "",
                    "description": ""
                }
            ],
            "education": [
                {
                    "institution": "",
                    "degree": "",
                    "field": "",
                    "graduation_date": "",
                    "gpa": ""
                }
            ]
        }
        `;
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    let extractData = response.choices[0].message.content;
    extractData = extractData.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(extractData);
    const newResume = await Resume.create({ userId, title, ...parsedData });
    res.json({ resumeId: newResume._id });
  } catch (error) {
    console.error("Upload Resume Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// controller for checking ATS score of a resume
// POST: /api/ai/check-ats-score
export const checkATSScore = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = "You are an advanced Applicant Tracking System (ATS) evaluator.";
    const userPrompt = `Analyze the following resume against the given job description.

Your task is to:

1. Give an ATS compatibility score from 0 to 100.
2. Extract important keywords from the job description.
3. Identify which keywords are missing in the resume.
4. Evaluate the resume in these categories:
   - Keywords Match (0-100)
   - Skills Match (0-100)
   - Experience Relevance (0-100)
   - Education Fit (0-100)
   - Formatting & Structure (0-100)
5. Provide clear and actionable suggestions to improve the resume.
6. Highlight strengths of the resume.
7. Keep the response structured in JSON format.

STRICT OUTPUT FORMAT:

{
  "ats_score": number,
  "keyword_match": number,
  "skills_match": number,
  "experience_match": number,
  "education_match": number,
  "formatting_score": number,
  "missing_keywords": ["keyword1", "keyword2"],
  "matched_keywords": ["keyword1", "keyword2"],
  "strengths": ["strength1"],
  "suggestions": ["suggestion1"]
}

IMPORTANT RULES:
- Be realistic and strict in scoring.
- Do NOT give 90+ unless resume is highly optimized.
- Focus on skills, technologies, and role relevance.
- Avoid generic suggestions.
- Suggestions must be specific (e.g., "Add Docker in projects section").

Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    let extractData = response.choices[0].message.content;
    extractData = extractData.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(extractData);
    return res.status(200).json(parsedData);
  } catch (error) {
    console.error("Check ATS Score Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const testAI = async (req, res) => {
  try {
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: "Hello" }]
    });
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, stack: error.stack, full: error });
  }
};
