import { toast } from "@zerodevx/svelte-toast";
import { API } from "../util/api.request";

export namespace USER 
{
    export function DELETE (userId : string)
    {
        API.DELETE(`user/delete/${userId}`, 
        {
            credentials: 'include'
        }).
        then(async (res) => {
            const json = await res.json()
        
            toast.push(json.message)
        }).
        catch((e) => {
            toast.push(e)
        })
    }
    
}