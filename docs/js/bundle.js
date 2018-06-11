!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){},function(e,t,n){"use strict";function a(e){return document.createElement(e)}Object.defineProperty(t,"__esModule",{value:!0}),Element.prototype.addClass=function(e){return this.classList.add(e),this},t.createListItem=function(){var e=a("li").addClass("taskfield__taskItem"),t=a("label").addClass("taskfield__itemTaskField"),n=a("input").addClass("taskfield__itemCheckbox"),o=a("span").addClass("taskfield__itemText"),i=a("div").addClass("taskfield__itemOptions"),r=a("span").addClass("taskfield__itemDate"),l=a("a").addClass("taskfield__itemEditButton"),s=a("a").addClass("taskfield__itemDeleteButton");return n.setAttribute("type","checkbox"),t.appendChild(n),t.appendChild(o),i.appendChild(r),i.appendChild(l),i.appendChild(s),e.appendChild(t),e.appendChild(i),e},t.createTooltip=function(){var e=a("div").addClass("taskfield__tooltip"),t=a("input").addClass("taskfield__tooltipInputField"),n=a("input").addClass("taskfield__tooltipChangeButton"),o=a("a").addClass("taskfield__tooltipCloseButton");return t.setAttribute("type","text"),n.setAttribute("type","submit"),e.appendChild(t),e.appendChild(n),e.appendChild(o),e}},function(e,t,n){"use strict";function a(){return JSON.parse(localStorage.getItem("tasks"))||[]}function o(e){localStorage.setItem("tasks",JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0}),t.getStorage=a,t.addToStorage=function(e){var t=a();t.push(e),o(t)},t.removeFromStorage=function(e){var t=a();t.forEach(function(t,n,a){t.creatingDate===e&&a.splice(n,1)}),o(t)},t.changeInStorage=function(e,t,n){var i=a();i.forEach(function(a){a.creatingDate===e&&(a.editingDate=n,a.text=t)}),o(i)},t.completeInStorage=function(e){var t=a();t.forEach(function(t){t.creatingDate===e&&(t.completed=!t.completed)}),o(t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getElement=function(e,t){switch(t){case"id":return document.getElementById(e);case"class":return document.getElementsByClassName(e)[0]}},t.removeElement=function(e){e.parentNode.removeChild(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function e(t){var n=t.creatingDate,a=t.text;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.creatingDate=+n,this.editingDate=this.creatingDate,this.text=a,this.completed=!1}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(4),r=(a=i)&&a.__esModule?a:{default:a},l=n(3),s=n(2),c=n(1);var u=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.htmlNode=(0,l.getElement)("taskfield__taskList","id"),this.tasks=(0,s.getStorage)(),this.formInput=(0,l.getElement)("inputfield__formInput","id"),this.formButton=(0,l.getElement)("inputfield__formButton","id"),this.formButton.onclick=function(){event.preventDefault(),t.addTask({creatingDate:new Date,text:t.formInput.value}),t.formInput.value=""},this.renderAll()}return o(e,[{key:"addTask",value:function(e){var t=new r.default(e);this._addToLocalSession(t),(0,s.addToStorage)(t),this.htmlNode.appendChild(this._createTaskNode((0,c.createListItem)(),t))}},{key:"_addToLocalSession",value:function(e){this.tasks.push(e)}},{key:"removeTask",value:function(e){this._removeFromLocalSession(e),(0,s.removeFromStorage)(e)}},{key:"_removeFromLocalSession",value:function(e){this.tasks.forEach(function(t,n,a){t.creatingDate===e&&a.splice(n,1)})}},{key:"changeTask",value:function(e,t,n){this._changeTaskInLocalSession(e,t,n),(0,s.changeInStorage)(e,t,n)}},{key:"_changeTaskInLocalSession",value:function(e,t,n){this.tasks.forEach(function(a){a.creatingDate===e&&(a.editingDate=n,a.text=t)})}},{key:"completeTask",value:function(e){this._completeTaskInLocalSession(e),(0,s.completeInStorage)(e)}},{key:"_completeTaskInLocalSession",value:function(e){this.tasks.forEach(function(t){t.creatingDate===e&&(t.completed=!t.completed)})}},{key:"_createTaskNode",value:function(e,t){var n=this,a=e.querySelector(".taskfield__itemCheckbox"),o=e.querySelector(".taskfield__itemText"),i=e.querySelector(".taskfield__itemEditButton"),r=e.querySelector(".taskfield__itemDeleteButton");return t.completed&&a.setAttribute("checked","checked"),e.setAttribute("data-creatingDate",t.creatingDate),o.textContent=t.text,i.textContent="Edit",r.textContent="+",a.onclick=function(){var e=+event.target.parentNode.parentNode.getAttribute("data-creatingDate");n.completeTask(e)},i.onclick=function(e){e.preventDefault(),e.target.parentNode.parentNode.appendChild(n._createTooltipNode((0,c.createTooltip)(),o.textContent))},r.onclick=function(e){e.preventDefault();var t=e.target.parentNode.parentNode,a=+t.getAttribute("data-creatingDate");n.removeTask(a),(0,l.removeElement)(t)},e}},{key:"_createTooltipNode",value:function(e,t){var n=this,a=e.querySelector(".taskfield__tooltipInputField"),o=e.querySelector(".taskfield__tooltipChangeButton"),i=e.querySelector(".taskfield__tooltipCloseButton");return a.setAttribute("placeholder","I have changed my mind ..."),a.value=t,o.value="Change",i.textContent="+",o.onclick=function(e){var t=+new Date,a=e.target.parentNode,o=a.querySelector(".taskfield__tooltipInputField").value;n.changeTask(+a.parentNode.getAttribute("data-creatingDate"),o,t),a.parentNode.querySelector(".taskfield__itemText").textContent=o,(0,l.removeElement)(a)},i.onclick=function(e){var t=e.target.parentNode;(0,l.removeElement)(t)},e}},{key:"renderAll",value:function(){var e=this;this.tasks.forEach(function(t){e.htmlNode.appendChild(e._createTaskNode((0,c.createListItem)(),t))})}}]),e}();t.default=u},function(e,t,n){"use strict";var a,o=n(5);new((a=o)&&a.__esModule?a:{default:a}).default;console.log("start")},function(e,t,n){n(6),e.exports=n(0)}]);
//# sourceMappingURL=bundle.js.map