import axios from 'axios';

// ecommerceAPI 
const ecommerceAPI = axios.create({
    baseURL: 'https://vm.tasawk.net/rest-api/ecommerce',
    headers: {
        'Accept-Language':localStorage.locale,
        "X-Api-Token" :  JSON.parse(localStorage.getItem("mosaweq-new-user"))  ,
        "Accept" : " application/json"
    }
  });


// locations API 
  const locationsAPI = axios.create({
    baseURL: 'https://vm.tasawk.net/rest-api/locations',
    headers: {
        'Accept-Language': 'ar',
        "Accept" : " application/json"
    }
  });



  export {ecommerceAPI , locationsAPI}