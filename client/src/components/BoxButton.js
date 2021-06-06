import React from 'react'
import Axios from 'axios'

import InputBox from './InputBox.js'
import Button from './Button.js'

class BoxButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            status: this.props.status,
            popupWindow: false,
            name: '',
            desc: '',
            tag: '',
            sellingPrice: '',
            user: this.props.user,
        }
        this.onClick = this.onClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changeTag = this.changeTag.bind(this);
        this.changeSellingPrice = this.changeSellingPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onClick(e) {
        e.preventDefault()
        this.setState({
            popupWindow: true,
        })
    }
    closePopup(e) {
        e.preventDefault()
        this.setState({popupWindow: false})
    }
    changeName(e){
        this.setState({
            name: e.target.value
        })
    }
    changeDesc(e){
        this.setState({
            desc: e.target.value
        })
    }
    changeTag(e){
        this.setState({
            tag: e.target.value
        })
    }
    changeSellingPrice(e){
        this.setState({
            sellingPrice: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        console.log(this.state.user.username)
        const itemObject = {
            name: this.state.name,
            desc: this.state.desc,
            tag: this.state.tag,
            status: this.state.status,
            sellingPrice: this.state.sellingPrice,
            username: this.state.user.username,
        }
        const  token = localStorage.getItem('electroCompoToken')
        const authToken = `Bearer ${token}`
        Axios.post(`${process.env.REACT_APP_HOST}/item`, itemObject, {headers: {"Authorization" : authToken}})
        .then((res) =>{
            const data = res.data
            console.log(data)
            this.setState({popupWindow: false})
        })
        .catch((err) => {
            console.log(err)
            this.setState({popupWindow: false})
        })

        this.setState({
            name: '',
            desc: '',
            tags: '',
            sellingPrice: ''
        })

    }

    render() {
        return (
            <div className = "BoxButton">
                <button className = "BoxButton_Button" onClick = {this.onClick}>
                    <h1>{this.props.text}</h1>
                </button>
                {
                    this.state.popupWindow &&
                    <form className = "popupWindow" onSubmit = {this.onSubmit}>
                        <InputBox name = "Your Item Name" placeholder = "Type your product name" onChange = {this.changeName}/>
                        <InputBox name = "Item Description" placeholder = "Describe Your Item here !!" onChange = {this.changeDesc}/>
                        <InputBox name = "Add Tag" placeholder = "Type tag for your item" onChange = {this.changeTag}/>
                        {
                            (this.state.status === 'sell') &&
                            <InputBox name = "How much money you want..." placeholder = "Type the Your Item value" onChange = {this.changeSellingPrice} />
                        }
                        <Button className="Button" type = "submit" text = "Close" onClick = {this.closePopup}/>
                        <Button className="Button" type = "submit" text = "Sounds Good"/>
                    </form>
                }
            </div>
        )
    }
}

export default BoxButton
