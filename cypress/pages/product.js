class ProductPage {
    visitWhatsNew() {
        cy.visit("https://magento.softwaretestingboard.com/what-is-new.html");
    }

    get productItems() {
        return cy.get(".product-item");
    }

    get addToCartButton() {
        return cy.get("#product-addtocart-button");
    }

    getAttributeCode(code) {
        return cy.get(`[attribute-code="${code}"]`);
    }

    get quantity() {
        return cy.get("#qty");
    }

    get quantityError() {
        return cy.get("#qty-error");
    }
}

module.exports = new ProductPage();