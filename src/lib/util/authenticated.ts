import { navigate } from "svelte-routing"
import { API } from "./api.request"
import { writable } from "svelte/store"

export const authenticated = writable(false)

// export async function authenticated()
// {
//     const res = await API.GET('user/profile', {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         credentials: 'include'
//     })

//     if (res.status === 200)
//     {
//         navigate('/dashboard')
//     }
// }