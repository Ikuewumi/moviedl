import{d as j,y as U,E as C,G as B,H as E,r as g,l as N,i as V,p as F,b as S,c as u,e as m,s as n,g as e,q as b,B as y,t as _,x as v,A as D,h as I,j as M,F as A,I as G,J as T,K as $}from"./index.be173f1f.js";const q={key:0,class:"","data-page-edit-profile":""},H=e("h3",{class:"lh-1 mt-5 min-auto f-size-big f-round mbl-7 pin-2 c-dark","data-form":""},"Edit Profile",-1),J=["onSubmit"],K={class:"field"},L=e("span",{class:"f-emoji f-size-bigger"},"\u{1F464}",-1),R={class:"field"},O=e("span",{class:"f-emoji f-size-bigger"},"\u2139",-1),Q={class:"field"},W=e("span",{class:"f-emoji f-size-bigger"},"\u{1F5BC}",-1),X={key:0,class:"field cover relative"},Y=["src"],Z=e("p",{class:"mt-4 c-gray-l underline f-round f-size-m-big"},"Profile Image",-1),ee=e("button",{type:"submit",class:"f-round pbl-4 mt-3 f-size-a-big cursor br-2"},"Save",-1),te={class:"grid a-center j-center"},ae={key:0,class:"profile-pic grid a-center j-center br-6"},se=["src"],oe={class:"lh-1 mt-2 min-auto f-size-big f-round"},ie={key:1,class:"lh-2 mt-2 min-auto f-size-normal"},de=j({setup(re){const i=U(),l=C(),d=B(),w=E(),h=g(!1),r=g(""),f=g(""),c=g(""),s=N(()=>({name:f.value,description:c.value,img:r.value})),z=V("title");F(async()=>{var a,t,p;try{l.start("Getting User Credentials"),await i.refreshUser(),f.value=(a=i.getUser.name)!=null?a:"",c.value=(t=i.getUser.description)!=null?t:"",r.value=(p=i.getUser.img)!=null?p:""}catch(o){d.show(o,!0)}finally{l.stop()}});const k=async a=>{try{const t=await G(a.target);t&&(t.onload=()=>r.value=t.result)}catch(t){d.show(t,!0)}},x=async()=>{try{await T(s.value.name),h.value=!0}catch(a){d.show(a,!0)}finally{l.stop()}},P=async()=>{try{l.start("Updating Profile");const a=await $("user",s.value);d.show(a.msg),await i.refreshUser(),w.push("/you")}catch(a){d.show(a,!0)}finally{l.stop()}};return z("Edit Profile"),(a,t)=>{const p=S("my-preview");return u(),m(A,null,[n(i).getUser.name?(u(),m("div",q,[H,e("form",{class:"min-auto grid g-3 a-center mt-5 mb-7","data-form":"",onSubmit:D(x,["prevent"])},[e("div",K,[L,b(e("input",{type:"text",name:"name",placeholder:"Name...",class:"f-size-medium","onUpdate:modelValue":t[0]||(t[0]=o=>f.value=o)},null,512),[[y,f.value]])]),e("div",R,[O,b(e("textarea",{type:"text",name:"about",placeholder:"About me...",class:"f-size-medium","onUpdate:modelValue":t[1]||(t[1]=o=>c.value=o)},_(c.value),513),[[y,c.value]])]),e("div",null,[e("div",Q,[W,e("input",{type:"file",onChange:k,name:"profile",placeholder:"Name...",class:"f-size-medium"},null,32)]),r.value?(u(),m("div",X,[e("img",{src:r.value},null,8,Y),e("span",{class:"close f-emoji absolute cursor",onClick:t[2]||(t[2]=o=>r.value="")},"\u274C"),Z])):v("",!0)]),ee],40,J)])):v("",!0),I(p,{show:h.value,onClose:t[3]||(t[3]=o=>h.value=!1),onDone:P},{body:M(()=>[e("div",te,[n(s).img?(u(),m("div",ae,[e("img",{src:n(s).img,alt:"Profile Picture"},null,8,se)])):v("",!0),e("h1",oe,_(n(s).name),1),n(s).description?(u(),m("p",ie,_(n(s).description),1)):v("",!0)])]),_:1},8,["show"])],64)}}});export{de as default};