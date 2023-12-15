// Import necessary commands and assertions
/// <reference types="cypress" />
const HomePage = require("../pages/home");
const ProductPage = require("../pages/product");

describe("Accessing the product page", () => {
    beforeEach(() => {
        // Access the home page
        HomePage.visit();

        // Select the first item from the menu
        HomePage.uiMenuItems.eq(0).click();
    });

    it("Product items should be visible", () => {
        // Assert that the product items are visible
        ProductPage.productItems.should("be.visible");
    });

    it("Should display the correct product page", () => {
        // Select the first product item
        ProductPage.productItems
            .get(".product-item-link")
            .eq(0)
            .then(($productItem) => {
                const productName = $productItem.text().trim();
                cy.wrap(productName).as("productName");
            });
        ProductPage.productItems.get(".product-item-link").eq(0).click();

        // Assert that the product page is correct
        cy.get("@productName").then((productName) => {
            cy.title().should("include", productName);
        });
    });
});

describe("Adding a product to the cart", () => {
    beforeEach(() => {
        // Access the what's new page
        ProductPage.visitWhatsNew();

        // Select the first product item
        ProductPage.productItems.get(".product-item-link").eq(0).click();
    });

    it("Should fail to add the product to the cart without selecing a size and color", () => {
        // Add the product to the cart
        ProductPage.addToCartButton.click();

        // Assert that the error message is displayed
        ProductPage.getAttributeCode("size")
            .find(".mage-error")
            .should("be.visible");
        ProductPage.getAttributeCode("color")
            .find(".mage-error")
            .should("be.visible");
    });

    it("Should fail to add the product to the cart after selecting a size but not a color", () => {
        // Select the size
        ProductPage.getAttributeCode("size").click();
        ProductPage.getAttributeCode("size")
            .find(".swatch-option")
            .eq(0)
            .then(($size) => {
                const size = $size.attr("option-label");
                cy.wrap(size).as("size");
            });
        ProductPage.getAttributeCode("size").find(".swatch-option").eq(0).click();
        cy.get("@size").then((size) => {
            ProductPage.getAttributeCode("size")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", size);
        });

        // Add the product to the cart
        ProductPage.addToCartButton.click();

        // Assert that the error message is displayed
        ProductPage.getAttributeCode("color")
            .find(".mage-error")
            .should("be.visible");
    });

    it("Should fail to add the product to the cart after selecting a color but not a size", () => {
        // Select the color
        ProductPage.getAttributeCode("color").click();
        ProductPage.getAttributeCode("color")
            .find(".swatch-option")
            .eq(0)
            .then(($color) => {
                const color = $color.attr("option-label");
                cy.wrap(color).as("color");
            });
        ProductPage.getAttributeCode("color").find(".swatch-option").eq(0).click();
        cy.get("@color").then((color) => {
            ProductPage.getAttributeCode("color")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", color);
        });

        // Add the product to the cart
        ProductPage.addToCartButton.click();

        // Assert that the error message is displayed
        ProductPage.getAttributeCode("size")
            .find(".mage-error")
            .should("be.visible");
    });

    it("Should fail to add the product to the cart after selecting a size and color but with zero a quantity", () => {
        // Select the size
        ProductPage.getAttributeCode("size").click();
        ProductPage.getAttributeCode("size")
            .find(".swatch-option")
            .eq(0)
            .then(($size) => {
                const size = $size.attr("option-label");
                cy.wrap(size).as("size");
            });
        ProductPage.getAttributeCode("size").find(".swatch-option").eq(0).click();
        cy.get("@size").then((size) => {
            ProductPage.getAttributeCode("size")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", size);
        });

        // Select the color
        ProductPage.getAttributeCode("color").click();
        ProductPage.getAttributeCode("color")
            .find(".swatch-option")
            .eq(0)
            .then(($color) => {
                const color = $color.attr("option-label");
                cy.wrap(color).as("color");
            });
        ProductPage.getAttributeCode("color").find(".swatch-option").eq(0).click();
        cy.get("@color").then((color) => {
            ProductPage.getAttributeCode("color")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", color);
        });

        // Clear the quantity field and add the product to the cart
        ProductPage.quantity.clear();
        ProductPage.addToCartButton.click();

        // Assert that the error message is displayed
        ProductPage.quantityError.should("be.visible");

        // Fill the quantity field with zero and add the product to the cart
        ProductPage.quantity.type("0");
        ProductPage.addToCartButton.click();

        // Assert that the error message is displayed
        ProductPage.quantityError.should("be.visible");
    });

    it("Should add the product to the cart after selecting a size, color and quantity", () => {
        // Select the size
        ProductPage.getAttributeCode("size").click();
        ProductPage.getAttributeCode("size")
            .find(".swatch-option")
            .eq(0)
            .then(($size) => {
                const size = $size.attr("option-label");
                cy.wrap(size).as("size");
            });
        ProductPage.getAttributeCode("size").find(".swatch-option").eq(0).click();
        cy.get("@size").then((size) => {
            ProductPage.getAttributeCode("size")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", size);
        });

        // Select the color
        ProductPage.getAttributeCode("color").click();
        ProductPage.getAttributeCode("color")
            .find(".swatch-option")
            .eq(0)
            .then(($color) => {
                const color = $color.attr("option-label");
                cy.wrap(color).as("color");
            });
        ProductPage.getAttributeCode("color").find(".swatch-option").eq(0).click();
        cy.get("@color").then((color) => {
            ProductPage.getAttributeCode("color")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", color);
        });

        // Fill the quantity field and add the product to the cart
        ProductPage.quantity.clear();
        ProductPage.quantity.type("2");
        ProductPage.addToCartButton.click();

        // Assert that the success message is displayed
        cy.get(".message-success").should("be.visible");
    });
});

describe("Adding multiple products to the cart", () => {
    beforeEach(() => {
        // Access the what's new page
        ProductPage.visitWhatsNew();
    });

    it("Should add multiple products to the cart", () => {
        // Select the first product item
        ProductPage.productItems.get(".product-item-link").eq(0).click();

        // Select the size
        ProductPage.getAttributeCode("size").click();
        ProductPage.getAttributeCode("size")
            .find(".swatch-option")
            .eq(0)
            .then(($size) => {
                const size = $size.attr("option-label");
                cy.wrap(size).as("size");
            });
        ProductPage.getAttributeCode("size").find(".swatch-option").eq(0).click();
        cy.get("@size").then((size) => {
            ProductPage.getAttributeCode("size")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", size);
        });

        // Select the color
        ProductPage.getAttributeCode("color").click();
        ProductPage.getAttributeCode("color")
            .find(".swatch-option")
            .eq(0)
            .then(($color) => {
                const color = $color.attr("option-label");
                cy.wrap(color).as("color");
            });
        ProductPage.getAttributeCode("color").find(".swatch-option").eq(0).click();
        cy.get("@color").then((color) => {
            ProductPage.getAttributeCode("color")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", color);
        });

        // Fill the quantity field and add the product to the cart
        ProductPage.quantity.clear();
        ProductPage.quantity.type("2");
        ProductPage.addToCartButton.click();

        // Assert that the success message is displayed
        cy.get(".message-success").should("be.visible");

        // Access the what's new page
        ProductPage.visitWhatsNew();
        // Select the second product item
        ProductPage.productItems.get(".product-item-link").eq(1).click();

        // Select the size
        ProductPage.getAttributeCode("size").click();
        ProductPage.getAttributeCode("size")
            .find(".swatch-option")
            .eq(0)
            .then(($size) => {
                const size = $size.attr("option-label");
                cy.wrap(size).as("size");
            });
        ProductPage.getAttributeCode("size").find(".swatch-option").eq(0).click();
        cy.get("@size").then(
            (
                size // eslint-disable-line no-shadow
            ) => {
                ProductPage.getAttributeCode("size")
                    .find(".swatch-attribute-selected-option")
                    .should("contain.text", size);
            }
        );

        // Select the color
        ProductPage.getAttributeCode("color").click();
        ProductPage.getAttributeCode("color")
            .find(".swatch-option")
            .eq(0)
            .then(($color) => {
                const color = $color.attr("option-label");
                cy.wrap(color).as("color");
            });

        ProductPage.getAttributeCode("color").find(".swatch-option").eq(0).click();
        cy.get("@color").then((color) => {
            ProductPage.getAttributeCode("color")
                .find(".swatch-attribute-selected-option")
                .should("contain.text", color);
        });

        // Fill the quantity field and add the product to the cart
        ProductPage.quantity.clear();
        ProductPage.quantity.type("1");
        ProductPage.addToCartButton.click();

        // Assert that the success message is displayed
        cy.get(".message-success").should("be.visible");

        // Validate the cart quantity
        cy.get(".counter-number").should("contain.text", "3");
    });
});