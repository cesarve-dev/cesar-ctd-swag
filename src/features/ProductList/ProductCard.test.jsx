import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ProductCard component", () => {
  function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  const testProduct = {
    id: "testId",
    baseName: "Test Product",
    baseDescription: "Test product description",
    handleAddItemToCart: vi.fn((id) => id),
    variants: [{ id: 1 }],
  };

  it('includes an h2 containing "Test Product"', () => {
    render(
      <ProductCard
        key={testProduct.id}
        product={testProduct}
        handleAddItemToCart={testProduct.handleAddItemToCart}
      />
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      testProduct.baseName
    );
  });

  it("button fires callback", async () => {
    const { user } = setup(
      <ProductCard
        key={testProduct.id}
        product={testProduct}
        handleAddItemToCart={testProduct.handleAddItemToCart}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(testProduct.handleAddItemToCart).toHaveBeenCalled();
    vi.clearAllMocks();
  });

  it("callback returns product id", async () => {
    const { user } = setup(
      <ProductCard
        key={testProduct.id}
        product={testProduct}
        handleAddItemToCart={testProduct.handleAddItemToCart}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(testProduct.handleAddItemToCart).toHaveReturnedWith(
      testProduct.variants[0].id
    );
    vi.clearAllMocks();
  });
});
