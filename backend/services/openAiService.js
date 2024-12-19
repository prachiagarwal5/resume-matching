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
      
     
      only provide the jason object with the following structure with no expaltion or any other thing.:

      1. **Job Title Match**: Return **Matched** or **Not Matched** depending on whether the JD "${jobDescription}" iS MACHING WITH THE "${resumeText}" for example if jd is for web and the resume focus on web then macthed outherwise unmachned.

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

      3. **Suggested Skills**: List technical and soft skills the candidate could add to better match the JD. Suggestions should be **specific** and avoid general recommendations. Focus on skills that are **directly related** to the JD.

      4. **Matched Projects And Internships**: Identify **relevant projects and internships** from the resume that align with the JD. Provide a detailed explanation for why they match, focusing on the specific context in which the skills and technologies were used. Exclude projects that do not **strictly align** with the JD.

      5. **Rephrased Projects And Internships**: Provide **multiple concise rephrased points** for relevant projects or internships that better align with the JD. Each point should focus on critical, JD-relevant skills, achievements, and outcomes, while keeping descriptions **concise (20 words or less)**.
          Example:
          {
              "Original Project": "AI Intern",
              "Rephrased Project": [
                  "Developed an AI-powered interview system using ChatGPT API.",
                  "Integrated Text-to-Speech (TTS) and Whisper for voice processing.",
                  "Collaborated on optimizing interview AI models for scalability."
              ]
          }

      6. **Resume Improvement Suggestions**: Offer specific suggestions to improve the resume's structure, clarity, and alignment with the JD. These suggestions should target content relevance, use of JD-specific keywords, and the overall readability of the resume.

      7. **Grammatical Check**: Review the resume for grammatical accuracy and professionalism. Identify areas where language can be improved to ensure clarity and correctness.

      8. **Project Title Description Check**: Ensure that the project titles and their descriptions match. For example, if the project is titled "E-commerce Web App," the description should clearly reflect the work done for that system. Penalize vague or mismatched descriptions.

      9. **Recruiter Tips**: Dynamically generate **personalized tips** based on the resume's strengths and weaknesses. Focus on how the candidate can improve clarity, word usage, and alignment with recruiter expectations. Adapt the tips to:
          - Use of **Action Verbs**: Suggest action-oriented words based on the role the candidate is applying for, such as "Led," "Developed," or "Engineered" to replace weaker phrases like "responsible for" or "assisted with."
          - **Keyword Usage**: Highlight important JD-relevant keywords the candidate can use more effectively or where they are missing.
          - **Tailored Word Count**: Suggest concise project descriptions, limiting word count based on the context of the role. This limit can vary depending on the complexity of the project or internship, dynamically adjusting for brevity.
          - **Skills Relevance**: Provide specific suggestions on how to better highlight key technical or soft skills in relevant sections (e.g., "Add details on leadership or team collaboration in the 'Project X' description").
          - **Presentation Style**: Recommend formatting or structural improvements for better readability and recruiter engagement.
          - **Personalized Words to Avoid**: Generate a list of words or phrases the candidate should avoid based on their resume (e.g., “handled,” “involved in”), and provide alternatives.
          Example:
          {
              "Suggestions": [
                  "Use action verbs like 'Developed,' 'Led,' or 'Managed' instead of 'responsible for.'",
                  "Highlight specific outcomes in Project X to show quantifiable results.",
                  "Avoid vague terms like 'worked on' and replace with more active descriptions."
              ],
             "Word Count": "Your recommendation for project description length goes here, based on the resume's content.",
        "Words To Avoid": {
            "Original Word": "Suggested Alternative"
        }
          }

      10. **Score**:
          - **JScore**: A **strict score** between 0 and 100, evaluating the alignment between the resume and the JD, based on context-appropriate skills, project alignment, and grammatical accuracy.
          - **GScore**: A general score between 0 and 100 evaluating the overall quality and professionalism of the resume, regardless of JD alignment.
      
          ### IMPORTANT The response should be in JSON format and must follow this structure. **Do not add any additional information**, and ensure the keys are exactly as shown below. Ensure there are no symbols like tilde  so that I can parse it as JSON:
      {
          "Job Title Match": "Matched/Not Matched",
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
          "Suggested Skills": ["skill1", "skill2"],
          "Matched Projects And Internships": [
              {
                  "Project": "Project Title 1",
                  "Description": "Explain why this project contextually aligns with the JD."
              },
              {
                  "Internship": "Internship Title 1",
                  "Description": "Explain why this internship contextually aligns with the JD."
              }
          ],
          "Rephrased Projects And Internships": [
              {
                  "Original Project": "Original project description",
                  "Rephrased Project": ["Rephrased point 1", "Rephrased point 2", "Rephrased point 3"]
              }
          ],
          "Resume Improvement Suggestions": ["Suggestion 1", "Suggestion 2"],           
          "Grammatical Check": "Provide a detailed review of grammatical accuracy and professionalism. Identify specific areas for improvement, offering relevant corrections aligned with the JD. Each correction should include an example of the original sentence and a rephrased version, focusing on clarity and precision. Return multiple examples, each on a new line. Example:\n- Original: 'Responsible for managing team projects.'\n- Suggested: 'Led and managed cross-functional team projects in line with JD requirements.'\n\n- Original: 'Worked on API development.'\n- Suggested: 'Developed RESTful APIs using Java for scalable microservices.'"
          "Project Title Description Check": [
              {
                  "Project": "Project Title 1",
                  "Status": "Matched/Not Matched",
                  "Explanation": "Explanation of consistency between title and description"
              }
          ],
          "Recruiter Tips": {
              "Suggestions": ["Dynamic tip 1", "Dynamic tip 2", "Dynamic tip 3",....],
              "Word Count": "Dynamically adjust word count based on project complexity.",
              "wordsToAvoid": {
                  "Original Word": "Suggested Alternative",
                  "Original Word": "Suggested Alternative",...and so on
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
            console.log("-----------------trimmed_data_receive-----------------")
            console.log("Trimmed Content: ", trimmedContent);
            console.log("-----------------trimmed_data_send-----------------")
            const result = JSON.parse(trimmedContent); // Parse the trimmed JSON content
            console.log("Result: ", result);
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
    const startMarker = '"Job Title Match"';
    const endMarker = '"GScore"';
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker) + endMarker.length + 5; // Adjust to capture full content

    if (startIndex !== -1 && endIndex !== -1) {
        const trimmedContent = content.substring(startIndex, endIndex);
        console.log("---------------trim--------------------")
        console.log(trimmedContent)
        console.log("----------------trim-------------------")
        return `{${trimmedContent}}`; // Wrap it in curly braces to make it a valid JSON object
    }

    // If markers are not found, return an empty object
    return '{}';
};

module.exports = {
    analyzeResume,
};

