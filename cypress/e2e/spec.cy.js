describe('should display the main page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urlsData',
    }).as('getUrls');

    cy.visit('http://localhost:3000/');

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        id: 2,
        long_url: 'https://www.youtube.com/watch?v=KhTxlm4REQc',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'Awesome Old Song',
      },
    })
      .as('postUrl')
      .visit('http://localhost:3000/');
  });

  it('should show the home page', () => {
    cy.wait('@getUrls');
    cy.get('h1')
      .should('contain', 'URL Shortener')
      .get('form')
      .should('exist')
      .get('[placeholder="Title..."]')
      .should('have.attr', 'placeholder', 'Title...')
      .get('[placeholder="URL to Shorten..."]')
      .should('have.attr', 'placeholder', 'URL to Shorten...')
      .get('section')
      .should('have.length', 1)
      .get('section')
      .first()
      .within(() => {
        cy.get('h3')
          .should('contain', 'Awesome photo')
          .get('a')
          .should('contain', 'http://localhost:3001/useshorturl/1')
          .get('p')
          .should(
            'contain',
            'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          );
      });
    cy.get('section')
      .last()
      .within(() => {
        cy.get('h3')
          .should('contain', 'Awesome Winter Photo')
          .get('a')
          .should('contain', 'http://localhost:3001/useshorturl/2')
          .get('p')
          .should(
            'contain',
            'https://www.istockphoto.com/photo/christmas-winter-blurred-background-abstract-christmas-snowy-holiday-background-gm1434146394-475858126',
          );
      });
  });

  it('should be able to post a new url to the site', () => {
    cy.get('[placeholder="Title..."]')
      .type('Awesome Old Song')
      .get('[placeholder="Title..."]')
      .should('have.value', 'Awesome Old Song')
      .get('[placeholder="URL to Shorten..."]')
      .type('https://www.youtube.com/watch?v=KhTxlm4REQc')
      .get('[placeholder="URL to Shorten..."]')
      .should('have.value', 'https://www.youtube.com/watch?v=KhTxlm4REQc');
    cy.get('button')
      .click()
      .wait('@postUrl')
      .get('.url')
      .should('have.length', 3)
      .get('.url')
      .last()
      .within(() => {
        cy.get('h3')
          .should('contain', 'Awesome Old Song')
          .get('a')
          .should('contain', 'http://localhost:3001/useshorturl/2')
          .get('p')
          .should('contain', 'https://www.youtube.com/watch?v=KhTxlm4REQc');
      });
  });
});
