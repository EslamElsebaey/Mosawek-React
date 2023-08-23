import React ,  {createContext, useEffect , useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { FaCheckCircle } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';


export const GlobalStateContext = createContext();

function GlobalState(props) {


  function successMessageFunc(successText ,paraText , rediredtText  ,displayNone ){
    return (
      <div className='toast-text-box'>
      <div className='d-flex align-items-end mb-3 justify-content-center'>
      <FaCheckCircle size={18} color={"#07bc0c"} />
      <h3 className='toast-text-h3' > {successText} </h3>
      </div>
      <p className='mb-2'>{paraText} </p>
      <div className='d-flex align-items-center justify-content-center' >
        <div className={displayNone}>
        <CgSpinner size={20}  className="spinner"  />
        </div>
      <p className='m-0'>{rediredtText} </p>
      </div>
      </div>
    )
  }

  // avatar 
  const [avatar, setAvatar] = useState("");


  const [memberSelected, setMemberSelected] = useState(null);

/********************************************************************************************************/

// get countries
const [countrySelected, setCountrySelected] = useState(null);
const [countryList, setCountryList] = useState([]);
  async function getCountries(){
    let {data} =  await axios.get('https://vm.tasawk.net/rest-api/locations/countries', {
        headers: {
            'Accept-Language': 'ar'
        }
      })
      const updatedOptions = data.data.map(option => ({
        value: option.id,
        label: option.name,
      }));
    
      setCountryList(updatedOptions);
  }

/********************************************************************************************************/


// GET CITIES
const [cityList, setCityList] = useState([]);
const [citySelected, setCitySelected] = useState(null);
async function getCities(countryId){
  let {data} =  await axios.get(`https://vm.tasawk.net/rest-api/locations/countries/${countryId}/cities`, {
    
      headers: {
          'Accept-Language': 'ar'
      }
    })
    const updatedOptions = data.data.map(option => ({
      value: option.id,
      label: option.name,
    }));
    setCityList(updatedOptions);
}
/********************************************************************************************************/

// GET ZONES

const [zoneSelected, setZoneSelected] = useState(null);
const [zoneList, setZoneList] = useState([]);
async function getZones(countryId , cityId){
  let {data} =  await axios.get(`https://vm.tasawk.net/rest-api/locations/countries/${countryId}/cities/${cityId}/districts`, {
      headers: {
          'Accept-Language': 'ar'
      }
    })
   
    const updatedOptions = data.data.map(option => ({
      value: option.id,
      label: option.name,
    }));
  
    setZoneList(updatedOptions);
}
/********************************************************************************************************/

// GET PROFILE DATA
const [profileData, setProfileData] = useState([]);
function getProfileData(){
  axios.get(`https://vm.tasawk.net/rest-api/ecommerce/profile`, {
    headers: {
        'Accept-Language': 'ar',
        "X-Api-Token" :  JSON.parse(localStorage.getItem("mosaweq-new-user"))  ,
        "Accept" : " application/json"
    }
  }).then(response => {
    // console.log(response.data.data)
    setProfileData(response.data.data)
  }).catch(error => {
    console.log(error)
  })
}
// console.log(profileData)

/********************************************************************************************************/
// GET MEMBERSHIP LIST
const [membershipList, setMembershipList] = useState([]);
  async function getMembershipList(){
    axios.get("https://vm.tasawk.net/rest-api/ecommerce/memberships" , {
      headers : {
        'Accept-Language': 'ar'
      }
    }).then(response=>{
        const updatedOptions = response.data.data.map(option => ({
        value: option.id,
        label: option.title,
      }));
      setMembershipList(updatedOptions);
    }).catch(error=>{
      console.log(error)
    })
    }
/********************************************************************************************************/
    // CHECK LOGIN
    const [isLogin , setIsLogin] =  useState(null)
    function checkLogin () {  
      let newUserData =  localStorage.getItem("mosaweq-new-user");
      setIsLogin(newUserData)
    }
/********************************************************************************************************/
    // LOG OUT
    let navigation = useNavigate()
    function logOut(){
      localStorage.removeItem("mosaweq-new-user");
      localStorage.removeItem("user-code");
      localStorage.removeItem("phone-number");
      setIsLogin(null)
      navigation("/signin");
      checkLogin()
     }


/********************************************************************************************************/



useEffect(()=>{
  // getMembershipList()
  checkLogin()
} , [])


  return (

    
   <>
 <GlobalStateContext.Provider value={{successMessageFunc ,  getZones , membershipList , setCountrySelected , countrySelected ,getCities ,  getMembershipList ,getCountries ,  setCountryList , countryList , setMembershipList ,  setMemberSelected , memberSelected ,getProfileData ,  setAvatar , avatar ,  isLogin ,checkLogin , logOut  ,  profileData , cityList , setCitySelected , citySelected , zoneList , setZoneSelected , zoneSelected}}>
 {props.children}
 </GlobalStateContext.Provider>
   </>
  )
}

export default GlobalState
