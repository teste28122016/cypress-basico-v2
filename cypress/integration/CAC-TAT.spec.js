// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(()=> {
        cy.visit('./src/index.html')  
    })
    it('Seção 2 - Exercício - verifica o título da aplicação', function() {        
        cy.title().should('equal','Central de Atendimento ao Cliente TAT')
    })

    it('Seção 3 - Exercício 1 - preenche os campos obrigatórios e envia o formulário', function() {        
        var textolongo = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#open-text-area').type(textolongo, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('.button','Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Seção 3 - Exercício 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {        
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste.com.br')
        cy.get('#open-text-area').type('Preço muito caro')
        //cy.get('button[type="submit"]').click()
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('Seção 3 - Exercício 3 - verifica se telefone só aceita número', function() {        
        cy.get('#phone').type('telefone').should('be.empty')
    })

    it('Seção 3 - Exercício 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {        
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#open-text-area').type('Preço muito caro')
        //cy.get('#phone-checkbox').click()
        cy.get('#phone-checkbox').check()
        //cy.get('button[type="submit"]').click()
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Seção 3 - Exercício 5 - preenche e limpa os campos nome, sobrenome, email e telefone', function() {        
        cy.get('#firstName')
            .type('Maria')
            .should('have.value','Maria')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Pereira')
            .should('have.value','Pereira')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('teste@teste.com.br')
            .should('have.value','teste@teste.com.br')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('123456789')
            .should('have.value','123456789')
            .clear()
            .should('have.value','')
    })

    it('Seção 3 - Exercício 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {        
        //cy.get('button[type="submit"]').click()
        cy.contains('.button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Seção 3 - Exercício 7 - envia o formuário com sucesso usando um comando customizado', function() {        
        cy.fillMandatoryFieldsAndSubmit('Maria','Pereira','teste@teste.com.br','Preço muito caro')
        cy.get('.success').should('be.visible')
    })   

    it('Seção 4 - Exercício - seleciona um produto (YouTube) por seu texto', function() {        
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })   

    it('Seção 4 - Exercício extra 1 - seleciona um produto (Mentoria) por seu valor (value)', function() {        
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })   

    it('Seção 4 - Exercício extra 2 - seleciona um produto (Blog) por seu índice', function() {        
        cy.get('#product').select(2).should('have.value','cursos')
    })   

    it('Seção 5 - Exercício - marca o tipo de atendimento "Feedback"', function() {        
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })   

    it('Seção 5 - Exercício extra - marca cada tipo de atendimento', function() {        
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })   

    it('Seção 6 - Exercício - marca ambos checkboxes, depois desmarca o último', function() {        
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })   

    it('Seção 7 - Exercício - seleciona um arquivo da pasta fixtures', function() {        
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function($input) {
            const nome = $input[0].files[0].name
            expect(nome).to.eq('example.json')
        })        
    })   

    it('Seção 7 - Exercício extra 1 - seleciona um arquivo simulando um drag-and-drop', function() {        
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(function($input) {
            const nome = $input[0].files[0].name
            expect(nome).to.eq('example.json')
        })        
    })   

    it('Seção 7 - Exercício extra 2 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {        
        cy.fixture('example.json',{encoding: null}).as('arquivo')
        cy.get('#file-upload').should('not.have.value').selectFile('@arquivo').should(function($input) {
            const nome = $input[0].files[0].name
            expect(nome).to.eq('example.json')
        })        
    })   

    it('Seção 8 - Exercício - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {              
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })   

    it('Seção 8 - Exercício extra 1 - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {              
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#title').should('contain.text','CAC TAT - Política de privacidade')
    })   
  })