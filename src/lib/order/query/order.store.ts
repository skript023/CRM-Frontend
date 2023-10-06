import { writable } from "svelte/store"
import { API } from "../../util/api.request"
import type { Product } from "../../interface/product.interface"
import { toast } from "@zerodevx/svelte-toast"

export const order = writable({} as Product)

export const orders = writable([] as Product[])

export async function orderDetail(url: URL) 
{
    API.GET(`order/detail/${url.searchParams.get('order')}`,
    {
        credentials: 'include'
    }).
    then(async (res) => {
        const json = await res.json()
        order.set(json)
    })
}

export async function allOrder() 
{
    try 
    {
        const res = await API.GET('order/', {
            credentials: 'include',
        })
    
        if (res.status === 200)
        {
            const json = await res.json()
    
            orders.set(json)
        }
    } 
    catch (e: any) 
    {
        toast.push(e, {
            theme: {
                '--toastColor': 'white',
                '--toastBackground': 'rgba(187,72,120,0.9)',
                '--toastBarBackground': 'red'
            }   
        })
    }

            
}