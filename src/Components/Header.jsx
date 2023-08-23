import React, { useContext, useEffect , useState } from 'react'
import logo from "./../../src/images/logo.png"
import { Link } from 'react-router-dom'
import { GlobalStateContext } from './GlobalState';

function Header() {

  let {logOut , isLogin} = useContext(GlobalStateContext)


const [activeLink, setActiveLink] = useState(null);
const links = [
    { id: 1, text: 'تعديل بيانات الحساب' , path : "account/editProfile"  },
    { id: 2, text: 'تعديل كلمة المرور' , path : "account/editPassword" },
    { id: 3, text: "إعلاناتي"  , path : "" },
    { id: 4, text: "المفضلة"  , path : "" },
    { id: 5, text: "الإشعارات"  , path : "" },
    { id: 6, text: "المحادثات"  , path : "" },
    { id: 7, text: "التحويلات البنكية"  , path : "" },
    { id: 8, text:  "طلبات توثيق العقود" , path : "" },
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
              <button   disabled href="test" className="ancor-btn language-anchor " >English</button>
            </div>
        </div>
        {isLogin === null ?   <Link to="/signin" className="sign dropbtn">
            <i className="las la-user icon"></i>
            <span>تسجيل دخول</span>
         </Link> : 
         <>
         <Link to="" className="sign dropbtn m0">
            <i className="las la-bell"></i>
            <span className="notification"></span>
        </Link>
           <div className="dropdown">
         <button className="dropbtn">
                    <i className="las la-user icon"></i>
                    <span>حسابي <i className="las la-angle-down arrow-down-dropdown"></i> </span>
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
                      <button onClick={logOut} className='ancor-btn'>تسجيل الخروج</button>
                    </li>
                    <li>
                      <button className='ancor-btn'>حذف الحساب </button>
                    </li>
                    </ul>
            </div>
         </div>
         </>
        
       
          }
      
        <a  href="add-adv-1.html" className="link-adv-btn  add-adv-btn">
         <i className="las la-plus"></i> إضافة إعلان
        </a>

      </div>
    </div>

    <div className="nav-header">
        <ul className="big-menu list-unstyled">
          <li className="search-by-map">
            <i className="las la-map"></i> 
            <a  className="ancor-btn"  href="map-view.html">بحث بالخريطة</a>
          </li>
          <li className="active">
            <a  className="ancor-btn" href="index.html"> الكل</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> شقق للإيجار</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> أراضي للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> فلل للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> دور للإيجار</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> فلل للإيجار</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> شقق للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> عمائر للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> محلات للإيجار</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> بيت للإيجار</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> مزرعة للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> مزرعة للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> بيت للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> استراحة للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> بيت للإيجار</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> مزرعة للبيع</a>
          </li>
          <li>
            <a href="test" className="ancor-btn"> مزرعة للبيع</a>
          </li>
        </ul>
    </div>

  </header>
   </>
  )
}

export default Header
