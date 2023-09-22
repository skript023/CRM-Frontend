<script lang="ts">
  import { onMount } from "svelte";

    onMount(() => {
        console.log('logout')
        fetch('https://crm-backend.glitch.me/auth/logout', {
            method: 'GET',
            credentials: 'include'
        }).
        then((res) => {
            if (res.status === 200)
            {
                res.json().then((json) => {
                    console.log(json)
                })

                window.location.href = '/'
            }
        }).
        catch((e) => {
            console.log(e)
            window.location.href = '/'
        })
    })
</script>