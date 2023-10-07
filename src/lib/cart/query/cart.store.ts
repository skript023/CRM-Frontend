import { writable } from "svelte/store";
import type { Product } from "../../interface/product.interface";


export const carts = writable([] as Product[])