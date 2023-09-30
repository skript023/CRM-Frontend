<script lang="ts">
    import { onMount } from "svelte";
    import { isLoading } from "../util/loading";
    import { PRODUCT } from "./helper/product.action";
    import Navigation from "../components/Navigation.svelte";
    import { product, productDetail } from "./helper/product.store";

    const url = new URL(window.location.href)

    onMount(() => {
        if ($product.name)
        {
            productDetail(url)
        }
    })

    async function onSubmit(e : any) 
    {
        await PRODUCT.EDIT(e, url)
    }
</script>

<Navigation>
    <div class="h-auto mx-auto py-12 mt-12 w-1/2 justify-center items-center">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-xl border-2 border-gray-800 bg-gray-800 mt-12">
            <h2 class="uppercase text-center mb-12">Edit Product</h2>
            <form on:submit|preventDefault={onSubmit} id="register">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="image">Upload file</label>
                <input name="file" class="mb-7 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" type="file">
                <div class="form-control relative w-full mb-5">
                    <label for="" class="label">
                        <span class="label-text">Product Grade</span>
                    </label>
                    <select bind:value={$product.grade} id="grade" name="grade" class="select select-bordered select-sm bg-gray-700 text-center disabled:text-white">
                        <option disabled selected value={null}>-- Select Role --</option>
                        <option>DEVELOPMENT</option>
                        <option>ENTERPRISE</option>
                        <option>PREMIUM</option>
                        <option>BASIC</option>
                    </select>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input value={$product.name} type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Name
                    </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input value={$product.game} type="text" name="game" id="game" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="game" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Game
                    </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input value={$product.target} type="target" name="target" id="target" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="target" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Target
                    </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input value={$product.version} type="version" name="version" id="version" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="version" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Version
                    </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input value={$product.status} type="status" name="status" id="status" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="status" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Status
                    </label>
                </div>
                <button  class="dropdown dropdown-end w-full md:w-auto lg:w-96 lg:mx-12 flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="submit">
                    Submit
                    {#if isLoading}
                    <span class="loading loading-spinner ml-1"></span>
                    {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-right ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>
                        <path d="M16 12l-4 -4"></path>
                        <path d="M16 12h-8"></path>
                        <path d="M12 16l4 -4"></path>
                     </svg>
                     {/if}
                </button>
            </form>
        </div>
    </div>
</Navigation>