import axios from "axios"

export const register=(UserDetails)=>{
   return new Promise(async(resolve,reject)=>{
        try{
            console.log(UserDetails);
            const response= await axios.post("http://localhost:8080/api/student/addstudent",UserDetails);
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

export const getAllStudentsByClass = (students_class)=>{
    const params = {class:students_class};
    console.log(params);
    return new Promise(async(resolve,reject)=>{
        try{
            const response= await axios.get("http://localhost:8080/api/student/getstudentbyclass",{params});
            if(response){
                resolve(response);
            }
        } 
        catch(error){
            reject(error);
            console.log(error);
        }
    })
}