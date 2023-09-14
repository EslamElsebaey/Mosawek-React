import { create } from 'zustand'
import {ecommerceAPI} from "../API/axios-custom"
import {locationsAPI} from "../API/axios-custom"
import { FaCheckCircle } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

  


// Profile data
export const useProfileDataStore = create(set => ({
  profileData: [],
  getProfileData: () => {
    ecommerceAPI.get(`/profile`).then(response => {
        set({ profileData: response.data.data });
      }).catch(error => {
        console.log(error)
      })
  },
}));



// Membership List 
 export const useMembershipListStore = create(set => ({
    membershipList : [] , 
    getMembershipList : ()=>{
        ecommerceAPI.get("/memberships").then(response=>{
            const updatedOptions = response.data.data.map(option => ({
            value: option.id,
            label: option.title,
          }));
          set({membershipList : updatedOptions})
         }).catch(error=>{
          console.log(error)
         })
    }
}))



// Get Countries

export const useCountriesStore = create(set => ({
    countrySelected : null , 
    setCountrySelected: (country) => set({ countrySelected: country }),
    countryList : [] , 
    getCountries : async ()=>{
        let {data} =  await locationsAPI.get('/countries')
        const updatedOptions = data.data.map(option => ({
          value: option.id,
          label: option.name,
        }));
        set ({countryList :updatedOptions })
    }
}))



// Get cities
export const useCitiesStore = create(set => ({
    cityList : [] , 
    citySelected : null , 
    setCitySelected : (city) => set({ citySelected: city }),
    getCities : async (countryId)=> {
        let {data} =  await locationsAPI.get(`/countries/${countryId}/cities`)
        const updatedOptions = data.data.map(option => ({
          value: option.id,
          label: option.name,
        }));
        set ({cityList :updatedOptions })
    }
}))



// Get Zones
export const useZonesStore = create(set => ({
    zoneSelected : null , 
    setZoneSelected : (zone) => set({zoneSelected :zone }) , 
    zoneList : [] , 
    getZones :  async (countryId , cityId)=> {
        let {data} =  await locationsAPI.get(`/countries/${countryId}/cities/${cityId}/districts`)
        const updatedOptions = data.data.map(option => ({
          value: option.id,
          label: option.name,
        }));
        set({zoneList :updatedOptions })
        
    }
}))




// Success Message
export const useSuccessMsgStore = create(set => ({
    successMessageFunc : (successText ,paraText , rediredtText  ,displayNone)=> {
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
}))


// language 
export const useLocaleLangStore = create(set => ({
    localeLang : "" , 
    setLocaleLang : (lang) => set({localeLang :lang })
}))




// Check Login 
export const useCheckLoginStore = create (set => ({
  isLogin : null , 
  setIsLogin : (login) => set({isLogin : login}) , 
  checkLogin : () => {
    let newUserData =  localStorage.getItem("mosaweq-new-user");
    set({isLogin : newUserData})
    
  }
}))


// Log out 

export const useLogOutStore = create(set => ({
  logOut : (checkLogin , setIsLogin)=>{
    localStorage.removeItem("mosaweq-new-user");
    localStorage.removeItem("user-code");
    localStorage.removeItem("phone-number");
    setIsLogin(null)
    checkLogin()
  }
}))





// where to go 
export const  useWhereToGoStore = create(set => ({
  wherToGo : "" , 
  setWhereToGo : (whereTo) =>  set({wherToGo : whereTo})
}))




export const  useAvatarStore = create(set => ({
  avatar : null , 
  setAvatar : (avatar) =>  set({avatar : avatar})
}))
