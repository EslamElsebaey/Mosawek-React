import React, { useEffect , useState } from 'react'
import footerLogo from "../images/footer-logo.png"
import certified from "../images/certified.png"
import tasawkAr from "../images/tasawk-ar.png"
import appStore from "../images/app-store.png"
import googlePlay from "../images/google-play.png"
// import $ from 'jquery';

function Footer() {



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
   <footer  className="wow padding-30   general-sec">
    <div className="container">
    <div className="footer-items">
    <div className="footer-item img-item">
      <div className="logo-info">
        <img src={footerLogo} alt="" />
      </div>
      <p className='details-text'>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص</p>
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
        <a className='mr-2' href="test"><img  src={appStore} alt="" /></a>
      </div>
    </div>
    <div className="footer-item">
      <div className="quick-links">
        <h4 onClick={handleToggleMenu1} className= {`footer-title ${isMenu1Open ? 'active' : ''}`}>روابط سريعة</h4>
        <ul className={`ul-es  quick-drop ${isMenu1Open ? 'visible200' : ''} ` }>
          <li>
            <a href="test">توثيق عقود الإيجار  </a>
          </li>
          <li>
            <a href="test">  تأكيد التحويلات البنكية </a>
          </li>
          <li>
            <a href="test"> من نحن </a>
          </li>
          <li>
            <a href="test"> الشروط والأحكام </a>
          </li>
          <li>
            <a href="test">الأسئلة الشائعة  </a>
          </li>
          <li>
            <a href="test"> اتصل بنا  </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-item">
      <div className="quick-links">
        <h4 onClick={handleToggleMenu2} className= {`footer-title ${isMenu2Open ? 'active' : ''}`} >الأقسام الرئيسية </h4>
        <ul  className={` main-sections-list ul-es quick-drop ${isMenu2Open ? 'visible700' : ''} ` }>
          <li>
            <a href="test"> شقق للإيجار</a>
          </li>
          <li>
            <a href="test"> أراضي للبيع </a>
          </li>
          <li>
            <a href="test">  فلل للبيع</a>
          </li>
          <li>
            <a href="test">    دور للإيجار</a>
          </li>
          <li>
            <a href="test">   فلل للإيجار</a>
          </li>
          <li>
            <a href="test">   شقق للبيع</a>
          </li>
          <li>
            <a href="test">   غرف للإيجار</a>
          </li>
          <li>
            <a href="test">   عمائر للبيع </a>
          </li>
          <li>
            <a href="test">    محلات للإيجار</a>
          </li>
          <li>
            <a href="test">    بيت للبيع</a>
          </li>
          <li>
            <a href="test">   استراحة للبيع </a>
          </li>
          <li>
            <a href="test">    بيت للإيجار </a>
          </li>
          <li>
            <a href="test">    مزرعة للإيجار </a>
          </li>
          <li>
            <a href="test">     محلات للبيع </a>
          </li>
          <li>
            <a href="test">   استراحة للبيع    </a>
          </li>
          <li>
            <a href="test">  مكتب تجاري للإيجار     </a>
          </li>
          <li>
            <a href="test">   أراضي للإيجار    </a>
          </li>
          <li>
            <a href="test">    عمائر للإيجار   </a>
          </li>
          <li>
            <a href="test">    مستودع للإيجار   </a>
          </li>
          <li>
            <a href="test">    مخيم للإيجار   </a>
          </li>
          <li>
            <a href="test">     شاليه للإيجار   </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="copyright">
    <p>© المسوق الإفتراضي 2023</p>
    <img className="certified" src={certified} alt="" />
    <p className="tasawk">  تصميم و تطوير  <a href="test" > <img src={tasawkAr} alt=""/> </a></p> 
  </div>
    </div>
 
    </footer>
   </>
  )
}

export default Footer
