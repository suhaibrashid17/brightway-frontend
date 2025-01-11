import axios from "axios"

export const register=(UserDetails)=>{
   return new Promise(async(resolve,reject)=>{
        try{
            console.log(UserDetails);
            const response= await axios.post("http://localhost:8080/api/teacher/addteacher",UserDetails);
            if(response){
                resolve(response);
            }
        }
        catch(error)
        {
            console.log(error)
            reject(error)
        }
   })
}
export const getAllTeachers=()=>{
   return new Promise(async(resolve,reject)=>{
        try{
            console.log("im in api calls")
            const response= await axios.get("http://localhost:8080/api/teacher/getteachers");
            if(response){
                resolve(response);
            }
        }
        catch(error)
        {
            console.log(error)
            reject(error)
        }
   })
}