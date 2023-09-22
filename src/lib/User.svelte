<script lang="ts">
    import type { User } from './interface/user.interface';
    import { onMount } from "svelte";
    import Navigation from "./Navigation.svelte";
    import { toast } from '@zerodevx/svelte-toast';
    import { navigate } from 'svelte-routing';
    import { DataHandler, check, Datatable, Th, ThFilter } from '@vincjo/datatables'

    let search = null as string | null
    let users = [] as User[]
    let isLoaded = false

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
                users = await res.json()

                isLoaded = true
            }
            else
            {
                const modal = document.getElementById('my_modal_5') as HTMLElement | any
                modal.showModal()
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

    $: handler = new DataHandler(users, { rowsPerPage: 50 })
    $: rows = handler.getRows()
    $: selected = handler.getSelected()
    $: isAllSelected = handler.isAllSelected()
</script>

<Navigation>
    <Datatable {handler}>
        <table class="items-center">
            <thead>
                <tr>
                    <th class="selection">
                        <input
                            type="checkbox"
                            class="checkbox"
                            on:click={() => handler.selectAll({ selectBy: '_id' })}
                            checked={$isAllSelected}
                        />
                    </th>
                    <Th {handler} orderBy="_id">Object ID</Th>
                    <Th {handler} orderBy="fullname">Fullname</Th>
                    <Th {handler} orderBy="username">Username</Th>
                    <Th {handler} orderBy="email">Email</Th>
                    <Th {handler} orderBy="role">Role</Th>
                    <Th {handler} orderBy="role">Level</Th>
                </tr>
                <tr>
                    <th class="selection" />
                    <ThFilter {handler} filterBy="_id" comparator={check.isEqualTo} />
                    <ThFilter {handler} filterBy="fullname" />
                    <ThFilter {handler} filterBy="username" />
                    <ThFilter {handler} filterBy="email" />
                    <ThFilter {handler} filterBy="role" />
                    <ThFilter {handler} filterBy="role" />
                </tr>
            </thead>
            <tbody>
                {#if isLoaded}
                    {#each $rows as row, i}
                        <tr class:active={$selected.includes(row._id)}>
                            <td class="selection">
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    on:click={() => handler.select(row._id)}
                                    checked={$selected.includes(row._id)}
                                />
                            </td>
                            <td>{@html row._id}</td>
                            <td>{@html row.fullname}</td>
                            <td>{@html row.username}</td>
                            <td>{@html row.email}</td>
                            <td>{@html row.role.name}</td>
                            <td>{@html row.role.level}</td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td class="selection">
                            <span class="loading loading-bars loading-xs"></span>
                        </td>
                        <td><span class="loading loading-bars loading-xs"></span></td>
                        <td><span class="loading loading-bars loading-xs"></span></td>
                        <td><span class="loading loading-bars loading-xs"></span></td>
                        <td><span class="loading loading-bars loading-xs"></span></td>
                    </tr>
                {/if}
            </tbody>
        </table>
    
        <style>
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
    
            thead {
                background: dark;
            }
            tbody td {
                border: 1px solid #575753;
                padding: 4px 20px;
            }
            tbody tr {
                transition: all, 0.2s;
            }
            tbody tr:hover {
                background: #575753;
            }
        </style>
    </Datatable>
</Navigation>