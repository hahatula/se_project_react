import "./ToggleSwitch.css";
import { useState } from "react";

function ToggleSwitch({ value, onChange }) {
  return (
    <div className="toggle">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="toggle__checkbox"
      />
      <span className="toggle__button"></span>
      <div className="toggle__values">
        <div className="toggle__value toggle__value_checked">F</div>
        <div className="toggle__value">C</div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
