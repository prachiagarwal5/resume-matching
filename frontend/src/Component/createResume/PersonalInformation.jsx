import React from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PersonalInformation = ({
  formData,
  handleInputChange,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <SectionTitle icon={FaUser} title="Personal Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className={labelClasses}>
            <FaUser className="inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            className={inputClasses}
            value={formData.name}
            onChange={(e) => handleInputChange(e, null, "name")}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className={labelClasses}>
            <FaPhone className="inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            className={inputClasses}
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange(e, null, "phoneNumber")}
            placeholder="+1 234 567 8900"
            required
          />
        </div>
        <div>
          <label className={labelClasses}>
            <FaEnvelope className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            className={inputClasses}
            value={formData.gmail}
            onChange={(e) => handleInputChange(e, null, "gmail")}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div>
          <label className={labelClasses}>
            <FaLinkedin className="inline mr-2" />
            LinkedIn
          </label>
          <input
            type="url"
            className={inputClasses}
            value={formData.linkedIn}
            onChange={(e) => handleInputChange(e, null, "linkedIn")}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <FaGithub className="inline mr-2" />
            GitHub
          </label>
          <input
            type="url"
            className={inputClasses}
            value={formData.github}
            onChange={(e) => handleInputChange(e, null, "github")}
            placeholder="github.com/johndoe"
          />
        </div>
        <div>
          <label className={labelClasses}>
            <FaMapMarkerAlt className="inline mr-2" />
            Location
          </label>
          <input
            type="text"
            className={inputClasses}
            value={formData.location}
            onChange={(e) => handleInputChange(e, null, "location")}
            placeholder="City, Country"
            required
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
