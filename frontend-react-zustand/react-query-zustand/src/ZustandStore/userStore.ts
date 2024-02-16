import { create} from "zustand";
import { userLogginState, user } from "../hooks/types.users";
import { persist } from "zustand/middleware";

interface userStoreState{
    newUser: userLogginState,
    userLogged : user
    setNewUser: (email:string, password:string)=> void, 
    removeNewUser: ()=> void,
    addUserLogged: (usuario : user)=> void
}

export const UserStore = create(persist<userStoreState>((set, get)=>({
    newUser: { email: "", password: ""},
    userLogged:{
        name: "",
        email: "",
        password: ""
    },
    setNewUser:(email, password)=>{
        let {newUser} = get()
        newUser = {email:email, password:password} 
        set(()=>({
            newUser
        }))
    },
     removeNewUser:()=>{
        set(()=>({
           newUser : { email: "", password: ""}
        }))
     }, 
     addUserLogged:(usuario)=>{
        const {removeNewUser} = get()
        removeNewUser()
        set(()=>({
            userLogged: usuario
        }))
     }
}), {name:'userVideoAppStorage'}))