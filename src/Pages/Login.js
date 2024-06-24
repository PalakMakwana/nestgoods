import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
function Login({setShowLogin}) {
  const navigate = useNavigate('')
    return (
    <div>
      <div class="contain py-16">
  <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
    <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
    <p class="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>
    <form autocomplete="off">
      <p class="text-red-500"></p>
      <div class="space-y-2">
        <div><label for="email" class="text-gray-600 mb-2 block"></label>Email address<input type="email" name="email" id="email" class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400" placeholder="youremail.@domain.com"/>
        </div>
      </div>
      <div class="space-y-2">
        <div><label for="password" class="text-gray-600 mb-2 block"></label>Password<div class="relative"><input type="password" name="password" id="password" class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400" placeholder="***********"/>
            <div
              class="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <button type="submit" onClick={()=>navigate('/products')} class="block w-full py-2 text-center text-white bg-green-700 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium">Login</button>
        <div class="flex gap-2 pt-5">
          <p class="text-gray-600 text-sm">Don't have an account?</p>
          <button onClick={() => setShowLogin(false)} className='text-green-700  hover:text-blue-500'>Register here</button>
        </div>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}

export default Login