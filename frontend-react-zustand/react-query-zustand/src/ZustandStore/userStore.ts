import { create} from "zustand";
import { userLogginState, user } from "../hooks/types.users";
import { persist } from "zustand/middleware";


interface userStoreState{
    allUser: user[]| [] ,
    newUser: userLogginState,
    userLogged : user,
    getAllUserFromDb: (users : user[])=> void,
    setNewUser: (email:string, password:string)=> void, 
    removeNewUser: ()=> void,
    addUserLogged: (usuario : user)=> void, 
    removeUserLogged: () => void
}

export const UserStore = create(persist<userStoreState>((set, get)=>({
    allUser:[],
    newUser: { email: "", password: ""},
    userLogged:{
        _id:'',
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        playlists: [],
        videos:[{  _id: "",
        title: "",
        description: "",
        url: "",
        topyc: "",
        owners: [""]}],
        followed:[],
        followers:[],
    },
    getAllUserFromDb:(users)=>{
        console.log('en el storage llegan estos usuarios', users)
        set(()=>({
            allUser : users
        }))
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
     },
     removeUserLogged:()=>{
        set(()=>({
        userLogged : {
            _id:'',
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        playlists: [],
        videos:[{ _id: "",
        title: "",
        description: "",
        url: "",
        topyc: "",
        owners: [""]}],
        followed:[],
        followers:[]}
        }))
     },
}), {name:'userVideoAppStorage'}))