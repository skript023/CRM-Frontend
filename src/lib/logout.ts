import { toast } from "@zerodevx/svelte-toast";
import { navigate } from "svelte-routing";
import { API } from "./util/api.request";
import { tokenExist } from "./util/token";

export function Logout() 
{
    if (tokenExist())
    {
        API.GET('auth/logout', {
            credentials: 'include'
        }).
        then(async (res) => {
            if (res.status === 200)
            {
                const json = await res.json();
                toast.push(`<p class="text-center">${json.message}</p>`)

                navigate('/')
            }
        }).
        catch((e) => {
            toast.push(`<p class="text-center">${e}</p>`, {
                theme: {
                    '--toastColor': 'red',
                    '--toastBackground': 'rgba(187,72,120,0.9)',
                    '--toastBarBackground': 'red'
                }
            })
        })
    }

    navigate('/')
}