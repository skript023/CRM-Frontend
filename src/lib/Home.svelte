<script lang="ts">
    import type { User } from './interface/user.interface';
    import { onMount } from "svelte";
    import Navigation from "./Navigation.svelte";
    import { toast } from '@zerodevx/svelte-toast';
    import { navigate } from 'svelte-routing';
    import { DataHandler, check, Datatable, Th, ThFilter } from '@vincjo/datatables'

    let search = null as string | null
    let users = [] as User[]
    let isReady = false
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
                const modal = document.getElementById('my_modal_5')
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

        isReady = true
    });

    const onSubmit = () =>
    {
        if (search?.length === 0)
        {
            // users = backup
        }
        else
        {
            toast.push('Searching')
            users = users.filter(param => param.username === search)
        }

    }

    $: handler = new DataHandler(users, { rowsPerPage: 50 })
    $: rows = handler.getRows()
    $: selected = handler.getSelected()
    $: isAllSelected = handler.isAllSelected()
</script>

<Navigation>
    {#if isReady}
    <Datatable {handler}>
        <table class="items-center text-center">
            <thead>
                <tr>
                    <th class="selection">
                        <input
                            type="checkbox"
                            on:click={() => handler.selectAll({ selectBy: '_id' })}
                            checked={$isAllSelected}
                        />
                    </th>
                    <Th {handler} orderBy="_id">Object ID</Th>
                    <Th {handler} orderBy="fullname">Fullname</Th>
                    <Th {handler} orderBy="username">Username</Th>
                    <Th {handler} orderBy="email">Email</Th>
                </tr>
                <tr>
                    <th class="selection" />
                    <ThFilter {handler} filterBy="_id" comparator={check.isEqualTo} />
                    <ThFilter {handler} filterBy="fullname" />
                    <ThFilter {handler} filterBy="username" />
                    <ThFilter {handler} filterBy="email" />
                </tr>
            </thead>
            <tbody>
                {#if isLoaded}
                    {#each $rows as row, i}
                        <tr class:active={$selected.includes(row._id)}>
                            <td class="selection">
                                <input
                                    type="checkbox"
                                    on:click={() => handler.select(row._id)}
                                    checked={$selected.includes(row._id)}
                                />
                            </td>
                            <td>{@html row._id}</td>
                            <td>{@html row.fullname}</td>
                            <td>{@html row.username}</td>
                            <td>{@html row.email}</td>
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
    {:else}
        <span class="loading loading-spinner loading-lg flex justify-stretch"></span>
    {/if}
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
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
</Navigation>