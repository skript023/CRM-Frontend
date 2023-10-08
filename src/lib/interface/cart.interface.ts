import type { Product } from "./product.interface"

export interface Carts
{
    product_id: string
    user_id: string
    quantity: number
    product: Product
}