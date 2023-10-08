import { writable } from "svelte/store"
import { API } from "../../util/api.request"
import type { Role, User } from "../../interface/user.interface"
import { toast } from "@zerodevx/svelte-toast"
import { navigate } from "svelte-routing"
import { countdownExpires } from "./expired.realtime"

export const roles = writable([] as Role[])

export const user = writable({} as User)

export const users = writable([] as User[])

export function availableRoles() {
    API.GET('role/', 
    {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).
    then(async (res) => {
        const json = await res.json()
        roles.set(json)
    })
}

export function detailUser(url: URL)
{
    API.GET(`user/detail/${url.searchParams.get('user')}`,
    {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).
    then(async (res) => {
        const json = await res.json()
        user.set(json)
        const role = document.getElementById('role_id') as HTMLSelectElement
        role.value = json?.role?._id
    })
}

export async function allUser() {
    try 
    {
        const res = await API.GET('user/', 
        {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (res.status === 200)
        {
            const json = await res.json()

            users.set(json)
            countdownExpires(json);
        }
    } 
    catch (error : any) 
    {
        toast.push(error, {
            theme: {
                '--toastColor': 'white',
                '--toastBackground': 'rgba(187,72,120,0.9)',
                '--toastBarBackground': 'red'
            }   
        })
        navigate('/', {replace: true})
    }
}