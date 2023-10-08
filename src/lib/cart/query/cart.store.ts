import { writable } from "svelte/store";
import { API } from "../../util/api.request";
import type { Carts } from "../../interface/cart.interface";


export const carts = writable([] as Carts[])

export async function getCarts(id : string)
{
    const res = await API.GET(`carts/${id}`, {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (res.status === 200)
    {
        const data = await res.json()
        carts.set(data)
    }
}
