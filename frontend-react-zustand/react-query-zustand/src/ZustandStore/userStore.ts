import { create} from "zustand";
import { userLogginState } from "../hooks/types.users";
import { persist } from "zustand/middleware";

interface userStoreState{
    newUser: userLogginState
    setNewUser: (email:string, password:string)=> void
}

export const UserStore = create(persist<userStoreState>((set, get)=>({
    newUser: { userEmail: "", userPassword: ""},
    setNewUser:(email, password)=>{
        let {newUser} = get()
        newUser = {userEmail:email, userPassword:password} 
        set(()=>({
            newUser
        }))
    }
}), {name:'userVideoAppStorage'}))