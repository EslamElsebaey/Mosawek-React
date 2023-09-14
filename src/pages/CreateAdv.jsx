// import React, { useContext, useEffect } from 'react'
// import Breadcrumb from '../Components/Breadcrumb';
// import { Formik, Form   } from 'formik';
// import Select from 'react-select';
// import { GlobalStateContext } from '../Global_state/GlobalState';


// function CreateAdv() {


//     let {categoryList , getCategories , setCategorySelected } = useContext(GlobalStateContext);

// useEffect(()=>{
//     getCategories()
// } , [])

// const validate = (values)=>{
//     console.log(values)
// }


//   return (
//    <>
//       <Breadcrumb title="اضافة اعلان"/>
//       <div className="register-section">
//             <div className="container">
//                 <div className="register-content">
//                     <div className="register-form-content">
//                     <h2 className='general-form-content-h2'> اضافة اعلان</h2>
//                     <Formik
//                     // onSubmit={userRegister}
//                     initialValues={{
//                         category_id : ""
//                     }}
//                     // validationSchema={registerSchema}
//                     validate={validate}
//         >
            
//           {({ isSubmitting, values, handleChange, handleBlur, errors, touched , setFieldValue , validateField }) => (
//             <Form className='myform'>
//               <div className="general-input-div select-general-input">
//                 <label className="myLabel" htmlFor="">
//                 القسم 
//                 </label>
//                   <Select
//                     className={`general-input ${ touched.category_id && errors.category_id && "input-error"}`}
//                     name="country_id"
//                     onChange={(categorySelected) => 
//                         {
//                             setFieldValue("category_id", categorySelected.value);
//                             setCategorySelected(categorySelected)
//                         }
//                     }
//                     placeholder="اختر القسم"
//                     // value={regionSelectedOption}
//                     options={categoryList}
//                 /> 
//                 {errors.category_id && touched.category_id && <div className="error">{errors.category_id}</div>}
//               </div>
//             </Form>
//           )}
//                     </Formik>
//                     </div>
                  
//                 </div>
//             </div>
//         </div>
//    </>
//   )
// }

// export default CreateAdv
