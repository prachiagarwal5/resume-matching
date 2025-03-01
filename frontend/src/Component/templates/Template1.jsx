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
    marginBottom: 5,
  },
  skill: {
    backgroundColor: "#F0F4F8",
    padding: "3 8",
    borderRadius: 3,
    marginRight: 5,
  },
  experienceTitle: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  companyName: {
    fontStyle: "italic",
    marginBottom: 3,
  },
  achievementItem: {
    marginBottom: 3,
    paddingLeft: 15,
  },
});

const Template1 = ({ data }) => {
  console.log("Received data in Template1:", data);

  // Extract the resume data from the nested structure
  const resumeData = data?.resume || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact Information */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {resumeData?.contactInformation?.name}
          </Text>
          <View style={styles.contactInfo}>
            <Text>{resumeData?.contactInformation?.email}</Text>
            <Text> | {resumeData?.contactInformation?.phone}</Text>
            <Text> | {resumeData?.contactInformation?.location}</Text>
            {resumeData?.contactInformation?.linkedin && (
              <Text> | LinkedIn: {resumeData.contactInformation.linkedin}</Text>
            )}
            {resumeData?.contactInformation?.github && (
              <Text> | GitHub: {resumeData.contactInformation.github}</Text>
            )}
          </View>
        </View>

        {/* Objective */}
        <View>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.objective}>{resumeData?.objective}</Text>
        </View>

        {/* Education */}
        <View>
          <Text style={styles.sectionTitle}>Education</Text>

          {/* Graduation */}
          <View style={styles.educationItem}>
            <Text style={styles.institutionName}>
              {resumeData?.education?.graduation?.institution}
            </Text>
            <Text>
              {resumeData?.education?.graduation?.degree} | CPI:{" "}
              {resumeData?.education?.graduation?.CPI}
            </Text>
            <Text>
              {resumeData?.education?.graduation?.location} |{" "}
              {resumeData?.education?.graduation?.yearSpan}
            </Text>
          </View>

          {/* Intermediate */}
          <View style={styles.educationItem}>
            <Text style={styles.institutionName}>
              {resumeData?.education?.intermediate?.schoolName}
            </Text>
            <Text>
              {resumeData?.education?.intermediate?.stream} | Percentage:{" "}
              {resumeData?.education?.intermediate?.percentage}
            </Text>
            <Text>
              {resumeData?.education?.intermediate?.location} |{" "}
              {resumeData?.education?.intermediate?.yearSpan}
            </Text>
          </View>

          {/* High School */}
          <View style={styles.educationItem}>
            <Text style={styles.institutionName}>
              {resumeData?.education?.highSchool?.schoolName}
            </Text>
            <Text>
              Percentage: {resumeData?.education?.highSchool?.percentage} |{" "}
              {resumeData?.education?.highSchool?.yearSpan}
            </Text>
            <Text>{resumeData?.education?.highSchool?.location}</Text>
          </View>
        </View>

        {/* Work Experience */}
        <View>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {resumeData?.workExperience?.map((exp, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
              <Text style={styles.companyName}>{exp.company}</Text>
              {exp.description?.map((desc, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Projects */}
        <View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resumeData?.projects?.map((project, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.experienceTitle}>{project.projectTitle}</Text>
              {project.description?.map((desc, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.institutionName}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData?.skills?.technicalSkills?.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.institutionName}>Soft Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData?.skills?.softSkills?.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {resumeData?.achievements?.map((achievement, index) => (
            <Text key={index} style={styles.bulletPoint}>
              • {achievement}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Template1;
