import React , {useContext} from 'react'
import Breadcrumb from './../Components/Breadcrumb';
import { Formik, Form   } from 'formik';
import axios from 'axios';
import {codeConfirmSchema} from "./../Components/Schema"
import {  toast , ToastContainer } from 'react-toastify';
import { FaCheckCircle  } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from './../Components/GlobalState';




// Data 
// {
//   "phone":"542212311",
//   "code":"12345",
//   "devices_token":"211212121"
// }


function CodeConfirm() {

  let {successMessageFunc} = useContext(GlobalStateContext)
  let navigation = useNavigate() ;
   

 

  function codeConfirm (values, { setSubmitting, resetForm , setFieldError   }){
    console.log(values)
    axios.post('https://vm.tasawk.net/rest-api/ecommerce/auth/code-confirm' ,values , {
      headers: {
        'Accept-Language': 'ar'
    }
    } )
    .then(response => {
      setSubmitting(true)
      localStorage.setItem("user-code" , JSON.stringify(values.code))
      toast.success( successMessageFunc(" كود التحقق صحيح " , "" , "سيتم الآن توجيهك الى صفحة ادخال كلمة المرور الجديدة " , ""), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      setTimeout(() => {
        navigation("/newpassword")
      }, 3500);
    })
    .catch(error => {
      console.log(error)
      if (error.response) {
        setSubmitting(false)
        const { data } = error.response;
        setFieldError("code" , data.message )
      }
    });
   
  }
  

  // const validate = (values ) => {
  //   console.log(values)
  // };

  return (
    <>
    <ToastContainer/>
    <Breadcrumb title="ارسال كود التحقق"/>
    <div className="codeConfirm-section">
        <div className="container">
          <div className="general-form-content codeConfirm-form-content ">
            <div className="code-confirm-form">
              <h2 className='general-form-content-h2'>  ارسال كود التحقق </h2>
              <Formik
                onSubmit={codeConfirm}
                initialValues={{
                  code: "",
                  devices_token : "211212121",
                  phone : 542212311 
                }}
                validationSchema={codeConfirmSchema}
                // validate={validate}
            >
              {({ isSubmitting, values, handleChange, handleBlur, errors, touched  }) => (
                
                <Form className='myform'>
                  {console.log(errors)}
                  <div className="general-input-div">
                      <input     
                        value={values.code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        name="code"
                        className='general-input'
                        placeholder='كود التحقق' />
                        {errors.code && touched.code && <div className="error">{errors.code}</div>}
                        <button 
                        disabled={isSubmitting}
                        type='submit'
                        className='ancor-btn general-btn CodeConfirm-btn'
                        >  
                        {!isSubmitting ? "ارسال كود التحقق" : <ImSpinner8 size={22} className='spinner' />} 
                          </button>
                  </div>
                
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

export default CodeConfirm
