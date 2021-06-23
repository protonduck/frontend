context('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.location('pathname').should('include', 'login')
  })

  it('should render login page correctly', () => {
    cy.getTestId('login_header').should('be.visible');

    cy.getTestId('login_form_label_email').should('be.visible');
    cy.getTestId('login_form_input_email').should('be.visible');

    cy.getTestId('login_form_label_password').should('be.visible');
    cy.getTestId('login_form_input_password').should('be.visible');

    cy.getTestId('login_form_button_login').should('be.visible');
  })
})
