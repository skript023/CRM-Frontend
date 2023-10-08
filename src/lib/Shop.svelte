<script lang="ts">
    import { onMount } from "svelte";
    import { CART } from "./cart/query/cart.action";
    import { user } from "./components/profile.store";
    import { getCarts } from "./cart/query/cart.store";
    import Navigation from "./components/Navigation.svelte";
    import type { Product } from "./interface/product.interface";
    import { products, allProduct } from "../lib/product/query/product.store";

    onMount(() => {
        if ($products.length <= 0)
        {
            allProduct()
        }
    });

    async function add_to_cart(choosen : Product)
    {
        const data = {
            product_id: choosen._id,
            user_id: $user._id,
            quantity: 1
        }
        await CART.ADD(data)
        getCarts($user._id)
    }
</script>

<Navigation>
    <div class="h-screen w-11/12 mx-auto">
        <div class="grid grid-cols-4 gap-4">
            {#each $products as product}
                <div class="flex justify-start">
                    <div class="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src="https://picsum.photos/400/200" alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">{product.name}</h2>
                            <p>{product.price.toLocaleString('id-ID')}</p>
                            <div class="card-actions justify-end">
                                <button on:click={() => add_to_cart(product)} class="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</Navigation>