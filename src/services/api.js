import React, { Component } from 'react';
import axios from 'axios';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            base_url: 'http://localhost:3333'
        }
    }

    async getByChatId(chat_id) {
        return await axios.get(this.state.base_url + `/chatbot/${chat_id}`)
                            .then(response => {
                                return response;
                            })
                            .catch(error => console.log(error));
    }

}