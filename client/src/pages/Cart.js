import React from 'react'
import Axios from 'axios'

import Header from '../components/Header.js'
import ShowBox from '../components/ShowBox.js'

class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            items: [],
        }
    }
    componentDidMount(){
        this.getAllUserItems()
    }
    getAllUserItems(){
        const  token = localStorage.getItem('electroCompoToken')
        const authToken = `Bearer ${token}`
        Axios.get(`${process.env.REACT_APP_HOST}/getalluseritems`, {headers: {"Authorization" : authToken}})
        .then((res) => {
            const allUserItems = res.data
            this.setState({items: allUserItems})
        })
    }
    render(){
        return (
            <div className = "cart">
                <Header cart = "cart"/>
                <h1>Here are your all items for selling and repairing</h1>
                <div className = "itemsBox">
                    {
                        this.state.items.map((item) => {
                            return <ShowBox item = {item}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Cart
