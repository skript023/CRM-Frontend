<script lang="ts">
    import type { User } from './interface/user.interface';
    import { onMount } from "svelte";
    import Navigation from "./Navigation.svelte";
    import { toast } from '@zerodevx/svelte-toast';
    import { navigate } from 'svelte-routing';
    import { DataHandler } from '@vincjo/datatables'

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
</script>

<Navigation>
    <div class="2xl:container mx-auto my-auto">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

            <div class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="card w-96 mx-auto bg-base-100 shadow-sm border-2 border-slate-600">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>a</p>
                    </div>
                </div>
            </div>
            <div class="col-start-3">
                <div class="card w-96 left-0 bg-base-100 shadow-sm border-2 border-slate-600">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>b</p>
                    </div>
                </div>
            </div>
            <div class="col-start-4">
                <div class="card w-96 mx-auto bg-base-100 shadow-sm border-2 border-slate-600">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>c</p>
                    </div>
                </div>
            </div>

            <div class="col-start-1 col-end-4 h-56 mt-10 border-2 border-slate-600">
                <div class="xl:chat chat-start">
                    <div class="chat-image avatar">
                        <div class="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
                        </div>
                    </div>
                    <div class="chat-header">
                        Obi-Wan Kenobi
                        <time class="text-xs opacity-50">12:45</time>
                    </div>
                    <div class="chat-bubble">You were the Chosen One!</div>
                        <div class="chat-footer opacity-50">
                            Delivered
                        </div>
                    </div>
                    <div class="chat chat-end">
                        <div class="chat-image avatar">
                            <div class="w-10 rounded-full">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt=""/>
                            </div>
                        </div>
                        <div class="chat-header">
                            Anakin
                            <time class="text-xs opacity-50">12:46</time>
                        </div>
                        <div class="chat-bubble">I hate you!</div>
                        <div class="chat-footer opacity-50">
                            Seen at 12:46
                    </div>
                </div>
            </div>
        </div>
    </div>
</Navigation>