class HomePage {
    visit() {
        cy.visit("https://magento.softwaretestingboard.com/");
    }

    get loginButton() {
        return cy.get("a").contains("Sign In");
    }

    get uiMenuItems() {
        return cy.get(".ui-menu-item");
    }
}

module.exports = new HomePage();