const __vite__fileDeps=["./B0jS0Lf5.js","./CIi3zRdK.js","./Dc74q3Tx.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{a2 as r,s as o}from"./Dc74q3Tx.js";class s{constructor(){this.quantity=2}load(t){if(!t)return;const e=t.quantity;e!==void 0&&(this.quantity=r(e))}}async function u(a,t=!0){await a.addInteractor("externalRemove",async e=>{const{Remover:n}=await o(()=>import("./B0jS0Lf5.js"),__vite__mapDeps([0,1,2]),import.meta.url);return new n(e)},t)}export{s as Remove,u as loadExternalRemoveInteraction};