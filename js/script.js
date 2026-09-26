const typing = document.getElementById("typing");
const forgiveBtn = document.getElementById("forgiveBtn");
const waitBtn = document.getElementById("waitBtn");
const finalScreen = document.getElementById("finalScreen");
const closeBtn = document.getElementById("closeBtn");

const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("song");

const stars = document.getElementById("stars");
const hearts = document.getElementById("hearts");
const petals = document.getElementById("petals");

const FORMSPREE_URL = "https://formspree.io/f/xljdpara";

const message = `Aliya...

मुझे पता है कि मुझसे गलती हुई है।
और शायद सिर्फ़ "सॉरी" कहना
उस गलती को छोटा नहीं कर सकता। 🥺

लेकिन सच में...
मेरा तुम्हें दुख पहुँचाने का इरादा नहीं था।

तुम नाराज़ हो सकती हो...
मुझे डाँट भी सकती हो 😭

बस मुझसे हमेशा के लिए नाराज़ मत होना।

एक छोटी सी smile के बदले
एक बड़ा सा SORRY स्वीकार कर लो? 🥺💗`;

let index = 0;

function typeMessage() {
    if (index < message.length) {
        typing.textContent += message[index];
        index++;
        setTimeout(typeMessage, 35);
    }
}

setTimeout(typeMessage, 800);

for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");

    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;

    stars.appendChild(star);
}

function createHeart() {
    const heart = document.createElement("div");

    heart.className = "heart";
    heart.textContent = [
        "💗",
        "💕",
        "💖",
        "💓",
        "💞",
        "🌸",
        "✨"
    ][Math.floor(Math.random() * 7)];

    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

function createPetal() {
    const petal = document.createElement("div");

    petal.className = "petal";
    petal.textContent = [
        "🌸",
        "🌷",
        "✨",
        "♡"
    ][Math.floor(Math.random() * 4)];

    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${12 + Math.random() * 14}px`;
    petal.style.animationDuration = `${4 + Math.random() * 4}s`;

    petals.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 9000);
}

async function sendChoice(choice) {
    const data = new FormData();

    data.append("choice", choice);
    data.append("time", new Date().toLocaleString());

    try {
        const response = await fetch(FORMSPREE_URL, {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json"
            }
        });

        const result = await response.json();

        console.log("Formspree status:", response.status);
        console.log("Formspree response:", result);

        if (!response.ok) {
            console.error("Formspree rejected submission:", result);
            return false;
        }

        console.log("Choice sent successfully:", choice);
        return true;

    } catch (error) {
        console.error("Formspree request failed:", error);
        return false;
    }
}

async function playMusic() {
    if (!song || !song.paused) return;

    try {
        song.volume = 0.7;

        await song.play();

        musicBtn.textContent = "❚❚";
        musicBtn.classList.add("playing");

    } catch (error) {
        console.error("Music could not play:", error);

        musicBtn.textContent = "⚠️";

        setTimeout(() => {
            if (song.paused) {
                musicBtn.textContent = "♫";
            }
        }, 1500);
    }
}

function pauseMusic() {
    if (!song) return;

    song.pause();

    musicBtn.textContent = "♫";
    musicBtn.classList.remove("playing");
}

musicBtn.addEventListener("click", async () => {
    if (song.paused) {
        await playMusic();
    } else {
        pauseMusic();
    }
});

song.addEventListener("error", () => {
    console.error("Audio file could not be loaded.");

    musicBtn.textContent = "⚠️";

    setTimeout(() => {
        musicBtn.textContent = "♫";
    }, 1500);
});

forgiveBtn.addEventListener("click", async () => {
    sendChoice("Maf Kiya 💗");

    finalScreen.classList.add("show");

    await playMusic();

    for (let i = 0; i < 40; i++) {
        setTimeout(createHeart, i * 70);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 100);
    }
});

const responses = [
    "ठीक है Aliya... मैं इंतज़ार करूँगा 🥺",
    "फिर भी... दिल से SORRY है 👉👈",
    "एक छोटा सा मौका तो बनता है ना? 🥹",
    "Aliya please... 🥺💗",
    "मैं सच में अपनी गलती सुधारना चाहता हूँ 🌸",
    "जब मन करे तब माफ़ कर देना... 💗"
];

let responseIndex = 0;

waitBtn.addEventListener("click", () => {
    sendChoice("Hmmm... 😤");

    waitBtn.textContent = responses[responseIndex];

    responseIndex++;

    if (responseIndex >= responses.length) {
        responseIndex = 0;
    }

    createHeart();
});

closeBtn.addEventListener("click", () => {
    finalScreen.classList.remove("show");
});

setInterval(createHeart, 2500);
setInterval(createPetal, 1900);