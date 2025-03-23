import React from "react";
import { FaCertificate, FaPlus, FaTrash } from "react-icons/fa";

const Certifications = ({
  formData,
  handleCertificationChange,
  addCertification,
  removeCertification,
  inputClasses,
  labelClasses,
  sectionClasses,
  SectionTitle,
}) => {
  return (
    <section className={sectionClasses}>
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={FaCertificate} title="Certifications" />
        <button
          type="button"
          onClick={addCertification}
          className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {formData.certification.map((cert, index) => (
        <div key={index} className="flex gap-2 mb-3">
          <input
            type="text"
            className={inputClasses}
            value={cert}
            onChange={(e) =>
              handleCertificationChange(index, null, e.target.value)
            }
            placeholder="Certification name and issuing organization"
          />
          <button
            type="button"
            onClick={() => removeCertification(index)}
            className="text-red-500 hover:text-red-400 transition-colors duration-200"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </section>
  );
};

export default Certifications;
