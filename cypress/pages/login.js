class LoginPage {
    visit() {
        cy.visit(
            "https://magento.softwaretestingboard.com/customer/account/login/"
        );
    }

    fillEmail(value) {
        const field = cy.get("#email");
        field.clear();
        field.type(value);
        return this;
    }

    fillPassword(value) {
        const field = cy.get("#pass");
        field.clear();
        field.type(value);
        return this;
    }

    submit() {
        const button = cy.get("#send2");
        button.click();
    }

    clickCreateAccount() {
        const button = cy.get("a[href*='account/create']");
        this.createAccountButton.click();
    }

    get errorMessage() {
        return cy.get(".message-error");
    }

    get emailError() {
        return cy.get("#email-error");
    }

    get passwordError() {
        return cy.get("#pass-error");
    }

    get createAccountButton() {
        return cy.get("a[href*='account/create']");
    }
}

module.exports = new LoginPage();