
export namespace format 
{
    export function money(number: number) 
    {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}