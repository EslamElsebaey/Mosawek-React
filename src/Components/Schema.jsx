
import * as Yup from 'yup';



// Register schema

 export const registerSchema = Yup.object().shape({
    membership_id: Yup.mixed()
    .oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9" , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]  , "نوع العضوية حقل مطلوب")
    .required("نوع العضوية حقل مطلوب"),
    name: Yup.string().matches(/^[A-Za-z\s]+$/, ' اسم المستخدم انجليزى فقط  ').required('اسم المستخدم حقل مطلوب'),
    full_name: Yup.string().required('الاسم بالكامل حقل مطلوب'),
    phone: Yup.number().positive().test('startsWithEight',
    'يجب ان يبدأ رقم الجوال ب 5',
    val => val && val.toString().startsWith('5')).test(
      'len',
      'يجب ان يكون الجوال 9 أرقام فقط',
      val => val && val.toString().length === 9).typeError("يجب ان يحتوى رقم الجوال على أرقام فقط").required('رقم الجوال حقل مطلوب') ,
    country_id:Yup.number().min(1, "الدولة حقل مطلوب").required("الدولة حقل مطلوب"),
    email: Yup.string().email('البريد الالكترونى غير صالح ').required('البريد الاكترونى حقل مطلوب'),
    personal_info: Yup.string(),
    password: Yup.string().test(
      'len',
      "يجب الا تقل كلمة المرور عن 6 حروف/ارقام",
      val => val && val.toString().length >= 6).required('كلمة المرور حقل مطلوب'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'كلمة المرور غير مطابقة')
      .required('تأكيد كلمة المرور حقل مطلوب'),
    id_number: Yup.number().test(
      'len',
      'يجب ان يكون رقم الهوية مكون من 11 رقم فقط',
      val => val && val.toString().length === 11).typeError("يجب ان يحتوى رقم الهوية على أرقام فقط").required(' رقم الهوية حقل مطلوب'  ),
    zone_id: Yup.number().min(1, "المنطقة حقل مطلوب").required("المنطقة حقل مطلوب"),
    city_id:Yup.number().min(1, "المدينة حقل مطلوب").required("المدينة حقل مطلوب"),
    checkboxField: Yup.boolean().oneOf([true], 'الشروط و الأحكام حقل مطلوب')
  });


// Code confirm schema
  export const codeConfirmSchema =  Yup.object().shape({
    code: Yup.number().positive().test(
      'len',
      "يجب ان يكون كود التحقق 5 ارقام فقط ",
      val => val && val.toString().length === 5).typeError("يجب ان يحتوى كود التحقق على ارقام فقط").required("كود التحقق حقل مطلوب") ,
  });



  // Sign in schema

export const signInSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z\s]+$/, 'اسم المستخدم انجليزى فقط  ').required('اسم المستخدم حقل مطلوب'),
  password: Yup.string().test(
    'len',
    "يجب الا تقل كلمة المرور عن 6 حروف/ارقام",
    val => val && val.toString().length >= 6).required('كلمة المرور حقل مطلوب'),
})


// Edit profile  schema

export const editProfileSchema = Yup.object().shape({
  membership_id: Yup.mixed()
  .oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9" , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]  , "نوع العضوية حقل مطلوب")
  .required("نوع العضوية حقل مطلوب"),
  full_name: Yup.string().required('الاسم بالكامل حقل مطلوب'),
  phone: Yup.number().positive().test('startsWithEight',
  'يجب ان يبدأ رقم الجوال ب 5',
  val => val && val.toString().startsWith('5')).test(
    'len',
    'يجب ان يكون الجوال 9 أرقام فقط',
    val => val && val.toString().length === 9).typeError("يجب ان يحتوى رقم الجوال على أرقام فقط").required('رقم الجوال حقل مطلوب') ,
  email: Yup.string().email('البريد الالكترونى غير صالح ').required('البريد الاكترونى حقل مطلوب'),
  city_id:Yup.number().min(1, "المدينة حقل مطلوب").required("المدينة حقل مطلوب"),
});



// Edit Password  schema

export const editPassword = Yup.object().shape({
  old_password: Yup.string().test(
    'len',
    "يجب الا تقل كلمة المرور عن 6 حروف/ارقام",
    val => val && val.toString().length >= 6).required('كلمة المرور الحالية حقل مطلوب'),
    password: Yup.string().test(
      'len',
      "يجب الا تقل كلمة المرور عن 6 حروف/ارقام",
      val => val && val.toString().length >= 6).required('كلمة المرور الجديدة حقل مطلوب'),
      password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'كلمة المرور غير مطابقة')
    .required('تأكيد كلمة المرور الجديدة حقل مطلوب'),
});




// Forget password schema

export const forgetPasswordSchema = Yup.object().shape({
  phone: Yup.number().positive().test('startsWithEight',
  'يجب ان يبدأ رقم الجوال ب 5',
  val => val && val.toString().startsWith('5')).test(
    'len',
    'يجب ان يكون الجوال 9 أرقام فقط',
    val => val && val.toString().length === 9).typeError("يجب ان يحتوى رقم الجوال على أرقام فقط").required('رقم الجوال حقل مطلوب') ,
});


// New Password  schema

export const newPasswordSchema = Yup.object().shape({
    password: Yup.string().test(
      'len',
      "يجب الا تقل كلمة المرور عن 6 حروف/ارقام",
      val => val && val.toString().length >= 6).required('كلمة المرور حقل مطلوب'),
      password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'كلمة المرور غير مطابقة')
    .required('تأكيد كلمة المرور  حقل مطلوب'),
});
