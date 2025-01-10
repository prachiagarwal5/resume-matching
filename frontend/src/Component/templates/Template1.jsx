import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { defaultResumeData } from "../../utils/defaultResumeData";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2B6CB0",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#EBF4FF",
    padding: 5,
    marginBottom: 8,
    marginTop: 12,
    color: "#2B6CB0",
  },
  objective: {
    marginBottom: 10,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 8,
  },
  institutionName: {
    fontWeight: "bold",
  },
  bulletPoint: {
    marginBottom: 3,
    paddingLeft: 15,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skill: {
    backgroundColor: "#F0F4F8",
    padding: "3 8",
    borderRadius: 3,
  },
});

const Template1 = ({ data = defaultResumeData }) => {
  console.log(data);
  // Ensure data exists and merge with default data
  const resumeData = {
    ...defaultResumeData,
    ...data,
    contactInformation: {
      ...defaultResumeData.contactInformation,
      ...(data?.contactInformation || {}),
    },
    education: {
      ...defaultResumeData.education,
      ...(data?.education || {}),
      graduation: {
        ...defaultResumeData.education.graduation,
        ...(data?.education?.graduation || {}),
      },
      intermediate: {
        ...defaultResumeData.education.intermediate,
        ...(data?.education?.intermediate || {}),
      },
      highSchool: {
        ...defaultResumeData.education.highSchool,
        ...(data?.education?.highSchool || {}),
      },
    },
    skills: {
      ...defaultResumeData.skills,
      ...(data?.skills || {}),
    },
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header/Contact Information */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {resumeData.contactInformation.name || "Full Name"}
          </Text>
          <View style={styles.contactInfo}>
            <Text>{resumeData.contactInformation.email || "Email"} | </Text>
            <Text>{resumeData.contactInformation.phone || "Phone"} | </Text>
            <Text>{resumeData.contactInformation.location || "Location"}</Text>
            {resumeData.contactInformation.linkedin && (
              <Text>| LinkedIn: {resumeData.contactInformation.linkedin}</Text>
            )}
            {resumeData.contactInformation.github && (
              <Text>| GitHub: {resumeData.contactInformation.github}</Text>
            )}
          </View>
        </View>

        {/* Objective */}
        {resumeData.objective && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.objective}>{resumeData.objective}</Text>
          </View>
        )}

        {/* Education */}
        <View>
          <Text style={styles.sectionTitle}>Education</Text>

          {/* Graduation */}
          <View style={styles.educationItem}>
            <Text style={styles.institutionName}>
              {resumeData.education.graduation.institution || "University Name"}
            </Text>
            <Text>
              {resumeData.education.graduation.degree || "Degree"} | CPI:{" "}
              {resumeData.education.graduation.CPI || "N/A"}
            </Text>
            <Text>
              {resumeData.education.graduation.location || "Location"} |
              {resumeData.education.graduation.yearSpan || "Year"}
            </Text>
          </View>

          {/* Intermediate */}
          <View style={styles.educationItem}>
            <Text style={styles.institutionName}>
              {resumeData.education.intermediate.schoolName || "School Name"}
            </Text>
            <Text>
              {resumeData.education.intermediate.stream || "Stream"} |
              Percentage:{" "}
              {resumeData.education.intermediate.percentage || "N/A"}
            </Text>
            <Text>
              {resumeData.education.intermediate.location || "Location"} |
              {resumeData.education.intermediate.yearSpan || "Year"}
            </Text>
          </View>

          {/* High School */}
          <View style={styles.educationItem}>
            <Text style={styles.institutionName}>
              {resumeData.education.highSchool.schoolName || "School Name"}
            </Text>
            <Text>
              Percentage: {resumeData.education.highSchool.percentage || "N/A"}{" "}
              |{resumeData.education.highSchool.yearSpan || "Year"}
            </Text>
            <Text>
              {resumeData.education.highSchool.location || "Location"}
            </Text>
          </View>
        </View>

        {/* Work Experience */}
        {resumeData.workExperience && resumeData.workExperience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resumeData.workExperience.map((exp, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.institutionName}>{exp.jobTitle || ""}</Text>
                <Text>{exp.company || ""}</Text>
                {exp.description &&
                  exp.description.map((desc, i) => (
                    <Text key={i} style={styles.bulletPoint}>
                      {desc}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/*Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resumeData.projects.map((project, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.institutionName}>
                  {project.projectTitle || ""}
                </Text>
                {project.description &&
                  project.description.map((desc, i) => (
                    <Text key={i} style={styles.bulletPoint}>
                      {desc}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View>
            <Text style={styles.institutionName}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.technicalSkills &&
                resumeData.skills.technicalSkills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.institutionName}>Soft Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.softSkills &&
                resumeData.skills.softSkills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
            </View>
          </View>

          {/* Certifications */}
          {resumeData.certifications &&
            resumeData.certifications.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {resumeData.certifications.map((cert, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    {cert.name}
                  </Text>
                ))}
              </View>
            )}

          {/* Achievements */}

          {resumeData.achievements && resumeData.achievements.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Achievements</Text>
              {resumeData.achievements.map((achievement, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  {achievement}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Template1;
