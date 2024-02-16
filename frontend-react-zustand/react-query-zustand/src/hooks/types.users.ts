export interface userLogginState{
    email: string,
    password: string
}

export interface user{
    name:string,
    email:string,
    password:string,
    img?:string,
    createdAt?:string,
    updatedAt?:string,
    _id?:string
}

export interface erroLogginState  {email:string, password:string, api:string}