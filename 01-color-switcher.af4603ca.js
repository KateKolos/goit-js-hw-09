!function(){var t=document.querySelector(".btn-wrapper"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),d=document.querySelector("body");n.setAttribute("disabled","");var r=0;!function(){t.style.display="flex",t.style.gap="30px",t.style.justifyContent="center",t.style.alignItems="center",t.style.padding="30px";for(var e=document.querySelectorAll("button"),n=0;n<e.length;n++)e[n].style.paddingTop="10px",e[n].style.paddingBottom="10px",e[n].style.paddingLeft="20px",e[n].style.paddingRight="20px",e[n].style.border="thin solid darkgrey",e[n].style.borderRadius="4px",e[n].style.cursor="pointer"}(),e.addEventListener("click",(function(t){e.disabled=!0,n.disabled=!1,r=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));d.style.backgroundColor=t}),1e3)})),n.addEventListener("click",(function(t){e.disabled=!1,n.disabled=!0,clearInterval(r)}))}();
//# sourceMappingURL=01-color-switcher.af4603ca.js.map
