import React from 'react'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'

import Header from '../components/Header'
import InputBox from '../components/InputBox'
import Buttton from '../components/Button'


class login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: null
        }
        this.updateUsername = this.updateUsername.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    updateUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    updatePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const userObject = {
            username: this.state.username,
            password: this.state.password
        };
        // calling for the api endpoint here
        Axios.post(`${process.env.REACT_APP_HOST}/login`, userObject)
        .then( (res)=>{
            const token = res.data.token
            localStorage.setItem('electroCompoToken', token)
            this.setState({redirect: '/'})
        })
        .catch((err)=>{
            console.log(err)
        })
        
        this.setState({
            username: '',
            password: '',
            redirect: null
        })

    }
    render(){
        if(this.state.redirect){
            return (
                <Redirect to = {this.state.redirect} />
            )
        }
        return (
            <div>
                <Header/>
                <form className="box" onSubmit = {this.onSubmit}>
                    <InputBox name = "Username" placeholder = "Type your username" onChange = {this.updateUsername}/>
                    <InputBox name = "Password" placeholder = "Type your Password" onChange = {this.updatePassword} />
                    <Buttton className="Button" type = "submit" text = "Log In"  />
                </form>
            </div>
        )
    }
}

export default login
