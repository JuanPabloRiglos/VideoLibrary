export interface userLogginState{
    userNameOrEmail: string,
    userPassword: string
}

export interface newUserToDb{
    userName:string,
    email:string,
    password:string,
    img?:string
}