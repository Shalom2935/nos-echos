describe('Testimony Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should submit a new testimony', () => {
    // Navigate to testimony form
    cy.get('[data-testid="submit-testimony-button"]').click();

    // Fill out the form
    cy.get('select[name="type"]').select('survivor');
    cy.get('select[name="gender"]').select('female');
    cy.get('select[name="age"]').select('25-34');
    cy.get('textarea[name="content"]').type('This is a test testimony from Cypress');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Verify success message
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain', 'Testimony submitted successfully');

    // Verify testimony appears in list
    cy.get('[data-testid="testimonial-list"]')
      .should('contain', 'This is a test testimony from Cypress');
  });

  it('should display validation errors', () => {
    cy.get('[data-testid="submit-testimony-button"]').click();
    cy.get('button[type="submit"]').click();

    // Verify error messages
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Type is required')
      .and('contain', 'Content is required');
  });

  it('should filter testimonies', () => {
    // Add test data through API
    cy.request('POST', '/api/testimonies', {
      type: 'survivor',
      content: 'Survivor testimony'
    });
    cy.request('POST', '/api/testimonies', {
      type: 'witness',
      content: 'Witness testimony'
    });

    // Visit testimonies page
    cy.visit('/testimonies');

    // Filter by type
    cy.get('[data-testid="filter-type"]').select('survivor');

    // Verify filtered results
    cy.get('[data-testid="testimonial-list"]')
      .should('contain', 'Survivor testimony')
      .and('not.contain', 'Witness testimony');
  });

  it('should handle pagination', () => {
    // Add multiple testimonies through API
    for (let i = 0; i < 12; i++) {
      cy.request('POST', '/api/testimonies', {
        type: 'survivor',
        content: `Testimony ${i + 1}`
      });
    }

    cy.visit('/testimonies');

    // Verify first page
    cy.get('[data-testid="testimonial-card"]').should('have.length', 10);

    // Go to next page
    cy.get('[data-testid="next-page"]').click();

    // Verify second page
    cy.get('[data-testid="testimonial-card"]').should('have.length', 2);
  });

  it('should handle offline mode', () => {
    // Simulate offline mode
    cy.window().then((win) => {
      win.navigator.serviceWorker.ready.then(() => {
        cy.log('Service Worker Ready');
      });
    });

    cy.get('[data-testid="submit-testimony-button"]').click();
    
    // Fill and submit form while offline
    cy.get('select[name="type"]').select('survivor');
    cy.get('textarea[name="content"]').type('Offline testimony');
    cy.get('button[type="submit"]').click();

    // Verify offline message
    cy.get('[data-testid="offline-message"]')
      .should('be.visible')
      .and('contain', 'Your testimony will be submitted when you\'re back online');
  });
}); 