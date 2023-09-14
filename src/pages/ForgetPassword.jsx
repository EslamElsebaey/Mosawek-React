import React from 'react'
import { Formik, Form   } from 'formik';
import {ForgetPasswordSchema} from "./../Components/Schema"
import { ImSpinner8 } from 'react-icons/im';
import {  toast , ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Breadcrumb from './../Components/Breadcrumb';
import { useTranslation } from 'react-i18next';
import {ecommerceAPI} from "../API/axios-custom"
import {useSuccessMsgStore } from "../Store/Store"





function ForgetPassword() {

  const { t : translate } = useTranslation();

  let {successMessageFunc} = useSuccessMsgStore()

  let navigation = useNavigate();

   
let schema = ForgetPasswordSchema() ;

  function forgetPassFunc (values, { setSubmitting , resetForm , setFieldError   }){
    ecommerceAPI.post('/auth/forget-password' ,values )
    .then(response => {
      console.log(response)
      setSubmitting(true)
      localStorage.setItem("phone-number" , JSON.stringify(values.phone))
      toast.success( successMessageFunc(translate("codeSentSuccessMsg") , translate("checkPhoneText")  , translate("redirectToCodePageText") , ""), {
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
        navigation("/codeconfirm")
      }, 4000);
    })
    .catch(error => {
      console.log(error)
      if (error.response) {
        setSubmitting(false)
        const { data } = error.response;
        setFieldError("phone" , data.message )
      }
    });
   
  }
  




  
  // const validate = (values ) => {
  //   console.log(values)
  // };



  return (
  <>
      <ToastContainer />
      <Breadcrumb title={translate("restorePasswordText")}/>
      <div className="forgetPass-section">
          <div className="container">
            <div className="general-form-content  ">
              <div className="restore-password-form">
                <h2 className='general-form-content-h2'> {translate("restorePasswordText")}  </h2>
                <Formik
                  onSubmit={forgetPassFunc}
                  initialValues={{
                    phone : "" 
                  }}
                  validationSchema={schema}
                  // validate={validate}
              >
                {({ isSubmitting, values, handleChange, handleBlur, errors, touched  }) => (
                  
                  <Form className='myform'>
                    <div className="general-input-div">
                        <input     
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          name="phone"
                          className='general-input'
                          placeholder={translate("phoneNumberPlaceholderText")} />
                          {errors.phone && touched.phone && <div className="error">{errors.phone}</div>}
                    </div>
                    <button 
                          disabled={isSubmitting}
                          type='submit'
                          className='ancor-btn general-btn sendCode-btn '
                          >  
                          {!isSubmitting ? translate("sendCodeText") : <ImSpinner8 size={22} className='spinner' />} 
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

export default ForgetPassword
