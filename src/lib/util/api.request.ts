export namespace API
{
    const prod_url = 'https://crm-backend.glitch.me/';
    const dev_url = 'http://localhost:3000/';

    export async function GET(route: string, method : RequestInit | undefined) 
    {
        const url = process.env.ENVIRONMENT === 'prod' ? prod_url : dev_url;

        return fetch(`${url}${route}`, {
            method: 'GET',
            credentials: method?.credentials,
            headers: method?.headers,
            mode: method?.mode,
            body: method?.body,
            cache: method?.cache,
            integrity: method?.integrity,
            keepalive: method?.keepalive,
            redirect: method?.redirect,
            referrer: method?.referrer,
            referrerPolicy: method?.referrerPolicy,
            signal: method?.signal,
            window: method?.window
        });
    }

    export async function POST(route: string, method: RequestInit | undefined)
    {
        const url = process.env.ENVIRONMENT === 'prod' ? prod_url : dev_url;

        return fetch(`${url}${route}`, {
            method: 'POST',
            credentials: method?.credentials,
            headers: method?.headers,
            mode: method?.mode,
            body: method?.body,
            cache: method?.cache,
            integrity: method?.integrity,
            keepalive: method?.keepalive,
            redirect: method?.redirect,
            referrer: method?.referrer,
            referrerPolicy: method?.referrerPolicy,
            signal: method?.signal,
            window: method?.window
        });
    }

    export async function PATCH(route: string, method: RequestInit | undefined)
    {
        const url = process.env.ENVIRONMENT === 'prod' ? prod_url : dev_url;

        return fetch(`${url}${route}`, {
            method: 'PATCH',
            credentials: method?.credentials,
            headers: method?.headers,
            mode: method?.mode,
            body: method?.body,
            cache: method?.cache,
            integrity: method?.integrity,
            keepalive: method?.keepalive,
            redirect: method?.redirect,
            referrer: method?.referrer,
            referrerPolicy: method?.referrerPolicy,
            signal: method?.signal,
            window: method?.window
        });
    }

    export async function DELETE(route: string, method: RequestInit | undefined)
    {
        const url = process.env.ENVIRONMENT === 'prod' ? prod_url : dev_url;

        return fetch(`${url}${route}`, {
            method: 'DELETE',
            credentials: method?.credentials,
            headers: method?.headers,
            mode: method?.mode,
            body: method?.body,
            cache: method?.cache,
            integrity: method?.integrity,
            keepalive: method?.keepalive,
            redirect: method?.redirect,
            referrer: method?.referrer,
            referrerPolicy: method?.referrerPolicy,
            signal: method?.signal,
            window: method?.window
        });
    }
}
