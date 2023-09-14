import React ,  { useState  }  from 'react'
import Breadcrumb from './../Components/Breadcrumb';
import { Formik, Form   } from 'formik';
import {NewPasswordSchema} from "./../Components/Schema"
import { ImSpinner8 } from 'react-icons/im';
import {  toast , ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ecommerceAPI} from "../API/axios-custom"
import { useNavigate} from 'react-router-dom';
import {useSuccessMsgStore } from "../Store/Store"










function NewPassword() {
let schema = NewPasswordSchema() ;
const { t : translate } = useTranslation();


let {successMessageFunc} = useSuccessMsgStore()


    const [togglePass, setTogglePass] = useState(true);
    const [toggleConfirmPass, setToggleConfirmPass] = useState(true);
    let navigation = useNavigate();
    

function newPasswordFunc (values, { setSubmitting , resetForm , setFieldError   }){
  ecommerceAPI.post('/auth/new-password' ,values )
    .then(response => {
      console.log(response)
      setSubmitting(true)
      toast.success( successMessageFunc(translate("passwordChangedSuccessMsgText") , translate("redirectToLoginPage") ,"" , "" ), {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      setTimeout(() => {
        navigation("/signin")
      }, 4000);
    })
    .catch(error => {
      console.log(error)
      if (error.response) {
        setSubmitting(false)
        const { data } = error.response;
        setFieldError("password_confirmation" , data.message)
        Object.keys(data.errors).forEach((key)=>{
        setFieldError(key , data.errors[key][0])
        })
      }
    });
    
  }

const validate = (values)=> {
    console.log(values)
}



  return (
    <>
     <ToastContainer />
    <Breadcrumb title={translate("enterNewPasswordText")}/>
    <div className="forgetPass-section">
          <div className="container">
            <div className="general-form-content  ">
              <div className="restore-password-form">
                <h2 className='general-form-content-h2'> {translate("enterNewPasswordText")}</h2>
                <Formik
                  onSubmit={newPasswordFunc}
                  initialValues={{
                    phone:  JSON.parse(localStorage.getItem("phone-number"))  ,
                    code: JSON.parse(localStorage.getItem("user-code"))  ,
                    password : ""  , 
                    password_confirmation : "" ,
                    devices_token : "147852369"
                  }}
                  validationSchema={schema}
                  validate={validate}
              >
                {({ isSubmitting, values, handleChange, handleBlur, errors, touched  }) => (
                  
                  <Form className='myform'>
                    <div className="general-input-div">
                        <div className="pass-holder">
                        <input     
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type={`${togglePass ? "password" : "text"}`}
                          name="password"
                          className='general-input'
                          placeholder={translate("passwordPlaceholderText")} />
                           <i  onClick={()=>{setTogglePass(!togglePass)}} className={`las ${togglePass ? "la-eye-slash" : "la-eye"}`}></i>
                        </div>
                          {errors.password && touched.password && <div className="error">{errors.password}</div>}
                         
                    </div>
                    <div className="general-input-div">
                        <div className="pass-holder">
                        <input     
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type={`${toggleConfirmPass ? "password" : "text"}`}
                          name="password_confirmation"
                          className='general-input'
                          placeholder={translate("confirmPasswordText")} />
                            <i  onClick={()=>{setToggleConfirmPass(!toggleConfirmPass)}} className={`las ${toggleConfirmPass ? "la-eye-slash" : "la-eye"}`}></i>
                        </div>
                          {errors.password_confirmation && touched.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                        
                    </div>
                    <button 
                          disabled={isSubmitting}
                          type='submit'
                          className='ancor-btn general-btn sendCode-btn '
                          >  
                          {!isSubmitting ? translate("changePasswordText") : <ImSpinner8 size={22} className='spinner' />} 
                    </button>
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

export default NewPassword
