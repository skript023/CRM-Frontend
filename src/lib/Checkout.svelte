<script lang="ts" type="text/javascript">
    import Navigation from "./components/Navigation.svelte";
    import { carts } from "./cart/query/cart.store";
    import { PAYMENT, payment } from "./cart/query/payment.action";
    import { onMount } from "svelte";

    const token = $payment?.token
    const payment_id = $payment?.payment

    onMount(() => {
        const ev = window as any
        const payButton = document.getElementById('pay-button');
        payButton?.addEventListener('click', function () {
            console.log(token)
            ev.snap.embed(token, {
                embedId: 'snap-container',
                onSuccess: async function (result: any) {
                    await PAYMENT.UPDATE(payment_id, {
                        status: 'Completed'
                    })
                },
                onPending: async function (result: any) 
                {
                    await PAYMENT.UPDATE(payment_id, {
                        status: 'Pending'
                    })
                },
                onError: async function (result: any) {
                    await PAYMENT.UPDATE(payment_id, {
                        status: 'Failed'
                    })
                },
                onClose: async function () {
                    alert('you closed the popup without finishing the payment');
                }
            });
        });
    })
</script>

    <Navigation>
        {@const sub_total = $carts.reduce((total, carts) => total + carts?.product?.price, 0)}
        {@const total = $carts.reduce((total, carts) => (total + carts?.product?.price) * carts.quantity, 0)}
        <div class="h-screen grid grid-cols-3">
            <div class="lg:col-span-2 col-span-3 space-y-8 px-12">
                <div class="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-gray-800 shadow rounded-md">
                    <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div class="text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="text-sm font-medium ml-3">Checkout</div>
                    </div>
                    <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                    <div class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
                <div id="snap-container" class="w-full">
                    
                </div>
                
                <button id="pay-button" class="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                    Pay 
                </button>
            </div>
            <div class="col-span-1 bg-gray-800 lg:block hidden">
                <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                <ul class="py-6 border-b space-y-6 px-8">
                    {#each $carts as cart}
                        <li class="grid grid-cols-6 gap-2 border-b-1">
                            <div class="col-span-1 self-center">
                                <img src="https://bit.ly/3oW8yej" alt="Product" class="rounded w-full">
                            </div>
                            <div class="flex flex-col col-span-3 pt-2">
                                <span class="text-gray-600 text-md font-semi-bold">{cart?.product?.name}</span>
                                <span class="text-gray-400 text-sm inline-block pt-2">{cart?.product?.code}</span>
                            </div>
                            <div class="col-span-2 pt-3">
                                <div class="flex items-center space-x-2 text-sm justify-between">
                                    <span class="text-gray-400">{cart?.quantity} x IDR {cart?.product?.price}</span>
                                    <span class="text-pink-400 font-semibold inline-block">{cart?.quantity * cart?.product?.price}</span>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
                <div class="px-8 border-b">
                    <div class="flex justify-between py-4 text-gray-600">
                        <span>Subtotal</span>
                        <span class="font-semibold text-pink-500">{sub_total}</span>
                    </div>
                    <div class="flex justify-between py-4 text-gray-600">
                        <span>Shipping</span>
                        <span class="font-semibold text-pink-500">Free</span>
                    </div>
                </div>
                <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                    <span>Total</span>
                    <span>{total}</span>
                </div>
            </div>
        </div>
    </Navigation>