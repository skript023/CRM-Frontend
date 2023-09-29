import { toast } from "@zerodevx/svelte-toast";
import { API } from "../../util/api.request";
import joaat from "../../util/joaat.hash";
import { navigate } from "svelte-routing";

export namespace PRODUCT 
{
    export function DELETE(product_id : string)
    {
        API.DELETE(`products/delete/${product_id}`, 
        {
            credentials: 'include'
        }).
        then(async (res) => 
        {
            const json = await res.json()
        
            toast.push(json.message)

            window.location.reload();
        }).
        catch((e) => 
        {
            toast.push(e)
        })
    }

    export async function ADD(e: any) 
    {
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

            if (res.status === 200)
            {
                toast.push(`<p class="text-center">${json.message}</p>`)
                    
                navigate('/dashboard/product')
            }
            else
            {
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