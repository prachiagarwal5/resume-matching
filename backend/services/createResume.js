require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Helper function to extract valid JSON from response
const extractValidJson = (data) => {
    try {
        // Regular expression to capture valid JSON structure from the response
        const jsonMatch = data.match(/{.*}/s);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]); // Parse only the JSON part
        }
        throw new Error('No valid JSON found in the response');
    } catch (error) {
        console.error("Error extracting JSON:", error);
        throw error;  // Rethrow to handle it in the main function
    }
};

// Helper function to trim and validate the JSON structure
const trimResumeData = (data) => {
    try {
        const parsedData = extractValidJson(data);

        // Allowed keys in the JSON structure
        const validKeys = ['contactInformation', 'objective', 'education', 'skills', 'workExperience', 'achievements'];

        // Filter out any unnecessary fields
        const trimmedData = {};
        validKeys.forEach((key) => {
            if (parsedData[key]) {
                trimmedData[key] = parsedData[key];
            } else {
                trimmedData[key] = "Empty"; // Handle empty fields
            }
        });

        return trimmedData;
    } catch (error) {
        console.error("Error parsing or trimming resume data:", error);
        return {};
    }
};

// Function to generate resume from raw JSON data
const generateResume = async (candidateData) => {
    try {
        const candidateDataString = JSON.stringify(candidateData);
        const prompt = `
          I will provide you with raw JSON data of a candidate's information.
          Your task is to generate a highly optimized, ATS-friendly resume in JSON format based on this raw data.
          Ensure the final JSON structure is crisp, includes the right keywords, and adheres to ATS standards, allowing the resume to pass any ATS screening.

          This is the Candidate data: "${candidateDataString}"

          ### Instructions:
          1. Include only the following sections: **contactInformation, objective, education, skills, workExperience, achievements**.
          2. Use bullet points for **achievements** and **work experience** responsibilities to enhance clarity and ATS parsing.
          3. Fill out empty fields with the label "Empty".
          4. For date ranges, use a consistent format (e.g., "MM/YYYY - MM/YYYY").
          5. Ensure that the summary and work experience sections are tailored to ATS, using key action verbs and industry-relevant terms.
          6. Keep the descriptions short and keyword-focused, highlighting relevant technologies, skills, and experiences.
          7. Eliminate irrelevant details; focus only on the most important aspects for the ATS system.

          ### Desired JSON Structure for the Output:
          {
             "contactInformation": {
               "name": "Full Name" || "Empty",
               "email": "Email Address" || "Empty",
               "phone": "Phone Number" || "Empty",
               "linkedin": "LinkedIn URL" || "Empty",
               "github": "GitHub URL" || "Empty",
               "location": "Current Location" || "Empty"
             },
             "objective": "A concise, ATS-optimized summary of key skills, career objectives, and industry expertise (2-3 sentences)." || "Empty",
             "education": {
               "graduation": {
                 "degree": "Degree" || "Empty",
                 "institution": "University Name" || "Empty",
                 "location": "University Location" || "Empty",
                 "yearSpan": "MM/YYYY - MM/YYYY" || "Empty",
                 "CPI": "GPA/Grade" || "Empty"
               },
               "intermediate": {
                 "schoolName": "Intermediate School Name" || "Empty",
                 "percentage": "Percentage/Grade" || "Empty",
                 "stream": "Stream/Discipline" || "Empty",
                 "yearSpan": "MM/YYYY - MM/YYYY" || "Empty",
                 "location": "School Location" || "Empty"
               },
               "highSchool": {
                 "schoolName": "High School Name" || "Empty",
                 "percentage": "Percentage/Grade" || "Empty",
                 "yearSpan": "MM/YYYY - MM/YYYY" || "Empty",
                 "location": "School Location" || "Empty"
               }
             },
             "skills": {
               "technicalSkills": ["Java", "Python", "React.js"] || "Empty",
               "softSkills": ["Leadership", "Communication"] || "Empty"
             },
             "workExperience": [
               {
                 "jobTitle": "Designation" || "Empty",
                 "company": "Company Name" || "Empty",
                 "location": "Company Location" || "Empty",
                 "yearSpan": "MM/YYYY - MM/YYYY" || "Empty",
                 "responsibilities": [
                   "Developed and maintained web applications using React and Node.js.",
                   "Collaborated with cross-functional teams to deliver scalable software solutions."
                 ] || "Empty"
               }
             ],
             "achievements": [
               "Received Employee of the Year award for outstanding performance.",
               "Implemented a cloud-based solution that reduced operational costs by 15%."
             ] || "Empty"
          }`;

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-70b-8192",
            max_tokens: 3000,
        });

        console.log("Raw Response:", response.choices[0].message.content);

        // Trim and validate the JSON response
        const trimmedResume = trimResumeData(response.choices[0].message.content);

        console.log("Trimmed and Valid Resume:", trimmedResume);

        return trimmedResume;
    } catch (error) {
        console.error("Error generating resume JSON:", error);
        throw new Error('Groq API error');
    }
};

module.exports = { generateResume };
