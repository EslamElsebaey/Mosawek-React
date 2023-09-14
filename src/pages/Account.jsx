import React, { useEffect} from 'react'
import Breadcrumb from './../Components/Breadcrumb';
import {Link, Outlet , useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {useProfileDataStore , useAvatarStore  , useLogOutStore , useMembershipListStore , useCheckLoginStore , } from "../Components/Store/Store"









function Account() {

    const { membershipList , getMembershipList } = useMembershipListStore();
    let {    avatar    , setAvatar } = useAvatarStore()
    let {logOut  } = useLogOutStore();

    let navigation = useNavigate();

    
    function handleLogout() {
        logOut(checkLogin , setIsLogin); 
        navigation('/signin'); 
      }
    


    let {checkLogin , setIsLogin } = useCheckLoginStore()
    
const { t : translate } = useTranslation();


const { profileData, getProfileData } = useProfileDataStore();

   

    const [activeLink, setActiveLink] = useState(1);
    const links = [
        {id: 1, text:  translate('account/editProfile'), path: "editProfile"},
        {id: 2, text:  translate('account/editPassword'), path: "editPassword"},
        {id: 3, text: translate('account/myadvs'), path: ""},
        {id: 4, text: translate('account/favourite') , path: ""},
        {id: 5, text: translate('account/notifications') , path: ""},
        {id: 6, text: translate('account/conversations'), path: ""},
        {id: 7, text: translate('account/bankTransfers'), path: ""},
        {id: 8, text: translate('account/contractRequests'), path: ""},
    ];

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
    };

    // handle image change
    const [selectedImage, setSelectedImage] = useState(null);

  

      
    const handleImageChange = (event) => {
        console.log(event.target.files[0])
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };


    useEffect(()=>{
        getProfileData()
        getMembershipList()
    } , [])
    

  


    return (
        <>
        {membershipList.length === 0 || profileData.length === 0  ? <div className="loading-container">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            </div>  :  <>
        <Breadcrumb title= {translate("breadcrumb/account/title")} />
        <div className="account-section">
            <div className="container">
                <div className="account-section-parent">
                <div className="side-menu">
                <div className="user-photo-section">
                <div className="user-photo-parent">
                    <div className="user-overlay">
                        <i className="las la-camera"></i>
                    </div>
                    <label className="label-img">
                        <input
                            onChange={(event) => {
                                handleImageChange(event)
                                setAvatar(event.currentTarget.files[0])
                                console.log(avatar)
                            }}
                            type="file"
                            accept="image/*"
                        />
                    </label>
                    <div className="user-pic">
                        <img id="user_photo"
                            src={selectedImage ? URL.createObjectURL(selectedImage) : profileData.avatar}
                            alt='user'/>
                    </div>
                </div>
                </div>
                <div className="links">
                    <ul className='ul-es'>
                        {links.map(link => (
                            <li key={link.id}>
                                <Link
                                    className={`ancor-btn ${activeLink === link.id ? 'activeLink' : ''} `}
                                    to={link.path}
                                    onClick={() => handleLinkClick(link.id)}
                                >
                                    {link.text }
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button onClick={handleLogout} className='ancor-btn'>{translate("account/logout")} </button>
                        </li>
                        <li>
                            <button className='ancor-btn'>{translate("account/deleteAccount")}  </button>
                        </li>
                    </ul>
                </div>
                </div>
                    <div className="content">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
        </>}
        
        </>
       
    )
}

export default Account
