import{d as C,r as v,l as n,i as b,u as I,w as S,p as B,b as E,c as u,e as m,g as s,t as p,q as N,v as V,s as $,F as A,f as H,x as y,m as L,j as M,k as P,a as q}from"./index.735c4026.js";const G={class:"pb-10 grid g-2","data-page-index":""},K={class:"hero br-4 grid a-center j-center"},O={class:"f-emoji"},R={"data-select":""},W=s("option",{value:"movies"},"movies",-1),Q=s("option",{value:"series"},"series",-1),U=[W,Q],Y={class:"lh-1 mt-5 min-auto f-size-big f-round text-center mbl-7 pin-2"},J={key:0,class:"grid g-3 pin-5"},ee=C({props:{name:{type:String,default:"Ikuewumi"}},async setup(X){let g,h;v({movies:["Tenet","Thor: Ragnarok","La Llorona","The Tommorrow War","The Karate Kid"],series:["Queen of the South","Game Of Thrones","House Of The Dragon","Arrow","The Flash","Westworld"]});let t=v("movies");const x=n(()=>t.value==="series"?"Enjoy your tv shows":"Hub for all your movies");n(()=>t.value==="series"?"Enjoy your tv shows":"Hub for all your movies");const a=v({page:{movies:1,series:1},data:{movies:[],series:[]},increment:200,count:0});n({get(){return t.value==="movies"?a.value.data.movies:a.value.data.series},set(e){t.value==="movies"?a.value.data.movies=e:t.value==="series"&&(a.value.data.series=e)}});let i=n({get(){return t.value==="movies"?a.value.data.movies:a.value.data.series},set(e){t.value==="movies"?a.value.data.movies=e:t.value==="series"&&(a.value.data.series=e)}}),c=n({get(){return t.value==="movies"?a.value.page.movies:a.value.page.series},set(e){t.value==="movies"?a.value.page.movies=e:t.value==="series"&&(a.value.page.series=e)}});const k=b("title");b("wrapFn");const w=I(),f=async()=>{try{k("Index Page");const e=await q(`pages/index/${t.value}?page=${c.value}`);let r=e.data.filter(o=>!i.value.find(d=>d.imdbID===o.imdbID));i.value=[...i.value,...r],c.value=e.page,a.value.count=e.count}catch{}finally{}};[g,h]=S(()=>f()),await g,h();const T=e=>{var o;return((o=e.query)==null?void 0:o.t)==="series"?"series":"movies"},j=(e="")=>e==="movie"?"m":"s",_=()=>f(),D=n(()=>c.value*a.value.increment>=a.value.count),z=()=>(c.value+=1,_());return B(()=>{t.value=T(w)}),(e,r)=>{var d;const o=E("router-link");return u(),m("div",G,[s("section",K,[s("span",O,p(t.value==="movies"?"\u{1F39E}":"\u{1F4FA}"),1),s("div",R,[N(s("select",{name:"type","onUpdate:modelValue":r[0]||(r[0]=l=>t.value=l),onChange:_,class:"z-2 f-round weight-normal f-size-m-big"},U,544),[[V,t.value]])])]),s("h3",Y,p($(x)),1),(d=i.value)!=null&&d.length?(u(),m("ul",J,[(u(!0),m(A,null,H(i.value,(l,F)=>(u(),L(o,{to:`${j(l.Type)}/${l.imdbID}`,key:F,class:"pin-3 c-dark pbl-3 br-4 cursor f-size-medium"},{default:M(()=>[P(p(l.Title),1)]),_:2},1032,["to"]))),128))])):y("",!0),D.value?y("",!0):(u(),m("span",{key:1,role:"button",class:"w-fit min-auto cursor mt-7 pin-4 pbl-2 f-size-medium c-white bg-blue br-4",onClick:z},"See More"))])}}});export{ee as default};