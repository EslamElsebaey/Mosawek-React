
import SignIn from './pages/SignIn';
import { useEffect } from 'react';
import $ from 'jquery';
import {Route , Routes} from "react-router-dom"
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/Register';
import Footer from './Components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import CodeConfirm from './pages/CodeConfirm';
import Home from './pages/Home';
import Header from './Components/Header';
import Account from './pages/Account';
import EditProfile from './Components/Account/Edit_profile';
import EditPassword from './Components/Account/EditPassword';
import Protectedroute from './Components/Protectedroute';
import GlobalState from "./Components/GlobalState"
import NewPassword from './pages/NewPassword';




function App() {

  // log out 
  useEffect(()=>{
    
    $(window).on("load", function () {
      $(".preloader").fadeOut();
    })
    // to top button
     $(window).scroll(function(){
      if($(window).scrollTop() > 150){
        $(".toTop").addClass("showToTop");
      }else{
        $(".toTop").removeClass("showToTop")
      }
    })
    
    $(".toTop").click(function(){
      $('html, body').animate({scrollTop:0}, 500);
    }) 
      } , [])
    
  return (
   <>
      {/* preloader  */}
      <div className="preloader">
      <div className="progress">
        <div className="progress-bar"></div>
      </div>
    </div>
     {/* end of preloader  */}

   {/* to top button */}
   <button className="toTop">
    <i className="las toTop-icon  la-long-arrow-alt-up"></i>
  </button>
   {/* to top button */}
  
  <GlobalState>
  <Header/>
   <Routes>
    <Route path="/" element={ <Protectedroute><Home/></Protectedroute> } />
    <Route path="/home" element={ <Protectedroute><Home/></Protectedroute> } />
    <Route path="/forgetpassword" element={ <ForgetPassword/> }/>
    <Route path="/signin" element={ <SignIn/>}/>
    <Route path="/register" element={ <Register/>}/>
    <Route path="/codeconfirm" element={ <CodeConfirm/> }/>
    <Route path="/newpassword" element={ <NewPassword/> }/>
    <Route path="/home" element={ <Protectedroute><Home/></Protectedroute> }/>
    <Route path="account" element={  <Protectedroute><Account/></Protectedroute> }>
      <Route path="editProfile" element={ <Protectedroute><EditProfile/></Protectedroute>  }/>
      <Route path="editPassword" element={ <Protectedroute> <EditPassword/></Protectedroute> }/>
    </Route>
   </Routes>
   <Footer/>
  </GlobalState>
 
 
  
 
  
   
   </>
  );
}

export default App;
