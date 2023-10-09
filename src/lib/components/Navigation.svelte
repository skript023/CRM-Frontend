<script lang="ts">
    import { onMount } from "svelte";
    import { Logout } from "../logout";
    import { Loading } from 'gros/loading';
    import { Link, navigate } from "svelte-routing";
    import { user, getUser } from './profile.store';
    import { CART } from "../cart/query/cart.action";
    import { carts, getCarts } from "../cart/query/cart.store";

    export let drawer_checked = false;
    let isLoaded = false;

    onMount(async () => {
        await getUser()
        await getCarts($user._id)
        isLoaded = true
    })

    async function remove(id: string)
    {
        await CART.DELETE(id)

        await getCarts($user._id)
    }
</script>

<Loading process bootstrap/>
<div class="drawer">
    <script type="text/javascript"
		src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={import.meta.env.VITE_CLIENT}>
    </script>
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawer_checked}/>
    <div class="drawer-content">
        <!-- Page content here -->
        <div class="flex flex-col h-screen justify-between">
            <header class="mb-10 h-10">
                <nav class="navbar bg-base-100">
                    <div class="flex-none">
                        <label for="my-drawer" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div class="flex-1">
                    </div>
                    <div class="flex-none hidden lg:block">
                        <ul class="menu menu-horizontal">
                            <!-- Navbar menu content here -->
                            <li class="right-12">
                                <Link replace to='/dashboard/inbox'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Inbox
                                    <span class="badge badge-sm">99+</span>
                                </Link>
                            </li>
                            <li class="right-12">
                                
                                <div class="dropdown dropdown-hover dropdown-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                        <path d="M17 17h-11v-14h-2"></path>
                                        <path d="M6 5l14 1l-1 7h-13"></path>
                                     </svg>
                                     <label for="" tabindex="-1">
                                        Cart
                                    </label>
                                    <ul tabindex="-1" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                        {#if $carts.length === 0}
                                        <div class="p-4 justify-center flex">
                                            <button class="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                                hover:bg-teal-700 hover:text-teal-100 
                                                bg-teal-100 
                                                text-teal-700 
                                                border duration-200 ease-in-out 
                                                border-teal-600 transition">
                                            No Data
                                            </button>
                                        </div>
                                        {:else}
                                            {#each $carts as cart}
                                                <li>
                                                    <div class="p-2 flex bg-gray-900 hover:bg-gray-700 cursor-pointer border-b border-gray-900" style="">
                                                        <div class="p-2 w-12"><img src="https://dummyimage.com/50x50/bababa/0011ff&amp;text=50x50" alt="img product"></div>
                                                        <div class="flex-auto text-sm w-32">
                                                            <div class="font-bold">{cart.product?.name}</div>
                                                            <div class="truncate">{cart.product?.code}</div>
                                                            <div class="text-gray-400">Qty: {cart.quantity}</div>
                                                        </div>
                                                        <div class="flex flex-col w-18 font-medium items-end">
                                                            <button on:click={() => remove(cart.product._id)} class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 ">
                                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                </svg>
                                                            </button>
                                                            {cart.product?.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            {/each}
                                            <div class="p-4 justify-center flex">
                                                <button class="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                                    hover:bg-gray-700 
                                                    hover:text-gray-100 
                                                    bg-gray-900 
                                                    text-gray-100 
                                                    border duration-200 ease-in-out 
                                                    border-gray-900 transition"
                                                    on:click={() => navigate('/dashboard/cart')}>
                                                    Checkout {$carts.reduce((sum, item) => sum + item.product?.price, 0)}
                                                </button>
                                            </div>
                                        {/if }
                                    </ul>
                                </div>
                            </li>
                            <li class="right-12">
                                <Link replace to=''>
                                    Status
                                    <span class="badge badge-xs badge-success"></span>
                                </Link>
                            </li>
                            {#if isLoaded}
                                <div class="dropdown dropdown-left dropdown-hover">
                                    <div class="avatar online">
                                        <div class="w-10 rounded-full">
                                            <img alt="profile" src={`https://crm-backend.glitch.me/user/avatar/${$user.image}`} />
                                        </div>
                                    </div>
                                    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link replace to="/dashboard/user/profile">Profile</Link></li>
                                        <li><button on:click={Logout} type="button">Logout</button></li>
                                    </ul>
                                </div>
                            {:else}
                                <span class="loading loading-spinner ml-1"></span>
                            {/if}
                        </ul>
                    </div>
                </nav>
            </header>
            <main class="mb-auto h-10">
                <div>
                    <slot/>
                    <dialog id="modal-disconnect" class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Time Out</h3>
                            <p class="py-4">Your login is time-out please re-login</p>
                            <p class="py-4">Press ESC key or click the button below to close</p>
                            <div class="modal-action">
                                <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn" on:click={() => {navigate('/'); window.location.reload()}} on:keydown={() => {navigate('/'); window.location.reload()}}>Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </main>
            <footer class="footer footer-center fixed inset-x-0 bottom-0">
                <aside>
                    <p>Copyright © 2023 - All right reserved by Ellohim Ltd</p>
                </aside>
            </footer>
        </div>
    </div> 
    
    <div class="drawer-side z-10">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-screen bg-base-200 text-base-content">
            {#if isLoaded}
                <div class="avatar mb-5 mt-5 justify-center">
                    <div class="w-48 rounded-full">
                        <img alt="profile" src={`https://crm-backend.glitch.me/user/avatar/${$user.image}`} />
                    </div>
                </div>
            {:else}
                <span class="loading loading-spinner ml-1"></span>
            {/if}
            <div class="join join-vertical justify-center items-center text-lg mt-5 mb-10">
                <p>{$user?.fullname}</p>
            </div>
            <div class="divider uppercase">Menu</div> 
            <!-- Sidebar content here -->
            <li><Link replace to="/dashboard">Dashboard</Link></li>
            {#if $user?.role?.name === 'admin' || $user?.role?.name === 'staff'}
                <div class="divider uppercase">admin</div>
                <li>
                    <details open>
                        <summary>Users</summary>
                        <ul>
                            <li><Link replace to="/dashboard/user">Manage Users</Link></li>
                            <li><Link replace to="/dashboard/user/add">Add User</Link></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary>Products</summary>
                        <ul>
                            <li><Link replace to="/dashboard/product">Manage Products</Link></li>
                            <li><Link replace to="/dashboard/product/add">Add Product</Link></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary>Roles</summary>
                        <ul>
                            <li><Link replace to="/dashboard/role">Manage Roles</Link></li>
                            <li><Link replace to="/dashboard/role/add">Add Role</Link></li>
                        </ul>
                    </details>
                </li>
            {/if}
        </ul>
    </div>
</div>