import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
    const temperature = useContext(CurrentTemperatureUnitContext);
    const temperatureToggle = temperature.handleToggleSwitchChange;
    const temperatureUnit = temperature.currentTemperatureUnit;
    
  return (
    <div className="toggle">
      <input
        type="checkbox"
        onChange={temperatureToggle}
        className="toggle__checkbox"
      />
      <span className={`toggle__button ${temperatureUnit === "F" ? "toggle__button_f" : "toggle__button_c"}`}></span>
      <div className="toggle__values">
        <div className={`toggle__value ${temperatureUnit === "F" ? "toggle__value_checked" : ""}`}>F</div>
        <div className={`toggle__value ${temperatureUnit === "C" ? "toggle__value_checked" : ""}`}>C</div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
