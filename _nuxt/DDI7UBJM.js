const __vite__fileDeps=["./DJLaeOJD.js","./Dc74q3Tx.js","./B1WbAwBK.js","./CIi3zRdK.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as o}from"./Dc74q3Tx.js";class a{constructor(){this.distance=200}load(t){t&&t.distance!==void 0&&(this.distance=t.distance)}}async function c(e,t=!0){await e.addInteractor("externalBounce",async n=>{const{Bouncer:r}=await o(()=>import("./DJLaeOJD.js"),__vite__mapDeps([0,1,2,3]),import.meta.url);return new r(n)},t)}export{a as Bounce,c as loadExternalBounceInteraction};