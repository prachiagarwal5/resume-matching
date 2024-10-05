require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to analyze resume against job description
const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `I will provide you with two inputs:
        Resume Text: A candidate's resume in text format. 
        Job Description (JD): A job listing or description that the candidate is applying to.
    
    Your task is to **strictly evaluate** the resume in relation to the JD and return a detailed, constructive report. The evaluation must be **very strict**, penalizing vague descriptions, irrelevant details, or anything not precisely aligned with the JD.
    
    IMPORTANT: 
    - Match skills not just by keyword, but by **precise context**. Only mark skills as present if they appear exactly in the context that the JD requires. For example, if the JD mentions "Python for Data Structures and Algorithms (DSA)," Python must have been used specifically for DSA in the resume, and not for machine learning or any unrelated context.
    - Be extremely strict in evaluating how well the resume demonstrates suitability for the **specific role** mentioned in the JD. 
    - Any gaps, vagueness, or irrelevant content should significantly reduce the overall score. 
    
    Here is the Resume Text: "${resumeText}"
    Here is the Job Description: "${jobDescription}"
    
    Please evaluate and return ONLY a JSON object with the following fields:
    
    1. **JobTitleMatch**: Return true or false based on whether the job title in the resume **exactly matches** the title mentioned in the JD.
    
    2. **Skills**: Separate this into two sections: 
        - **TechnicalSkills**: A dictionary/object where each technical skill from the JD is listed and marked as true or false based on whether it is present in the resume **with full contextual alignment**.
        - **SoftSkills**: A dictionary/object where each soft skill from the JD is listed and marked as true or false based on whether it is present in the resume and contextually aligned. 
    
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
    
        Ensure that **every skill in the JD** is listed and evaluated, even if they do not appear in the resume. Any missing skill or context mismatch should result in a "false."
    
    3. **suggestedSkills**: A list of additional technical and soft skills that the candidate could add to their resume to make it more aligned with the JD. Suggest only **specific skills** directly relevant to the JD, ensuring that the suggestions are not overly general.
    
    4. **matchedProjectsAndInternships**: Identify only the **most relevant** projects and internships from the resume that closely align with the JD. Provide strict explanations for why they match, focusing on the context in which the skills and technologies were used. Reject any projects or internships that do not demonstrate a **strong, context-specific alignment** with the JD.
    
    5. **rephrasedProjectsAndInternships**: Provide examples of how to rephrase certain project or internship descriptions in the resume to better align with the JD. Rephrased descriptions must be **concise (max 20 words)** and focus on emphasizing the most critical skills, technologies, and outcomes that are directly relevant to the JD. Any vague or irrelevant content should be removed.
    
    6. **resumeImprovementSuggestions**: Offer **highly specific** suggestions for improving the resume, focusing on professionalism, clarity, and **strict alignment** with the JD. Suggestions should target structure, content relevance, use of JD-specific keywords, and overall readability.
    
    7. **grammaticalCheck**: Assess the grammatical correctness of the resume, identifying any minor errors or language issues. Provide recommendations for ensuring the resume is grammatically perfect and uses professional language at all times.
    
    8. **projectTitleDescriptionCheck**: Verify that the project titles and their descriptions match **exactly**. If a project is titled "Movie Recommendation System," the description must clearly reflect the work done in that system. Flag and penalize any mismatches or vague descriptions.
    
    9. **recruiterTips**: Provide **very specific** tips for improving the resume from a recruiter’s perspective. This section should include:
        - **Suggestions**: Advice on how to improve the resume's appeal to recruiters (e.g., using specific keywords, quantifying achievements, etc.).
        - **WordCount**: Limit descriptions and sections to a concise format (e.g., projects should be limited to 20 words or less to ensure clarity).
        - **WordsToAvoid**: A list of words or phrases the candidate should avoid using (e.g., vague terms like "responsible for," overused words like "helped"). Also provide **suggested alternatives** for each word, focusing on impactful, action-oriented language. List **all words in the resume** for review.
    
    10. **score**: Provide a **very strict score** between 0 and 100. The score should be **hard to achieve** and should reflect:
        - The precision of skill alignment between the resume and the JD.
        - The quality and relevance of matched projects and internships.
        - Overall presentation, clarity, and impact of the resume.
        - **Role specificity**: Evaluate how well the resume demonstrates experience or skills relevant to the specific role.
        - **Keyword inclusion**: Ensure that important JD keywords are either present in the resume or mentioned in the improvement suggestions.
        - **Grammatical quality**: Penalize grammatical errors, unprofessional phrasing, or imprecise language.
    
    The JSON object should follow this structure and be strictly formatted as follows:
    
    {
        "JobTitleMatch": true/false,
        "Skills": {
            "TechnicalSkills": {
                "skill1": true/false,
                "skill2": true/false,
                ...
            },
            "SoftSkills": {
                "skill1": true/false,
                "skill2": true/false,
                ...
            }
        },
        "Suggested Skills": ["suggestedSkill1", "suggestedSkill2", "suggestedSkill3", etc.],
        "Matched Projects And Internships": [
            {
                "project": "Project Title 1",
                "description": "Strictly explain how this project aligns contextually with the JD and what was achieved"
            },
            {
                "internship": "Internship Title 1",
                "description": "Strictly explain how this internship aligns contextually with the JD"
            }
        ],
        "Rephrased Projects And Internships": [
            {
                "originalProject": "Original project description1",
                "rephrasedProject": "Strict rephrasing to align more professionally and contextually with the JD"
            },
            {
                "originalInternship": "Original internship description1",
                "rephrasedInternship": "Strict rephrasing to emphasize relevant skills and achievements"
            }
        ],
        "Project Title Description Check": [
            {
                "project": "Project Title 1",
                "status": "Matched/Not Matched",
                "explanation": "Strict explanation of whether the project description is consistent with the title"
            }
        ],
        "Resume Improvement Suggestions": [
            "Strict suggestion 1 for improving the structure and clarity, ensuring full alignment with the JD",
            "Strict suggestion 2 for highlighting critical skills and achievements, focusing only on JD-relevant details",
            "Strict suggestion 3 for enhancing readability and impact, incorporating essential JD keywords"
        ],
        "Grammatical Check": "Evaluation of grammatical correctness, professionalism, and clarity in the resume",
        "Recruiter Tips": {
            "Suggestions": ["Strict suggestions to improve appeal to recruiters"],
            "WordCount": "Strict word limits to ensure clarity (e.g., 20 words per project description)",
            "WordsToAvoid": {
                "wordsToAvoid": ["Avoid vague terms like 'responsible for,' 'assisted with,' etc."],
                "suggestedAlternatives": ["Led", "Managed", "Designed", "Developed"]
            }
        },
        "Score": "A very strict number between 0 and 100 reflecting overall alignment, precision, and professionalism"
    }`
    ;



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
        console.log(response);
        const { choices } = response;
        if (choices && choices[0]?.message?.content) {
            const rawContent = choices[0].message.content;

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
    const endMarker = '"Score"';
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
