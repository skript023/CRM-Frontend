<script lang="ts">
    import { onMount } from "svelte";
    import Navigation from "./components/Navigation.svelte";
    import { products, allProduct, carts } from "../lib/product/query/product.store";
    import { navigate } from "svelte-routing";
    import type { Product } from "./interface/product.interface";

    onMount(() => {
        if ($products.length <= 0)
        {
            allProduct()
        }
    });

    function add_to_cart(choosen : Product)
    {
        const cart: Product[] = []
        cart.push(choosen)
        carts.set(cart)
        navigate('/dashboard/cart', {replace: true})
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
                                <button on:click={() => add_to_cart(product)} class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</Navigation>