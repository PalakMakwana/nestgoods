import {useState} from 'react'
import Sidebar from '../Components/Sidebar'
import ProductForm from '../Components/ProductForm'
import Dashboard from '../Components/Dashboard'
import Productfromdata from '../Components/Productfromdata'
import AddFarmerForm from '../Components/AddFarmerForm'
import DisplayFarmer from '../Components/DisplayFarmer'
function Admin() {
    const [dashboard , setDashboard]= useState(true)
    const [farmer , setFarmer]= useState(false)
    const [ product, setProduct]= useState(false)
    const [productsdata , setproductsdata]= useState(false)


    const toggleDashboard=()=>{
        setDashboard(!dashboard)
        setFarmer(false)
        setProduct(false)
        setproductsdata(false)
    }
    const toggleFarmer=()=>{
        setDashboard(false)
        setFarmer(!farmer)
        setProduct(false)
        setproductsdata(false)
    }
    const toggleProducts=()=>{
        setDashboard(false)
        setFarmer(false)
        setProduct(!product)
        setproductsdata(false)
    }
    const toggleData=()=>{
        setDashboard(false)
        setFarmer(false)
        setProduct(false)
        setproductsdata(!productsdata)
    }
  
    return (
    <div className='flex space-x-10'>
       <div> <Sidebar 
       toggleDashboard={toggleDashboard}
       toggleFarmer={toggleFarmer}
       toggleProducts={toggleProducts}
       toggleData={toggleData}
       /></div>
    <div>
{dashboard &&  (<div class="text-gray-900 ">
    <div class="p-4 flex">
        <h1 class="text-3xl">Users</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
<DisplayFarmer/>
    </div>
</div>)} 
{farmer&&(<div><AddFarmerForm/></div>)}
{product&&(
   <>
    <div>

       {/* <ProductForm/> */}
      </div>
      <div>
          <Dashboard/>
          </div></>
)}
{productsdata&&(
    <div>

    </div>
)}
</div>
    </div>
  )
}

export default Admin