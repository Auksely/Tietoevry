import React from "react";
import './button.scss'

const Button=({type, handleClick, children})=>{

    return(
            <button className="button" type={type} onClick={handleClick}>
                {children}
            </button>
        )
    
}
export default Button;