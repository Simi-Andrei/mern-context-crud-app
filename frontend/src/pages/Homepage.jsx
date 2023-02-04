import { useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import AddProductForm from "../components/AddProductForm";
import { useProductsContext } from "../hooks/useProductsContext";

const Homepage = () => {
  const { dispatch, products } = useProductsContext();

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axios.get("/api/products");
      dispatch({ type: "GET_ALL_PRODUCTS", payload: data });
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="productsListContainer">
          <h3>Your grocery list!</h3>
          <div className="productsList">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>
        <div className="addProductFormContainer">
          <h3>Add product!</h3>
          <AddProductForm />
        </div>
      </section>
    </>
  );
};
export default Homepage;
