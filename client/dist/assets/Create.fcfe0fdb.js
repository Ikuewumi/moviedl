import{d as R,G as j,E as B,u as G,l as o,r as v,i as b,w as q,o as K,H as z,c,e as F,g as w,h as L,j as Y,M as H,m as x,x as C,C as U,k as W,L as J,a as O}from"./index.735c4026.js";import{_ as Q,a as X,b as Z}from"./Links.60af5c80.js";import{_ as ee}from"./Metadata.9e4a79f6.js";const ae={key:0},te={class:"grid g-4","data-component-metadata":""},se={class:"mbl-7"},ie=W(" Put in a new link and `enter` to replace the image "),ue=R({async setup(ne){let p,f;const u=j(),l=B(),d=G(),m=o(()=>{var t;let e;switch((t=d.query)==null?void 0:t.type){case"series":case"s":e="series";break;case"movies":case"m":default:e="movies";break}return e}),k=o(()=>{var e,t;return a.value?((t=(e=a.value)==null?void 0:e._id)==null?void 0:t.length)===24:!1}),A=o(()=>{var e,t;return{Poster:n.value.poster,Plot:a.value.Plot,Title:a.value.Title,Year:a.value.Year,imdbRating:a.value.imdbRating,Genre:(e=a.value.Genre)==null?void 0:e.split(",").map(s=>s.trim()),Actors:(t=a.value.Actors)==null?void 0:t.split(",").map(s=>s.trim())}});o(()=>`../../src/assets/img${Math.floor(Math.random()*15)}.jpg`);let n=v({poster:"",showPreview:!1,p_show(){n.value.showPreview=!0},p_hide(){n.value.showPreview=!1}}),a=v({});const g=b("title");let i=v({poster:""});const y=()=>{var t;const e=((t=i.value)==null?void 0:t.poster)>""?i.value.poster:a.value.Poster;return n.value.poster=e,e},S=async()=>{var e,t;try{l.start("Loading Data..."),await J((e=d.query)==null?void 0:e.imdbid),a.value=await O(`omdb/${m.value}/${(t=d.query)==null?void 0:t.imdbid}`,!0),g("Create Page - "+a.value.Title),i.value.poster=y()}catch(s){u.show(s,!0)}finally{l.stop()}};[p,f]=q(()=>S()),await p,f(),g("Create Page");const T=async()=>{try{if(i.value.poster==="")throw Error("invalid image!");l.start("Loading image....");const e=await fetch(i.value.poster);if(!e.ok)throw Error("Something went wrong");if(!(await e.blob()).type.startsWith("image"))throw Error("The provided url does not lead to an image");y(),u.show("Image updated!")}catch(e){u.show(e,!0)}finally{l.stop()}};function I(e){if(a.value.Type==="series"&&a.value.SeriesLinks&&Array.isArray(a.value.SeriesLinks)&&e.type==="series"){const t=a.value.SeriesLinks.findIndex(s=>s.season===e.seasonNumber);if(t===-1)return!1;a.value.SeriesLinks[t].links.push({type:"480p",id:"episode",number:1,links:[]})}}function N(e,t){if(a.value.Type==="series"&&a.value.SeriesLinks&&Array.isArray(a.value.SeriesLinks)&&t.type==="series"&&Number.isInteger(t.index)){const s=a.value.SeriesLinks.findIndex(r=>r.season===t.seasonNumber);if(s===-1)return!1;a.value.SeriesLinks[s].links[t.index]=e}}function P(e){if(a.value.Type==="series"&&e.type==="series"&&Number.isInteger(e.index)&&Number.isInteger(e.seasonNumber)){const t=a.value.SeriesLinks.findIndex(s=>s.season===e.seasonNumber);if(t===-1)return!1;a.value.SeriesLinks[t].links=a.value.SeriesLinks[t].links.filter((s,r)=>r!==e.index)}}K(e=>console.error(e));const $=e=>{var t;a.value.Type==="movie"&&e.type==="movie"&&((t=a.value.MovieLinks)==null||t.push({type:"480p",links:[]}))},M=e=>{a.value.Type==="movie"&&e.type==="movie"&&Number.isInteger(e.index)&&(a.value.MovieLinks=a.value.MovieLinks.filter((t,s)=>s!==(e==null?void 0:e.index)))},E=(e,t)=>{var s;a.value.Type==="movie"&&t.type==="movie"&&Number.isInteger(t.index)&&(a.value.MovieLinks[(s=t==null?void 0:t.index)!=null?s:0]=e)},V=b("wrapFn"),D=z(),h=async e=>{if(!Array.isArray(_.value))return;await V("Saving movie data...",()=>U(`admin/${m.value}/${a.value.imdbID}`,{img:n.value.poster,links:_.value}));const t=m.value==="series"?"s":"m";D.push(`/${t}/${a.value.imdbID}`)},_=o(()=>{if(!!k.value){if(a.value.Type==="movie")return a.value.MovieLinks;if(a.value.Type==="series")return a.value.SeriesLinks}});return(e,t)=>{var s;return k.value?(c(),F("div",ae,[w("div",te,[L(ee,{data:A.value},null,8,["data"]),w("div",se,[L(Q,{name:"img",modelValue:i.value.poster,"onUpdate:modelValue":t[0]||(t[0]=r=>i.value.poster=r),p:"Enter image link",label:"Image",onKeypress:H(T,["enter"])},{about:Y(()=>[ie]),_:1},8,["modelValue","onKeypress"])])]),((s=a.value)==null?void 0:s.Type)==="movie"?(c(),x(X,{key:0,data:a.value,linksArray:a.value.MovieLinks,onAddLink:$,onCustomChange:E,onCustomSave:h,onCustomDelete:M},null,8,["data","linksArray"])):a.value.Type==="series"?(c(),x(Z,{key:1,data:a.value,linksArray:a.value.SeriesLinks,onAddLink:I,onCustomChange:N,onCustomSave:h,onCustomDelete:P},null,8,["data","linksArray"])):C("",!0)])):C("",!0)}}});export{ue as default};
