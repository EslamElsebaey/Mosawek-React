import React, { useContext } from 'react'
import { Formik, Form   } from 'formik';
import {forgetPasswordSchema} from "./../Components/Schema"
import { ImSpinner8 } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';
import { FaCheckCircle  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast , ToastContainer } from 'react-toastify';
import Breadcrumb from './../Components/Breadcrumb';
import { GlobalStateContext } from '../Components/GlobalState';




function ForgetPassword() {
let {successMessageFunc} = useContext(GlobalStateContext)
  let navigation = useNavigate() ;

   


  function forgetPassFunc (values, { setSubmitting , resetForm , setFieldError   }){
    axios.post('https://vm.tasawk.net/rest-api/ecommerce/auth/forget-password' ,values , {
      headers: {
        'Accept-Language': 'ar' ,
        "Accept" : " application/json"
    }
    } )
    .then(response => {
      console.log(response)
      setSubmitting(true)
      localStorage.setItem("phone-number" , JSON.stringify(values.phone))
      toast.success( successMessageFunc("تم ارسال الكود بنجاح " , "يرجى التحقق من الجوال الخاص بك  " , "سيتم الآن توجيهك الى صفحة ادخال الكود " , ""), {
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
      <Breadcrumb title="استعادة كلمة المرور"/>
      <div className="forgetPass-section">
          <div className="container">
            <div className="general-form-content  ">
              <div className="restore-password-form">
                <h2 className='general-form-content-h2'> استعادة كلمة المرور</h2>
                <Formik
                  onSubmit={forgetPassFunc}
                  initialValues={{
                    phone : "" 
                  }}
                  validationSchema={forgetPasswordSchema}
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
                          placeholder='رقم الجوال' />
                          {errors.phone && touched.phone && <div className="error">{errors.phone}</div>}
                        
                    </div>
                    <button 
                          disabled={isSubmitting}
                          type='submit'
                          className='ancor-btn general-btn sendCode-btn '
                          >  
                          {!isSubmitting ? "ارسال كود التحقق" : <ImSpinner8 size={22} className='spinner' />} 
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
