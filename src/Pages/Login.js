import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { auth,db } from "../Firebase";
import toast from 'react-hot-toast'
import { doc, getDoc } from 'firebase/firestore';

function Login({ setShowLogin }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const isAdmin = await checkAdminStatus(user.uid);

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (error) {
      console.error("Error signing in:", error.message);

    }
  };
  const checkAdminStatus = async (uid) => {
    try {
      const docSnapshot = await getDoc(doc(db, 'users', uid));
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        return userData.roles === 'admin';
      } else {

        return false;
      }
    } catch (error) {
      console.error('Error checking admin status:', error);

      return false;
    }
  };


  return (
    <div>
      <div className="contain py-16 bg-cover " style={{backgroundImage:"url('https://img.freepik.com/free-photo/top-view-copy-space-grapefruit-with-oranges-lemons-basket-white-background_141793-49666.jpg?w=740&t=st=1719377311~exp=1719377911~hmac=c68395f102a6ac8684030563113fbb136be3a054692f83c2a6fe0260844b9ca8')", }}>
        <div className="max-w-lg mx-auto bg-white shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form autoComplete="off">
              <div className="space-y-2">
                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                  <Field
                    name="email"
                    type="email"
                    className="block w-full border-2 border-gray-700 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                    placeholder="youremail@domain.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      className="block w-full border-2 border-gray-700 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                      placeholder="***********"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="block w-full py-2 text-center text-white bg-green-700 border border-teal-500 rounded hover:bg-green-600 hover:text-black transition uppercase font-roboto font-medium">
                  Login
                </button>
                <div className="flex gap-2 pt-5">
                  <p className="text-gray-600 text-sm">Don't have an account?</p>
                  <button onClick={() => setShowLogin(false)} className="text-green-700 hover:text-blue-500">Register here</button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
