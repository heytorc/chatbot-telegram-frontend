import { baseUrl } from '../helpers/baseUrl';

describe('Chat screen', () => {
    const chatId = '1105986013';

    context('messages on chat', () => {
        it.only('messages', () => {
            cy.get('div.messagesList div')
                .should('have.length', 1)
        })
    });
});