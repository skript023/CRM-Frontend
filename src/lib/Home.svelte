<script lang="ts">
    import { onMount } from "svelte";
    import Navigation from "./Navigation.svelte";

    export let users = [] as any | null

    onMount(() => {
        fetch('http://localhost:3000/user/', 
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
                console.log(users)
            }
        })
    });
</script>

<Navigation>
    <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
            <thead>
                <tr>
                <th>No</th>
                <th>Fullname</th>
                <th>Username</th>
                <th>Email</th>
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
                    </tr>
                {/each}
            </tbody>
        </table>
      </div>
</Navigation>