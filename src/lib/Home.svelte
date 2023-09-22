<script lang="ts">
    import type { User } from './interface/user.interface';
    import { onMount } from "svelte";
    import Navigation from "./Navigation.svelte";
    import { toast } from '@zerodevx/svelte-toast';
    import { navigate } from 'svelte-routing';

    let search = null as string | null
    let users = [] as User[]
    let backup = [] as User[]

    onMount(() => {
        fetch('https://crm-backend.glitch.me/user/', 
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        }).
        then(async (res) => 
        {
            if (res.status === 200)
            {
                backup = await res.json()
                users = backup

                toast.push('Users data loaded', {
                    theme: {
                        '--toastColor': 'mintcream',
                        '--toastBackground': 'rgba(72,187,120,0.9)',
                        '--toastBarBackground': '#2F855A'
                    }
                })
            }
            else
            {
                navigate('/', {replace: true})
            }
        }).
        catch((e) => 
        {
            toast.push(e, {
                theme: {
                    '--toastColor': 'red',
                    '--toastBackground': 'rgba(187,72,120,0.9)',
                    '--toastBarBackground': 'red'
                }   
            })
            navigate('/', {replace: true})
        })
    });

    const onSubmit = () =>
    {
        if (search?.length === 0)
        {
            users = backup
        }
        else
        {
            toast.push('Searching')
            users = users.filter(param => param.username === search)
        }

    }
</script>

<Navigation>
    <div class="overflow-x-auto">
        <form on:submit|preventDefault={onSubmit}>
            <div class='max-w-lg mx-auto max-h-xs mb-12'>
                <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-700 overflow-hidden">
                    <div class="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
            
                    <input
                    class="peer h-full w-full outline-none text-sm text-gray-300 pr-2 px-5"
                    type="text"
                    id="search"
                    placeholder="Search username.." bind:value={search}/> 
                </div>
            </div>
        </form>
        <table class="table">
          <!-- head -->
            <thead>
                <tr>
                <th>No</th>
                <th>Fullname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                {#each users as user, i}
                    <tr class="hover">
                        <th>{i + 1}</th>
                        <td>{user.fullname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role.name}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
      </div>
</Navigation>