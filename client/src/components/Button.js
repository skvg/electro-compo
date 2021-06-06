import React from 'react'

const Button = (props) => {
    return (
        <div className = "Button_wrapper" >
            <button type = {props.type} onClick = {props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button
