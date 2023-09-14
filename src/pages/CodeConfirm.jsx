import React  from 'react'
import Breadcrumb from './../Components/Breadcrumb';
import { Formik, Form   } from 'formik';
import { useNavigate} from 'react-router-dom';
import {CodeConfirmSchema} from "./../Components/Schema"
import {  toast , ToastContainer } from 'react-toastify';
import { ImSpinner8 } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import {ecommerceAPI} from "../API/axios-custom"
import {useSuccessMsgStore , useWhereToGoStore } from "../Components/Store/Store"







function CodeConfirm() {


const { t : translate } = useTranslation();




let schema = CodeConfirmSchema();
  let {  wherToGo} = useWhereToGoStore()
  let navigation = useNavigate();
   
  let {successMessageFunc} = useSuccessMsgStore()


 

  function codeConfirm (values, { setSubmitting, resetForm , setFieldError   }){
    console.log(values)
    ecommerceAPI.post('/auth/code-confirm' ,values  )
    .then(response => {
      setSubmitting(true)
      localStorage.setItem("user-code" , JSON.stringify(values.code))
      toast.success( wherToGo === "registerStatus" ?   successMessageFunc(translate("codeConfirm/codeSuccessMsg") , "" , translate("redirectToLoginPage") , "") : successMessageFunc(translate("codeConfirm/codeSuccessMsg") , "" , translate("redirectToNewpasswordPage") , "") , {
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
        if(wherToGo === "registerStatus"){
          navigation("/signin")
        }else{
          navigation("/newpassword")
        }
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
    <Breadcrumb title={translate("sendCodeText")}/>
    <div className="codeConfirm-section">
        <div className="container">
          <div className="general-form-content codeConfirm-form-content ">
            <div className="code-confirm-form">
              <h2 className='general-form-content-h2'>{translate("sendCodeText")}</h2>
              <Formik
                onSubmit={codeConfirm}
                initialValues={{
                  code: "",
                  devices_token : "211212121",
                  phone : 542212311 
                }}
                validationSchema={schema}
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
                        placeholder={translate("validationCodeText")} />
                        {errors.code && touched.code && <div className="error">{errors.code}</div>}
                        <button 
                        disabled={isSubmitting}
                        type='submit'
                        className='ancor-btn general-btn CodeConfirm-btn'
                        >  
                        {!isSubmitting ? translate("sendCodeText") : <ImSpinner8 size={22} className='spinner' />} 
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
