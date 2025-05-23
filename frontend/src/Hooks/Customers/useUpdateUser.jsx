import { useState } from "react"

import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux"
import {addTicket, updateTicket} from '../../Store/Actions/ticketActions'
import { updateUser } from "../../Store/Actions/userActions"
import {useNavigate} from 'react-router-dom'
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
export function useUpdateUserById(){

    
    const [loading,setLoading]=useState(false)
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    

const updateUserById=async(id,payload)=>{
    console.log(payload)
    
    

    setLoading(true)

    try {
        const res=await fetch(`/api/auth/users/update/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        let {updatedUser,success,message}=await res.json()
        if(!updatedUser || !success) throw new Error(message);
        
        else
        {   
            toast.success("User Updated Successfully")
            // dispatch(updateUser(updatedUser))
            navigate("/")
            
            
            // localStorage.setItem("authInfo",JSON.stringify(user))
            
        }
        
    } catch (error) {
        
        toast.error(error.message,{
            duration: 3000,
          },
            {
        
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
              
            },
          )
      
        return error.message
        
    }
    finally{
        setLoading(false)
    }
  

}


return{updateUserById,loading}



}