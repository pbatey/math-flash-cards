(this["webpackJsonpflash-cards"]=this["webpackJsonpflash-cards"]||[]).push([[0],{13:function(e,a,t){},14:function(e,a,t){},16:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),s=t(6),r=t.n(s),o=(t(13),t(4)),l=t(1),i=(t(14),t(7)),m=t.n(i),u=["001-ufo.svg","004-ufo.svg","007-alien.svg","010-alien.svg","013-alien.svg","016-spaceship.svg","019-spaceship.svg","022-alien.svg","025-blaster.svg","028-alien.svg","002-spaceship.svg","005-alien.svg","008-ufo.svg","011-spaceship.svg","014-ufo.svg","017-alien.svg","020-ufo.svg","023-ufo.svg","026-spaceship.svg","029-abduction.svg","003-radar.svg","006-ufo.svg","009-spaceship.svg","012-alien.svg","015-wormhole.svg","018-scan.svg","021-alien.svg","024-top","secret.svg","027-alien.svg","030-spaceship.svg"],v=function(e){var a=e.i,t=e.isNew,s=Object(n.useRef)();return Object(n.useEffect)((function(){t&&s.current.scrollIntoView({behavior:"smooth"})}),[t]),c.a.createElement("img",{ref:s,src:"./awards/".concat(u[a%u.length]),className:"".concat(t&&"new"," award ").concat(a)})},g={angle:90,spread:"90",startVelocity:"50",elementCount:"75",dragFriction:.12,duration:"5000",stagger:3,width:"10px",height:"10px",perspective:"500px",colors:["#cd3e44","#b7651e","#c4a71b","#0f885b","#0f8187","#1176b8","#5161a2","#e3477c"]},f=0,h=12,d=["+"],p=3,b=!0,w=["red","orange","yellow","green","cyan","blue","purple","pink"];var E=function(e){return e.i<e.numCorrect?c.a.createElement("span",{className:"star"},"\u2605"):c.a.createElement("span",{className:"dot"},"\xb7")},N=function(){var e=f,a=h,t=d,s=p,r=b,i=w,u={"*":c.a.createElement("span",null,"\xd7"),"/":c.a.createElement("span",null,"\xf7"),"+":"+","-":"-"},N=function(){return Math.floor(Math.random()*(a-e))+e},O=function(){var e=N(),a=t[Math.floor(Math.random()*t.length)],n=N();if(r&&"-"==a&&n>e){var c=[n,e];e=c[0],n=c[1]}if("/"==a){if(0==e&&0==n&&(n=1),0==n){var s=[n,e];e=s[0],n=s[1]}var o=[e*n,n];e=o[0],n=o[1]}return[e,a,n]},j=function(e){console.log("randomColor",e,i);var a=e?i.indexOf[e]:0,t=Math.floor(Math.random()*(i.length-1)),n=((a||0)+t)%i.length,c=i[n];return console.log("last",a,"r",t,"next",n,"c",c),c},y=Object(n.useState)(O()),k=Object(l.a)(y,2),x=Object(l.a)(k[0],3),C=x[0],S=x[1],M=x[2],A=k[1],F=new Function("x","y","return x ".concat(S," y;")),I=F(C,M),B=Object(n.useState)(""),J=Object(l.a)(B,2),K=J[0],R=J[1],V=Object(n.useState)(0),W=Object(l.a)(V,2),q=W[0],D=W[1],G=Object(n.useState)(0),T=Object(l.a)(G,2),Y=T[0],$=T[1],z=Object(n.useState)(!1),H=Object(l.a)(z,2),L=H[0],P=H[1],Q=Object(n.useState)(""),U=Object(l.a)(Q,2),X=U[0],Z=U[1],_=Object(n.useState)(j()),ee=Object(l.a)(_,2),ae=ee[0],te=ee[1],ne=F(a,a);"-"==S&&(ne=F(a,e)*(r?1:-1)),"/"==S&&(ne=a);var ce=(""+ne).length,se=function(e){e==I?(D(q+1),Z("Yes, That's Right!"),q+1==s&&$(Y+1)):(D(0),Z("Nope! It's ".concat(I))),P(!0)},re=function(){A(O()),R(""),Z(""),P(!1),te(j(ae)),q==s&&D(0)},oe=!L&&K.length>0&&F(a,a)>=10,le=K==I?"correct":"incorrect";return c.a.createElement("div",{className:"App",onKeyDown:function(e){return function(e){e=e||window.event,console.log("onKey",e);var a=e.keyCode||e.which;if(13==a&&K.length>0)X.length>0?re():se(K);else if((8==a||46==a)&&K.length>0)R(K.substr(0,K.length-1));else if(a=String.fromCharCode(a),r||"-"!=a&&"+"!=a){/[0-9]|\./.test(a)&&K.length<ce&&R(K+a)}else"-"==K[0]?R(K.substr(1)):"+"!=a&&R(a+K)}(e)},onClick:function(){oe&&se(K),L&&re()},tabIndex:"0"},c.a.createElement("header",{className:"App-header"},c.a.createElement("div",{className:"".concat(ae," card")},c.a.createElement("div",{className:"message ".concat(le)},X),c.a.createElement("div",{className:"question"},c.a.createElement("div",{className:"first line"},c.a.createElement("span",{className:"x"},C)),c.a.createElement("div",{className:"second line"},c.a.createElement("span",{className:"operator"},u[S])," ",c.a.createElement("span",{className:"y"},M))),c.a.createElement("div",{className:"answer line"},K),oe&&c.a.createElement("div",{className:"action confirmAnswer"},"Go!"),L&&c.a.createElement("div",{className:"action nextCard"},"Next Card"),!L&&!oe&&c.a.createElement("div",{className:"action none"},"\xa0")),c.a.createElement("div",{className:"score"},c.a.createElement(m.a,{className:"confetti",active:q==s,config:g}),Object(o.a)(Array(s)).map((function(e,a){return c.a.createElement(E,{key:a,i:a,numCorrect:q})}))),c.a.createElement("div",{className:"awards"},Object(o.a)(Array(Y)).map((function(e,a){return c.a.createElement(v,{key:a,i:a,isNew:a==Y-1})}))),c.a.createElement("div",{className:"attribution"},"Icons made by ",c.a.createElement("a",{href:"https://www.flaticon.com/authors/freepik",title:"Freepik"},"Freepik")," from ",c.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,a,t){e.exports=t(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.d1fdf1d0.chunk.js.map