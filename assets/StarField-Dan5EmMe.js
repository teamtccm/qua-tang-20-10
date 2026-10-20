import{r as d,u as _,a as j,j as c}from"./fiber-DkSNIWfx.js";import{z as C,af as k,ae as Y}from"./three-BMdQ9Zlx.js";import{d as B,b as m,c as v,F as E,e as X,D as N}from"./config-Bjru9USs.js";const y=t=>Math.min(Number.isFinite(t)&&t>0?t:1/60,1/30),f=t=>t<0?0:t>1?1:t,R=t=>{const o=f(t);return o*o*(3-2*o)};function U(t,o,a,r=B){let u=t+r*o*a;return(r>0?u>v:u<m)&&(u=r>0?m:v),u}function W(t){const o=f((t-m)/(E-m)),a=f((v-t)/(v-X));return R(o*a)}const H=(t,o,a)=>Math.sin(t*.55+a)*o,J=()=>m+Math.random()*(v-m),e={active:!1,progress:0,centerX:.5,centerY:.4,radiusX:.22,radiusY:.18};function K(){e.active=!0,e.progress=0}function Q(t,o,a,r){e.centerX=f(t),e.centerY=f(o),e.radiusX=Math.max(.01,a),e.radiusY=Math.max(.01,r)}function Z(t){e.progress=f(t)}function A(){return e.active?1-R((e.progress-.5)/.5):0}function $(){e.active=!1,e.progress=1}const q=`
attribute float aSize;
attribute float aPhase;
attribute float aSpeed;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
uniform vec4 uIntroFocus;
uniform float uIntroDim;
uniform float uBrightness;
varying vec3 vColor;
varying float vTwinkle;
varying float vSize;
varying float vFocusBrightness;
void main() {
    vColor = aColor;
    // Lấp lánh: hai sóng sin lệch pha, nâng bậc để đa số sao dịu, thi thoảng bừng sáng.
    float w = 0.5 + 0.5 * sin(uTime * aSpeed + aPhase);
    float w2 = 0.5 + 0.5 * sin(uTime * aSpeed * 1.7 + aPhase * 2.3);
    vTwinkle = 0.45 + 0.75 * pow(w * 0.7 + w2 * 0.3, 2.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float att = 260.0 / max(1.0, -mv.z);
    float size = aSize * uPixelRatio * (0.75 + 0.25 * vTwinkle) * att;
    vSize = size;
    gl_PointSize = clamp(size, 1.2 * uPixelRatio, 26.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
    // Vùng dịu sao bám đúng bông hoa trên màn hình, cạnh mềm để không lộ hình oval.
    vec2 ndc = gl_Position.xy / max(gl_Position.w, 0.0001);
    vec2 screen = vec2(ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5);
    float focusDistance = length((screen - uIntroFocus.xy) / uIntroFocus.zw);
    float focus = 1.0 - smoothstep(0.45, 1.25, focusDistance);
    vFocusBrightness = (1.0 - 0.75 * uIntroDim * focus) * uBrightness;
}`,G=`
varying vec3 vColor;
varying float vTwinkle;
varying float vSize;
varying float vFocusBrightness;
void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;
    // Lõi sáng + quầng mờ
    float core = smoothstep(0.5, 0.0, d);
    core = core * core;
    float halo = exp(-d * d * 18.0) * 0.55;
    // Tia chữ thập nhẹ cho các sao lớn
    float cross = exp(-abs(p.x) * 40.0) * exp(-abs(p.y) * 6.0) + exp(-abs(p.y) * 40.0) * exp(-abs(p.x) * 6.0);
    cross *= smoothstep(6.0, 14.0, vSize) * 0.35;
    float a = (core + halo + cross) * vTwinkle;
    // Lõi ngả trắng ấm để sao vàng trông rực chứ không bệt
    vec3 col = mix(vColor, vec3(1.0, 0.98, 0.9), core * 0.5);
    // Giảm màu sáng cả lõi/quầng; alpha giữ nguyên để cường độ không bị giảm hai lần.
    gl_FragColor = vec4(col * a * vFocusBrightness, a);
}`,P=[[1,.84,.25],[1,.9,.45],[1,.95,.7],[1,.78,.2],[1,.93,.6],[1,.72,.3]];function tt({count:t=N.starCount,brightness:o=1,focus:a=null}){const r=d.useRef(),u=d.useRef(),x=_(n=>n.gl),g=d.useMemo(()=>{const n=t,l=new Float32Array(n*3),i=new Float32Array(n*3),h=new Float32Array(n),F=new Float32Array(n),T=new Float32Array(n);for(let s=0;s<n;s++){const b=Math.random()*2-1,I=Math.random()*Math.PI*2,M=70+Math.pow(Math.random(),.6)*150,w=Math.sqrt(1-b*b);l[s*3]=M*w*Math.cos(I),l[s*3+1]=M*b,l[s*3+2]=M*w*Math.sin(I);const S=P[Math.floor(Math.random()*P.length)];i[s*3]=S[0],i[s*3+1]=S[1],i[s*3+2]=S[2];const z=Math.random();h[s]=z<.75?1.2+Math.random()*1.3:z<.94?2.6+Math.random()*1.8:4.4+Math.random()*2.6,F[s]=Math.random()*Math.PI*2,T[s]=.6+Math.random()*2.2}return{pos:l,col:i,size:h,phase:F,speed:T}},[t]),D=d.useMemo(()=>({uTime:{value:0},uPixelRatio:{value:Math.min(x?x.getPixelRatio():1,2)},uIntroFocus:{value:new C((a||e).centerX,(a||e).centerY,(a||e).radiusX,(a||e).radiusY)},uIntroDim:{value:a?1:A()},uBrightness:{value:o}}),[x,a,o]);j((n,l)=>{if(u.current){const i=u.current.uniforms;i.uTime.value=n.clock.elapsedTime;const h=a||e;i.uIntroFocus.value.set(h.centerX,h.centerY,h.radiusX,h.radiusY),i.uIntroDim.value=Y.damp(i.uIntroDim.value,a?1:A(),12,y(l))}r.current&&(r.current.position.copy(n.camera.position),r.current.rotation.y+=y(l)*.006,r.current.rotation.x+=y(l)*.0015)});const p=t;return c.jsx("group",{ref:r,position:[-10,0,30],children:c.jsxs("points",{frustumCulled:!1,children:[c.jsxs("bufferGeometry",{children:[c.jsx("bufferAttribute",{attach:"attributes-position",array:g.pos,count:p,itemSize:3}),c.jsx("bufferAttribute",{attach:"attributes-aColor",array:g.col,count:p,itemSize:3}),c.jsx("bufferAttribute",{attach:"attributes-aSize",array:g.size,count:p,itemSize:1}),c.jsx("bufferAttribute",{attach:"attributes-aPhase",array:g.phase,count:p,itemSize:1}),c.jsx("bufferAttribute",{attach:"attributes-aSpeed",array:g.speed,count:p,itemSize:1})]}),c.jsx("shaderMaterial",{ref:u,uniforms:D,vertexShader:q,fragmentShader:G,transparent:!0,depthWrite:!1,depthTest:!0,blending:k,toneMapped:!1})]})})}export{tt as S,Q as a,K as b,Z as c,U as d,$ as e,H as f,y as g,J as h,W as r,R as s};
