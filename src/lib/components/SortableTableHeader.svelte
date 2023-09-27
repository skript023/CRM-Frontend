<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables'
    export let handler: DataHandler
    export let orderBy = null as any

    const identifier = orderBy?.toString()
    const sorted = handler.getSort()
</script>

<style>
    @media(max-width: 650px)
    {
        th
        {
            display: none;
        }
    }
</style>

<th scope="col" class="relative px-4 py-3">
    <div class="flex items-center justify-start">
        <span><slot/></span>
        <button on:click={() => handler.sort(orderBy)} type="button">
            {#if $sorted.direction === 'asc' && $sorted.identifier === identifier}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-1.5" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6l7 0"></path>
                    <path d="M4 12l7 0"></path>
                    <path d="M4 18l9 0"></path>
                    <path d="M15 9l3 -3l3 3"></path>
                    <path d="M18 6l0 12"></path>
                </svg>
            {:else if $sorted.direction === 'desc' && $sorted.identifier === identifier}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-1.5" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6l9 0"></path>
                    <path d="M4 12l7 0"></path>
                    <path d="M4 18l7 0"></path>
                    <path d="M15 15l3 3l3 -3"></path>
                    <path d="M18 6l0 12"></path>
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-1.5" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 9l4 -4l4 4m-4 -4v14"></path>
                    <path d="M21 15l-4 4l-4 -4m4 4v-14"></path>
                </svg>
            {/if}
        </button>
    </div>
</th>