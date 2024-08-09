import React from "react";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import "./switch.css";

const Switch = ({ isOn }) => {
  const CurrentTempContext = React.useContext(CurrentTempUnitContext);
  return (
    <>
      <input
        className="switch"
        id="switch"
        type="checkbox"
        checked={isOn}
        onChange={CurrentTempContext.handleToggleSwitchChange}
      />
      <label
        className="switch__label"
        htmlFor="switch"
        style={{ background: isOn && "#06D6A0" }}
      >
        <span className="switch__button" />
      </label>
    </>
  );
};

export default Switch;
