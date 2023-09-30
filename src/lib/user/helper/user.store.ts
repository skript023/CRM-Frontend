import { writable } from "svelte/store"
import { API } from "../../util/api.request"
import type { Role, User } from "../../interface/user.interface"

export const roles = writable([] as Role[])

export const user = writable({} as User)

export function availableRoles() {
    API.GET('role/', 
    {
        credentials: 'include'
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
        credentials: 'include'
    }).
    then(async (res) => {
        const json = await res.json()
        user.set(json)
        const role = document.getElementById('role_id') as HTMLSelectElement
        role.value = json?.role?._id
    })
}
