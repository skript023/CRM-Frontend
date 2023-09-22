<script lang="ts">
    import { toast } from '@zerodevx/svelte-toast';
    import { navigate } from 'svelte-routing';

    let username = ''
    let password = ''
    
    const onClick = ()=> {
        fetch('https://crm-backend.glitch.me/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).
        then(async (res) => {
            if (res.status === 200)
            {
                const json = await res.json()
                toast.push(json.message, {
                    theme: {
                        '--toastColor': 'mintcream',
                        '--toastBackground': 'rgba(72,187,120,0.9)',
                        '--toastBarBackground': '#2F855A'
                    }
                })
                navigate('/dashboard', {replace: true})
            }
        }).
        catch((e) =>{
            toast.push(e, {
                theme: {
                    '--toastColor': 'mintcream',
                    '--toastBackground': 'rgba(187,72,120,0.9)',
                    '--toastBarBackground': 'red'
                }   
            })
        })
    }
</script>

<p></p>
<div class="relative flex flex-col justify-center h-screen overflow-hidden">
    <div class="w-full p-6 m-auto bg-slate-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
        <form class="space-y-4" on:submit|preventDefault={onClick}>
            <div>
                <label for={null} class="label">
                    <span class="text-base label-text">Username</span>
                </label>
                <input type="text" placeholder="Username" class="w-full input input-bordered" bind:value={username}/>
            </div>
            <div>
                <label for={null} class="label">
                    <span class="text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter Password"
                    class="w-full input input-bordered" bind:value={password}/>
            </div>
            
            <div>
                <a href={null} class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
            </div>

            <div>
                <button class="btn btn-block">Login</button>
            </div>
        </form>
    </div>
</div>