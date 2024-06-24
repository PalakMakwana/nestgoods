import React, { useState } from 'react';

const AddFarmerForm = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    category: [],
    mobileNo: '',
    location: '',
    landSize: '',
    waterAvailability: '',
    numCows: '',
    landUtilization: '',
    todoList: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        category: [...formData.category, value],
      });
    } else {
      setFormData({
        ...formData,
        category: formData.category.filter((item) => item !== value),
      });
    }
  };

  const handleTodoChange = (e, index) => {
    const { value } = e.target;
    const updatedTodoList = [...formData.todoList];
    updatedTodoList[index] = value;
    setFormData({
      ...formData,
      todoList: updatedTodoList,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log(formData);
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Farmer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="farmerName" className="block font-semibold mb-1">Farmer Name:</label>
          <input type="text" id="farmerName" name="farmerName" value={formData.farmerName} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category:</label>
          <div>
            <label htmlFor="category1" className="mr-4">
              <input type="checkbox" id="category1" name="category" value="Vegetables" onChange={handleCategoryChange} className="mr-2" />
              Vegetables
            </label>
            <label htmlFor="category2" className="mr-4">
              <input type="checkbox" id="category2" name="category" value="Fruits" onChange={handleCategoryChange} className="mr-2" />
              Fruits
            </label>
            <label htmlFor="category3" className="mr-4">
              <input type="checkbox" id="category3" name="category" value="Grains" onChange={handleCategoryChange} className="mr-2" />
              Grains
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNo" className="block font-semibold mb-1">Mobile No:</label>
          <input type="text" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-semibold mb-1">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="landSize" className="block font-semibold mb-1">Land Size:</label>
          <input type="text" id="landSize" name="landSize" value={formData.landSize} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="waterAvailability" className="block font-semibold mb-1">Water Availability:</label>
          <input type="text" id="waterAvailability" name="waterAvailability" value={formData.waterAvailability} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="numCows" className="block font-semibold mb-1">Number of Cows:</label>
          <input type="text" id="numCows" name="numCows" value={formData.numCows} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="landUtilization" className="block font-semibold mb-1">Land Utilization:</label>
          <input type="text" id="landUtilization" name="landUtilization" value={formData.landUtilization} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">To-Do List:</label>
          {formData.todoList.map((item, index) => (
            <input key={index} type="text" value={item} onChange={(e) => handleTodoChange(e, index)} className="w-full border rounded-md px-3 py-2 mb-2" />
          ))}
          <button type="button" onClick={() => setFormData({ ...formData, todoList: [...formData.todoList, ''] })} className="bg-blue-500 text-white px-3 py-1 rounded-md">Add Item</button>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default AddFarmerForm;
