import React, { useEffect } from 'react'
import building1 from "./../../src/images/home-images/01.png"
import building2 from "./../../src/images/home-images/02.png"
import building3 from "./../../src/images/home-images/03.png"
import building4 from "./../../src/images/home-images/04.png"
import building5 from "./../../src/images/home-images/05.png"
import building6 from "./../../src/images/home-images/06.png"
import { useTranslation } from 'react-i18next';
import {useCheckLoginStore} from "../Store/Store"
 

function Home() {


  

  let {checkLogin } = useCheckLoginStore()

  const { t : translate } = useTranslation();


  
let homeBlocks = [
  {
    img : building1 ,
    title : translate("home/advs/advTitle") , 
    space : 200 , 
    bedrooms : 5 , 
    couch : 2  ,
    bathrooms : 5 ,
    price : translate("home/advs/advPriceText")  , 
    address : translate("home/advs/advAddressText")
  },
  {
    img : building2 ,
    title : translate("home/advs/advTitle") , 
    space : 200 , 
    bedrooms : 5 , 
    couch : 2  ,
    bathrooms : 5 ,
    price : translate("home/advs/advPriceText")  , 
    address : translate("home/advs/advAddressText")
  },
  {
    img : building3 ,
    title : translate("home/advs/advTitle") , 
    space : 200 , 
    bedrooms : 5 , 
    couch : 2  ,
    bathrooms : 5 ,
    price : translate("home/advs/advPriceText")  , 
    address : translate("home/advs/advAddressText")
  },
  {
    img : building4 ,
    title : translate("home/advs/advTitle") , 
    space : 200 , 
    bedrooms : 5 , 
    couch : 2  ,
    bathrooms : 5 ,
    price : translate("home/advs/advPriceText")  , 
    address : translate("home/advs/advAddressText")
  },
  {
    img : building5 ,
    title : translate("home/advs/advTitle") , 
    space : 200 , 
    bedrooms : 5 , 
    couch : 2  ,
    bathrooms : 5 ,
    price : translate("home/advs/advPriceText"), 
    address : translate("home/advs/advAddressText")
  },
  {
    img : building6 ,
    title : translate("home/advs/advTitle") , 
    space : 200 , 
    bedrooms : 5 , 
    couch : 2  ,
    bathrooms : 5 ,
    price : translate("home/advs/advPriceText")  , 
    address : translate("home/advs/advAddressText")
  },

]

  
useEffect(()=>{
  checkLogin()
} , [])


  return (
    <>
    <div className="home-section">
      <div className="container">
        <div className="home-section-parent">
        {homeBlocks.map((buildingItem , index)=>{
          return(
            <div key={index} className="home-block">
            <button className="fav-btn"><i className="lar la-heart"></i></button>
            <a href="test">
              <div className="pro-img">
                <figure>
                  <img src={buildingItem.img} alt="building" />
                </figure>
              </div>
            </a>
            <div className="home-details">
              <a className='ancor-btn' href="post.html">{buildingItem.title}</a>
              <ul className="home-discription">
               <li><i className="las la-ruler-combined"></i> {buildingItem.space} م<sup>2</sup></li>
               <li><i className="las la-bed"></i> {buildingItem.bedrooms}</li>
               <li><i className="las la-couch"></i> {buildingItem.couch}</li>
               <li><i className="las la-bath"></i> {buildingItem.bathrooms}</li>
              </ul>
              <p>{buildingItem.price} </p>
              <span>{buildingItem.address}</span>
            </div>
          
            </div>
          )
            
        })}
        </div>
        <div className="pagination-sec">
            <div className="pagination-sec-parent">
                <a href="test" className="next ancor-btn">
                    <i className="las la-angle-double-right"></i>
                </a>
                <a href="test" className="pag1 ancor-btn page-active">1</a>
                <a href="test" className="pag2 ancor-btn">2</a>
                <a href="test" className="bullets ancor-btn">...</a>
                <a href="test" className="pag5 ancor-btn">5</a>
                <a href="test" className="prev ancor-btn">
                    <i className="las la-angle-double-left"></i>
                </a>
            </div>
        </div>
      </div>
    </div>
    {/* <div className="mobile-show-icons fixed-bottom">
      <div className="container">
         <ul className="mobile-icons">
            <li>
               <a href="add-adv-1.html" className="link-adv-btn add-adv-btn">
               <i className="las la-plus"></i> إضافة إعلان
               </a>
            </li>
            <li>
               <a href="sign-in.html" className="sign dropbtn">
               <i className="las la-user icon"></i>
               <span>تسجيل دخول</span>
               </a>
            </li>
            <li>
               <div className="show-icons">
                  <button className="add-to fixed-search">
                  <span className="open-search">
                  </span>
                  <span className="search-span">بحث</span>
                  </button>
               </div>
            </li>
            <li>
              <button className="advanced-search-btn" >
                <i className="las la-glasses"></i>
                بحث متقدم
              </button>
            </li>
         </ul>
      </div>
   </div> */}
    
    </>
  )
}

export default Home
