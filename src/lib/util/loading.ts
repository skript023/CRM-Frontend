import { writable } from "svelte/store"

export const isLoading = writable(false)

export namespace loading
{
    export function start() 
    {
        isLoading.set(true)
    }

    export function end()
    {
        isLoading.set(false)
    }
}
