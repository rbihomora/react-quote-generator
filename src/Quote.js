import React, { Component } from 'react';
import { Button } from './Button';
import { Social } from './Social';
import axios from 'axios';

const randomColor = () => '#' + Math.random().toString(16).substr(-6);

export class Quote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: '',
            author: '',
            cat: '',
            backgroundColor: ''
        };
    }
    
    // Get first quote on page load
    componentDidMount() {
        this.getQuote();
    }

    randomizeColor = () => this.setState({ backgroundColor: randomColor()});

    // Get quote json
    getQuote = () => {
        axios.get(`https://talaikis.com/api/quotes/random//`)
        .then(response => {
            this.setState({
                quote: response.data.quote,
                author: response.data.author,
                cat: response.data.cat
            })
        })
        .catch(function(error) {
            // Display errors if have
            console.log(error);
        });
        
        // Generate new color
        this.randomizeColor();
        // Set the body bg
        document.body.style.backgroundColor = this.state.backgroundColor;
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 wrapper">
                        <p className="text-justify">{this.state.quote}</p>
                        <p className="font-weight-bold text-right">By: {this.state.author}!!!</p>
                        <Button onClick={this.getQuote.bind(this)} />
                        <Social />
                    </div>
                </div>
            </div>
        );
    }
}