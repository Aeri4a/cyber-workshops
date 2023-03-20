import React, { useState } from "react";
import styles from "../styles/Forms.module.scss";

function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, focusMode, ...inputProps } = props;

  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={() => setFocused(true)}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focusMode && focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default FormInput;
