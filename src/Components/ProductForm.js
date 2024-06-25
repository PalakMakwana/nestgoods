import{useState}from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, db, imagedb } from "../Firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,getStorage } from "firebase/storage";
import Select from "react-select";
const validationSchema = Yup.object({
  ItemName: Yup.string().required("Item Name is required"),
  weight: Yup.number().required("Weight is required"),
  price: Yup.number().required("Price is required"),
});

const ProductForm = () => {
  const initialValues = {
    imageUrl:"",
    category: "",
    ItemName: "",
    weight: [],
    price: "",
  };

  const [imageUrl, setImageUrl] = useState("");
  const categoryOptions = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "cereals", label: "Cereals" },
    { value: "pulses", label: "pulses" },
    { value: "dairy", label: "dairy" },

  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!imageUrl) {
      alert("Please upload an image");
      return;
    }
  
    try {
      const urlimg = await handleuploadImage(imageUrl);
      const updatedValues = { ...values, image: urlimg };
  
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(collection(db, "ProductData"), updatedValues);
        console.log("document id", docRef.id);
        alert("Product added successfully");
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  
    setSubmitting(false);
  };


  const handleuploadImage = async (file) => {
    const storage = getStorage();
    const storageref = ref(storage, `imgs/${file.name}`);
    await uploadBytes(storageref, file);
    const downloadURL = await getDownloadURL(storageref);
    return downloadURL;
  };



  const weightOptions = [
    { value: "50gm", label: "50gm" },
    { value: "100gm", label: "100gm" },
    { value: "250gm", label: "250gm" },
    { value: "500gm", label: "500gm" },
    { value: "1kg", label: "1 kg" },
    { value: "2kg", label: "2 kg" },
    { value: "3kg", label: "3 kg" },
    { value: "5kg", label: "5 kg" },
    { value: "10kg", label: "10 kg" },
    { value: "1lt", label: "1 lt" },
    { value: "2lt", label: "2 lt" },
    { value: "3lt", label: "3 lt" },
    { value: "5lt", label: "5 lt" },
    { value: "10lt", label: "10 lt" },
  ];
  return (
  <div className="bg-gray-400 m-1 p-5">
      <div className="max-w-md  mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Product Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting,setFieldValue,values }) => (
          <Form className="space-y-4">
              <div>
              <label htmlFor="image" className="text-xl text-gray-900">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="input-field border ml-8 w-52  border-gray-300 rounded-md p-2"
                onChange={(e)=>setImageUrl(e.target.files[0])}
              />
            </div>
<div className="flex  space-x-4">
<div className="flex flex-col">
                <label htmlFor="category" className="mb-1">
                  Category
                </label>
                <Select
                  id="category"
                  name="category"
                  options={categoryOptions}
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={(selectedOption) =>
                    setFieldValue("category", selectedOption.value)
                  }
                  
                  value={categoryOptions.find(
                    (option) => option.value === values.category
                  )}
                />
                </div>

            <div className="flex flex-col">
              <label htmlFor="ItemName" className="mb-1">
                Item Name
              </label>
              <Field
                type="text"
                id="ItemName"
                name="ItemName"
                className="border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="ItemName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

</div>
            <div className="flex flex-col">
                <label htmlFor="weight" className="mb-1">
                  Weight
                </label>
                <Select
                  id="weight"
                  name="weight"
                  options={weightOptions}
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      "weight",
                      selectedOptions.map((option) => option.value)
                    )
                  }
                  value={values.weight.map((w) =>
                    weightOptions.find((option) => option.value === w)
                  )}
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="mb-1">
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  );
};

export default ProductForm;
