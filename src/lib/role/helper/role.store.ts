import { writable } from "svelte/store"
import { API } from "../../util/api.request"
import type { Role } from "../../interface/user.interface"


export const role = writable({} as Role)

export async function roleDetail(url: URL) 
{
    API.GET(`role/detail/${url.searchParams.get('role')}`,
    {
        credentials: 'include'
    }).
    then(async (res) => {
        const json = await res.json()
        role.set(json)
    })
}

export function allowedAccess(role : any, action : string) 
{
    return role?.access[action] ? '<span class="badge-sm badge-success">Allowed</span>' : '<span class="badge-sm badge-error">Denied</span>' 
}