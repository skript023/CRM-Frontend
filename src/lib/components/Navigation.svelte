<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { toast } from '@zerodevx/svelte-toast'
    import type { User } from "../interface/user.interface";
    import { loading, Loading } from 'gros/loading';

    let user = {} as User;

    onMount(async () => {
        try 
        {
            loading.start('Authorization', 'It may take a few seconds')
            
            const res = await fetch('https://crm-backend.glitch.me/user/profile', {
                method: 'GET',
                credentials: 'include'
            })

            if (res.status === 200)
            {
                user = await res.json();
            }
            else
            {
                const modal = document.getElementById('modal-disconnect') as HTMLElement | any
                modal.showModal()
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
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
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
                            <div class="dropdown dropdown-left dropdown-hover">
                                <div class="avatar online">
                                    <div class="w-10 rounded-full">
                                        <img alt="profile" src="https://scontent.fcgk8-2.fna.fbcdn.net/v/t39.30808-6/355859180_6500746203297381_6020865479366609276_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFQtswtevDDitEuVw6hX9ai8CPyaLgMPSPwI_JouAw9I5FWFJMwmoNQbf_7XrzCOAxGe-zs3TVTZy_uR1rRaV3c&_nc_ohc=uUklxOhLy70AX84VGuD&_nc_zt=23&_nc_ht=scontent.fcgk8-2.fna&oh=00_AfAITebVOGP1NAO-SGlqHsRhmPbdNpNHQbVvOLM1ujR9PA&oe=65106655" />
                                    </div>
                                </div>
                                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a href="/profile">Profile</a></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </nav>
            </header>
            <main class="mb-auto h-10">
                <div>
                    <slot/>
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <dialog id="modal-disconnect" class="modal modal-bottom sm:modal-middle" on:keydown={() => navigate('/', {replace: true})}>
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Session invalid</h3>
                            <p class="py-4">Session invalid please re-login</p>
                            <p class="py-4">Press ESC key or click the button below to close</p>
                            <div class="modal-action">
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                <form method="dialog" on:keydown={() => navigate('/', {replace: true})}>
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn" on:click={() => navigate('/', {replace: true})}>Close</button>
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
            <div class="avatar mb-5 mt-5 justify-center">
                <div class="w-48 rounded-full">
                    <img alt="profile" src="https://scontent.fcgk8-2.fna.fbcdn.net/v/t39.30808-6/355859180_6500746203297381_6020865479366609276_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFQtswtevDDitEuVw6hX9ai8CPyaLgMPSPwI_JouAw9I5FWFJMwmoNQbf_7XrzCOAxGe-zs3TVTZy_uR1rRaV3c&_nc_ohc=uUklxOhLy70AX84VGuD&_nc_zt=23&_nc_ht=scontent.fcgk8-2.fna&oh=00_AfAITebVOGP1NAO-SGlqHsRhmPbdNpNHQbVvOLM1ujR9PA&oe=65106655" />
                </div>
            </div>
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
            {/if}
        </ul>
    </div>
</div>