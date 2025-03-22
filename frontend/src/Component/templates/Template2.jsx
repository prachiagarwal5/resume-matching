import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 11,
  },
  container: {
    flexDirection: "row",
    minHeight: "100%",
  },
  leftColumn: {
    width: "35%",
    backgroundColor: "#1A365D",
    color: "white",
    padding: 20,
    minHeight: "100%",
  },
  rightColumn: {
    width: "65%",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 5,
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1A365D",
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: "#1A365D",
  },
  leftSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: "white",
  },
  content: {
    marginBottom: 20,
  },
  educationItem: {
    marginBottom: 10,
  },
  institutionName: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  bulletPoint: {
    marginBottom: 3,
    paddingLeft: 15,
    fontSize: 10,
  },
  skill: {
    marginBottom: 5,
    fontSize: 10,
  },
  skillCategory: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  objective: {
    lineHeight: 1.5,
    fontSize: 10,
  },
});

const Template2 = ({ data }) => {
  const resumeData = data?.resume || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <Text style={styles.name}>
              {resumeData.contactInformation?.name || "Full Name"}
            </Text>

            <View style={styles.contactInfo}>
              <Text style={styles.leftSectionTitle}>Contact</Text>
              <Text style={styles.contactItem}>
                {resumeData.contactInformation?.email || "Email"}
              </Text>
              <Text style={styles.contactItem}>
                {resumeData.contactInformation?.phone || "Phone"}
              </Text>
              <Text style={styles.contactItem}>
                {resumeData.contactInformation?.location || "Location"}
              </Text>
              {resumeData.contactInformation?.linkedin && (
                <Text style={styles.contactItem}>
                  LinkedIn: {resumeData.contactInformation?.linkedin}
                </Text>
              )}
              {resumeData.contactInformation?.github && (
                <Text style={styles.contactItem}>
                  GitHub: {resumeData.contactInformation?.github}
                </Text>
              )}
            </View>

            <View style={styles.content}>
              <Text style={styles.leftSectionTitle}>Skills</Text>

              <Text style={styles.skillCategory}>Technical Skills</Text>
              {resumeData.skills?.technicalSkills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  • {skill}
                </Text>
              ))}

              <Text style={styles.skillCategory}>Soft Skills</Text>
              {resumeData.skills?.softSkills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  • {skill}
                </Text>
              ))}
            </View>

            {resumeData.certifications &&
              resumeData.certifications.length > 0 && (
                <View style={styles.content}>
                  <Text style={styles.leftSectionTitle}>Certifications</Text>
                  {resumeData.certifications.map((cert, index) => (
                    <Text key={index} style={styles.skill}>
                      • {cert.name}
                    </Text>
                  ))}
                </View>
              )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            {resumeData.objective && (
              <View style={styles.content}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.objective}>{resumeData.objective}</Text>
              </View>
            )}

            {/* Work Experience */}
            {resumeData.workExperience &&
              resumeData.workExperience.length > 0 && (
                <View style={styles.content}>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                  {resumeData.workExperience.map((exp, index) => (
                    <View key={index} style={styles.educationItem}>
                      <Text style={styles.institutionName}>
                        {exp.jobTitle || ""} | {exp.company || ""}
                      </Text>
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

            {/* Projects */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <View style={styles.content}>
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

            {/* Education */}
            <View style={styles.content}>
              <Text style={styles.sectionTitle}>Education</Text>

              {/* Graduation */}
              <View style={styles.educationItem}>
                <Text style={styles.institutionName}>
                  {resumeData.education?.graduation.institution ||
                    "University Name"}
                </Text>
                <Text style={styles.bulletPoint}>
                  {resumeData.education?.graduation.degree || "Degree"} | CPI:{" "}
                  {resumeData.education?.graduation.CPI || "N/A"}
                </Text>
                <Text style={styles.bulletPoint}>
                  {resumeData.education?.graduation.location || "Location"} |
                  {resumeData.education?.graduation.yearSpan || "Year"}
                </Text>
              </View>

              {/* Intermediate */}
              <View style={styles.educationItem}>
                <Text style={styles.institutionName}>
                  {resumeData.education?.intermediate.schoolName ||
                    "School Name"}
                </Text>
                <Text style={styles.bulletPoint}>
                  {resumeData.education?.intermediate.stream || "Stream"} |
                  Percentage:{" "}
                  {resumeData.education?.intermediate.percentage || "N/A"}
                </Text>
                <Text style={styles.bulletPoint}>
                  {resumeData.education?.intermediate.location || "Location"} |
                  {resumeData.education?.intermediate.yearSpan || "Year"}
                </Text>
              </View>

              {/* High School */}
              <View style={styles.educationItem}>
                <Text style={styles.institutionName}>
                  {resumeData.education?.highSchool.schoolName || "School Name"}
                </Text>
                <Text style={styles.bulletPoint}>
                  Percentage:{" "}
                  {resumeData.education?.highSchool.percentage || "N/A"} |
                  {resumeData.education?.highSchool.yearSpan || "Year"}
                </Text>
                <Text style={styles.bulletPoint}>
                  {resumeData.education?.highSchool.location || "Location"}
                </Text>
              </View>
            </View>

            {/* Achievements */}
            {resumeData.achievements && resumeData.achievements.length > 0 && (
              <View style={styles.content}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {resumeData.achievements.map((achievement, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {achievement}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2;
