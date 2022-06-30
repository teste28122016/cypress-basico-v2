// <reference types="Cypress" />
it('Seção 8 - Exercício extra 2 - testa a página da política de privavidade de forma independente', function() {              
    cy.visit('./src/privacy.html')  
    cy.get('#title').should('contain.text','CAC TAT - Política de privacidade')
})   

    
