import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../Firebase";

const validationSchema = Yup.object().shape({
  ItemName: Yup.string().required("Item Name is required"),
  weightAndPrice: Yup.array()
    .of(
      Yup.object().shape({
        weight: Yup.string().required("Weight is required"),
        price: Yup.number().required("Price is required"),
      })
    )
    .min(1, "At least one weight and price pair must be specified"),
  category: Yup.string().required("Category is required"),
});

const categoryOptions = [
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
  { value: "cereals", label: "Cereals" },
  { value: "pulses", label: "Pulses" },
  { value: "dairy", label: "Dairy" },
];

const ProductForm = ({
  initialValues = {},
  handleSave,
  isEdit,
  handleCloseModal,
}) => {
  const [imageUrl, setImageUrl] = useState(initialValues.image || "");
  const [selectedWeightAndPrice, setSelectedWeightAndPrice] = useState(null);
  const [weightAndPrice, setWeightAndPrice] = useState(
    initialValues.weightAndPrice || [{ id: uuidv4(), weight: "", price: "" }]
  );

  const defaultValues = {
    ItemName: "",
    weightAndPrice: [],
    category: "",
    image: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let updatedValues = { ...values, weightAndPrice };

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
        await addDoc(collection(db, 'ProductData'), updatedValues);
        alert('Product added successfully');
        resetForm();
        setImageUrl('');
        setWeightAndPrice([{ id: uuidv4(), weight: '', price: '' }]);
      }

      handleCloseModal();
    } catch (error) {
      alert('Error saving product');
    }

    setSubmitting(false);
  };

  const handleUploadImage = async (file) => {
    const storage = getStorage();
    const imageRef = ref(storage, `ProductImages/${uuidv4()}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setImageUrl(file);
  };

  const handleWeightAndPriceChange = (index, field, value) => {
    const newWeightAndPrice = [...weightAndPrice];
    newWeightAndPrice[index][field] = value;
    setWeightAndPrice(newWeightAndPrice);
  };

  const addWeightAndPrice = (id) => {
    const selectedPair = weightAndPrice.find(item => item.id === id);
    setSelectedWeightAndPrice(selectedPair);
  };

  const removeWeightAndPrice = (index) => {
    const newWeightAndPrice = weightAndPrice.filter((_, i) => i !== index);
    setWeightAndPrice(newWeightAndPrice);
  };

  return (
    <div className="">
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="space-y-4 overflow-y-scroll h-[470px]">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Item Name
              </label>
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

            <FieldArray name="weightAndPrice">
              {({ push }) => (
                <div className="mt-2 sm:mt-4">
                  <label className="block mb-2 text-sm text-gray-600">Weight and Price</label>
                  <button
                    type="button"
                    onClick={() => {
                      const id = uuidv4();
                      push({ id, weight: '', price: '' });
                      addWeightAndPrice(id); // Track selected pair
                    }}
                    className="bg-[#F58634] p-2 text-lg text-[#FBFFFF] rounded-full"
                  >
                    Add Weight & Price
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 mt-2 sm:mt-4">
                    {values.weightAndPrice.map((detail, index) => (
                      <React.Fragment key={detail.id}>
                        <Field
                          name={`weightAndPrice[${index}].weight`}
                          type="text"
                          placeholder="Weight"
                          className="border-2 border-gray-700 rounded-md p-1"
                        />
                        <Field
                          name={`weightAndPrice[${index}].price`}
                          type="text"
                          placeholder="Price"
                          className="border-2 border-gray-700 rounded-md p-1"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </FieldArray>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Category
              </label>
              <Select
                name="category"
                options={categoryOptions}
                className="w-full p-2 border-2 border-gray-700 rounded"
                onChange={(value) => setFieldValue("category", value.value)}
                value={categoryOptions.find(
                  (option) => option.value === defaultValues.category
                )}
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
                className="w-full p-2 border-2 border-gray-700 rounded"
                onChange={handleImageChange}
              />
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={
                      typeof imageUrl === "string"
                        ? imageUrl
                        : URL.createObjectURL(imageUrl)
                    }
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
    </div>
  );
};

export default ProductForm;
