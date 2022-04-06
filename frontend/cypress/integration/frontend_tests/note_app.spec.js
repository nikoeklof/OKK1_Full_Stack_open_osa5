/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#showRegister').click()
      cy.get('#registerUsername').type('test')
      cy.get('#registerPassword').type('nikoe321')
      cy.get('#registerDisplayName').type('123')
      cy.get('#confirmRegister').click()
      cy.get('#username').type('test')
      cy.get('#password').type('nikoe321')
      cy.get('#login-button').click()
      cy.contains('123 logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('nikoe321')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#showRegister').click()
      cy.get('#registerUsername').type('test')
      cy.get('#registerPassword').type('nikoe321')
      cy.get('#registerDisplayName').type('123')
      cy.get('#confirmRegister').click()
      cy.get('#username').type('test')
      cy.get('#password').type('nikoe321')
      cy.get('#login-button').click()

    })

    it('A blog can be created', function () {
      cy.get('#showBlogForm').click()
      cy.get('#blog-title').type('Testing')
      cy.get('#blog-author').type('Cypress')
      cy.get('#blog-url').type('google.com')
      cy.get('#postBlog').click()

      cy.contains('Added Testing from Cypress')
      cy.reload()
      cy.get('#blogDiv').should('be.visible')
    })
    it('A blog can be deleted', function () {
      cy.get('#showBlogForm').click()
      cy.get('#blog-title').type('Testing')
      cy.get('#blog-author').type('Cypress')
      cy.get('#blog-url').type('google.com')
      cy.get('#postBlog').click()
      cy.get('#logout').click()
      cy.get('#username').type('test')
      cy.get('#password').type('nikoe321')
      cy.get('#login-button').click().then(() => {
        cy.wait(300)
        cy.get('#showBlog').click({ waitForAnimations: true })
        cy.get('#removeBlog').click()
        cy.on('window:confirm', () => true)
        cy.get('#allblogs').should('be.empty')
      })


    })
  })
})
