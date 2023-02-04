import EditProductForm from "./EditProductForm";
import { GrFormClose } from "react-icons/gr";

const EditModal = ({ product, onClose }) => {
  return (
    <div className="editModal">
      <div className="modalContainer">
        <h3>Edit product!</h3>
        <p>({product.name})</p>
        <GrFormClose onClick={onClose} className="editModalCloseIcon" />
        <EditProductForm onClose={onClose} product={product} />
      </div>
    </div>
  );
};
export default EditModal;
