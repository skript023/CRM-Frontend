<script lang="ts">
    import { onMount } from "svelte";
    import Navigation from "./components/Navigation.svelte";
    import { products, allProduct } from "../lib/product/query/product.store";

    onMount(() => {
        if ($products.length <= 0)
        {
            allProduct()
        }
    });
</script>

<Navigation>
    {#each $products as product}
        <div class="h-screen w-11/12 mx-auto">
            <div class="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">{product.name}</h2>
                    <p>{product.price.toLocaleString('id-ID')}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</Navigation>