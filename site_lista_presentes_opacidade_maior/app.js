const GIFTS=[{"id": "panela-pressao", "name": "Panela de pressão", "image": "assets/panela-pressao.webp"}, {"id": "toalha-banho", "name": "Toalha de banho", "image": "assets/toalha-banho.webp"}, {"id": "sanduicheira", "name": "Sanduícheira", "image": "assets/sanduicheira.webp"}, {"id": "frigideira", "name": "Frigideira antiaderente", "image": "assets/frigideira.webp"}, {"id": "caixas-organizadoras", "name": "Caixas organizadoras", "image": "assets/caixas-organizadoras.webp"}, {"id": "mini-processador", "name": "Mini processador", "image": "assets/mini-processador.webp"}, {"id": "filtro-barro", "name": "Filtro de barro", "image": "assets/filtro-barro.webp"}, {"id": "loucas-porcelana", "name": "Louças em porcelana", "image": "assets/loucas-porcelana.webp"}, {"id": "air-fryer", "name": "Air Fryer", "image": "assets/air-fryer.webp"}, {"id": "puff-bau", "name": "Puff baú marrom", "image": "assets/puff-bau.webp"}, {"id": "escorredor-loucas", "name": "Escorredor de louças rack", "image": "assets/escorredor-loucas.webp"}, {"id": "cafeteira", "name": "A cafeteira que o Kalisson namora há tempos", "image": "assets/cafeteira.webp"}];
const grid=document.getElementById("gift-grid");
const reserveDialog=document.getElementById("reserve-dialog");
const pixDialog=document.getElementById("pix-dialog");
const reserveForm=document.getElementById("reserve-form");
const selectedGiftText=document.getElementById("selected-gift");
const guestName=document.getElementById("guest-name");
const guestContact=document.getElementById("guest-contact");
const confirmReserve=document.getElementById("confirm-reserve");
const toast=document.getElementById("toast");
const databaseUrl=(window.SITE_CONFIG?.firebaseDatabaseUrl||"").replace(/\/$/,"");
let reservations={},selectedGift=null;
function showToast(m){toast.textContent=m;toast.classList.add("show");clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove("show"),3000)}
function readLocal(){try{return JSON.parse(localStorage.getItem("lk-reservas-final")||"{}")}catch{return {}}}
function renderGifts(){grid.innerHTML="";for(const gift of GIFTS){const card=document.createElement("article");card.className="gift-card";const image=document.createElement("img");image.className="gift-card__image";image.src=gift.image;image.alt=gift.name;const name=document.createElement("h2");name.className="gift-card__name";name.textContent=gift.name;const button=document.createElement("button");button.type="button";button.className="reserve-button";if(reservations[gift.id]){
      button.classList.add("reserved");
      if(!databaseUrl){
        button.textContent="Reservado — desfazer";
        button.classList.add("undo-reservation");
        button.addEventListener("click",()=>undoLocalReservation(gift));
      }else{
        button.textContent="Reservado";
        button.disabled=true;
      }
    }else{
      button.textContent="Reservar";
      button.addEventListener("click",()=>openReserve(gift));
    }card.append(image,name,button);grid.appendChild(card)}}
async function loadReservations(){if(!databaseUrl){reservations=readLocal();renderGifts();return}try{const r=await fetch(`${databaseUrl}/reservas.json`);if(!r.ok)throw new Error();reservations=await r.json()||{}}catch{reservations=readLocal();showToast("Sem conexão: exibindo o modo de teste.")}renderGifts()}
function openReserve(gift){selectedGift=gift;reserveForm.reset();selectedGiftText.textContent=gift.name;reserveDialog.showModal();setTimeout(()=>guestName.focus(),50)}
function closeReserve(){reserveDialog.close();selectedGift=null}

function undoLocalReservation(gift){
  if(databaseUrl) return;
  const confirmed=confirm(`Deseja tornar "${gift.name}" disponível novamente?`);
  if(!confirmed) return;

  const local=readLocal();
  delete local[gift.id];
  localStorage.setItem("lk-reservas-final",JSON.stringify(local));
  reservations=local;
  renderGifts();
  showToast("O presente voltou a ficar disponível.");
}
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeReserve));
async function reserveOnline(gift,data){const endpoint=`${databaseUrl}/reservas/${gift.id}.json`;const current=await fetch(endpoint,{headers:{"X-Firebase-ETag":"true"}});if(!current.ok)throw new Error("Não foi possível verificar a reserva.");if((await current.json())!==null)throw new Error("Este presente acabou de ser reservado.");const save=await fetch(endpoint,{method:"PUT",headers:{"Content-Type":"application/json","If-Match":current.headers.get("ETag")},body:JSON.stringify(data)});if(save.status===412)throw new Error("Este presente acabou de ser reservado.");if(!save.ok)throw new Error("Não foi possível salvar a reserva.")}
reserveForm.addEventListener("submit",async e=>{e.preventDefault();if(!selectedGift)return;const data={giftName:selectedGift.name,guestName:guestName.value.trim(),guestContact:guestContact.value.trim(),reservedAt:new Date().toISOString()};if(!data.guestName)return;confirmReserve.disabled=true;confirmReserve.textContent="Reservando...";try{if(databaseUrl){await reserveOnline(selectedGift,data);reservations[selectedGift.id]=data}else{const local=readLocal();if(local[selectedGift.id])throw new Error("Este presente já foi reservado.");local[selectedGift.id]=data;localStorage.setItem("lk-reservas-final",JSON.stringify(local));reservations=local}renderGifts();closeReserve();showToast("Presente reservado com sucesso!")}catch(error){showToast(error.message||"Não foi possível reservar.")}finally{confirmReserve.disabled=false;confirmReserve.textContent="Confirmar reserva"}});
document.getElementById("open-pix").addEventListener("click",()=>pixDialog.showModal());
document.querySelectorAll("[data-close-pix]").forEach(b=>b.addEventListener("click",()=>pixDialog.close()));
document.getElementById("copy-pix").addEventListener("click",async()=>{try{await navigator.clipboard.writeText("41696906806");showToast("Chave Pix copiada!")}catch{prompt("Copie a chave Pix:","41696906806")}});
loadReservations();if(databaseUrl)setInterval(loadReservations,15000);
