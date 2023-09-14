import { Formik, Form   } from 'formik';
import { useState , useEffect } from 'react';
import Select from 'react-select';
import arabic from "../images/arabic.png"
import {RegisterSchema} from "./../Components/Schema"
import Breadcrumb from '../Components/Breadcrumb';
import { ImSpinner8 } from 'react-icons/im';
import {  toast , ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ecommerceAPI} from "../API/axios-custom"
import { useNavigate} from 'react-router-dom';

import {useMembershipListStore  , useSuccessMsgStore , useZonesStore , useCountriesStore , useCitiesStore , useWhereToGoStore} from "../Global_state/Zustand_Store"

function Register() {


const {getCountries , countryList , setCountrySelected , countrySelected} = useCountriesStore();

let {zoneList , setZoneSelected  , getZones} = useZonesStore();
let {cityList , citySelected  , setCitySelected , getCities} = useCitiesStore();
  
  const { t : translate } = useTranslation();

  const { membershipList  , getMembershipList} = useMembershipListStore();
  

  let schema = RegisterSchema() ;
  let navigation = useNavigate();
  const [togglePass, setTogglePass] = useState(true);
  const [toggleConfirmPass, setToggleConfirmPass] = useState(true);


 
  let {  setWhereToGo    } = useWhereToGoStore()
  let {successMessageFunc} = useSuccessMsgStore()




   
// Register func
 function userRegister (values, { setSubmitting, resetForm , setFieldError  }){
  const {checkboxField , ...restValues} = values
  ecommerceAPI.post('/auth/register',  restValues )
  .then(response => {
    setSubmitting(true)
    setWhereToGo("registerStatus");
    toast.success( successMessageFunc(translate("register/registeredSuccessMsg")   , translate("register/codeSentToEmailText") , translate("redirectToCodePageText") , ""), {
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
    if (error.response) {
      setSubmitting(false)
      const { data } = error.response;
      Object.keys(data.errors).forEach((key) => {
        setFieldError(key, data.errors[key][0]);
      });
    }
  });
 
}



useEffect(()=>{
  getMembershipList()
  getCountries()
} , [])

useEffect(()=>{
    getCities(countrySelected && countrySelected.value)
  if(countrySelected && citySelected){
    getZones(countrySelected.value , citySelected.value );
  }
} , [countrySelected , citySelected])


const validate = (values) => {
  console.log(values)
}



  return (
      <>
       <ToastContainer />
      { membershipList.length === 0 ? <div className="loading-container">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div> :  <>
      <Breadcrumb title={translate("registerNewAccountText")}/>
        <div className="register-section">
            <div className="container">
                <div className="register-content">
                    <div className="register-form-content">
                    <Formik
                    onSubmit={userRegister}
                    initialValues={{
                        membership_id: 0,
                        name: '',
                        full_name: '',
                        phone: '',
                        country_id: 0,
                        email: '',
                        personal_info: '',
                        password: '',
                        password_confirmation: '',
                        id_number: '',
                        zone_id: 0,
                        city_id: 0,
                        checkboxField: false
                    }}
                    validationSchema={schema}
                    validate={validate}
        >
            
          {({ isSubmitting, values, handleChange, handleBlur, errors, touched , setFieldValue , validateField }) => (
            <Form className='myform'>
              <div className="general-input-div radio-general-input-div">
                <label className="myLabel" htmlFor="">
                {translate("general/membershipTypeText")}
                </label>
                <div className="myradio-parent">
                  {membershipList.length > 0 &&
                    membershipList.map(membership => (
                      <div key={membership.value} className="radio-div">
                        <label htmlFor={membership.value} className="owner-label">
                          <input
                            value={membership.value}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            type="radio"
                            className="owner-input"
                            name="membership_id"
                            id={membership.value}
                          />
                          <span className="checkmark"></span>
                          {membership.label}
                        </label>
                      </div>
                    ))}
                </div>
                {errors.membership_id && touched.membership_id && <div className="error">{errors.membership_id}</div>}
              </div>

              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                 {translate("schema/nameEnglishOnly")}
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`general-input ${ touched.name && errors.name && "input-error"}`}
                  type="text"
                />
                {errors.name && touched.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                 {translate("identityNumberPlaceholderText")}
                </label>
                <input
                  name="id_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id_number}
                  className={`general-input ${ touched.id_number && errors.id_number && "input-error"}`}
                  type="text"
                />
                {errors.id_number && touched.id_number && <div className="error">{errors.id_number}</div>}
              </div>

              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                  {translate("fullNamePlaceholderText")}
                </label>
                <input
                  name="full_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.full_name}
                  className={`general-input ${errors.full_name && touched.full_name && "input-error"}`} 
                  type="tel"
                />
                {errors.full_name && touched.full_name && <div className="error">{errors.full_name}</div>}
              </div>

              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                  {translate("phoneNumberPlceholderText")}
                </label>
                <div className="number-holder-div">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`general-input ${errors.phone && touched.phone && "input-error"}`}
                    type="tel"
                    name="phone"
                    placeholder='5xxxxxxxx'
                  />
                  <div className='img-text-holder'>
                    <span>+966</span>
                    <img src={arabic} alt="" />
                  </div>
                  
                </div>
                {errors.phone && touched.phone && <div className="error">{errors.phone}</div>}
              </div>

              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                 {translate("emailPlaceholderText")}
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`general-input ${ touched.email && errors.email && "input-error"}`}
                  type="email"
                />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
                
              </div>

              <div className="general-input-div select-general-input">
                <label className="myLabel" htmlFor="">
                {translate("countryPlaceholderText")}
                </label>
                  <Select
                    className={`general-input ${ touched.country_id && errors.country_id && "input-error"}`}
                    name="country_id"
                    onChange={(countrySelected) => 
                        {
                            setFieldValue("country_id", countrySelected.value);
                            setCountrySelected(countrySelected)
                        }
                    }
                    placeholder ={translate("choosePlaceholderText")}
                    // value={regionSelectedOption}
                    options={countryList}
                /> 
                {errors.country_id && touched.country_id && <div className="error">{errors.country_id}</div>}
              </div>
              <div className="general-input-div select-general-input">
                <label className="myLabel" htmlFor="">
                {translate("cityPlaceholderText")}
                </label>
                  <Select
                    className={`general-input ${ touched.city_id && errors.city_id && "input-error"}`}
                    name="city_id"
                    onChange={(citySelected) => 
                        {
                            setFieldValue("city_id", citySelected.value);
                            setCitySelected(citySelected)
                        }
                    }
                    placeholder = {translate("choosePlaceholderText")}
                    // value={regionSelectedOption}
                    options={cityList}
                /> 
                {errors.city_id && touched.city_id && <div className="error">{errors.city_id}</div>}
              </div>
              
              <div className="general-input-div select-general-input">
                <label className="myLabel" htmlFor="">
                  {translate("zonePlaceholderText")}
                </label>
                  <Select
                    className={`general-input ${ touched.zone_id && errors.zone_id && "input-error"}`}
                    name="zone_id"
                    onChange={(zoneSelected) => 
                        {
                              setFieldValue("zone_id", zoneSelected.value);
                              setZoneSelected(zoneSelected)
                        }
                        }
                    placeholder  = {translate("choosePlaceholderText")}
                    // value={zoneSelected}
                    options={zoneList}
                />
                {errors.zone_id && touched.zone_id && <div className="error">{errors.zone_id}</div>}
              </div>
              

              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                {translate("passwordPlaceholderText")}
                </label>
                <div className="pass-holder">
                <input
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`general-input ${ touched.password &&  errors.password && "input-error"}`}
                  type={`${togglePass ? "password" : "text"}`}
                />
                <i  onClick={()=>{setTogglePass(!togglePass)}} className={`las ${togglePass ? "la-eye-slash" : "la-eye"}`}></i>
                </div>
              
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
              </div>

              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
               { translate("confirmPasswordText")}
                </label>
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
              <div className="general-input-div">
                <label className="myLabel" htmlFor="">
                  {translate("register/breifPlaceholderText")}
                </label>
                <textarea
                  name="personal_info"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.personal_info}
                  className={`general-input ${ touched.personal_info && errors.personal_info && "input-error"}`}
                ></textarea>
                {errors.personal_info && touched.personal_info && <div className="error">{errors.personal_info}</div>}
              </div>
              <div className="general-input-div">
              <label htmlFor="checkboxField" className='checkbox-label'> 
                <input
                onChange={  (event)=>{
                  setFieldValue('checkboxField', event.target.checked);
                  validateField('checkboxField')
                }  }
                checked={values.checkboxField}
                type="checkbox"   
                name="checkboxField"
                id="checkboxField"/>
                <span className="checkbox-checkmark"></span>
                <div className='d-flex align-items-center'>
                  <span>{translate("register/read&acceptText")}</span>
                  <a className='termsLink ancor-btn' href="##"> {translate("register/terms&conditionsText")}</a>
                </div>
              </label>
              {errors.checkboxField && touched.checkboxField && <div className="error">{errors.checkboxField}</div>}
              </div>
            
              
              <div className='submitBtn-holder'>
                <button type='submit'  disabled={isSubmitting} className='ancor-btn'> 
                {!isSubmitting ? translate("register/registerBtn") : <ImSpinner8 size={22} className='spinner' />}
                </button>
              </div>
            </Form>
          )}
                    </Formik>
                    </div>
                  
                </div>
            </div>
        </div>
      </> }

      </>
  );
}


export default Register