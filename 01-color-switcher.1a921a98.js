const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");e.setAttribute("disabled","");let o=0;t.addEventListener("click",(function(n){t.disabled=!0,e.disabled=!1,o=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(function(d){t.disabled=!1,e.disabled=!0,clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.1a921a98.js.map
