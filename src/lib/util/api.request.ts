export namespace API
{
    const url = 'https://crm-backend.glitch.me/';
    // const url = 'http://localhost:3000/';
    
    export async function GET(route: string, init : RequestInit | undefined) 
    {
        return fetch(`${url}${route}`, {
            method: 'GET',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }

    export async function POST(route: string, init : RequestInit | undefined)
    {
        return fetch(`${url}${route}`, {
            method: 'POST',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }

    export async function PATCH(route: string, init : RequestInit | undefined)
    {
        return fetch(`${url}${route}`, {
            method: 'PATCH',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }

    export async function DELETE(route: string, init : RequestInit | undefined)
    {
        return fetch(`${url}${route}`, {
            method: 'DELETE',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }
}
