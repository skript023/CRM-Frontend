import { writable } from "svelte/store";
import { API } from "../../util/api.request";
import type { Carts } from "../../interface/cart.interface";


export const carts = writable([] as Carts[])

export function getCarts(id : string)
{
    API.GET(`carts/${id}`, {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(async (res) => {
        const data = await res.json()
        carts.set(data)
    })
}
