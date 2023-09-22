<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <!-- Page content here -->
        <div class="flex flex-col h-screen justify-between">
            <header class="mb-10 h-10">
                <div class="navbar bg-base-100">
                    <div class="flex-none">
                        <label for="my-drawer" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div class="flex-1">
                    </div>
                    <div class="flex-none hidden lg:block">
                        <ul class="menu menu-horizontal">
                            <!-- Navbar menu content here -->
                            <li class="right-10">
                                <a href={null}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Inbox
                                    <span class="badge badge-sm">99+</span>
                                </a>
                            </li>
                            <li class="right-12">
                                <a href={null}>
                                    Status
                                    <span class="badge badge-xs badge-success"></span>
                                </a>
                            </li>
                            <div class="dropdown dropdown-left dropdown-hover">
                                <div class="avatar online">
                                    <div class="w-10 rounded-full">
                                        <img alt="profile" src="https://scontent.fcgk8-2.fna.fbcdn.net/v/t39.30808-6/355859180_6500746203297381_6020865479366609276_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFQtswtevDDitEuVw6hX9ai8CPyaLgMPSPwI_JouAw9I5FWFJMwmoNQbf_7XrzCOAxGe-zs3TVTZy_uR1rRaV3c&_nc_ohc=uUklxOhLy70AX84VGuD&_nc_zt=23&_nc_ht=scontent.fcgk8-2.fna&oh=00_AfAITebVOGP1NAO-SGlqHsRhmPbdNpNHQbVvOLM1ujR9PA&oe=65106655" />
                                    </div>
                                </div>
                                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a href="/profile">Profile</a></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </header>
            <main class="mb-auto h-10">
                <div class="flex flex-col w-auto border-opacity-50">
                    <slot/>
                </div>
            </main>
            <footer class="footer footer-center p-4 h-10 bg-base-300 text-base-content">
                <aside>
                  <p>Copyright © 2023 - All right reserved by Ellohim Ltd</p>
                </aside>
            </footer>
        </div>
    </div> 
    
    <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-screen bg-base-200 text-base-content">
            <div class="avatar mb-5 mt-5">
                <div class="w-24 rounded-full">
                    <img alt="profile" src="https://scontent.fcgk8-2.fna.fbcdn.net/v/t39.30808-6/355859180_6500746203297381_6020865479366609276_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFQtswtevDDitEuVw6hX9ai8CPyaLgMPSPwI_JouAw9I5FWFJMwmoNQbf_7XrzCOAxGe-zs3TVTZy_uR1rRaV3c&_nc_ohc=uUklxOhLy70AX84VGuD&_nc_zt=23&_nc_ht=scontent.fcgk8-2.fna&oh=00_AfAITebVOGP1NAO-SGlqHsRhmPbdNpNHQbVvOLM1ujR9PA&oe=65106655" />
                </div>
                <p class="indent-12 text-lg mt-8">
                    Name
                </p>
            </div>
            <div class="divider">Menu</div> 
            <!-- Sidebar content here -->
            <li><a href={null}>Sidebar Item 1</a></li>
            <li><a href={null}>Sidebar Item 2</a></li>
            <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li><a href={null}>level 2 item 1</a></li>
                    <li><a href={null}>level 2 item 2</a></li>
                    <li>
                      <details open>
                        <summary>Parent</summary>
                        <ul>
                          <li><a href={null}>level 3 item 1</a></li>
                          <li><a href={null}>level 3 item 2</a></li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
            </li>
        </ul>
    </div>
</div>