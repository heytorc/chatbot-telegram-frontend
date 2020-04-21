import { baseUrl } from '../helpers/baseUrl';

describe('Home screen', () => {
    const chatId = '1105986013';
    
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.contains('Digite o ID do chat:');
    })

    it("Value on input chat ID", () => {
        cy.get('input[name=chat_id]')
            .type(chatId)
            .should('have.value', chatId);
    })

    context('Form submission', () => {
        it('Open chat', () => {
            cy.get('input[name=chat_id]')
                .type(chatId)
                .type('{enter}')               
        })

    });
});

describe('Chat Validation', () => {
    const messageText = 'Teste 21221711';

    context('Check chat section', () => {
        it('Sending message', () => {
                
            cy.get('textarea[name=messageText]')
                .type(messageText)
                .should('have.value', messageText)

            cy.get('button')
                .contains('Enviar')
                .click();
        })

        it('Find sended message', () => {
            cy.get('div.messagesList')
                .contains(messageText);
        })
    })
});

describe('Back to home', () => {
    it('Click on back button', () => {
        cy.get('.backButton')
            .click();

        cy.contains('Digite o ID do chat:');
    })
});