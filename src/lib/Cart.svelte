<script lang="ts">
    import Navigation from "./components/Navigation.svelte";
    import { selectedProduct } from "./product/query/product.store";
</script>


<Navigation>
    <div class="h-screen w-11/12 mx-auto">
        <div class="container mx-auto px-4 py-8">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 class="text-2xl font-bold my-4">Shopping Cart</h1>
                <button id="pay-button" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Checkout
                </button>
            </div>
            <div class="mt-8">
                <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
                    <div class="flex-shrink-0">
                        <img src="https://picsum.photos/id/237/150/150" alt="Productimage" class="w-32 h-32 object-cover">
                    </div>
                    <div class="mt-4 md:mt-0 md:ml-6">
                        <h2 class="text-lg font-bold">{$selectedProduct?.name}</h2>
                        <p class="mt-2 text-gray-600">Product Description</p>
                        <div class="mt-4 flex items-center">
                            <span class="mr-2 text-gray-600">Quantity:</span>
                            <div class="flex items-center">
                                <button class="bg-gray-200 rounded-l-lg px-2 py-1" disabled>-</button>
                                <span class="mx-2 text-gray-600">1</span>
                                <button class="bg-gray-200 rounded-r-lg px-2 py-1" disabled>+</button>
                            </div>
                            <span class="ml-auto font-bold">IDR {$selectedProduct?.price}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end items-center mt-8">
                <span class="text-gray-600 mr-4">Subtotal:</span>
                <span class="text-xl font-bold">$35.00</span>
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