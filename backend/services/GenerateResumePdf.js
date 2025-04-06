import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateResumePdf(resumeData) {
    const prompt=` I will provide you the resume data and you have to simply fit that data into to the jason format provided below.
    Without modifing anything in the json format and no other information should be added in the response onlt the data given,
    and if any data is missing then put that data as "N/A" in the json format.

    data provided: ${resumeData}

      ### Response Format:
     - And stick to the given jason format dont change the format and no other information should be added in the response
     - Format note: Provide ONLY the JSON object with no additional text
     - No introduction text like "Here's a question..." or "Based on..."
     - The response should start directly with "{" and end with "}"
     - No extra spaces or new lines outside the JSON object
    Return a JSON object strictly following this structure, ensuring 98%+ ATS optimization:
    {
      "contactInformation": {
        "name": "Full Name",
        "email": "professional.email@domain.com",
        "phone": "Contact Number",
        "linkedin": "LinkedIn URL",
        "github": "GitHub URL",
        "location": "City, State"
}
      "education": {
        "graduation": {
          "degree": "Complete Degree Name",
          "institution": "University Name",
          "location": "Location",
          "yearSpan": "YYYY-YYYY",
          "CPI": "GPA"
        },
        "intermediate": {
          "schoolName": "School Name",
          "percentage": "XX%",
          "stream": "Stream",
          "yearSpan": "YYYY-YYYY",
          "location": "Location"
        },
        "highSchool": {
          "schoolName": "School Name",
          "percentage": "XX%",
          "yearSpan": "YYYY-YYYY",
          "location": "Location"
        }
      },
      "workExperience": [
        {
          "jobTitle": "Industry-Standard Title",
          "company": "Company Name",
          "description": [
            "• Achieved X% improvement by implementing Y solution using Z technology",
            "• Led team of X members to deliver Y project resulting in Z impact"
          ]
        }
      ],
      "projects": [
        {
          "projectTitle": "Descriptive Project Name",
          "description": [
            "• Problem solved and approach taken",
            "• Technologies and methodologies used",
            "• Quantifiable results and impact"
          ]
        }
      ],
      "skills": {
        "technicalSkills": [
          "Technical Skill 1",
          Technical Skill 2",
            "Technical Skill 3",....
        ],
        "softSkills": [
          "Soft Skill 1",
          "Soft Skill 2",....
        ]
      },
      "certifications": [
        {
          "name": "Industry-Recognized Certification"
        }
      ],
      "achievements": [
        "Quantified achievement with metrics"
      ]
    }
    `;
    const response = await groq.chat.completions.create({
        messages: [
        //   { role: "system", content: "You are an expert interview question designer who specializes in creating thoughtful, in-depth questions that test candidates' domain knowledge and problem-solving abilities." },
          { role: "user", content: prompt }
        ],
        model: "llama3-70b-8192",
      });
    
      const parsedResponse = (response.choices[0].message.content);
      return parsedResponse;
    }
export default generateResumePdf;
