import { useAuth } from  '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom';
 
const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {user}=useAuth();
    if(!user){
        return <Navigate to={'/Login'} replace />
    }
  return (
    children
  )
}
 
export default ProtectedRoute