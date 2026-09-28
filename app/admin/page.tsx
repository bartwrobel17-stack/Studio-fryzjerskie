"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, GripVertical, ImagePlus, Pencil, Plus, Save, Trash2 } from "lucide-react";
import "./admin.css";

type Item={id:string;url:string;title:string;category:string};
const key="studio-fryzjerskie-gallery";
const initial:Item[]=[
 {id:"1",url:"https://lh3.googleusercontent.com/p/AF1QipM-example1",title:"Studio Fryzjerskie",category:"Salon"},
 {id:"2",url:"https://lh3.googleusercontent.com/p/AF1QipM-example2",title:"Wnętrze salonu",category:"Wnętrze"},
 {id:"3",url:"https://lh3.googleusercontent.com/p/AF1QipM-example3",title:"Fryzura",category:"Fryzury"}
];

export default function Admin(){
 const [items,setItems]=useState<Item[]>(initial);
 const [draft,setDraft]=useState<Item>({id:"",url:"",title:"",category:"Fryzury"});
 const [editing,setEditing]=useState<string|null>(null);
 const [saved,setSaved]=useState(false);
 useEffect(()=>{const s=localStorage.getItem(key);if(s)try{setItems(JSON.parse(s))}catch{}},[]);
 function persist(next:Item[]){setItems(next);localStorage.setItem(key,JSON.stringify(next));setSaved(true);setTimeout(()=>setSaved(false),1600)}
 function add(){if(!draft.url.trim())return;persist([...items,{...draft,id:crypto.randomUUID()}]);setDraft({id:"",url:"",title:"Nowe zdjęcie",category:"Fryzury"})}
 function remove(id:string){persist(items.filter(x=>x.id!==id))}
 function edit(item:Item){setEditing(item.id);setDraft(item)}
 function update(){if(!editing)return;persist(items.map(x=>x.id===editing?draft:x));setEditing(null);setDraft({id:"",url:"",title:"",category:"Fryzury"})}
 function move(i:number,dir:-1|1){const j=i+dir;if(j<0||j>=items.length)return;const n=[...items];[n[i],n[j]]=[n[j],n[i]];persist(n)}
 return <main className="adminPage">
  <header className="adminHeader"><a href="/"><ArrowLeft size={18}/> Strona główna</a><div><span className="status">{saved?"Zapisano":"Panel właściciela"}</span><a href="/" className="viewButton">Podgląd strony</a></div></header>
  <div className="adminWrap">
   <div className="adminIntro"><div><p>STUDIO FRYZJERSKIE</p><h1>Panel właściciela</h1><span>Zarządzaj zdjęciami wyświetlanymi w galerii strony.</span></div><div className="saveBadge"><Save size={17}/> Zapisuje zmiany lokalnie</div></div>
   <section className="adminGrid">
    <div className="card">
     <div className="cardHead"><div><h2>{editing?"Edytuj zdjęcie":"Dodaj zdjęcie"}</h2><p>Wklej bezpośredni adres zdjęcia.</p></div><ImagePlus size={24}/></div>
     <label>Adres zdjęcia<input value={draft.url} onChange={e=>setDraft({...draft,url:e.target.value})} placeholder="https://..." /></label>
     <label>Tytuł<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} placeholder="np. Koloryzacja" /></label>
     <label>Kategoria<select value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}><option>Fryzury</option><option>Salon</option><option>Wnętrze</option><option>Na zewnątrz</option><option>Od właściciela</option></select></label>
     <div className="formActions">{editing?<><button onClick={update} className="primaryBtn"><Save size={16}/> Zapisz</button><button onClick={()=>{setEditing(null);setDraft({id:"",url:"",title:"",category:"Fryzury"})}} className="ghostBtn">Anuluj</button></>:<button onClick={add} className="primaryBtn"><Plus size={16}/> Dodaj do galerii</button>}</div>
    </div>
    <div className="card galleryAdmin"><div className="cardHead"><div><h2>Galeria ({items.length})</h2><p>Edytuj, usuwaj i zmieniaj kolejność.</p></div></div>
      <div className="adminList">{items.map((item,i)=><div className="adminItem" key={item.id}><GripVertical size={17} className="drag"/><div className="thumb"><img src={item.url} alt="" /></div><div className="itemMeta"><b>{item.title||"Bez tytułu"}</b><span>{item.category}</span></div><div className="itemActions"><button onClick={()=>move(i,-1)} disabled={i===0}>↑</button><button onClick={()=>move(i,1)} disabled={i===items.length-1}>↓</button><button onClick={()=>edit(item)} title="Edytuj"><Pencil size={16}/></button><button className="danger" onClick={()=>remove(item.id)} title="Usuń"><Trash2 size={16}/></button></div></div>)}</div>
    </div>
   </section>
   <div className="notice"><b>Ważne:</b> obecna wersja panelu przechowuje zmiany w pamięci przeglądarki. Do wersji produkcyjnej podłączymy logowanie właściciela i bazę/storage, żeby zdjęcia były wspólne na wszystkich urządzeniach.</div>
  </div>
 </main>
}
