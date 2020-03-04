import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import socketio from 'socket.io-client';
import api from '../../services/api';

const socket = socketio(`http://localhost:3333`);

function convertTimestamp(timestamp) {
    if (timestamp) {
        let date = new Date(timestamp * 1000);

        return date.toLocaleDateString('pt-br', {
            dateStyle: 'short',
            timeStyle: 'medium'
        });
    }
}

export default class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            base_url: 'http://localhost:3333',
            chat_id: this.props.location.state.chat_id,
            user: [],
            chat: [],
            message_field: '',
        }

        let date = new Date(1583265850 * 1000);
        console.log(date);

        socket.on('userMessage', data => {
            this.getMessages();
        });        

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getMessages();
    }

    async getMessages() {
        const chat = await axios.get(this.state.base_url + `/chatbot/${this.state.chat_id}`)
                        .then(response => {
                            console.log(response.data[0]);
                            
                            return response.data[0];
                        })
                        .catch(error => console.log(error));
        
        if (chat) {
            this.setState({chat: chat.messages});
            this.setState({user: { first_name: chat.first_name, last_name: chat.last_name }});
        }
    }

    handleSubmit(event) {
        axios.post(this.state.base_url + `/chatbot/send`, {
            chat_id: this.state.chat_id,
            text: this.state.message_field
        }).then(response => {
            console.log(response);
            this.getMessages();
        }).catch(error => console.log(error));

        this.setState({ message_field: '' });

        event.preventDefault();
    }
    
    render() {
        return (
            <>
                <div>
                <a href="#" onClick={() => this.props.history.goBack()}>Voltar</a>&nbsp; {this.state.user.first_name} {this.state.user.last_name} (<strong>{this.state.chat_id}</strong>)
                </div>
                <br/>
                <div>
                    {this.state.chat.map((chat, index) => (
                        <div key={index}>
                            {chat.message || chat.text}
                            <br/>
                            <div>
                                {convertTimestamp(chat.date || null)}
                            </div>
                            <hr/>
                        </div>
                    ))} 
                </div>

                <form onSubmit={this.handleSubmit}>
                    <textarea   
                        onChange={(event) => this.setState({ message_field: event.target.value })}
                        value={this.state.message_field}
                    ></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </>
        );
    }
}