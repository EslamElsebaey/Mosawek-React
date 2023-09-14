import React, { useState  } from 'react'
import footerLogo from "../images/footer-logo.png"
import certified from "../images/certified.png"
import tasawkAR from "../images/tasawk-ar.png"
import tasawkEN from "../images/tasawk-en.png"
import appStore from "../images/app-store.png"
import googlePlay from "../images/google-play.png"
import { useTranslation } from 'react-i18next';
import {useLocaleLangStore} from "../Components/Store/Store"


// import $ from 'jquery';

function Footer() {



  let {localeLang } = useLocaleLangStore()
  const { t : translate } = useTranslation();

    const [isMenu1Open, setMenu1Open] = useState(false);
  const [isMenu2Open, setMenu2Open] = useState(false);


  let handleToggleMenu1 ; 

  let handleToggleMenu2 ; 
   
    if(window.innerWidth < 768){
        handleToggleMenu1 = () => {
            setMenu1Open(!isMenu1Open);
            setMenu2Open(false); 
          };

          handleToggleMenu2 = () => {
            setMenu2Open(!isMenu2Open);
            setMenu1Open(false); 
          };
    }

  return (
   <>
   <footer className="wow padding-30   general-sec">
    <div className="container">
    <div className="footer-items">
    <div className="footer-item img-item">
      <div className="logo-info">
        <img src={footerLogo} alt="" />
      </div>
      <p className='details-text'>{translate("footer/detailesText")}</p>
      <div className="social social-footer">
        <a href='test'>
          <i className="lab la-telegram"></i>
        </a>
        <a href='test'>
        <i className="lab la-instagram"></i>
        </a>
       <a href='test'>
        <i className="lab la-youtube"></i>
       </a>
       <a href='test'>
        <i className="lab la-twitter"></i>
       </a>
       <a href="test">
        <i className="lab la-facebook-f"></i>
       </a>
      </div>
      <div className="apps">
        <a href="test"><img src={googlePlay} alt="" /></a>
        <a  href="test"><img  src={appStore} alt="" /></a>
      </div>
    </div>
    <div className="footer-item">
      <div className="quick-links">
        <h4 onClick={handleToggleMenu1} className= {`footer-title ${isMenu1Open ? 'active' : ''}`}>{translate("footer/quickLinksText")} </h4>
        <ul className={`ul-es  quick-drop ${isMenu1Open ? 'visible200' : ''} ` }>
          <li>
            <a href="test">{translate("footer/Links/rentContractDocument")} </a>
          </li>
          <li>
            <a href="test"> {translate("footer/Links/bankTransferConfirm")} </a>
          </li>
          <li>
            <a href="test">{translate("footer/Links/about")}</a>
          </li>
          <li>
            <a href="test">{translate("footer/Links/terms&conditions")}</a>
          </li>
          <li>
            <a href="test"> {translate("footer/Links/commonQuestions")}</a>
          </li>
          <li>
            <a href="test"> {translate("footer/Links/contactUs")}</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-item">
      <div className="quick-links">
        <h4 onClick={handleToggleMenu2} className= {`footer-title ${isMenu2Open ? 'active' : ''}`} >{translate("footer/mainSectionsText")}</h4>
        <ul  className={` main-sections-list ul-es quick-drop ${isMenu2Open ? 'visible700' : ''} ` }>
          <li>
            <a href="test">  {translate("footer/Links/saleApartments")}   </a>
          </li>
          <li>
            <a href="test"> {translate("footer/Links/saleLands")} </a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/saleVillas")} </a>
          </li>
          <li>
            <a href="test">  {translate("footer/Links/rentalHomes")}    </a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/rentalVillas")}</a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/rentalRooms")} </a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/saleBuildings")}  </a>
          </li>
          <li>
            <a href="test">    {translate("footer/Links/rentalShops")} </a>
          </li>
          <li>
            <a href="test">    {translate("footer/Links/saleHome")} </a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/saleRestHouse")}  </a>
          </li>
          <li>
            <a href="test">    {translate("footer/Links/rentalHome")}  </a>
          </li>
          <li>
            <a href="test">     {translate("footer/Links/rentalFarm")} </a>
          </li>
          <li>
            <a href="test">      {translate("footer/Links/slaeShops")} </a>
          </li>
          <li>
            <a href="test">    {translate("footer/Links/rentlRestHouse")}    </a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/rentalOffice")}     </a>
          </li>
          <li>
            <a href="test">   {translate("footer/Links/rentalLands")}    </a>
          </li>
          <li>
            <a href="test">     {translate("footer/Links/rentalBuildings")}   </a>
          </li>
          <li>
            <a href="test">     {translate("footer/Links/rentalWarehouse")}   </a>
          </li>
          <li>
            <a href="test">      {translate("footer/Links/rentalCamp")}   </a>
          </li>
          <li>
            <a href="test">    {translate("footer/Links/rentalChalet")}      </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="copyright">
    <p>©  {translate("footer/mosaweqText")} 2023</p>
    <img className="certified" src={certified} alt="" />
    <p className="tasawk"> {translate("footer/mosaweq/develop&design")} <a href="test" > 
    <img src= {localeLang === "en" ?  tasawkEN  : tasawkAR} alt=""/> </a></p> 
  </div>
    </div>
 
    </footer>
   </>
  )
}

export default Footer
