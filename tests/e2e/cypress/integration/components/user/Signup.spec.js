context('Signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
    cy.location('pathname').should('include', 'signup');
  });

  it('should render login page correctly', () => {
    cy.getTestId('signup_header').should('be.visible');

    cy.getTestId('signup_form_label_username').should('be.visible');
    cy.getTestId('signup_form_input_username').should('be.visible');

    cy.getTestId('signup_form_label_email').should('be.visible');
    cy.getTestId('signup_form_input_email').should('be.visible');

    cy.getTestId('signup_form_label_password').should('be.visible');
    cy.getTestId('signup_form_input_password').should('be.visible');

    cy.getTestId('signup_form_label_password_confirmation').should('be.visible');
    cy.getTestId('signup_form_input_password_confirmation').should('be.visible');

    cy.getTestId('signup_form_button_signup').should('be.visible');
  });
});
