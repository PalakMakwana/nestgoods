import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";

const validationSchema = Yup.object({
  farmerName: Yup.string().required("Required"),
  category: Yup.array().min(1, "Select at least one category"),
  mobileNo: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  landSize: Yup.string().required("Required"),
  waterAvailability: Yup.string().required("Required"),
  numCows: Yup.string().required("Required"),
  landUtilization: Yup.string().required("Required"),
  todoList: Yup.array().of(Yup.string().required("Required")),
});

const AddFarmerForm = () => {
  const initialValues = {
    farmerName: "",
    category: [],
    mobileNo: "",
    location: "",
    landSize: "",
    waterAvailability: "",
    numCows: "",
    landUtilization: "",
    todoList: [""],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(collection(db, "FarmerData"), values);
        console.log("Document written with ID: ", docRef.id);
        alert("Data added successfully");
        resetForm();
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding data");
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto lg:w-[150%] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Farmer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className="flex justify-between">
              <div className="mb-4">
                <label
                  htmlFor="farmerName"
                  className="block font-semibold mb-1"
                >
                  Farmer Name:
                </label>
                <Field
                  type="text"
                  id="farmerName"
                  name="farmerName"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="farmerName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Category:</label>
                <div className="flex flex-wrap gap-4">
                  {["Vegetables", "Fruits", "Grains"].map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <Field
                        type="checkbox"
                        name="category"
                        value={category}
                        className="form-checkbox"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label htmlFor="mobileNo" className="block font-semibold mb-1">
                  Mobile No:
                </label>
                <Field
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="mobileNo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block font-semibold mb-1">
                  Location:
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label htmlFor="landSize" className="block font-semibold mb-1">
                  Land Size:
                </label>
                <Field
                  type="text"
                  id="landSize"
                  name="landSize"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="landSize"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="waterAvailability"
                  className="block font-semibold mb-1"
                >
                  Water Availability:
                </label>
                <Field
                  type="text"
                  id="waterAvailability"
                  name="waterAvailability"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="waterAvailability"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label htmlFor="numCows" className="block font-semibold mb-1">
                  Number of Cows:
                </label>
                <Field
                  type="text"
                  id="numCows"
                  name="numCows"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="numCows"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="landUtilization"
                  className="block font-semibold mb-1"
                >
                  Land Utilization:
                </label>
                <Field
                  type="text"
                  id="landUtilization"
                  name="landUtilization"
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="landUtilization"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">To-Do List:</label>
              <FieldArray name="todoList">
                {({ push, remove }) => (
                  <div>
                    {values.todoList.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Field
                          type="text"
                          name={`todoList.${index}`}
                          className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                        <ErrorMessage
                          name={`todoList.${index}`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Add Item
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddFarmerForm;
