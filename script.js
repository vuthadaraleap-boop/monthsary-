/* ===========================================================
   script.js (Light Blue Theme - optimized & enhanced)
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
let loverName = "My Love";  // default if blank
let playCount = 0;

/* Always ask only for her name */
window.addEventListener("DOMContentLoaded", () => {
  loverName = prompt("Enter your name ❤️:", "My Love") || "My Love";
  salutation.textContent = `Dear ${loverName},`;
  // Your signature fixed
  letterContent.querySelector(".signature").textContent = "— With love, DaraLeap 💙";
});

// Music controls
musicBtn.addEventListener("click", () => {
  if (playCount < 1) {
    playCount++;
    bgMusic.currentTime = 0;
    bgMusic.play();
    musicBtn.textContent = "🔇";
  }
});
bgMusic.volume = 0.25;
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

    // Auto play music
    if (playCount < 1) {
      playCount++;
      bgMusic.currentTime = 0;
      bgMusic.play();
      musicBtn.textContent = "🔇";
    }
  }, 700);
  startHeartRain();
});


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

/* Yes button: animate rose image, then play music ONCE, confetti */
yesBtn.addEventListener("click", () => {
  burstConfetti();
  animateFlowerFromEnvelope(() => {
    if (playCount < 1) {
      playCount++;
      bgMusic.currentTime = 0;
      bgMusic.play();
      musicBtn.textContent = "🔇";
    }
  });
  yesBtn.textContent = "💙 Yes! Forever!";
  setTimeout(() => {
    yesBtn.textContent = "Yes, I will! 💍";
  }, 3000);
  setTimeout(() => {
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  }, 1200);
});

/* Flower animation (big rose that stays longer) */
function animateFlowerFromEnvelope(callback) {
  // Remove any previous animated rose
  document.querySelectorAll('.rose-animate').forEach(el => el.remove());

  // Create rose image
  const flower = document.createElement("img");
  flower.src = "https://cdn.store-assets.com/s/761122/i/52940451.png";
  flower.alt = "Rose";
  flower.className = "rose-animate";
  flower.style.width = "120px";   // bigger base size
  flower.style.height = "120px";
  flower.style.position = "fixed";
  flower.style.left = "50%";
  flower.style.top = "50%";
  flower.style.transform = "translate(-50%, -50%) scale(0.2)";
  flower.style.transition = "transform 4s ease-out"; // slower animation
  flower.style.zIndex = "9999"; // always on top

  document.body.appendChild(flower);

  // Trigger grow animation
  setTimeout(() => {
    flower.style.transform = "translate(-50%, -50%) scale(3.5)"; // much larger
  }, 50);

  // Keep it longer before disappearing
  setTimeout(() => {
    flower.remove();
    if (typeof callback === "function") callback();
  }, 7000); // stays for ~7 seconds
}

/* Confetti burst */
function burstConfetti() {
  const blueHues = [190, 200, 210, 220, 230, 240];
  for (let i = 0; i < 36; i++) {
    setTimeout(() => {
      const conf = document.createElement("div");
      conf.className = "confetti";
      const hue = blueHues[Math.floor(Math.random() * blueHues.length)];
      conf.style.background = `hsl(${hue},70%,65%)`;
      conf.style.left = `calc(50vw + ${Math.random()*180-90}px)`;
      conf.style.top = `calc(50vh + ${Math.random()*40-20}px)`;
      conf.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 1300);
    }, Math.random()*400);
  }
}

/* Hearts rain */
function spawnHeart() {
  const span = document.createElement("span");
  span.className = "heart";
  span.textContent = "💙";
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

/* Accessibility */
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
