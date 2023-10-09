import { toast } from "@zerodevx/svelte-toast"
import { API } from "../../util/api.request"
import type { Carts } from "../../interface/cart.interface"
import joaat from "../../util/joaat.hash"
import { writable } from "svelte/store"
import { navigate } from "svelte-routing"

export const payment = writable({} as any)

export namespace PAYMENT
{
    export function DELETE(id:any) 
    {
        try 
        {
            API.DELETE(`payment/${id}`, 
            {
                credentials: 'include'
            })
        } 
        catch (e : any) {
            toast.push(e)
        }
    }

    export async function CREATE(data: Carts[], id: any) 
    {
        try 
        {
            const res = await API.POST('payment', {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: data.find(param => param.user_id === id)?.user_id,
                    product_id: data.map(param => param.product._id),
                    amount: data.reduce((total, carts) => (total + carts.product.price) * carts.quantity, 0),
                    code : joaat(data.map(param => param.product._id) + id)
                })
            })

            const json = await res.json()
            payment.set(json)
            console.log(json)
            navigate('/dashboard/checkout')
        } 
        catch (error : any) 
        {
            toast.push(error)
        }
    }

    export async function UPDATE(id: string, data: any)
    {
        try 
        {
            const res = await API.PATCH(`payment/${id}`, {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const json = await res.json()

            toast.push(json.message);
        }
        catch (error: any) 
        {
            toast.push(error)
        }
    }
    
}