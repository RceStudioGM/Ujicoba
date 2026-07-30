// Menggunakan Intersection Observer API untuk memicu animasi saat di-scroll
document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    const revealOptions = {
        threshold: 0.2, // Mulai animasi saat 20% elemen masuk layar
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Jika elemen masuk layar, tambah class "active"
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                // Jika elemen keluar layar, hapus class "active" 
                // Ini yang bikin animasinya bisa main lagi saat discroll naik/turun!
                entry.target.classList.remove("active");
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
// --- Fitur Background Music (Tracklist / Playlist) ---
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

// 1. Masukkan link lagu-lagumu di dalam tanda kutip di bawah ini
const tracklist = [
    "./assets/music/Alan Menken - Kingdom Dance (From Tangled Score).mp3",
    "./assets/music/Jarak - BeaconCream.mp3",
    "./assets/music/Graze the Roof - Laura Shigihara.mp3",
    "./assets/music/Menggapai Mentari - Aretha Kirana.mp3",
    "./assets/music/Pirate Seas - Laura Shigihara.mp3",
    "./assets/music/Skyfall - Adele.mp3"
];

let currentTrackIndex = 0; // Mulai dari lagu pertama (urutan ke-0)
let isPlaying = false;

// 2. Set lagu pertama ke elemen audio saat web dimuat
bgMusic.src = tracklist[currentTrackIndex];

// 3. Fungsi untuk Play dan Pause
musicToggle.addEventListener("click", function() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.classList.remove("fa-music");
        musicIcon.classList.add("fa-volume-xmark");
    } else {
        bgMusic.play();
        musicIcon.classList.remove("fa-volume-xmark");
        musicIcon.classList.add("fa-music");
    }
    isPlaying = !isPlaying;
});

// 4. Deteksi kalau lagu sudah habis, langsung ganti lagu berikutnya
bgMusic.addEventListener("ended", function() {
    currentTrackIndex++; // Pindah ke lagu selanjutnya
    
    // Kalau urutan lagu sudah melebihi jumlah lagu di playlist, balik ke lagu pertama
    if (currentTrackIndex >= tracklist.length) {
        currentTrackIndex = 0;
    }
    
    // Masukkan lagu baru dan langsung mainkan
    bgMusic.src = tracklist[currentTrackIndex];
    bgMusic.play();
});
});
