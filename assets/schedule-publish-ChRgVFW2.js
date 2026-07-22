import{m as ia,a as ta,r as sa,d as la,g as k,h as E,f as ca,E as L,R as da,i as _,j as pa}from"./index-CwLbK1on.js";import{R as ga}from"./report-visual-kit-BBEKWcOR.js";import"./vendor-react-Bb048-hH.js";import"./vendor-astryx-COpdRZwM.js";import"./vendor-gfMLQKmI.js";const U={resumen:"Proyectos",etapas:"Fases",detalle:"Macros, micros y entregables"},h=o=>String(o??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;").replaceAll("=","&#61;"),e=(o,p="—")=>{const t=String(o??"").trim();return h(t||p)},u=o=>Array.isArray(o)?o:[],g=o=>/^\d{4}-\d{2}-\d{2}$/.test(o??""),v=o=>g(o)?ca(o):"Sin fecha",ma=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Set","Oct","Nov","Dic"];function ba(o,p){if(!g(o)||!g(p))return null;const t=k(o,p)+1;return t>0?t:null}function fa(o,p){const t=ba(o,p);return t?`${t} ${t===1?"día":"días"}`:"Duración por definir"}function A(o){const p=o.filter(g).sort();return p.length?{inicio:p[0],fin:p.at(-1)}:null}function wa(o="cartera",p=E()){const t=g(p)?p:E();return`Cronograma-${String(o||"cartera").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)||"cartera"}-${t}.html`}function ya(o,{proyectoIds:p=[],hoy:t=E(),fechaInicio:R=null,fechaFin:C=null,nivel:O="detalle",incluirHechas:N=!0}={}){const D=U[O]?O:"detalle",J=new Set(p),$=u(o==null?void 0:o.proyectos).filter(a=>J.has(a.id)),x=$.map(a=>{const n=ia(o,a.id).map(r=>({...r,kind:"macro",inicioReal:r.inicio,finReal:r.fin})),s=ta(o,a.id).map(r=>{const i=sa(r);return{...r,kind:"micro",inicioReal:i.inicio,finReal:i.fin}});return{proyecto:a,macros:n,micros:s,avance:la(o,a.id)}}),K=A(x.flatMap(({proyecto:a,macros:n,micros:s})=>[...u(a.etapas).flatMap(r=>[r.inicio,r.fin]),...n.flatMap(r=>[r.inicioReal,r.finReal]),...s.flatMap(r=>[r.inicioReal,r.finReal]),...u(a.entregables).map(r=>r.fecha),a.deadline])),l=g(R)&&g(C)&&R<=C?{inicio:R,fin:C}:K??{inicio:t,fin:t},j=Math.max(1,k(l.inicio,l.fin)+1),P=a=>{const n=k(l.inicio,a);return Math.max(0,Math.min(100,n/j*100))},Q=a=>{const n=k(l.inicio,a)+1;return Math.max(0,Math.min(100,n/j*100))},I=(a,n)=>g(a)&&g(n)&&n>=l.inicio&&a<=l.fin,M=(a,n,s="")=>{if(!I(a,n))return"";const r=P(a<l.inicio?l.inicio:a),i=Q(n>l.fin?l.fin:n),f=Math.max(1.1,i-r);return`<span class="bar ${s}" style="left:${r.toFixed(2)}%;width:${f.toFixed(2)}%"></span>`},T=(a,n,s)=>!g(a)||a<l.inicio||a>l.fin?"":`<i class="rombo ${s?"is-vencido":""} estado-${h(n??"pendiente")}" style="left:${P(a).toFixed(2)}%"></i>`,Y=g(t)&&t>=l.inicio&&t<=l.fin?`<i class="hoy" style="left:${P(t).toFixed(2)}%"></i>`:"",w=a=>`<span class="linea">${Y}${a}</span>`,B=[];{let a=l.inicio;for(;a<=l.fin;){const[n,s]=a.split("-").map(Number),r=new Date(n,s,0).getDate(),i=`${n}-${String(s).padStart(2,"0")}-${String(r).padStart(2,"0")}`,f=i<l.fin?i:l.fin;B.push({etiqueta:`${ma[s-1]} ${n}`,ancho:(k(a,f)+1)/j*100}),a=s===12?`${n+1}-01-01`:`${n}-${String(s+1).padStart(2,"0")}-01`}}const Z=`<div class="escala">${B.map(a=>`<span style="width:${a.ancho.toFixed(2)}%">${a.ancho>4?h(a.etiqueta):""}</span>`).join("")}</div>`,V=a=>N||a.estado!=="hecha",H=a=>N||a.estado!=="entregado",W=({proyecto:a,macros:n,micros:s,avance:r})=>{const i=[],f=A([...n.flatMap(c=>[c.inicioReal,c.finReal]),...s.flatMap(c=>[c.inicioReal,c.finReal]),...u(a.etapas).flatMap(c=>[c.inicio,c.fin])]);if(i.push(`<div class="fila is-proyecto">
      <span class="rotulo"><strong>${e(a.nombre,"Proyecto sin nombre")}</strong><small>${e(a.codigo,"S/C")} · ${r}% de avance · fecha final ${e(v(a.deadline))}</small></span>
      ${w(`${f?M(f.inicio,f.fin,"is-proyecto"):""}${g(a.deadline)?T(a.deadline,"deadline",a.deadline<t):""}`)}
    </div>`),D!=="resumen")for(const c of u(a.etapas)){const S=n.filter(d=>d.etapaId===c.id),q=s.filter(d=>S.some(b=>b.id===d.macroId)),z=[...S,...q],F=A(z.flatMap(d=>[d.inicioReal,d.finReal]))??A([c.inicio,c.fin]),ea=z.reduce((d,b)=>d+(b.estado==="hecha"?1:b.estado==="en_curso"?.5:0),0),oa=z.length?Math.round(ea/z.length*100):0;if(i.push(`<div class="fila is-fase">
          <span class="rotulo"><strong>${e(c.nombre,"Fase sin nombre")}</strong><small>${S.length} macros · ${q.length} micros · ${oa}%</small></span>
          ${w(F?M(F.inicio,F.fin,"is-fase"):"")}
        </div>`),D==="detalle")for(const d of S.filter(V)){i.push(`<div class="fila is-actividad">
              <span class="rotulo"><strong>${e(d.nombre,"Macro sin nombre")}</strong><small>Macro · ${e(L[d.estado],"Estado por definir")} · ${e(v(d.inicioReal))} → ${e(v(d.finReal))}</small></span>
              ${w(M(d.inicioReal,d.finReal,`is-macro estado-${h(d.estado??"pendiente")}`))}
            </div>`);for(const b of q.filter(na=>na.macroId===d.id).filter(V))i.push(`<div class="fila is-actividad is-micro">
                <span class="rotulo"><strong>${e(b.nombre,"Micro sin nombre")}</strong><small>Micro · ${e(L[b.estado],"Estado por definir")} · ${e(v(b.inicioReal))} → ${e(v(b.finReal))}</small></span>
                ${w(M(b.inicioReal,b.finReal,`is-micro estado-${h(b.estado??"pendiente")}`))}
              </div>`)}}const m=u(a.entregables).filter(c=>g(c.fecha)).filter(H);return m.length&&i.push(`<div class="fila is-compromisos">
        <span class="rotulo"><strong>Compromisos</strong><small>${m.length} ${m.length===1?"entregable":"entregables"} · rombo por estado</small></span>
        ${w(m.map(c=>T(c.fecha,c.estado,c.estado!=="entregado"&&c.fecha<t)).join(""))}
      </div>`),`<article class="proyecto">${i.join("")}</article>`},G=u(o==null?void 0:o.responsables).map(a=>{const n=x.flatMap(({proyecto:r,macros:i,micros:f})=>[...i,...f].filter(m=>m.responsableId===a.id&&m.estado!=="hecha").filter(m=>I(m.inicioReal,m.finReal)).map(m=>({...m,proyectoCodigo:r.codigo}))).sort((r,i)=>String(r.inicioReal).localeCompare(String(i.inicioReal))),s=x.flatMap(({proyecto:r})=>u(r.entregables).filter(i=>i.responsableId===a.id&&i.estado!=="entregado").filter(i=>g(i.fecha)).map(i=>({...i,proyectoCodigo:r.codigo}))).sort((r,i)=>String(r.fecha).localeCompare(String(i.fecha)));return{persona:a,actividades:n,entregables:s}}).filter(a=>a.actividades.length||a.entregables.length),X=({persona:a,actividades:n,entregables:s})=>`<article class="persona">
    <header><strong>${e(a.nombre,"Persona sin nombre")}</strong><span>${e(da[a.rol],"Rol por confirmar")}</span></header>
    ${n.length?`<ul class="tareas">${n.map(r=>`<li>
      <span class="cuando">${r.finReal<t?'<b class="fuera">Fuera de fecha</b>':`<b>${e(_(r.inicioReal))}</b>`}</span>
      <span class="que"><strong>${e(r.nombre,"Actividad sin nombre")}</strong><small>${e(r.proyectoCodigo)} · ${r.kind==="macro"?"Macro":"Micro"} · ${e(L[r.estado],"Estado por definir")}</small></span>
      <span class="cuanto"><strong>${e(_(r.inicioReal))} → ${e(_(r.finReal))}</strong><small>${h(fa(r.inicioReal,r.finReal))}</small></span>
    </li>`).join("")}</ul>`:'<p class="sin-items">Sin macros ni micros en la ventana publicada.</p>'}
    ${s.length?`<ul class="compromisos">${s.map(r=>`<li>
      <span class="que"><strong>${e(r.nombre,"Entregable sin nombre")}</strong><small>${e(r.proyectoCodigo)} · entregable comprometido</small></span>
      <span class="cuanto"><strong>${e(v(r.fecha))}</strong><small class="${r.fecha<t?"fuera":""}">${r.fecha<t?"Fuera de fecha · ":""}${e(pa[r.estado],"Estado por definir")}</small></span>
    </li>`).join("")}</ul>`:""}
  </article>`,y=$.length===1?$[0]:null,aa=y?`${e(y.codigo,"S/C")} · ${e(y.nombre,"Proyecto sin nombre")}${y.cliente?` · ${e(y.cliente)}`:""}`:`Cartera · ${$.length} ${$.length===1?"proyecto":"proyectos"}`,ra=v(g(t)?t:E());return`<!doctype html>
<html lang="es-PE" data-rumbo-report="v1">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'none'; object-src 'none'; frame-src 'none'; form-action 'none'; style-src 'unsafe-inline'; img-src data:">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cronograma publicado · Rumbo</title>
  <style>
    :root{${ga}--ink:var(--r-ink);--muted:var(--r-muted);--line:var(--r-line);--paper:var(--r-paper);--wash:var(--r-wash);--brand:var(--r-brand);--brand2:var(--r-brand-bright);--warn:var(--r-warn);--danger:var(--r-danger);--ok:var(--r-ok)}
    *{box-sizing:border-box}
    body{margin:0;background:var(--r-canvas);color:var(--ink);font:var(--r-text-note)/1.45 var(--r-font-ui)}
    main{max-width:var(--r-page-portrait-width);margin:0 auto;background:var(--paper);padding:var(--r-page-padding-portfolio)}
    .eyebrow,.section-kicker{color:var(--brand);font-size:var(--r-text-micro);font-weight:800;letter-spacing:.13em;text-transform:uppercase}
    .masthead{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--r-space-3);border-bottom:2px solid var(--ink);padding-bottom:var(--r-print-gap-lg)}
    .brand{display:flex;gap:var(--r-space-2);align-items:center}
    .mark{display:grid;place-items:center;width:var(--r-mark-size);height:var(--r-mark-size);border-radius:var(--r-radius-small);background:var(--brand);color:var(--r-paper);font-size:var(--r-text-title);font-weight:800}
    .brand h1{font-size:var(--r-text-display);line-height:1;margin:2px 0 var(--r-space-1)}
    .brand p,.metadata p{margin:0;color:var(--muted)}
    .metadata{text-align:right}
    .metadata strong{display:block;font-size:var(--r-text-note)}
    section{margin-top:var(--r-print-gap-xl)}
    section>header{display:flex;justify-content:space-between;align-items:end;margin-bottom:var(--r-print-gap-sm)}
    section h2{font-size:var(--r-text-section);margin:2px 0 0}
    section>header p{margin:0;color:var(--muted)}
    .escala{display:flex;border:1px solid var(--line);border-bottom:0;border-radius:var(--r-radius-small) var(--r-radius-small) 0 0;overflow:hidden;background:var(--wash)}
    .escala span{display:block;padding:var(--r-space-1) var(--r-space-2);border-right:1px solid var(--line);color:var(--muted);font-size:var(--r-text-micro);font-weight:800;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;overflow:hidden}
    .escala span:last-child{border-right:0}
    .proyecto{border:1px solid var(--line);border-top:0}
    .proyecto:last-of-type{border-radius:0 0 var(--r-radius-small) var(--r-radius-small)}
    .fila{display:grid;grid-template-columns:34% 1fr;border-top:1px solid var(--line);break-inside:avoid}
    .fila.is-proyecto{background:var(--wash)}
    .fila.is-fase{background:var(--r-info-bg)}
    .rotulo{display:grid;gap:1px;min-width:0;padding:var(--r-space-2);border-right:1px solid var(--line)}
    .rotulo strong{font-size:var(--r-text-note);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .fila.is-proyecto .rotulo strong{font-size:var(--r-text-body)}
    .fila.is-fase .rotulo strong{color:var(--brand)}
    .fila.is-micro .rotulo{padding-left:var(--r-space-4)}
    .fila.is-micro .rotulo strong{font-weight:600}
    .rotulo small{color:var(--muted);font-size:var(--r-text-micro);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .linea{position:relative;min-height:var(--r-space-4);margin:var(--r-space-2);background:repeating-linear-gradient(90deg,transparent 0,transparent calc(8.333% - 1px),var(--r-chart-grid) calc(8.333% - 1px),var(--r-chart-grid) 8.333%)}
    .bar{position:absolute;top:50%;height:var(--r-timeline-bar);transform:translateY(-50%);border-radius:var(--r-radius-small);background:var(--brand2)}
    .bar.is-proyecto{background:var(--brand);opacity:.85}
    .bar.is-fase{height:var(--r-progress-height);background:var(--brand2);opacity:.8}
    .bar.is-macro{background:var(--brand2)}
    .bar.is-macro.estado-pendiente,.bar.is-micro.estado-pendiente{background:var(--r-brand-wash);border:1px solid var(--brand2)}
    .bar.is-macro.estado-hecha,.bar.is-micro.estado-hecha{opacity:.4}
    .bar.is-micro{height:var(--r-progress-height)}
    .rombo{position:absolute;top:50%;width:var(--r-space-2);height:var(--r-space-2);transform:translate(-50%,-50%) rotate(45deg);border:1.5px solid var(--brand);background:var(--r-brand-wash)}
    .rombo.estado-en_curso{background:var(--brand2);border-color:var(--brand2)}
    .rombo.estado-en_revision{background:var(--r-warning-bg);border-color:var(--warn)}
    .rombo.estado-aprobado{background:var(--brand2);border-color:var(--brand)}
    .rombo.estado-entregado{background:var(--r-success-bg);border-color:var(--ok)}
    .rombo.estado-deadline{background:var(--paper);border-color:var(--ink)}
    .rombo.is-vencido{background:var(--r-danger-bg);border-color:var(--danger)}
    .hoy{position:absolute;top:0;bottom:0;width:0;border-left:2px solid var(--danger);opacity:.55}
    .agenda-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--r-space-2)}
    .persona{border:1px solid var(--line);border-radius:var(--r-radius-small);padding:var(--r-space-2);break-inside:avoid}
    .persona>header{display:flex;justify-content:space-between;align-items:baseline;gap:var(--r-space-2);border-bottom:1px solid var(--line);padding-bottom:var(--r-space-1);margin-bottom:var(--r-space-1)}
    .persona>header strong{font-size:var(--r-text-body)}
    .persona>header span{color:var(--muted);font-size:var(--r-text-micro);font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .persona ul{list-style:none;margin:0;padding:0}
    .persona li{display:grid;grid-template-columns:auto 1fr auto;gap:var(--r-space-2);align-items:baseline;padding:var(--r-space-1) 0;border-bottom:1px dashed var(--line)}
    .persona ul.compromisos li{grid-template-columns:1fr auto}
    .persona li:last-child{border-bottom:0}
    .cuando b{color:var(--brand);font-size:var(--r-text-micro)}
    .cuando b.fuera{color:var(--danger)}
    .que{min-width:0}
    .que strong{display:block;font-size:var(--r-text-note);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .que small,.cuanto small{display:block;color:var(--muted);font-size:var(--r-text-micro)}
    .cuanto{text-align:right}
    .cuanto strong{font-size:var(--r-text-note);white-space:nowrap}
    .cuanto small.fuera{color:var(--danger);font-weight:700}
    .sin-items{margin:0;color:var(--muted);font-size:var(--r-text-micro)}
    .empty{border:1px dashed var(--line);padding:var(--r-space-3);color:var(--muted);text-align:center}
    .report-footer{display:flex;justify-content:space-between;gap:var(--r-space-3);border-top:1px solid var(--line);margin-top:var(--r-print-gap-md);padding-top:var(--r-print-gap-xs);color:var(--muted);font-size:var(--r-text-micro)}
    .report-footer strong{color:var(--ink)}
    @page{size:A4;margin:0}
    @media print{body{background:var(--r-paper)}main{margin:0}section{break-inside:auto}.fila,.persona{break-inside:avoid}}
  </style>
</head>
<body>
<main>
  <header class="masthead">
    <div class="brand"><span class="mark">R</span><div><span class="eyebrow">Rumbo · cronograma publicado</span><h1>Plan de trabajo del equipo</h1><p>${aa}</p></div></div>
    <div class="metadata"><strong>${e(v(l.inicio))} — ${e(v(l.fin))}</strong><p>Detalle: ${e(U[D])}</p><p>Generado ${e(ra)}</p></div>
  </header>

  <section>
    <header><div><span class="section-kicker">01 · Plan visible</span><h2>Cronograma en la ventana publicada</h2></div><p>Barra por trabajo · rombo por compromiso · línea roja: hoy</p></header>
    ${x.length?`${Z}${x.map(W).join("")}`:'<div class="empty">No hay proyectos operativos en el alcance publicado.</div>'}
  </section>

  <section>
    <header><div><span class="section-kicker">02 · Agenda por persona</span><h2>Qué le espera a cada responsable</h2></div><p>Macros y micros abiertos en la ventana, con duración esperada</p></header>
    ${G.length?`<div class="agenda-grid">${G.map(X).join("")}</div>`:'<div class="empty">Ninguna persona tiene macros, micros ni entregables abiertos en la ventana publicada.</div>'}
  </section>

  <footer class="report-footer"><span><strong>Documento de lectura</strong> · publicado desde el cronograma de Rumbo</span><span>Refleja el estado operativo al momento de publicar; no reemplaza el workbench.</span></footer>
</main>
</body>
</html>`}export{ya as generarCronogramaPublicado,wa as nombreCronogramaPublicado};
