<script lang="ts">
    import { onMount } from "svelte";
    import { Logout } from "../logout";
    import { Loading } from 'gros/loading';
    import { Link, navigate } from "svelte-routing";
    import { user, getUser } from './profile.store'

    export let drawer_checked = false;
    let isLoaded = false;

    onMount(async () => {
        await getUser()

        isLoaded = true
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
                                <Link replace to='/dashboard/inbox'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Inbox
                                    <span class="badge badge-sm">99+</span>
                                </Link>
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