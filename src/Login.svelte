<script lang="ts">
    let username = ''
    let password = ''
    let message =''
    
    const onClick = ()=> {
        console.log(`${username}`)
        fetch('https://crm-backend.glitch.me/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => {
            const mes = res.body['message']
            console.log(mes)
        }).catch((e) =>{
            console.log(e)
        })
    }
</script>

<p></p>
<div class="relative flex flex-col justify-center h-screen overflow-hidden">
    <div class="w-full p-6 m-auto bg-slate-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
        <form class="space-y-4">
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
                <button class="btn btn-block" on:click={onClick}>Login</button>
            </div>
        </form>
    </div>
</div>