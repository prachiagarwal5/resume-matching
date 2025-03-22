import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#F0F4F8",
    padding: 20,
  },
  main: {
    width: "70%",
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactInfo: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
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
    backgroundColor: "#DDEEFF",
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
});

const Template4 = ({ data }) => {
  const resumeData = data?.resume || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>
            {resumeData?.contactInformation?.name}
          </Text>
          <View style={styles.contactInfo}>
            <Text>{resumeData?.contactInformation?.location}</Text>
            <Text>{resumeData?.contactInformation?.phone}</Text>
            <Text>{resumeData?.contactInformation?.email}</Text>
            {resumeData?.contactInformation?.linkedin && (
              <Text>LinkedIn: {resumeData.contactInformation.linkedin}</Text>
            )}
            {resumeData?.contactInformation?.github && (
              <Text>GitHub: {resumeData.contactInformation.github}</Text>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Objective */}
          <View>
            <Text style={styles.sectionTitle}>OBJECTIVE</Text>
            <Text style={styles.objective}>{resumeData?.objective}</Text>
          </View>

          {/* Divider Line */}
          <View style={styles.divider} />

          {/* Education */}
          <View>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resumeData?.education && (
              <>
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
                    Percentage: {resumeData?.education?.highSchool?.percentage}
                  </Text>
                  <Text>
                    {resumeData?.education?.highSchool?.location} |{" "}
                    {resumeData?.education?.highSchool?.yearSpan}
                  </Text>
                </View>
              </>
            )}
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
                <Text style={styles.experienceTitle}>
                  {internship.jobTitle}
                </Text>
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
                <Text style={styles.experienceTitle}>
                  {project.projectTitle}
                </Text>
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
            <View style={styles.skillsContainer}>
              {resumeData?.skills?.technicalSkills?.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
            <View style={styles.skillsContainer}>
              {resumeData?.skills?.softSkills?.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
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

          {/* Certifications  */}
          <View>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {resumeData?.certifications?.map((certification, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.institutionName}>{certification.name}</Text>
                <Text>{certification.issuer}</Text>
                <Text>{certification.date}</Text>
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
        </View>
      </Page>
    </Document>
  );
};

export default Template4;
