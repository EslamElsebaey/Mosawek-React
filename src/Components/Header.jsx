import React, { useEffect , useRef, useState } from 'react'
import logo from "./../../src/images/logo.png"
import { Link , useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {useLocaleLangStore  , useCheckLoginStore , useLogOutStore} from "../Components/Store/Store"

function Header() {



  let navigation = useNavigate();


  let { setLocaleLang } = useLocaleLangStore()
  let {isLogin , setIsLogin , checkLogin} = useCheckLoginStore()
   let {logOut     } = useLogOutStore();
  const { t : translate, i18n } = useTranslation();

  let langRef = useRef()
  


  function handleLogout() {
    logOut(checkLogin ,setIsLogin ); 
    navigation('/signin'); 
  }
 

  
useEffect(()=>{
  if(localStorage.locale === undefined) {
    langRef.current.textContent = "English"
  }else if (localStorage.locale === "ar"){
    langRef.current.textContent = "English"
  }else if (localStorage.locale === "en"){
    langRef.current.textContent = "العربية"
  }
 
} , [])
  
  // Find the elements with the specified classes



  const toggleLanguage = () => {
    let locale = localStorage.locale === 'en' ? 'ar' : 'en';

    // Toggle Current Language
    i18n.changeLanguage(locale);
    localStorage.setItem('locale', locale);


    setLocaleLang(localStorage.locale);
   

    // Change Direction
    if (locale === 'en'){
      document.body.classList.add('en');
      langRef.current.textContent = "العربية"
    } else {
      document.body.classList.remove('en');
      langRef.current.textContent = "English"
    } 
  }

const [activeLink, setActiveLink] = useState(null);
const links = [
    { id: 1, text: translate('nav/editProfile') , path : "account/editProfile"  },
    { id: 2, text: translate('nav/editPassword') , path : "account/editPassword" },
    { id: 3, text: translate('nav/myadvs')  , path : "" },
    { id: 4, text: translate('nav/favourite')  , path : "" },
    { id: 5, text: translate('nav/notifications')  , path : "" },
    { id: 6, text: translate('nav/conversations')  , path : "" },
    { id: 7, text: translate('nav/bankTransfers')  , path : "" },
    { id: 8, text:  translate('nav/contractRequests') , path : "" },
  ];

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };



  
  return (
   <>
   
   <header className="fixed-top">
    <div className="search-bar ">
      <figure className="img-logo">
        <Link to="/home"><img src={logo} className="img-fluid" alt="logo"/></Link>
      </figure>
      <div className="search-select-part">
        <div className="search-section" id="search-icon">
        <div className="select-wrapper">
          <select>
            <option>اختر نوع العقار</option>
            <option>اختر نوع العقار</option>
            <option>اختر نوع العقار</option>
            <option>اختر نوع العقار</option>
          </select>
        <div className="select-selected">اختر نوع العقار</div><div className="select-items select-hide"><div>اختر نوع العقار</div><div>اختر نوع العقار</div><div>اختر نوع العقار</div></div></div>

        <div className="select-wrapper">
          <select>
            <option>اختر المدينة</option>
            <option>اختر المدينة</option>
            <option>اختر المدينة</option>
            <option>اختر المدينة</option>
          </select>
        <div className="select-selected">اختر المدينة</div><div className="select-items select-hide"><div>اختر المدينة</div><div>اختر المدينة</div><div>اختر المدينة</div></div></div>

        <button className="search-button ancor-btn">
          <i className="las la-search"></i>
          بحث
        </button>
        </div>
      </div>
      <div className="lang-part mobile-lang-part">
        <div className="lang-section">
            <div className="lang-word ">
              <button ref={langRef} onClick={toggleLanguage}  className="ancor-btn language-anchor " > {translate('nav/language')}  </button>
            </div>
        </div>
        {isLogin === null ?   <Link to="/signin" className="signinBtn ">
            <i className="las la-user icon"></i>
            <span> {translate("nav/login")}  </span>
         </Link> : 
         <>
         <Link to="" className="sign notificationBtn m0">
            <i className="las la-bell"></i>
            <span className="notification"></span>
        </Link>
           <div className="dropdown">
         <button className="dropbtn">
                    <i className="las la-user icon"></i>
                    <span> {translate('nav/myAccountText')}   <i className="las la-angle-down arrow-down-dropdown"></i> </span>
                </button>
                <div className="dropdown-content">
                <ul className='ul-es'>
                    {links.map(link => (
                        <li key={link.id}>
                            <Link
                            className="ancor-btn"
                            to={link.path}
                            onClick={() => handleLinkClick(link.id)}
                            >
                            {link.text}
                            </Link>
                        </li>
                    ))}
                    <li>
                      <button onClick={ handleLogout} className='ancor-btn'> {translate("nav/logout")}  </button>
                    </li>
                    <li>
                      <button className='ancor-btn'> {translate("nav/deleteAccount")}  </button>
                    </li>
                    </ul>
            </div>
         </div>
         </>
        
       
          }
      
        <a  href="add-adv-1.html" className="link-adv-btn  add-adv-btn">
         <i className="las la-plus"></i>  {translate("nav/createAdv")} 
        </a>

      </div>
    </div>

    <div className="nav-header">
        <ul className="big-menu list-unstyled">
          <li className="search-by-map">
            <i className="las la-map"></i> 
            <a  className="ancor-btn"  href="map-view.html">{translate("header/searchBymap")} </a>
          </li>
          <li className="active">
            <a  className="ancor-btn" href="index.html"> {translate("header/tags/all")}</a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/apartments")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">{translate("header/tags/lands")}   </a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> {translate("header/tags/saleVillas")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">{translate("header/tags/saleBuildings")}  </a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> {translate("header/tags/saleShops")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> {translate("header/tags/rendtalVillas")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/saleFarms")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/rentalShops")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/saleRestHouse")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/rentalBuildings")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/rentalHome")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/slaeWareHouse")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/slaeWareHouse")} </a>
          </li>
          <li>
            <a href="test" className="ancor-btn">  {translate("header/tags/saleApartments")} </a>
          </li>
        </ul>
    </div>

  </header>
   </>
  )
}

export default Header
