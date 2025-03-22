import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  educationItem: {
    marginBottom: 5,
  },
  institutionName: {
    fontWeight: "bold",
  },
  bulletPoint: {
    marginBottom: 2,
    paddingLeft: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 5,
  },
  skill: {
    backgroundColor: "#F0F4F8",
    padding: "2 5",
    borderRadius: 2,
    marginRight: 5,
  },
  experienceTitle: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  companyName: {
    fontStyle: "italic",
    marginBottom: 2,
  },
  achievementItem: {
    marginBottom: 2,
    paddingLeft: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
  },
  tableCell: {
    margin: 2,
    fontSize: 10,
    paddingLeft: 10,
  },
  educationTable: {
    display: "table",
    width: "auto",
    marginBottom: 5,
  },
  educationRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  educationCol: {
    width: "70%",
  },
  educationColRight: {
    width: "30%",
    textAlign: "right",
  },
  educationText: {
    fontSize: 10,
  },
});

const Template3 = ({ data }) => {
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
            <Text>{resumeData?.contactInformation?.location}</Text>
            <Text> | {resumeData?.contactInformation?.phone}</Text>
            <Text> | {resumeData?.contactInformation?.email}</Text>
            {resumeData?.contactInformation?.linkedin && (
              <Text> | LinkedIn: {resumeData.contactInformation.linkedin}</Text>
            )}
            {resumeData?.contactInformation?.github && (
              <Text> | GitHub: {resumeData.contactInformation.github}</Text>
            )}
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Objective */}
        <View>
          <Text style={styles.sectionTitle}>OBJECTIVE</Text>
          <Text style={styles.objective}>{resumeData?.objective}</Text>
        </View>

        {/* Education */}
        <View>
          <Text style={styles.sectionTitle}>EDUCATION</Text>

          {/* Graduation */}
          <View style={styles.educationTable}>
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.institutionName}>
                  {resumeData?.education?.graduation?.institution}
                </Text>
              </View>
              <View style={styles.educationColRight}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.graduation?.yearSpan} | CPI:{" "}
                  {resumeData?.education?.graduation?.CPI}
                </Text>
              </View>
            </View>
            {/* <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.graduation?.degree}
                </Text>
              </View>
              <View style={styles.educationColRight}>
                <Text style={styles.educationText}>
                  CPI: {resumeData?.education?.graduation?.CPI}
                </Text>
              </View>
            </View> */}
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.graduation?.location}
                </Text>
              </View>
            </View>
          </View>

          {/* Intermediate */}
          <View style={styles.educationTable}>
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.institutionName}>
                  {resumeData?.education?.intermediate?.schoolName}
                </Text>
              </View>
              <View style={styles.educationColRight}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.intermediate?.yearSpan} | Percentage:{" "}
                  {resumeData?.education?.intermediate?.percentage}
                </Text>
              </View>
            </View>
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.intermediate?.stream}
                </Text>
              </View>
              {/* <View style={styles.educationColRight}>
                <Text style={styles.educationText}>
                  Percentage: {resumeData?.education?.intermediate?.percentage}
                </Text>
              </View> */}
            </View>
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.intermediate?.location}
                </Text>
              </View>
            </View>
          </View>

          {/* High School */}
          <View style={styles.educationTable}>
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.institutionName}>
                  {resumeData?.education?.highSchool?.schoolName}
                </Text>
              </View>
              <View style={styles.educationColRight}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.highSchool?.yearSpan} | Percentage:{" "}
                  {resumeData?.education?.highSchool?.percentage}
                </Text>
              </View>
            </View>
            {/* <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.educationText}>
                  Percentage: {resumeData?.education?.highSchool?.percentage}
                </Text>
              </View>
            </View> */}
            <View style={styles.educationRow}>
              <View style={styles.educationCol}>
                <Text style={styles.educationText}>
                  {resumeData?.education?.highSchool?.location}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Internship/ Training Experience */}
        <View>
          <Text style={styles.sectionTitle}>
            INTERNSHIP/ TRAINING EXPERIENCE
          </Text>
          {resumeData?.workExperience?.map((internship, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.experienceTitle}>{internship.jobTitle}</Text>
              <Text style={styles.companyName}>{internship.company}</Text>
              <Text>{internship.duration}</Text>
              {internship.description?.map((desc, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Projects */}
        <View>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
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

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Skills */}
        <View>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.institutionName}>Technical Skills</Text>
                {resumeData?.skills?.technicalSkills?.map((skill, index) => (
                  <Text key={index} style={styles.tableCell}>
                    • {skill}
                  </Text>
                ))}
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.institutionName}>Professional Skills</Text>
                {resumeData?.skills?.softSkills?.map((skill, index) => (
                  <Text key={index} style={styles.tableCell}>
                    • {skill}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Achievements */}
        <View>
          <Text style={styles.sectionTitle}>
            PROFESSIONAL ACHIEVEMENTS/ INSIGHTS
          </Text>
          {resumeData?.achievements?.map((achievement, index) => (
            <Text key={index} style={styles.bulletPoint}>
              {achievement}
            </Text>
          ))}
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Co-curricular Activities */}
        {/* <View>
          <Text style={styles.sectionTitle}>CO-CURRICULAR ACTIVITIES</Text>
          {resumeData?.coCurricularActivities?.map((activity, index) => (
            <Text key={index} style={styles.bulletPoint}>
              {activity}
            </Text>
          ))}
        </View> */}

        {/* Certifications */}
        <View>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          {resumeData?.certifications?.map((certification, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.institutionName}>{certification.name}</Text>
              <Text style={styles.bulletPoint}>{certification.issuer}</Text>
              <Text style={styles.bulletPoint}>{certification.date}</Text>
            </View>
          ))}
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Declaration */}
        <View>
          <Text style={styles.sectionTitle}>DECLARATION</Text>
          <Text style={styles.objective}>
            I hereby declare that all the above mentioned information is true
            and correct to the best of my knowledge.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Template3;
