import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const Education = ({
  formData,
  handleInputChange,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <SectionTitle icon={FaGraduationCap} title="Education" />

      {/* Graduation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">
          Graduation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>University Name</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.graduation.universityName}
              onChange={(e) =>
                handleInputChange(e, "graduation", "universityName")
              }
              placeholder="University Name"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Degree</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.graduation.degree}
              onChange={(e) => handleInputChange(e, "graduation", "degree")}
              placeholder="Bachelor of Technology"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>CPI/CGPA</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.graduation.cpi}
              onChange={(e) => handleInputChange(e, "graduation", "cpi")}
              placeholder="8.5"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Year Span</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.graduation.yearSpan}
              onChange={(e) => handleInputChange(e, "graduation", "yearSpan")}
              placeholder="2020-2024"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Location</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.graduation.location}
              onChange={(e) => handleInputChange(e, "graduation", "location")}
              placeholder="City, Country"
              required
            />
          </div>
        </div>
      </div>

      {/* Intermediate */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">
          Intermediate
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>School Name</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.intermediate.schoolName}
              onChange={(e) =>
                handleInputChange(e, "intermediate", "schoolName")
              }
              placeholder="School Name"
              required
            />
          </div>
          {/* <div>
            <label className={labelClasses}>Stream</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.intermediate.stream}
              onChange={(e) => handleInputChange(e, "intermediate", "stream")}
              placeholder="Science/Commerce/Arts"
              required
            />
          </div> */}
          <div>
            <label className={labelClasses}>Percentage</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.intermediate.percentage}
              onChange={(e) =>
                handleInputChange(e, "intermediate", "percentage")
              }
              placeholder="95%"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Passing Year</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.intermediate.yearSpan}
              onChange={(e) => handleInputChange(e, "intermediate", "yearSpan")}
              placeholder="2020"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Location</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.intermediate.location}
              onChange={(e) => handleInputChange(e, "intermediate", "location")}
              placeholder="City, Country"
              required
            />
          </div>
        </div>
      </div>

      {/* High School */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">
          High School
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>School Name</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.highSchool.schoolName}
              onChange={(e) => handleInputChange(e, "highSchool", "schoolName")}
              placeholder="School Name"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Percentage</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.highSchool.percentage}
              onChange={(e) => handleInputChange(e, "highSchool", "percentage")}
              placeholder="90%"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Passing Year</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.highSchool.yearSpan}
              onChange={(e) => handleInputChange(e, "highSchool", "yearSpan")}
              placeholder="2018"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Location</label>
            <input
              type="text"
              className={inputClasses}
              value={formData.highSchool.location}
              onChange={(e) => handleInputChange(e, "highSchool", "location")}
              placeholder="City, Country"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;