import { navigate } from "svelte-routing"
import { API } from "./api.request"

export async function authenticated()
{
    const res = await API.GET('user/profile', {
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })

    if (res.status === 200)
    {
        navigate('/dashboard')
    }
}