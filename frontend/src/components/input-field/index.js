import React, { useState } from "react";
import { images } from "../../common/images";
import "./style.scss";

export function InputField({
  placeholder,
  icon,
  isPassword,
  error,
  fullWidth,
  handleChange,
  handleBlur,
  phone,
  ...props
}) {
  const { eyeOpen, eyeClose } = images;
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  return (
    <>
      <div
        className={
          fullWidth
            ? "input-field-container full-width-input-generic"
            : "input-field-container  "
        }
      >
        {phone && (
          <div className="additonal-one">
            <span>+1</span>
          </div>
        )}
        {icon}
        <input
          placeholder={placeholder}
          autoComplete="off"
          className="input-field-generic"
          type={isPassword && !isEyeOpen ? "password" : "text"}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {isPassword && (
          <img
            onClick={() => {
              setIsEyeOpen(!isEyeOpen);
            }}
            className={"eye-open"}
            src={isEyeOpen ? eyeOpen : eyeClose}
            alt="eye-icon"
          />
        )}
      </div>
      <div className="error-input-container">
        {error ? <p className="form-error">{error}</p> : null}
      </div>
    </>
  );
}
