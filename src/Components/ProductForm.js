import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { auth, db, imagedb } from "../Firebase";
import { v4 } from "uuid";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Select from "react-select";

const validationSchema = Yup.object({
  ItemName: Yup.string().required("Item Name is required"),
  weight: Yup.array().of(Yup.string()).required("Weight is required"),
  price: Yup.number().required("Price is required"),
});

const ProductForm = ({ initialValues = {}, handleSave, isEdit,handleCloseModal }) => {
  const [imageUrl, setImageUrl] = useState(initialValues.image || "");
  const [priceMap, setPriceMap] = useState({
    "50g": 10,
    "250g": 50,
    "500g": 100,
    "1kg": 300,
    "2kg": 500,
    "3kg": 700,
    "5kg": 800,
    "10kg": 1000,
  });

  const categoryOptions = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "cereals", label: "Cereals" },
    { value: "pulses", label: "Pulses" },
    { value: "dairy", label: "Dairy" },
  ];

  const defaultValues = {
    ItemName: "",
    weight: [],
    price: "",
    category: "",
    image: "",
  };

  const formInitialValues = {
    ...defaultValues,
    ...initialValues,
    weight: Array.isArray(initialValues.weight) ? initialValues.weight : [],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let updatedValues = { ...values };

      if (imageUrl && imageUrl !== initialValues.image) {
        const urlimg = await handleUploadImage(imageUrl);
        updatedValues = { ...values, image: urlimg };
      } else {
        updatedValues.image = initialValues.image;
      }

      if (isEdit) {
        updatedValues.id = initialValues.id;
        await handleSave(updatedValues);
      } else {
        await addDoc(collection(db, "ProductData"), updatedValues);
        alert("Product added successfully");
        resetForm();
        setImageUrl("");
      }
      handleCloseModal();
    } catch (error) {
      // console.error("Error saving product: ", error);
      alert("Error saving product");
    }
    setSubmitting(false);
  };

  const handleUploadImage = async (file) => {
    const storage = getStorage();
    const imageRef = ref(storage, `ProductImages/${v4()}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setImageUrl(file);
  };

  const handleWeightChange = (selectedOptions, setFieldValue) => {
    const selectedWeights = selectedOptions.map((option) => option.value);

    const selectedWeight = selectedWeights[0];
    const selectedPrice = priceMap[selectedWeight];
    setFieldValue("price", selectedPrice);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Item Name</label>
            <Field
              name="ItemName"
              type="text"
              className="w-full p-2 border-2 border-gray-700 rounded"
            />
            <ErrorMessage
              name="ItemName"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-gray-700  font-bold mb-2">Weight</label>
            <Select
              name="weight"
              options={[
                { value: "50g", label: "50g" },
                { value: "100g", label: "100g" },
                { value: "250g", label: "250g" },
                { value: "500g", label: "500g" },
                { value: "1kg", label: "1kg" },
                { value: "2kg", label: "2kg" },
                { value: "3kg", label: "3kg" },
                { value: "5kg", label: "5kg" },
                { value: "10kg", label: "10kg" },
              ]}
              isMulti
              className="w-full p-2 border-2 border-gray-700 rounded"
              onChange={(value) => {
                setFieldValue("weight", value.map((v) => v.value));
                handleWeightChange(value, setFieldValue);
              }}
              value={values.weight.map((w) => ({
                value: w,
                label: w,
              }))}
            />
            <ErrorMessage
              name="weight"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <Field
              name="price"
              type="number"
              className="w-full p-2 border-2 border-gray-700 rounded"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <Select
              name="category"
              options={categoryOptions}
              className="w-full p-2 border-2 border-gray-700  rounded"
              onChange={(value) => setFieldValue("category", value.value)}
              value={categoryOptions.find((option) => option.value === values.category)}
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full p-2 border-2 border-gray-700  rounded"
              onChange={handleImageChange}
            />
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={typeof imageUrl === "string" ? imageUrl : URL.createObjectURL(imageUrl)}
                  alt="Product Preview"
                  className="w-full h-24 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
