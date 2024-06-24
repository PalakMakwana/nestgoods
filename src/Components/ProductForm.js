import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, imagedb } from "../Firebase";
import { v4 } from "uuid";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductForm({ postId, values, handleClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      setUsername("Unknown");
    }
  }, []);

  const initialValues = {
    category: values?.category || "",
    item: values?.item || "",
    date: new Date().toISOString().slice(0, 10),
    description: values?.description || "",
    weights: values?.weights || [],
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
    item: Yup.string().required("Item is required"),
    description: Yup.string().required("Description is required"),
    weights: Yup.array().min(1, "Select at least one weight"),
  });

  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageRef = ref(imagedb, `imgs/${v4()}`);

      uploadBytes(imageRef, file).then((resp) => {
        getDownloadURL(resp.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!imageUrl) {
      alert("Please upload an image");
      setSubmitting(false);
      return;
    }

    try {
      const user = await auth.currentUser;
      if (user) {
        const data = {
          ...values,
          date: new Date().toISOString().slice(0, 10),
          image: imageUrl,
          uid: user.uid,
          username: username,
        };

        if (postId) {
          await updateDoc(doc(db, "AddBlog", postId), data);
          alert("Blog post updated successfully");
        } else {
          await addDoc(collection(db, "AddBlog"), data);
          alert("Blog post added successfully");
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save changes");
    }

    setSubmitting(false);
  };

  const weightOptions = [
    { value: "50gm", label: "50gm" },
    { value: "100gm", label: "100gm" },
    { value: "250gm", label: "250kg" },
    { value: "500gm", label: "500gm" },
    { value: "1kg", label: "1 kg" },
    { value: "2kg", label: "2 kg" },
    { value: "3kg", label: "3 kg" },
    { value: "5kg", label: "5 kg" },
    { value: "10kg", label: "10 kg" },
  ];

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-3">
        <div className="mt-0">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Add Product Details
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="image" className="text-xl text-gray-900">
                      Upload Image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="input-field border ml-8 w-52 border-gray-300 rounded-md p-2"
                      onChange={(e) => {
                        handleUploadImage(e);
                        setFieldValue("image", e.target.files[0]);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="text-xl text-gray-900 mr-10"
                    >
                      Select Category
                    </label>
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="input-field border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select Category</option>
                      <option value="food">Fruit</option>
                      <option value="travel">Vegetables</option>
                      <option value="tech">Pulses</option>
                      <option value="tech">Cereals</option>
                      <option value="tech">Dairy</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="item"
                      className="text-xl text-gray-900 mr-5"
                    >
                      Item name
                    </label>
                    <Field
                      type="text"
                      id="item"
                      name="item"
                      className="input-field border border-gray-300 ml-5 rounded-md p-2"
                      placeholder="item"
                    />
                    <ErrorMessage
                      name="item"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="weights"
                      className="text-xl text-gray-900 mr-5"
                    >
                      Product Weights
                    </label>
                    <Select
                      id="weights"
                      name="weights"
                      options={weightOptions}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          "weights",
                          selectedOptions.map((option) => option.value)
                        )
                      }
                    />
                    <ErrorMessage
                      name="weights"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-gray-800 ml-96 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Add Products
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
