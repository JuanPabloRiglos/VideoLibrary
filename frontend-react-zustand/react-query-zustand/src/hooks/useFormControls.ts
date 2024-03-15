// import { passwordCompare } from "../components/userForms/registerForm";
// import { newUserToDb } from "./types.users";


export function useFormControls (){

    const  isEmail = (email: string) : boolean=>{
        const expReg=  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const isValid = expReg.test(email)
        return isValid
    }


return{isEmail}
}