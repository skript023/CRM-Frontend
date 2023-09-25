<script lang="ts">
    import { toast } from "@zerodevx/svelte-toast";
    import { navigate } from "svelte-routing";

    fetch('https://crm-backend.glitch.me/auth/logout', {
        method: 'GET',
        credentials: 'include'
    }).
    then(async (res) => {
        if (res.status === 200)
        {
            const json = await res.json();
            toast.push(`<p class="text-center">${json.message}</p>`)

            navigate('/', {replace: true})
        }
    }).
    catch((e) => {
        toast.push(`<p class="text-center">${e}</p>`, {
            theme: {
                '--toastColor': 'red',
                '--toastBackground': 'rgba(187,72,120,0.9)',
                '--toastBarBackground': 'red'
            }
        })
        navigate('/', {replace: true})
    })
</script>