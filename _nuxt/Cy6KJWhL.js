import{Push as u}from"./CqPgR19y.js";import{ax as p,aZ as c}from"./Vim_au1A.js";import{E as d}from"./CIi3zRdK.js";const h="push",l=0;class O extends d{constructor(e){super(e),this.handleClickMode=n=>{if(n!==h)return;const t=this.container,o=t.actualOptions,r=o.interactivity.modes.push;if(!r)return;const i=p(r.quantity);if(i<=l)return;const s=c([void 0,...r.groups]),a=s!==void 0?t.actualOptions.particles.groups[s]:void 0;t.particles.push(i,t.interactivity.mouse,a,s)}}clear(){}init(){}interact(){}isEnabled(){return!0}loadModeOptions(e,...n){e.push||(e.push=new u);for(const t of n)e.push.load(t==null?void 0:t.push)}reset(){}}export{O as Pusher};