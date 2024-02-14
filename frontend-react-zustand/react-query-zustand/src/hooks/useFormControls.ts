import { passwordCompare } from "../components/userForms/registerForm";
import { newUserToDb } from "./types.users";


export function useFormControls (){

    const passwordValidate = (passwordObjet  : passwordCompare , userObjet : newUserToDb) => {

    if(passwordObjet.password != passwordObjet.repeatPassword){
        passwordObjet.errorInPassword = true
        return{ passwordObjet , userObjet};
    }else if(passwordObjet.password == '' || passwordObjet.repeatPassword === ''){
        passwordObjet.errorInPassword = true
        return{ passwordObjet , userObjet}
    }else{
        passwordObjet.errorInPassword = false
        userObjet.password = passwordObjet.password
        return({ passwordObjet , userObjet});
        
    } 
}

    // const setNewUserInfo = (name: string, value :string, inComingPasswordObjet  : passwordCompare , inComingUserObjet : newUserToDb) =>{
    //     let passwordObjet = {...inComingPasswordObjet}
    //     const userObjet = { ...inComingUserObjet}
    //     const arrayPaswordObjet = Object.entries(passwordObjet)
    //     const userInfoArray = Object.entries(userObjet)
       
    //     if(name == 'repeatPassword' || name == 'password') {
    //        const index = arrayPaswordObjet.findIndex(item => item[0] === name)
    //        console.log
    //        arrayPaswordObjet[index][1] = value // inserta el valor en el campo
    //         passwordObjet = Object.fromEntries(arrayPaswordObjet)
    //         return({passwordObjet, userObjet});
    //     // redirige para logica de validacion de password
    //    }
    //     else if (name != 'repeatPassword'){
    //       const index = userInfoArray.findIndex(item => item[0]=== name)
    //       userInfoArray[index][1]= value
    //       const userObjet = Object.fromEntries(userInfoArray)
    //     return({passwordObjet, userObjet});
    //     }
    // }
    return{passwordValidate}
}