import { navigate } from "svelte-routing";
import { API } from "../../util/api.request";
import { loading } from "../../util/loading";
import { toast } from "@zerodevx/svelte-toast";

export namespace ROLE 
{
    export function DELETE(product_id : string)
    {
        loading.start() 

        API.DELETE(`role/delete/${product_id}`, 
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

        try 
        {
            const data = new FormData(e.target)

            const abilities = {
                create: data.get('create')?.toString() === 'on',
                read: data.get('read')?.toString() === 'on',
                update: data.get('update')?.toString() === 'on',
                delete: data.get('delete')?.toString() === 'on',
                suspend: data.get('suspend')?.toString() === 'on',
                system: data.get('system')?.toString() === 'on'
            }

            const role = {
                name: data.get('name'),
                level: Object.values(abilities).filter((value) => value === true).length,
                access: abilities
            }

            const res = await API.POST('role/add', {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            })
            
            const json = await res.json()

            if (res.status === 201)
            {
                toast.push(`<p class="text-center">${json.message}</p>`)
                loading.end()
                
                navigate('/dashboard/role')
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

        try
        {
            const abilities = {
                create: data.get('create')?.toString() === 'on',
                read: data.get('read')?.toString() === 'on',
                update: data.get('update')?.toString() === 'on',
                delete: data.get('delete')?.toString() === 'on',
                suspend: data.get('suspend')?.toString() === 'on',
                system: data.get('system')?.toString() === 'on'
            }

            const role = {
                name: data.get('name'),
                level: Object.values(abilities).filter((value) => value === true).length,
                access: abilities
            }

            const res = await API.PATCH(`role/update/${url.searchParams.get('role')}`, {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            })
            
            const json = await res.json()

            loading.end()

            toast.push(`<p class="text-center">${json.message}</p>`)
            
            navigate('/dashboard/role')
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