import api from "../Api/Api";

 const route='/auth';
export const AuthService={
    SingUp:(input:{firstName:string,lastName:string,email:string,password:string})=>
         api.post(`${route}/signUp`,input),
    Login:(input:{email:string,password:string})=>
         api.post(`${route}/login`,input),
    LogOut:()=>api.post(`${route}/logOut`),
    Verify:()=>api.get(`${route}/verify`),
}