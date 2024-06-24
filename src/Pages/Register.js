import React from 'react'

const Register = ({ setShowLogin }) => {
  const handleRegisterSuccess = () => {
    setShowLogin(true);
  };
  return (
    <div>
    <div class="h-full ">
      <div class="mx-auto">
        <div class="flex justify-center px-6 ">
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            <div class="w-full  p-5 rounded-lg lg:rounded-l-none">
              <h3 class="py-4 text-2xl text-center ">Create an Account!</h3>
              <form class="px-8 pt-6 pb-8 mb-4 shadow-lg rounded">
                <div class="mb-4 md:flex md:justify-between">
                  <div class="mb-4 md:mr-2 md:mb-0">
                    <label class="block mb-2 text-sm font-bold text-gray-700  " for="firstName">
                                        First Name
                                    </label>
                    <input
                                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700    border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                    />
                  </div>
                  <div class="md:ml-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700  " for="lastName">
                                        Last Name
                                    </label>
                    <input
                                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700    border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block mb-2 text-sm font-bold text-gray-700  " for="email">
                                    Email
                                </label>
                  <input
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700   border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                />
                </div>
                <div class="mb-4 md:flex md:justify-between">
                  <div class="mb-4 md:mr-2 md:mb-0">
                    <label class="block mb-2 text-sm font-bold text-gray-700  " for="password">
                                        Password
                                    </label>
                    <input
                                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700   border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                    />
                    <p class="text-xs italic text-red-500">Please choose a password.</p>
                  </div>
                  <div class="md:ml-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700  " for="c_password">
                                        Confirm Password
                                    </label>
                    <input
                                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700   border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="c_password"
                                        type="password"
                                        placeholder="******************"
                                    />
                  </div>
                </div>
                <div class="mb-6 text-center">
                <button onClick={handleRegisterSuccess}
                                    class="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500  focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Register Account
                                </button>
                </div>
                <hr class="mb-6 border-t" />
                {/* <div class="text-center">
                  <a class="inline-block text-sm text-green-800  align-baseline hover:text-green-600"
                    href="#">
                    Forgot Password?
                  </a>
                </div> */}
                <div class="text-center">
                <a href="#" onClick={() => setShowLogin(true)} className=''>
                    Already have an account? <span className='text-green-700'>Login!</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default Register