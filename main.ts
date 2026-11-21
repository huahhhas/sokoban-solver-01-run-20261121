const fs=require("fs"),I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",D=[[1,0,"r"],[-1,0,"l"],[0,1,"d"],[0,-1,"u"]];
function B(W,H,k,b,s){let d=new Int32Array(W*H).fill(1e9),p=new Int32Array(W*H).fill(-1),c=[],q=[s];d[s]=0;p[s]=s;for(let h=0;h<q.length;h++){let x=q[h],X=x%W,Y=x/W|0;for(let e of D){let nx=X+e[0],ny=Y+e[1];if(nx<0||ny<0||nx>=W||ny>=H)continue;let n=ny*W+nx;if(!k[n]||b.has(n)||d[n]<1e9)continue;d[n]=d[x]+1;p[n]=x;c[n]=e[2];q.push(n)}}return[d,p,c]}
function P(r,s,t){let o="",x=t;if(r[0][t]>1e8)return null;while(x!==s){o=r[2][x]+o;x=r[1][x]}return o}
function R(W,H,k,b,g,e,L,z){let G=g.join(","),dg=g.map(y=>B(W,H,k,new Set(),y)[0]);
function h(b){let v=1e9,p=g.map((_,i)=>i);(function q(a,i){if(i==a.length){let s=0;for(let j=0;j<b.length;j++){let d=dg[a[j]][b[j]];if(d>1e8){s=1e9;break}s+=d}if(s<v)v=s;return}for(let j=i;j<a.length;j++){let t=a[i];a[i]=a[j];a[j]=t;q(a,i+1);t=a[i];a[i]=a[j];a[j]=t}})(p,0);return v}
let S=[],best=new Map(),Bk=[],mf=0,ex=0,b0=b.slice().sort((a,b)=>a-b);
if(b0.join(",")==G)return{m:"",e};
let h0=h(b0);if(h0>1e8)return null;
let j0=b0.join(",");S.push({b:b0,p:e,g:0,par:-1,mv:"",j:j0,k:j0+"|"+e});best.set(j0+"|"+e,0);(Bk[h0]=Bk[h0]||[]).push(0);mf=h0;
for(;;){while(mf<Bk.length&&!(Bk[mf]&&Bk[mf].length))mf++;if(mf>=Bk.length)return null;
let si=Bk[mf].pop(),st=S[si];
if(st.g>best.get(st.k))continue;
if(st.j==G){let o="",c=si;while(c>0){o=S[c].mv+o;c=S[c].par}return{m:o,e:st.p}}
if(++ex>L)return null;
let bl=new Set(st.b);
for(let bi=0;bi<st.b.length;bi++){let c=st.b[bi],cx=c%W,cy=c/W|0;
for(let[dx,dy,ch]of D){let tx=cx+dx,ty=cy+dy;if(tx<0||ty<0||tx>=W||ty>=H)continue;let t=ty*W+tx;if(!k[t]||t==z||bl.has(t))continue;let fx=cx-dx,fy=cy-dy;if(fx<0||fy<0||fx>=W||fy>=H)continue;let f=fy*W+fx;if(!k[f])continue;let w=P(B(W,H,k,bl,st.p),st.p,f);if(w===null)continue;let nb=st.b.slice();nb[bi]=t;nb.sort((a,b)=>a-b);let jj=nb.join(","),nk=jj+"|"+c,ng=st.g+1;if(best.has(nk)&&best.get(nk)<=ng)continue;let hh=h(nb);if(hh>1e8)continue;best.set(nk,ng);S.push({b:nb,p:c,g:ng,par:si,mv:w+ch,j:jj,k:nk});let F=ng+hh;(Bk[F]=Bk[F]||[]).push(S.length-1);if(F<mf)mf=F}}}}
function S(txt){let rows=txt.replace(/\r/g,"").split("\n").filter(r=>r.length),H=rows.length,W=Math.max(...rows.map(r=>r.length)),gr=rows.map(r=>r.padEnd(W,"#")),w=new Uint8Array(W*H),b=[],g=[],px=0,py=0;
for(let y=0;y<H;y++)for(let x=0;x<W;x++){let c=gr[y][x];if(c=="#")w[y*W+x]=1;if(c=="$"||c=="*")b.push(y*W+x);if(c=="."||c=="*"||c=="+")g.push(y*W+x);if(c=="@"||c=="+"){px=x;py=y}}
b.sort((a,b)=>a-b);g.sort((a,b)=>a-b);
function sp(hr){let sn=new Uint8Array(W*H),rm=[];for(let i=0;i<W*H;i++){if(w[i]||(i/W|0)==hr||sn[i])continue;let cp=[],q=[i];sn[i]=1;for(let h=0;h<q.length;h++){let c=q[h];cp.push(c);let cx=c%W,cy=c/W|0;for(let[dx,dy]of D){let nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=W||ny>=H)continue;let n=ny*W+nx;if(w[n]||(n/W|0)==hr||sn[n])continue;sn[n]=1;q.push(n)}}let rb=b.filter(x=>cp.includes(x)),rg=g.filter(x=>cp.includes(x));if(!rb.length&&!rg.length)continue;if(rb.length!=rg.length||!rb.length)return null;let dr=new Set();for(let c of cp){let cx=c%W,cy=c/W|0;if((cy==hr-1||cy==hr+1)&&!w[hr*W+cx])dr.add(hr*W+cx)}if(dr.size!=1)return null;rm.push({cp,boxes:rb,goals:rg,door:[...dr][0]})}let ir=new Set(rm.flatMap(r=>r.cp));if(b.some(x=>!ir.has(x))||g.some(x=>!ir.has(x)))return null;return rm}
let rm=sp(py),A=w.map(v=>v?0:1);
function fb(){let r=R(W,H,A,b,g,py*W+px,2e5,-1);return r?r.m:""}
if(!rm)return fb();
let m="",cur=py*W+px,cb=b.slice();
for(let r of rm){let k=new Uint8Array(W*H);for(let c of r.cp)k[c]=1;k[r.door]=1;let z=P(B(W,H,A,new Set(cb),cur),cur,r.door);if(z===null)return fb();m+=z;let s=R(W,H,k,r.boxes,r.goals,r.door,3e5,r.door);if(!s)return fb();m+=s.m;cur=s.e;cb=cb.filter(x=>!r.boxes.includes(x)).concat(r.goals);cb.sort((a,b)=>a-b)}
return m}
for(let id of fs.readdirSync(I)){let d=I+"/"+id;if(!fs.statSync(d).isDirectory())continue;let s=S(fs.readFileSync(d+"/level.txt","utf8"));fs.mkdirSync(O+"/"+id,{recursive:true});fs.writeFileSync(O+"/"+id+"/solution.txt",s)}
