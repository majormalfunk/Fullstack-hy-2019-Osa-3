(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(39)},37:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(11),u=t.n(l),c=t(2),o=t(3),i=t.n(o),m="/api/persons",s=function(){return i.a.get(m).then(function(e){return e.data})},d=function(e){return i.a.post(m,e).then(function(e){return e.data})},f=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},p=function(e){return i.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},E=function(e){return null!==e.message&&""!==e.message?"error"===e.class?r.a.createElement("div",{className:"error"},e.message):r.a.createElement("div",{className:"success"},e.message):null},b=function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.person.name),r.a.createElement("td",null,e.person.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return e.doRemove(e.person.id,e.person.name)}},"Poista")))},h=function(e){var n=e.persons.filter(function(n){return n.name.toUpperCase().includes(e.nameFilter.toUpperCase())});return r.a.createElement(r.a.Fragment,null,n.map(function(n){return r.a.createElement(b,{key:n.id,person:n,doRemove:e.doRemove,handleRemoving:e.handleRemoving})}))},g=function(e){return r.a.createElement("form",{onSubmit:e.addName},r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Nimi:"),r.a.createElement("td",null,r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange}))),r.a.createElement("tr",null,r.a.createElement("td",null,"Numero:"),r.a.createElement("td",null,r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange}))))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},v=function(e){return r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Rajaa:"),r.a.createElement("td",null,r.a.createElement("input",{value:e.nameFilter,onChange:e.handleFiltering})))))},j=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],l=n[1],u=Object(a.useState)(""),o=Object(c.a)(u,2),i=o[0],m=o[1],b=Object(a.useState)(""),j=Object(c.a)(b,2),N=j[0],w=j[1],C=Object(a.useState)(""),O=Object(c.a)(C,2),k=O[0],F=O[1],R=Object(a.useState)(""),S=Object(c.a)(R,2),y=S[0],T=S[1],U=Object(a.useState)(""),H=Object(c.a)(U,2),P=H[0],J=H[1];Object(a.useEffect)(function(){s().then(function(e){l(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(v,{nameFilter:k,handleFiltering:function(e){F(e.target.value)}}),r.a.createElement(E,{message:y,class:P}),r.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),r.a.createElement(g,{addName:function(e){if(e.preventDefault(),t.some(function(e){return e.name.toUpperCase()===i.toUpperCase()})){var n=t.filter(function(e){return e.name.toUpperCase()===i.toUpperCase()})[0];window.confirm("".concat(i," on jo luettelossa. Korvataanko vanha numero?"))&&(n.number=N,f(n.id,n).then(function(e){l(t.map(function(t){return t.id!==n.id?t:e})),m(""),w(""),T("Henkil\xf6n ".concat(e.name," numeroksi muutettiin ").concat(e.number)),J("success"),setTimeout(function(){T(null)},5e3)}).catch(function(e){l(t.filter(function(e){return e.id!==n.id})),T("Henkil\xf6 ".concat(n.name," oli jo poistettu")),J("error"),setTimeout(function(){T(null)},5e3)}))}else d({name:i,number:N}).then(function(e){l(t.concat(e)),m(""),w(""),T("Henkil\xf6 ".concat(e.name," lis\xe4ttiin numerolla ").concat(e.number)),J("success"),setTimeout(function(){T(null)},5e3)}).catch(function(e){console.log(e.response.data.error),T(e.response.data.error),J("error"),setTimeout(function(){T(null)},5e3)})},newName:i,handleNameChange:function(e){m(e.target.value)},newNumber:N,handleNumberChange:function(e){w(e.target.value)}}),r.a.createElement("h3",null,"Numerot"),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement(h,{persons:t,nameFilter:k,doRemove:function(e,n){window.confirm("Poistetaanko ".concat(n,"?"))&&p(e).then(function(a){l(t.filter(function(n){return n.id!==e})),T("Henkil\xf6 ".concat(n," poistettiin")),J("success"),setTimeout(function(){T(null)},5e3)}).catch(function(e){T("Henkil\xf6n ".concat(n," poistaminen ei onnistunut")),J("error"),setTimeout(function(){T(null)},5e3)})}}))))};t(37);u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.ad36edcb.chunk.js.map