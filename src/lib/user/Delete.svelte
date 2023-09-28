<script lang="ts">
    import { toast } from "@zerodevx/svelte-toast";
  import { API } from "../util/api.request";

    const url = new URL(window.location.href)

    API.DELETE(`user/detail/${url.searchParams.get('user')}`, 
    {
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