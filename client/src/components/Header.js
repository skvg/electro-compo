import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'

import Button from './Button.js'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user,
            token: localStorage.getItem('electroCompoToken'),
            redirect: null,
            logout: false,
        }
        this.cart = this.cart.bind(this)
        this.back = this.back.bind(this)
        this.logout = this.logout.bind(this)
    }
    logout(e){
        e.preventDefault()
        const  token = localStorage.getItem('electroCompoToken')
        const authToken = `Bearer ${token}`
        Axios.get(`${process.env.REACT_APP_HOST}/logout`, {headers: {"Authorization" : authToken}})
        .then((res) => {
            localStorage.removeItem('electroCompoToken')
            this.setState({logout: true})
            this.props.logout()
        })
        .catch((e)=>console.log(e))
    }
    back(e){
        e.preventDefault()
        this.setState({redirect: '/'})
    }
    cart(e){
        e.preventDefault()
        this.setState({redirect: '/cart'})
    }
    render() {
        if(this.state.redirect){
            return (
                <Redirect to = {this.state.redirect} />
            )
        }
        return (
            <div className = "Header">
                <div className="logo">
                    <h1>Electro-Compo</h1>
                    <h5>For selling and repairing electronic devices</h5>
                </div>
                <div className= "buttons-section">
                    {
                        (this.state.logout || !this.state.token ) &&
                        <div>
                            <Link to = "/login" >
                                <Button className="Button" type="button" text="Log In" />
                            </Link>
                            <Link to = "/signup" >
                                <Button className="Button" type="button" text="Sign Up" />
                            </Link>
                        </div>
                    }
                    {
                        (this.props.user && this.state.token ) &&
                        <div>
                            <Button className="Button" type="button" text="Cart" onClick = {this.cart} />
                            <Button className="Button" type="button" text="Logout" onClick = {this.logout} />
                        </div>
                    }
                    {
                        (this.props.cart === "cart") &&
                        <Button className="Button" type = "button" text="Back" onClick = {this.back} />
                    }
                </div>
            </div>
        )
    }
}

export default Header
