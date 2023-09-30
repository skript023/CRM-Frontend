import { toast } from "@zerodevx/svelte-toast";
import { API } from "../../util/api.request";
import joaat from "../../util/joaat.hash";
import { navigate } from "svelte-routing";
import { writable } from "svelte/store";

export const isLoading = writable(false)

export namespace loading
{
    export function start() 
    {
        isLoading.set(true)
    }

    export function end()
    {
        isLoading.set(false)
    }
}

export namespace PRODUCT 
{
    export function DELETE(product_id : string)
    {
        loading.start() 

        API.DELETE(`products/delete/${product_id}`, 
        {
            credentials: 'include'
        }).
        then(async (res) => 
        {
            const json = await res.json()
        
            toast.push(json.message)

            loading.end()

            window.location.reload();
        }).
        catch((e) => 
        {
            toast.push(e)
        })
    }

    export async function ADD(e: any) 
    {
        loading.start()
        
        const data = new FormData(e.target)
        const name = data.get('name') as string
        data.set('code', joaat(name).toString())
        
        try 
        {
            const res = await API.POST('products/add', {
                credentials: 'include',
                body: data
            })
            
            const json = await res.json()

            if (res.status === 201)
            {
                toast.push(`<p class="text-center">${json.message}</p>`)
                loading.end()
                
                navigate('/dashboard/product')
            }
            else
            {
                loading.end()
                
                toast.push(`message: ${json.message}`, {
                    theme: {
                        '--toastColor': 'mintcream',
                        '--toastBackground': 'rgba(187,72,120,0.9)',
                        '--toastBarBackground': 'red'
                    }   
                })
            }

            
        } 
        catch (error : any) 
        {
            loading.end()
            
            toast.push(`Error : ${error}`, {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(187,72,120,0.9)',
					'--toastBarBackground': 'red'
				}   
			})
        }
    }

    export async function EDIT(e: any, url:URL) 
    {
        loading.start()
        
        const data = new FormData(e.target)
        const name = data.get('name') as string
        data.set('code', joaat(name).toString())
        
        try 
        {
            const res = await API.PATCH(`products/update/${url.searchParams.get('product')}`, {
                credentials: 'include',
                body: data
            })
            
            const json = await res.json()

            loading.end()

            toast.push(`<p class="text-center">${json.message}</p>`)
            
            navigate('/dashboard/product')
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