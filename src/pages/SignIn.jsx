import React , {useState } from 'react'
import {Link , useNavigate} from "react-router-dom"
import Breadcrumb from './../Components/Breadcrumb';
import { Formik, Form   } from 'formik';
import { ImSpinner8 } from 'react-icons/im';
import {SignInSchema} from "./../Components/Schema"
import {  toast , ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ecommerceAPI} from "../API/axios-custom"
import {useSuccessMsgStore } from "../Global_state/Zustand_Store"




function SignIn() {
  
let schema = SignInSchema() ;

const { t : translate } = useTranslation();


const [togglePass, setTogglePass] = useState(true);
let navigation = useNavigate();
let {successMessageFunc} = useSuccessMsgStore()
 
let [commonError , setCommonError] = useState("")






function userLogin (values, { setSubmitting, resetForm , setFieldError  }){
  
  ecommerceAPI.post('/auth/sign-in',  values )
  .then(response => {
    localStorage.setItem("mosaweq-new-user" , JSON.stringify(response.data.data.api_token))
    setSubmitting(true)
    toast.success( successMessageFunc(translate("login/loginSuccessMsg") , "" ,translate("redirectToHomePage")  , ""), {
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
      <Breadcrumb title={translate("breadcrumb/Signin/title")}/>
  <div className="login-section">
    <div className="container">
      <div className="general-form-content">
        <div className="signin-form">
          <h2 className='general-form-content-h2'> {translate("breadcrumb/Signin/title")}</h2>
          <Formik
          onSubmit={userLogin}
          initialValues={{
            name : "" , 
            password : ""
          }}
          validationSchema={schema}
          // validate={validate}
          >
            {({isSubmitting, values, handleChange, handleBlur, errors, touched})=> 
            (
              <Form>
              <input
              className={`general-input ${ touched.name && errors.name && "input-error"}`}
               type="text" 
               placeholder={translate("usernamePlaceholderText")}
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
                   placeholder={translate("passwordPlaceholderText")}
                   value={values.password}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   name="password"
                   />
                   
                  <i  onClick={()=>{setTogglePass(!togglePass)}} className={`las ${togglePass ? "la-eye-slash" : "la-eye"}`}></i>
                 
                </div>
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
                <div className='text-danger commonError mt-2'>
                {commonError}
                </div>
                <Link className="ancor-btn forget-text" to="/ForgetPassword">{translate("signin/forgetPasswordText")}</Link>
                <button
                 className='login-btn general-btn ancor-btn'
                 disabled={isSubmitting}
                 >{!isSubmitting ? translate("signin/signinBtnText"): <ImSpinner8 size={22} className='spinner' />} </button>
                <Link to="/register" className='ancor-btn general-btn register-newAcc-btn'> {translate("registerNewAccountText")} </Link>
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
