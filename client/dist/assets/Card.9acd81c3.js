import{d as l,l as u,b as g,c as s,e as n,g as e,t as a,h as m,j as f,k as o,F as h,f as b}from"./index.be173f1f.js";const p={class:"card grid br-6 bg-gray-dt a-center j-center relative"},_={class:"type absolute f-emoji f-size-m-big bg-gray-t br-5 z-4 grid a-center j-center pin-2 pbl-2"},y=["src"],x={class:"content grid a-center g-1 pin-2 pbl-2 br-6 z-2 pb-4"},v={class:"f-size-normal"},w={class:"f-size-tiny lh-2"},j={class:"mt-1"},k=e("span",{class:"f-emoji"},"\u2B50",-1),z={class:"flex flex-wrap g-1 f-size-tiny mt-2"},N=l({props:{data:null},setup(t){const r=t,c=u(()=>r.data.Type==="movie"?"m":"s");return(F,B)=>{const d=g("router-link");return s(),n("div",p,[e("span",_,a(t.data.Type==="series"?"\u{1F4FA}":"\u{1F39E}"),1),e("img",{src:t.data.Poster,class:"br-6 z-1"},null,8,y),e("section",x,[m(d,{to:`${c.value}/${t.data.imdbID}`,class:"f-round f-size-a-big pbl-1 c-dark weight-bold"},{default:f(()=>[o(a(t.data.Title)+" ",1),e("small",v,a(t.data.Year),1)]),_:1},8,["to"]),e("p",w,a(t.data.Plot),1),e("div",j,[e("span",null,[k,o(" "+a(t.data.imdbRating),1)])]),e("div",z,[(s(!0),n(h,null,b(t.data.Genre,(i,C)=>(s(),n("span",{class:"pin-2 pbl-1 f-round br-3 bg-gray-l",key:i},a(i),1))),128))])])])}}});export{N as _};
