import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight, Trash2, Star, X, Check } from "lucide-react";
import {
  FOLK, CLASSES, ATTRS, AL, AD, ALL_SKILLS, SKILL_EXAMPLES, LEVEL_TABLE, OUTCOMES, CONDITIONS, LOCATIONS, BESTIARY,
  loadChars, saveChars, charApi, uid,
  nextEN, abilsUnlocked, getAPMax, calcMaxHP, getBaseAttrs, applyFolkMod, applyLevelUp,
} from "./lib.js";
import { ITEMS, ITEM_CATEGORIES } from "./items.js";
import { WORLD_LORE, FOLK_LORE, MONSTER_LORE, LOCATION_LORE, IRON_DECREE } from "./lore.js";

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
  :root {
    --bg:#FFFBF0; --bg2:#FFF5DC; --surface:#FFFFFF; --surface2:#F9F6EE;
    --border:#D4E8C2; --border2:#A8CC88; --green:#3BAE63; --green2:#217A43;
    --orange:#FF6B35; --orange2:#C44E1A; --purple:#7C3AED; --purple2:#4C1D95;
    --teal:#0891B2; --yellow:#F59E0B; --gold:#F59E0B; --gold2:#FBBF24;
    --pink:#DB2777; --text:#1C1410; --text2:#44342A; --muted:#8A756A;
    --red:#DC2626; --red2:#EF4444; --shadow:rgba(60,40,20,0.09);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background:var(--bg);
    background-image:
      radial-gradient(ellipse at 10% 0%,rgba(59,174,99,0.08) 0%,transparent 50%),
      radial-gradient(ellipse at 90% 100%,rgba(251,191,36,0.08) 0%,transparent 50%);
    color:var(--text);font-family:'Nunito',sans-serif;font-size:16px;min-height:100vh;
  }
  ::-webkit-scrollbar{width:8px;}
  ::-webkit-scrollbar-track{background:var(--bg2);}
  ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px;}
  input,select,textarea{
    background:var(--surface);border:2px solid var(--border);color:var(--text);
    font-family:'Nunito',sans-serif;font-size:1rem;font-weight:600;
    padding:0.55rem 0.9rem;border-radius:12px;width:100%;outline:none;
    transition:border-color 0.2s,box-shadow 0.2s;
  }
  input:focus,select:focus,textarea:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(59,174,99,0.18);}
  select option{background:var(--surface);}
  @keyframes float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(2deg)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes popIn{0%{transform:scale(0.8)}60%{transform:scale(1.06)}100%{transform:scale(1)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  .fadeUp{animation:fadeUp 0.35s ease forwards;}
  .popIn{animation:popIn 0.3s ease forwards;}
  @media print{
    nav,.no-print{display:none!important;}
    body{background:white!important;font-size:11px;}
    *{box-shadow:none!important;animation:none!important;}
    .print-sheet{padding:0.5rem!important;}
  }
`

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useMobile(bp=640){
  const [m,setM]=useState(()=>typeof window!=="undefined"&&window.innerWidth<bp);
  useEffect(()=>{const fn=()=>setM(window.innerWidth<bp);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[bp]);
  return m;
}

/* ─── STYLE HELPERS ─────────────────────────────────────────────────────── */
const FD = {fontFamily:"'Fredoka One',cursive",letterSpacing:"0.03em"};
const cardStyle = (accent="var(--green)") => ({
  background:"white",border:"2px solid var(--border)",borderRadius:20,
  padding:"1.25rem 1.4rem",boxShadow:"0 4px 16px var(--shadow)",
  borderTop:`4px solid ${accent}`,
});
const pill = (bg="var(--green)",color="white") => ({
  fontFamily:"'Fredoka One',cursive",fontSize:"0.7rem",letterSpacing:"0.04em",
  padding:"0.22rem 0.75rem",borderRadius:50,background:bg,color,
  display:"inline-block",lineHeight:1.4,fontWeight:700,
});
const btnS = (v) => ({
  fontFamily:"'Fredoka One',cursive",fontSize:"0.88rem",letterSpacing:"0.04em",
  padding:"0.6rem 1.5rem",borderRadius:50,cursor:"pointer",transition:"all 0.18s",
  display:"inline-flex",alignItems:"center",gap:"0.4rem",fontWeight:700,
  background: v==="primary"?"var(--green)":v==="gold"?"var(--orange)":v==="red"?"var(--red)":v==="purple"?"var(--purple)":"var(--surface)",
  color: v==="ghost"?"var(--text2)":"white",
  border: v==="ghost"?"2px solid var(--border2)":"none",
  boxShadow: v==="ghost"?"none":`0 4px 0 ${v==="primary"?"var(--green2)":v==="gold"?"var(--orange2)":v==="red"?"#991b1b":v==="purple"?"var(--purple2)":"transparent"}`,
});

const FOLK_C = {
  Greycoat:   {bg:"#6B7280",light:"#F8FAFC",border:"#CBD5E1",text:"#334155"},
  Redpelt:    {bg:"#EA580C",light:"#FFF7ED",border:"#FED7AA",text:"#7C2D12"},
  Shadowtail: {bg:"#7C3AED",light:"#F5F3FF",border:"#DDD6FE",text:"#3B0764"},
  Glideborn:  {bg:"#0891B2",light:"#F0F9FF",border:"#BAE6FD",text:"#0C4A6E"},
  Palewhisker:{bg:"#DB2777",light:"#FDF2F8",border:"#FBCFE8",text:"#500724"},
};
const CLASS_C = {
  "Oakshield Warrior":{bg:"#EA580C",light:"#FFF7ED",border:"#FED7AA",text:"#7C2D12"},
  "Briar Rogue":      {bg:"#7C3AED",light:"#F5F3FF",border:"#DDD6FE",text:"#3B0764"},
  "Grove Shaman":     {bg:"#16A34A",light:"#F0FDF4",border:"#BBF7D0",text:"#14532D"},
  "Canopy Ranger":    {bg:"#0891B2",light:"#F0F9FF",border:"#BAE6FD",text:"#0C4A6E"},
  "Gilded Herald":    {bg:"#B45309",light:"#FFFBEB",border:"#FDE68A",text:"#78350F"},
};

function Btn({children,onClick,v="primary",style={},disabled=false}){
  const [hov,setHov]=useState(false);
  return <button onClick={onClick} disabled={disabled}
    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{...btnS(v),opacity:disabled?0.45:1,
      transform:hov&&!disabled?"translateY(-2px)":"none",
      boxShadow:hov&&!disabled?`0 7px 0 ${v==="primary"?"var(--green2)":v==="gold"?"var(--orange2)":v==="red"?"#991b1b":v==="purple"?"var(--purple2)":"transparent"}`:btnS(v).boxShadow,
      ...style}}>
    {children}
  </button>;
}

function Tag({children,bg,color}){return <span style={pill(bg||"var(--green)",color||"white")}>{children}</span>;}

function Divr({label,emoji="🍃"}){
  return <div style={{display:"flex",alignItems:"center",gap:"1rem",margin:"2rem 0 1.5rem"}}>
    <div style={{flex:1,height:2,background:"linear-gradient(90deg,transparent,var(--border2))"}}/>
    <div style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.3rem 1rem",borderRadius:50,background:"var(--bg2)",border:"2px solid var(--border)"}}>
      <span>{emoji}</span>
      {label&&<span style={{...FD,fontSize:"0.78rem",color:"var(--green2)"}}>{label.toUpperCase()}</span>}
    </div>
    <div style={{flex:1,height:2,background:"linear-gradient(90deg,var(--border2),transparent)"}}/>
  </div>;
}

function Accord({title,children,open:def=false,accent="var(--green)"}){
  const [o,setO]=useState(def);
  return <div style={{border:"2px solid var(--border)",borderRadius:16,overflow:"hidden",marginBottom:"0.6rem",boxShadow:"0 2px 8px var(--shadow)"}}>
    <button onClick={()=>setO(x=>!x)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"0.85rem 1.25rem",background:o?"var(--bg2)":"var(--surface)",border:"none",
      color:"var(--text)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.95rem",
      letterSpacing:"0.03em",textAlign:"left",transition:"background 0.15s",
      borderLeft:`5px solid ${accent}`}}>
      <span>{title}</span>
      <span style={{fontSize:"1.1rem",transition:"transform 0.2s",display:"inline-block",transform:o?"rotate(180deg)":"none"}}>▾</span>
    </button>
    {o&&<div style={{padding:"1.1rem 1.25rem",borderTop:"2px solid var(--border)",background:"white"}}>{children}</div>}
  </div>;
}

function Modal({children,onClose,title,accent="var(--green)"}){
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",backdropFilter:"blur(4px)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
    <div style={{background:"white",border:`3px solid ${accent}`,borderRadius:24,maxWidth:560,width:"100%",maxHeight:"92vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 1.5rem",borderBottom:"2px solid var(--border)",background:"var(--bg2)"}}>
        <span style={{...FD,fontSize:"1.1rem",color:"var(--green2)"}}>{title}</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"1.3rem",lineHeight:1}}>✕</button>
      </div>
      <div style={{padding:"1.5rem"}}>{children}</div>
    </div>
  </div>;
}

function Pips({value,max=3,onChange,color="var(--green)"}){
  return <div style={{display:"flex",gap:5}}>
    {Array.from({length:max},(_,i)=><div key={i} onClick={()=>onChange&&onChange(i<value?i:i+1)}
      style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${i<value?color:"var(--border2)"}`,
        background:i<value?color:"transparent",cursor:onChange?"pointer":"default",
        transition:"all 0.15s",boxShadow:i<value?`0 0 6px ${color}88`:"none"}}/>)}
  </div>;
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */
function Nav({page,setPage,charCount}){
  const tabs=[{id:"home",label:"Home"},{id:"rules",label:"Rules"},{id:"lore",label:"Lore"},{id:"chars",label:`Characters${charCount>0?` (${charCount})`:""}`}];
  return <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,18,8,0.94)",backdropFilter:"blur(10px)",borderBottom:"1px solid var(--border)"}}>
    <div style={{maxWidth:1000,margin:"0 auto",padding:"0 1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:54}}>
      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
        <span style={{fontSize:"1.1rem"}}>🌰</span>
        <span style={{...FD,fontSize:"1.05rem",color:"var(--orange)"}}>ACORNIA</span>
      </div>
      <div style={{display:"flex",gap:"0.2rem"}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setPage(t.id)} style={{padding:"0.3rem 0.85rem",borderRadius:4,border:"none",cursor:"pointer",background:page===t.id?"var(--accent)":"transparent",color:page===t.id?"white":"var(--text2)",fontFamily:"'Fredoka One',cursive",fontSize:"0.63rem",letterSpacing:"0.1em",transition:"all 0.15s"}}>{t.label}</button>)}
      </div>
    </div>
  </nav>;
}

/* ─── LANDING ───────────────────────────────────────────────────────────── */
function Landing({setPage}){
  return <div style={{maxWidth:1040,margin:"0 auto",padding:"0 1.25rem 5rem",position:"relative",zIndex:1}}>

    {/* ── HERO ── */}
    <div style={{textAlign:"center",padding:"4rem 1rem 3rem"}}>
      <div style={{fontSize:"5rem",marginBottom:"0.75rem",
        animation:"float 3.5s ease-in-out infinite",display:"inline-block",
        filter:"drop-shadow(0 6px 12px rgba(0,0,0,0.15))"}}>🌰</div>
      <h1 style={{...FD,fontSize:"clamp(3rem,8vw,5rem)",color:"var(--green2)",
        textShadow:"0 4px 0 rgba(59,174,99,0.25)",marginBottom:"0.5rem",lineHeight:1.1}}>
        ACORNIA
      </h1>
      <p style={{fontFamily:"'Fredoka One',cursive",fontSize:"clamp(1.1rem,3vw,1.4rem)",color:"var(--orange)",marginBottom:"0.35rem"}}>
        A Tabletop Adventure for Nature Explorers! 🍃
      </p>
      <p style={{color:"var(--muted)",fontSize:"1rem",fontWeight:600,marginBottom:"2rem"}}>
        For 2–5 Players · d6 Dice System · All Ages Welcome
      </p>
      <div style={{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"}}>
        <Btn onClick={()=>setPage("chars")} v="gold" style={{fontSize:"1rem",padding:"0.75rem 2rem"}}>
          🐿️ Create a Character!
        </Btn>
        <Btn onClick={()=>setPage("rules")} v="primary" style={{fontSize:"1rem",padding:"0.75rem 2rem"}}>
          📖 Read the Rules
        </Btn>
      </div>
    </div>

    {/* ── LORE ── */}
    <div style={{...cardStyle("var(--yellow)"),marginBottom:"2rem",
      background:"linear-gradient(135deg,#FFFBF0,#FFF8E8)"}}>
      <div style={{...FD,fontSize:"1.1rem",color:"var(--orange)",marginBottom:"0.75rem"}}>
        🌳 The Story of Acornia
      </div>
      <p style={{fontStyle:"italic",fontSize:"1.1rem",color:"var(--text2)",lineHeight:1.85,marginBottom:"0.75rem",fontWeight:600}}>
        "Long ago, all squirrel-kind lived together under one great tree — Yggdorn, the World Tree. Then came the Cutting..."
      </p>
      <p style={{color:"var(--text2)",lineHeight:1.8,fontWeight:500,fontSize:"0.97rem"}}>
        The greedy Rat Barons chopped down the great branches, and squirrel-kind was scattered into five different canopies,
        each with its own story. Now the Barons press deeper into ancient groves, the Owl Courts demand tribute, and a dark blight
        spreads through the roots. Somewhere beneath it all, the World Tree still lives — waiting for brave heroes like you to find it! 🌟
      </p>
    </div>

    {/* ── FEATURES ── */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
      {[
        {emoji:"🎲",title:"Easy d6 Rules",desc:"Roll a handful of dice and take the highest! No math harder than counting — just exciting results.",color:"var(--teal)"},
        {emoji:"🐿️",title:"5 Unique Folk",desc:"Play as a city Greycoat, fierce Redpelt, sneaky Shadowtail, soaring Glideborn, or magical Palewhisker!",color:"var(--green)"},
        {emoji:"⚔️",title:"4 Hero Classes",desc:"Be a brave Warrior, clever Rogue, wise Shaman, or sharp-eyed Ranger. Level up from 1 all the way to 10!",color:"var(--orange)"},
        {emoji:"🗺️",title:"5 Adventures",desc:"Explore canopy cities, ancient groves, moonlit hollows, mountain peaks, and mysterious wandering paths.",color:"var(--purple)"},
      ].map((f,i)=><div key={i} style={{...cardStyle(f.color),textAlign:"center",padding:"1.5rem 1.25rem"}}>
        <div style={{fontSize:"2.5rem",marginBottom:"0.5rem"}}>{f.emoji}</div>
        <div style={{...FD,fontSize:"1.05rem",color:f.color,marginBottom:"0.4rem"}}>{f.title}</div>
        <p style={{color:"var(--text2)",fontSize:"0.9rem",lineHeight:1.65,fontWeight:500}}>{f.desc}</p>
      </div>)}
    </div>

    {/* ── OUTCOME TABLE ── */}
    <Divr label="How Dice Work" emoji="🎲"/>
    <div style={{...cardStyle("var(--purple)"),marginBottom:"2rem"}}>
      <div style={{...FD,fontSize:"1.05rem",color:"var(--purple)",marginBottom:"1rem"}}>
        Roll your dice and take the single highest number! ✨
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"0.6rem"}}>
        {[
          {roll:"6 + 6",name:"Triumph! ⭐",color:"#F59E0B",bg:"#FFFBEB",desc:"Wow! Something amazing happens!"},
          {roll:"6",name:"Full Win! 🎉",color:"#16A34A",bg:"#F0FDF4",desc:"You do exactly what you wanted!"},
          {roll:"4–5",name:"Success! 👍",color:"#2563EB",bg:"#EFF6FF",desc:"It works! No problems!"},
          {roll:"2–3",name:"Sort of... 😬",color:"#EA580C",bg:"#FFF7ED",desc:"You succeed but something happens."},
          {roll:"1",name:"Uh oh! 😱",color:"#DC2626",bg:"#FEF2F2",desc:"You fail — but the story gets better!"},
        ].map(o=><div key={o.roll} style={{background:o.bg,border:`3px solid ${o.color}33`,borderRadius:16,padding:"0.9rem",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div style={{...FD,fontSize:"1.2rem",color:o.color,marginBottom:4}}>{o.roll}</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"0.78rem",color:o.color,marginBottom:5}}>{o.name}</div>
          <div style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.5,fontWeight:500}}>{o.desc}</div>
        </div>)}
      </div>
    </div>

    {/* ── FOLK PREVIEW ── */}
    <Divr label="The Five Folk" emoji="🐿️"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:"0.75rem",marginBottom:"2rem"}}>
      {Object.entries(FOLK).map(([name,f])=>{
        const fc=FOLK_C[name]||{bg:"#6B7280",light:"#F8FAFC",border:"#CBD5E1",text:"#334155"};
        return <div key={name} style={{background:fc.light,border:`3px solid ${fc.border}`,borderRadius:18,padding:"1.25rem 1rem",textAlign:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.07)",transition:"transform 0.2s",cursor:"default"}}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="none"}>
          <div style={{fontSize:"2.2rem",marginBottom:"0.4rem"}}>{f.emoji}</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"0.95rem",color:fc.bg,marginBottom:"0.3rem"}}>{name}</div>
          <div style={{color:fc.text,fontSize:"0.78rem",fontStyle:"italic",fontWeight:600,marginBottom:"0.5rem"}}>{f.tag}</div>
          <div style={{...pill(fc.bg,"white"),fontSize:"0.62rem",display:"block",textAlign:"center"}}>{Object.entries(f.mod||{}).map(([k,v])=>k==="any"?"Any Attr +1":`${k[0].toUpperCase()+k.slice(1)} ${v>0?"+":""}${v}`).join(" · ")||"Choose +1"}</div>
        </div>;
      })}
    </div>

    {/* ── CLASS PREVIEW ── */}
    <Divr label="The Five Classes" emoji="⚔️"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"0.75rem",marginBottom:"2rem"}}>
      {Object.entries(CLASSES).map(([name,cl])=>{
        const cc=CLASS_C[name]||{bg:"#6B7280",light:"#F8FAFC",border:"#CBD5E1",text:"#334155"};
        return <div key={name} style={{background:cc.light,border:`3px solid ${cc.border}`,borderRadius:18,padding:"1.25rem",boxShadow:"0 4px 12px rgba(0,0,0,0.07)",transition:"transform 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="none"}>
          <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.6rem"}}>
            <span style={{fontSize:"1.8rem"}}>{cl.icon}</span>
            <div>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"0.95rem",color:cc.bg}}>{name}</div>
              <div style={{color:cc.text,fontSize:"0.75rem",fontStyle:"italic",fontWeight:600}}>{cl.tag}</div>
            </div>
          </div>
          <p style={{color:"var(--text2)",fontSize:"0.85rem",lineHeight:1.6,fontWeight:500,marginBottom:"0.6rem"}}>{cl.role}</p>
          <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap"}}>
            {cl.abilities.slice(0,2).map((a,i)=><span key={a.name} style={pill(i===0?cc.bg:cc.border,i===0?"white":cc.text)}>Lv{a.level}: {a.name}</span>)}
          </div>
        </div>;
      })}
    </div>

    {/* ── LOCATIONS ── */}
    <Divr label="5 Exciting Locations" emoji="🗺️"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"0.75rem",marginBottom:"3rem"}}>
      {LOCATIONS.map((l,i)=>{
        const colors=["var(--teal)","var(--green)","var(--purple)","var(--orange)","var(--yellow)"];
        const bgs=["#F0F9FF","#F0FDF4","#F5F3FF","#FFF7ED","#FFFBEB"];
        return <div key={l.name} style={{background:bgs[i],border:`3px solid ${colors[i]}44`,borderRadius:18,padding:"1.2rem",boxShadow:"0 4px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"0.95rem",color:colors[i],marginBottom:"0.4rem"}}>{l.name}</div>
          <div style={{display:"flex",gap:"0.35rem",marginBottom:"0.6rem",flexWrap:"wrap"}}>
            <span style={pill(`${colors[i]}CC`,"white")}>{l.enemy}</span>
            <span style={pill(`${colors[i]}44`,colors[i])}>{l.quest}</span>
          </div>
          <p style={{color:"var(--text2)",fontSize:"0.87rem",lineHeight:1.65,fontWeight:500}}>{l.desc}</p>
        </div>;
      })}
    </div>

    <div style={{textAlign:"center",padding:"2rem 0"}}>
      <p style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.25rem",color:"var(--green2)",marginBottom:"1.25rem"}}>
        The World Tree is waiting for YOU! 🌳
      </p>
      <Btn onClick={()=>setPage("chars")} v="gold" style={{fontSize:"1.05rem",padding:"0.8rem 2.5rem"}}>
        🐿️ Build Your Character!
      </Btn>
    </div>
  </div>;
}

/* ─── RULES ──────────────────────────────────────────────────────────────── */
function Rules(){
  const row=(t,d)=><div style={{display:"flex",gap:"1rem",padding:"0.55rem 0",borderBottom:"1px solid var(--border)"}}>
    <div style={{...FD,fontSize:"0.7rem",color:"var(--gold)",minWidth:130,flexShrink:0}}>{t}</div>
    <div style={{color:"var(--text2)",fontSize:"0.88rem",lineHeight:1.65}}>{d}</div>
  </div>;
  return <div style={{maxWidth:900,margin:"0 auto",padding:"2rem 1.5rem 5rem"}}>
    <h1 style={{...FD,fontSize:"1.7rem",color:"var(--orange)",marginBottom:"0.4rem"}}>Rules Reference</h1>
    <p style={{color:"var(--text2)",fontStyle:"italic",marginBottom:"1.5rem"}}>Everything you need to play Acornia, in one place.</p>

    <Accord title="⚀ Core Mechanic" open>
      <p style={{color:"var(--text2)",lineHeight:1.75,marginBottom:"1rem"}}>Roll a pool of d6s equal to your Attribute rating (1, 2, or 3 dice). <strong style={{color:"var(--text)"}}>Take only the single highest die as your result.</strong> Compare it to the Outcome Table. Bonus dice from abilities or folk traits add to your pool, but the total pool never exceeds 3d6 unless a specific ability states otherwise.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"0.5rem"}}>
        {OUTCOMES.map(o=><div key={o.roll} style={{background:"white",borderTop:`2px solid ${o.color}`,borderRadius:4,padding:"0.75rem",textAlign:"center"}}>
          <div style={{fontFamily:"'Fredoka One',cursive",color:o.color,fontSize:"1rem",marginBottom:3}}>{o.roll}</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"0.62rem",letterSpacing:"0.1em",color:"var(--text)",marginBottom:5}}>{o.name.toUpperCase()}</div>
          <div style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.5}}>{o.desc}</div>
        </div>)}
      </div>
    </Accord>

    <Accord title="📊 The Six Attributes & Skills">
      <div style={{display:"grid",gap:"0.75rem"}}>
        {ATTRS.map(a=><div key={a} style={{background:"white",borderRadius:8,padding:"0.85rem",border:"1px solid var(--border)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"0.3rem"}}>
            <div style={{...FD,fontSize:"0.82rem",color:"var(--gold)"}}>{AL[a]}</div>
            <div style={{color:"var(--muted)",fontSize:"0.72rem",fontStyle:"italic"}}>1–3 dice · take highest</div>
          </div>
          <div style={{color:"var(--text2)",fontSize:"0.86rem",marginBottom:"0.65rem",borderBottom:"1px solid var(--border)",paddingBottom:"0.5rem"}}>{AD[a]}</div>
          <div style={{display:"grid",gap:"0.3rem"}}>
            {ALL_SKILLS[a].map(sk=><div key={sk} style={{display:"flex",gap:"0.6rem",alignItems:"flex-start"}}>
              <span style={{...FD,fontSize:"0.72rem",color:"var(--green2)",minWidth:170,flexShrink:0}}>{sk}</span>
              <span style={{color:"var(--muted)",fontSize:"0.78rem",fontStyle:"italic",lineHeight:1.45}}>{SKILL_EXAMPLES[sk]}</span>
            </div>)}
          </div>
        </div>)}
      </div>
    </Accord>

    <Accord title="⚔️ Combat — Full Rules">
      {[["Initiative","Everyone rolls Agility. Highest result acts first, descending. Ties broken by Cunning. NPCs act on a count set by the GM."],
        ["Your Turn","Move to an adjacent Zone AND take one Action. Alternatively, Sprint two Zones (no action this turn). You may always speak for free."],
        ["Attack","Roll your relevant Attribute (Brawn for melee, Agility for ranged). 4+ = hit. 2-3 = hit with complication. 1 = miss and GM introduces a consequence."],
        ["Damage","Weapons deal 1d6 damage. Roll a 6 on your attack: +2 bonus damage. Roll Triumph (two 6s in pool): +4 bonus damage. Apply armour reduction after damage is determined."],
        ["Defense","Armour subtracts a flat value from all incoming damage (minimum 0). Shields grant one free re-roll of any defense roll per combat. Shields can stack with armour."],
        ["Zones","Close = same space. Near = one zone away. Far = two zones. Melee requires Close range. Most ranged works at Near or Far. Glide-capable characters can reach Far in one move."],
        ["Downed","At 0 HP: you are Down. Conscious but unable to act. Allies spending their action Stabilize you (restore 1 HP, you may act next round). Three Downs in one session = Death."],
        ["Fleeing","Roll Agility 4+ to escape combat. On a failure, the fastest enemy gets one free attack as you flee. Success means you are out of the encounter."]].map(([t,d])=>row(t,d))}
    </Accord>

    <Accord title="⚠️ Conditions — All Seven">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"0.5rem"}}>
        {CONDITIONS.map(c=><div key={c.name} style={{background:"white",borderRadius:4,padding:"0.75rem",borderLeft:"2px solid var(--red2)"}}>
          <div style={{...FD,fontSize:"0.72rem",color:"var(--red2)",marginBottom:3}}>{c.name.toUpperCase()}</div>
          <div style={{color:"var(--text2)",fontSize:"0.86rem",lineHeight:1.55}}>{c.desc}</div>
        </div>)}
      </div>
    </Accord>

    <Accord title="🌰 Acorn Points (AP)">
      <p style={{color:"var(--text2)",marginBottom:"0.75rem",lineHeight:1.7}}>Start each session with 2 AP. Earn more through great roleplay, clever solutions, or making the table laugh. AP max increases permanently at Level 4 (+1) and Level 9 (+1).</p>
      {["Re-roll any single die in your pool.","Declare a small true detail about the current scene.","Stabilize yourself at 0 HP without an ally's help.","Attempt something outside your class kit, once.","Ask the GM for a hint or a clarifying clue."].map((u,i)=><div key={i} style={{padding:"0.38rem 0",color:"var(--text2)",fontSize:"0.9rem",display:"flex",gap:8}}><span style={{color:"var(--gold)"}}>*</span>{u}</div>)}
    </Accord>

    <Accord title="🌿 Experience Nuts (EN) — Full Level Table">
      <p style={{color:"var(--text2)",marginBottom:"0.85rem",lineHeight:1.7}}>Earn 1 EN when the party completes a meaningful goal. The GM awards EN at end of sessions. Each level requires accumulating the listed total.</p>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.85rem"}}>
          <thead><tr>{["Level","EN Total","What You Gain"].map(h=><th key={h} style={{padding:"0.5rem 0.75rem",background:"var(--bg2)",fontFamily:"'Fredoka One',cursive",fontSize:"0.63rem",letterSpacing:"0.1em",color:"var(--text2)",textAlign:"left",borderBottom:"1px solid var(--border)"}}>{h}</th>)}</tr></thead>
          <tbody>{LEVEL_TABLE.map((r,i)=><tr key={r.level} style={{background:i%2===0?"#F9FFF6":"white"}}>
            <td style={{padding:"0.5rem 0.75rem",fontFamily:"'Fredoka One',cursive",color:"var(--gold)",borderBottom:"1px solid var(--border)"}}>{r.level===10?"★ 10":r.level}</td>
            <td style={{padding:"0.5rem 0.75rem",color:"var(--text2)",borderBottom:"1px solid var(--border)"}}>{r.en}</td>
            <td style={{padding:"0.5rem 0.75rem",color:"var(--text2)",borderBottom:"1px solid var(--border)",lineHeight:1.6}}>{r.gains.join(" · ")}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </Accord>

    <Accord title="💰 Currency, Resting & Downtime">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
        <div>
          <div style={{...FD,fontSize:"0.68rem",color:"var(--gold)",marginBottom:"0.5rem"}}>CURRENCY</div>
          {[["Acorn (AC)","1 — Base coin, everyday purchases"],["Gilded Cone","10 AC — Merchant-grade, formal trade"],["World-Root Token","100 AC — Noble and guild use only"]].map(([k,v])=><div key={k} style={{display:"flex",gap:"0.5rem",padding:"0.35rem 0",borderBottom:"1px solid var(--border)",fontSize:"0.87rem"}}><span style={{color:"var(--gold)",minWidth:140}}>{k}</span><span style={{color:"var(--text2)"}}>{v}</span></div>)}
        </div>
        <div>
          <div style={{...FD,fontSize:"0.68rem",color:"var(--gold)",marginBottom:"0.5rem"}}>RESTING</div>
          {[["Long Rest","Full HP restored. AP resets to session max. Consumables replenished."],["Short Rest","Restore HP equal to your Core Attribute rating."],["Crafting","Cunning 4+ during rest: craft arrows, poisons, or gear components."]].map(([k,v])=><div key={k} style={{padding:"0.35rem 0",borderBottom:"1px solid var(--border)",fontSize:"0.87rem"}}><div style={{color:"var(--gold)",marginBottom:2,fontFamily:"'Fredoka One',cursive",fontSize:"0.72rem"}}>{k}</div><div style={{color:"var(--text2)"}}>{v}</div></div>)}
        </div>
      </div>
    </Accord>

    {/* Folk */}
    <Divr label="The Five Folk"/>
    {Object.entries(FOLK).map(([name,f])=><Accord key={name} title={`${f.emoji} ${name} — ${f.tag}`}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"0.85rem"}}>
        <div style={{background:"white",borderRadius:4,padding:"0.7rem"}}>
          <div style={{...FD,fontSize:"0.6rem",color:"var(--muted)",marginBottom:3}}>STAT MODIFIER</div>
          <div style={{color:"var(--text)",fontSize:"0.88rem"}}>{f.anyAttr?"Choose any one Attribute: +1":Object.entries(f.mod||{}).map(([k,v])=>`${AL[k]} ${v>0?"+":""}${v}`).join(", ")}</div>
        </div>
        <div style={{background:"white",borderRadius:4,padding:"0.7rem"}}>
          <div style={{...FD,fontSize:"0.6rem",color:"var(--muted)",marginBottom:3}}>BONUS DIE</div>
          <div style={{color:"var(--text)",fontSize:"0.85rem"}}>{f.bonus}</div>
        </div>
      </div>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--muted)",marginBottom:"0.5rem"}}>FOLK ABILITIES — ALL UNLOCKED AT LEVEL 1</div>
      {f.abilities.map(a=><div key={a.name} style={{background:"white",borderRadius:4,padding:"0.75rem",marginBottom:"0.4rem",borderLeft:"3px solid var(--green)"}}>
        <div style={{...FD,fontSize:"0.7rem",color:"var(--gold)",marginBottom:3}}>{a.name.toUpperCase()}</div>
        <div style={{color:"var(--text2)",fontSize:"0.87rem",lineHeight:1.55}}>{a.desc}</div>
      </div>)}
      <div style={{marginTop:"0.6rem",background:"var(--bg2)",borderRadius:4,padding:"0.6rem 0.75rem"}}>
        <span style={{color:"var(--muted)",fontSize:"0.8rem",fontStyle:"italic"}}>{f.trait}</span>
        <div style={{marginTop:"0.3rem",color:"var(--text2)",fontSize:"0.82rem"}}>Starting gear: {f.gear}</div>
      </div>
    </Accord>)}

    {/* Classes */}
    <Divr label="The Five Classes"/>
    {Object.entries(CLASSES).map(([name,cl])=><Accord key={name} title={`${cl.icon} ${name} — ${cl.tag}`}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.5rem",marginBottom:"0.85rem"}}>
        {[["Core Attribute",AL[cl.coreAttr]],["Starting HP",`${cl.hpBase} + ${AL[cl.coreAttr]}`],["Per Level",`+${cl.hpPerLevel} HP`]].map(([k,v])=><div key={k} style={{background:"white",borderRadius:4,padding:"0.65rem",textAlign:"center"}}>
          <div style={{...FD,fontSize:"0.58rem",color:"var(--muted)",marginBottom:3}}>{k.toUpperCase()}</div>
          <div style={{...FD,color:"var(--gold)",fontSize:"0.8rem"}}>{v}</div>
        </div>)}
      </div>
      <p style={{color:"var(--text2)",fontSize:"0.88rem",lineHeight:1.65,marginBottom:"0.85rem",fontStyle:"italic"}}>{cl.role}</p>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--muted)",marginBottom:"0.5rem"}}>CLASS ABILITIES</div>
      {cl.abilities.map((a,i)=><div key={a.name} style={{background:"white",borderRadius:4,padding:"0.75rem",marginBottom:"0.4rem",borderLeft:`2px solid ${i===0?"var(--gold)":"var(--border2)"}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
          <span style={{...FD,fontSize:"0.7rem",color:i===0?"var(--gold)":"var(--text2)"}}>{a.name.toUpperCase()}</span>
          <Tag>Level {a.level}</Tag>
        </div>
        <div style={{color:"var(--text2)",fontSize:"0.87rem",lineHeight:1.55}}>{a.desc}</div>
      </div>)}
      <div style={{background:"rgba(200,150,58,0.08)",border:"1px solid rgba(200,150,58,0.3)",borderRadius:4,padding:"0.75rem",marginTop:"0.6rem"}}>
        <div style={{...FD,fontSize:"0.6rem",color:"var(--gold)",marginBottom:3}}>★ LEVEL 10 CAPSTONE — {cl.legendaryTitle}</div>
        <div style={{color:"var(--text2)",fontSize:"0.87rem"}}>{cl.capstone}</div>
      </div>
    </Accord>)}

    {/* Bestiary */}
    <Divr label="Bestiary"/>
    {BESTIARY.map(e=><Accord key={e.name} title={`👾 ${e.name}`}>
      <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"0.75rem"}}>
        {[["HP",e.hp],["Brawn",e.brawn],["Agility",e.agility],["Armour",e.armor]].map(([k,v])=><div key={k} style={{background:"white",borderRadius:4,padding:"0.5rem 0.75rem",textAlign:"center"}}>
          <div style={{...FD,fontSize:"0.58rem",color:"var(--muted)",marginBottom:2}}>{k}</div>
          <div style={{...FD,color:"var(--gold)",fontSize:"0.85rem"}}>{v}</div>
        </div>)}
      </div>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--muted)",marginBottom:"0.4rem"}}>ATTACKS</div>
      {e.attacks.map((a,i)=><div key={i} style={{padding:"0.3rem 0",color:"var(--text2)",fontSize:"0.87rem",borderBottom:"1px solid var(--border)"}}>• {a}</div>)}
      <div style={{...FD,fontSize:"0.62rem",color:"var(--muted)",marginTop:"0.6rem",marginBottom:"0.4rem"}}>SPECIAL ABILITIES</div>
      {e.abilities.map((a,i)=><div key={i} style={{padding:"0.3rem 0",color:"var(--text2)",fontSize:"0.87rem",borderBottom:"1px solid var(--border)"}}>• {a}</div>)}
      <div style={{marginTop:"0.6rem",background:"var(--bg2)",borderRadius:4,padding:"0.6rem 0.75rem"}}>
        <span style={{...FD,fontSize:"0.62rem",color:"var(--muted)"}}>TACTICS: </span>
        <span style={{color:"var(--text2)",fontSize:"0.87rem",fontStyle:"italic"}}>{e.tactics}</span>
      </div>
    </Accord>)}
  </div>;
}

/* ─── CHARACTER WIZARD ───────────────────────────────────────────────────── */
function Wizard({onSave,onCancel}){
  const STEPS = ["Folk","Class","Attributes","Skills","Gear & Vitals","Background"];
  const [step,setStep] = useState(0);
  const [folk,setFolk] = useState("");
  const [charClass,setCharClass] = useState("");
  const [chosenFolkAttr,setChosenFolkAttr] = useState("");
  const [creationSpend,setCreationSpend] = useState({});
  const [skillBonuses,setSkillBonuses] = useState([]);
  const [hovSkill,setHovSkill] = useState(null);
  const [bg,setBg] = useState({name:"",homeland:"",age:"",personality:"",quirk:"",bond:"",motivation:""});
  const [notes,setNotes] = useState("");

  // Derived skill bonus data
  const folkBonusSkills = (FOLK[folk]||{}).bonusSkills || [];
  const classBonusSkill = (CLASSES[charClass]||{}).bonusSkill || "";
  const lockedSkills = new Set([...folkBonusSkills, ...(classBonusSkill?[classBonusSkill]:[])]);
  const freeSkills = skillBonuses.filter(s => !lockedSkills.has(s));
  const maxFree = 1;

  // Keep folk/class bonus skills always pre-selected
  useEffect(()=>{
    const locked = [...((FOLK[folk]||{}).bonusSkills||[]),...((CLASSES[charClass]||{}).bonusSkill?[(CLASSES[charClass]||{}).bonusSkill]:[])];
    if(!locked.length) return;
    setSkillBonuses(cur=>{
      const lockedSet=new Set(locked);
      const free=cur.filter(s=>!lockedSet.has(s));
      return [...new Set([...locked,...free])];
    });
  },[folk,charClass]);

  const folkData = FOLK[folk]||{};
  const clData = CLASSES[charClass]||{};
  const coreAttr = clData.coreAttr||"";

  const baseAttrs = () => getBaseAttrs(coreAttr);
  const folkMods = () => {
    if (!folk||!folkData.mod) return {};
    if (folkData.anyAttr) return chosenFolkAttr?{[chosenFolkAttr]:1}:{};
    return folkData.mod||{};
  };
  const effectiveAttrs = () => {
    const base = baseAttrs(), mods = folkMods(), sp = creationSpend;
    const res = {};
    ATTRS.forEach(a => { res[a] = Math.max(1, Math.min(3, base[a]+(sp[a]||0)+(mods[a]||0))); });
    return res;
  };
  const totalSpent = () => Object.values(creationSpend).reduce((a,b) => a+Math.max(0,b), 0);

  const finalHP = () => calcMaxHP(charClass, effectiveAttrs(), 1);

  const greycoatReady = folk !== "Greycoat" || !!chosenFolkAttr;
  const canNext = (s) => {
    if (s===0) return !!folk && greycoatReady;
    if (s===1) return !!charClass;
    return true;
  };
  const canFinish = bg.name.trim() && folk && charClass && greycoatReady;

  const finish = () => {
    const ea = effectiveAttrs();
    const hp = finalHP();
    const clGear = clData.gear || [];
    const folkGearItems = (folkData.gear||"").split(",").map(s=>s.trim()).filter(Boolean);
    const allStartGear = [...clGear,...folkGearItems].slice(0,10);
    let startAcorns = 0;
    const filteredStartGear = allStartGear.filter(item=>{
      const m=item.match(/^(\d+)\s+Acorns?$/i);
      if(m){startAcorns+=parseInt(m[1]);return false;}
      return true;
    });
    const paddedGear = [...filteredStartGear];
    const equippedGear = filteredStartGear.map(()=>true);
    onSave({
      id:uid(), name:bg.name||"Hero", folk, charClass, chosenFolkAttr,
      attrs:ea, skillBonuses,
      hpMax:hp, hpCurrent:hp, level:1, expNuts:0,
      apMax:2, apCurrent:2, downCount:0, conditions:[],
      weapons:["","",""], gear:paddedGear, equippedGear, acorns:startAcorns,
      prestigeSkill:"", legendaryTitle:"", notes,
      background:bg,
    });
  };

  return <div style={{maxWidth:800,margin:"0 auto",padding:"2rem 1.5rem"}}>
    {/* Progress */}
    <div style={{display:"flex",gap:"0.25rem",marginBottom:"2rem"}}>
      {STEPS.map((s,i)=><div key={i} style={{flex:1,cursor:i<step?"pointer":"default"}} onClick={()=>i<step&&setStep(i)}>
        <div style={{height:3,borderRadius:2,background:i<step?"var(--gold)":i===step?"var(--accent2)":"var(--border)"}}/>
        <div style={{...FD,fontSize:"0.51rem",letterSpacing:"0.1em",color:i<=step?"var(--green2)":"var(--muted)",marginTop:3,textAlign:"center"}}>{s.toUpperCase()}</div>
      </div>)}
    </div>

    {/* Step 0 — Folk */}
    {step===0&&<div className="fadeIn">
      <h2 style={{...FD,color:"var(--orange)",marginBottom:"0.4rem"}}>Choose Your Folk</h2>
      <p style={{color:"var(--text2)",fontStyle:"italic",marginBottom:"1.25rem"}}>Your heritage shapes your homeland, stat modifiers, and folk abilities.</p>
      <div style={{display:"grid",gap:"0.65rem"}}>
        {Object.entries(FOLK).map(([name,f])=><div key={name} onClick={()=>setFolk(name)} style={{background:folk===name?"#F0FDF4":"white",border:`3px solid ${folk===name?"var(--green)":"var(--border)"}`,borderRadius:8,padding:"1.1rem",cursor:"pointer",transition:"all 0.15s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.6rem"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:3}}>
                <span style={{fontSize:"1.2rem"}}>{f.emoji}</span>
                <span style={{...FD,fontSize:"0.88rem",color:folk===name?"var(--gold2)":"var(--text)"}}>{name}</span>
              </div>
              <div style={{color:"var(--muted)",fontSize:"0.83rem",fontStyle:"italic"}}>{f.tag}</div>
            </div>
            {folk===name&&<Check size={16} color="var(--accent2)"/>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",marginBottom:"0.6rem"}}>
            <div style={{background:"var(--bg2)",borderRadius:4,padding:"0.45rem"}}>
              <div style={{...FD,fontSize:"0.53rem",color:"var(--muted)",marginBottom:2}}>STAT MOD</div>
              <div style={{color:"var(--text)",fontSize:"0.8rem"}}>{f.anyAttr?"Choose any Attr +1":Object.entries(f.mod||{}).map(([k,v])=>`${AL[k]} ${v>0?"+":""}${v}`).join(", ")}</div>
            </div>
            <div style={{background:"var(--bg2)",borderRadius:4,padding:"0.45rem"}}>
              <div style={{...FD,fontSize:"0.53rem",color:"var(--muted)",marginBottom:2}}>BONUS DIE</div>
              <div style={{color:"var(--text)",fontSize:"0.78rem"}}>{f.bonus.slice(0,50)}{f.bonus.length>50?"…":""}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap"}}>{f.abilities.map(a=><Tag key={a.name}>{a.name}</Tag>)}</div>
        </div>)}
      </div>
      {folk==="Greycoat"&&<div style={{marginTop:"0.85rem",...cardStyle()}}>
        <div style={{...FD,fontSize:"0.68rem",color:"var(--gold)",marginBottom:"0.5rem"}}>CHOOSE YOUR +1 ATTRIBUTE</div>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {ATTRS.map(a=><button key={a} onClick={()=>setChosenFolkAttr(a)} style={{padding:"0.28rem 0.75rem",borderRadius:3,cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.68rem",border:`1px solid ${chosenFolkAttr===a?"var(--accent2)":"var(--border)"}`,background:chosenFolkAttr===a?"var(--accent)":"transparent",color:chosenFolkAttr===a?"white":"var(--text2)"}}>{AL[a]}</button>)}
        </div>
      </div>}
    </div>}

    {/* Step 1 — Class */}
    {step===1&&<div className="fadeIn">
      <h2 style={{...FD,color:"var(--orange)",marginBottom:"0.4rem"}}>Choose Your Class</h2>
      <p style={{color:"var(--text2)",fontStyle:"italic",marginBottom:"1.25rem"}}>Your role in the world — your combat approach and abilities you unlock as you level.</p>
      <div style={{display:"grid",gap:"0.65rem"}}>
        {Object.entries(CLASSES).map(([name,cl])=><div key={name} onClick={()=>setCharClass(name)} style={{background:charClass===name?"#F0FDF4":"white",border:`3px solid ${charClass===name?"var(--green)":"var(--border)"}`,borderRadius:8,padding:"1.1rem",cursor:"pointer",transition:"all 0.15s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.6rem"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:3}}>
                <span style={{fontSize:"1.2rem"}}>{cl.icon}</span>
                <span style={{...FD,fontSize:"0.88rem",color:charClass===name?"var(--gold2)":"var(--text)"}}>{name}</span>
              </div>
              <div style={{color:"var(--muted)",fontSize:"0.83rem",fontStyle:"italic"}}>{cl.tag}</div>
            </div>
            {charClass===name&&<Check size={16} color="var(--accent2)"/>}
          </div>
          <p style={{color:"var(--text2)",fontSize:"0.86rem",lineHeight:1.6,marginBottom:"0.6rem"}}>{cl.role}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.4rem",marginBottom:"0.6rem"}}>
            {[["Core Attr",AL[cl.coreAttr]],["Start HP",`${cl.hpBase}+${AL[cl.coreAttr].slice(0,3)}`],["Per Lvl",`+${cl.hpPerLevel} HP`]].map(([k,v])=><div key={k} style={{background:"var(--bg2)",borderRadius:4,padding:"0.45rem",textAlign:"center"}}>
              <div style={{...FD,fontSize:"0.52rem",color:"var(--muted)",marginBottom:2}}>{k}</div>
              <div style={{...FD,color:"var(--gold)",fontSize:"0.78rem"}}>{v}</div>
            </div>)}
          </div>
          <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap"}}>{cl.abilities.map((a,i)=><span key={a.name} style={{...FD,fontSize:"0.68rem",color:i===0?"var(--gold)":"var(--text2)"}}>Lvl{a.level}: {a.name}</span>)}</div>
        </div>)}
      </div>
    </div>}

    {/* Step 2 — Attributes */}
    {step===2&&<div className="fadeIn">
      <h2 style={{...FD,color:"var(--orange)",marginBottom:"0.4rem"}}>Set Your Attributes</h2>
      <p style={{color:"var(--text2)",fontStyle:"italic",marginBottom:"0.5rem"}}><strong style={{color:"var(--gold)"}}>Core Attribute ({AL[coreAttr]||"—"})</strong> starts at 2, all others at 1. Spend <strong style={{color:"var(--orange)"}}>2 extra points</strong> anywhere (no attribute above 2 before folk modifier). Folk modifier applied last, can push to 3.</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",...cardStyle(),marginBottom:"1rem",padding:"0.6rem 1rem"}}>
        <span style={{color:"var(--text2)",fontSize:"0.9rem"}}>Points remaining:</span>
        <span style={{...FD,fontSize:"1.2rem",color:totalSpent()>=2?"var(--muted)":"var(--gold2)"}}>{2-totalSpent()} / 2</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.65rem"}}>
        {ATTRS.map(a=>{
          const base=baseAttrs(),mods=folkMods(),sp=creationSpend[a]||0;
          const eff=Math.max(1,Math.min(3,base[a]+sp+(mods[a]||0)));
          const isCore=a===coreAttr,fm=mods[a]||0;
          return <div key={a} style={{background:isCore?"#F0FDF4":"white",border:`2px solid ${isCore?"var(--green)":"var(--border)"}`,borderRadius:6,padding:"0.85rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                <span style={{...FD,fontSize:"0.74rem",color:isCore?"var(--gold)":"var(--text)"}}>{AL[a]}</span>
                {isCore&&<Tag bg="var(--gold)">CORE</Tag>}
              </div>
              <span style={{...FD,fontSize:"1.4rem",color:"var(--orange)"}}>{eff}</span>
            </div>
            <div style={{fontSize:"0.74rem",color:"var(--muted)",marginBottom:"0.4rem"}}>{AD[a]}</div>
            <Pips value={eff} max={3}/>
            <div style={{display:"flex",gap:"0.4rem",alignItems:"center",marginTop:"0.5rem"}}>
              <button onClick={()=>setCreationSpend(s=>({...s,[a]:Math.max(0,(s[a]||0)-1)}))} disabled={(creationSpend[a]||0)<=0}
                style={{width:24,height:24,borderRadius:3,border:"2px solid var(--border2)",background:"transparent",color:"var(--text2)",cursor:"pointer",opacity:(creationSpend[a]||0)<=0?0.3:1,fontSize:"1rem"}}>−</button>
              <span style={{color:"var(--text2)",fontSize:"0.75rem",flex:1,textAlign:"center"}}>+{creationSpend[a]||0} spent{fm!==0?` / ${fm>0?"+":""}${fm} folk`:""}</span>
              <button onClick={()=>{if(totalSpent()>=2||base[a]+(creationSpend[a]||0)>=2)return;setCreationSpend(s=>({...s,[a]:(s[a]||0)+1}));}}
                disabled={totalSpent()>=2||base[a]+(creationSpend[a]||0)>=2}
                style={{width:24,height:24,borderRadius:3,border:"2px solid var(--border2)",background:"transparent",color:"var(--text2)",cursor:"pointer",opacity:totalSpent()>=2||base[a]+(creationSpend[a]||0)>=2?0.3:1,fontSize:"1rem"}}>+</button>
            </div>
          </div>;
        })}
      </div>
      <div style={{marginTop:"0.75rem",...cardStyle(),padding:"0.6rem 1rem"}}>
        <span style={{...FD,fontSize:"0.6rem",color:"var(--muted)"}}>FINAL ARRAY: </span>
        {ATTRS.map(a=>{const ea=effectiveAttrs();return <span key={a} style={{...FD,fontSize:"0.82rem",color:"var(--gold)",marginRight:12}}>{AL[a]} {ea[a]}</span>;})}
      </div>
    </div>}

    {/* Step 3 — Skills */}
    {step===3&&<div className="fadeIn">
      <h2 style={{...FD,color:"var(--orange)",marginBottom:"0.4rem"}}>Mark Your Skill Bonuses</h2>
      <p style={{color:"var(--text2)",fontStyle:"italic",marginBottom:"0.75rem"}}>
        Your folk and class grant automatic bonuses below. You also get <strong style={{color:"var(--gold)"}}>1 free training pick</strong> — any skill you've practised.
        {folk&&folkData.bonus&&<span style={{color:"var(--green2)"}}> {folk}: {folkData.bonus}.</span>}
      </p>
      {/* Legend */}
      <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",alignItems:"center",marginBottom:"1rem",fontSize:"0.78rem"}}>
        <span style={{background:"var(--green)",color:"white",borderRadius:3,padding:"0.15rem 0.55rem",fontWeight:700}}>folk bonus</span>
        <span style={{background:"var(--purple)",color:"white",borderRadius:3,padding:"0.15rem 0.55rem",fontWeight:700}}>class bonus</span>
        <span style={{background:"var(--gold)",color:"white",borderRadius:3,padding:"0.15rem 0.55rem",fontWeight:700}}>★ your pick</span>
        <span style={{color:"var(--muted)",fontStyle:"italic"}}>hover a skill to see when you'd roll it</span>
      </div>
      {ATTRS.map(attr=><div key={attr} style={{marginBottom:"0.85rem"}}>
        <div style={{...FD,fontSize:"0.68rem",color:"var(--green)",letterSpacing:"0.1em",marginBottom:"0.35rem",paddingBottom:"0.25rem",borderBottom:"1px solid var(--border)"}}>{AL[attr].toUpperCase()} SKILLS</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
          {ALL_SKILLS[attr].map(sk=>{
            const isFolk = folkBonusSkills.includes(sk);
            const isClass = classBonusSkill === sk && !isFolk;
            const isLocked = isFolk || isClass;
            const isSelected = skillBonuses.includes(sk);
            const isFree = isSelected && !isLocked;
            const isUnavailable = !isSelected && !isLocked && freeSkills.length >= maxFree;
            let bg,col,border,cursor;
            if(isFolk){bg="var(--green)";col="white";border="2px solid var(--green2)";cursor="default";}
            else if(isClass){bg="var(--purple)";col="white";border="2px solid var(--purple2)";cursor="default";}
            else if(isFree){bg="var(--gold)";col="white";border="2px solid var(--orange2)";cursor="pointer";}
            else if(isUnavailable){bg="var(--surface2)";col="var(--muted)";border="1px solid var(--border)";cursor="not-allowed";}
            else{bg="var(--surface)";col="var(--text2)";border="1px solid var(--border)";cursor="pointer";}
            const label = isFolk?"folk · "+sk : isClass?"class · "+sk : isFree?"★ "+sk : sk;
            return <button key={sk}
              onClick={()=>{
                if(isLocked||isUnavailable) return;
                setSkillBonuses(cur=>isFree?cur.filter(s=>s!==sk):[...cur,sk]);
              }}
              onMouseEnter={()=>setHovSkill(sk)}
              onMouseLeave={()=>setHovSkill(null)}
              style={{padding:"0.28rem 0.7rem",borderRadius:4,fontSize:"0.83rem",fontFamily:"'Nunito',sans-serif",fontWeight:700,
                background:bg,border,color:col,cursor,transition:"all 0.12s",
                opacity:isUnavailable?0.45:1,userSelect:"none"}}>
              {label}
            </button>;
          })}
        </div>
      </div>)}
      {/* Hover tooltip */}
      <div style={{minHeight:"3rem",marginTop:"0.25rem"}}>
        {hovSkill&&SKILL_EXAMPLES[hovSkill]
          ?<div style={{...cardStyle("var(--gold)"),padding:"0.55rem 0.9rem",fontSize:"0.84rem",color:"var(--text2)",display:"flex",gap:"0.5rem",alignItems:"flex-start"}}>
            <span style={{...FD,fontSize:"0.58rem",color:"var(--gold)",letterSpacing:"0.08em",whiteSpace:"nowrap",marginTop:2}}>EXAMPLE ROLL</span>
            <span>{SKILL_EXAMPLES[hovSkill]}</span>
          </div>
          :<div style={{...cardStyle(),padding:"0.55rem 0.9rem",fontSize:"0.83rem",color:"var(--muted)",fontStyle:"italic"}}>
            Hover a skill to see an example of when you'd roll for it.
          </div>}
      </div>
      {/* Status bar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"0.5rem",color:"var(--muted)",fontSize:"0.82rem",fontStyle:"italic"}}>
        <span>{skillBonuses.length} bonus{skillBonuses.length!==1?"es":""} total ({lockedSkills.size} automatic, {freeSkills.length}/{maxFree} free pick used)</span>
      </div>
    </div>}

    {/* Step 4 — Gear & Vitals */}
    {step===4&&<div className="fadeIn">
      <h2 style={{...FD,color:"var(--orange)",marginBottom:"0.4rem"}}>Vitals & Starting Gear</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.6rem",marginBottom:"1.25rem"}}>
        {[["Hit Points",finalHP(),`${clData.hpBase||"?"}+${AL[coreAttr]||"attr"}`],["Acorn Points","2","per session"],["Experience Nuts","0","earn during play"]].map(([l,v,s])=><div key={l} style={{background:"var(--bg2)",border:"2px solid var(--border2)",borderRadius:6,padding:"0.9rem",textAlign:"center"}}>
          <div style={{...FD,fontSize:"0.58rem",color:"var(--muted)",marginBottom:3}}>{l.toUpperCase()}</div>
          <div style={{...FD,fontSize:"2rem",color:"var(--orange)"}}>{v}</div>
          <div style={{color:"var(--muted)",fontSize:"0.78rem"}}>{s}</div>
        </div>)}
      </div>
      {clData.gear&&<><div style={{...FD,fontSize:"0.68rem",color:"var(--green)",letterSpacing:"0.1em",marginBottom:"0.6rem"}}>STARTING EQUIPMENT — {charClass}</div>
        <div style={{display:"grid",gap:"0.35rem"}}>{clData.gear.map((item,i)=><div key={i} style={{...cardStyle(),padding:"0.55rem 0.9rem",borderLeft:"3px solid var(--green)",fontSize:"0.88rem",color:"var(--text)"}}>{item}</div>)}</div></>}
    </div>}

    {/* Step 5 — Background */}
    {step===5&&<div className="fadeIn">
      <h2 style={{...FD,color:"var(--orange)",marginBottom:"0.4rem"}}>Write Your Background</h2>
      <p style={{color:"var(--text2)",fontStyle:"italic",marginBottom:"1.25rem"}}>Short answers are fine. Your character's story grows through play.</p>
      <div style={{display:"grid",gap:"0.85rem"}}>
        {[["name","Character Name","What do people call you?"],["homeland","Homeland","Where do you come from?"],["age","Age / Season","Young, adult, elder?"],["personality","Personality","Two or three words describing how you act."],["quirk","Quirk","One small, specific habit or oddity."],["bond","Bond","One person, place, or thing you'd protect at any cost."],["motivation","Motivation","Why are you out here? What do you need?"]].map(([key,label,ph])=><div key={key}>
          <label style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--text2)",display:"block",marginBottom:"0.3rem"}}>{label.toUpperCase()}</label>
          <input value={bg[key]||""} onChange={e=>setBg(b=>({...b,[key]:e.target.value}))} placeholder={ph}/>
        </div>)}
        <div>
          <label style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--text2)",display:"block",marginBottom:"0.3rem"}}>NOTES</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Anything else about your character..." style={{resize:"vertical"}}/>
        </div>
      </div>
    </div>}

    {/* Nav */}
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"2rem",paddingTop:"1.25rem",borderTop:"1px solid var(--border)"}}>
      <Btn v="ghost" onClick={()=>step===0?onCancel():setStep(s=>s-1)}>{step===0?"Cancel":"← Back"}</Btn>
      <div style={{display:"flex",gap:"0.5rem"}}>
        {step<STEPS.length-1
          ?<Btn onClick={()=>setStep(s=>s+1)} disabled={!canNext(step)}>Next →</Btn>
          :<Btn v="gold" onClick={finish} disabled={!canFinish}>Create Character ✓</Btn>}
      </div>
    </div>
  </div>;
}

/* ─── LEVEL UP MODAL ─────────────────────────────────────────────────────── */
function LevelUpModal({char,onConfirm,onClose}){
  const newLv = char.level+1;
  const lvData = LEVEL_TABLE.find(r=>r.level===newLv);
  const cl = CLASSES[char.charClass]||{};
  const [attrChoice,setAttrChoice] = useState(null);
  const [prestige,setPrestige] = useState("");

  const needsAttr = lvData?.gains.some(g=>g.includes("Raise any one Attribute"));
  const needsPrestige = newLv===8;
  const canOk = (!needsAttr||attrChoice)&&(!needsPrestige||prestige);

  const prestigeOpts = Object.entries(CLASSES).filter(([n])=>n!==char.charClass).flatMap(([cn,c])=>c.abilities.map(a=>({...a,class:cn})));

  const abilIdx = {2:1,4:2,6:3}[newLv];
  const newAbil = abilIdx!==undefined ? cl.abilities?.[abilIdx] : null;

  return <Modal title={`Level Up → Level ${newLv}`} onClose={onClose}>
    <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1rem",padding:"0.75rem",background:"rgba(200,150,58,0.08)",borderRadius:6}}>
      <div style={{...FD,fontSize:"3rem",color:"var(--orange)",lineHeight:1}}>{newLv}</div>
      <div>
        <div style={{...FD,fontSize:"0.82rem",color:"var(--text)"}}>Level {newLv} Reached</div>
        <div style={{color:"var(--text2)",fontSize:"0.87rem"}}>HP {char.hpMax} → {char.hpMax+cl.hpPerLevel} · AP max {getAPMax(char.level)} → {getAPMax(newLv)}</div>
      </div>
    </div>
    <div style={{...FD,fontSize:"0.62rem",color:"var(--muted)",marginBottom:"0.4rem"}}>YOU GAIN</div>
    {lvData?.gains.map((g,i)=><div key={i} style={{display:"flex",gap:7,padding:"0.35rem 0",borderBottom:"1px solid var(--border)",alignItems:"flex-start"}}>
      <Star size={11} color="var(--gold)" style={{marginTop:3,flexShrink:0}}/>
      <span style={{color:"var(--text2)",fontSize:"0.88rem"}}>{g}</span>
    </div>)}
    {newAbil&&<div style={{background:"rgba(200,150,58,0.08)",border:"1px solid rgba(200,150,58,0.3)",borderRadius:6,padding:"0.85rem",margin:"0.85rem 0 0"}}>
      <div style={{...FD,fontSize:"0.6rem",color:"var(--gold)",marginBottom:5}}>NEW CLASS ABILITY UNLOCKED</div>
      <div style={{...FD,fontSize:"0.82rem",color:"var(--text)",marginBottom:3}}>{newAbil.name}</div>
      <div style={{color:"var(--text2)",fontSize:"0.86rem",lineHeight:1.5}}>{newAbil.desc}</div>
    </div>}
    {needsAttr&&<div style={{marginTop:"0.85rem"}}>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",marginBottom:"0.4rem"}}>CHOOSE AN ATTRIBUTE TO RAISE (+1, MAX 3)</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
        {ATTRS.map(a=>{const cur=char.attrs[a]||1,atMax=cur>=3;
          return <button key={a} onClick={()=>!atMax&&setAttrChoice(a)} style={{padding:"0.35rem 0.85rem",borderRadius:4,cursor:atMax?"default":"pointer",border:`1px solid ${attrChoice===a?"var(--accent2)":"var(--border)"}`,background:attrChoice===a?"var(--accent)":atMax?"var(--bg2)":"var(--surface)",color:atMax?"var(--muted)":attrChoice===a?"white":"var(--text2)",fontFamily:"'Fredoka One',cursive",fontSize:"0.68rem",opacity:atMax?0.5:1}}>
            {AL[a]} {cur}→{Math.min(3,cur+1)}{atMax?" (max)":""}
          </button>;})}
      </div>
    </div>}
    {needsPrestige&&<div style={{marginTop:"0.85rem"}}>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",marginBottom:"0.4rem"}}>CHOOSE A PRESTIGE SKILL (ONCE/SESSION)</div>
      <select value={prestige} onChange={e=>setPrestige(e.target.value)}>
        <option value="">-- Select an ability from another class --</option>
        {prestigeOpts.map(o=><option key={o.name} value={o.name}>[{o.class}] {o.name}</option>)}
      </select>
      {prestige&&<div style={{marginTop:"0.4rem",color:"var(--text2)",fontSize:"0.83rem",fontStyle:"italic"}}>{prestigeOpts.find(o=>o.name===prestige)?.desc}</div>}
    </div>}
    {newLv===10&&<div style={{background:"rgba(200,150,58,0.1)",border:"1px solid var(--gold)",borderRadius:6,padding:"0.85rem",marginTop:"0.85rem"}}>
      <div style={{...FD,fontSize:"0.6rem",color:"var(--gold)",marginBottom:4}}>★ LEGENDARY TITLE & CAPSTONE UNLOCKED</div>
      <div style={{...FD,fontSize:"0.95rem",color:"var(--orange)",marginBottom:4}}>{cl.legendaryTitle}</div>
      <div style={{color:"var(--text2)",fontSize:"0.88rem",lineHeight:1.5}}>{cl.capstone}</div>
    </div>}
    <div style={{display:"flex",gap:"0.5rem",justifyContent:"flex-end",marginTop:"1.25rem"}}>
      <Btn v="ghost" onClick={onClose}>Cancel</Btn>
      <Btn v="gold" onClick={()=>onConfirm(attrChoice,prestige)} disabled={!canOk}>Confirm Level Up ✓</Btn>
    </div>
  </Modal>;
}

/* ─── CHARACTER SHEET ────────────────────────────────────────────────────── */
function Sheet({char,onUpdate,onBack}){
  const isMobile = useMobile();
  const [showLU,setShowLU] = useState(false);
  const [bgEdit,setBgEdit] = useState(false);
  const [bgDraft,setBgDraft] = useState(null);
  const [tooltip,setTooltip] = useState(null);
  const [notesOpen,setNotesOpen] = useState(!isMobile);
  const [diceRoll,setDiceRoll] = useState(null); // {attr, dice, results, bonus}
  const [itemPickerOpen,setItemPickerOpen] = useState(false);
  const [itemSearch,setItemSearch] = useState("");
  const [itemCat,setItemCat] = useState("all");
  const cl = CLASSES[char.charClass]||{};
  const folk = FOLK[char.folk]||{};
  const apMax = getAPMax(char.level);
  const canLU = char.level<10 && char.expNuts>=nextEN(char.level);
  const upd = (k,v) => onUpdate({...char,[k]:v});
  const unlocked = abilsUnlocked(char.level);

  const filteredItems = useMemo(()=>ITEMS.filter(it=>{
    if(itemCat!=="all"&&it.category!==itemCat) return false;
    if(!itemSearch) return true;
    const q=itemSearch.toLowerCase();
    return it.name.toLowerCase().includes(q)||it.desc.toLowerCase().includes(q)||(it.tags||[]).some(t=>t.includes(q));
  }),[itemCat,itemSearch]);

  const addItemFromPicker = (item) => {
    const entry = item.desc ? `${item.name} — ${item.desc}` : item.name;
    onUpdate({...char,gear:[...(char.gear||[]),entry],equippedGear:[...(char.equippedGear||[]),false]});
    setItemPickerOpen(false);
    setItemSearch("");
    setItemCat("all");
  };

  const rollAttr = (a) => {
    const v = char.attrs[a]||1;
    const bonusSkills = (char.skillBonuses||[]).filter(sk=>(ALL_SKILLS[a]||[]).includes(sk));
    const numDice = v + bonusSkills.length;
    const results = Array.from({length:numDice},()=>Math.ceil(Math.random()*6));
    setDiceRoll({attr:a, dice:numDice, results, bonus:bonusSkills});
    setTooltip(null);
  };
  const enPct = char.level<10 ? Math.min(100,(char.expNuts/nextEN(char.level))*100) : 100;

  const handleLU = (attrChoice,prestige) => {
    onUpdate(applyLevelUp(char, attrChoice, prestige));
    setShowLU(false);
  };

  return <div className="print-sheet" style={{maxWidth:920,margin:"0 auto",padding:isMobile?"0.75rem 0.6rem 4rem":"1.5rem 1.5rem 5rem"}}>
    {showLU&&<LevelUpModal char={char} onConfirm={handleLU} onClose={()=>setShowLU(false)}/>}
    {bgEdit&&bgDraft&&<Modal title="✎ Edit Background" onClose={()=>setBgEdit(false)}>
      <div style={{display:"grid",gap:"0.75rem"}}>
        {[["name","Character Name","What do people call you?"],["homeland","Homeland","Where do you come from?"],["age","Age / Season","Young, adult, elder?"],["personality","Personality","Two or three words."],["quirk","Quirk","One small habit or oddity."],["bond","Bond","Who or what would you protect at any cost?"],["motivation","Motivation","Why are you out here?"]].map(([key,label,ph])=><div key={key}>
          <label style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--text2)",display:"block",marginBottom:"0.3rem"}}>{label.toUpperCase()}</label>
          <input value={bgDraft[key]||""} onChange={e=>setBgDraft(d=>({...d,[key]:e.target.value}))} placeholder={ph}/>
        </div>)}
        <div style={{display:"flex",gap:"0.5rem",justifyContent:"flex-end",marginTop:"0.25rem"}}>
          <Btn v="ghost" onClick={()=>setBgEdit(false)}>Cancel</Btn>
          <Btn v="primary" onClick={()=>{onUpdate({...char,background:bgDraft,name:bgDraft.name||char.name});setBgEdit(false);}}>Save Changes ✓</Btn>
        </div>
      </div>
    </Modal>}

    {/* Dice roll result panel */}
    {diceRoll&&<div className="no-print" onClick={()=>setDiceRoll(null)} style={{position:"fixed",bottom:"1.5rem",left:"1.5rem",zIndex:300,
      background:"white",border:"2px solid var(--gold)",borderRadius:14,
      padding:"0.9rem 1.1rem",maxWidth:320,boxShadow:"0 8px 32px rgba(0,0,0,0.2)",cursor:"pointer",minWidth:220}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"}}>
        <div style={{...FD,fontSize:"0.65rem",color:"var(--gold)",letterSpacing:"0.1em"}}>{AL[diceRoll.attr].toUpperCase()} — {diceRoll.dice}d6</div>
        <div style={{fontSize:"0.58rem",color:"var(--muted)"}}>click to dismiss</div>
      </div>
      {/* Dice faces */}
      <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginBottom:"0.6rem"}}>
        {diceRoll.results.map((r,i)=>{
          const isMax=r===6,isHigh=r>=5;
          return <div key={i} style={{
            width:36,height:36,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
            background:isMax?"var(--gold)":isHigh?"#FEF9C3":"var(--bg2)",
            border:`2px solid ${isMax?"var(--gold2)":isHigh?"#F59E0B":"var(--border)"}`,
            color:isMax?"white":isHigh?"#92400E":"var(--text)",
            fontFamily:"'Fredoka One',cursive",fontSize:"1.2rem",fontWeight:700,
            boxShadow:isMax?"0 2px 8px rgba(245,158,11,0.4)":"none",
            transition:"all 0.15s",
          }}>{r}</div>;
        })}
      </div>
      {/* Outcome summary */}
      {(()=>{
        const best=Math.max(...diceRoll.results);
        const sixes=diceRoll.results.filter(r=>r===6).length;
        const outcome=best>=6?"FULL SUCCESS ✦":best>=4?"PARTIAL SUCCESS":"FAILURE";
        const outcomeColor=best>=6?"var(--green)":best>=4?"var(--gold)":"var(--red2)";
        return <div>
          <div style={{...FD,fontSize:"1rem",color:outcomeColor,marginBottom:"0.2rem"}}>{outcome}</div>
          <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>
            Highest: {best}{sixes>1?` · ${sixes}× Critical!`:""}{diceRoll.bonus.length>0?` · Bonus: ${diceRoll.bonus.join(", ")}` :""}
          </div>
        </div>;
      })()}
      {/* Re-roll button */}
      <button onClick={e=>{e.stopPropagation();rollAttr(diceRoll.attr);}} style={{
        marginTop:"0.55rem",width:"100%",padding:"0.3rem",borderRadius:6,
        border:"2px solid var(--border)",background:"var(--bg2)",
        color:"var(--text2)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",
        fontSize:"0.72rem",letterSpacing:"0.06em",
      }}>↻ ROLL AGAIN</button>
    </div>}

    {/* Item picker modal */}
    {itemPickerOpen&&<Modal title="📦 Add to Inventory" onClose={()=>{setItemPickerOpen(false);setItemSearch("");setItemCat("all");}}>
      <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
        <input autoFocus value={itemSearch} onChange={e=>setItemSearch(e.target.value)} placeholder="Search items, tags, or keywords…"/>
        <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
          {ITEM_CATEGORIES.map(c=><button key={c.key} onClick={()=>setItemCat(c.key)}
            style={{padding:"0.22rem 0.65rem",borderRadius:20,border:`1.5px solid ${itemCat===c.key?"var(--gold)":"var(--border)"}`,background:itemCat===c.key?"var(--gold)":"transparent",color:itemCat===c.key?"white":"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.62rem",letterSpacing:"0.05em",transition:"all 0.15s"}}>
            {c.label}
          </button>)}
        </div>
        {/* Custom entry */}
        <div style={{display:"flex",gap:"0.4rem",alignItems:"center",padding:"0.45rem 0.6rem",border:"1px dashed var(--border2)",borderRadius:8,background:"var(--bg2)"}}>
          <input value={itemSearch} onChange={e=>setItemSearch(e.target.value)} placeholder="Or type a custom item name…" style={{flex:1,border:"none",background:"transparent",padding:0,fontSize:"0.86rem"}}/>
          <button onClick={()=>{if(itemSearch.trim()){addItemFromPicker({name:itemSearch.trim(),desc:""});}}}
            style={{padding:"0.22rem 0.7rem",borderRadius:5,border:"1.5px solid var(--green)",background:"var(--green)",color:"white",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.62rem",whiteSpace:"nowrap"}}>
            + Add Custom
          </button>
        </div>
        {/* Items list */}
        <div style={{maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:"0.3rem",paddingRight:"0.2rem"}}>
          {filteredItems.length===0&&<div style={{color:"var(--muted)",fontSize:"0.83rem",fontStyle:"italic",padding:"0.5rem 0"}}>No items match your search.</div>}
          {filteredItems.map(item=>{
            const catColor={weapon:"var(--orange)",armor:"var(--teal)",gear:"var(--green)",consumable:"var(--purple)",magical:"var(--gold)"}[item.category]||"var(--muted)";
            return <div key={item.name} onClick={()=>addItemFromPicker(item)}
              style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",padding:"0.45rem 0.6rem",borderRadius:7,border:"1.5px solid var(--border)",background:"white",cursor:"pointer",transition:"all 0.12s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=catColor;e.currentTarget.style.background="var(--bg2)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="white";}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{...FD,fontSize:"0.78rem",color:"var(--text)",marginBottom:"0.1rem"}}>{item.name}</div>
                <div style={{fontSize:"0.72rem",color:"var(--muted)",lineHeight:1.4}}>{item.desc}</div>
              </div>
              <div style={{...FD,fontSize:"0.55rem",color:catColor,whiteSpace:"nowrap",marginTop:2,textTransform:"uppercase",letterSpacing:"0.06em"}}>{item.category}</div>
            </div>;
          })}
        </div>
      </div>
    </Modal>}

    {/* Fixed tooltip — all hovers land here */}
    {tooltip&&<div className="no-print" style={{position:"fixed",bottom:"1.5rem",right:"1.5rem",zIndex:300,
      background:"white",border:"2px solid var(--gold)",borderRadius:12,
      padding:"0.75rem 1rem",maxWidth:300,boxShadow:"0 8px 24px rgba(0,0,0,0.18)",pointerEvents:"none"}}>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",letterSpacing:"0.08em",marginBottom:"0.35rem"}}>{tooltip.title}</div>
      {(tooltip.lines||[]).map((l,i)=><div key={i} style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.5,padding:"0.05rem 0"}}>{l}</div>)}
    </div>}

    {/* Header */}
    <div style={{display:"flex",alignItems:"flex-start",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
      <button className="no-print" onClick={onBack} style={{background:"none",border:"none",color:"var(--text2)",cursor:"pointer",padding:"0.2rem",marginTop:5}}><ChevronRight size={17} style={{transform:"rotate(180deg)"}}/></button>
      <div style={{flex:1}}>
        <h1 style={{...FD,fontSize:"clamp(1.3rem,3vw,1.75rem)",color:"var(--orange)",marginBottom:"0.3rem"}}>{char.background?.name||char.name||"Unnamed Hero"}</h1>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          <Tag>{folk.emoji} {char.folk}</Tag><Tag>{cl.icon} {char.charClass}</Tag>
          <Tag>Level {char.level}</Tag>
          {char.background?.homeland&&<Tag>📍 {char.background.homeland}</Tag>}
          {char.legendaryTitle&&<Tag bg="var(--gold)">★ {char.legendaryTitle}</Tag>}
        </div>
      </div>
      <div className="no-print" style={{display:"flex",gap:"0.5rem"}}>
        {canLU&&<Btn v="gold" onClick={()=>setShowLU(true)}>★ Level Up!</Btn>}
        <Btn v="ghost" onClick={()=>window.print()}>🖨️ Print</Btn>
      </div>
    </div>

    {/* EN bar */}
    <div style={{...cardStyle("var(--orange)"),padding:"0.65rem 1rem",marginBottom:"1.25rem"}}>
      <div style={{display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap"}}>
        <div>
          <span style={{...FD,fontSize:"0.58rem",color:"var(--muted)"}}>EXPERIENCE NUTS  </span>
          <span style={{...FD,fontSize:"1.05rem",color:"var(--orange)"}}>{char.expNuts}</span>
          {char.level<10&&<span style={{color:"var(--muted)",fontSize:"0.78rem"}}> / {nextEN(char.level)} for Lvl {char.level+1}</span>}
          {char.level>=10&&<span style={{color:"var(--gold)",fontSize:"0.78rem"}}> — Max Level Reached</span>}
        </div>
        <div style={{display:"flex",gap:3}}>
          <button onClick={()=>upd("expNuts",Math.max(0,char.expNuts-1))} style={{width:22,height:22,borderRadius:3,border:"2px solid var(--border)",background:"transparent",color:"var(--text2)",cursor:"pointer"}}>−</button>
          <button onClick={()=>upd("expNuts",char.expNuts+1)} style={{width:22,height:22,borderRadius:3,border:"2px solid var(--border)",background:"transparent",color:"var(--text2)",cursor:"pointer"}}>+</button>
        </div>
        {char.level<10&&<div style={{flex:1,minWidth:100,height:5,background:"var(--bg2)",borderRadius:3,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:3,background:"var(--gold)",width:`${enPct}%`,transition:"width 0.3s"}}/>
        </div>}
      </div>
    </div>

    {/* Vitals */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"0.65rem",marginBottom:"1.25rem"}}>
      {/* HP */}
      <div style={{...cardStyle()}}>
        <div style={{...FD,fontSize:"0.58rem",color:"var(--red2)",marginBottom:4}}>HIT POINTS</div>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem"}}>
          <span style={{...FD,fontSize:"2rem",color:"var(--red2)"}}>{char.hpCurrent}</span>
          <span style={{color:"var(--muted)",fontSize:"1.1rem"}}>/</span>
          <span style={{...FD,fontSize:"1.25rem",color:"var(--muted)"}}>{char.hpMax}</span>
        </div>
        <div style={{height:4,background:"var(--bg2)",borderRadius:2,marginBottom:"0.5rem",overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:2,background:`hsl(${Math.max(0,char.hpCurrent/char.hpMax*120)},60%,45%)`,width:`${Math.max(0,Math.min(100,char.hpCurrent/char.hpMax*100))}%`,transition:"width 0.3s"}}/>
        </div>
        <div style={{display:"flex",gap:3}}>
          <button onClick={()=>upd("hpCurrent",Math.max(0,char.hpCurrent-1))} style={{flex:1,padding:"0.2rem",borderRadius:3,border:"2px solid var(--border)",background:"transparent",color:"var(--text2)",cursor:"pointer"}}>−</button>
          <button onClick={()=>upd("hpCurrent",Math.min(char.hpMax,char.hpCurrent+1))} style={{flex:1,padding:"0.2rem",borderRadius:3,border:"2px solid var(--border)",background:"transparent",color:"var(--text2)",cursor:"pointer"}}>+</button>
          <button onClick={()=>upd("hpCurrent",char.hpMax)} style={{flex:1,padding:"0.2rem",borderRadius:3,border:"1px solid var(--accent)",background:"transparent",color:"var(--green)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.6rem"}}>FULL</button>
        </div>
      </div>
      {/* AP */}
      <div style={{...cardStyle()}}>
        <div style={{...FD,fontSize:"0.58rem",color:"var(--gold)",marginBottom:6}}>ACORN POINTS</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
          {Array.from({length:apMax},(_,i)=><div key={i} onClick={()=>upd("apCurrent",char.apCurrent===i+1?i:i+1)} style={{width:20,height:20,borderRadius:"50%",cursor:"pointer",border:`2px solid ${i<(char.apCurrent??apMax)?"var(--gold)":"var(--border2)"}`,background:i<(char.apCurrent??apMax)?"var(--gold)":"transparent",transition:"all 0.15s"}}/>)}
        </div>
        <button onClick={()=>upd("apCurrent",apMax)} style={{width:"100%",padding:"0.2rem",borderRadius:3,border:"2px solid var(--border)",background:"transparent",color:"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.6rem"}}>RESET ({apMax}/SESSION)</button>
      </div>
      {/* Downs */}
      <div style={{...cardStyle()}}>
        <div style={{...FD,fontSize:"0.58rem",color:"var(--red2)",marginBottom:6}}>DOWNS (3 = DEATH)</div>
        <div style={{display:"flex",gap:7,marginBottom:8}}>
          {[0,1,2].map(i=><div key={i} onClick={()=>upd("downCount",char.downCount>i?i:i+1)} style={{width:25,height:25,borderRadius:"50%",cursor:"pointer",border:`2px solid ${i<char.downCount?"var(--red2)":"var(--border2)"}`,background:i<char.downCount?"var(--red2)":"transparent",transition:"all 0.15s"}}/>)}
        </div>
        {char.downCount>0&&<button onClick={()=>upd("downCount",0)} style={{padding:"0.2rem 0.6rem",borderRadius:3,border:"2px solid var(--border)",background:"transparent",color:"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.6rem"}}>RESET</button>}
      </div>
    </div>

    {/* Attributes */}
    <div style={{marginBottom:"1.25rem"}}>
      <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.6rem"}}>
        ATTRIBUTES <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:600,fontSize:"0.58rem",opacity:0.6,letterSpacing:0}}>(click to roll · hover for skills)</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(3,1fr)":"repeat(6,1fr)",gap:"0.35rem"}}>
        {ATTRS.map(a=>{const v=char.attrs[a]||1,isCore=a===cl.coreAttr;
          const bonusCount=(char.skillBonuses||[]).filter(sk=>(ALL_SKILLS[a]||[]).includes(sk)).length;
          const totalDice=v+bonusCount;
          return <div key={a}
            onClick={()=>rollAttr(a)}
            onMouseEnter={()=>setTooltip({title:`${AL[a]} Skills`,lines:ALL_SKILLS[a]})}
            onMouseLeave={()=>setTooltip(null)}
            style={{background:isCore?"#F0FDF4":"white",border:`2px solid ${diceRoll?.attr===a?"var(--gold)":isCore?"var(--green)":"var(--border)"}`,borderRadius:5,padding:"0.55rem 0.25rem",textAlign:"center",cursor:"pointer",transition:"all 0.15s",userSelect:"none"}}
            onMouseDown={e=>e.currentTarget.style.transform="scale(0.94)"}
            onMouseUp={e=>e.currentTarget.style.transform=""}
            onMouseOut={e=>{e.currentTarget.style.transform="";setTooltip(null);}}>
            <div style={{...FD,fontSize:"0.52rem",color:isCore?"var(--gold)":"var(--muted)",marginBottom:3}}>{AL[a].slice(0,3).toUpperCase()}</div>
            <div style={{...FD,fontSize:"1.35rem",color:isCore?"var(--gold2)":"var(--text)",marginBottom:3}}>{v}</div>
            <Pips value={v} max={3}/>
            <div style={{fontSize:"0.6rem",color:bonusCount>0?"var(--gold)":"var(--muted)",marginTop:3,fontWeight:bonusCount>0?700:400}}>{totalDice}d6{bonusCount>0?` (+${bonusCount}★)`:""}</div>
          </div>;})}
      </div>
    </div>

    {/* Conditions */}
    <div style={{marginBottom:"1.25rem"}}>
      <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.5rem"}}>CONDITIONS</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem"}}>
        {CONDITIONS.map(c=>{const active=(char.conditions||[]).includes(c.name);
          return <button key={c.name} onClick={()=>{const cur=char.conditions||[];upd("conditions",active?cur.filter(x=>x!==c.name):[...cur,c.name]);}} style={{padding:"0.28rem 0.65rem",borderRadius:3,cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.58rem",letterSpacing:"0.08em",background:active?"#FEF2F2":"var(--bg2)",border:`1px solid ${active?"var(--red2)":"var(--border)"}`,color:active?"var(--red2)":"var(--muted)",transition:"all 0.15s"}}>
            {c.name.toUpperCase()}
          </button>;})}
      </div>
    </div>

    {/* Main content + collapsible Notes sidebar */}
    <div style={{display:"flex",flexDirection:isMobile?"column":"row",gap:"1rem",alignItems:"flex-start"}}>
      <div style={{flex:1,minWidth:0}}>

        {/* Two-col: Abilities | Weapons + Skill Bonuses */}
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"1rem",marginBottom:"1.25rem"}}>
          <div>
            <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.5rem"}}>{folk.emoji} FOLK ABILITIES</div>
            {(folk.abilities||[]).map(a=><div key={a.name} style={{...cardStyle(),padding:"0.6rem 0.75rem",borderLeft:"3px solid var(--green)",marginBottom:"0.4rem"}}>
              <div style={{...FD,fontSize:"0.65rem",color:"var(--green)",marginBottom:2}}>{a.name.toUpperCase()}</div>
              <div style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.45}}>{a.desc}</div>
            </div>)}
            <div style={{height:"0.85rem"}}/>
            <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.5rem"}}>{cl.icon} CLASS ABILITIES</div>
            {(cl.abilities||[]).map((a,i)=>{const u=unlocked.includes(i);
              return <div key={a.name} style={{...cardStyle(),padding:"0.6rem 0.75rem",borderLeft:`3px solid ${u?"var(--orange)":"var(--border)"}`,marginBottom:"0.4rem",opacity:u?1:0.5,background:u?"var(--surface)":"var(--bg2)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                  <span style={{...FD,fontSize:"0.65rem",color:u?"var(--gold)":"var(--muted)"}}>{a.name.toUpperCase()}</span>
                  <Tag>{u?"✓ UNLOCKED":`Lvl ${a.level}`}</Tag>
                </div>
                <div style={{color:u?"var(--text2)":"var(--muted)",fontSize:"0.82rem",lineHeight:1.45}}>{a.desc}</div>
              </div>;})}
            {char.level===10&&<div style={{background:"rgba(200,150,58,0.08)",border:"1px solid var(--gold)",borderRadius:6,padding:"0.6rem 0.75rem",marginBottom:"0.4rem"}}>
              <div style={{...FD,fontSize:"0.65rem",color:"var(--gold)",marginBottom:2}}>★ CAPSTONE — {cl.legendaryTitle}</div>
              <div style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.45}}>{cl.capstone}</div>
            </div>}
            {char.prestigeSkill&&<div style={{...cardStyle(),padding:"0.6rem 0.75rem",borderLeft:"3px solid var(--teal)",marginBottom:"0.4rem"}}>
              <div style={{...FD,fontSize:"0.65rem",color:"var(--green)",marginBottom:2}}>PRESTIGE — {char.prestigeSkill}</div>
              <div style={{color:"var(--muted)",fontSize:"0.76rem"}}>Once per session</div>
            </div>}
          </div>
          <div>
            <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.5rem"}}>WEAPONS</div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.35rem",marginBottom:"1rem"}}>
              {(char.weapons||["","",""]).map((w,i)=><input key={i} value={w} placeholder={["Primary — name / dmg / range","Secondary — name / dmg / range","Ranged / other — name / dmg / ammo"][i]} onChange={e=>{const ws=[...(char.weapons||["","",""])];ws[i]=e.target.value;upd("weapons",ws);}}/>)}
            </div>
            {(char.skillBonuses||[]).length>0&&<>
              <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.5rem"}}>★ SKILL BONUSES (+1d6)</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem"}}>
                {(char.skillBonuses||[]).map(sk=><Tag key={sk} bg="var(--gold)">★ {sk}</Tag>)}
              </div>
            </>}
          </div>
        </div>

        {/* Character details */}
        <div style={{marginBottom:"1.25rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.6rem"}}>
            <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)"}}>CHARACTER</div>
            <button className="no-print" onClick={()=>{setBgDraft({...(char.background||{})});setBgEdit(true);}} style={{background:"none",border:"1px solid var(--border2)",borderRadius:4,color:"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.6rem",padding:"0.15rem 0.55rem"}}>✎ Edit</button>
          </div>
          {[["Personality",char.background?.personality],["Quirk",char.background?.quirk],["Bond",char.background?.bond],["Motivation",char.background?.motivation]].some(([,v])=>v)
            ?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"0.5rem"}}>
              {[["Personality",char.background?.personality],["Quirk",char.background?.quirk],["Bond",char.background?.bond],["Motivation",char.background?.motivation]].filter(([,v])=>v).map(([k,v])=><div key={k} style={{...cardStyle(),padding:"0.55rem 0.75rem",borderLeft:"3px solid var(--border2)"}}>
                <div style={{...FD,fontSize:"0.58rem",color:"var(--muted)",marginBottom:2}}>{k.toUpperCase()}</div>
                <div style={{color:"var(--text2)",fontSize:"0.86rem"}}>{v}</div>
              </div>)}
            </div>
            :<div style={{color:"var(--muted)",fontSize:"0.83rem",fontStyle:"italic"}}>No background filled in yet — click ✎ Edit to add details.</div>}
        </div>

        {/* Gear & Inventory */}
        <div>
          <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",marginBottom:"0.35rem"}}>GEAR & INVENTORY</div>
          {(char.equippedGear||[]).some((e,i)=>e&&(char.gear||[])[i])&&<div style={{background:"#F0FDF4",border:"1px solid var(--green)",borderRadius:6,padding:"0.45rem 0.65rem",marginBottom:"0.4rem"}}>
            <div style={{...FD,fontSize:"0.55rem",color:"var(--green2)",marginBottom:"0.25rem"}}>EQUIPPED BONUSES</div>
            {(char.gear||[]).map((g,i)=>{
              if(!(char.equippedGear||[])[i]||!g) return null;
              const[name,...rest]=g.split(" — ");
              return <div key={i} style={{fontSize:"0.75rem",color:"var(--text2)",lineHeight:1.4,padding:"0.1rem 0"}}>
                <span style={{fontWeight:700}}>{name}</span>{rest.length>0&&<span style={{color:"var(--muted)"}}> — {rest.join(" — ")}</span>}
              </div>;
            })}
          </div>}
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"0.22rem 0.5rem",marginBottom:"0.5rem"}}>
            {(char.gear||[]).map((g,i)=>{
              const isEq=(char.equippedGear||[])[i];
              return <div key={i}
                onMouseEnter={()=>g&&setTooltip({title:g.split(" — ")[0]||g,lines:g.split(" — ").slice(1).filter(Boolean)})}
                onMouseLeave={()=>setTooltip(null)}
                style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
                <button onClick={()=>{const eq=[...(char.equippedGear||[])];while(eq.length<(char.gear||[]).length)eq.push(false);eq[i]=!eq[i];upd("equippedGear",eq);}}
                  title={isEq?"Unequip":"Equip"}
                  style={{flexShrink:0,width:18,height:18,borderRadius:3,border:`2px solid ${isEq?"var(--green)":"var(--border2)"}`,background:isEq?"var(--green)":"transparent",color:"white",cursor:"pointer",fontSize:"0.6rem",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                  {isEq?"✓":""}
                </button>
                <input value={g} placeholder={`Item ${i+1}`}
                  onChange={e=>{const gs=[...(char.gear||[])];gs[i]=e.target.value;upd("gear",gs);}}
                  style={{fontSize:"0.8rem",padding:"0.22rem 0.45rem",flex:1,background:isEq?"#F0FDF4":"var(--surface)",borderColor:isEq?"var(--green)":"var(--border)",borderWidth:"2px"}}/>
              </div>;
            })}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"0.75rem",flexWrap:"wrap"}}>
            <button onClick={()=>setItemPickerOpen(true)}
              style={{padding:"0.22rem 0.75rem",borderRadius:4,border:"1px dashed var(--border2)",background:"transparent",color:"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.68rem"}}>
              + Add Item
            </button>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginLeft:"auto"}}>
              <span style={{...FD,fontSize:"0.58rem",color:"var(--gold)",whiteSpace:"nowrap"}}>ACORNS:</span>
              <input type="number" value={char.acorns||0} min={0} onChange={e=>upd("acorns",Math.max(0,parseInt(e.target.value)||0))} style={{width:75}}/>
            </div>
          </div>
        </div>

      </div>

      {/* Notes sidebar — collapsible */}
      <div className="no-print" style={isMobile
        ?{width:"100%",borderTop:"2px solid var(--border)",paddingTop:"0.75rem"}
        :{flexShrink:0,width:notesOpen?220:34,transition:"width 0.2s",overflow:"hidden",borderLeft:"2px solid var(--border)",paddingLeft:"0.75rem"}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:"0.4rem",gap:"0.35rem",whiteSpace:"nowrap"}}>
          <div style={{...FD,fontSize:"0.62rem",letterSpacing:"0.12em",color:"var(--muted)",flex:1}}>SESSION NOTES</div>
          {!isMobile&&<button onClick={()=>setNotesOpen(o=>!o)}
            style={{flexShrink:0,padding:"0.18rem 0.4rem",borderRadius:4,border:"1px solid var(--border2)",background:"transparent",color:"var(--muted)",cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.6rem"}}>
            {notesOpen?"◀":"▶"}
          </button>}
        </div>
        {(isMobile||notesOpen)&&<textarea value={char.notes||""} onChange={e=>upd("notes",e.target.value)} rows={isMobile?6:22} placeholder="Track events, clues, contacts..." style={{resize:"vertical",width:"100%",fontSize:"0.82rem"}}/>}
      </div>
    </div>
  </div>;
}

/* ─── CHARACTER LIST ─────────────────────────────────────────────────────── */
function CharList({chars,onSelect,onNew,onDelete}){
  if(chars.length===0)return <div style={{maxWidth:920,margin:"0 auto",padding:"5rem 1.5rem",textAlign:"center"}}>
    <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🐿️</div>
    <h2 style={{...FD,color:"var(--text2)",marginBottom:"0.4rem"}}>No Characters Yet</h2>
    <p style={{color:"var(--muted)",marginBottom:"1.75rem"}}>Create your first squirrel hero to begin.</p>
    <Btn v="gold" onClick={onNew}>+ Create Character</Btn>
  </div>;
  return <div style={{maxWidth:920,margin:"0 auto",padding:"2rem 1.5rem 5rem"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
      <h1 style={{...FD,fontSize:"1.5rem",color:"var(--orange)"}}>Your Characters</h1>
      <Btn v="gold" onClick={onNew}>+ New Character</Btn>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:"0.85rem"}}>
      {chars.map(ch=>{
        const cl=CLASSES[ch.charClass]||{},folk=FOLK[ch.folk]||{};
        const hpPct=Math.max(0,Math.min(100,(ch.hpCurrent/ch.hpMax)*100));
        const canLU=ch.level<10&&ch.expNuts>=nextEN(ch.level);
        return <div key={ch.id} onClick={()=>onSelect(ch.id)}
          onMouseEnter={e=>e.currentTarget.style.borderColor="var(--green)"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}
          style={{...cardStyle(),cursor:"pointer",transition:"border-color 0.2s",position:"relative",overflow:"hidden"}}>
          {canLU&&<div style={{position:"absolute",top:9,right:9,background:"var(--gold)",color:"var(--bg)",fontFamily:"'Fredoka One',cursive",fontSize:"0.58rem",padding:"0.18rem 0.5rem",borderRadius:3}}>LEVEL UP!</div>}
          <div style={{display:"flex",alignItems:"center",gap:"0.55rem",marginBottom:"0.65rem"}}>
            <span style={{fontSize:"1.35rem"}}>{folk.emoji||"🐿️"}</span>
            <div>
              <div style={{...FD,fontSize:"0.88rem",color:"var(--text)"}}>{ch.background?.name||ch.name||"Unnamed"}</div>
              <div style={{color:"var(--muted)",fontSize:"0.8rem"}}>{ch.folk} · {ch.charClass}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"0.35rem",marginBottom:"0.65rem",flexWrap:"wrap"}}>
            <Tag>Lvl {ch.level}</Tag><Tag>{ch.expNuts} EN</Tag><Tag>HP {ch.hpCurrent}/{ch.hpMax}</Tag>
          </div>
          <div style={{height:4,background:"var(--bg2)",borderRadius:2,marginBottom:"0.6rem",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:2,background:`hsl(${hpPct*1.2},55%,40%)`,width:`${hpPct}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"var(--muted)",fontSize:"0.78rem"}}>{ch.background?.homeland||"Unknown homeland"}</span>
            <button onClick={e=>{e.stopPropagation();if(confirm("Delete this character?"))onDelete(ch.id);}} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",padding:3}}><Trash2 size={13}/></button>
          </div>
        </div>;})}
    </div>
  </div>;
}

/* ─── LORE PAGE ──────────────────────────────────────────────────────────── */
const LORE_SECTIONS = [
  {id:"world",    label:"🌳 World",      icon:"🌳"},
  {id:"folk",     label:"🐿️ Folk",       icon:"🐿️"},
  {id:"monsters", label:"⚔️ Monsters",   icon:"⚔️"},
  {id:"locations",label:"🗺️ Locations",  icon:"🗺️"},
  {id:"decree",   label:"📜 Iron Decree",icon:"📜"},
];

const SEVERITY_STYLE = {
  standard:  {bg:"var(--bg2)",      border:"var(--border)",  label:"STANDARD",  col:"var(--muted)"},
  oppressive:{bg:"#FFF7ED",        border:"#FED7AA",        label:"OPPRESSIVE",col:"var(--orange)"},
  severe:    {bg:"#FEF2F2",        border:"#FECACA",        label:"SEVERE",    col:"var(--red2)"},
};

function LoreBody({text}){
  // Render **bold** markdown and paragraph breaks
  return <div style={{color:"var(--text2)",fontSize:"0.9rem",lineHeight:1.75}}>
    {text.split("\n\n").map((para,pi)=>{
      if(!para.trim()) return null;
      // section headers (lines starting with **)
      if(para.startsWith("**") && para.endsWith("**") && !para.slice(2).includes("**")){
        return <div key={pi} style={{...FD,fontSize:"0.72rem",color:"var(--gold)",letterSpacing:"0.1em",marginTop:"1rem",marginBottom:"0.3rem"}}>{para.replace(/\*\*/g,"").toUpperCase()}</div>;
      }
      const parts = para.split(/(\*\*[^*]+\*\*)/g);
      return <p key={pi} style={{marginBottom:"0.85rem"}}>
        {parts.map((part,i)=>
          part.startsWith("**")&&part.endsWith("**")
            ?<strong key={i} style={{color:"var(--text)",fontWeight:700}}>{part.slice(2,-2)}</strong>
            :<span key={i}>{part}</span>
        )}
      </p>;
    })}
  </div>;
}

function LorePage(){
  const isMobile = useMobile();
  const [section, setSection] = useState("world");
  const [subId,   setSubId]   = useState(null);

  // derive sub-items for current section
  const subItems = useMemo(()=>{
    if(section==="world")     return WORLD_LORE.chapters.map(c=>({id:c.id,label:c.icon+" "+c.title}));
    if(section==="folk")      return Object.keys(FOLK_LORE).map(k=>({id:k,label:FOLK_LORE[k].emoji+" "+FOLK_LORE[k].title}));
    if(section==="monsters")  return MONSTER_LORE.map(m=>({id:m.id,label:m.icon+" "+m.name}));
    if(section==="locations") return LOCATION_LORE.map(l=>({id:l.id,label:l.icon+" "+l.name}));
    if(section==="decree")    return IRON_DECREE.articles.map(a=>({id:a.id,label:`Art. ${a.number} — ${a.title}`}));
    return [];
  },[section]);

  // auto-select first sub-item when section changes
  useEffect(()=>{ setSubId(subItems[0]?.id||null); },[section]);

  const content = useMemo(()=>{
    if(section==="world"){
      if(!subId) return null;
      const ch = WORLD_LORE.chapters.find(c=>c.id===subId);
      if(!ch) return null;
      return {type:"world-chapter", data:ch};
    }
    if(section==="folk"){
      if(!subId) return null;
      const f = FOLK_LORE[subId];
      if(!f) return null;
      return {type:"folk", data:f};
    }
    if(section==="monsters"){
      if(!subId) return null;
      const m = MONSTER_LORE.find(x=>x.id===subId);
      if(!m) return null;
      return {type:"monster", data:m};
    }
    if(section==="locations"){
      if(!subId) return null;
      const l = LOCATION_LORE.find(x=>x.id===subId);
      if(!l) return null;
      return {type:"location", data:l};
    }
    if(section==="decree"){
      if(!subId) return {type:"decree-intro"};
      const a = IRON_DECREE.articles.find(x=>x.id===subId);
      if(!a) return null;
      return {type:"decree-article", data:a};
    }
    return null;
  },[section,subId]);

  const sidebarW = isMobile ? "100%" : 210;

  return <div style={{maxWidth:1040,margin:"0 auto",padding:isMobile?"0.75rem 0.6rem 4rem":"1.5rem 1.5rem 5rem"}}>
    {/* Section tabs */}
    <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginBottom:"1.25rem"}}>
      {LORE_SECTIONS.map(s=><button key={s.id} onClick={()=>setSection(s.id)}
        style={{padding:isMobile?"0.35rem 0.65rem":"0.4rem 1rem",borderRadius:6,border:`2px solid ${section===s.id?"var(--gold)":"var(--border)"}`,
          background:section===s.id?"var(--gold)":"var(--surface)",color:section===s.id?"white":"var(--text2)",
          cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:isMobile?"0.72rem":"0.78rem",letterSpacing:"0.06em",transition:"all 0.15s"}}>
        {s.label}
      </button>)}
    </div>

    {/* World intro when on world section and no chapter selected yet */}
    {section==="world"&&!subId&&<div style={{...cardStyle(),padding:"1.25rem 1.5rem",marginBottom:"1rem"}}>
      <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",marginBottom:"0.5rem"}}>THE WORLD OF ACORNIA</div>
      <LoreBody text={WORLD_LORE.overview}/>
    </div>}

    {/* Decree intro banner */}
    {section==="decree"&&<div style={{background:"#1C1410",border:"2px solid #8B0000",borderRadius:10,padding:"1rem 1.25rem",marginBottom:"1.25rem",color:"#DDD0B8"}}>
      <div style={{display:"flex",alignItems:"center",gap:"0.65rem",marginBottom:"0.5rem"}}>
        <span style={{fontSize:"1.4rem"}}>📜</span>
        <div style={{...FD,fontSize:"1rem",color:"#FBBF24",letterSpacing:"0.06em"}}>THE IRON DECREE</div>
        <div style={{...FD,fontSize:"0.6rem",color:"#8B6914",letterSpacing:"0.1em",marginLeft:"auto"}}>YEAR THREE OF THE PACIFICATION</div>
      </div>
      <div style={{fontSize:"0.78rem",lineHeight:1.65,color:"#C4B49A",fontStyle:"italic",borderTop:"1px solid #3C2A1A",paddingTop:"0.6rem"}}>
        {IRON_DECREE.preamble.split("\n\n").map((p,i)=><p key={i} style={{marginBottom:"0.5rem"}}>{p}</p>)}
      </div>
    </div>}

    <div style={{display:"flex",flexDirection:isMobile?"column":"row",gap:"1rem",alignItems:"flex-start"}}>

      {/* Sidebar nav */}
      <div style={{flexShrink:0,width:sidebarW}}>
        {/* World overview button */}
        {section==="world"&&<button onClick={()=>setSubId(null)}
          style={{width:"100%",textAlign:"left",padding:"0.45rem 0.7rem",marginBottom:"0.25rem",borderRadius:5,
            border:`1.5px solid ${subId===null?"var(--gold)":"var(--border)"}`,
            background:subId===null?"var(--gold)":"transparent",color:subId===null?"white":"var(--muted)",
            cursor:"pointer",fontFamily:"'Fredoka One',cursive",fontSize:"0.66rem",letterSpacing:"0.06em"}}>
          📜 Overview
        </button>}
        {subItems.map(item=><button key={item.id} onClick={()=>setSubId(item.id)}
          style={{width:"100%",textAlign:"left",padding:"0.45rem 0.7rem",marginBottom:"0.25rem",borderRadius:5,
            border:`1.5px solid ${subId===item.id?"var(--gold)":"var(--border)"}`,
            background:subId===item.id?"rgba(245,158,11,0.12)":"transparent",
            color:subId===item.id?"var(--gold)":"var(--text2)",fontWeight:subId===item.id?700:400,
            cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:"0.8rem",transition:"all 0.12s",
            borderLeft:subId===item.id?"3px solid var(--gold)":"1.5px solid var(--border)"}}>
          {item.label}
        </button>)}
      </div>

      {/* Main content */}
      <div style={{flex:1,minWidth:0}}>
        {content?.type==="world-chapter"&&<div>
          <div style={{...FD,fontSize:"1.25rem",color:"var(--orange)",marginBottom:"0.2rem"}}>{content.data.icon} {content.data.title}</div>
          <hr style={{border:"none",borderTop:"2px solid var(--border)",margin:"0.6rem 0 1rem"}}/>
          <LoreBody text={content.data.body}/>
        </div>}

        {content?.type==="folk"&&(()=>{const f=content.data; return <div>
          <div style={{display:"flex",alignItems:"baseline",gap:"0.75rem",marginBottom:"0.2rem",flexWrap:"wrap"}}>
            <div style={{...FD,fontSize:"1.3rem",color:"var(--orange)"}}>{f.emoji} {f.title}</div>
            <div style={{...FD,fontSize:"0.72rem",color:"var(--muted)",letterSpacing:"0.05em"}}>{f.subtitle}</div>
          </div>
          <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"0.75rem"}}>
            <Tag bg="var(--teal)">🏡 {f.homeland}</Tag>
            <Tag bg="var(--purple)">{f.population}</Tag>
          </div>
          <hr style={{border:"none",borderTop:"2px solid var(--border)",margin:"0 0 1rem"}}/>

          <LoreSectionCard title="Appearance">{f.appearance}</LoreSectionCard>
          <LoreSectionCard title="Origin & History">{f.origin}</LoreSectionCard>
          <LoreSectionCard title="Before the Cutting">{f.preCutting}</LoreSectionCard>
          <LoreSectionCard title="After the Cutting">{f.postCutting}</LoreSectionCard>

          <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",letterSpacing:"0.1em",marginTop:"1.25rem",marginBottom:"0.6rem"}}>★ MAJOR FIGURES</div>
          <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
            {(f.majorFigures||[]).map(fig=>{
              const col = fig.alignment==="Hero"?"var(--green)":fig.alignment==="Villain"?"var(--red2)":fig.alignment==="Captive"?"var(--purple)":"var(--muted)";
              return <div key={fig.name} style={{...cardStyle(),padding:"0.75rem 1rem",borderLeft:`4px solid ${col}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"0.25rem",marginBottom:"0.4rem"}}>
                  <div style={{...FD,fontSize:"0.88rem",color:"var(--text)"}}>{fig.name}</div>
                  <Tag bg={col} style={{fontSize:"0.55rem"}}>{fig.alignment}</Tag>
                </div>
                <div style={{...FD,fontSize:"0.62rem",color:col,marginBottom:"0.4rem",letterSpacing:"0.05em"}}>{fig.title}</div>
                <div style={{color:"var(--text2)",fontSize:"0.84rem",lineHeight:1.6}}>{fig.desc}</div>
              </div>;
            })}
          </div>
        </div>;})()}

        {content?.type==="monster"&&(()=>{const m=content.data; return <div>
          <div style={{display:"flex",alignItems:"baseline",gap:"0.75rem",marginBottom:"0.2rem",flexWrap:"wrap"}}>
            <div style={{...FD,fontSize:"1.3rem",color:"var(--orange)"}}>{m.icon} {m.name}</div>
          </div>
          <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"0.75rem"}}>
            <Tag bg="var(--red2)">⚠ {m.threat}</Tag>
            <Tag bg="var(--teal)">📍 {m.found}</Tag>
          </div>
          <hr style={{border:"none",borderTop:"2px solid var(--border)",margin:"0 0 1rem"}}/>
          <LoreSectionCard title="Overview">{m.overview}</LoreSectionCard>
          <LoreSectionCard title="Origin">{m.origin}</LoreSectionCard>
          {(m.notableIndividuals||[]).length>0&&<>
            <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",letterSpacing:"0.1em",marginTop:"1.25rem",marginBottom:"0.6rem"}}>★ NOTABLE INDIVIDUALS</div>
            {m.notableIndividuals.map(ind=><div key={ind.name} style={{...cardStyle(),padding:"0.75rem 1rem",borderLeft:"4px solid var(--orange)",marginBottom:"0.5rem"}}>
              <div style={{...FD,fontSize:"0.88rem",color:"var(--text)",marginBottom:"0.3rem"}}>{ind.name}</div>
              <div style={{color:"var(--text2)",fontSize:"0.84rem",lineHeight:1.6}}>{ind.desc}</div>
            </div>)}
          </>}
          <LoreSectionCard title="Tactics & Engagement">{m.tactics}</LoreSectionCard>
        </div>;})()}

        {content?.type==="location"&&(()=>{const l=content.data; return <div>
          <div style={{display:"flex",alignItems:"baseline",gap:"0.75rem",marginBottom:"0.2rem",flexWrap:"wrap"}}>
            <div style={{...FD,fontSize:"1.3rem",color:"var(--orange)"}}>{l.icon} {l.name}</div>
          </div>
          <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"0.75rem"}}>
            <Tag bg="var(--red2)">⚔ {l.enemy}</Tag>
            <Tag bg="var(--green)">📜 {l.quest}</Tag>
            <Tag bg="var(--teal)">📍 {l.region}</Tag>
          </div>
          <hr style={{border:"none",borderTop:"2px solid var(--border)",margin:"0 0 1rem"}}/>
          <LoreSectionCard title="Environment">{l.environment}</LoreSectionCard>
          <LoreSectionCard title="History">{l.history}</LoreSectionCard>

          {(l.nativePopulations||[]).length>0&&<>
            <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",letterSpacing:"0.1em",marginTop:"1rem",marginBottom:"0.5rem"}}>👥 NATIVE POPULATIONS</div>
            {l.nativePopulations.map(p=><div key={p.name} style={{display:"flex",gap:"0.5rem",padding:"0.4rem 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{...FD,fontSize:"0.75rem",color:"var(--text)",minWidth:160,flexShrink:0}}>{p.name}</div>
              <div style={{color:"var(--muted)",fontSize:"0.8rem",lineHeight:1.5}}>{p.desc}</div>
            </div>)}
          </>}

          {(l.pointsOfInterest||[]).length>0&&<>
            <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",letterSpacing:"0.1em",marginTop:"1rem",marginBottom:"0.5rem"}}>🔍 POINTS OF INTEREST</div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
              {l.pointsOfInterest.map(p=><div key={p.name} style={{...cardStyle(),padding:"0.6rem 0.8rem",borderLeft:"3px solid var(--teal)"}}>
                <div style={{...FD,fontSize:"0.72rem",color:"var(--teal)",marginBottom:"0.25rem"}}>{p.name}</div>
                <div style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.5}}>{p.desc}</div>
              </div>)}
            </div>
          </>}

          {(l.businessesAndInns||[]).length>0&&<>
            <div style={{...FD,fontSize:"0.62rem",color:"var(--gold)",letterSpacing:"0.1em",marginTop:"1rem",marginBottom:"0.5rem"}}>🏪 SHOPS, INNS & BUSINESSES</div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
              {l.businessesAndInns.map(b=><div key={b.name} style={{...cardStyle(),padding:"0.6rem 0.8rem",borderLeft:"3px solid var(--purple)"}}>
                <div style={{display:"flex",gap:"0.5rem",alignItems:"baseline",marginBottom:"0.25rem",flexWrap:"wrap"}}>
                  <div style={{...FD,fontSize:"0.72rem",color:"var(--purple)"}}>{b.name}</div>
                  <Tag bg="var(--purple)" style={{fontSize:"0.55rem"}}>{b.type}</Tag>
                </div>
                <div style={{color:"var(--text2)",fontSize:"0.82rem",lineHeight:1.5}}>{b.desc}</div>
              </div>)}
            </div>
          </>}

          <LoreSectionCard title="🎯 Current Situation" accent="var(--orange)">{l.currentSituation}</LoreSectionCard>
        </div>;})()}

        {content?.type==="decree-intro"&&<div style={{color:"var(--muted)",fontSize:"0.88rem",fontStyle:"italic",padding:"2rem 0 1rem"}}>
          ← Select an article to read its regulations.
        </div>}

        {content?.type==="decree-article"&&(()=>{const a=content.data; return <div>
          {/* Article header */}
          <div style={{background:"#1C1410",borderRadius:8,padding:"0.85rem 1.1rem",marginBottom:"1rem",border:`2px solid ${a.color}`}}>
            <div style={{display:"flex",alignItems:"baseline",gap:"0.75rem",flexWrap:"wrap"}}>
              <div style={{...FD,fontSize:"1.3rem",color:a.color}}>{a.icon} Article {a.number}</div>
              <div style={{...FD,fontSize:"0.9rem",color:"#DDD0B8",letterSpacing:"0.05em"}}>{a.title.toUpperCase()}</div>
            </div>
            {a.preamble&&<div style={{fontSize:"0.78rem",color:"#C4B49A",marginTop:"0.5rem",fontStyle:"italic",lineHeight:1.6}}>{a.preamble}</div>}
          </div>

          {/* Severity legend */}
          <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"1rem"}}>
            {Object.entries(SEVERITY_STYLE).map(([k,s])=><div key={k} style={{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.2rem 0.55rem",borderRadius:4,background:s.bg,border:`1px solid ${s.border}`}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:s.col}}/>
              <span style={{...FD,fontSize:"0.58rem",color:s.col,letterSpacing:"0.08em"}}>{s.label}</span>
            </div>)}
          </div>

          {/* Regulations list */}
          <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
            {a.regulations.map(reg=>{
              const sty = SEVERITY_STYLE[reg.severity]||SEVERITY_STYLE.standard;
              return <div key={reg.num} style={{borderRadius:7,border:`1.5px solid ${sty.border}`,background:sty.bg,overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.6rem",padding:"0.45rem 0.75rem",borderBottom:`1px solid ${sty.border}`,background:reg.severity==="standard"?"rgba(0,0,0,0.03)":reg.severity==="oppressive"?"rgba(255,120,30,0.07)":"rgba(220,38,38,0.07)"}}>
                  <div style={{...FD,fontSize:"0.7rem",color:sty.col,minWidth:32}}>{reg.num}</div>
                  <div style={{...FD,fontSize:"0.78rem",color:"var(--text)",flex:1}}>{reg.title}</div>
                  <div style={{...FD,fontSize:"0.55rem",color:sty.col,letterSpacing:"0.08em",background:sty.bg,border:`1px solid ${sty.border}`,borderRadius:3,padding:"0.1rem 0.4rem"}}>{sty.label}</div>
                </div>
                <div style={{padding:"0.55rem 0.75rem",fontSize:"0.83rem",color:"var(--text2)",lineHeight:1.65}}>{reg.text}</div>
              </div>;
            })}
          </div>
        </div>;})()}
      </div>
    </div>
  </div>;
}

function LoreSectionCard({title, children, accent="var(--green)"}){
  return <div style={{marginBottom:"1rem"}}>
    <div style={{...FD,fontSize:"0.62rem",color:accent,letterSpacing:"0.1em",marginBottom:"0.4rem"}}>{title.toUpperCase()}</div>
    <div style={{color:"var(--text2)",fontSize:"0.88rem",lineHeight:1.7,borderLeft:`3px solid ${accent}`,paddingLeft:"0.75rem"}}>
      {typeof children==="string"?<LoreBody text={children}/>:children}
    </div>
  </div>;
}

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function App(){
  const [page,setPage] = useState("home");
  const [chars,setChars] = useState([]);
  const [charsReady,setCharsReady] = useState(false);
  const [selId,setSelId] = useState(null);
  const [creating,setCreating] = useState(false);

  useEffect(()=>{ charApi.list().then(data=>{ setChars(data); setCharsReady(true); }); },[]);
  useEffect(()=>{ if(charsReady) saveChars(chars); },[chars,charsReady]);

  const sel = chars.find(c=>c.id===selId);
  const navTo = (p) => {setPage(p);setSelId(null);setCreating(false);};

  const saveChar = (char) => {
    const c = {...char,name:char.background?.name||char.name||"Hero"};
    setChars(cs=>{const idx=cs.findIndex(x=>x.id===c.id);if(idx>=0){const n=[...cs];n[idx]=c;return n;}return [...cs,c];});
    charApi.upsert(c);
    setCreating(false);setSelId(c.id);setPage("chars");
  };
  const updateChar = (u) => {
    const c = {...u,name:u.background?.name||u.name};
    setChars(cs=>cs.map(x=>x.id===c.id?c:x));
    charApi.upsert(c);
  };
  const deleteChar = (id) => {
    setChars(cs=>cs.filter(c=>c.id!==id));
    if(selId===id)setSelId(null);
    charApi.remove(id);
  };

  return <>
    <style>{G}</style>
    <Nav page={page} setPage={navTo} charCount={chars.length}/>
    <main>
      {page==="home"&&<Landing setPage={navTo}/>}
      {page==="rules"&&<Rules/>}
      {page==="lore"&&<LorePage/>}
      {page==="chars"&&(
        creating?<Wizard onSave={saveChar} onCancel={()=>setCreating(false)}/>:
        sel?<Sheet char={sel} onUpdate={updateChar} onBack={()=>setSelId(null)}/>:
        !charsReady?<div style={{padding:"3rem",textAlign:"center",color:"var(--muted)",fontFamily:"'Fredoka One',cursive",fontSize:"1.4rem"}}>Loading characters…</div>:
        <CharList chars={chars} onSelect={setSelId} onNew={()=>setCreating(true)} onDelete={deleteChar}/>
      )}
    </main>
  </>;
}
