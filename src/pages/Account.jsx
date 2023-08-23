import React, { useContext, useEffect} from 'react'
import Breadcrumb from './../Components/Breadcrumb';
import {Link, Outlet} from 'react-router-dom';
import {useState} from 'react';
import { GlobalStateContext } from './../Components/GlobalState';





function Account() {
    let {profileData , getMembershipList  , avatar , logOut , getProfileData , membershipList , setAvatar } = useContext(GlobalStateContext)

    // console.log(profileData.avatar)

    const [activeLink, setActiveLink] = useState(1);
    const links = [
        {id: 1, text: 'تعديل بيانات الحساب', path: "editProfile"},
        {id: 2, text: 'تعديل كلمة المرور', path: "editPassword"},
        {id: 3, text: "إعلاناتي", path: ""},
        {id: 4, text: "المفضلة", path: ""},
        {id: 5, text: "الإشعارات", path: ""},
        {id: 6, text: "المحادثات", path: ""},
        {id: 7, text: "التحويلات البنكية", path: ""},
        {id: 8, text: "طلبات توثيق العقود", path: ""},
    ];

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
    };

    // handle image change
    const [selectedImage, setSelectedImage] = useState(null);

    
    const handleImageChange = (event) => {
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
        <Breadcrumb title="حسابى"/>
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
                            <button onClick={logOut} className='ancor-btn'>تسجيل الخروج</button>
                        </li>
                        <li>
                            <button className='ancor-btn'>حذف الحساب</button>
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
