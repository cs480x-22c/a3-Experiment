import{S as y,i as b,s as _,e as p,c as F,a as x,d as m,b as k,g as A,K as h,v as w,L as f,M as G}from"./vendor-e9c82601.js";function M(n){let t;return{c(){t=p("div"),this.h()},l(i){t=F(i,"DIV",{class:!0}),x(t).forEach(m),this.h()},h(){k(t,"class","vis svelte-p88dv4")},m(i,r){A(i,t,r),n[5](t)},p:h,i:h,o:h,d(i){i&&m(t),n[5](null)}}}function S(n,t,i){let r,{data:l}=t,{comp1:o}=t,{comp2:d}=t,{hoverable:c=!0}=t,u;w(()=>{r=f(".vis").append("svg"),r.attr("viewBox",[-5,0,64,120]).style("height","inherit"),v()});let v=()=>{if(r){r.selectAll("*").remove();let e=r.selectAll("group").data(l).enter().append("g").on("mouseover",function(a,s){c&&f(this).selectAll("#guide").style("visibility","visible")}).on("mouseout",function(a,s){c&&f(this).selectAll("#guide").style("visibility","hidden")});e.append("rect").attr("x",(a,s)=>s*10).attr("y",function(a){return 100-a}).attr("width",8).attr("height",function(a){return a}).attr("fill",(a,s)=>o==s?"#0000FF":d==s?"#FF0000":"#FFFFFF").attr("stroke","black"),e.append("line").attr("id","guide").attr("x1",0).attr("x2",10*l.length-1).attr("y1",a=>100-a).attr("y2",a=>100-a).attr("stroke","red").style("visibility","hidden")}};function g(e){G[e?"unshift":"push"](()=>{u=e,i(0,u)})}return n.$$set=e=>{"data"in e&&i(1,l=e.data),"comp1"in e&&i(2,o=e.comp1),"comp2"in e&&i(3,d=e.comp2),"hoverable"in e&&i(4,c=e.hoverable)},n.$$.update=()=>{n.$$.dirty&2&&v()},[u,l,o,d,c,g]}class q extends y{constructor(t){super();b(this,t,S,M,_,{data:1,comp1:2,comp2:3,hoverable:4})}}export{q as G};
