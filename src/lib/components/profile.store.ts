import { writable } from "svelte/store";
import { API } from "../util/api.request";
import { loading } from "gros/loading";
import { toast } from "@zerodevx/svelte-toast";
import type { User } from "../interface/user.interface";
import { authenticated } from "../util/authenticated";

export const user = writable({} as User)

export async function getUser()
{
    try 
    {
        loading.start('Loading Data', 'It may take a few seconds')
        
        const res = await API.GET('user/profile', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        if (res.status === 200)
        {
            const json = await res.json();
            user.set(json)
        }
        else
        {
            authenticated.set(false)
            const modal = document.getElementById('modal-disconnect') as HTMLElement | any
            modal.showModal();
        }

        loading.stop()
    } 
    catch (e : any) 
    {
        toast.push(e, {
            theme: {
                '--toastColor': 'mintcream',
                '--toastBackground': 'rgba(187,72,120,0.9)',
                '--toastBarBackground': 'red'
            }
        }) 
    }
}
