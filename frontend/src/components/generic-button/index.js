import React from "react";
import { CircularProgress } from "@mui/material";
import "./styles.scss";

export const GenericButton = ({
  loading,
  onPress,
  buttonText,
  disable,
  grayButton,
  id,
  customStyle,
}) => {
  return (
    <>
      <div className="generic-btn-container" id={id}>
        <button
          type="button"
          disabled={loading || disable}
          className={
            loading || disable || grayButton
              ? `disable-generic-btn ${customStyle}`
              : ` ${customStyle}`
          }
          onClick={onPress}
        >
          {loading ? (
            <div style={{ alignItems: "center", padding: "20px" }}>
              <CircularProgress size={20} />
            </div>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </>
  );
};
