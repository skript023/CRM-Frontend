<script lang="ts">
    import { onMount } from "svelte";
    import { role, roleDetail } from "./helper/role.store";
    import { isLoading } from "../util/loading";
    import { ROLE } from "./helper/role.action";
    import Navigation from "../components/Navigation.svelte";

    const url = new URL(window.location.href)

    onMount(async () => {
        await roleDetail(url)
    })

    async function onSubmit(e : any) 
    {
        await ROLE.EDIT(e, url)
    }
</script>

<Navigation>
    <div class="h-auto mx-auto py-12 mt-12 w-1/2 justify-center items-center">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-xl border-2 border-gray-800 bg-gray-800 mt-12">
            <h2 class="uppercase text-center mb-12">Edit Role</h2>
            <form on:submit|preventDefault={onSubmit} id="register">
                <div class="relative z-0 w-full mb-6 group">
                    <input value={$role?.name ?? ""} type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Name
                    </label>
                </div>
                <div class="flex w-full justify-center mb-5">
                    <ul>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" name="create" class="checkbox checkbox-success mx-5" />
                                <span class="label-text">Creation</span>
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" name="delete" class="checkbox checkbox-success  mx-5" />
                                <span class="label-text">Delete</span>
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" name="read" class="checkbox checkbox-success  mx-5" />
                                <span class="label-text">Read</span>
                            </label>
                        </div>
                    </ul>

                    <div class="divider divider-horizontal mx-12"></div>

                    <ul>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" name="update" class="checkbox checkbox-success mx-5" />
                                <span class="label-text">Update</span>
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" name="suspend" class="checkbox checkbox-success mx-5" />
                                <span class="label-text">Suspend</span>
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="cursor-pointer label">
                                <input type="checkbox" name="system" class="checkbox checkbox-success mx-5" />
                                <span class="label-text">System</span>
                            </label>
                        </div>
                    </ul>
                </div>
                <button  class="dropdown dropdown-end w-full md:w-auto lg:w-96 lg:mx-12 flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="submit">
                    Submit
                    {#if $isLoading}
                    <span class="loading loading-spinner ml-1"></span>
                    {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-right ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>
                        <path d="M16 12l-4 -4"></path>
                        <path d="M16 12h-8"></path>
                        <path d="M12 16l4 -4"></path>
                     </svg>
                     {/if}
                </button>
            </form>
        </div>
    </div>
</Navigation>