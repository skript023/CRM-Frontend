import { toast } from "@zerodevx/svelte-toast";
import { API } from "../../util/api.request";
import { navigate } from "svelte-routing";
import { loading } from "../../util/loading";

export namespace USER 
{
    export function DELETE (userId : string)
    {
        loading.end()

        API.DELETE(`user/delete/${userId}`, 
        {
            credentials: 'include'
        }).
        then(async (res) => {
            const json = await res.json()
        
            loading.end()

            toast.push(json.message)

            window.location.reload()
        }).
        catch((e) => {
            loading.end()
            toast.push(e)
        })
    }
    
    export async function ADD (e : any)
    {
        loading.start()
        
        const data = new FormData(e.target)
        const first = data.get('first_name') as string
        const last = data.get('last_name') as string
        const fullname = first + ' ' + last
        
        try 
        {
            data.set('fullname',  fullname)

            const res = await API.POST('user/add', {
                method: 'POST',
                body: data
            })
            
            const json = await res.json()

            if (res.status === 201)
            {
                loading.end()

                toast.push(`<p class="text-center">${json.message}</p>`)
                
                navigate('/dashboard/user', {replace: true})
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
    
    export async function UPDATE(e : any, url : URL)
    {
        loading.start()

        const data = new FormData(e.target)
        const first = data.get('first_name')?.toString()
        const last = data.get('last_name')?.toString()
        const fullname = first + ' ' + last
        
        try 
        {
            data.set('fullname',  fullname)

            const res = await API.PATCH(`user/update/${url.searchParams.get('user')}`, {
                method: 'PATCH',
                credentials: 'include',
                body: data
            })
            
            const json = await res.json()

            if (res.status === 200)
            {
                toast.push(`<p class="text-center">${json.message}</p>`)

                loading.end()
                    
                navigate('/dashboard/user', {replace: true})
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
    
}