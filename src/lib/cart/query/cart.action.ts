import { toast } from "@zerodevx/svelte-toast";
import { API } from "../../util/api.request";
import { getCarts } from "./cart.store";


export namespace CART
{
    export async function DELETE (id : string)
    {
        try 
        {
            const res = await API.DELETE(`carts/${id}`, 
            {
                credentials: 'include'
            })
        } 
        catch (error : any) 
        {
            toast.push(error)
        }
    }
    
    export async function ADD (data : any)
    {
        try 
        {
            const res = await API.POST('carts', {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } 
        catch (error : any) 
        {
            toast.push(`Error : ${error}`, {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(187,72,120,0.9)',
					'--toastBarBackground': 'red'
				}   
			})
        }
    }
    
    export async function UPDATE(data : any, id: string)
    {
        try 
        {
            const res = await API.PATCH(`carts/${id}`, {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } 
        catch (error : any) 
        {
            toast.push(`Error : ${error}`, {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(187,72,120,0.9)',
					'--toastBarBackground': 'red'
				}   
			})
        }
    }
}