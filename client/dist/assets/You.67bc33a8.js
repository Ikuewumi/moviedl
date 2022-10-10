import{_ as g,b as m,c as t,e as s,g as a,h as d,j as r,k as n,d as _,y as h,z as f,i as x,s as i,t as c,x as l,m as b}from"./index.735c4026.js";const v={},y={class:"mbl-10 pbl-5 grid g-4","data-c-admin-panel":"","data-padded":""},w=a("h1",{class:"f-size-big f-round c-gray-l text-center"},[n("admin"),a("span",{class:"c-blue f-round case-upper"},"panel")],-1),k={class:"panel-container g-3"},z={"data-panel":"",class:"grid g-2"},$=a("h3",{class:"f-size-a-big f-round c-blue weight-normal flex a-center g-1"},[a("span",{class:"f-e f-size-small lh-1"},"\u2795"),n(" Creation ")],-1),j=a("p",{class:"f-size-medium lh-1"},"Create your own movies or tv-shows",-1),U={"data-card-list":"",class:"g-2 grid"},C=a("span",{class:"f-emoji img"},"\u{1F39E}",-1),q=a("p",null,"Movie",-1),B=a("span",{class:"f-emoji img"},"\u{1F4FA}",-1),M=a("p",null,"Series",-1),N={"data-panel":"",class:"grid g-2"},R=a("h3",{class:"f-size-a-big f-round c-blue weight-normal flex a-center g-1"},[a("span",{class:"f-e f-size-small lh-1"},"\u2754"),n(" Requests ")],-1),A=a("p",{class:"f-size-medium lh-1"},"Check the requests",-1),V={"data-card-list":"",class:"g-2 grid"},P=a("span",{class:"f-emoji img"},"\u2754",-1),D=a("p",null,"All Requests",-1),F=a("span",{class:"f-emoji img"},"\u2754",-1),L=a("p",null,"Make a Request",-1);function S(p,e){const o=m("router-link");return t(),s("div",y,[w,a("div",k,[a("div",z,[$,j,a("ul",U,[d(o,{to:"/start?type=movie",class:"grid g-3","data-card":""},{default:r(()=>[C,q]),_:1}),d(o,{to:"/start?type=series",class:"grid g-3","data-card":""},{default:r(()=>[B,M]),_:1})])]),a("div",N,[R,A,a("ul",V,[d(o,{to:"/admin/requests",class:"grid g-3","data-card":""},{default:r(()=>[P,D]),_:1}),d(o,{to:"/request",class:"grid g-3","data-card":""},{default:r(()=>[F,L]),_:1})])])])])}var E=g(v,[["render",S]]);const I={class:"pbl-9 grid g-3","data-page-you":""},T={class:"grid g-2 a-center p-center text-center pin-5"},W={class:"profile-pic br-6 grid a-center j-center min-auto"},Y=["src"],G={key:1,class:"f-emoji"},H={class:"lh-1 mt-2 min-auto f-size-big f-round flex a-center j-center g-2"},J={key:0,class:"admin"},K={key:0,class:"lh-2 mt-2 min-auto f-size-normal"},O={class:"mt-6 f-size-m-big"},Q=a("span",{class:"f-emoji"},"\u270F",-1),X=n(" edit profile "),Z={key:1,class:"f-size-medium mt-8"},aa=a("p",{class:"text-center"},[n("Want to become an admin? Contact the author at "),a("b",null,"ayobamsik@gmail.com")],-1),ea=[aa],na=_({setup(p){const e=h();return f(e.refreshUser),x("title")("My Profile"),(ta,ia)=>{const u=m("RouterLink");return t(),s("div",I,[a("section",T,[a("div",W,[i(e).getUser.img?(t(),s("img",{key:0,src:i(e).getUser.img,alt:""},null,8,Y)):(t(),s("span",G,"\u{1F464}"))]),a("h1",H,[n(c(i(e).getUser.name)+" ",1),i(e).getUser.admin?(t(),s("span",J,"ADMIN")):l("",!0)]),i(e).getUser.description?(t(),s("p",K,c(i(e).getUser.description),1)):l("",!0),a("div",O,[d(u,{class:"pbl-2 pin-4 bg-gray-l c-gray-d br-6",to:"/edit-profile"},{default:r(()=>[Q,X]),_:1})])]),i(e).getUser.admin?(t(),b(E,{key:0})):(t(),s("div",Z,ea))])}}});export{na as default};