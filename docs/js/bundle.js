!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){},function(t,e,n){"use strict";function i(){return JSON.parse(localStorage.getItem("tasks"))}function a(t){localStorage.setItem("tasks",JSON.stringify(t))}function d(t){var e=t||i(),n="0";_.innerHTML="",0!==e.length?(e.forEach(function(t,e){if(e>=k&&e<k+x){for(var i=!1,a=0;a<_.length;a++){var d=_[a];t.id===+d.getAttribute("id")&&(t.edited!==+d.getAttribute("data-edited")||t.text!==d.getElementsByClassName("taskfield__itemText")[0].textContent?_.replaceChild(p(t),d):i=!0)}i||(_.appendChild(p(t)),t.isComplete||n++)}}),b.textContent=n):_.innerHTML="You don't have any tasks"}function o(t){var e=i();e.sort(function(e,n){return e[t]>n[t]?1:-1}),d(e)}function l(){var t=i().length,e=Math.ceil(t/x),n=1,a=0;C.innerHTML="";for(var d=0;d<e;d++)C.appendChild(c({number:n++,index:a})),a+=x}function c(t){var e=document.createElement("li");return e.classList.add("taskfield__page"),e.textContent=t.number,e.onclick=function(){k=t.index,d()},e}var r=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e.id,this.text=e.text,this.isComplete=!1,this.edited=this.id};function u(){var t=this.parentNode,e=i();e.forEach(function(e,n,i){e.id===+t.getAttribute("id")&&i.splice(n,1)}),a(e),d(),l(),event.preventDefault()}function s(){i();var t,e,n,o,l=this.parentNode,c=l.getElementsByClassName("taskfield__itemText")[0].textContent,r=(t=c,e=document.createElement("div"),n=document.createElement("input"),o=document.createElement("input"),e.classList.add("tooltip"),n.classList.add("tooltip__inputField"),n.setAttribute("type","text"),n.setAttribute("placeholder","I changed my ming ..."),n.setAttribute("value",t||""),o.classList.add("tooltip__inputButton"),o.setAttribute("type","submit"),o.value="Change",o.onclick=function(){var t=o.parentNode.parentNode,e=i();e.forEach(function(e){e.id===+t.getAttribute("id")&&(e.text=n.value,e.edited=+new Date)}),a(e),d()},e.appendChild(n),e.appendChild(o),e);l.appendChild(r)}function f(){var t=this.parentNode.parentNode,e=i();e.forEach(function(e){e.id===+t.getAttribute("id")&&(e.isComplete=!e.isComplete)}),a(e),d()}function p(t){var e=document.createElement("li"),n=document.createElement("label"),i=document.createElement("input"),a=document.createElement("span"),d=document.createElement("span"),o=document.createElement("a"),l=document.createElement("a");return e.classList.add("taskfield__item"),e.setAttribute("id",t.id),e.setAttribute("data-edited",t.edited),n.classList.add("taskfield__itemLabel"),i.classList.add("taskfield__itemCheckbox"),i.setAttribute("type","checkbox"),t.isComplete&&i.setAttribute("checked","checked"),a.classList.add("taskfield__itemText"),a.textContent=t.text,d.classList.add("taskfield__itemDate"),d.textContent=new Date(t.id).getDate()+"."+(+new Date(t.id).getMonth()+1)+"."+new Date(t.id).getFullYear(),l.classList.add("taskfield__itemDelete"),l.textContent="+",o.classList.add("taskfield__itemEdit"),o.textContent="Edit",i.onclick=f,l.onclick=u,o.onclick=s,n.appendChild(i),n.appendChild(a),e.appendChild(n),e.appendChild(d),e.appendChild(o),e.appendChild(l),e}var m=document.getElementById("inputfield__input"),h=document.getElementById("inputfield__button"),_=document.getElementById("taskfield__list"),b=document.getElementById("taskfield__headerValue"),g=document.getElementById("button__byDate"),v=document.getElementById("button__alphabetically"),y=document.getElementById("button__byEditingDate"),E=document.getElementById("searchfield__input"),k=0,x=3,C=document.getElementById("taskfield__pageList");h.addEventListener("click",function(t){if(t.preventDefault(),m.value){var e,n,o=+new Date,c=new r({text:m.value,id:o});e=c,(n=i())?(n.push(e),a(n),l()):a([e]),m.value="",d()}else alert("To do nothing is a task too. Maybe.")}),g.onclick=function(){o("id")},v.onclick=function(){o("text")},y.onclick=function(){o("edited")},E.onkeyup=function(){var t=i(),e=[];""!==E.value?(t.forEach(function(t){t.text.split("").slice(0,E.value.length).join("")===E.value&&e.push(t)}),d(e)):d()},d()},function(t,e,n){n(1),t.exports=n(0)}]);
//# sourceMappingURL=bundle.js.map