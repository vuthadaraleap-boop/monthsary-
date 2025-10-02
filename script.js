/* ===========================================================
   script.js (optimized & enhanced)
   =========================================================== */

const openBtn = document.getElementById("openBtn");
const resetBtn = document.getElementById("resetBtn");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const heartsLayer = document.getElementById("hearts");
const stage = document.getElementById("stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const salutation = document.getElementById("salutation");
const letterContent = document.getElementById("letterContent");

let heartTimer = null;
let musicPlayed = false;
let loverName = "Your Name";
let yourName = "Giver Name";
let playCount = 0;

/* Always ask for names (do not store in localStorage) */
window.addEventListener("DOMContentLoaded", () => {
  loverName = prompt("Your Name:", "Your Name") || "Your Name";
  yourName = prompt("Sender Name:", "Giver Name") || "Giver Name";
  salutation.textContent = `Dear ${loverName},`;
  letterContent.querySelector(".signature").textContent = `— With love, ${yourName}`;
});

/* Music controls */
musicBtn.addEventListener("click", () => {
  if (playCount < 1) {
    playCount++;
    bgMusic.currentTime = 0;
    bgMusic.play();
    musicBtn.textContent = "🔇";
  }
});
bgMusic.volume = 0.25;

/* Show music button after open */
openBtn.addEventListener("click", () => {
  openBtn.style.display = "none";
  resetBtn.removeAttribute("aria-hidden");
  musicBtn.removeAttribute("aria-hidden");
  envelope.classList.add("slide");
  setTimeout(() => {
    letter.classList.add("show");
    yesBtn.style.display = "";
    noBtn.style.display = "";
    resetYesNoPosition();
  }, 700);
  startHeartRain();
});

/* Hide music button on reset */
resetBtn.addEventListener("click", () => {
  stopHeartRain();
  letter.classList.remove("show");
  envelope.classList.remove("slide");
  openBtn.style.display = "";
  resetBtn.setAttribute("aria-hidden", "true");
  musicBtn.setAttribute("aria-hidden", "true");
  bgMusic.pause();
  bgMusic.currentTime = 0;
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  setTimeout(() => {
    heartsLayer.innerHTML = "";
  }, 600);
  musicPlayed = false;
  playCount = 0;
});

/* Show Yes/No buttons after letter opens */
openBtn.addEventListener("click", () => {
  setTimeout(() => {
    yesBtn.style.display = "";
    noBtn.style.display = "";
    resetYesNoPosition();
  }, 700);
});
resetBtn.addEventListener("click", () => {
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
});

/* Swap Yes/No button positions */
function swapYesNo() {
  const parent = yesBtn.parentElement;
  if (yesBtn.nextElementSibling === noBtn) {
    parent.insertBefore(noBtn, yesBtn);
  } else {
    parent.insertBefore(yesBtn, noBtn);
  }
  resetYesNoPosition();
}
function resetYesNoPosition() {
  yesBtn.style.position = "static";
  yesBtn.style.left = "";
  yesBtn.style.top = "";
  noBtn.style.position = "static";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

/* No button: swap on hover, focus, or click */
["mouseenter", "focus", "click", "touchstart"].forEach(evt => {
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    swapYesNo();
  });
});

/* Yes button: animate rose, then play music ONCE, confetti */
yesBtn.addEventListener("click", () => {
  burstConfetti();
  animateRoseFromEnvelope(() => {
    // Play music only after rose animation, and only once per proposal
    if (playCount < 1) {
      playCount++;
      bgMusic.currentTime = 0;
      bgMusic.play();
      musicBtn.textContent = "🔇";
    }
  });
  yesBtn.textContent = "💖 Yes! Forever!";
  setTimeout(() => {
    yesBtn.textContent = "Yes, I will! 💍";
  }, 3000);
  // Hide buttons after a short delay
  setTimeout(() => {
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  }, 1200);
});

/* Rose animation from envelope, then callback */
function animateRoseFromEnvelope(callback) {
  // Remove any previous animated rose
  document.querySelectorAll('.rose-animate').forEach(el => el.remove());

  // Create overlay rose
  const rose = document.createElement("img");
  rose.src = "assets/rose.png";
  rose.alt = "Red rose";
  rose.className = "rose-animate";
  document.body.appendChild(rose);

  // Trigger grow animation
  setTimeout(() => {
    rose.classList.add("grow");
  }, 30);

  // Remove after animation and call callback
  setTimeout(() => {
    rose.remove();
    if (typeof callback === "function") callback();
  }, 2500);
}

/* Confetti burst function */
function burstConfetti() {
  for (let i = 0; i < 36; i++) {
    setTimeout(() => {
      const conf = document.createElement("div");
      conf.className = "confetti";
      conf.style.background = `hsl(${Math.random()*360},90%,70%)`;
      conf.style.left = `calc(50vw + ${Math.random()*180-90}px)`;
      conf.style.top = `calc(50vh + ${Math.random()*40-20}px)`;
      conf.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 1300);
    }, Math.random()*400);
  }
}

/* ---------- Heart rain functions ---------- */
function spawnHeart() {
  const span = document.createElement("span");
  span.className = "heart";
  span.textContent = "❤️";
  const startX = Math.random() * 100;
  span.style.left = `${startX}vw`;
  const drift = (Math.random() * 40 - 20);
  span.style.setProperty("--x", `${drift}vw`);
  const size = Math.round(18 + Math.random() * 24);
  span.style.fontSize = `${size}px`;
  const duration = (4 + Math.random() * 4);
  span.style.animationDuration = `${duration}s`;
  span.style.transform = `translateY(-10vh) rotate(${Math.random()*40 - 20}deg)`;
  heartsLayer.appendChild(span);
  setTimeout(() => {
    if (span && span.parentNode === heartsLayer) heartsLayer.removeChild(span);
  }, (duration * 1000) + 600);
}
function startHeartRain() {
  if (heartTimer) return;
  for (let i = 0; i < 14; i++) setTimeout(spawnHeart, Math.random() * 600);
  heartTimer = setInterval(() => {
    const count = window.innerWidth < 600 ? 1 : 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) setTimeout(spawnHeart, Math.random() * 350);
  }, 500);
}
function stopHeartRain() {
  if (heartTimer) {
    clearInterval(heartTimer);
    heartTimer = null;
  }
  heartsLayer.innerHTML = "";
}

/* Accessibility: allow Enter/Space for open and reset */
openBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openBtn.click();
  }
});
resetBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    resetBtn.click();
  }
});
yesBtn.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && !yesBtn.disabled) {
    e.preventDefault();
    yesBtn.click();
  }
});

/* END script.js */
