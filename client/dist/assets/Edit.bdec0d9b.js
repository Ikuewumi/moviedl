import{d as R,G as j,E as B,u as G,l as o,o as K,r as v,i as b,w as q,H as z,c,e as F,g as w,h as L,j as Y,M as H,m as x,x as A,K as U,k as W,L as J,a as O}from"./index.be173f1f.js";import{_ as Q,a as X,b as Z}from"./Links.54e4d978.js";import{_ as ee}from"./Metadata.0bc40099.js";const ae={key:0},te={class:"grid g-4","data-component-metadata":""},se={class:"mbl-7"},ie=W(" Put in a new link and `enter` to replace the image "),ue=R({async setup(ne){let p,f;const u=j(),l=B(),d=G(),m=o(()=>{var t;let a;switch((t=d.query)==null?void 0:t.type){case"series":case"s":a="series";break;case"movies":case"m":default:a="movies";break}return a});K();const k=o(()=>{var a,t;return e.value?((t=(a=e.value)==null?void 0:a._id)==null?void 0:t.length)===24:!1}),S=o(()=>({Poster:n.value.poster,Plot:e.value.Plot,Title:e.value.Title,Year:e.value.Year,imdbRating:e.value.imdbRating,Genre:e.value.Genre,Actors:e.value.Actors}));o(()=>`../../src/assets/img${Math.floor(Math.random()*15)}.jpg`);let n=v({poster:"",showPreview:!1,p_show(){n.value.showPreview=!0},p_hide(){n.value.showPreview=!1}}),e=v({});const g=b("title");let i=v({poster:""});const y=()=>{var t;const a=((t=i.value)==null?void 0:t.poster)>""?i.value.poster:e.value.Poster;return n.value.poster=a,a},T=async()=>{var a,t;try{l.start("Loading Data..."),await J((a=d.query)==null?void 0:a.imdbid),e.value=await O(`admin/${m.value}/${(t=d.query)==null?void 0:t.imdbid}`,!0),g("Edit Page - "+e.value.Title),i.value.poster=y()}catch(s){u.show(s,!0)}finally{l.stop()}};[p,f]=q(()=>T()),await p,f(),g("Edit Page");const C=async()=>{try{if(i.value.poster==="")throw Error("invalid image!");l.start("Loading image....");const a=await fetch(i.value.poster);if(!a.ok)throw Error("Something went wrong");if(!(await a.blob()).type.startsWith("image"))throw Error("The provided url does not lead to an image");y(),u.show("Image updated!")}catch(a){u.show(a,!0)}finally{l.stop()}};function I(a){if(e.value.Type==="series"&&e.value.SeriesLinks&&Array.isArray(e.value.SeriesLinks)&&a.type==="series"){const t=e.value.SeriesLinks.findIndex(s=>s.season===a.seasonNumber);if(t===-1)return!1;e.value.SeriesLinks[t].links.push({type:"480p",id:"episode",number:1,links:[]})}}function N(a,t){if(e.value.Type==="series"&&e.value.SeriesLinks&&Array.isArray(e.value.SeriesLinks)&&t.type==="series"&&Number.isInteger(t.index)){const s=e.value.SeriesLinks.findIndex(r=>r.season===t.seasonNumber);if(s===-1)return!1;e.value.SeriesLinks[s].links[t.index]=a}}function P(a){if(e.value.Type==="series"&&a.type==="series"&&Number.isInteger(a.index)&&Number.isInteger(a.seasonNumber)){const t=e.value.SeriesLinks.findIndex(s=>s.season===a.seasonNumber);if(t===-1)return!1;e.value.SeriesLinks[t].links=e.value.SeriesLinks[t].links.filter((s,r)=>r!==a.index)}}const $=a=>{var t;e.value.Type==="movie"&&a.type==="movie"&&((t=e.value.MovieLinks)==null||t.push({type:"480p",links:[]}))},E=a=>{e.value.Type==="movie"&&a.type==="movie"&&Number.isInteger(a.index)&&(e.value.MovieLinks=e.value.MovieLinks.filter((t,s)=>s!==(a==null?void 0:a.index)))},M=(a,t)=>{var s;e.value.Type==="movie"&&t.type==="movie"&&Number.isInteger(t.index)&&(e.value.MovieLinks[(s=t==null?void 0:t.index)!=null?s:0]=a)},V=b("wrapFn"),D=z(),h=async a=>{if(!Array.isArray(_.value))return;await V("Saving movie data...",()=>U(`admin/${m.value}/${e.value.imdbID}`,{img:n.value.poster,links:_.value}));const t=m.value==="series"?"s":"m";D.push(`/${t}/${e.value.imdbID}`)},_=o(()=>{if(!!k.value){if(e.value.Type==="movie")return e.value.MovieLinks;if(e.value.Type==="series")return e.value.SeriesLinks}});return(a,t)=>{var s;return k.value?(c(),F("div",ae,[w("div",te,[L(ee,{data:S.value},null,8,["data"]),w("div",se,[L(Q,{name:"img",modelValue:i.value.poster,"onUpdate:modelValue":t[0]||(t[0]=r=>i.value.poster=r),p:"Enter image link",label:"Image",onKeypress:H(C,["enter"])},{about:Y(()=>[ie]),_:1},8,["modelValue","onKeypress"])])]),((s=e.value)==null?void 0:s.Type)==="movie"?(c(),x(X,{key:0,data:e.value,linksArray:e.value.MovieLinks,onAddLink:$,onCustomChange:M,onCustomSave:h,onCustomDelete:E},null,8,["data","linksArray"])):e.value.Type==="series"?(c(),x(Z,{key:1,data:e.value,linksArray:e.value.SeriesLinks,onAddLink:I,onCustomChange:N,onCustomSave:h,onCustomDelete:P},null,8,["data","linksArray"])):A("",!0)])):A("",!0)}}});export{ue as default};
