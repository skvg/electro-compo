import axios from 'axios'
import React from 'react'
import Button from '../components/Button.js'

class ShowBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('savedToken'),
            item: this.props.item
        }
    }

    render () {
        return (
            <div className = "showbox" onClick = {this.props.onClick}>
                    <h3>{this.props.item.name}</h3>
                    <h4>{this.props.item.desc}</h4>
                    <h4>{this.props.item.status}</h4>
                    {
                        (this.props.item.status === "sell") &&
                        <div>
                            <h4>{this.props.item.sellingPrice} /-</h4>
                            {
                                this.state.item &&
                                <Button text = "Buy It" className = "Button" onClick = {this.onClick} />
                            }
                        </div>
                    }    
            </div>
        )
    }
}

export default ShowBox