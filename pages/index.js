import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    /* ── STARS CANVAS ── */
    const canvas = document.getElementById("stars-canvas");
    const ctx = canvas.getContext("2d");
    let stars = [];
    let rafId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", () => { resize(); initStars(); });

    function initStars() {
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.005 + 0.002,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    initStars();

    function drawStars(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,225,235,${alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(drawStars);
    }
    rafId = requestAnimationFrame(drawStars);

    /* ── PETALS ── */
    const colors = ["#f43f6c", "#ff85a1", "#ffb3c6", "#f9c8d4", "#ffd6e0"];
    const petalEls = [];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      const c = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        left:${Math.random() * 100}vw;
        background:${c};
        animation-duration:${6 + Math.random() * 10}s;
        animation-delay:${-Math.random() * 12}s;
        width:${8 + Math.random() * 10}px;
        height:${12 + Math.random() * 14}px;
        box-shadow:0 0 6px ${c}99;
      `;
      document.body.appendChild(p);
      petalEls.push(p);
    }

    /* ── SCROLL REVEAL ── */
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 180);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    /* ── CURSOR SPARKLES ── */
    function spawnSparkle(x, y) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.textContent = ["✦", "✧", "❋", "✿", "❀"][Math.floor(Math.random() * 5)];
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
    const onMouseMove = (e) => {
      if (Math.random() > 0.88) spawnSparkle(e.clientX, e.clientY);
    };
    document.addEventListener("mousemove", onMouseMove);

    /* ── CLICK BURST ── */
    const emojis = ["💖", "💕", "💗", "💓", "🌹", "✨", "💘", "🌸"];
    const onClick = (e) => {
      for (let i = 0; i < 10; i++) {
        const b = document.createElement("div");
        b.className = "burst";
        b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = ((Math.PI * 2) / 10) * i;
        const dist = 50 + Math.random() * 60;
        b.style.left = e.clientX + "px";
        b.style.top = e.clientY + "px";
        b.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        b.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 900);
      }
    };
    document.addEventListener("click", onClick);

    /* ── BUTTON ── */
    const btn = document.getElementById("btn");
    const msgs = [
      "💌 Clique para sentir meu amor",
      "💖 Eu te amo muito, sabia?",
      "🌹 Você é tudo pra mim!",
      "✨ Minha princesa linda!",
      "🍬 Doce igual paçoca!",
      "👑 Rainhas merecem tudo!",
    ];
    let msgIdx = 0;
    const onBtn = (e) => {
      e.stopPropagation();
      msgIdx = (msgIdx + 1) % msgs.length;
      btn.textContent = msgs[msgIdx];
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          const b = document.createElement("div");
          b.className = "burst";
          b.textContent = ["💖", "💗", "💘", "💕", "🌹", "✨"][Math.floor(Math.random() * 6)];
          b.style.fontSize = 1 + Math.random() + "rem";
          const a = Math.random() * Math.PI * 2;
          const d = 60 + Math.random() * 80;
          b.style.left = cx + "px";
          b.style.top = cy + "px";
          b.style.setProperty("--dx", `${Math.cos(a) * d}px`);
          b.style.setProperty("--dy", `${Math.sin(a) * d}px`);
          document.body.appendChild(b);
          setTimeout(() => b.remove(), 900);
        }, i * 40);
      }
    };
    btn.addEventListener("click", onBtn);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
      btn.removeEventListener("click", onBtn);
      observer.disconnect();
      petalEls.forEach((p) => p.remove());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Minha Paçoquinha 🍬</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --rose:     #f43f6c;
            --rose-dark:#b5133c;
            --blush:    #ffd6e0;
            --cream:    #fff5f7;
            --deep:     #1a0510;
            --mid:      #3d0a20;
            --gold:     #f5c842;
            --glow:     rgba(244,63,108,0.45);
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            min-height: 100vh;
            background: radial-gradient(ellipse at 60% 20%, #3d0a20 0%, #1a0510 55%, #0a0008 100%);
            font-family: 'Cormorant Garamond', serif;
            color: var(--cream);
            overflow-x: hidden;
            cursor: crosshair;
          }
          #stars-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
          .petal {
            position: fixed; width: 12px; height: 18px;
            border-radius: 60% 40% 60% 40% / 70% 30% 70% 30%;
            opacity: 0; pointer-events: none; z-index: 1;
            animation: fall linear infinite;
          }
          @keyframes fall {
            0%   { transform: translateY(-60px) rotate(0deg) scale(1);    opacity: 0; }
            10%  { opacity: .7; }
            90%  { opacity: .5; }
            100% { transform: translateY(110vh) rotate(540deg) scale(.6); opacity: 0; }
          }
          main {
            position: relative; z-index: 10;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            min-height: 100vh; padding: 3rem 1.5rem 4rem; gap: 2rem;
          }
          .crown { font-size: 3.2rem; animation: float 3s ease-in-out infinite; filter: drop-shadow(0 0 18px var(--gold)); }
          @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
          .card {
            background: linear-gradient(145deg, rgba(255,255,255,.07) 0%, rgba(180,19,60,.12) 60%, rgba(255,255,255,.04) 100%);
            border: 1px solid rgba(244,63,108,.3); border-radius: 2rem;
            max-width: 680px; width: 100%; padding: 3rem 3.5rem 3.5rem;
            backdrop-filter: blur(18px);
            box-shadow: 0 0 60px rgba(244,63,108,.18), 0 0 120px rgba(180,19,60,.10), inset 0 1px 0 rgba(255,255,255,.12);
            text-align: center;
          }
          .eyebrow { font-family: 'Dancing Script', cursive; font-size: 1.15rem; color: var(--rose); letter-spacing: .12em; text-shadow: 0 0 20px var(--glow); margin-bottom: .6rem; }
          h1 {
            font-family: 'Playfair Display', serif; font-size: clamp(2.2rem,6vw,3.4rem); font-weight: 700; line-height: 1.15;
            background: linear-gradient(135deg, #fff5f7 20%, #f43f6c 60%, #f5c842 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1.8rem;
          }
          .divider { display: flex; align-items: center; gap: 1rem; margin: 0 auto 2rem; max-width: 280px; }
          .divider span { flex: 1; height: 1px; background: linear-gradient(90deg,transparent,rgba(244,63,108,.6),transparent); }
          .divider-heart { color: var(--rose); font-size: 1.1rem; animation: pulse 1.5s ease-in-out infinite; }
          @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.35);} }
          .body-text { font-size: 1.18rem; line-height: 1.9; color: rgba(255,245,247,.88); font-style: italic; font-weight: 300; }
          .body-text strong { font-style: normal; font-weight: 600; color: var(--blush); }
          .pills { display: flex; flex-wrap: wrap; gap: .6rem; justify-content: center; margin-top: 2.2rem; }
          .pill {
            background: rgba(244,63,108,.15); border: 1px solid rgba(244,63,108,.35); border-radius: 999px;
            padding: .35rem 1.1rem; font-family: 'Dancing Script', cursive; font-size: 1rem; color: var(--blush);
            cursor: default; transition: background .25s, transform .25s, box-shadow .25s;
          }
          .pill:hover { background: rgba(244,63,108,.35); transform: scale(1.08); box-shadow: 0 0 20px var(--glow); }
          .btn-love {
            margin-top: 2.8rem; padding: .9rem 2.8rem;
            font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic;
            color: #fff; background: linear-gradient(135deg,#f43f6c,#b5133c);
            border: none; border-radius: 999px; cursor: pointer;
            position: relative; overflow: hidden; box-shadow: 0 4px 30px rgba(244,63,108,.5);
            transition: transform .2s, box-shadow .2s;
          }
          .btn-love:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 40px rgba(244,63,108,.7); }
          .btn-love:active { transform: scale(.97); }
          .footer-note { font-family: 'Dancing Script', cursive; font-size: 1.05rem; color: rgba(255,214,224,.55); letter-spacing: .05em; text-align: center; }
          .burst { position: fixed; pointer-events: none; z-index: 99; font-size: 1.4rem; animation: burst-anim .8s ease-out forwards; }
          @keyframes burst-anim { 0%{opacity:1;transform:translate(0,0) scale(1);} 100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.3);} }
          .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
          .reveal.visible { opacity: 1; transform: translateY(0); }
          .sparkle { position: fixed; pointer-events: none; z-index: 5; font-size: .9rem; animation: sparkle-anim .6s ease-out forwards; }
          @keyframes sparkle-anim { 0%{opacity:1;transform:scale(1.5);} 100%{opacity:0;transform:scale(0) rotate(90deg);} }
        `}</style>
      </Head>

      <canvas id="stars-canvas" />

      <main>
        <div className="crown reveal">👑</div>

        <div className="card reveal">
          <p className="eyebrow">✦ uma mensagem do coração ✦</p>
          <h1>Eu te amo,<br />minha paçoquinha</h1>

          <div className="divider">
            <span></span>
            <span className="divider-heart">♥</span>
            <span></span>
          </div>

          <p className="body-text">
            Tem dias que eu fico pensando no quanto é <strong>boa sorte</strong> ter você na minha vida.<br /><br />
            Você é minha <strong>princesa</strong> — doce do jeito certo, irresistível, impossível de ignorar,
            e do tipo que fica no coração pra sempre.<br /><br />
            Cada momento contigo é um pedacinho de algo <strong>extraordinário</strong>. Eu escolho você
            todo dia, sem hesitar, sem arrependimento — só com <strong>amor de verdade</strong>. 💕
          </p>

          <div className="pills">
            <span className="pill">🍬 minha paçoquinha</span>
            <span className="pill">👸 minha princesa</span>
            <span className="pill">💖 meu amor</span>
            <span className="pill">✨ minha vida</span>
            <span className="pill">🌹 meu tudo</span>
          </div>

          <button className="btn-love" id="btn">💌 Clique para sentir meu amor</button>
        </div>

        <p className="footer-note reveal">feito com todo o amor do mundo só pra você 🌹</p>
      </main>
    </>
  );
}
