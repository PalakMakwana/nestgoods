import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc,setDoc, doc } from 'firebase/firestore';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Firebase from '../Firebase';
import toast from 'react-hot-toast'
const Register = ({ setShowLogin }) => {
  const auth = getAuth();
  const db = getFirestore();

  const handleRegisterSuccess = () => {
    setShowLogin(true);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    mobile: Yup.string().required('Required'),
    pass: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confpass: Yup.string().oneOf([Yup.ref('pass'), null], 'Passwords must match').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.pass);
      // const user = auth.currentUser;
      const user= userCredential.user;

      // const userId = uuidv4();
await updateProfile(user, {displayName:values.username})

      await setDoc(doc(db, 'users',user.uid), {
        uid: user.uid,
        username: values.username,
        email: values.email,
        mobile: values.mobile,
      });
localStorage.setItem("username",values.username)

toast.success('register successfully')
      handleRegisterSuccess();
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(error.message)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mx-auto">
        <div className="flex justify-center px-6">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center">Create an Account!</h3>
              <Formik
                initialValues={{
                  username: '',
                  mobile: '',
                  email: '',
                  pass: '',
                  confpass: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="px-8 pt-6 pb-8 mb-4 shadow-lg rounded">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                        Username
                      </label>
                      <Field
                        name="username"
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                      />
                      <ErrorMessage name="username" component="div" className="text-xs italic text-red-500" />
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="mobile">
                        Mobile
                      </label>
                      <Field
                        name="mobile"
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Mobile"
                      />
                      <ErrorMessage name="mobile" component="div" className="text-xs italic text-red-500" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-xs italic text-red-500" />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="pass">
                        Password
                      </label>
                      <Field
                        name="pass"
                        type="password"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="******************"
                      />
                      <ErrorMessage name="pass" component="div" className="text-xs italic text-red-500" />
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confpass">
                        Confirm Password
                      </label>
                      <Field
                        name="confpass"
                        type="password"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="******************"
                      />
                      <ErrorMessage name="confpass" component="div" className="text-xs italic text-red-500" />
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                    >
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a href="#" onClick={() => setShowLogin(true)} className="">
                      Already have an account? <span className="text-green-700">Login!</span>
                    </a>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
