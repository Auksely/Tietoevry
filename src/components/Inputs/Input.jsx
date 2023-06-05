import React from "react";
import './input.scss';
import classNames from "classnames";

const Inputs=({label, placeholder, type, name, value, onChange, max, min, colored})=>{

const taskClass=classNames("input", {
    'input--colored': colored,
  })

    return(
<>
<label className="input__label" htmlFor={name}>{label}</label>
<input
        className={taskClass}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
</>
    )
}

export default Inputs;