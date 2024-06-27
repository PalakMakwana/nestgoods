import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const DisplayFarmer = () => {
  const [farmers, setFarmers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    farmerName: '',
    mobileNo: '',
    location: '',
    landSize: '',
    waterAvailability: '',
    numCows: '',
    landUtilization: '',
    todoList: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "FarmerData"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFarmers(data);
      } catch (error) {
        console.error("Error fetching farmer data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "FarmerData", id));
      setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer.id !== id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleClose = () => {
    setEditMode(false);
  };

  return (
    <div className="container w-[1000px] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-sm font-bold mb-6 text-center">Farmers Data</h2>
      <div className="overflow-x-auto">
        <table className="w-[700px] text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">landSize</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">water</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">numCows</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">land used</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">todoList</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-sm divide-gray-200">
            {farmers.map(farmer => (
              <tr key={farmer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.farmerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.mobileNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.landSize}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.waterAvailability}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.numCows}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.landUtilization}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.todoList}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(farmer.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayFarmer;
