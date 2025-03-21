require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY2 });

// Helper function to extract valid JSON from response
const extractValidJson = (data) => {
  try {
    // Regular expression to capture valid JSON structure from the response
    const jsonMatch = data.match(/{.*}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]); // Parse only the JSON part
    }
    throw new Error("No valid JSON found in the response");
  } catch (error) {
    console.error("Error extracting JSON:", error);
    throw error; // Rethrow to handle it in the main function
  }
};

// Helper function to trim and validate the JSON structure
const trimResumeData = (data) => {
  try {
    const parsedData = extractValidJson(data);

    // Allowed keys in the JSON structure, now including 'projects' and 'certifications'
    const validKeys = [
      "contactInformation",
      "objective",
      "education",
      "skills",
      "workExperience",
      "achievements",
      "projects",
    ];

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
    const candidateDataString = JSON.stringify(candidateData, null, 2);
    const prompt = `
    I will provide you with raw JSON data of a candidate's information.
    Your task is to generate a highly optimized, ATS-friendly resume in JSON format that would achieve an ATS score above 95%.
  
    This is the Candidate data: "${candidateDataString}"
  
  ### ATS Algorithm Analysis:
    1. Prioritize exact-match keywords from job descriptions in the candidate's industry
    2. Maintain optimal keyword density (7-10% for primary skills, 3-5% for secondary skills)
    3. Use industry-standard section headings (Summary, Experience, Skills, Education)
    4. Incorporate both hard skills and soft skills with proper context
    5. Ensure proper semantic keyword relationships (related terms appearing near each other)
    6. Use active voice with powerful action verbs throughout
    
  ### Technical Optimization Rules:
    1. Eliminate all complex formatting that could confuse ATS parsing
    2. Use proper keyword hierarchy (most important skills should appear first and most frequently)
    3. Include both spelled-out terms AND acronyms (e.g., "Machine Learning (ML)")
    4. Use varied but semantically related terminology (synonyms and related concepts)
    5. Frontload bullets with metrics and achievements, not responsibilities
    6. Match job title nomenclature to industry standards precisely
    
  ### Content Enhancement Strategy:
    1. Transform generic experience into specific, quantifiable achievements (use metrics like %, $, time savings)
    2. Use the PAR/STAR method for all experience bullets: Problem-Action-Result format
    3. Include at least 2-3 specific, measurable achievements for each role
    4. Add industry-specific tools, methodologies, and certifications even if only partially mentioned in data
    5. Incorporate relevant trending skills for the candidate's industry and role
    6. Include both technical competencies and transferable skills with proper weighting
    
  ### Section-Specific Optimization:
    
    #### Professional Summary:
    - Create a powerful 3-4 sentence summary focusing on years of experience, core technical stack, specialist areas, and unique value proposition
    - Include at least 5-7 critical industry keywords within natural language flow
    - Focus on outcomes and value delivered, not just skills possessed
    
    #### Work Experience:
    - Transform responsibilities into achievement statements with metrics (increased X by Y%, decreased costs by $Z)
    - Begin each bullet with strong, varied action verbs (e.g., "Engineered," "Spearheaded," "Architected")
    - Include project scope, team size, budget, and business impact where applicable
    - Highlight leadership, cross-functional collaboration, and technical innovation
    
    #### Skills:
    - Segment technical skills into clear categories (Languages, Frameworks, Tools, Methodologies)
    - Prioritize skills based on frequency in job descriptions for target roles
    - Include both foundational skills and cutting-edge technologies
    - Add proficiency levels only for highly advanced skills
    
    #### Projects:
    - Structure as mini case studies: challenge, approach, technology stack, and results
    - Highlight problem-solving methodology and technical decision-making
    - Include collaborative aspects and individual contributions
    - Emphasize business outcomes alongside technical implementation
    
    #### Education & Certifications:
    - List relevant coursework that aligns with target roles
    - Include academic projects with industry relevance
    - Format degrees using full, standard terminology
    - Add certification dates and versions where applicable
    
  ### Response Format:
     - And stick to the given jason format dont change the format and no other information should be added in the response
     - Format note: Provide ONLY the JSON object with no additional text
     - No introduction text like "Here's a question..." or "Based on..."
     - The response should start directly with "{" and end with "}"
    Return a JSON object strictly following this structure, ensuring 98%+ ATS optimization:
    {
      "contactInformation": {
        "name": "Full Name",
        "email": "professional.email@domain.com",
        "phone": "Contact Number",
        "linkedin": "LinkedIn URL",
        "github": "GitHub URL",
        "location": "City, State"
      },
      "objective": "ATS-optimized professional summary",
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
          "Industry-Standard Skill 1",
          "Framework/Technology 2"
        ],
        "softSkills": [
          "Leadership",
          "Problem Solving",
          "Communication"
        ]
      },
      "certifications": [
        {
          "name": "Industry-Recognized Certification"
        }
      ],
      "achievements": [
        "Quantified achievement with metrics",
        "Recognition or award with context"
      ]
    }
    Ensure EVERY section is meticulously optimized for maximum ATS compatibility using semantic keyword matching, industry terminology, and quantifiable achievements. The resume should read naturally while containing optimal keyword density.
    
    Return ONLY the JSON object without any additional text or formatting.
  
    Ensure each section is optimized for maximum ATS compatibility and keyword matching.`;

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

    // console.log("Trimmed and Valid Resume:", trimmedResume);

    return trimmedResume;
  } catch (error) {
    console.error("Error generating resume JSON:", error);
    throw new Error("Groq API error");
  }
};

module.exports = { generateResume };
