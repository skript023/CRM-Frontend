<script lang="ts">
    import { toast } from "@zerodevx/svelte-toast";

    const url = new URL(window.location.href)

    fetch(`https://crm-backend.glitch.me/user/detail/${url.searchParams.get('user')}`, 
    {
        method: 'DELETE',
        credentials: 'include'
    }).
    then(async (res) => 
    {
        const json = await res.json()

        toast.push(json.message)
    }).
    catch((e) => 
    {
        toast.push(e)
    })
</script>