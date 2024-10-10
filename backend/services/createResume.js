require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to generate resume from raw JSON data
const generateResume = async (candidateData) => {
try {const prompt = `I will provide you with raw JSON data of a candidate's information it  Your task is to generate a well-structured, ATS-compliant resume in JSON format that includes *all fields* provided in the input data, and for any empty field, explicitly mention that the field is empty. Ensure the output is formatted to pass ATS software checks effectively and is free of errors:

This is the Candidate data:"${candidateData}"

  
  ### Instructions:
  1. *Format*: Follow the exact structure provided, clearly labeling and formatting each section appropriately.
  2. *Keywords*: Optimize skills, achievements, and experiences for ATS keyword matching.
  3. *Skills Categorization: Clearly separate skills into *technical and soft skills.
  4. *Consistency*: Use consistent date formats and section titles to adhere to ATS standards.
  5. *Simplicity*: Avoid graphics or special characters; keep the content straightforward.
  6. *Completion*: Include all fields from the candidate's data in the output, and if any field is empty, specifically mention it with the label "Empty".
  7. *ATS Optimization*: Use commonly accepted keywords relevant to job roles to enhance the resume's ranking in ATS systems.
  
  ### Desired JSON Structure for the Output:
  
  const candidateResume = {
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
     "workExperience": [
       {
         "jobTitle": "Your Designation" || "Empty",
         "company": "Company Name" || "Empty",
         "description": [
           "• Description point 1 of the candidate's role and responsibilities." || "Empty",
           "• Point 2 elaborating on achievements and specific results obtained." || "Empty"
         ]
       }
     ],
     "projects": [
       {
         "projectTitle": "Project Title 1" || "Empty",
         "description": [
           "• Project objective and role." || "Empty",
           "• Technologies used." || "Empty",
           "• Key results achieved." || "Empty"
         ]
       },
       {
         "projectTitle": "Project Title 2" || "Empty",
         "description": [
           "• Project objective and role." || "Empty",
           "• Technologies used." || "Empty",
           "• Key results achieved." || "Empty"
         ]
       }
     ],
     "skills": {
       "technicalSkills": [
         "Technical Skill 1" || "Empty",
         "Technical Skill 2" || "Empty"
       ],
       "softSkills": [
         "Soft Skill 1" || "Empty",
         "Soft Skill 2" || "Empty",
         "Soft Skill 3" || "Empty"
       ]
     },
     "certifications": [
       {
         "name": "Certification 1" || "Empty",
         "date": "Date of Completion" || "Empty"
       },
       {
         "name": "Certification 2" || "Empty",
         "date": "Date of Completion" || "Empty"
       }
     ],
     "achievements": [
       "Achievement 1" || "Empty",
       "Achievement 2" || "Empty"
     ]
  }
  
  Return the JSON object strictly following this structure, ensuring that the output is ATS-friendly, error-free, and specifically mentions "Empty" for any field that lacks input. Use effective language and rephrase project descriptions and other fields to enhance clarity and professionalism.`;


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

console.log("Response:", response.choices[0].message.content);


console.log("************************************");
console.log("Candidate Data:", candidateData);
console.log("************************************");
console.log("Response:", response);
console.log("************************************");
console.log("Generated Resume Data:", response.data);
console.log("************************************");
console.log("Generated Resume Data:", response.choices[0].message.content);




// return response.data;
return response.choices[0].message.content;
} catch (error) {
    console.error("Error generating resume JSON:", error);
    throw new Error('Groq API error');
}
};


module.exports = { generateResume };