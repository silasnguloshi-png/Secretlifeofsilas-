const demoItems=[
  {title:"Aurora",type:"Movie",year:"2026",img:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80",desc:"A cinematic demo title for your authorized catalogue."},
  {title:"Neon City",type:"Movie",year:"2026",img:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80",desc:"A sample catalogue entry."},
  {title:"Study Beats",type:"Music",year:"2026",img:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",desc:"Focus music for study sessions."},
  {title:"Pixel Arena",type:"Game",year:"2026",img:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80",desc:"A sample game listing."}
];

function $(id){return document.getElementById(id)}
function login(){
  const e=$("email").value,p=$("password").value;
  if(e==="owner@secretlifeofsilas.app"&&p==="owner123") enter();
  else toast("For this demo, use the owner account shown below.");
}
function demo(){enter()}
function enter(){
  localStorage.setItem("secretlifeofsilas_session","demo");
  $("login").classList.add("hidden");
  $("app").classList.remove("hidden");
  renderHome();
}
function logout(){localStorage.removeItem("secretlifeofsilas_session");location.reload()}
function renderHome(){showSection("home",document.querySelector("nav button"))}
function showSection(section,btn){
  document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));
  if(btn)btn.classList.add("active");
  const c=$("content");
  if(section==="home") c.innerHTML=`
    <section class="hero">
      <div class="hero-content">
        <div class="eyebrow">SecretLifeOfSilas Original Experience</div>
        <h2>Your world, one hub.</h2>
        <p>Discover authorized movies, music, games, learning tools and shopping services in one polished interface.</p>
        <button class="primary" onclick="openInfo('Featured')">Explore now →</button>
      </div>
    </section>
    <h2 class="section-title">Featured</h2><div class="row">${cards(demoItems)}</div>
    <h2 class="section-title">What SecretLifeOfSilas can become</h2>
    <div class="grid">
      <div class="panel"><h3>4K-ready streaming</h3><p class="muted">Designed for adaptive video delivery when connected to a licensed video CDN.</p></div>
      <div class="panel"><h3>Fast search</h3><p class="muted">Search across your connected catalogue and services.</p></div>
      <div class="panel"><h3>One account</h3><p class="muted">Ready for secure cloud authentication instead of demo credentials.</p></div>
    </div>`;
  else if(section==="movies") renderCatalogue("Movies",demoItems.filter(x=>x.type==="Movie"));
  else if(section==="music") renderCatalogue("Music",demoItems.filter(x=>x.type==="Music"));
  else if(section==="games") renderCatalogue("Games",demoItems.filter(x=>x.type==="Game"));
  else if(section==="learn") c.innerHTML=`<div class="panel"><h1>School Help</h1><p>Ask questions, explain concepts, practice problems and organize study material.</p><button class="primary" onclick="openInfo('School Help')">Open learning assistant</button></div>`;
  else c.innerHTML=`<div class="panel"><h1>Shopping</h1><p>Connect your authorized store catalogue and checkout provider here.</p><button class="primary" onclick="openInfo('Shopping')">Explore store</button></div>`;
}
function renderCatalogue(title,items){
  $("content").innerHTML=`<h1>${title}</h1><p class="muted">Demo catalogue — replace with your licensed catalogue/API.</p><div class="grid">${cards(items)}</div>`;
}
function cards(items){
  return items.map(x=>`<article class="card" onclick='openItem(${JSON.stringify(x)})'>
    <div class="poster" style="background-image:url("${x.img}")"></div>
    <div class="card-body"><b>${x.title}</b><div class="muted">${x.type} • ${x.year}</div></div>
  </article>`).join("");
}
function openItem(x){
  $("modalBody").innerHTML=`<div class="eyebrow">${x.type}</div><h1>${x.title}</h1><p>${x.desc}</p><p class="muted">Playback/download actions should be connected only to content you own or are licensed to distribute.</p><button class="primary" onclick="toast('Connect your licensed media URL/CDN here.')">Play</button>`;
  $("modal").classList.remove("hidden");
}
function openInfo(t){
  $("modalBody").innerHTML=`<h1>${t}</h1><p>This area is ready to connect to your real online service.</p><p class="muted">For production, add secure authentication, a database, API keys on the server, a video CDN, and your licensed content.</p>`;
  $("modal").classList.remove("hidden");
}
function openPremium(){openInfo("Premium")}
function closeModal(){$("modal").classList.add("hidden")}
function toast(msg){
  $("toast").textContent=msg;$("toast").style.display="block";
  setTimeout(()=>$("toast").style.display="none",2600);
}
function searchContent(q){
  if(!q.trim())return;
  const found=demoItems.filter(x=>(x.title+" "+x.type).toLowerCase().includes(q.toLowerCase()));
  $("content").innerHTML=`<h1>Search</h1><div class="grid">${found.length?cards(found):"<p class='muted'>No demo results.</p>"}</div>`;
}
if(localStorage.getItem("secretlifeofsilas_session"))enter();
