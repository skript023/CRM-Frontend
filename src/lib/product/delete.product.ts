import { toast } from "@zerodevx/svelte-toast";
import { API } from "../util/api.request";

export namespace PRODUCT 
{
    export function DELETE(product_id : string)
    {
        API.DELETE(`products/delete/${product_id}`, 
        {
            credentials: 'include'
        }).
        then(async (res) => 
        {
            const json = await res.json()
        
            toast.push(json.message)

            window.location.reload();
        }).
        catch((e) => 
        {
            toast.push(e)
        })
    }
}