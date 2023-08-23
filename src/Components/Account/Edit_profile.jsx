import React, {useContext} from 'react'
import {Form, Formik} from 'formik';
import axios from 'axios';
import {ImSpinner8} from 'react-icons/im';
import {  toast , ToastContainer } from 'react-toastify';
import Select from 'react-select';
import {editProfileSchema} from "./../../Components/Schema"
import { GlobalStateContext } from './../GlobalState';


function EditProfile() {
   

    let { successMessageFunc ,  setMemberSelected ,profileData , avatar  , membershipList, cityList , setCitySelected  , zoneList , setZoneSelected }
     = useContext(GlobalStateContext)
    


    function updateProfile (values, { setSubmitting, resetForm , setFieldError   }){
        let formData ;
        if(avatar.length === 0) {
            formData = values
        }else{
            let allValues = {...values  , avatar };
             formData = new FormData();
             Object.keys(allValues).forEach((key)=>{
                formData.append(key ,allValues[key] )
             })
        }
       
        axios.post('https://vm.tasawk.net/rest-api/ecommerce/profile' ,formData , {
          headers: {
            'Accept-Language': 'ar',
            "X-Api-Token" : JSON.parse(localStorage.getItem("mosaweq-new-user")) ,
            "Accept" : " application/json"
        }
        } )
        .then(response => {
            console.log(response)
          setSubmitting(false)
          toast.success( successMessageFunc(" تم تحديث الحساب بنجاح " , "" , "" , "d-none"), {
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
            if(data.errors){
                Object.keys(data.errors).forEach((key)=>{
                    setFieldError(key , data.errors[key][0])
                 })
            }
           
            // setFieldError("code" , data.message )
          }
        });
       
      }



      
    return (
        <>
         <ToastContainer />
        <div className="section-cont editProfile-sec-cont">
            <h2> تعديل بيانات الحساب</h2>
            <div className="edit-profile-cont">
                <Formik
                    onSubmit={updateProfile}
                    initialValues={{
                        // avatar: avatar,
                        membership_id: profileData.membership.id ,
                        full_name: profileData.full_name,
                        phone: profileData.phone,
                        email: profileData.email,
                        city_id: profileData.zone.id,
                        zone_id : profileData.city.id,
                        devices_token: "211212121"
                    }}
                    // validate={validate}
                    validationSchema={editProfileSchema}
                >
                    {({
                          isSubmitting,
                          values,
                          handleChange,
                          handleBlur,
                          errors,
                          touched,
                          setFieldValue,
                      }) => (

                        <Form className='myform' >
                            <div className="general-input-div">
                                <label className="myLabel" htmlFor="">
                                    نوع العضوية
                                </label>
                                <Select
                                    className={`general-input 
                                    ${touched.membership_id && errors.membership_id && "input-error"}`}
                                    name="membership_id"
                                    onChange={(memberSelected) => {
                                        setFieldValue("membership_id", memberSelected.value);
                                        setMemberSelected(memberSelected)
                                    }
                                    }

                                    placeholder={profileData.membership.title}
                                    // value={regionSelectedOption}
                                    options={membershipList}
                                />


                                {errors.membership_id && touched.membership_id &&
                                    <div className="error">{errors.membership_id}</div>}
                            </div>
                            <div className="general-input-div">
                                <label className="myLabel" htmlFor="">
                                    الاسم بالكامل
                                </label>
                                <div>
                                    <input
                                        name="full_name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.full_name}
                                        // value={profileData.full_name}
                                        className={`general-input ${errors.full_name && touched.full_name && "input-error"}`}
                                        type="tel"
                                    />
                                    {errors.full_name && touched.full_name &&
                                        <div className="error">{errors.full_name}</div>}
                                </div>

                            </div>
                            <div className="general-input-div">
                                <label className="myLabel" htmlFor="">
                                    رقم الجوال
                                </label>
                                <div className="number-holder-div">
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        className={`general-input ${errors.phone && touched.phone && "input-error"}`}
                                        type="tel"
                                        name="phone"
                                        placeholder='5xxxxxxxx'
                                    />
                                    {errors.phone && touched.phone &&
                                        <div className="error">{errors.phone}</div>}
                                </div>

                            </div>
                            <div className="general-input-div">
                                <label className="myLabel" htmlFor="">
                                    البريد الإلكتروني
                                </label>
                                <div>
                                    <input
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={`general-input ${touched.email && errors.email && "input-error"}`}
                                        type="email"
                                    />
                                    {errors.email && touched.email &&
                                        <div className="error">{errors.email}</div>}
                                </div>
                            </div>
                            <div className="general-input-div select-general-input">
                                <label className="myLabel" htmlFor="">
                                    المدينة
                                </label>
                                <Select
                                    className={`general-input ${touched.city_id && errors.city_id && "input-error"}`}
                                    name="city_id"
                                    onChange={(citySelected) => {
                                        setFieldValue("city_id", citySelected.value);
                                        setCitySelected(citySelected)
                                    }
                                    }
                                    placeholder={profileData.city.name}
                                    options={cityList}
                                />
                                {errors.city_id && touched.city_id &&
                                    <div className="error">{errors.city_id}</div>}
                            </div>
                            <div className="general-input-div select-general-input">
                                <label className="myLabel" htmlFor="">
                                المنطقة
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
                                    placeholder= {profileData.zone.name}
                                    // value={zoneSelected}
                                    options={zoneList}
                                />
                                {errors.zone_id && touched.zone_id && <div className="error">{errors.zone_id}</div>}
                            </div>
                            <div className='submitBtn-holder'>
                                <button type='submit' disabled={isSubmitting} className='ancor-btn'>
                                    {!isSubmitting ? "حفظ التغييرات" :
                                        <ImSpinner8 size={22} className='spinner'/>}
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

export default EditProfile
