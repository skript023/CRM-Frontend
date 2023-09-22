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
    <div class="container">
        <div class="grid grid-cols-6 gap-1">
            <div class="col-span-4 col-start-4 mr-12 border-2 border-slate-600">
                <div class="stats shadow">
      
                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div class="stat-title">Downloads</div>
                        <div class="stat-value">31K</div>
                        <div class="stat-desc">Jan 1st - Feb 1st</div>
                    </div>
                    
                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div class="stat-title">New Users</div>
                        <div class="stat-value">4,200</div>
                        <div class="stat-desc">↗︎ 400 (22%)</div>
                    </div>
                    
                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div class="stat-title">New Registers</div>
                        <div class="stat-value">1,200</div>
                        <div class="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
            <div class="col-start-2 col-end-3 h-56 border-2 border-slate-600">
                <div class="chat chat-start">
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