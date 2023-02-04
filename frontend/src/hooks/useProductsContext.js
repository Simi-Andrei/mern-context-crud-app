import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    console.log(
      "useProductsContext hook must be used within the ProductsContextProvider"
    );
  }

  return context;
};
