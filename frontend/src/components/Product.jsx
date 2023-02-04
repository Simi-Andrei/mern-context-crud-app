import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useProductsContext } from "../hooks/useProductsContext";
import axios from "axios";
import EditModal from "./EditModal";

const Product = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { dispatch } = useProductsContext();

  const deleteHandler = async () => {
    const { data } = await axios.delete(`/api/products/${product._id}`);
    dispatch({ type: "DELETE_PRODUCT", payload: data });
  };

  return (
    <div className="productCardContainer">
      <div className="productCard">
        <div>
          <strong>{product.name}</strong>
          <p>
            Quantity (kg): <strong>{product.quantity}</strong>
          </p>
          <p>
            Price (per kg): <strong>${product.price}</strong>
          </p>
          <p>
            Total price: <strong>${product.quantity * product.price}</strong>
          </p>
        </div>
        <div className="productCardActions">
          <button type="button" onClick={() => setModalOpen(true)}>
            <FaEdit />
          </button>
          <button onClick={deleteHandler}>
            <FaTrash />
          </button>
        </div>
      </div>
      <span>Added to list on: {product.createdAt.substring(0, 10)}</span>
      {modalOpen && (
        <EditModal onClose={() => setModalOpen(false)} product={product} />
      )}
    </div>
  );
};
export default Product;
