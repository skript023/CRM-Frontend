import { writable } from "svelte/store"
import { API } from "../../util/api.request"
import type { Product } from "../../interface/product.interface"
import { toast } from "@zerodevx/svelte-toast"

export const product = writable({} as Product)

export const products = writable([] as Product[])

export async function productDetail(url: URL) 
{
    API.GET(`products/detail/${url.searchParams.get('product')}`,
    {
        credentials: 'include'
    }).
    then(async (res) => {
        const json = await res.json()
        product.set(json)
    })
}

export async function allProduct() 
{
    try 
    {
        const res = await API.GET('products/', {
            credentials: 'include',
        })
    
        if (res.status === 200)
        {
            const json = await res.json()
    
            products.set(json)
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