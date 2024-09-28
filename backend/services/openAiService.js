require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `I will provide you with two inputs:
        Resume Text: A candidate's resume in text format.
        Job Description (JD): A job listing or description that the candidate is applying to.

        Your task is to evaluate the resume in relation to the JD and return a detailed, constructive report covering the following areas.

        Be sure to match skills not just by keyword, but by context. IMPORTANT: For example, if the JD mentions "Python" for Data Structures and Algorithms (DSA),
        match it only if Python was used for DSA in the resume, not for machine learning or other unrelated contexts.

        IMPORTANT: Focus on contextual alignment between the resume and JD, ensuring skills are matched based on the context in which they are mentioned and demonstrated. 
        Be sure to consider how well the projects and internships showcase the candidate’s ability to meet the JD’s requirements, and be strict in evaluating how well the resume demonstrates suitability for the specific role mentioned in the JD.

        Here is the Resume Text: "${resumeText}"
        Here is the Job Description: "${jobDescription}"

        Please evaluate and return ONLY a JSON object with the following fields. IMPORTANT: Do not provide any other explanations or responses, only return the JSON object strictly in this format:

        1. matchedSkills: A list of skills from the resume that match the JD based on context. If the JD mentions a skill in a specific context (e.g., Python for DSA),
        ensure the skill is only matched if it appears in that context in the resume. Provide contextual explanations for each match.

        2. suggestedSkills: A list of additional skills that the candidate could add to their resume to make it more aligned with the JD. Suggest both technical and soft skills if relevant, and ensure that these suggestions include keywords that are critical in both the JD and resume.

        3. matchedProjectsAndInternships: Identify specific projects and internships from the resume that align most closely with the JD. Explain why they match based on the context in which skills or technologies were used. For example, if a project involved Python for DSA and the JD requests Python for DSA, explain this alignment.

        4. rephrasedProjectsAndInternships: Provide examples of how to rephrase certain project or internship descriptions in the resume to better align with the JD. Ensure that rephrased versions emphasize relevant skills, technologies, and outcomes in the appropriate context, making them more impactful.

        5. resumeImprovementSuggestions: Offer suggestions for how the candidate can enhance their resume to make it more professional and tailored to the JD. This should include advice on structure, formatting, and content. Focus on improving clarity, readability, and how effectively skills are presented in relation to the JD's requirements. Additionally, include key JD-related keywords and phrases that the candidate should incorporate in their resume.

        6. vocabularyLevel: Assess the level of vocabulary used in the resume. Consider whether the language is professional, precise, and appropriate for the role. Provide feedback on how well the vocabulary matches the expectations of the JD, including recommendations for improving or refining it. 

        7. score: Provide a score between 0 and 100 that evaluates how well the resume aligns with the JD. Consider the following factors in scoring:
           - How closely the matched skills align with the context in the JD.
           - The quality and relevance of matched projects and internships.
           - Overall presentation, clarity, and impact of the resume.
           - **Role specificity**: Check whether the resume explicitly demonstrates experience or skills relevant to the specific role mentioned in the JD. Be strict in matching the role and required skills outlined in the JD.
           - **Keyword inclusion**: Ensure that important keywords from the JD are either present in the resume or are included in the suggested improvements. The score should reflect how well the resume captures these critical terms.
           - The extent to which the resume meets the specific requirements and expectations outlined in the JD.
           - **Vocabulary level**: Evaluate the professionalism of the language and terminology used in the resume.
           - The score should reflect the overall match between the resume and JD, considering both technical skills, soft skills, and alignment with the job role.

        IMPORTANT: The JSON object should follow this structure and be strictly formatted as follows:
        {
            "Matched Skills": ["skill1", "skill2", "skill3",etc.],
            "Suggested Skills": ["suggestedSkill1", "suggestedSkill2", "suggestedSkill3",etc.],
            "Matched Projects And Internships": [
                {
                    "project": "Project Title 1",
                    "description": "Explain how this project aligns contextually with the JD and what was achieved"
                },
                {
                "project": "Project Title 2",
                "description": "Explain how this project aligns contextually with the JD and what was achieved"} ,
                {
                    "internship": "Internship Title 1",
                    "description": "Explain how this internship aligns contextually with the JD"
                },
                {
                    "internship": "Internship Title 2",
                    "description": "Explain how this internship aligns contextually with the JD"
                }
            ],
            "Ephrased Projects And Internships": [
                {
                    "originalProject": "Original project description1",
                    "rephrasedProject": "Rephrased project description aligning more professionally and contextually with the JD"
                },
                {
                    "originalProject": "Original project description2",
                    "rephrasedProject": "Rephrased project description to highlight key skills and outcomes relevant to the JD"}
                {
                    "originalInternship": "Original internship description1",
                    "rephrasedInternship": "Rephrased internship description to align with the JD and highlight key outcomes"
                },
                {
                    "originalInternship": "Original internship description2",
                    "rephrasedInternship": "Rephrased internship description to emphasize relevant skills and achievements"
                }
            ],
            "Resume Improvement Suggestions": [
                "Suggestion 1 for improving the overall professionalism and structure of the resume, with key keywords from the JD",
                "Suggestion 2 for highlighting skills and achievements more clearly, while ensuring important JD-related terms are included",
                "Suggestion 3 for enhancing readability and impact, incorporating relevant JD terms",etc.
            ],
            "Vocabulary Level": "Evaluation of how professional and appropriate the vocabulary is for the role, including suggestions for improvement if needed",
            "Score": "A number between 0 and 100 that reflects the overall match between the resume and JD, considering role specificity, keyword alignment, and vocabulary level"
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
            // hi
            console.log("Matched Skills:", choices[0].message.content);
            const result = JSON.parse(choices[0].message.content);
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

module.exports = { analyzeResume };
