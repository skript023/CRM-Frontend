<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { CART } from "./query/cart.action";
    import { carts } from "./query/cart.store";
    import { user } from "../components/profile.store";
    import Navigation from "../components/Navigation.svelte";

    async function update(qty: number)
    {
        if (qty <= 0)
        {
            CART.DELETE($user._id)

            navigate('/dashboard', {replace: true})
        }
        else
        {
            const data = {
                quantity: qty
            }

            await CART.UPDATE(data, $user._id)
        }
    }
    
    function remove()
    {
        CART.DELETE($user._id)
        
        if ($carts.length <= 1)
        {
            navigate('/dashboard', {replace: true})
        }
    }

    onMount(() => {
        if ($carts.length === 0)
        {
            navigate('/dashboard', {replace: true})
        }
    })
</script>

<Navigation>
    {@const sub_total = $carts.reduce((total, carts) => total + carts?.product?.price, 0)}
    {@const total = $carts.reduce((total, carts) => (total + carts?.product?.price) * carts.quantity, 0)}
    <div class="h-screen w-11/12 mx-auto">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-11/12">
                {#each $carts as cart}
                    <div class="justify-between mb-6 rounded-lg bg-gray-800 p-6 shadow-md sm:flex sm:justify-start">
                        <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="productimage" class="w-full rounded-lg sm:w-40" />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div class="mt-5 sm:mt-0">
                                <h2 class="text-lg font-bold">{cart?.product?.name}</h2>
                                <p class="mt-1 text-xs">{cart?.product?.code}</p>
                            </div>
                            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div class="flex items-center border-gray-100">
                                    <button on:click={() => {update(cart.quantity - 1)}} class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                                    <input value={cart.quantity} class="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" min="1" />
                                    <button on:click={() => {update(cart.quantity + 1)}} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <p class="text-sm">IDR {cart?.product?.price?.toLocaleString()}</p>
                                    <button on:click={remove}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
          <!-- Sub total -->
            <div class="mt-6 h-full rounded-lg border bg-gray-800 p-6 shadow-md md:mt-0 md:w-2/5 border-gray-800">
                <div class="mb-2 flex justify-between">
                    <p class="text-gray-100">Subtotal</p>
                    <p class="text-gray-100">IDR {sub_total?.toLocaleString()}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-100">Shipping</p>
                    <p class="text-gray-100">IDR 0</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                        <p class="mb-1 text-lg font-bold">IDR {total?.toLocaleString()}</p>
                        <p class="text-sm text-gray-100">including VAT</p>
                    </div>
                </div>
                <button id="pay-button" class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        // For example trigger on button clicked, or any time you need
        var payButton = document.getElementById('pay-button');
        payButton.addEventListener('click', function () {
          // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        window.snap.pay('TRANSACTION_TOKEN_HERE', {
            onSuccess: function(result){
                /* You may add your own implementation here */
                alert("payment success!"); console.log(result);
            },
            onPending: function(result){
                /* You may add your own implementation here */
                alert("wating your payment!"); console.log(result);
            },
            onError: function(result){
                /* You may add your own implementation here */
                alert("payment failed!"); console.log(result);
            },
            onClose: function(){
                /* You may add your own implementation here */
                alert('you closed the popup without finishing the payment');
            }
        })
    });
    </script>
</Navigation>