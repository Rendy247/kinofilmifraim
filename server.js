using Microsoft.Maui.Controls;
#if ANDROID
using Android.Views.InputMethods;
using Android.Content;
using KinoFilm.Platforms.Android;
#endif

namespace KinoFilm;

public partial class MainPage : ContentPage
{
    private static readonly string SiteHtml = @"<!DOCTYPE html>
<html lang=""ru"">
<head>
<meta charset=""UTF-8""/>
<meta name=""viewport"" content=""width=device-width, initial-scale=1.0""/>
<title>KinoFilm</title>
<link href=""https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;700;800;900&display=swap"" rel=""stylesheet""/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#07090e;--s1:#0d1019;--s2:#141926;--brd:#1c2333;--acc:#f0c040;--red:#ff4560;--text:#eef0f8;--muted:#5a6480;--green:#5dc860}
html,body{height:100%;scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Nunito',sans-serif;min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--brd);border-radius:2px}
.nav{position:fixed;top:0;left:0;right:0;z-index:300;height:58px;display:flex;align-items:center;padding:0 20px;gap:12px;background:rgba(7,9,14,.97);backdrop-filter:blur(12px);border-bottom:1px solid var(--brd)}
.logo{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--acc);cursor:pointer;flex-shrink:0}
.logo span{color:var(--red)}
.nav-links{display:flex;gap:2px;list-style:none}
.nl-btn{background:none;border:none;color:var(--muted);font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;padding:5px 9px;border-radius:7px;cursor:pointer;transition:.18s;position:relative}
.nl-btn:hover,.nl-btn.on{color:var(--text);background:rgba(255,255,255,.07)}
.fav-count{position:absolute;top:1px;right:1px;background:var(--red);color:#fff;font-size:9px;font-weight:900;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.nav-r{margin-left:auto;display:flex;align-items:center;gap:6px}
.sw{display:flex;align-items:center;gap:7px;background:var(--s2);border:1px solid var(--brd);border-radius:9px;padding:6px 11px}
.sw:focus-within{border-color:var(--acc)}
.sw input{background:none;border:none;outline:none;color:var(--text);font-family:'Nunito',sans-serif;font-size:13px;width:130px}
.sw input::placeholder{color:var(--muted)}
.nbtn{border:none;border-radius:8px;padding:6px 11px;cursor:pointer;font-family:'Nunito',sans-serif;font-weight:900;font-size:12px;transition:.15s}
.nbtn-acc{background:var(--acc);color:#000}
.nbtn-ghost{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:var(--text)}
.nbtn-ghost:hover{background:rgba(255,255,255,.13)}
.hero-wrap{position:relative;height:82vh;min-height:420px;display:flex;align-items:flex-end;padding:28px 36px 46px;overflow:hidden;margin-top:58px}
.hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0f1a30,#080d18)}
.hero-img{position:absolute;right:0;top:0;bottom:0;width:65%;background-size:cover;background-position:center top;mask-image:linear-gradient(to right,transparent 0%,black 28%);-webkit-mask-image:linear-gradient(to right,transparent 0%,black 28%)}
.hero-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 0%,transparent 40%)}
.hc{position:relative;z-index:2;max-width:500px}
.htag{display:inline-flex;align-items:center;gap:5px;background:rgba(240,192,64,.12);border:1px solid rgba(240,192,64,.3);border-radius:20px;padding:3px 11px;font-size:11px;font-weight:800;letter-spacing:1px;color:var(--acc);text-transform:uppercase;margin-bottom:10px}
.htitle{font-family:'Bebas Neue',sans-serif;font-size:clamp(38px,5vw,72px);line-height:.94;letter-spacing:2px;margin-bottom:10px}
.hmeta{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:13px;color:var(--muted);flex-wrap:wrap}
.hmeta .st{color:var(--acc);font-weight:900}
.dot{width:3px;height:3px;border-radius:50%;background:var(--brd);display:inline-block}
.hdesc{font-size:13px;line-height:1.75;color:rgba(238,240,248,.58);margin-bottom:18px;max-width:400px}
.hbtns{display:flex;gap:9px;flex-wrap:wrap}
.btn-p{display:flex;align-items:center;gap:7px;background:var(--acc);color:#000;border:none;border-radius:9px;padding:11px 22px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:13px;font-weight:900;box-shadow:0 8px 26px rgba(240,192,64,.28);transition:.15s}
.btn-p:hover{transform:translateY(-2px)}
.btn-i{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:var(--text);border-radius:9px;padding:11px 18px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:13px;font-weight:800;transition:.18s}
.btn-i:hover{background:rgba(255,255,255,.14)}
.sec{padding:20px 36px}
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.sh h2{font-family:'Bebas Neue',sans-serif;font-size:19px;letter-spacing:2px}
.sm{font-size:12px;font-weight:800;color:var(--acc);text-transform:uppercase;cursor:pointer;background:none;border:none}
.sm:hover{opacity:.7}
.gpills{display:flex;gap:7px;flex-wrap:wrap;padding:12px 36px 0}
.gp{padding:5px 13px;border-radius:20px;background:var(--s2);border:1px solid var(--brd);font-size:12px;font-weight:700;cursor:pointer;transition:.18s;color:var(--muted);text-transform:capitalize}
.gp:hover,.gp.on{background:var(--acc);border-color:var(--acc);color:#000}
.rw{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;-ms-overflow-style:none;scrollbar-width:none}
.rw::-webkit-scrollbar{display:none}
.rwrap{position:relative}
.rarr{position:absolute;top:40%;transform:translateY(-50%);width:30px;height:30px;background:rgba(240,192,64,.9);border:none;border-radius:50%;cursor:pointer;z-index:5;display:flex;align-items:center;justify-content:center;color:#000;font-size:16px;font-weight:900;transition:.18s}
.rarr:hover{background:var(--acc);transform:translateY(-50%) scale(1.1)}
.rarr.l{left:-13px}.rarr.r{right:-13px}
.mc{flex-shrink:0;width:145px;cursor:pointer;transition:transform .2s;position:relative}
.mc:hover{transform:scale(1.06);z-index:10}
.mc:hover .mco{opacity:1}
.mct{width:100%;aspect-ratio:2/3;border-radius:10px;overflow:hidden;background:var(--s2);position:relative}
.mct img{width:100%;height:100%;object-fit:cover;display:block;transition:.28s}
.mc:hover .mct img{transform:scale(1.05)}
.mco{position:absolute;inset:0;border-radius:10px;opacity:0;transition:.22s;background:linear-gradient(to top,rgba(7,9,14,.97) 0%,rgba(7,9,14,.18) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:9px}
.mco-p{width:28px;height:28px;background:var(--acc);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:5px}
.mco-t{font-size:11px;font-weight:800;line-height:1.3;margin-bottom:2px}
.mco-s{font-size:10px;color:var(--muted)}
.mrat{position:absolute;top:7px;left:7px;background:rgba(240,192,64,.92);color:#000;font-size:10px;font-weight:900;padding:2px 6px;border-radius:5px}
.mbadge{position:absolute;top:7px;right:7px;background:rgba(255,69,96,.9);color:#fff;font-size:9px;font-weight:900;padding:2px 5px;border-radius:5px}
.fav-star{position:absolute;top:30px;right:7px;font-size:14px;cursor:pointer;z-index:15;filter:drop-shadow(0 1px 2px rgba(0,0,0,.8));transition:.15s}
.fav-star:hover{transform:scale(1.25)}
.myrating{position:absolute;bottom:7px;left:7px;background:rgba(13,16,25,.85);color:var(--acc);font-size:10px;font-weight:900;padding:2px 6px;border-radius:5px;display:flex;align-items:center;gap:3px}
.progress-bar{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.1);border-radius:0 0 10px 10px}
.progress-fill{height:100%;background:var(--acc);border-radius:0 0 10px 10px;transition:.3s}
.mi{padding:7px 2px 0}
.mt2{font-size:12px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
.my2{font-size:11px;color:var(--muted)}
.mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(138px,1fr));gap:15px;padding:18px 0}
.cwcard{flex-shrink:0;width:240px;cursor:pointer;position:relative}
.cwcard-thumb{width:100%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:var(--s2);position:relative}
.cwcard-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.cwcard-prog{position:absolute;bottom:0;left:0;right:0;height:4px;background:rgba(255,255,255,.15)}
.cwcard-fill{height:100%;background:var(--acc)}
.cwcard-info{padding:7px 2px 0}
.cwcard-title{font-size:12px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cwcard-sub{font-size:11px;color:var(--muted)}
.cwcard-remove{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.6);border:none;color:#fff;border-radius:50%;width:22px;height:22px;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;opacity:0;transition:.18s}
.cwcard:hover .cwcard-remove{opacity:1}
.mbg{position:fixed;inset:0;z-index:500;background:rgba(7,9,14,.92);backdrop-filter:blur(18px);display:none;align-items:center;justify-content:center;padding:12px}
.mbg.open{display:flex}
.mdl{width:min(860px,100%);background:var(--s1);border-radius:14px;overflow:hidden;border:1px solid var(--brd);box-shadow:0 40px 100px rgba(0,0,0,.8);max-height:92vh;overflow-y:auto;position:relative}
.ply{width:100%;aspect-ratio:16/9;background:#000;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ply.fullmode{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;aspect-ratio:unset!important;z-index:9999!important;border-radius:0!important}
.ply.fullmode iframe{position:absolute;inset:0;width:100%;height:100%;border:none}
.ply iframe{position:absolute;inset:0;width:100%;height:100%;border:none}
.ply-ph{display:flex;flex-direction:column;align-items:center;gap:11px;color:var(--muted);text-align:center;padding:20px}
.pc{width:60px;height:60px;background:rgba(240,192,64,.1);border:2px solid var(--acc);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:24px;transition:.18s}
.pc:hover{background:rgba(240,192,64,.2)}
.mdb{padding:18px 22px}
.mdl-title{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:2px;margin-bottom:7px}
.mdl-meta{display:flex;gap:10px;font-size:13px;color:var(--muted);margin-bottom:10px;flex-wrap:wrap;align-items:center}
.mdl-meta .st{color:var(--acc);font-weight:900}
.mdl-desc{font-size:13px;line-height:1.75;color:rgba(238,240,248,.58);margin-bottom:14px}
.act-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.act-btn{display:flex;align-items:center;gap:6px;border:none;border-radius:8px;padding:8px 14px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:12px;font-weight:800;transition:.18s}
.act-fav{background:rgba(255,69,96,.12);border:1px solid rgba(255,69,96,.25);color:var(--red)}
.act-fav.on{background:rgba(255,69,96,.25);border-color:var(--red)}
.act-fav:hover{background:rgba(255,69,96,.22)}
.act-trailer{background:rgba(255,0,0,.12);border:1px solid rgba(255,0,0,.25);color:#ff4444}
.act-trailer:hover{background:rgba(255,0,0,.22)}
.stars-row{display:flex;align-items:center;gap:6px;margin-bottom:14px}
.stars-lbl{font-size:12px;font-weight:700;color:var(--muted)}
.stars{display:flex;gap:3px}
.star-btn{background:none;border:none;font-size:20px;cursor:pointer;transition:.15s;filter:grayscale(1);opacity:.4}
.star-btn.on{filter:none;opacity:1}
.star-btn:hover{transform:scale(1.2)}
.my-score{font-size:12px;font-weight:800;color:var(--acc);margin-left:4px}
.prog-section{margin-bottom:14px;background:var(--s2);border-radius:10px;padding:12px 14px}
.prog-title{font-size:12px;font-weight:700;color:var(--muted);margin-bottom:8px}
.prog-track{width:100%;height:6px;background:rgba(255,255,255,.1);border-radius:3px;cursor:pointer;position:relative}
.prog-fill2{height:100%;background:var(--acc);border-radius:3px;pointer-events:none}
.prog-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:5px}
.prog-btns{display:flex;gap:7px;margin-top:8px;flex-wrap:wrap}
.prog-btn{font-size:11px;font-weight:700;padding:5px 10px;border-radius:6px;cursor:pointer;border:none;transition:.15s}
.prog-save{background:rgba(80,200,80,.14);border:1px solid rgba(80,200,80,.28);color:var(--green)}
.prog-reset{background:rgba(255,69,96,.1);border:1px solid rgba(255,69,96,.22);color:var(--red)}
.srcrow{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-bottom:9px}
.src-lbl{font-size:12px;font-weight:700;color:var(--muted);flex-shrink:0}
.src-in{flex:1;min-width:140px;background:var(--s2);border:1px solid var(--brd);border-radius:7px;padding:8px 11px;color:var(--text);font-family:'Nunito',sans-serif;font-size:12px;outline:none;transition:.18s}
.src-in:focus{border-color:var(--acc)}
.src-go{background:var(--acc);color:#000;border:none;border-radius:7px;padding:8px 14px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:12px;font-weight:900}
.admrow{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.abtn{font-size:11px;font-weight:700;padding:5px 11px;border-radius:7px;cursor:pointer;border:none;transition:.18s}
.a-save{background:rgba(80,200,80,.14);border:1px solid rgba(80,200,80,.28);color:var(--green)}.a-save:hover{background:rgba(80,200,80,.24)}
.a-clr{background:rgba(255,69,96,.09);border:1px solid rgba(255,69,96,.22);color:var(--red)}.a-clr:hover{background:rgba(255,69,96,.18)}
.a-del{background:rgba(255,69,96,.14);border:1px solid rgba(255,69,96,.28);color:var(--red)}.a-del:hover{background:rgba(255,69,96,.26)}
.anote{font-size:11px;color:var(--muted)}
.mclose{position:absolute;top:11px;right:11px;width:32px;height:32px;background:rgba(255,255,255,.08);border:none;border-radius:50%;cursor:pointer;color:var(--text);font-size:15px;z-index:10;transition:.18s}
.mclose:hover{background:rgba(255,255,255,.16)}
.tip{margin-top:9px;font-size:11px;color:var(--muted);line-height:1.6}
.tmbg{position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.96);display:none;align-items:center;justify-content:center;padding:12px}
.tmbg.open{display:flex}
.tmdl{width:min(900px,100%);position:relative}
.tmdl iframe{width:100%;aspect-ratio:16/9;border:none;border-radius:12px}
.tmclose{position:absolute;top:-38px;right:0;background:rgba(255,255,255,.1);border:none;color:#fff;border-radius:8px;padding:6px 14px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700}
.page{padding:76px 36px 36px;min-height:100vh}
.page-title{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:2px;margin-bottom:16px}
.empty{text-align:center;padding:60px 0;color:var(--muted);font-size:15px}
.empty-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:14px;color:var(--muted);text-align:center;padding:20px}
.empty-hero h2{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:2px;color:var(--text)}
.empty-hero p{font-size:14px;line-height:1.7;max-width:340px}
.aform{background:var(--s1);border:1px solid var(--brd);border-radius:14px;padding:24px;max-width:640px}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-bottom:13px}
.full{grid-column:1/-1}
.flbl{display:block;font-size:12px;font-weight:700;color:var(--muted);margin-bottom:5px}
.fin,.fta{width:100%;background:var(--s2);border:1px solid var(--brd);border-radius:7px;padding:9px 11px;color:var(--text);font-family:'Nunito',sans-serif;font-size:13px;outline:none;transition:.18s}
.fin:focus,.fta:focus{border-color:var(--acc)}
.fta{resize:vertical;min-height:76px}
.gchecks{display:flex;flex-wrap:wrap;gap:7px}
.gchk{display:inline-flex;align-items:center;cursor:pointer;font-size:12px;font-weight:700;color:var(--muted);background:var(--s2);border:1px solid var(--brd);border-radius:6px;padding:4px 9px;transition:.18s;user-select:none}
.gchk.on{background:rgba(240,192,64,.11);border-color:rgba(240,192,64,.38);color:var(--acc)}
.fsub{background:var(--acc);color:#000;border:none;border-radius:9px;padding:11px 24px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:13px;font-weight:900;transition:.15s;margin-top:3px}
.fsub:hover{transform:translateY(-1px);box-shadow:0 7px 18px rgba(240,192,64,.28)}
.toast{display:inline-block;background:rgba(80,200,80,.13);border:1px solid rgba(80,200,80,.28);color:var(--green);font-size:12px;font-weight:700;padding:7px 13px;border-radius:7px;margin-top:11px}
footer{padding:26px 36px;border-top:1px solid var(--brd);margin-top:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:9px}
.fl{font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:3px;color:var(--muted)}
.fl span{color:var(--red)}
.ft{font-size:11px;color:var(--muted)}
.bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:300;height:58px;background:rgba(7,9,14,.97);backdrop-filter:blur(12px);border-top:1px solid var(--brd);justify-content:space-around;align-items:center;padding:0 4px}
.bn-btn{display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;color:var(--muted);font-family:'Nunito',sans-serif;font-size:10px;font-weight:700;padding:6px 12px;border-radius:8px;cursor:pointer;transition:.18s;position:relative;min-width:52px}
.bn-btn.on,.bn-btn:hover{color:var(--acc)}
.bn-icon{font-size:18px;line-height:1}
.bn-fav-count{position:absolute;top:4px;right:8px;background:var(--red);color:#fff;font-size:9px;font-weight:900;width:15px;height:15px;border-radius:50%;display:flex;align-items:center;justify-content:center}
@media(max-width:860px){.nav-links{display:none}.sw input{width:100px}.hero-wrap,.sec,.gpills,.page{padding-left:16px;padding-right:16px}.mc{width:122px}.fgrid{grid-template-columns:1fr}footer{padding:18px 16px}.bottom-nav{display:flex}.page{padding-bottom:72px}#page-home{padding-bottom:72px}#pctrl-mode{display:none!important}}
@media(max-width:560px){.nav{padding:0 10px;gap:6px}.sw{display:none}.hero-img{width:100%;mask-image:linear-gradient(to top,transparent 0%,rgba(0,0,0,.08) 20%,black 50%);-webkit-mask-image:linear-gradient(to top,transparent 0%,rgba(0,0,0,.08) 20%,black 50%)}.mgrid{grid-template-columns:repeat(auto-fill,minmax(104px,1fr))}.mdb{padding:13px}.mdl-title{font-size:20px}.aform{padding:14px}}
.pctrl-btn{background:rgba(240,192,64,.15);border:1px solid rgba(240,192,64,.4);color:var(--text);border-radius:8px;padding:8px 14px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;transition:.15s}
.pctrl-btn:hover,.pctrl-btn.__tv{background:rgba(240,192,64,.35)}
#player-controls{display:none;position:absolute;bottom:0;left:0;right:0;z-index:2147483647;background:linear-gradient(transparent,rgba(0,0,0,0.9));padding:14px;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center}
#player-controls.show{display:flex}
#modal-player:-webkit-full-screen #player-controls{display:flex}
#modal-player:fullscreen #player-controls{display:flex}
iframe:-webkit-full-screen + #player-controls{display:flex}
</style>
</head>
<body>
<nav class=""nav"">
  <div class=""logo"" onclick=""nav('home')"">KINO<span>FILM</span></div>
  <ul class=""nav-links"">
    <li><button class=""nl-btn on"" id=""nb-home"" onclick=""nav('home')"">Главная</button></li>
    <li><button class=""nl-btn"" id=""nb-catalog"" onclick=""nav('catalog')"">Каталог</button></li>
    <li><button class=""nl-btn"" id=""nb-favorites"" onclick=""nav('favorites')"">Избранное<span class=""fav-count"" id=""fav-count"" style=""display:none"">0</span></button></li>
    <li><button class=""nl-btn"" id=""nb-add"" onclick=""nav('add')"">Добавить</button></li>
    <li><button class=""nl-btn"" id=""nb-search"" onclick=""nav('search')"">Поиск</button></li>
  </ul>
  <div class=""nav-r"">
    <div class=""sw"">
      <svg width=""12"" height=""12"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><circle cx=""11"" cy=""11"" r=""8""/><path d=""m21 21-4.35-4.35""/></svg>
      <input id=""search-inp"" placeholder=""Поиск…"" oninput=""onSearch(this.value)""/>
    </div>
    <button class=""nbtn nbtn-ghost"" onclick=""exportMovies()"">Экспорт</button>
    <button class=""nbtn nbtn-ghost"" onclick=""document.getElementById('tv-imp').click()"">Импорт</button>
    <input type=""file"" id=""tv-imp"" accept="".json"" style=""display:none"" onchange=""importMovies(event)""/>
    <button class=""nbtn nbtn-acc"" onclick=""nav('add')"">Добавить</button>
  </div>
</nav>
<div class=""bottom-nav"" id=""bottom-nav"">
  <button class=""bn-btn on"" id=""bn-home"" onclick=""nav('home')""><span class=""bn-icon"">🏠</span>Главная</button>
  <button class=""bn-btn"" id=""bn-catalog"" onclick=""nav('catalog')""><span class=""bn-icon"">🎬</span>Каталог</button>
  <button class=""bn-btn"" id=""bn-search"" onclick=""nav('search')""><span class=""bn-icon"">🔍</span>Поиск</button>
  <button class=""bn-btn"" id=""bn-favorites"" onclick=""nav('favorites')""><span class=""bn-icon"">❤️</span>Избранное<span class=""bn-fav-count"" id=""bn-fav-count"" style=""display:none"">0</span></button>
  <button class=""bn-btn"" id=""bn-add"" onclick=""nav('add')""><span class=""bn-icon"">➕</span>Добавить</button>
</div>
<div id=""page-home"" class=""main"" style=""margin-top:58px""></div>
<div id=""page-catalog"" class=""page"" style=""display:none""></div>
<div id=""page-favorites"" class=""page"" style=""display:none""></div>
<div id=""page-search"" class=""page"" style=""display:none""></div>
<div id=""page-add"" class=""page"" style=""display:none"">
  <h1 class=""page-title"">➕ Добавить фильм</h1>

  <div class=""aform"" style=""margin-bottom:16px;max-width:640px"">
    <div style=""font-size:13px;font-weight:800;color:var(--acc);margin-bottom:10px"">🌐 Найти фильм автоматически</div>
    <div style=""display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end"">
      <div style=""flex:1;min-width:200px"">
        <label class=""flbl"">Название (на русском)</label>
        <input class=""fin"" id=""srv-query"" placeholder=""Например: Побег из Шоушенка"" onkeydown=""if(event.key==='Enter')serverSearch()""/>
      </div>
      <button class=""fsub"" onclick=""serverSearch()"" id=""srv-btn"" style=""margin-top:0;padding:10px 18px"">🔍 Найти</button>
    </div>
    <div id=""srv-results"" style=""margin-top:10px""></div>
    <div id=""srv-status"" style=""margin-top:8px;font-size:12px;color:var(--muted)""></div>
  </div>

  <div class=""aform"">
    <div class=""fgrid"">
      <div><label class=""flbl"">Название *</label><input class=""fin"" id=""f-title"" placeholder=""Название фильма""/></div>
      <div><label class=""flbl"">Год</label><input class=""fin"" id=""f-year"" type=""number"" value=""2024""/></div>
      <div><label class=""flbl"">Рейтинг (0–10)</label><input class=""fin"" id=""f-rating"" type=""number"" step=""0.1"" min=""0"" max=""10"" value=""7.0""/></div>
      <div><label class=""flbl"">Длительность</label><input class=""fin"" id=""f-duration"" placeholder=""2ч 15м""/></div>
      <div><label class=""flbl"">Страна</label><input class=""fin"" id=""f-country"" placeholder=""США""/></div>
      <div><label class=""flbl"">Бейдж (NEW, 4K…)</label><input class=""fin"" id=""f-badge"" placeholder=""NEW""/></div>
      <div class=""full"">
        <label class=""flbl"">Постер (URL)</label>
        <input class=""fin"" id=""f-img"" placeholder=""https://image.tmdb.org/t/p/w500/..."" oninput=""previewPoster(this.value)""/>
        <div style=""margin-top:7px;font-size:11px;color:var(--muted);line-height:1.7"">💡 Ищи постер на <a href=""https://www.themoviedb.org"" target=""_blank"" style=""color:var(--acc)"">themoviedb.org</a></div>
        <div id=""poster-preview"" style=""display:none;margin-top:8px""><img id=""poster-img"" style=""width:90px;border-radius:8px;border:1px solid var(--brd)"" onerror=""imgError(this,document.getElementById('f-img').value,0)""/></div>
      </div>
      <div class=""full""><label class=""flbl"">Трейлер (YouTube ссылка или ID)</label><input class=""fin"" id=""f-trailer"" placeholder=""https://youtube.com/watch?v=...""/></div>
      <div class=""full"">
        <label class=""flbl"">Ссылка на плеер (iframe src)</label>
        <div style=""display:flex;gap:8px;align-items:center"">
          <input class=""fin"" id=""f-iframe"" placeholder=""https://..."" style=""flex:1""/>
          <button type=""button"" class=""fsub"" onclick=""openPlayerFinder()"" style=""margin-top:0;padding:10px 14px;white-space:nowrap;flex-shrink:0"">🎬 Найти плеер</button>
        </div>
        <div style=""display:flex;gap:8px;align-items:center;margin-top:8px"">
          <input class=""fin"" id=""f-iframe-search"" placeholder=""Другое название для поиска плеера…"" style=""flex:1"" onkeydown=""if(event.key==='Enter')retryIframeSearch()""/>
          <button type=""button"" class=""fsub"" onclick=""retryIframeSearch()"" style=""margin-top:0;padding:10px 14px;white-space:nowrap;flex-shrink:0;background:rgba(240,192,64,.7)"">🔄 Повторить поиск</button>
        </div>
      </div>
      <div class=""full""><label class=""flbl"">Описание</label><textarea class=""fta"" id=""f-desc"" placeholder=""Краткое описание…""></textarea></div>
      <div class=""full""><label class=""flbl"">Жанры *</label><div class=""gchecks"" id=""genre-checks""></div></div>
    </div>
    <button class=""fsub"" onclick=""addMovie()"">✅ Добавить в каталог</button>
    <div id=""add-toast"" style=""display:none"" class=""toast"">🎉 Фильм добавлен!</div>
  </div>
</div>

<div id=""page-finder-status"" style=""display:none;position:fixed;bottom:0;left:0;right:0;z-index:9999;background:var(--s1);border-top:1px solid var(--brd);padding:8px 14px;font-size:12px;color:var(--acc)"">
  🎬 Открой фильм на LordFilm — плеер определится автоматически
</div>

<div class=""mbg"" id=""modal-bg"" onclick=""if(event.target===this)closeModal()"">
  <div class=""mdl"">
    <button class=""mclose"" onclick=""closeModal()"">✕</button>
    <div class=""ply"" id=""modal-player"" style=""position:relative"">
      <div class=""ply-ph""><div class=""pc"" onclick=""playMovie()"">▶</div><span id=""ply-hint"" style=""font-size:13px"">Вставьте ссылку на плеер ниже</span></div>
    </div>
    <div id=""player-controls"">
      <button class=""pctrl-btn"" id=""pctrl-fs"" onclick=""playerCmd('fullscreen')"">[ ] Полный экран</button>
      <button class=""pctrl-btn"" id=""pctrl-mode"" onclick=""togglePlayerMode()"" style=""background:rgba(255,100,100,.2);border-color:rgba(255,100,100,.5)"">🎮 Режим пульта: ВЫКЛ</button>
      <button class=""pctrl-btn"" id=""pctrl-hide"" onclick=""togglePlayerControls()"">▲ Скрыть</button>
    </div>
    <button id=""pctrl-show"" onclick=""togglePlayerControls()"" style=""display:none;position:absolute;bottom:8px;right:12px;z-index:51;background:rgba(240,192,64,.7);border:none;border-radius:7px;padding:6px 12px;color:#000;font-family:'Nunito',sans-serif;font-weight:900;font-size:12px;cursor:pointer"">▼ Управление</button>
    <div class=""mdb"">
      <div class=""mdl-title"" id=""m-title""></div>
      <div class=""mdl-meta"" id=""m-meta""></div>
      <div class=""act-row"">
        <button class=""act-btn act-fav"" id=""m-fav-btn"" onclick=""toggleFav()"">🤍 В избранное</button>
        <button class=""act-btn act-trailer"" id=""m-trailer-btn"" onclick=""openTrailer()"" style=""display:none"">▶ Трейлер</button>
      </div>
      <div class=""stars-row""><span class=""stars-lbl"">Моя оценка:</span><div class=""stars"" id=""stars-row""></div><span class=""my-score"" id=""my-score""></span></div>
      <div class=""prog-section"" id=""prog-section"" style=""display:none"">
        <div class=""prog-title"">🔔 Прогресс просмотра</div>
        <div class=""prog-track"" onclick=""setProgress(event)"" id=""prog-track""><div class=""prog-fill2"" id=""prog-fill2"" style=""width:0%""></div></div>
        <div class=""prog-labels""><span id=""prog-watched"">0%</span><span>просмотрено</span></div>
        <div class=""prog-btns""><button class=""prog-btn prog-reset"" onclick=""resetProgress()"">✕ Сбросить прогресс</button></div>
      </div>
      <p class=""mdl-desc"" id=""m-desc""></p>
      <div class=""srcrow"">
        <span class=""src-lbl"">Плеер:</span>
        <input class=""src-in"" id=""m-url"" placeholder=""https://... (iframe src)"" onkeydown=""if(event.key==='Enter')playMovie()""/>
        <button class=""src-go"" onclick=""playMovie()"">▶ Играть</button>
      </div>
      <div class=""admrow"">
        <button class=""abtn a-save"" onclick=""saveLink()"">💾 Сохранить</button>
        <button class=""abtn a-clr"" onclick=""clearLink()"">✕ Сбросить</button>
        <button class=""abtn a-del"" id=""m-del-btn"" onclick=""deleteMovie()"" style=""display:none"">🗑 Удалить</button>
        <span class=""anote"" id=""m-note""></span>
      </div>
      <div class=""tip"">💡 Найди фильм на LordFilm → правая кнопка на плеер → «Просмотр кода» → найди <code>&lt;iframe src=""...""&gt;</code> → скопируй URL.</div>
    </div>
  </div>
</div>
<div class=""tmbg"" id=""trailer-bg"" onclick=""if(event.target===this)closeTrailer()"">
  <div class=""tmdl"">
    <button class=""tmclose"" onclick=""closeTrailer()"">✕ Закрыть</button>
    <iframe id=""trailer-frame"" allowfullscreen allow=""autoplay; encrypted-media""></iframe>
  </div>
</div>
<script>
const GENRES = [""боевик"",""приключения"",""комедия"",""драма"",""триллер"",""ужасы"",""фантастика"",""фэнтези"",""романтика"",""детектив"",""криминал"",""семейный"",""анимация"",""документальный"",""биография"",""исторический"",""военный"",""спорт"",""музыкальный"",""вестерн""];
const K_MOVIES=""ch_movies_v8"",K_IFRAMES=""ch_iframes_v8"",K_FAVS=""ch_favs_v8"",K_RATINGS=""ch_ratings_v8"",K_PROG=""ch_progress_v8"";
let movies=[],iframes={},favs=new Set(),ratings={},progress={};
let currentPage=""home"",currentGenre=""все"",searchQ="""",modalMovie=null,tempProgress=0;
function ls(k,d){try{return JSON.parse(localStorage.getItem(k)||d)}catch{return JSON.parse(d)}}
function lss(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
function loadData(){
  movies=ls(K_MOVIES,""[]"");iframes=ls(K_IFRAMES,""{}"");favs=new Set(ls(K_FAVS,""[]""));ratings=ls(K_RATINGS,""{}"");progress=ls(K_PROG,""{}"");
  if(!movies.length){var builtin=[{id:1772633762208,title:""Властелин колец"",year:2024,rating:7,duration:"""",country:"""",badge:"""",img:""https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"",iframeUrl:""https://api.variyt.ws/embed/movie/479"",trailer:"""",desc:"""",genre:[""фэнтези""],custom:true}];movies=builtin;iframes[1772633762208]=""https://api.variyt.ws/embed/movie/479"";saveAll();}
}
function saveAll(){lss(K_MOVIES,movies);lss(K_IFRAMES,iframes);lss(K_FAVS,[...favs]);lss(K_RATINGS,ratings);lss(K_PROG,progress)}
const PROXIES=[u=>'https://wsrv.nl/?url='+encodeURIComponent(u.replace(/^https?:\/\//,''))+'&w=300&h=450&fit=cover&output=jpg',u=>'https://images.weserv.nl/?url='+encodeURIComponent(u.replace(/^https?:\/\//,''))+'&w=300&h=450',u=>'https://corsproxy.io/?'+encodeURIComponent(u),u=>u];
function imgSrc(u){if(!u)return'';if(u.startsWith('data:')||u.startsWith('blob:'))return u;if(u.includes('image.tmdb.org')||u.includes('media-amazon.com'))return u;return PROXIES[0](u)}
function imgRaw(u){if(!u)return'https://placehold.co/1200x700/141926/5a6480?text=No+Image';if(u.includes('image.tmdb.org')||u.includes('media-amazon.com'))return u;return PROXIES[0](u)}
function imgError(el,url,idx){const n=idx+1;if(n<PROXIES.length){el.onerror=()=>imgError(el,url,n);el.src=PROXIES[n](url)}else{el.onerror=null;el.src='https://placehold.co/300x450/141926/5a6480?text='+encodeURIComponent(el.alt||'?')}}
function previewPoster(v){const w=document.getElementById('poster-preview'),img=document.getElementById('poster-img');if(!v.trim()){w.style.display='none';return}w.style.display='block';img.alt='poster';img.src=imgSrc(v.trim());}
function ytId(v){if(!v)return'';const m=v.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);return m?m[1]:v.trim().length===11?v.trim():'';}
function nav(p){currentPage=p;['home','catalog','favorites','search','add'].forEach(x=>{const el=document.getElementById('page-'+x);if(el)el.style.display='none';const b=document.getElementById('nb-'+x);if(b)b.classList.remove('on');const bn=document.getElementById('bn-'+x);if(bn)bn.classList.remove('on');});document.getElementById('page-'+p).style.display='';const b=document.getElementById('nb-'+p);if(b)b.classList.add('on');const bn=document.getElementById('bn-'+p);if(bn)bn.classList.add('on');if(p!=='search'){searchQ='';document.getElementById('search-inp').value='';}window.scrollTo(0,0);updateFavCount();render();}
function onSearch(v){searchQ=v;if(currentPage!=='search')nav('search');else render();}
function updateFavCount(){const el=document.getElementById('fav-count'),el2=document.getElementById('bn-fav-count');if(favs.size>0){el.style.display='flex';el.textContent=favs.size;if(el2){el2.style.display='flex';el2.textContent=favs.size;}}else{el.style.display='none';if(el2)el2.style.display='none';}}
function render(){if(currentPage==='home')renderHome();else if(currentPage==='catalog')renderCatalog();else if(currentPage==='favorites')renderFavorites();else if(currentPage==='search')renderSearch();}
function movieCardHTML(m){const ph='https://placehold.co/300x450/141926/5a6480?text='+encodeURIComponent(m.title||'?');const src=m.img?imgSrc(m.img):ph;const isFav=favs.has(m.id);const myR=ratings[m.id]||0;const prog=progress[m.id]||0;return `<div class=""mc"" onclick=""openModal(${m.id})""><div class=""mct""><img src=""${src}"" alt=""${esc(m.title)}"" onerror=""imgError(this,'${esc(m.img||'')}',0)"" loading=""lazy""/><span class=""mrat"">★ ${m.rating}</span>${m.badge?`<span class=""mbadge"">${esc(m.badge)}</span>`:''}<span class=""fav-star"" onclick=""event.stopPropagation();toggleFavCard(${m.id})"" title=""${isFav?'Убрать из избранного':'В избранное'}"">${isFav?'❤️':'🤍'}</span>${myR?`<div class=""myrating"">★ ${myR}</div>`:''}${prog>0?`<div class=""progress-bar""><div class=""progress-fill"" style=""width:${prog}%""></div></div>`:''}<div class=""mco""><div class=""mco-p""><svg width=""11"" height=""11"" viewBox=""0 0 24 24"" fill=""#000""><polygon points=""5 3 19 12 5 21 5 3""/></svg></div><div class=""mco-t"">${esc(m.title)}</div><div class=""mco-s"">${m.year} · ${(m.genre||[])[0]||''}</div></div></div><div class=""mi""><div class=""mt2"">${esc(m.title)}</div><div class=""my2"">${m.year} · ${(m.genre||[])[0]||''}</div></div></div>`;}
function cwCardHTML(m){const prog=progress[m.id]||0;const ph='https://placehold.co/400x225/141926/5a6480?text='+encodeURIComponent(m.title||'?');const src=m.img?imgRaw(m.img):ph;return `<div class=""cwcard"" onclick=""openModal(${m.id})""><div class=""cwcard-thumb""><img src=""${src}"" alt=""${esc(m.title)}"" onerror=""imgError(this,'${esc(m.img||'')}',0)"" style=""width:100%;height:100%;object-fit:cover""/><div class=""cwcard-prog""><div class=""cwcard-fill"" style=""width:${prog}%""></div></div><button class=""cwcard-remove"" onclick=""event.stopPropagation();resetProgressCard(${m.id})"">✕</button></div><div class=""cwcard-info""><div class=""cwcard-title"">${esc(m.title)}</div><div class=""cwcard-sub"">Просмотрено ${prog}%</div></div></div>`;}
function rowHTML(items,label,targetG){if(!items.length)return'';const click=targetG?`currentGenre='${targetG}';nav('catalog')`:`nav('catalog')`;return`<section class=""sec""><div class=""sh""><h2>${label}</h2><button class=""sm"" onclick=""${click}"">Все →</button></div><div class=""rwrap""><button class=""rarr l"" onclick=""scrollRow(this,-1)"">‹</button><div class=""rw"">${items.map(movieCardHTML).join('')}</div><button class=""rarr r"" onclick=""scrollRow(this,1)"">›</button></div></section>`;}
function renderHome(){const el=document.getElementById('page-home');if(!movies.length){el.innerHTML=`<div class=""empty-hero""><h2>Добро пожаловать!</h2><p>Фильмов пока нет. Нажмите «+ Добавить» чтобы добавить первый фильм.</p><button class=""btn-p"" onclick=""nav('add')"" style=""margin-top:8px"">➕ Добавить фильм</button></div>`;return;}
  const hero=[...movies].reverse()[0];const ph='https://placehold.co/1200x700/141926/5a6480?text='+encodeURIComponent(hero.title);const heroImg=hero.img?imgRaw(hero.img):ph;const cwMovies=movies.filter(m=>(progress[m.id]||0)>0&&(progress[m.id]||0)<100);
  let html=`<div class=""hero-wrap""><div class=""hero-bg""></div><div class=""hero-img"" style=""background-image:url('${heroImg}')""></div><div class=""hc""><div class=""htag"">⭐ ${hero.year}</div><div class=""htitle"">${esc(hero.title)}</div><div class=""hmeta""><span class=""st"">★ ${hero.rating}</span><span class=""dot""></span><span>${esc(hero.duration||'')}</span><span class=""dot""></span><span>${esc(hero.country||'')}</span><span class=""dot""></span><span>${esc((hero.genre||[])[0]||'')}</span></div><p class=""hdesc"">${esc(hero.desc||'')}</p><div class=""hbtns""><button class=""btn-p"" onclick=""openModal(${hero.id})"">▶ Смотреть</button><button class=""btn-i"" onclick=""openModal(${hero.id})"">ℹ Подробнее</button></div></div></div><div class=""gpills"">${['все',...GENRES].map(g=>`<button class=""gp${currentGenre===g?' on':''}"" onclick=""setGenre('${g}')"">${g}</button>`).join('')}</div>`;
  if(cwMovies.length){html+=`<section class=""sec""><div class=""sh""><h2>🔔 Продолжить просмотр</h2></div><div class=""rwrap""><button class=""rarr l"" onclick=""scrollRow(this,-1)"">‹</button><div class=""rw"">${cwMovies.map(cwCardHTML).join('')}</div><button class=""rarr r"" onclick=""scrollRow(this,1)"">›</button></div></section>`;}
  if(favs.size){const favMovies=movies.filter(m=>favs.has(m.id)).slice(0,12);html+=rowHTML(favMovies,'❤️ Избранное','');}
  const recent=[...movies].reverse().slice(0,12);const top=[...movies].sort((a,b)=>b.rating-a.rating).slice(0,10);
  html+=rowHTML(recent,'🆕 Последние добавленные');html+=rowHTML(top,'🏆 Топ по рейтингу');
  GENRES.forEach(g=>{const gm=movies.filter(m=>(m.genre||[]).includes(g));if(gm.length>=2)html+=rowHTML(gm.slice(0,12),genreEmoji(g)+' '+capitalize(g),g);});
  html+=`<footer><div class=""fl"">KINO<span>FILM</span></div><div class=""ft"">© 2025 KinoFilm</div></footer>`;el.innerHTML=html;}
function renderCatalog(){const el=document.getElementById('page-catalog');let list=movies;if(currentGenre!=='все')list=list.filter(m=>(m.genre||[]).includes(currentGenre));el.innerHTML=`<h1 class=""page-title"">Каталог — ${list.length} фильмов</h1><div class=""gpills"" style=""padding:0 0 14px"">${['все',...GENRES].map(g=>`<button class=""gp${currentGenre===g?' on':''}"" onclick=""setGenre('${g}');render()"">${g}</button>`).join('')}</div>${list.length===0?'<div class=""empty"">Ничего не найдено</div>':`<div class=""mgrid"">${list.map(movieCardHTML).join('')}</div>`}`;}
function renderFavorites(){const el=document.getElementById('page-favorites');const list=movies.filter(m=>favs.has(m.id));el.innerHTML=`<h1 class=""page-title"">⭐ Избранное — ${list.length} фильмов</h1>${list.length===0?'<div class=""empty"">Вы ещё не добавили фильмы в избранное.<br><br><button class=""btn-p"" onclick=""nav(\'home\')"">На главную</button></div>':`<div class=""mgrid"">${list.map(movieCardHTML).join('')}</div>`}`;}
function renderSearch(){const el=document.getElementById('page-search');const q=searchQ.trim().toLowerCase();const list=!q?[]:movies.filter(m=>m.title.toLowerCase().includes(q)||(m.genre||[]).some(g=>g.includes(q))||(m.country||'').toLowerCase().includes(q));el.innerHTML=`<h1 class=""page-title"">Поиск</h1><div class=""sw"" style=""max-width:380px;margin-bottom:20px;display:flex""><svg width=""13"" height=""13"" viewBox=""0 0 24 24"" fill=""none"" stroke=""currentColor"" stroke-width=""2.5""><circle cx=""11"" cy=""11"" r=""8""/><path d=""m21 21-4.35-4.35""/></svg><input placeholder=""Название, жанр, страна…"" value=""${esc(searchQ)}"" oninput=""onSearch(this.value)"" autofocus style=""background:none;border:none;outline:none;color:var(--text);font-family:'Nunito',sans-serif;font-size:13px;width:100%""/></div>${!q?'<div class=""empty"">Начните вводить название</div>':list.length===0?`<div class=""empty"">Ничего не найдено по «${esc(searchQ)}»</div>`:`<div class=""mgrid"">${list.map(movieCardHTML).join('')}</div>`}`;}
function setGenre(g){currentGenre=g;render();}
function openModal(id){modalMovie=movies.find(m=>m.id===id);if(!modalMovie)return;const saved=iframes[id]||modalMovie.iframeUrl||'';const isFav=favs.has(id);const myR=ratings[id]||0;const prog=progress[id]||0;tempProgress=prog;
  document.getElementById('modal-player').innerHTML=`<div class=""ply-ph""><div class=""pc"" onclick=""playMovie()"">▶</div><span style=""font-size:13px"">${saved?'▶ Нажмите для воспроизведения':'Вставьте ссылку на плеер ниже'}</span></div>`;
  document.getElementById('m-title').textContent=modalMovie.title;document.getElementById('m-meta').innerHTML=`<span class=""st"">★ ${modalMovie.rating}</span><span>${modalMovie.year}</span><span>${modalMovie.duration||''}</span><span>${modalMovie.country||''}</span><span>${(modalMovie.genre||[]).join(', ')}</span>`;document.getElementById('m-desc').textContent=modalMovie.desc||'';document.getElementById('m-url').value=saved;document.getElementById('m-note').textContent=saved?'✅ Ссылка сохранена':'Ссылка не задана';document.getElementById('m-del-btn').style.display=modalMovie.custom?'':'none';
  const fb=document.getElementById('m-fav-btn');fb.textContent=isFav?'❤️ В избранном':'🤍 В избранное';fb.className='act-btn act-fav'+(isFav?' on':'');
  const tid=ytId(modalMovie.trailer||'');document.getElementById('m-trailer-btn').style.display=tid?'':'none';
  renderStars(myR);const ps=document.getElementById('prog-section');ps.style.display=saved?'':'none';if(saved){document.getElementById('prog-fill2').style.width=prog+'%';document.getElementById('prog-watched').textContent=prog+'%';}
  document.getElementById('modal-bg').classList.add('open');document.body.style.overflow='hidden';}
function closeModal(){document.getElementById('modal-bg').classList.remove('open');document.body.style.overflow='';document.getElementById('player-controls').classList.remove('show');const f=document.querySelector('#modal-player iframe');if(f)f.src='';if(_playerMode)exitPlayerMode();}
function playMovie(){const url=document.getElementById('m-url').value.trim();if(!url)return;document.getElementById('modal-player').innerHTML=`<iframe src=""${url}"" allowfullscreen allow=""autoplay; encrypted-media; fullscreen; picture-in-picture"" referrerpolicy=""no-referrer-when-downgrade"" title=""${esc(modalMovie?.title||'')}""></iframe>`;document.getElementById('prog-section').style.display='';document.getElementById('player-controls').classList.add('show');}
function saveLink(){const url=document.getElementById('m-url').value.trim();if(!modalMovie)return;if(url)iframes[modalMovie.id]=url;else delete iframes[modalMovie.id];saveAll();document.getElementById('m-note').textContent=url?'✅ Ссылка сохранена':'Ссылка не задана';document.getElementById('prog-section').style.display=url?'':'none';}
function clearLink(){document.getElementById('m-url').value='';if(modalMovie){delete iframes[modalMovie.id];saveAll();}document.getElementById('m-note').textContent='Ссылка не задана';document.getElementById('modal-player').innerHTML=`<div class=""ply-ph""><div class=""pc"" onclick=""playMovie()"">▶</div><span style=""font-size:13px"">Вставьте ссылку на плеер ниже</span></div>`;document.getElementById('prog-section').style.display='none';}
function deleteMovie(){if(!modalMovie||!confirm(`Удалить «${modalMovie.title}»?`))return;movies=movies.filter(m=>m.id!==modalMovie.id);delete iframes[modalMovie.id];favs.delete(modalMovie.id);delete ratings[modalMovie.id];delete progress[modalMovie.id];saveAll();closeModal();render();}
function toggleFav(){if(!modalMovie)return;if(favs.has(modalMovie.id))favs.delete(modalMovie.id);else favs.add(modalMovie.id);const isFav=favs.has(modalMovie.id);const fb=document.getElementById('m-fav-btn');fb.textContent=isFav?'❤️ В избранном':'🤍 В избранное';fb.className='act-btn act-fav'+(isFav?' on':'');saveAll();updateFavCount();render();}
function toggleFavCard(id){if(favs.has(id))favs.delete(id);else favs.add(id);saveAll();updateFavCount();render();}
function renderStars(val){const row=document.getElementById('stars-row');const sc=document.getElementById('my-score');row.innerHTML=[1,2,3,4,5,6,7,8,9,10].map(i=>`<button class=""star-btn${i<=val?' on':''}"" onclick=""setRating(${i})"" onmouseover=""previewRating(${i})"" onmouseout=""renderStars(${ratings[modalMovie?.id]||0})"">★</button>`).join('');sc.textContent=val?val+'/10':'';}
function previewRating(val){document.querySelectorAll('.star-btn').forEach((b,i)=>{b.classList.toggle('on',i<val);});}
function setRating(val){if(!modalMovie)return;ratings[modalMovie.id]=val;saveAll();renderStars(val);render();}
function setProgress(e){const track=document.getElementById('prog-track');const rect=track.getBoundingClientRect();const pct=Math.round(Math.max(0,Math.min(100,(e.clientX-rect.left)/rect.width*100)));tempProgress=pct;document.getElementById('prog-fill2').style.width=pct+'%';document.getElementById('prog-watched').textContent=pct+'%';}
function saveProgress(){if(!modalMovie)return;progress[modalMovie.id]=tempProgress;saveAll();render();}
function resetProgress(){if(!modalMovie)return;progress[modalMovie.id]=0;tempProgress=0;document.getElementById('prog-fill2').style.width='0%';document.getElementById('prog-watched').textContent='0%';saveAll();render();}
function resetProgressCard(id){delete progress[id];saveAll();render();}
function openTrailer(){if(!modalMovie)return;const tid=ytId(modalMovie.trailer||'');if(!tid)return;document.getElementById('trailer-frame').src=`https://www.youtube.com/embed/${tid}?autoplay=1`;document.getElementById('trailer-bg').classList.add('open');}
function closeTrailer(){document.getElementById('trailer-bg').classList.remove('open');document.getElementById('trailer-frame').src='';}
function buildGenreChecks(){document.getElementById('genre-checks').innerHTML=GENRES.map(g=>`<button class=""gchk"" type=""button"" data-g=""${g}"" onclick=""this.classList.toggle('on')"">${g}</button>`).join('');}
function addMovie(){const title=document.getElementById('f-title').value.trim();if(!title){alert('Введите название!');return;}const selG=[...document.querySelectorAll('.gchk.on')].map(e=>e.dataset.g);if(!selG.length){alert('Выберите жанр!');return;}const trailer=document.getElementById('f-trailer').value.trim();const m={id:Date.now(),title,year:+document.getElementById('f-year').value||2024,rating:+document.getElementById('f-rating').value||7.0,duration:document.getElementById('f-duration').value.trim(),country:document.getElementById('f-country').value.trim(),badge:document.getElementById('f-badge').value.trim(),img:document.getElementById('f-img').value.trim(),iframeUrl:document.getElementById('f-iframe').value.trim(),trailer,desc:document.getElementById('f-desc').value.trim(),genre:selG,custom:true};if(m.iframeUrl){iframes[m.id]=m.iframeUrl;}movies.push(m);saveAll();['f-title','f-duration','f-country','f-badge','f-img','f-trailer','f-iframe','f-desc'].forEach(id=>document.getElementById(id).value='');document.getElementById('f-year').value=2024;document.getElementById('f-rating').value='7.0';document.querySelectorAll('.gchk.on').forEach(e=>e.classList.remove('on'));document.getElementById('poster-preview').style.display='none';const t=document.getElementById('add-toast');t.style.display='inline-block';setTimeout(()=>t.style.display='none',3000);}
function exportMovies(){if(!movies.length){alert('Нет фильмов!');return;}const data=JSON.stringify({movies,iframes,favs:[...favs],ratings,progress},null,2);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download='cinemahub_'+new Date().toISOString().slice(0,10)+'.json';a.click();URL.revokeObjectURL(a.href);}
function importMovies(e){const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(!Array.isArray(d.movies)){alert('Неверный формат!');return;}const merge=confirm(`Найдено ${d.movies.length} фильмов.\nOK — добавить к существующим\nОтмена — заменить все`);if(merge){const ids=new Set(movies.map(m=>m.id));movies=[...movies,...d.movies.filter(m=>!ids.has(m.id))];if(d.iframes)iframes={...d.iframes,...iframes};if(d.favs)d.favs.forEach(id=>favs.add(id));if(d.ratings)Object.assign(ratings,d.ratings);if(d.progress)Object.assign(progress,d.progress);}else{movies=d.movies;iframes=d.iframes||{};favs=new Set(d.favs||[]);ratings=d.ratings||{};progress=d.progress||{};}saveAll();updateFavCount();render();alert('✅ Импортировано фильмов: '+d.movies.length);}catch{alert('Ошибка файла!');}};reader.readAsText(file);e.target.value='';}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/""/g,'&quot;')}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function scrollRow(btn,dir){const r=btn.parentElement.querySelector('.rw');if(r)r.scrollBy({left:dir*270,behavior:'smooth'})}
function genreEmoji(g){return{боевик:'💥',приключения:'🗺️',комедия:'😂',драма:'🎭',триллер:'🔪',ужасы:'👻',фантастика:'🚀',фэнтези:'🧙',романтика:'💕',детектив:'🕵️',криминал:'🦹',семейный:'👨‍👩‍👧',анимация:'🎨',документальный:'🎥',биография:'📖',исторический:'📜',военный:'⚔️',спорт:'⚽',музыкальный:'🎵',вестерн:'🤠'}[g]||'🎬'}
function showPlayerControls(){document.getElementById('player-controls').classList.add('show');}
function playerCmd(cmd){var iframe=document.querySelector('#modal-player iframe');if(cmd==='fullscreen'){var pl=document.getElementById('modal-player');var pc=document.getElementById('player-controls');var btn=document.getElementById('pctrl-fs');if(pl.classList.contains('fullmode')){pl.classList.remove('fullmode');document.body.style.overflow='hidden';if(btn)btn.textContent='[ ] Полный экран';}else{pl.classList.add('fullmode');document.body.style.overflow='hidden';if(pc)pc.classList.add('show');if(btn)btn.textContent='✕ Выйти';}return;}if(!iframe)return;var w=iframe.contentWindow;var src=iframe.src||'';if(src.indexOf('variyt')>=0||src.indexOf('alloha')>=0){if(cmd==='pause'){w.postMessage({name:'player',action:'pause'},'*');w.postMessage('pause','*');}if(cmd==='seekBack')w.postMessage({name:'player',action:'rewind',value:10},'*');if(cmd==='seekFwd')w.postMessage({name:'player',action:'forward',value:10},'*');if(cmd==='volDown')w.postMessage({name:'player',action:'volume',value:-10},'*');if(cmd==='volUp')w.postMessage({name:'player',action:'volume',value:10},'*');return;}if(cmd==='pause'){w.postMessage(JSON.stringify({method:'pause'}),'*');w.postMessage({action:'pause'},'*');}if(cmd==='seekBack')w.postMessage(JSON.stringify({method:'seek',seconds:-10}),'*');if(cmd==='seekFwd')w.postMessage(JSON.stringify({method:'seek',seconds:10}),'*');if(cmd==='volDown')w.postMessage(JSON.stringify({method:'setVolume',value:0.4}),'*');if(cmd==='volUp')w.postMessage(JSON.stringify({method:'setVolume',value:0.6}),'*');}
function togglePlayerControls(){var pc=document.getElementById('player-controls');var ps=document.getElementById('pctrl-show');var isShown=pc.classList.contains('show');if(isShown){pc.classList.remove('show');if(ps)ps.style.display='block';}else{pc.classList.add('show');if(ps)ps.style.display='none';}}
var _playerMode=false;
function togglePlayerMode(){_playerMode=!_playerMode;_updatePlayerModeBtn();}
function _updatePlayerModeBtn(){var btn=document.getElementById('pctrl-mode');if(!btn)return;if(_playerMode){btn.textContent='🎮 Режим пульта: ВКЛ (Назад = выход)';btn.style.background='rgba(80,200,80,.25)';btn.style.borderColor='rgba(80,200,80,.6)';}else{btn.textContent='🎮 Режим пульта: ВЫКЛ';btn.style.background='rgba(255,100,100,.2)';btn.style.borderColor='rgba(255,100,100,.5)';}}
function exitPlayerMode(){if(!_playerMode)return false;_playerMode=false;_updatePlayerModeBtn();document.getElementById('player-controls').classList.add('show');var ps=document.getElementById('pctrl-show');if(ps)ps.style.display='none';return true;}
(function(){var _cur=null;var s=document.createElement('style');s.textContent='.__tv{outline:4px solid #f0c040!important;outline-offset:3px!important;border-radius:6px;}';document.head.appendChild(s);
function vis(el){if(!el||el.disabled)return false;var cs=window.getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||cs.opacity==='0')return false;return el.offsetWidth>0&&el.offsetHeight>0;}
function absTop(el){var t=0;while(el){t+=el.offsetTop;el=el.offsetParent;}return t;}
function absLeft(el){var l=0;while(el){l+=el.offsetLeft;el=el.offsetParent;}return l;}
function absMidX(el){return absLeft(el)+el.offsetWidth/2;}
function absMidY(el){return absTop(el)+el.offsetHeight/2;}
function isInput(el){return el.tagName==='INPUT'||el.tagName==='TEXTAREA';}
function items(scope){var sel='button:not([style*=""display:none""]):not([style*=""display: none""]), input:not([type=file]):not([type=number]), textarea, .mc, .gchk, .cwcard, .gp';return Array.from((scope||document).querySelectorAll(sel)).filter(vis);}
function setFocus(el){if(_cur&&_cur!==el)_cur.classList.remove('__tv');_cur=el;if(el){el.classList.add('__tv');el.scrollIntoView({block:'nearest',behavior:'smooth'});}}
function clearFocus(){if(_cur)_cur.classList.remove('__tv');_cur=null;}
function sortedItems(scope){return items(scope).sort(function(a,b){var ay=absTop(a),by=absTop(b);var rowDiff=ay-by;if(Math.abs(rowDiff)>30)return rowDiff;return absLeft(a)-absLeft(b);});}
window.onTvKey=function(key){
  if(key==='Back'||key==='Escape'||key==='GoBack'){
    var tb=document.getElementById('trailer-bg');if(tb&&tb.classList.contains('open')){closeTrailer();return;}if(exitPlayerMode())return;var mb=document.getElementById('modal-bg');if(mb&&mb.classList.contains('open')){closeModal();return;}return;}
  var tb2=document.getElementById('trailer-bg');if(tb2&&tb2.classList.contains('open')){if(key==='Enter')closeTrailer();return;}
  var iframe=document.querySelector('#modal-player iframe');
  if(iframe&&_playerMode){var keyMap={'Enter':{key:' ',code:'Space',keyCode:32},'ArrowLeft':{key:'ArrowLeft',code:'ArrowLeft',keyCode:37},'ArrowRight':{key:'ArrowRight',code:'ArrowRight',keyCode:39},'ArrowUp':{key:'ArrowUp',code:'ArrowUp',keyCode:38},'ArrowDown':{key:'ArrowDown',code:'ArrowDown',keyCode:40},'MediaPlayPause':null,'MediaPlay':null,'MediaPause':null,'MediaRewind':null,'MediaFastForward':null};
    if(key==='MediaPlayPause'||key==='MediaPlay'||key==='MediaPause'){var w2=iframe.contentWindow;w2.postMessage({name:'player',action:'pause'},'*');w2.postMessage(JSON.stringify({method:'pause'}),'*');w2.postMessage({action:'pause'},'*');return;}
    if(key==='MediaRewind'){var w3=iframe.contentWindow;w3.postMessage({name:'player',action:'rewind',value:10},'*');w3.postMessage(JSON.stringify({method:'seek',seconds:-10}),'*');return;}
    if(key==='MediaFastForward'){var w4=iframe.contentWindow;w4.postMessage({name:'player',action:'forward',value:10},'*');w4.postMessage(JSON.stringify({method:'seek',seconds:10}),'*');return;}
    var mapped=keyMap[key];if(mapped){try{iframe.focus();var opts={key:mapped.key,code:mapped.code,keyCode:mapped.keyCode,which:mapped.keyCode,bubbles:true,cancelable:true};iframe.contentWindow.document.dispatchEvent(new KeyboardEvent('keydown',opts));iframe.contentWindow.document.dispatchEvent(new KeyboardEvent('keyup',opts));iframe.contentWindow.document.body.dispatchEvent(new KeyboardEvent('keydown',opts));}catch(e){var wf=iframe.contentWindow;if(key==='Enter')wf.postMessage({name:'player',action:'pause'},'*');if(key==='ArrowLeft')wf.postMessage({name:'player',action:'rewind',value:10},'*');if(key==='ArrowRight')wf.postMessage({name:'player',action:'forward',value:10},'*');}return;}}
  var mb2=document.getElementById('modal-bg');var inModal=mb2&&mb2.classList.contains('open');var scope=inModal?mb2:null;var list=sortedItems(scope);if(!list.length)return;
  var idx=_cur?list.indexOf(_cur):-1;
  if(key==='Enter'){if(idx===-1)idx=0;var el=list[idx];if(!el)return;if(isInput(el)){el.focus();}else{document.querySelectorAll('input,textarea').forEach(function(i){i.blur();});el.click();}return;}
  if(idx===-1){setFocus(list[0]);return;}
  var cur=list[idx];var curY=absMidY(cur);var curX=absMidX(cur);
  if(key==='ArrowRight'){setFocus(list[(idx+1)%list.length]);}
  else if(key==='ArrowLeft'){setFocus(list[(idx-1+list.length)%list.length]);}
  else if(key==='ArrowDown'){var best=-1,bestDist=999999;for(var i=0;i<list.length;i++){if(i===idx)continue;var ey=absMidY(list[i]);if(ey>curY+10){var dy=ey-curY,dx=Math.abs(absMidX(list[i])-curX);var dist=dy+dx*0.3;if(dist<bestDist){bestDist=dist;best=i;}}}if(best>=0)setFocus(list[best]);else setFocus(list[(idx+1)%list.length]);}
  else if(key==='ArrowUp'){var best2=-1,bestDist2=999999;for(var j=0;j<list.length;j++){if(j===idx)continue;var ey2=absMidY(list[j]);if(ey2<curY-10){var dy2=curY-ey2,dx2=Math.abs(absMidX(list[j])-curX);var dist2=dy2+dx2*0.3;if(dist2<bestDist2){bestDist2=dist2;best2=j;}}}if(best2>=0)setFocus(list[best2]);else setFocus(list[(idx-1+list.length)%list.length]);}
};
document.addEventListener('keydown',function(e){if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Escape'].includes(e.key)){e.preventDefault();window.onTvKey(e.key==='Escape'?'Back':e.key);}},true);
function initFocus(){clearFocus();setTimeout(function(){var list=sortedItems();if(list.length)setFocus(list[0]);},400);}
window.addEventListener('load',initFocus);
var _nav=window.nav;window.nav=function(p){clearFocus();_nav(p);setTimeout(function(){var list=sortedItems();if(list.length)setFocus(list[0]);},350);};
var _openModal=window.openModal;window.openModal=function(id){_openModal(id);setTimeout(function(){var mb=document.getElementById('modal-bg');if(!mb)return;clearFocus();var list=sortedItems(mb);if(list.length)setFocus(list[0]);},250);};
var _closeModal=window.closeModal;window.closeModal=function(){_closeModal();clearFocus();setTimeout(function(){var list=sortedItems();if(list.length)setFocus(list[0]);},250);};
})();

// PLAYER FINDER
function openPlayerFinder(){
  const title = _lastSearchNameRu || document.getElementById('f-title').value.trim();
  const searchUrl = title
    ? 'https://hd.lordfilm-tre.ru/?do=search&subaction=search&story=' + encodeURIComponent(title)
    : 'https://hd.lordfilm-tre.ru/';
  const st = document.getElementById('page-finder-status');
  if(st){ st.style.display='block'; st.textContent = '🎬 Открываю LordFilm...' + (title ? ' Ищу: ' + title : ''); }
  if(window.KinoFilmBridge) window.KinoFilmBridge.openFinder(searchUrl);
}

function closePlayerFinder(){
  const st = document.getElementById('page-finder-status');
  if(st) st.style.display='none';
  if(window.KinoFilmBridge) window.KinoFilmBridge.closeFinder();
}

window.onIframeCaptured = function(url){
  document.getElementById('f-iframe').value = url;
  const st = document.getElementById('page-finder-status');
  if(st){ st.style.display='block'; st.innerHTML = '✅ <b>Плеер найден!</b> ' + url; }
  setTimeout(()=>{ if(st) st.style.display='none'; }, 4000);
};

// ═══════════════════════════════════════════════════════
//  СЕРВЕРНЫЙ ПОИСК — два сервера
//  SERVER_URL  → метаданные фильма (Render)
//  IFRAME_URL  → поиск плеера на LordFilm (Leapcell)
// ═══════════════════════════════════════════════════════
const SERVER_URL = 'https://kinofilm-api.onrender.com';
const IFRAME_URL = 'https://kinofilmifraim-rendy2472156-q96sottg.leapcell.dev';
let _lastSearchNameRu = '';

async function retryIframeSearch(){
  const customName = document.getElementById('f-iframe-search').value.trim();
  if(!customName){alert('Введите название для повторного поиска!\nНапример: Остров проклятых');return;}
  const searchTitle = customName;
  const status = document.getElementById('srv-status');
  document.getElementById('f-iframe').value='';
  status.textContent='⏳ Ищу плеер по названию: '+searchTitle+' (без года)...';
  try{
    const ir=await fetch(IFRAME_URL+'/iframe?name='+encodeURIComponent(searchTitle));
    const id=await ir.json();
    if(id.iframeUrl){
      document.getElementById('f-iframe').value=id.iframeUrl;
      document.getElementById('f-iframe-search').value='';
      status.textContent='✅ Плеер найден!';
    } else {
      status.textContent='⚠️ Плеер не найден по «'+searchTitle+'» — попробуй другое название';
    }
  }catch(e){
    status.textContent='❌ Сервер плеера недоступен';
  }
}

async function translateToRu(text){
  if(!text)return text;
  if(/[Ѐ-ӿ]/.test(text))return text;
  try{
    const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q='+encodeURIComponent(text);
    const r=await fetch(url);
    const d=await r.json();
    return d[0].map(c=>c[0]).join('').trim()||text;
  }catch{return text;}
}

async function serverSearch(){
  const q=document.getElementById('srv-query').value.trim();
  if(!q){alert('Введите название!');return;}
  const btn=document.getElementById('srv-btn'),status=document.getElementById('srv-status'),results=document.getElementById('srv-results');
  btn.textContent='⏳ Поиск...';btn.disabled=true;
  status.textContent='Ищу... (первый запрос может занять 30-50 сек)';
  results.innerHTML='';
  try{
    const r=await fetch(SERVER_URL+'/search?q='+encodeURIComponent(q));
    const data=await r.json();
    if(!r.ok||data.error){status.textContent='❌ '+(data.error||'Ошибка');return;}
    status.textContent='Найдено '+data.results.length+' вариантов:';
    results.innerHTML=data.results.map(m=>`<div onclick=""serverLoadMovie('${esc(m.imdbId)}','${esc(m.title)}','${esc(m.year)}')"" style=""display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:6px;background:var(--s2);border:1px solid var(--brd);border-radius:8px;cursor:pointer"" onmouseover=""this.style.borderColor='var(--acc)'"" onmouseout=""this.style.borderColor='var(--brd)'"">` +
      (m.poster ? `<img src=""${m.poster}"" style=""width:36px;height:54px;object-fit:cover;border-radius:4px"" onerror=""this.style.display='none'""/>` : `<div style=""width:36px;height:54px;background:var(--brd);border-radius:4px""></div>`) +
      `<div><div style=""font-weight:800;font-size:13px"">${esc(m.title)}</div><div style=""font-size:11px;color:var(--muted)"">${m.year}</div></div><span style=""margin-left:auto"">→</span></div>`).join('');
  }catch(e){status.textContent='❌ Сервер недоступен';}
  finally{btn.textContent='🔍 Найти';btn.disabled=false;}
}

async function serverLoadMovie(imdbId, nameRu, yearHint){
  _lastSearchNameRu = nameRu;
  const status=document.getElementById('srv-status');
  document.getElementById('srv-results').innerHTML='';
  status.textContent='⏳ Загружаю данные фильма...';
  try{
    // Шаг 1: метаданные с первого сервера
    const r=await fetch(SERVER_URL+'/movie?id='+imdbId+'&name='+encodeURIComponent(nameRu));
    const m=await r.json();
    if(!r.ok||m.error){status.textContent='❌ '+(m.error||'Ошибка');return;}

    // Заполняем форму сразу — не ждём плеер
    const titleFinal = nameRu || await translateToRu(m.title||'');
    const countryFinal = await translateToRu(m.country||'');
    document.getElementById('f-title').value=titleFinal;
    document.getElementById('f-year').value=m.year||yearHint||2024;
    document.getElementById('f-rating').value=m.rating||7.0;
    document.getElementById('f-duration').value=m.duration||'';
    document.getElementById('f-country').value=countryFinal;
    document.getElementById('f-img').value=m.img||'';
    document.getElementById('f-iframe').value='';
    document.getElementById('f-iframe-search').value='';
    document.getElementById('f-desc').value=m.desc||'';
    if(m.img)previewPoster(m.img);
    document.querySelectorAll('.gchk').forEach(b=>b.classList.toggle('on',(m.genre||[]).includes(b.dataset.g)));
    document.getElementById('srv-query').value='';
    document.getElementById('f-title').scrollIntoView({behavior:'smooth',block:'center'});

    // Шаг 2: ищем плеер на втором сервере (параллельно)
    const searchTitle = nameRu || m.title;
    const searchYear  = m.year  || yearHint || '';
    status.textContent='⏳ Ищу плеер на LordFilm... (30-60 сек)';
    try{
      const ir=await fetch(IFRAME_URL+'/iframe?name='+encodeURIComponent(searchTitle)+'&year='+searchYear);
      const id=await ir.json();
      if(id.iframeUrl){
        document.getElementById('f-iframe').value=id.iframeUrl;
        status.textContent='✅ Готово! ✅ Плеер найден!';
      } else {
        status.textContent='✅ Данные загружены. ⚠️ Плеер не найден — нажми 🎬 Найти плеер';
      }
    }catch(e){
      status.textContent='✅ Данные загружены. ⚠️ Сервер плеера недоступен — нажми 🎬 Найти плеер';
    }
  }catch(e){status.textContent='❌ Ошибка соединения';}
}

// INIT
loadData();buildGenreChecks();updateFavCount();render();
</script>
</body>
</html>
";

    public MainPage()
    {
        InitializeComponent();

#if ANDROID
        Microsoft.Maui.Handlers.WebViewHandler.Mapper.AppendToMapping("TvSetup", (handler, view) =>
        {
            handler.PlatformView.Settings.JavaScriptEnabled = true;
            handler.PlatformView.Settings.DomStorageEnabled = true;
            handler.PlatformView.Settings.DatabaseEnabled = true;
            handler.PlatformView.Settings.JavaScriptCanOpenWindowsAutomatically = true;
            handler.PlatformView.Settings.SetNeedInitialFocus(true);
            handler.PlatformView.Focusable = true;
            handler.PlatformView.FocusableInTouchMode = true;
            handler.PlatformView.DescendantFocusability = Android.Views.DescendantFocusability.AfterDescendants;
            handler.PlatformView.SetOnTouchListener(null);
            handler.PlatformView.RequestFocus();

            handler.PlatformView.SetWebViewClient(new AppSchemeWebViewClient(this));
            handler.PlatformView.AddJavascriptInterface(new MainBridge(this), "KinoFilmBridge");
        });
#endif

        TvWebView.Source = new HtmlWebViewSource
        {
            Html = SiteHtml,
            BaseUrl = "https://localhost/"
        };

        TvWebView.Loaded += (s, e) =>
        {
#if ANDROID
            var platformView = TvWebView.Handler?.PlatformView as Android.Webkit.WebView;
            platformView?.RequestFocus();
#endif
        };

#pragma warning disable CS0618
        MessagingCenter.Subscribe<object, string>(this, "TvKeyDown", (sender, keyName) =>
        {
            MainThread.BeginInvokeOnMainThread(async () =>
            {
                if (TvWebView == null) return;

#if ANDROID
                var platformView = TvWebView.Handler?.PlatformView as Android.Webkit.WebView;
                if (platformView != null)
                {
                    var imm = (InputMethodManager?)platformView.Context?.GetSystemService(Context.InputMethodService);
                    imm?.HideSoftInputFromWindow(platformView.WindowToken, 0);
                }
#endif
                await TvWebView.EvaluateJavaScriptAsync($"if(window.onTvKey) window.onTvKey('{keyName}');");
            });
        });
#pragma warning restore CS0618
    }

    protected override bool OnBackButtonPressed()
    {
        MainThread.BeginInvokeOnMainThread(async () =>
        {
            if (TvWebView != null)
                await TvWebView.EvaluateJavaScriptAsync("if(window.onTvKey) window.onTvKey('Back');");
        });
        return true;
    }

#if ANDROID
    public class TvFocusChangeListener : Java.Lang.Object, Android.Views.View.IOnFocusChangeListener
    {
        public void OnFocusChange(Android.Views.View? v, bool hasFocus) { }
    }

    private Android.Webkit.WebView? _finderWebView;
    private Android.Widget.FrameLayout? _finderOverlay;

    private static readonly string[] PlayerDomains = {
        "variyt.ws", "kodik", "alloha", "videoframe", "hdrezka",
        "sibnet", "collaps", "cdnmovies", "bazon", "kinozal"
    };

    public void OpenFinderOverlay(string startUrl)
    {
        var activity = Platform.CurrentActivity;
        if (activity == null) return;

        var rootView = activity.FindViewById<Android.Widget.FrameLayout>(Android.Resource.Id.Content);
        if (rootView == null) return;

        _finderOverlay = new Android.Widget.FrameLayout(activity);
        _finderOverlay.SetBackgroundColor(Android.Graphics.Color.ParseColor("#07090e"));

        var bar = new Android.Widget.LinearLayout(activity);
        bar.Orientation = Android.Widget.Orientation.Horizontal;
        bar.SetPadding(16, 12, 16, 12);
        bar.SetBackgroundColor(Android.Graphics.Color.ParseColor("#0d1019"));

        var closeBtn = new Android.Widget.Button(activity);
        closeBtn.Text = "✕ Закрыть";
        closeBtn.SetBackgroundColor(Android.Graphics.Color.ParseColor("#ff4560"));
        closeBtn.SetTextColor(Android.Graphics.Color.White);
        closeBtn.Click += (s, e) => CloseFinderOverlay(null);
        var closeLp = new Android.Widget.LinearLayout.LayoutParams(
            Android.Views.ViewGroup.LayoutParams.WrapContent,
            Android.Views.ViewGroup.LayoutParams.WrapContent);
        closeLp.SetMargins(0, 0, 16, 0);
        bar.AddView(closeBtn, closeLp);

        var statusTv = new Android.Widget.TextView(activity);
        statusTv.Text = "🎬 Открой фильм — плеер определится автоматически";
        statusTv.SetTextColor(Android.Graphics.Color.ParseColor("#f0c040"));
        statusTv.TextSize = 12f;
        statusTv.Tag = "finder-status";
        var statusLp = new Android.Widget.LinearLayout.LayoutParams(0,
            Android.Views.ViewGroup.LayoutParams.WrapContent, 1f);
        bar.AddView(statusTv, statusLp);

        var barLp = new Android.Widget.FrameLayout.LayoutParams(
            Android.Views.ViewGroup.LayoutParams.MatchParent,
            Android.Views.ViewGroup.LayoutParams.WrapContent);
        _finderOverlay.AddView(bar, barLp);

        _finderWebView = new Android.Webkit.WebView(activity);
        _finderWebView.Settings.JavaScriptEnabled = true;
        _finderWebView.Settings.DomStorageEnabled = true;
        _finderWebView.Settings.SetSupportMultipleWindows(true);
        _finderWebView.Settings.JavaScriptCanOpenWindowsAutomatically = true;
        _finderWebView.Settings.UserAgentString =
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

        _finderWebView.SetWebViewClient(new FinderWebViewClient(this, statusTv));
        _finderWebView.AddJavascriptInterface(new AndroidBridge(this), "AndroidBridge");
        _finderWebView.LoadUrl(startUrl);

        var webLp = new Android.Widget.FrameLayout.LayoutParams(
            Android.Views.ViewGroup.LayoutParams.MatchParent,
            Android.Views.ViewGroup.LayoutParams.MatchParent);
        webLp.TopMargin = 130;
        _finderOverlay.AddView(_finderWebView, webLp);

        var overlayLp = new Android.Widget.FrameLayout.LayoutParams(
            Android.Views.ViewGroup.LayoutParams.MatchParent,
            Android.Views.ViewGroup.LayoutParams.MatchParent);
        rootView.AddView(_finderOverlay, overlayLp);
    }

    public void CloseFinderOverlay(string? capturedUrl)
    {
        MainThread.BeginInvokeOnMainThread(async () =>
        {
            if (_finderOverlay != null)
            {
                var activity = Platform.CurrentActivity;
                var rootView = activity?.FindViewById<Android.Widget.FrameLayout>(Android.Resource.Id.Content);
                rootView?.RemoveView(_finderOverlay);
                _finderWebView?.Destroy();
                _finderWebView = null;
                _finderOverlay = null;
            }

            if (!string.IsNullOrEmpty(capturedUrl) && TvWebView != null)
            {
                var safe = capturedUrl.Replace("'", "\\'");
                await TvWebView.EvaluateJavaScriptAsync($"if(window.onIframeCaptured) window.onIframeCaptured('{safe}');");
            }
        });
    }

    public class AndroidBridge : Java.Lang.Object
    {
        private readonly MainPage _page;
        public AndroidBridge(MainPage page) { _page = page; }

        [Android.Webkit.JavascriptInterface]
        [Java.Interop.Export("onPlayerFound")]
        public void OnPlayerFound(string url)
        {
            _page.CloseFinderOverlay(url);
        }
    }

    public class FinderWebViewClient : Android.Webkit.WebViewClient
    {
        private readonly MainPage _page;
        private readonly Android.Widget.TextView _status;

        public FinderWebViewClient(MainPage page, Android.Widget.TextView status)
        {
            _page = page;
            _status = status;
        }

        public override bool ShouldOverrideUrlLoading(Android.Webkit.WebView? view, Android.Webkit.IWebResourceRequest? request)
        {
            var url = request?.Url?.ToString() ?? "";
            if (PlayerDomains.Any(d => url.Contains(d)))
            {
                MainThread.BeginInvokeOnMainThread(() =>
                {
                    _status.Text = "✅ Плеер найден! " + url;
                });
                _page.CloseFinderOverlay(url);
                return true;
            }
            return false;
        }

        public override void OnPageFinished(Android.Webkit.WebView? view, string? url)
        {
            base.OnPageFinished(view, url);
            view?.EvaluateJavascript(@"
(function(){
  var domains = ['variyt.ws','kodik','alloha','videoframe','sibnet','collaps','cdnmovies'];
  function checkFrames(){
    var frames = document.querySelectorAll('iframe');
    for(var i=0;i<frames.length;i++){
      var src = frames[i].src || frames[i].getAttribute('src') || '';
      if(src && domains.some(function(d){return src.indexOf(d)>=0;})){
        AndroidBridge.onPlayerFound(src);
        return;
      }
    }
  }
  checkFrames();
  var obs = new MutationObserver(checkFrames);
  obs.observe(document.body||document.documentElement, {childList:true,subtree:true,attributes:true,attributeFilter:['src']});
  setTimeout(checkFrames, 1000);
  setTimeout(checkFrames, 3000);
})();
", null);
        }
    }

    public class MainBridge : Java.Lang.Object
    {
        private readonly MainPage _page;
        public MainBridge(MainPage page) { _page = page; }

        [Android.Webkit.JavascriptInterface]
        [Java.Interop.Export("openFinder")]
        public void OpenFinder(string url)
        {
            MainThread.BeginInvokeOnMainThread(() => _page.OpenFinderOverlay(url));
        }

        [Android.Webkit.JavascriptInterface]
        [Java.Interop.Export("closeFinder")]
        public void CloseFinder()
        {
            MainThread.BeginInvokeOnMainThread(() => _page.CloseFinderOverlay(null));
        }
    }

    public class AppSchemeWebViewClient : Android.Webkit.WebViewClient
    {
        private readonly MainPage _page;
        public AppSchemeWebViewClient(MainPage page) { _page = page; }
    }
#endif
}
