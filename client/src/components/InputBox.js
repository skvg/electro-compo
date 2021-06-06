import React from 'react'

const InputBox = (props) => {
    return (
        <div className = "InputBox">
            <label>{props.name}</label>
            <input type = "text" placeholder = {props.placeholder} onChange = {props.onChange} />
        </div>
    )
}

export default InputBox
