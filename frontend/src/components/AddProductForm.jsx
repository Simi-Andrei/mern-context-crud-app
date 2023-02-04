import axios from "axios";
import { useProductsContext } from "../hooks/useProductsContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProductForm = () => {
  const { dispatch } = useProductsContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be less than 20 characters*")
        .required("Name is required*"),
      quantity: Yup.number().required("Quantity is required*"),
      price: Yup.number().required("Price is required*"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const createdProduct = {
        name: values.name,
        quantity: values.quantity,
        price: values.price,
      };
      const { data } = await axios.post("/api/products", createdProduct);
      dispatch({ type: "CREATE_PRODUCT", payload: data });
      resetForm();
    },
  });

  return (
    <>
      <form className="addProductForm" onSubmit={formik.handleSubmit}>
        <label
          htmlFor="name"
          className={
            formik.touched.name && formik.errors.name && "requiredErrorLabel"
          }
        >
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : "Name:"}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter new name"
          className={
            formik.touched.name && formik.errors.name && "requiredErrorInput"
          }
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor="quantity"
          className={
            formik.touched.quantity &&
            formik.errors.quantity &&
            "requiredErrorLabel"
          }
        >
          {formik.touched.quantity && formik.errors.quantity
            ? formik.errors.quantity
            : "Quantity:"}
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          placeholder="Enter new name"
          className={
            formik.touched.quantity &&
            formik.errors.quantity &&
            "requiredErrorInput"
          }
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor="price"
          className={
            formik.touched.price && formik.errors.price && "requiredErrorLabel"
          }
        >
          {formik.touched.price && formik.errors.price
            ? formik.errors.price
            : "Price:"}
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          placeholder="Enter new name"
          className={
            formik.touched.price && formik.errors.price && "requiredErrorInput"
          }
          onBlur={formik.handleBlur}
        />
        <button type="submit">Add product</button>
      </form>
    </>
  );
};
export default AddProductForm;
