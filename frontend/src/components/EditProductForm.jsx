import axios from "axios";
import { useProductsContext } from "../hooks/useProductsContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditProductForm = ({ product, onClose }) => {
  const { dispatch } = useProductsContext();

  const formik = useFormik({
    initialValues: {
      newName: "",
      newQuantity: "",
      newPrice: "",
    },

    validationSchema: Yup.object({
      newName: Yup.string()
        .max(20, "Name must be less than 20 characters*")
        .required("Name is required*"),
      newQuantity: Yup.number().required("Quantity is required*"),
      newPrice: Yup.number().required("Price is required*"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const newProduct = {
        ...product,
        name: values.newName,
        quantity: values.newQuantity,
        price: values.newPrice,
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        newProduct
      );
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
      onClose();
      resetForm();
    },
  });

  return (
    <>
      <form className="editProductForm" onSubmit={formik.handleSubmit}>
        <label
          htmlFor="newName"
          className={
            formik.touched.newName &&
            formik.errors.newName &&
            "requiredErrorLabel"
          }
        >
          {formik.touched.newName && formik.errors.newName
            ? formik.errors.newName
            : "Name:"}
        </label>
        <input
          type="text"
          name="newName"
          id="newName"
          value={formik.values.newName}
          onChange={formik.handleChange}
          placeholder="Enter new name"
          className={
            formik.touched.newName &&
            formik.errors.newName &&
            "requiredErrorInput"
          }
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor="newQuantity"
          className={
            formik.touched.newQuantity &&
            formik.errors.newQuantity &&
            "requiredErrorLabel"
          }
        >
          {formik.touched.newQuantity && formik.errors.newQuantity
            ? formik.errors.newQuantity
            : "Quantity:"}
        </label>
        <input
          type="number"
          name="newQuantity"
          id="newQuantity"
          value={formik.values.newQuantity}
          onChange={formik.handleChange}
          placeholder="Enter new quantity"
          className={
            formik.touched.newQuantity &&
            formik.errors.newQuantity &&
            "requiredErrorInput"
          }
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor="newPrice"
          className={
            formik.touched.newPrice &&
            formik.errors.newPrice &&
            "requiredErrorLabel"
          }
        >
          {formik.touched.newPrice && formik.errors.newPrice
            ? formik.errors.newPrice
            : " Price:"}
        </label>
        <input
          type="number"
          name="newPrice"
          id="newPrice"
          value={formik.values.newPrice}
          onChange={formik.handleChange}
          placeholder="Enter new price"
          className={
            formik.touched.newPrice &&
            formik.errors.newPrice &&
            "requiredErrorInput"
          }
          onBlur={formik.handleBlur}
        />
        <button type="button" className="cancelButton" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Save changes</button>
      </form>
    </>
  );
};
export default EditProductForm;
