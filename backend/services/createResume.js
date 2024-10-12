require('dotenv').config();
const Groq = require('groq-sdk');

// Initialize the Groq API client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to generate resume from raw JSON data
const generateResume = async (candidateData) => {
  try {
    const candidateDataString = JSON.stringify(candidateData);
    const prompt = `
      I will provide you with raw JSON data of a candidate's information. 
      Your task is to generate a well-structured, ATS-compliant resume in JSON format that includes *only relevant sections*.
      Specifically, the output should contain only **contactInformation**, **objective**, **education**, **skills**, **workExperience**, and **achievements**.
      All other sections should be excluded from the output.

      This is the Candidate data: "${candidateDataString}"

      ### Instructions:
      1. Include only the relevant sections: contactInformation, objective, education, skills, workExperience, and achievements.
      2. For any empty fields, explicitly mention them with the label "Empty."
      3. Ensure the output is formatted for ATS compatibility, including appropriate keywords and proper formatting.
      4. Use consistent date formats and section titles to adhere to ATS standards.

      ### Desired JSON Structure for the Output:
      {
         "contactInformation": {
           "name": "Your Full Name" || "Empty",
           "email": "Your Email Address" || "Empty",
           "phone": "Your Phone Number" || "Empty",
           "linkedin": "Your LinkedIn Profile URL" || "Empty",
           "github": "Your GitHub Profile URL" || "Empty",
           "location": "Your Current Location" || "Empty"
         },
         "objective": "A concise, ATS-optimized summary of the candidate’s strengths and career goals (2-3 sentences)." || "Empty",
         "education": {
           "graduation": {
             "degree": "Your Degree" || "Empty",
             "institution": "Your University Name" || "Empty",
             "location": "University Location" || "Empty",
             "yearSpan": "Years Attended" || "Empty",
             "CPI": "Your GPA/Grade" || "Empty"
           },
           "intermediate": {
             "schoolName": "Your Intermediate School Name" || "Empty",
             "percentage": "Your Percentage/Grade" || "Empty",
             "stream": "Your Stream/Discipline" || "Empty",
             "yearSpan": "Years Attended" || "Empty",
             "location": "School Location" || "Empty"
           },
           "highSchool": {
             "schoolName": "Your High School Name" || "Empty",
             "percentage": "Your High School Percentage/Grade" || "Empty",
             "yearSpan": "Years Attended" || "Empty",
             "location": "School Location" || "Empty"
           }
         },
         "skills": {
           "technicalSkills": ["Skill1", "Skill2"] || "Empty",
           "softSkills": ["Skill1", "Skill2"] || "Empty"
         },
         "workExperience": [
           {
             "jobTitle": "Your Designation" || "Empty",
             "company": "Company Name" || "Empty",
             "location": "Company Location" || "Empty",
             "yearSpan": "Years Worked" || "Empty",
             "responsibilities": ["Responsibility1", "Responsibility2"] || "Empty"
           },
           "achievements"
         ]
      }
    `;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192", // Adjust the model if needed
    });

    // Log response to check the data structure
    const { choices } = response;
    if (choices && choices[0]?.message?.content) {
      const rawContent = choices[0].message.content;
      console.log("Raw Content: ", rawContent);

      // Trim extra data and only return from contactInformation to achievements
      const trimmedContent = extractRelevantSections(rawContent);
      console.log("----------------------");
      console.log("Trimmed Content: ", trimmedContent);
      console.log("----------------------");

      // Validate and parse the JSON content
      const isValidJSON = validateJSON(trimmedContent);
      if (isValidJSON) {
        return JSON.parse(trimmedContent); // Return valid parsed JSON
      } else {
        console.log("Invalid JSON format detected.");
        return { message: "Invalid JSON format" };
      }
    } else {
      console.log("No valid resume found.");
      return { message: "No valid resume generated." };
    }
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw new Error('Groq API error');
  }
};

// Helper function to extract relevant sections (contactInformation to achievements)
const extractRelevantSections = (content) => {
  const startMarker = '"contactInformation"';
  const endMarker = '"achievements"';
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker) + endMarker.length;

  if (startIndex !== -1 && endIndex !== -1) {
    const trimmedContent = content.substring(startIndex, endIndex);

    // Ensure there are no dangling or extra characters outside the JSON structure
    const openingBraces = content.substring(0, startIndex).match(/{/g)?.length || 0;
    const closingBraces = content.substring(endIndex).match(/}/g)?.length || 0;

    // Close the JSON structure by adding the necessary closing braces
    const jsonContent = `{${trimmedContent}${'}'.repeat(openingBraces - closingBraces)}`;

    return jsonContent; // Return a valid JSON object as a string
  }

  return '{}'; // If no valid markers found, return empty JSON object
};

// Helper function to validate if a string is valid JSON
const validateJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    console.log('Valid JSON detected.');
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  generateResume,
};
