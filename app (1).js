let user=null;
const data={movies:["Featured Movie","Free Collection","New Release"],music:["Featured Artist","Chill Mix","Independent Artists"],games:["Space Run","Puzzle World","Speed Track"],products:["School Gear","Tech","Clothing"]};
function login(){
 const e=email.value.trim().toLowerCase(),p=password.value;
 if(e==="owner@nexahub.app"&&p==="NexaOwner2026!")user={name:"Owner",owner:true};
 else {const found=getUsers().find(u=>u.email===e&&u.password===p); if(found)user={name:found.name,owner:false}; else return toast("Incorrect email or password");}
 start()
}
function demo(){email.value="owner@nexahub.app";password.value="NexaOwner2026!";login()}

function getUsers(){try{return JSON.parse(localStorage.getItem("nexahub_users")||"[]")}catch(e){return[]}}
function saveUsers(u){localStorage.setItem("nexahub_users",JSON.stringify(u))}
function registerUser(){
 const e=email.value.trim().toLowerCase(),p=password.value;
 if(!e||!p)return toast("Enter an email and password");
 if(p.length<8)return toast("Password must be at least 8 characters");
 if(e==="owner@nexahub.app")return toast("That email is reserved");
 const users=getUsers();
 if(users.some(u=>u.email===e))return toast("Account already exists");
 users.push({email:e,password:p,name:e.split("@")[0]});
 saveUsers(users); user={name:e.split("@")[0],owner:false}; start(); toast("Account created");
}

function start(){loginEl.classList.add("hidden");app.classList.remove("hidden");buildNav();home()}
const loginEl=document.getElementById("login"),app=document.getElementById("app"),content=document.getElementById("content"),nav=document.getElementById("nav");
function buildNav(){nav.innerHTML=["Home","Movies","Music","Games","School","Shop",...(user.owner?["Owner"]:[])].map(x=>`<button onclick="page('${x}')">${x}</button>`).join("")}
function page(x){document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.textContent===x));({Home:home,Movies:movies,Music:music,Games:games,School:school,Shop:shop,Owner:owner})[x]()}
function home(){content.innerHTML=`<section class="hero"><div class="tag">NEXAHUB • ${user.name.toUpperCase()}</div><h1>Everything you need,<br><span>in one place.</span></h1><p class="muted">A platform for licensed entertainment, games, music, shopping and school support.</p></section><div class="grid">${[['🎬','Movies','Watch licensed content','Movies'],['🎵','Music','Listen to approved tracks','Music'],['🎮','Games','Discover free games','Games'],['📚','School','Get learning help','School'],['🛍️','Shop','Browse approved sellers','Shop']].map(x=>`<div class="card" onclick="page('${x[3]}')"><div class="icon">${x[0]}</div><h2>${x[1]}</h2><p class="muted">${x[2]}</p></div>`).join("")}</div>`}
function media(type,icon){content.innerHTML=`<h1>${type}</h1><p class="muted">Only content you have permission to distribute should be uploaded here.</p><div class="grid">${data[type.toLowerCase()].map((x,i)=>`<div class="card"><div class="poster">${icon}</div><h3>${x}</h3><small class="muted">Creator-approved / licensed</small><button onclick="toast('Demo: opening ${x}')">${type==="Games"?"Play":"Open"}</button></div>`).join("")}</div>`}
function movies(){media("Movies","🎬")} function music(){media("Music","🎵")} function games(){media("Games","🎮")}
function school(){content.innerHTML=`<h1>📚 School Help</h1><div class="panel form"><p class="muted">Ask for an explanation. The production version can connect this box to an AI tutoring service.</p><textarea id="q" rows="6" placeholder="Example: Explain photosynthesis in simple terms"></textarea><button class="primary" onclick="answer()">Get explanation</button><div id="ans"></div></div>`}
function answer(){const q=document.getElementById("q").value.trim();document.getElementById("ans").innerHTML=q?`<div class="item" style="margin-top:15px"><div>🤖</div><div><b>Demo tutor</b><br><span class="muted">Your question was received. The production version will return a step-by-step explanation here.</span></div></div>`:""}
function shop(){content.innerHTML=`<h1>🛍️ Shop</h1><div class="grid">${data.products.map(x=>`<div class="card"><div class="poster">🛍️</div><h3>${x}</h3><p class="muted">Approved seller</p><button onclick="toast('Demo product selected')">View product</button></div>`).join("")}</div>`}
function owner(){content.innerHTML=`<h1>Owner Dashboard</h1><div class="stats"><div class="panel">Users<div class="stat">0</div></div><div class="panel">Content<div class="stat">0</div></div><div class="panel">Orders<div class="stat">0</div></div><div class="panel">Revenue<div class="stat">N$0</div></div></div><br><div class="panel"><h2>Content Management</h2><p class="muted">In the production app, this is where only you can approve, remove and manage licensed content.</p><button onclick="toast('Upload workflow will be connected to the backend')">＋ Add content</button></div><br><div class="panel"><h2>Premium</h2><p class="muted">Set your subscription price and premium features.</p><button onclick="openPremium()">Manage Premium</button></div>`}
function openPremium(){document.getElementById("modal").style.display="grid"} function closePremium(){document.getElementById("modal").style.display="none"}
function logout(){user=null;app.classList.add("hidden");loginEl.classList.remove("hidden")}
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.style="position:fixed;bottom:25px;left:50%;transform:translateX(-50%);background:#fff;color:#000;padding:12px 18px;border-radius:12px;z-index:20";setTimeout(()=>x.style="",2200)}
document.body.insertAdjacentHTML("beforeend",`<div id="modal" class="modal"><div><button style="float:right" onclick="closePremium()">×</button><h2>⭐ NexaHub Premium</h2><div class="price">N$49/month</div><p class="muted">Example price only. You choose the real price before launch.</p><ul><li>Ad-free NexaHub experience</li><li>Premium licensed content</li><li>Extra learning features</li></ul><button class="primary" onclick="toast('Payment will be connected in production');closePremium()">Continue</button></div></div>`);
