import React, { useState, Component } from 'react';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { chatId: '1105986013' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ chatId: e.target.value });
    }

    handleSubmit(e) {
        if (this.state.chatId) {
            this.props.history.push('/chat', { chat_id: this.state.chatId });
        }
        
        e.preventDefault();
    }

    render() {
        return (
            <>
                <div>Home</div>
                <br/>
                <label>Digite o ID do chat: </label>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.chatId}
                    />
                    <button>Acessar</button>
                </form>
            </>
        )
    }
}