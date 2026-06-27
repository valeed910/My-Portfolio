const skillsData = [
  {name:'React', image:'assets/images/skills/react.png', cat:'frontend'},
  {name:'Vite', image:'assets/images/skills/vite.png', cat:'frontend'},
  {name:'Tailwind CSS', image:'assets/images/skills/tailwind.png', cat:'frontend'},
  {name:'TypeScript', image:'assets/images/skills/typescript.png', cat:'frontend'},
  {name:'JavaScript', image:'assets/images/skills/js.png', cat:'frontend'},
  {name:'Flutter', image:'assets/images/skills/flutter.png', cat:'frontend'},

  {name:'Node.js', image:'assets/images/skills/node.png', cat:'backend'},
  {name:'Express.js', image:'assets/images/skills/express.png', cat:'backend'},
  {name:'MongoDB', image:'assets/images/skills/mongo.png', cat:'backend'},
  {name:'REST APIs', image:'assets/images/skills/rest api.png', cat:'backend'},
  {name:'Google OAuth', image:'assets/images/skills/googleOAuth.png', cat:'backend'},
  {name:'Razorpay', image:'assets/images/skills/razorpay.png', cat:'backend'},

  {name:'ESP32', image:'assets/images/skills/esp32.png', cat:'hardware'},
  {name:'Arduino', image:'assets/images/skills/arduino.png', cat:'hardware'},
  {name:'LoRa', image:'assets/images/skills/lora.png', cat:'hardware'},
  {name:'BLE', image:'assets/images/skills/ble.png', cat:'hardware'},
  {name:'C++', image:'assets/images/skills/c++.png', cat:'hardware'},
  {name:'ECG', image:'assets/images/skills/ecg.png', cat:'hardware'},

  {name:'Git', image:'assets/images/skills/git.png', cat:'tools'},
  {name:'GitHub', image:'assets/images/skills/github.png', cat:'tools'},
  {name:'Vercel', image:'assets/images/skills/vercel.png', cat:'tools'},
  {name:'Render', image:'assets/images/skills/render.png', cat:'tools'},
  {name:'Cloudflare', image:'assets/images/skills/cloudflare.png', cat:'tools'},
  {name:'Java', image:'assets/images/skills/java.png', cat:'tools'},
  {name:'Python', image:'assets/images/skills/python.png', cat:'tools'},

];

  function filterSkills(cat, el) {
    document.querySelectorAll('.skill-cat').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
    renderSkills(cat);
  }

function renderSkills(cat) {
    const grid = document.getElementById('skills-grid');

    const filtered = cat === 'all'
        ? skillsData
        : skillsData.filter(s => s.cat === cat);

    grid.innerHTML = filtered.map(skill => `
        <div class="skill-card">
            <img src="${skill.image}" alt="${skill.name}" class="skill-icon">
            <div class="skill-name">${skill.name}</div>
        </div>
    `).join('');
}
  renderSkills('all');

  const roles = ['Full-Stack Developer','CTO & Co-founder','Software Engineer','7+ Hackathon Winner'];
  let ri = 0, ci = 0, del = false, pause = 0;
  function typeRole() {
    const el = document.getElementById('typed-role');
    const word = roles[ri];
    if (pause > 0) { pause--; setTimeout(typeRole, 80); return; }
    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; pause = 30; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeRole, del ? 50 : 80);
  }
  typeRole();

  function animateCount(id, target, suffix='') {
    let n = 0; const el = document.getElementById(id);
    const step = Math.max(1, Math.floor(target / 40));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n + suffix;
      if (n >= target) clearInterval(t);
    }, 40);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  let statsAnimated = false;
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCount('stat1', 8);
      animateCount('stat2', 2);
      animateCount('stat3', 3, '+');
      animateCount('stat4', 2);
    }
  }, { threshold: 0.5 });
  const strip = document.querySelector('.stats-strip');
  if (strip) statsObs.observe(strip);

  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  });
  function animateRing() {
    rx += (mx - rx - 20) * 0.15;
    ry += (my - ry - 20) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a,button,.skill-card,.project-card,.ach-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; ring.style.transform = 'scale(1.4)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; });
  });

  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) {
    particles.push({x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.5+.5});
  }
  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(108,99,255,0.4)';
      ctx.fill();
    });
    particles.forEach((p, i) => {
      particles.slice(i+1).forEach(q => {
        const d = Math.hypot(p.x-q.x, p.y-q.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(108,99,255,${0.15*(1-d/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    try {

        const res = await fetch("https://my-portfolio-m43t.onrender.com", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await res.json();

        if (result.success) {

            document.getElementById("form-success").style.display = "block";

            form.reset();

            setTimeout(() => {

                document.getElementById("form-success").style.display = "none";

            }, 4000);

        } else {

            alert("Unable to send message.");

        }

    } catch (err) {

        console.error(err);

        alert("Failed to send message.");

    }

});
