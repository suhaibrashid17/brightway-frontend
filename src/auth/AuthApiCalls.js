import axios from "axios";

const admin = {
    "username" : "admin",
    "password" : "123456"
}

export const register=(UserDetails)=>{
   return new Promise(async(resolve,reject)=>{
        try{
           
        }
        catch(error)
        {
        }
   })
}

export const login=(UserDetails)=>{
   return new Promise(async(resolve,reject)=>{
        try{
           if(admin.username == UserDetails.user && admin.password == UserDetails.password){
             resolve(admin);
           } else{
            reject({error : "Incorrect username or password!"})
           }
        }
        catch(error)
        {
            console.log(error)
            reject(error)
        }
   })
}