<script lang="ts">
    import { Link } from "svelte-routing";
    import { isLoading } from "../util/loading";
    import { orders } from "./query/order.store";
    import { DataHandler } from "gros/datatable";
    import { ORDER } from "./query/order.action";
    import Navigation from "../components/Navigation.svelte";
    import SortableTableHeader from "../components/SortableTableHeader.svelte";

    let search = ''

    $: handler = new DataHandler($orders, { rowsPerPage: 50 })
    $: rows = handler.getRows()

    $: rowCount = handler.getRowCount()
    $: pageNumber = handler.getPageNumber()
    $: pageCount = handler.getPageCount()
    $: pages = handler.getPages({ ellipsis: true })
</script>

<Navigation>
    <div class="mx-auto w-11/12 h-auto">
        <div class="bg-sky-100 dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input bind:value={search} on:input={() => handler.search(search)} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Link replace to="/dashboard/product/add" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Product
                    </Link>
                    <div class="flex items-center space-x-3 w-full md:w-auto">
                        <button class="dropdown dropdown-end w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-upload" width="24" height="24" viewBox="0 0 33 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                <path d="M7 9l5 -5l5 5"></path>
                                <path d="M12 4l0 12"></path>
                             </svg>
                            Upload
                        </button>
                        <button class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 33 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                <path d="M7 11l5 5l5 -5"></path>
                                <path d="M12 4l0 12"></path>    
                            </svg>
                            Export
                        </button>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead id="table-head" class="uppercase text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <SortableTableHeader {handler} orderBy="fullname">
                                Name
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="username">
                                Code
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="email">
                                Grade
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="role">
                                Game
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="expired">
                                Target
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="role">
                                File
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="role">
                                version
                            </SortableTableHeader>
                            <SortableTableHeader {handler} orderBy="role">
                                status
                            </SortableTableHeader>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $rows as product}
                            <tr class="border-b dark:border-gray-700">
                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</th>
                                <td class="px-4 py-3">{product.code}</td>
                                <td class="px-4 py-3">{product.grade}</td>
                                <td class="px-4 py-3">{product.game}</td>
                                <td class="px-4 py-3">{product.target}</td>
                                <td class="px-4 py-3">{product.file}</td>
                                <td class="px-4 py-3">{product.version}</td>
                                <td class="px-4 py-3">{product.status}</td>
                                <td class="px-4 py-3 flex items-center justify-end">
                                    <div class="dropdown dropdown-hover dropdown-end">
                                        <label tabindex="-1" for="" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-800 hover:text-gray-950 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
                                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                            <ul tabindex="-1" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" aria-labelledby="apple-iphone-14-dropdown-button">
                                                <li>
                                                    <Link replace to="/dashboard/product/detail?product={product._id}" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</Link>
                                                </li>
                                                <li>
                                                    <Link replace to="/dashboard/product/edit?product={product._id}" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</Link>
                                                </li>
                                                <li class="py-1">
                                                    <button on:click={() => {ORDER.DELETE(product._id)}} type="button" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                        Delete
                                                        {#if $isLoading}
                                                        <span class="loading loading-spinner ml-1"></span>
                                                        {/if}
                                                    </button>
                                                </li>
                                            </ul>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">{`${$rowCount.start}-${$rowCount.end}`}</span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">{`${$rowCount.total}`}</span>
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                        <button on:click={() => handler.setPage('previous')} class:disabled={$pageNumber === 1} type="button" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    {#each $pages as page}
                        <li>
                            <button on:click={() => handler.setPage(page)} class:ellipse={page === null} class:active={$pageNumber === page} type="button" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</button>
                        </li>
                    {/each}
                    <li>
                        <button on:click={() => handler.setPage('next')} class:disabled={$pageNumber === $pageCount} type="button" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</Navigation>