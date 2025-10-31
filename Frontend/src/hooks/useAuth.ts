import { AuthService } from "../Services.ts/AuthServices";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { AuthQueryKeys } from "../Utils/QueryConstants/auth.queyKeys";

export const useVerifyUser=()=>{
    return useQuery({
        queryKey:AuthQueryKeys.Verify,
        queryFn:()=>AuthService.Verify,
        retry:false
    })
}


export const useSingUp=()=>{
    const queryCliet = useQueryClient();
    return useMutation({
        mutationFn:AuthService.SingUp,
        onSuccess:()=>{
            queryCliet.invalidateQueries({queryKey:AuthQueryKeys.SignUp})
        }
    })
}

export const useLogin=()=>{
     const queryCliet = useQueryClient();
     return({
        mutationFn:AuthService.Login,
        onSucess:()=>{
            queryCliet.invalidateQueries({queryKey:AuthQueryKeys.Login})
        }
     })
}


export const useLogOut=()=>{
    const queryCliet=useQueryClient()
    return({
        mutationFn:AuthService.LogOut,
        onSucess:()=>{
            queryCliet.removeQueries({queryKey:AuthQueryKeys.LogOut})
        }
    })
}