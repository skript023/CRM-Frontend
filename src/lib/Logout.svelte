<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { navigate } from "svelte-routing";

    onMount(() => {
        console.log('logout')
        fetch('https://crm-backend.glitch.me/auth/logout', {
            method: 'GET',
            credentials: 'include'
        }).
        then(async (res) => {
            if (res.status === 200)
            {
                const json = await res.json();

                toast.push(json.message, {
                    theme: {
                        '--toastColor': 'mintcream',
                        '--toastBackground': 'rgba(72,187,120,0.9)',
                        '--toastBarBackground': '#2F855A'
                    }
                })

                navigate('/', {replace: true})
            }
        }).
        catch((e) => {
            navigate('/', {replace: true})
        })
    })
</script>