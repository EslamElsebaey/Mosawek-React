
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';



// Register schema
export function RegisterSchema (){
  const { t: translate } = useTranslation();

  const registerSchema = Yup.object().shape({
    membership_id: Yup.mixed()
    .oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9" , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]  , translate("schema/membershipRequired"))
    .required(translate("schema/membershipRequired")),
    name: Yup.string().matches(/^[A-Za-z0-9\s]+$/, translate("schema/nameEnglishOnly")).required(translate("schema/nameRequired")),
    full_name: Yup.string().required(translate("schema/fullNameRequired")),
    phone: Yup.number().positive().test('startsWithEight',
    translate("schema/phoneStartBy5"),
    val => val && val.toString().startsWith('5')).test(
      'len',
      translate("schema/phoneMaxLength9"),
      val => val && val.toString().length === 9).required(translate("schema/phoneRequired")) ,
    country_id:Yup.number().min(1, translate("schema/countryRequired")).required(translate("schema/countryRequired")),
    email: Yup.string().email(translate("schema/emailInvalid")).required(translate("schema/emailRequired")),
    personal_info: Yup.string(),
    password: Yup.string().test(
      'len',
      translate("schema/passwordMinLenght6"),
      val => val && val.toString().length >= 6).required(translate("schema/passwordRequired")),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], translate("schema/passwordIdentical"))
      .required(translate("schema/passwordConfirmRequired")),
    id_number: Yup.number().test(
      'len',
      translate("schema/idnumberMinLength11"),
      val => val && val.toString().length === 11).required( translate("schema/idnumberRequired") ),
    zone_id: Yup.number().min(1, translate("schema/zoneRequired")).required(translate("schema/zoneRequired")),
    city_id:Yup.number().min(1, translate("schema/cityRequired")).required(translate("schema/cityRequired")),
    checkboxField: Yup.boolean().oneOf([true], translate("schema/conditionsRequired"))
  });
return registerSchema
}


// Code confirm schema
export function CodeConfirmSchema (){
  const { t: translate } = useTranslation();

   const codeConfirmSchema =  Yup.object().shape({
    code: Yup.number().positive().test(
      'len',
      translate("schema/codeMaxLength5"),
      val => val && val.toString().length === 5).required(translate("schema/codeRequired")) ,
  });

  return codeConfirmSchema

}



  // Sign in schema
  export function SignInSchema (){
   
    const { t: translate } = useTranslation();

   const signInSchema = Yup.object().shape({
    name: Yup.string().matches(/^[A-Za-z0-9\s]+$/, translate("schema/nameEnglishOnly")).required(translate("schema/nameRequired")),
    password: Yup.string().test(
      'len',
      translate("schema/passwordMinLenght6"),
      val => val && val.toString().length >= 6).required(translate("schema/passwordRequired")),
  })
  return signInSchema
  
}


// Edit profile  schema

export function EditProfileSchema(){
  const { t: translate } = useTranslation();

  const editProfileSchema = Yup.object().shape({
    membership_id: Yup.mixed()
    .oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9" , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]  , translate("schema/membershipRequired"))
    .required(translate("schema/membershipRequired")),
    full_name: Yup.string().required(translate("schema/fullNameRequired")),
    phone: Yup.number().positive().test('startsWithEight',
    translate("schema/phoneStartBy5"),
    val => val && val.toString().startsWith('5')).test(
      'len',
      translate("schema/phoneMaxLength9"),
      val => val && val.toString().length === 9).required(translate("schema/phoneRequired")) ,
    email: Yup.string().email(translate("schema/emailInvalid")).required(translate("schema/emailRequired")),
    city_id:Yup.number().min(1, translate("schema/cityRequired")).required(translate("schema/cityRequired")),
  });
  return editProfileSchema
}




// Edit Password  schema

export function EditPasswordSchema (){
  const { t: translate } = useTranslation();

  const editPasswordSchema = Yup.object().shape({
    old_password: Yup.string().test(
      'len',
      translate("schema/passwordMinLenght6"),
      val => val && val.toString().length >= 6).required(translate("schema/currentPasswordRequired")),
      password: Yup.string().test(
        'len',
        translate("schema/passwordMinLenght6"),
        val => val && val.toString().length >= 6).required(translate("schema/newPasswordRequired")),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], translate("schema/passwordIdentical"))
      .required(translate("schema/newPasswordConfirmRequired")),
  });
  return editPasswordSchema
  
}




// Forget password schema
export function ForgetPasswordSchema(){
  const { t: translate } = useTranslation();

  const forgetPasswordSchema = Yup.object().shape({
    phone: Yup.number().positive().test('startsWithEight',
    translate("schema/phoneStartBy5"),
    val => val && val.toString().startsWith('5')).test(
      'len',
      translate("schema/phoneMaxLength9"),
      val => val && val.toString().length === 9).required(translate("schema/phoneRequired")) ,
  });

  return forgetPasswordSchema
}



// New Password  schema
export function NewPasswordSchema(){
  const { t: translate } = useTranslation();

  const newPasswordSchema = Yup.object().shape({
    password: Yup.string().test(
      'len',
      translate("schema/passwordMinLenght6"),
      val => val && val.toString().length >= 6).required(translate("schema/passwordRequired")),
      password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], translate("schema/passwordIdentical"))
    .required(translate("schema/passwordConfirmRequired")),
});
return newPasswordSchema
}



