<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TechBuild — Сборка ПК</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  html{scroll-behavior:smooth}
  body{font-family:-apple-system,'Segoe UI',Arial,sans-serif;background:#0a0a0a;color:#fff;line-height:1.5;overflow-x:hidden}
  a{text-decoration:none;color:inherit}
  button{font-family:inherit}
  input,textarea{font-family:inherit}

  /* PRELOADER */
  .preloader{position:fixed;inset:0;background:#0a0a0a;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .7s,visibility .7s}
  .preloader.hide{opacity:0;visibility:hidden}
  .preloader .logo-big{font-size:36px;font-weight:800;letter-spacing:-1px;margin-bottom:24px}
  .preloader .logo-big span{color:#5b8def}
  .preloader .bar{width:180px;height:2px;background:#1a1a1a;border-radius:2px;overflow:hidden}
  .preloader .bar::after{content:"";display:block;height:100%;width:40%;background:#5b8def;animation:loadBar 1.2s ease-in-out infinite}
  @keyframes loadBar{0%{transform:translateX(-100%)}100%{transform:translateX(350%)}}

  /* HEADER */
  header{padding:20px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1a1a1a;position:sticky;top:0;background:rgba(10,10,10,.92);backdrop-filter:blur(14px);z-index:100}
  .logo{font-weight:800;font-size:20px;letter-spacing:-.5px}
  .logo span{color:#5b8def}
  nav{display:flex;gap:4px;align-items:center}
  nav a{color:#888;font-size:14px;padding:9px 16px;border-radius:8px;transition:.25s}
  nav a:hover,nav a.active{color:#fff;background:#1a1a1a}
  .burger{display:none;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:6px 10px}

  /* HERO */
  .hero{padding:80px 40px 60px;max-width:1240px;margin:0 auto}
  .hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:60px;align-items:center}
  .hero-badge{display:inline-block;background:#111;border:1px solid #1f1f1f;padding:7px 14px;border-radius:20px;font-size:12px;color:#5b8def;font-weight:600;letter-spacing:.6px;margin-bottom:24px}
  .hero-badge::before{content:"● ";color:#3fb950;animation:blink 2s infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
  .hero h1{font-size:58px;font-weight:800;line-height:1.05;letter-spacing:-2.5px}
  .hero h1 span{color:#5b8def}
  .hero p{margin-top:24px;color:#888;font-size:18px;max-width:460px;line-height:1.6}
  .hero-btns{margin-top:34px;display:flex;gap:12px;flex-wrap:wrap}
  .btn{position:relative;overflow:hidden;padding:15px 30px;border-radius:10px;font-weight:700;font-size:15px;border:none;cursor:pointer;transition:transform .18s cubic-bezier(.34,1.56,.64,1),background .25s,box-shadow .25s;display:inline-flex;align-items:center;justify-content:center;gap:8px}
  .btn:active{transform:scale(.95)}
  .btn-primary{background:#5b8def;color:#fff}
  .btn-primary:hover{background:#4070d6;box-shadow:0 10px 36px rgba(91,141,239,.35);transform:translateY(-2px)}
  .btn-ghost{background:transparent;color:#fff;border:1px solid #2a2a2a}
  .btn-ghost:hover{border-color:#5b8def;color:#5b8def;transform:translateY(-2px)}
  .ripple{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,.4);animation:rippleAnim .7s ease-out;pointer-events:none}
  @keyframes rippleAnim{to{transform:scale(4);opacity:0}}

  /* SHOWCASE — Ken Burns slideshow */
  .showcase{position:relative;aspect-ratio:4/3;border-radius:20px;overflow:hidden;background:#0a0a0a;border:1px solid #1a1a1a;box-shadow:0 30px 80px rgba(0,0,0,.7)}
  .showcase::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 0%, rgba(91,141,239,.12), transparent 60%);z-index:5;pointer-events:none}

  .slide{position:absolute;inset:0;opacity:0;transition:opacity 1.6s ease-in-out;overflow:hidden}
  .slide.active{opacity:1}
  .slide .bg{position:absolute;inset:-6%;background-size:cover;background-position:center;transform:scale(1.08);transition:transform 7s ease-out}
  .slide.active .bg{transform:scale(1.15) translate(-2%, -1%)}
  .slide.s1 .bg{background:linear-gradient(135deg,#1a0a2e 0%,#0a0a0a 55%,#0a1a2e 100%)}
  .slide.s2 .bg{background:linear-gradient(135deg,#2e0a0a 0%,#0a0a0a 55%,#2e1a0a 100%)}
  .slide.s3 .bg{background:linear-gradient(135deg,#0a2e1a 0%,#0a0a0a 55%,#0a1e2e 100%)}
  .slide.s4 .bg{background:linear-gradient(135deg,#2e2a0a 0%,#0a0a0a 55%,#1a0a2e 100%)}
  .slide .content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 30px}
  .slide .content .ic{width:64px;height:64px;border-radius:16px;background:rgba(91,141,239,.15);border:1px solid rgba(91,141,239,.3);display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px;backdrop-filter:blur(4px)}
  .slide .content h4{font-size:20px;font-weight:700;letter-spacing:-.5px;margin-bottom:8px}
  .slide .content p{color:#8b949e;font-size:13px;letter-spacing:1.5px;text-transform:uppercase}
  .slide .caption{position:absolute;bottom:26px;left:28px;color:#666;font-size:11px;letter-spacing:2px;text-transform:uppercase;z-index:3}
  .slide .caption::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#5b8def;margin-right:8px;vertical-align:middle}

  .slide-dots{position:absolute;bottom:22px;right:26px;display:flex;gap:6px;z-index:4}
  .slide-dots span{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);transition:.4s cubic-bezier(.34,1.56,.64,1);cursor:pointer;position:relative;overflow:hidden}
  .slide-dots span:hover{background:rgba(255,255,255,.35)}
  .slide-dots span.active{background:rgba(91,141,239,.25);width:32px;border-radius:4px}
  .slide-dots span.active::after{content:"";position:absolute;inset:0;background:#5b8def;border-radius:4px;animation:dotProgress 5s linear forwards}
  @keyframes dotProgress{from{transform:translateX(-100%)}to{transform:translateX(0)}}

  .floating-stat{position:absolute;background:rgba(17,17,17,.85);backdrop-filter:blur(12px);border:1px solid #1f1f1f;border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 20px 40px rgba(0,0,0,.5);z-index:6;animation:floatY 5s ease-in-out infinite}
  .floating-stat.s1{top:24px;left:-30px}
  .floating-stat.s2{bottom:40px;right:-20px;animation-delay:2.5s}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .floating-stat .ic{width:36px;height:36px;background:#5b8def;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff}
  .floating-stat .num{font-size:16px;font-weight:800;letter-spacing:-.5px}
  .floating-stat .lbl{color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px}

  /* STATS */
  .stats{max-width:1240px;margin:60px auto 0;padding:0 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .stat{background:#111;border:1px solid #1a1a1a;border-radius:14px;padding:24px;text-align:center;transition:transform .4s cubic-bezier(.34,1.56,.64,1),border-color .3s}
  .stat:hover{border-color:#5b8def;transform:translateY(-6px)}
  .stat .num{font-size:34px;font-weight:800;letter-spacing:-1.5px;color:#5b8def}
  .stat .lbl{color:#888;font-size:13px;margin-top:6px}

  /* SECTION */
  .section{max-width:1240px;margin:0 auto;padding:80px 40px 40px}
  .section-head{margin-bottom:36px}
  .section-head h2{font-size:34px;font-weight:700;letter-spacing:-.8px}
  .section-head h2 span{color:#5b8def}
  .section-head p{color:#888;font-size:15px;margin-top:8px;max-width:520px}

  /* CATEGORIES */
  .cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .cat{background:#111;border:1px solid #1a1a1a;border-radius:16px;padding:36px 28px;transition:transform .4s cubic-bezier(.34,1.56,.64,1),border-color .3s,box-shadow .3s;display:block;position:relative;overflow:hidden;cursor:pointer}
  .cat:hover{border-color:#5b8def;transform:translateY(-8px);box-shadow:0 24px 70px rgba(91,141,239,.18)}
  .cat::before{content:"";position:absolute;top:-80px;right:-80px;width:220px;height:220px;background:radial-gradient(circle,rgba(91,141,239,.2),transparent 70%);border-radius:50%;transition:transform .6s cubic-bezier(.34,1.56,.64,1)}
  .cat:hover::before{transform:scale(1.5)}
  .cat .res{font-size:36px;font-weight:800;letter-spacing:-1.5px;color:#5b8def;margin-bottom:4px}
  .cat .res-label{color:#555;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:20px}
  .cat h3{font-size:18px;font-weight:600;margin-bottom:8px}
  .cat p{color:#888;font-size:14px;line-height:1.6;margin-bottom:24px}
  .cat .arrow{color:#5b8def;font-size:20px;font-weight:700;transition:transform .4s cubic-bezier(.34,1.56,.64,1);display:inline-block}
  .cat:hover .arrow{transform:translateX(10px)}

  /* CARDS */
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .card{background:#111;border:1px solid #1a1a1a;border-radius:16px;padding:18px;transition:transform .5s cubic-bezier(.34,1.56,.64,1),border-color .3s,box-shadow .3s;display:flex;flex-direction:column;opacity:0;transform:translateY(30px)}
  .card.visible{opacity:1;transform:translateY(0)}
  .card:nth-child(2).visible{transition-delay:.08s}
  .card:nth-child(3).visible{transition-delay:.16s}
  .card:nth-child(4).visible{transition-delay:.24s}
  .card:nth-child(5).visible{transition-delay:.32s}
  .card:nth-child(6).visible{transition-delay:.4s}
  .card:hover{border-color:#5b8def;transform:translateY(-8px);box-shadow:0 24px 70px rgba(91,141,239,.18)}
  .card-img{height:180px;background:#000;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;position:relative;overflow:hidden}
  .card-img span{color:#333;font-size:12px;text-transform:uppercase;letter-spacing:2px;z-index:1}
  .card-img img{width:100%;height:100%;object-fit:cover;border-radius:12px;transition:transform 1.5s ease-out}
  .card:hover .card-img img{transform:scale(1.08)}
  .card-img::before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(91,141,239,.18) 50%,transparent 70%);transform:translateX(-100%);transition:transform 1s cubic-bezier(.4,0,.2,1)}
  .card:hover .card-img::before{transform:translateX(100%)}
  .card-tag{color:#5b8def;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:8px}
  .card h3{font-size:18px;font-weight:700;margin-bottom:4px}
  .card .desc{color:#888;font-size:13px;margin-bottom:16px}
  .specs{list-style:none;margin-bottom:20px;flex-grow:1}
  .specs li{color:#aaa;font-size:13px;padding:6px 0;border-bottom:1px solid #161616;display:flex;justify-content:space-between}
  .specs li:last-child{border-bottom:none}
  .specs li span{color:#555}
  .card-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #161616;gap:12px}
  .price{font-size:20px;font-weight:800;letter-spacing:-.5px}
  .buy{background:#1a1a1a;color:#5b8def;border:1px solid #2a2a2a;padding:9px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;transition:background .25s,color .25s,border-color .25s,transform .15s;white-space:nowrap;position:relative;overflow:hidden}
  .buy:hover{background:#5b8def;color:#fff;border-color:#5b8def}
  .buy:active{transform:scale(.94)}

  /* REVIEWS */
  .reviews-wrap{position:relative;overflow:hidden;border-radius:16px}
  .reviews-track{display:flex;transition:transform .9s cubic-bezier(.65,0,.35,1)}
  .review{min-width:100%;background:#111;border:1px solid #1a1a1a;border-radius:16px;padding:40px;display:flex;flex-direction:column;align-items:center;text-align:center}
  .review .ava{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#5b8def,#4070d6);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;margin-bottom:18px;box-shadow:0 8px 30px rgba(91,141,239,.3)}
  .review .stars{color:#ffb400;font-size:16px;margin-bottom:18px;letter-spacing:3px}
  .review p{color:#ccc;font-size:16px;line-height:1.7;max-width:620px;margin-bottom:22px;font-style:italic}
  .review .name{font-size:15px;font-weight:700}
  .review .role{color:#666;font-size:13px;margin-top:3px}
  .reviews-nav{display:flex;justify-content:center;gap:10px;margin-top:24px}
  .reviews-nav button{width:42px;height:42px;background:#111;border:1px solid #1a1a1a;color:#888;border-radius:12px;cursor:pointer;font-size:16px;transition:transform .25s,border-color .25s,color .25s}
  .reviews-nav button:hover{border-color:#5b8def;color:#fff;transform:translateY(-3px)}
  .reviews-dots{display:flex;justify-content:center;gap:8px;margin-top:18px}
  .reviews-dots span{width:8px;height:8px;border-radius:50%;background:#222;transition:.3s;cursor:pointer}
  .reviews-dots span.active{background:#5b8def;width:26px;border-radius:4px}

  /* CTA */
  .cta{max-width:1240px;margin:40px auto 0;padding:0 40px}
  .cta-inner{background:linear-gradient(135deg,#111 0%,#0f1420 100%);border:1px solid #1a1a1a;border-radius:24px;padding:60px 40px;text-align:center;position:relative;overflow:hidden}
  .cta-inner::before{content:"";position:absolute;top:-150px;left:50%;transform:translateX(-50%);width:500px;height:500px;background:radial-gradient(circle,rgba(91,141,239,.25),transparent 70%);border-radius:50%;animation:pulseGlow 7s ease-in-out infinite}
  @keyframes pulseGlow{0%,100%{opacity:.5;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.15)}}
  .cta-inner h2{font-size:34px;font-weight:800;letter-spacing:-1px;margin-bottom:14px;position:relative}
  .cta-inner p{color:#888;font-size:16px;margin-bottom:30px;position:relative}
  .cta-form{display:flex;gap:8px;max-width:480px;margin:0 auto;position:relative}
  .cta-form input{flex:1;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:10px;padding:15px 18px;color:#fff;font-size:14px;outline:none;transition:.25s}
  .cta-form input:focus{border-color:#5b8def}

  /* FOOTER */
  footer{border-top:1px solid #1a1a1a;padding:60px 40px 30px;margin-top:80px}
  .footer-inner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
  footer h4{font-size:14px;margin-bottom:16px;font-weight:700}
  footer a{color:#888;font-size:14px;display:block;margin-bottom:10px;transition:.2s}
  footer a:hover{color:#5b8def}
  footer p{color:#555;font-size:13px;line-height:1.7;margin-top:14px}
  .footer-bottom{max-width:1240px;margin:40px auto 0;padding-top:22px;border-top:1px solid #1a1a1a;color:#444;font-size:12px}

  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(120px);background:#5b8def;color:#fff;padding:13px 24px;border-radius:10px;font-weight:600;font-size:14px;transition:.4s cubic-bezier(.34,1.56,.64,1);z-index:300;box-shadow:0 20px 60px rgba(91,141,239,.4)}
  .toast.show{transform:translateX(-50%) translateY(0)}

  .fade{opacity:0;transform:translateY(36px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
  .fade.visible{opacity:1;transform:translateY(0)}

  @media (max-width:900px){
    header{padding:14px 20px}
    nav{display:none}
    .burger{display:block}
    nav.mobile-open{display:flex;position:absolute;top:100%;left:0;right:0;background:#0d0d0d;flex-direction:column;padding:16px;border-bottom:1px solid #1a1a1a;gap:4px}
    nav.mobile-open a{padding:12px 16px}
    .hero{padding:40px 20px 30px}
    .hero-grid{grid-template-columns:1fr;gap:40px}
    .hero h1{font-size:34px;letter-spacing:-1.2px}
    .hero p{font-size:15px}
    .btn{padding:13px 22px;font-size:14px;flex:1}
    .floating-stat.s1{left:8px;top:8px}
    .floating-stat.s2{right:8px;bottom:8px}
    .floating-stat{padding:10px 14px}
    .floating-stat .ic{width:30px;height:30px;font-size:11px}
    .floating-stat .num{font-size:14px}
    .stats{grid-template-columns:1fr 1fr;padding:0 20px;gap:12px;margin-top:40px}
    .stat .num{font-size:26px}
    .section{padding:50px 20px 20px}
    .section-head h2{font-size:24px}
    .cat-grid,.grid{grid-template-columns:1fr;gap:14px}
    .cat{padding:28px 22px}
    .review{padding:28px 22px}
    .review p{font-size:15px}
    .cta{padding:0 20px}
    .cta-inner{padding:40px 24px}
    .cta-inner h2{font-size:22px}
    .cta-form{flex-direction:column}
    footer{padding:40px 20px 24px;margin-top:50px}
    .footer-inner{grid-template-columns:1fr;gap:28px}
  }
</style>
</head>
<body>

<div class="preloader" id="preloader">
  <div class="logo-big">TECH<span>BUILD</span></div>
  <div class="bar"></div>
</div>

<header>
  <a href="index.html" class="logo">TECH<span>BUILD</span></a>
  <button class="burger" onclick="document.querySelector('nav').classList.toggle('mobile-open')">☰</button>
  <nav>
    <a href="index.html" class="active">Главная</a>
    <a href="fullhd.html">Full HD</a>
    <a href="2k.html">2K</a>
    <a href="4k.html">4K</a>
    <a href="catalog.html">Комплектующие</a>
    <a href="configurator.html">Конфигуратор</a>
    <a href="cart.html">Корзина</a>
    <a href="contacts.html">Контакты</a>
  </nav>
</header>

<section class="hero">
  <div class="hero-grid">
    <div>
      <div class="hero-badge">Принимаем заказы на эту неделю</div>
      <h1>Собираем ПК, которые <span>не тормозят</span></h1>
      <p>Подберём сборку под твой бюджет и задачи. Без переплат, без впаривания, без «менеджер перезвонит».</p>
      <div class="hero-btns">
        <a href="#categories" class="btn btn-primary">Смотреть сборки</a>
        <a href="configurator.html" class="btn btn-ghost">Собрать самому →</a>
      </div>
    </div>

    <div style="position:relative;">
      <div class="showcase" id="showcase">
        <div class="slide s1 active">
          <div class="bg"></div>
          <div class="content">
            <div class="ic">🖥</div>
            <h4>Сборка дня · Тест 2</h4>
            <p>1440p · 84 000 ₽</p>
          </div>
          <div class="caption">Фото · Тест 2</div>
        </div>
        <div class="slide s2">
          <div class="bg"></div>
          <div class="content">
            <div class="ic">⚡</div>
            <h4>Топ-сборка · Тест 3</h4>
            <p>4K · 134 000 ₽</p>
          </div>
          <div class="caption">Фото · Тест 3</div>
        </div>
        <div class="slide s3">
          <div class="bg"></div>
          <div class="content">
            <div class="ic">🛠</div>
            <h4>Рабочее место</h4>
            <p>Москва · ул. Примерная</p>
          </div>
          <div class="caption">Фото · мастерская</div>
        </div>
        <div class="slide s4">
          <div class="bg"></div>
          <div class="content">
            <div class="ic">💬</div>
            <h4>Отзыв клиента</h4>
            <p>Иван · Екатеринбург</p>
          </div>
          <div class="caption">Фото · клиент</div>
        </div>
        <div class="slide-dots" id="slideDots">
          <span class="active" onclick="goToSlide(0)"></span>
          <span onclick="goToSlide(1)"></span>
          <span onclick="goToSlide(2)"></span>
          <span onclick="goToSlide(3)"></span>
        </div>
      </div>
      <div class="floating-stat s1"><div class="ic">2.4K</div><div><div class="num">2400+</div><div class="lbl">собрано</div></div></div>
      <div class="floating-stat s2"><div class="ic">★</div><div><div class="num">4.9 / 5</div><div class="lbl">оценка</div></div></div>
    </div>
  </div>
</section>

<div class="stats fade">
  <div class="stat"><div class="num" data-count="2400" data-suffix="+">0</div><div class="lbl">Собранных ПК</div></div>
  <div class="stat"><div class="num">3 года</div><div class="lbl">Гарантия</div></div>
  <div class="stat"><div class="num" data-count="24" data-suffix=" ч">0</div><div class="lbl">На сборку</div></div>
  <div class="stat"><div class="num" data-count="98" data-suffix="%">0</div><div class="lbl">Довольных</div></div>
</div>

<section class="section" id="categories">
  <div class="section-head fade">
    <h2>Выбери под своё <span>разрешение</span></h2>
    <p>Full HD, 2K или 4K — под каждый найдётся сборка, которая реально тянет</p>
  </div>
  <div class="cat-grid">
    <a href="fullhd.html" class="cat fade">
      <div class="res">Full HD</div><div class="res-label">1920 × 1080</div>
      <h3>Для 1080p</h3>
      <p>Стабильные 60+ FPS в популярных играх на средних-высоких настройках</p>
      <div class="arrow">→</div>
    </a>
    <a href="2k.html" class="cat fade">
      <div class="res">2K</div><div class="res-label">2560 × 1440</div>
      <h3>Для 1440p</h3>
      <p>Высокие настройки и 100+ FPS. Оптимальный баланс цены и качества</p>
      <div class="arrow">→</div>
    </a>
    <a href="4k.html" class="cat fade">
      <div class="res">4K</div><div class="res-label">3840 × 2160</div>
      <h3>Для 4K</h3>
      <p>Максимальные настройки, RTX и всё, что можно выжать из железа</p>
      <div class="arrow">→</div>
    </a>
  </div>
</section>

<section class="section" id="popular">
  <div class="section-head fade">
    <h2>Популярные <span>сборки</span></h2>
    <p>Что чаще всего берут в этом месяце</p>
  </div>
  <div class="grid" id="buildsGrid"></div>
</section>

<section class="section" id="reviews">
  <div class="section-head fade">
    <h2>Что говорят <span>клиенты</span></h2>
    <p>Реальные отзывы — без выдумок и «звёздочек на заказ»</p>
  </div>
  <div class="reviews-wrap fade">
    <div class="reviews-track" id="reviewsTrack">
      <div class="review"><div class="ava">А</div><div class="stars">★★★★★</div><p>«Заказал Тест 2 для 1440p. Собрали за день, привезли, всё запустилось с первого раза. Игры летают, тихо, красиво.»</p><div class="name">Алексей М.</div><div class="role">Москва</div></div>
      <div class="review"><div class="ava">К</div><div class="stars">★★★★★</div><p>«Помогли подобрать комплектующие под монтаж, не стали впаривать лишнего. Сэкономила тысяч 30 против того, что предлагали в другом месте.»</p><div class="name">Кристина Р.</div><div class="role">Санкт-Петербург</div></div>
      <div class="review"><div class="ava">Д</div><div class="stars">★★★★★</div><p>«Брал Тест 3 для 4K. Приятно, когда человек объясняет, а не просто кидает список. Чувствуется, что шарит в теме.»</p><div class="name">Дмитрий К.</div><div class="role">Казань</div></div>
      <div class="review"><div class="ava">М</div><div class="stars">★★★★★</div><p>«Собрали под бюджет 60 тысяч — не пытались продать дороже. Через полгода апгрейдил — приехали, поменяли видюху, всё работает.»</p><div class="name">Марина В.</div><div class="role">Екатеринбург</div></div>
    </div>
  </div>
  <div class="reviews-nav">
    <button onclick="prevReview()">←</button>
    <button onclick="nextReview()">→</button>
  </div>
  <div class="reviews-dots" id="reviewsDots"></div>
</section>

<div class="cta fade">
  <div class="cta-inner">
    <h2>Не знаешь, что выбрать?</h2>
    <p>Оставь телефон — подберём сборку под твой бюджет за 15 минут</p>
    <form class="cta-form" onsubmit="event.preventDefault(); showToast('Заявка отправлена! Перезвоним скоро'); this.reset();">
      <input type="tel" placeholder="+7 (___) ___-__-__" required>
      <button type="submit" class="btn btn-primary">Жду звонка</button>
    </form>
  </div>
</div>

<footer>
  <div class="footer-inner">
    <div><div class="logo">TECH<span>BUILD</span></div><p>Сборка и продажа ПК с 2020 года. 2400+ довольных клиентов. Гарантия 3 года на все сборки.</p></div>
    <div><h4>Магазин</h4><a href="fullhd.html">Full HD</a><a href="2k.html">2K</a><a href="4k.html">4K</a><a href="catalog.html">Комплектующие</a></div>
    <div><h4>Помощь</h4><a href="delivery.html">Доставка</a><a href="about.html">О компании</a><a href="contacts.html">Контакты</a></div>
    <div><h4>Контакты</h4><a href="tel:+79991234567">+7 (999) 123-45-67</a><a href="mailto:info@techbuild.ru">info@techbuild.ru</a></div>
  </div>
  <div class="footer-bottom"><span data-admin-trigger style="cursor:default">© 2026 TechBuild. Все права защищены.</span></div>
</footer>

<div class="toast" id="toast">Готово</div>

<script src="transition.js"></script>
<script>
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hide'), 900);
});

// ===== SLIDESHOW (Ken Burns, 5 сек на кадр) =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('#slideDots span');
let slideTimer;
const SLIDE_DURATION = 5000;

function goToSlide(idx) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => {
    d.classList.remove('active');
    // сброс анимации прогресса
    const a = d.querySelector('::after');
    d.style.animation = 'none';
    void d.offsetWidth;
    d.style.animation = '';
  });
  slides[idx].classList.add('active');
  dots[idx].classList.add('active');
  // перезапуск прогресс-анимации
  const dot = dots[idx];
  dot.style.animation = 'none';
  void dot.offsetWidth;
  dot.style.animation = '';
  currentSlide = idx;
  clearTimeout(slideTimer);
  slideTimer = setTimeout(nextSlide, SLIDE_DURATION);
}
function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
function startSlideshow() { slideTimer = setTimeout(nextSlide, SLIDE_DURATION); }
startSlideshow();

// ===== REVIEWS =====
let currentReview = 0;
const track = document.getElementById('reviewsTrack');
const totalReviews = document.querySelectorAll('.review').length;
const reviewsDots = document.getElementById('reviewsDots');
for (let i = 0; i < totalReviews; i++) {
  const s = document.createElement('span');
  if (i === 0) s.classList.add('active');
  s.onclick = () => goToReview(i);
  reviewsDots.appendChild(s);
}
function renderReview() {
  track.style.transform = `translateX(-${currentReview * 100}%)`;
  document.querySelectorAll('#reviewsDots span').forEach((d, i) => d.classList.toggle('active', i === currentReview));
}
function nextReview() { currentReview = (currentReview + 1) % totalReviews; renderReview(); }
function prevReview() { currentReview = (currentReview - 1 + totalReviews) % totalReviews; renderReview(); }
function goToReview(i) { currentReview = i; renderReview(); }
setInterval(nextReview, 5500);

// ===== COUNTERS =====
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = Math.ceil(target / 70);
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = cur + suffix;
  }, 22);
}

// ===== FADE-IN =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('[data-count]').forEach(n => {
        if (!n.dataset.done) { n.dataset.done = '1'; animateCount(n); }
      });
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ===== RIPPLE =====
document.querySelectorAll('.btn, .buy, .cat, .reviews-nav button').forEach(el => {
  el.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const r = document.createElement('span');
    r.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
});

// ===== CART =====
let cart = 0;
function addToCart(name) { cart++; showToast(name + ' — добавлен в корзину'); }

function showToast(text) {
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(() => t.classList.remove('show'), 2400);
}

document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => document.querySelector('nav').classList.remove('mobile-open'));
});

// ===== LOAD BUILDS =====
(async () => {
  try { await PCBuilds.syncFromCloud(); } catch(e) {}
  const grid = document.getElementById('buildsGrid');
  const builds = PCBuilds.getAll().slice(0, 6);
  grid.innerHTML = builds.map(b => `
    <div class="card">
      <div class="card-img">${b.photo ? `<img src="${b.photo}" alt="">` : '<span>Фото</span>'}</div>
      <div class="card-tag">${b.tag || ''}</div>
      <h3>${b.name}</h3>
      <div class="desc">${b.desc || ''}</div>
      <ul class="specs">
        ${b.cpu ? `<li>Процессор <span>${b.cpu}</span></li>` : ''}
        ${b.gpu ? `<li>Видеокарта <span>${b.gpu}</span></li>` : ''}
        ${b.ram ? `<li>Память <span>${b.ram}</span></li>` : ''}
        ${b.storage ? `<li>Накопитель <span>${b.storage}</span></li>` : ''}
      </ul>
      <div class="card-bottom">
        <div class="price">${b.price.toLocaleString('ru-RU')} ₽</div>
        <button class="buy" onclick="addToCart('${b.name}')">В корзину</button>
      </div>
    </div>
  `).join('');
  // триггерим появление карточек
  setTimeout(() => grid.querySelectorAll('.card').forEach((c, i) => {
    setTimeout(() => c.classList.add('visible'), i * 80);
  }), 50);
})();
</script>

</body>
</html>