document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Hero video: stay hidden (photo shows) until it is actually playing, so
// YouTube's play button, title, and spinner never appear.
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const layer = heroVideo.parentElement;
  window.onYouTubeIframeAPIReady = () => {
    new YT.Player(heroVideo, {
      events: {
        onReady: (e) => { e.target.mute(); e.target.playVideo(); },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) layer.classList.add("is-playing");
          if (e.data === YT.PlayerState.ENDED) e.target.playVideo();
        },
      },
    });
  };
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}
