<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { toast } from '@zerodevx/svelte-toast'
    import type { User } from "../interface/user.interface";
    import { loading, Loading } from 'gros/loading';
    import { API } from "../util/api.request";
    import { Logout } from "../logout";

    export let user = {} as User;
    export let drawer_checked = false;
    let isLoaded = false;

    onMount(async () => {
        try 
        {
            loading.start('Loading Data', 'It may take a few seconds')
            
            const res = await API.GET('user/profile', {
                headers: {
					"Content-Type": "application/json"
				},
                credentials: 'include'
            })

            if (res.status === 200)
            {
                user = await res.json();

                isLoaded = true;
            }
            else
            {
                localStorage.clear()
                const modal = document.getElementById('modal-disconnect') as HTMLElement | any
                modal.showModal();
            }

            loading.stop()
        } 
        catch (e : any) 
        {
            toast.push(e, {
                theme: {
                    '--toastColor': 'mintcream',
                    '--toastBackground': 'rgba(187,72,120,0.9)',
                    '--toastBarBackground': 'red'
                }
            }) 
        }
    })
</script>

<Loading process bootstrap/>
<div class="drawer">
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
                            <li class="right-10">
                                <a href={null}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Inbox
                                    <span class="badge badge-sm">99+</span>
                                </a>
                            </li>
                            <li class="right-12">
                                <a href={null}>
                                    Status
                                    <span class="badge badge-xs badge-success"></span>
                                </a>
                            </li>
                            {#if isLoaded}
                                <div class="dropdown dropdown-left dropdown-hover">
                                    <div class="avatar online">
                                        <div class="w-10 rounded-full">
                                            <img alt="profile" src={`https://crm-backend.glitch.me/user/avatar/${user.image}`} />
                                        </div>
                                    </div>
                                    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a href="/dashboard/user/profile">Profile</a></li>
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
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <dialog id="modal-disconnect" class="modal modal-bottom sm:modal-middle" on:keydown={Logout}>
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Session invalid</h3>
                            <p class="py-4">Session invalid please re-login</p>
                            <p class="py-4">Press ESC key or click the button below to close</p>
                            <div class="modal-action">
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                <form method="dialog" on:keydown={Logout}>
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn" on:click={Logout}>Close</button>
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
                        <img alt="profile" src={`https://crm-backend.glitch.me/user/avatar/${user.image}`} />
                    </div>
                </div>
            {:else}
                <span class="loading loading-spinner ml-1"></span>
            {/if}
            <div class="join join-vertical justify-center items-center text-lg mt-5 mb-10">
                <p>{user?.fullname}</p>
            </div>
            <div class="divider uppercase">Menu</div> 
            <!-- Sidebar content here -->
            <li><a href="/dashboard">Dashboard</a></li>
            {#if user?.role?.name === 'admin'}
                <div class="divider uppercase">admin</div>
                <li>
                    <details open>
                        <summary>Users</summary>
                        <ul>
                            <li><a href="/dashboard/user">Manage Users</a></li>
                            <li><a href="/dashboard/user/add">Add User</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary>Products</summary>
                        <ul>
                            <li><a href="/dashboard/product">Manage Products</a></li>
                            <li><a href="/dashboard/product/add">Add Product</a></li>
                        </ul>
                    </details>
                </li>
            {/if}
        </ul>
    </div>
</div>