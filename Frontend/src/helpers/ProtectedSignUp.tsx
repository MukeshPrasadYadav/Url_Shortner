 
import { useAuth } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom';
 
 
import type { ReactNode } from 'react';
 
const ProtectedSignUp = ({children}:{children:ReactNode}) => {
    const {user,loading}=useAuth();
    if(loading){
        return <div>Loading</div>
    }
    if(user){
        return <Navigate to={'/'} />
    }
  return (
  children
  )
}
 
export default ProtectedSignUp