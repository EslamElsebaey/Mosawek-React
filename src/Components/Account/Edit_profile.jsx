import React, {  useEffect , useState} from 'react'
import {Form, Formik} from 'formik';
import {ecommerceAPI} from "../../API/axios-custom"
import {ImSpinner8} from 'react-icons/im';
import {  toast , ToastContainer } from 'react-toastify';
import Select from 'react-select';
import {EditProfileSchema} from "./../../Components/Schema"
import { useTranslation } from 'react-i18next';
import {useProfileDataStore , useAvatarStore , useSuccessMsgStore , useZonesStore  , useMembershipListStore , useCitiesStore} from "../../Store/Store"





function EditProfile() {



const { membershipList  } = useMembershipListStore();
const { profileData } = useProfileDataStore();

let {cityList , getCities   , setCitySelected , citySelected } = useCitiesStore();
let {zoneList , setZoneSelected  , getZones } = useZonesStore();
const [setMemberSelected] = useState(null);




let schema = EditProfileSchema();

    let {   avatar   }= useAvatarStore()
    const { t : translate } = useTranslation();

     const {successMessageFunc} = useSuccessMsgStore()


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
        ecommerceAPI.post('/profile' ,formData ,)
        .then(response => {
            console.log(response)
          setSubmitting(false)
          toast.success( successMessageFunc(translate("editProfile/updateProfileSuccessMsg") , "" , "" , "d-none"), {
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






  useEffect(()=>{
    
    getCities(1)
    if(citySelected){
        getZones(1 , citySelected.value );
      }
  } , [citySelected])

      
    return (
        <>
         <ToastContainer />
        <div className="section-cont editProfile-sec-cont">
            <h2> {translate("editProfile/title")} </h2>
            <div className="edit-profile-cont">
                <Formik
                    onSubmit={updateProfile}
                    initialValues={{
                        membership_id: profileData.membership.id ,
                        full_name: profileData.full_name,
                        phone: profileData.phone,
                        email: profileData.email,
                        city_id: profileData.zone.id,
                        zone_id : profileData.city.id,
                        devices_token: "211212121"
                    }}
                    // validate={validate}
                    validationSchema={schema}
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
                                {translate("general/membershipTypeText")}
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
                                {translate("fullNamePlaceholderText")}
                                </label>
                                <div>
                                    <input
                                        name="full_name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.full_name}
                                        className={`general-input ${errors.full_name && touched.full_name && "input-error"}`}
                                        type="tel"
                                    />
                                    {errors.full_name && touched.full_name &&
                                        <div className="error">{errors.full_name}</div>}
                                </div>

                            </div>
                            <div className="general-input-div">
                                <label className="myLabel" htmlFor="">
                                {translate("phoneNumberPlceholderText")}
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
                                {translate("emailPlaceholderText")}
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
                                {translate("cityPlaceholderText")}
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
                                    placeholder= {profileData.zone.name}
                                    // value={zoneSelected}
                                    options={zoneList}
                                />
                                {errors.zone_id && touched.zone_id && <div className="error">{errors.zone_id}</div>}
                            </div>
                            <div className='submitBtn-holder'>
                                <button type='submit' disabled={isSubmitting} className='ancor-btn'>
                                    {!isSubmitting ? translate("editProfile/saveChanges") :
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
