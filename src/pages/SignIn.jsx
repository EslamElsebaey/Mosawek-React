import React , {useContext, useState } from 'react'
import {Link} from "react-router-dom"
import Breadcrumb from './../Components/Breadcrumb';
import { Formik, Form   } from 'formik';
import { ImSpinner8 } from 'react-icons/im';
import {signInSchema} from "./../Components/Schema"
import {  toast , ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../Components/GlobalState';


function SignIn() {
  

const [togglePass, setTogglePass] = useState(true);
let navigation = useNavigate() ;
let {successMessageFunc} = useContext(GlobalStateContext) ; 
let [commonError , setCommonError] = useState("")






function userLogin (values, { setSubmitting, resetForm , setFieldError  }){
  axios.post('https://vm.tasawk.net/rest-api/ecommerce/auth/sign-in',  values , {
    headers: {
      'Accept-Language': 'ar'
  }
  })
  .then(response => {
    localStorage.setItem("mosaweq-new-user" , JSON.stringify(response.data.data.api_token))
    setSubmitting(true)
    toast.success( successMessageFunc("تم تسجيل الدخول بنجاح" , "" , "سيتم الآن توجيهك الى الصفحة الرئيسية" , ""), {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
    setTimeout(() => {
      navigation("/home")
    }, 3000);
  })
  .catch(error => {
    console.log(error)
    if (error.response) {
      console.log(error)
      setSubmitting(false)
      const { data } = error.response;
      // setFieldError("password" , data.message )
      setCommonError(data.message)
      // Object.keys(data.errors).forEach((key) => {
      //   setFieldError(key, data.errors[key][0]);
      // });
    }
  });
 
}


  return (
   <>
     <ToastContainer />
      <Breadcrumb title="  تسجيل الدخول"/>
  <div className="login-section">
    <div className="container">
      <div className="general-form-content">
        <div className="signin-form">
          <h2 className='general-form-content-h2'>تسجيل دخول</h2>
          <Formik
          onSubmit={userLogin}
          initialValues={{
            name : "" , 
            password : ""
          }}
          validationSchema={signInSchema}
          // validate={validate}
          >
            {({isSubmitting, values, handleChange, handleBlur, errors, touched})=> 
            (
              <Form>
              <input
              className={`general-input ${ touched.name && errors.name && "input-error"}`}
               type="text" 
               placeholder='اسم المستخدم'
               value={values.name}
               onChange={handleChange}
               onBlur={handleBlur}
               name="name"
               />
               {errors.name && touched.name && <div className="error">{errors.name}</div>}
                <div className='pass-holder'>
                  <input
                   className={`general-input ${ touched.password && errors.password && "input-error"}`}
                   type={`${togglePass ? "password" : "text"}`} 
                   placeholder='كلمة المرور' 
                   value={values.password}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="password"
                   />
                   
                  <i  onClick={()=>{setTogglePass(!togglePass)}} className={`las ${togglePass ? "la-eye-slash" : "la-eye"}`}></i>
                 
                </div>
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
                <div className='text-danger mt-2'>
                {commonError}
                </div>
                <Link className="ancor-btn forget-text" to="/ForgetPassword">هل نسيت كلمة المرور؟</Link>
                <button
                 className='login-btn general-btn ancor-btn'
                 disabled={isSubmitting}
                 >{!isSubmitting ? "دخول" : <ImSpinner8 size={22} className='spinner' />} </button>
                <Link to="/register" className='ancor-btn general-btn register-newAcc-btn'>تسجيل حساب جديد</Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
 </div>
   
   </>
  )
}

export default SignIn
