require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to analyze resume against job description
const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `I will provide you with two inputs:
        - Resume Text: A candidate's resume in text format.
        - Job Description (JD): A job listing or description that the candidate is applying to.
      
      Your task is to **evaluate strictly** the resume based on the JD and return a detailed, precise report. The evaluation must adhere to **strict guidelines**, penalizing vague or irrelevant details that do not directly align with the JD.
      
      IMPORTANT:
      - Match skills contextually, not just by keyword. Only mark a skill as present if it **exactly matches the context** required by the JD. For example, if the JD mentions "Python for Data Structures and Algorithms (DSA)," it should only be marked as present if Python is used explicitly for DSA in the resume.
      - Be **extremely strict** in evaluating how well the resume demonstrates qualifications for the **specific role** outlined in the JD.
      - Gaps, vagueness, or irrelevant content should significantly lower the JD-aligned score.
      - Also provide a **general resume quality** score independent of the JD, focusing on grammar, professionalism, and overall clarity.
      
      Below is the Resume Text: "${resumeText}"
      
      Below is the Job Description: "${jobDescription}"
      
      Please return ONLY a JSON object with the following structure:
      
      1. **JobTitle Match**: Return **true** or **false** depending on whether the job title in the resume **exactly matches** the job title in the JD.
      
      2. **Skills**:
          - **Technical Skills**: Return a dictionary where each technical skill from the JD is listed as true or false based on **contextual relevance** in the resume.
          - **Soft Skills**: Return a dictionary where each soft skill from the JD is marked as true or false based on its appearance in the resume in the relevant context.
          
          Example:
          {
              "TechnicalSkills": {
                  "Python (DSA)": true,
                  "Java (API Development)": false
              },
              "SoftSkills": {
                  "Communication Skills": true,
                  "Teamwork": false
              }
          }
          
          Every skill mentioned in the JD must be evaluated. Missing skills or incorrect context should be marked as "false."
      
      3. **Suggested Skills**: List technical and soft skills the candidate could add to better match the JD. Suggestions should be **specific** and avoid general recommendations. Focus on skills that are **directly related** to the JD.
      
      4. **Matched Projects And Internships**: Identify **relevant projects and internships** from the resume that align with the JD. Provide a detailed explanation for why they match, focusing on the specific context in which the skills and technologies were used. Exclude projects that do not **strictly align** with the JD.
      
      5. **Rephrased Projects And Internships**: Provide **multiple concise rephrased points** for relevant projects or internships that better align with the JD. Each point should focus on critical, JD-relevant skills, achievements, and outcomes, while keeping descriptions **concise (20 words or less)**.
      
          Example:
          {
              "OriginalProject": "AI Intern",
              "RephrasedProject": [
                  "Developed an AI-powered interview system using ChatGPT API.",
                  "Integrated Text-to-Speech (TTS) and Whisper for voice processing.",
                  "Collaborated on optimizing interview AI models for scalability."
              ]
          },
          {
              "OriginalProject": "Data Science Intern",
              "RephrasedProject": [
                  "Built hate speech detection models using Python and NLP techniques.",
                  "Enhanced accuracy through data pre-processing and feature engineering."
              ]
          }
      
          **IMPORTANT**: Each project should return **multiple concise points** highlighting distinct achievements relevant to the JD.
      
      6. **Resume Improvement Suggestions**: Offer specific suggestions to improve the resume's structure, clarity, and alignment with the JD. These suggestions should target content relevance, use of JD-specific keywords, and the overall readability of the resume.
      
      7. **Grammatical Check**: Review the resume for grammatical accuracy and professionalism. Identify areas where language can be improved to ensure clarity and correctness.
      
      8. **Project Title Description Check**: Ensure that the project titles and their descriptions match. For example, if the project is titled "E-commerce Web App," the description should clearly reflect the work done for that system. Penalize vague or mismatched descriptions.
      
      9. **Recruiter Tips**: Provide highly specific suggestions from a recruiter’s perspective, focusing on improving clarity, word count limits, and keyword usage.
          - **Suggestions**: Advice on enhancing appeal to recruiters (e.g., using action verbs, quantifying results, etc.).
          - **Word Count**: Recommend concise descriptions (limit project descriptions to 20 words).
          - **WordsToAvoid**: Suggest words to avoid (e.g., vague terms like "responsible for," "assisted with") and offer action-oriented alternatives (e.g., "Led," "Managed," "Developed").
          
          Example:
          {
              "WordsToAvoid": {
                  "responsible for": "Led",
                  "helped": "Assisted with"
              }
          }
      
      10. **Score**:
          - **JScore**: A **strict score** between 0 and 100, evaluating the alignment between the resume and the JD, based on context-appropriate skills, project alignment, and grammatical accuracy.
          - **GScore**: A general score between 0 and 100 evaluating the overall quality and professionalism of the resume, regardless of JD alignment.
      
      Return a JSON object with the following structure:
      {
          "JobTitleMatch": true/false,
          "Skills": {
              "TechnicalSkills": {
                  "skill1": true/false,
                  "skill2": true/false
              },
              "SoftSkills": {
                  "skill1": true/false,
                  "skill2": true/false
              }
          },
          "SuggestedSkills": ["skill1", "skill2"],
          "MatchedProjectsAndInternships": [
              {
                  "Project": "Project Title 1",
                  "Description": "Explain why this project contextually aligns with the JD."
              },
              {
                  "Internship": "Internship Title 1",
                  "Description": "Explain why this internship contextually aligns with the JD."
              }
          ],
          "RephrasedProjectsAndInternships": [
              {
                  "OriginalProject": "Original project description",
                  "RephrasedProject": ["Rephrased point 1", "Rephrased point 2"]
              }
          ],
          "ResumeImprovementSuggestions": ["Suggestion 1", "Suggestion 2"],
          "GrammaticalCheck": "Details on grammatical correctness",
          "ProjectTitleDescriptionCheck": [
              {
                  "Project": "Project Title 1",
                  "Status": "Matched/Not Matched",
                  "Explanation": "Explanation of consistency between title and description"
              }
          ],
          "RecruiterTips": {
              "Suggestions": ["Tip 1", "Tip 2"],
              "WordCount": "Limit project descriptions to 20 words or less.",
              "WordsToAvoid": {
                  "responsible for": "Led",
                  "helped": "Assisted with"
              }
          },
          "JScore": number between 0 and 100,
          "GScore": number between 0 and 100
      }`; 
      




        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-70b-8192", // Adjust the model if needed
            // max_tokens: 1000, // Set token limit to 1000
        });

        // Log response to check the data structure
        //console.log(response);
        const { choices } = response;
        if (choices && choices[0]?.message?.content) {
            const rawContent = choices[0].message.content;
            console.log("Raw Content: ", rawContent);
            // Now we'll trim the content to extract only the relevant parts between "Matched Skills" and "Score"
            const trimmedContent = extractRelevantJSON(rawContent);
            const result = JSON.parse(trimmedContent); // Parse the trimmed JSON content
            return result;
        } else {
            console.log("No matches found.");
            return {
                matches: "No matches found.",
            };
        }
    } catch (error) {
        console.error('Error calling Groq API:', error);
        throw new Error('Groq API error');
    }
};

// Helper function to extract JSON data from "Matched Skills" to "Score"
const extractRelevantJSON = (content) => {
    const startMarker = '"Skills"';
    const endMarker = '"GScore"';
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker) + endMarker.length + 5; // Adjust to capture full content

    if (startIndex !== -1 && endIndex !== -1) {
        const trimmedContent = content.substring(startIndex, endIndex);
        return `{${trimmedContent}}`; // Wrap it in curly braces to make it a valid JSON object
    }

    // If markers are not found, return an empty object
    return '{}';
};

module.exports = {
    analyzeResume,
};
