import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

import Header from '../components/Header'
import Button from '../components/Button'
import BoxButton from '../components/BoxButton.js'
import ShowBox from '../components/ShowBox.js'


class homePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('electroCompoToken'),
            items: [],
            user: '',
        }
        this.logout = this.logout.bind(this)
    }
    componentDidMount(){
        if(this.state.token){
            this.getUser()
            this.getAllSellItems()
        }
    }
    getUser(){
        const  token = localStorage.getItem('electroCompoToken')
        const authToken = `Bearer ${token}`
        Axios.get(`${process.env.REACT_APP_HOST}/user`, {headers: {"Authorization" : authToken}} )
        .then((res)=>{
            const user = res.data
            this.setState({user: user})
        })
        .catch((err)=>console.log(err))
    }
    getAllSellItems() {
        const  token = localStorage.getItem('electroCompoToken')
        const authToken = `Bearer ${token}`
        Axios.get(`${process.env.REACT_APP_HOST}/getallsellitems`, {headers: {"Authorization" : authToken}})
        .then((res) => {
            const allSellItems = res.data
            this.setState({items: allSellItems})
        })
    }
    logout(){
        this.setState({user: ''})
    }

    render(){
        return (
            <div>
                <Header user = {this.state.user} logout = {this.logout} />
                {
                    (this.state.token && this.state.user) &&
                    <div>
                        <div className = "sellAndRepair">
                            <BoxButton text = "Sell My Item" status = "sell" user = {this.state.user}/>
                            <BoxButton text = "Repair My Item" status = "repair" user = {this.state.user}/>
                        </div>
                        <div className = "itemsBox">
                            {
                                this.state.items.map((item) => {
                                    return <ShowBox item = {item}/>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default homePage