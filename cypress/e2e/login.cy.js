// Import necessary commands and assertions
/// <reference types="cypress" />
const LoginPage = require("../pages/login");

describe("Accessing the login page", () => {
    beforeEach(() => {
        // load user data from fixtures
        cy.fixture("users").as("users");

        // clear the browser cookies
        cy.clearCookies();

        // clear the browser local storage
        cy.clearLocalStorage();
    });

    it("Should login with empty credentials", () => {
        // Access the login page and submit the form
        LoginPage.visit();
        LoginPage.submit();

        // Assert that the error message is displayed
        // LoginPage.errorMessage.should("be.visible");

        // Assert that the error message contains the correct text
        LoginPage.errorMessage.should(
            "contain.text",
            "A login and a password are required."
        );
    });

    it("Should fail to login with invalid credentials", () => {
        // Access the login page and fill the form
        cy.get("@users").then((users) => {
            cy.login(users.invalidUser.email, users.invalidUser.password);
        });

        // Assert that the error message is displayed
        cy.get('.message-error').should('be.visible')

        // Assert that the error message contains the correct text
        LoginPage.errorMessage.should(
            "contain.text",
            "The account sign-in was incorrect"
        );
    });

    it("Should fail to login with correct email and invalid password", () => {
        // Access the login page and fill the form
        cy.get("@users").then((users) => {
            cy.login(users.validUser.email, users.invalidUser.password);
        });

        // Assert that the error message is displayed
        LoginPage.errorMessage.should("be.visible");

        // Assert that the error message contains the correct text
        LoginPage.errorMessage.should(
            "contain.text",
            "The account sign-in was incorrect"
        );
    });

    it("Should fail to login with invalid email and correct password", () => {
        // Access the login page and fill the form
        cy.get("@users").then((users) => {
            cy.login(users.invalidUser.email, users.validUser.password);
        });

        // Assert that the error message is displayed
        LoginPage.errorMessage.should("be.visible");

        // Assert that the error message contains the correct text
        LoginPage.errorMessage.should(
            "contain.text",
            "The account sign-in was incorrect"
        );
    });

    it("Should login with valid credentials", () => {
        // Access the login page and fill the form
        cy.get("@users").then((users) => {
            cy.login(users.validUser.email, users.validUser.password);
        });

        // Assert that the user is redirected to the My Account page
        cy.title().should("eq", "My Account");
    });
});