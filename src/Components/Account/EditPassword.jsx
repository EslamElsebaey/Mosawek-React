
import React from 'react'
import { Formik, Form   } from 'formik';
import { ImSpinner8 } from 'react-icons/im';
import { useState  } from 'react';
import {EditPasswordSchema} from "./../../Components/Schema"
import {  toast , ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ecommerceAPI} from "../../API/axios-custom"
import {useSuccessMsgStore} from "../../Global_state/Zustand_Store"






function EditPassword() {

let schema = EditPasswordSchema();

  const { t : translate } = useTranslation();


  const [toggleOldPass, setToggleOldPass] = useState(true);
  const [togglePass, setTogglePass] = useState(true);
  const [toggleConfirmPass, setToggleConfirmPass] = useState(true);
 
  let {successMessageFunc} = useSuccessMsgStore();





  function changePassword (values, { setSubmitting, resetForm , setFieldError  }){
    ecommerceAPI.post('/profile/update-password',  values)
    .then(response => {
      console.log(response)
      setSubmitting(false)
      toast.success( successMessageFunc(translate("passwordChangedSuccessMsgText") , "" , "" , "d-none"), {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    })
    .catch(error => {
      console.log(error)
      if (error.response) {
        setSubmitting(false)
        const { data } = error.response;
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key][0]);
        });
      }
    });
   
  }


  
const validate = (values)=> {
  console.log(values)
}



  return (
    <>
    <ToastContainer/>
    <div className="section-cont editPassword-sec-cont">
        <h2>{translate("editPassword/title")}</h2>
        <div className="edit-profile-cont">
        <Formik
          onSubmit={changePassword}
          initialValues={{
            old_password:  "" ,
            password: "",
            password_confirmation: "",
            devices_token: '211212121',
          }}
          validationSchema={schema}
          validate={validate}
          >
            {({ isSubmitting, values, handleChange, handleBlur, errors, touched , setFieldValue , validateField }) => (
              
              <Form className='myform'>
                <div className="general-input-div">
                  <label className="myLabel" htmlFor="">
                  {translate("editPassword/currentPassword")}   
                  </label>
                  <div>
                  <div className="pass-holder">
                    <input
                    name="old_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.old_password}
                    className={`general-input ${ touched.old_password &&  errors.old_password && "input-error"}`}
                    type={`${toggleOldPass ? "password" : "text"}`}
                  />
                  <i  onClick={()=>{setToggleOldPass(!toggleOldPass)}} className={`las ${toggleOldPass ? "la-eye-slash" : "la-eye"}`}></i>
                  </div>
                  {errors.old_password && touched.old_password && <div className="error">{errors.old_password}</div>}
                  </div>
                

                
                  
                </div>

                <div className="general-input-div">
                  <label className="myLabel" htmlFor="">
                  {translate("editPassword/newPassword")}
                  </label>
                  <div>
                  <div className="pass-holder">
                    <input
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`general-input ${ touched.password && errors.password && "input-error"}`}
                    type={`${togglePass ? "password" : "text"}`}
                  />
                    <i  onClick={()=>{setTogglePass(!togglePass)}} className={`las ${togglePass ? "la-eye-slash" : "la-eye"}`}></i>
                  </div>
                  {errors.password && touched.password && (
                    <div className="error">{errors.password}</div>
                  )}
                  </div>
                
                  
                
                </div>

                <div className="general-input-div">
                  <label className="myLabel" htmlFor="">
                  {translate("editPassword/passwordConfirmation")} 
                  </label>
                  <div>
                  <div className="pass-holder">
                    <input
                    name="password_confirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                    className={`general-input ${ touched.password_confirmation && errors.password_confirmation && "input-error"}`}
                    type={`${toggleConfirmPass ? "password" : "text"}`}
                  />
                    <i  onClick={()=>{setToggleConfirmPass(!toggleConfirmPass)}} className={`las ${toggleConfirmPass ? "la-eye-slash" : "la-eye"}`}></i>

                  </div>
                  {errors.password_confirmation && touched.password_confirmation && (
                    <div className="error">{errors.password_confirmation}</div>
                  )}
                  </div>
                </div>
                <div className='submitBtn-holder'>
                  <button type='submit'  disabled={isSubmitting} className='ancor-btn'> 
                  {!isSubmitting ?  translate("editPassword/saveChanges")  : <ImSpinner8 size={22} className='spinner' />}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      
      </div> 
    </>
  )
}

export default EditPassword
