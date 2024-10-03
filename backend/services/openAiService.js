require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to analyze resume against job description
const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `I will provide you with two inputs:
    Resume Text: A candidate's resume in text format. 
    Job Description (JD): A job listing or description that the candidate is applying to.

Your task is to evaluate the resume in relation to the JD and return a detailed, constructive report covering the following areas.

Be sure to match skills not just by keyword, but by context.

IMPORTANT: For example, if the JD mentions "Python" for Data Structures and Algorithms (DSA), match it only if Python was used for DSA in the resume, not for machine learning or other unrelated contexts.

IMPORTANT: Focus on contextual alignment between the resume and JD, ensuring skills are matched based on the context in which they are mentioned and demonstrated.

Be strict in evaluating how well the resume demonstrates suitability for the specific role mentioned in the JD.

IMPORTANT: Check if the project title and its description are aligned. For example, if the project is titled "Movie Recommendation System," the description must clearly discuss a movie recommendation system. Flag any mismatches.

Here is the Resume Text: "${resumeText}"
Here is the Job Description: "${jobDescription}"

Please evaluate and return ONLY a JSON object with the following fields.

IMPORTANT: Do not provide any other explanations or responses, only return the JSON object strictly in this format:

1. **matchedSkills**: A list of skills from the resume that match the JD based on context. If the JD mentions a skill in a specific context (e.g., Python for DSA), ensure the skill is only matched if it appears in that context in the resume. Provide contextual explanations for each match.

2. **suggestedSkills**: A list of additional skills that the candidate could add to their resume to make it more aligned with the JD. Suggest both technical and soft skills if relevant, and ensure that these suggestions include keywords that are critical in both the JD and resume.

3. **matchedProjectsAndInternships**: Identify multiple specific projects and internships from the resume that align most closely with the JD. Explain why they match based on the context in which skills or technologies were used. For example, if a project involved Python for DSA and the JD requests Python for DSA, explain this alignment, etc.

4. **rephrasedProjectsAndInternships**: Provide examples of how to rephrase certain project or internship descriptions in the resume to better align with the JD. Ensure that rephrased versions emphasize relevant skills, technologies, and outcomes in the appropriate context, making them more impactful. Each rephrased project or internship must have a word limit of 20 words.

5. **resumeImprovementSuggestions**: Offer multiple suggestions for how the candidate can enhance their resume to make it more professional and tailored to the JD. This should include advice on structure, formatting, and content. Focus on improving clarity, readability, and how effectively skills are presented in relation to the JD's requirements. Additionally, include key JD-related keywords and phrases that the candidate should incorporate in their resume, etc.

6. **grammaticalCheck**: Assess the grammatical correctness of the resume. Identify any language issues or improvements, focusing on ensuring the grammar is professional, precise, and appropriate for the role.

7. **projectTitleDescriptionCheck**: Verify that the project titles and their descriptions match contextually. If a project title, such as "Movie Recommendation System," is given, the description should be aligned with the concept of a movie recommendation system. Flag any inconsistencies and provide a brief explanation, and evaluate multiple projects/internships for alignment.

8. **score**: Provide a score between 0 and 100 that evaluates how well the resume aligns with the JD. Consider the following factors in scoring:
    - How closely the matched skills align with the context in the JD.
    - The quality and relevance of matched projects and internships.
    - Overall presentation, clarity, and impact of the resume.
    - **Role specificity**: Check whether the resume explicitly demonstrates experience or skills relevant to the specific role mentioned in the JD.
    - **Keyword inclusion**: Ensure that important keywords from the JD are either present in the resume or are included in the suggested improvements. The score should reflect how well the resume captures these critical terms.
    - The extent to which the resume meets the specific requirements and expectations outlined in the JD.
    - **Grammatical level**: Evaluate the grammatical professionalism of the language and terminology used in the resume.

The JSON object should follow this structure and be strictly formatted as follows:

{
    "Matched Skills": ["skill1", "skill2", "skill3", etc.],
    "Suggested Skills": ["suggestedSkill1", "suggestedSkill2", "suggestedSkill3", etc.],
    "Matched Projects And Internships": [
        {
            "project": "Project Title 1",
            "description": "Explain how this project aligns contextually with the JD and what was achieved"
        },
        {
            "project": "Project Title 2",
            "description": "Explain how this project aligns contextually with the JD and what was achieved"
        },
        {
            "internship": "Internship Title 1",
            "description": "Explain how this internship aligns contextually with the JD"
        },
        {
            "internship": "Internship Title 2",
            "description": "Explain how this internship aligns contextually with the JD"
        }
    ],
    "Rephrased Projects And Internships": [
        {
            "originalProject": "Original project description1",
            "rephrasedProject": "Rephrased project description aligning more professionally and contextually with the JD"
        },
        {
            "originalProject": "Original project description2",
            "rephrasedProject": "Rephrased project description to highlight key skills and outcomes relevant to the JD"
        },
        {
            "originalInternship": "Original internship description1",
            "rephrasedInternship": "Rephrased internship description to align with the JD and highlight key outcomes"
        },
        {
            "originalInternship": "Original internship description2",
            "rephrasedInternship": "Rephrased internship description to emphasize relevant skills and achievements"
        }
    ],
    "Project Title Description Check": [
        {
            "project": "Project Title 1",
            "status": "Matched/Not Matched",
            "explanation": "Explain if the project description is consistent with the title"
        },
        {
            "project": "Project Title 2",
            "status": "Matched/Not Matched",
            "explanation": "Explain if the project description is consistent with the title"
        }
    ],
    "Resume Improvement Suggestions": [
        "Suggestion 1 for improving the overall professionalism and structure of the resume, with key keywords from the JD",
        "Suggestion 2 for highlighting skills and achievements more clearly, while ensuring important JD-related terms are included",
        "Suggestion 3 for enhancing readability and impact, incorporating relevant JD terms"
    ],
    "Grammatical Check": "Evaluation of how grammatically correct and professional the resume is for the role, including suggestions for improvement if needed",
    "Score": "A number between 0 and 100 that reflects the overall match between the resume and JD, considering role specificity, keyword alignment, and grammatical level"
}`;


        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-70b-8192", // Adjust the model if needed
            max_tokens: 1000, // Set token limit to 1000
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
    const startMarker = '"Matched Skills"';
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
