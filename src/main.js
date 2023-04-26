import { VideoAPI, EmbedToken, URLFeed, competition, teams } from "./API.js";

const container = document.querySelector("#container");
const popup = document.querySelector("#popup");
const overlay = document.querySelector("#overlay");
const homeBtn = document.querySelectorAll(".home-btn");
const liveBtn = document.querySelectorAll(".live-btn");
const menuContainer = document.querySelector(".burger-menu");
const menu = document.querySelector(".burger-menu .nav-links");
const menuBtn = document.querySelector(".burger");
const lines = document.querySelectorAll(".burger .line");
const loadingSkeleton = document.querySelector(".loading-skeleton");

const openPopup = (e) => {
  const cardParent = e.target.closest(".card-container");
  const card = cardParent.querySelector(".card");
  if (!cardParent) {
    return;
  } else {
    popup.style.display = "block";
    popup.innerHTML = `
    <div class="popup-container">
        <div class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
        </div>
        
        <div class="popup-card">
            <iframe src="${card.dataset.matchview}" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
    `;

    overlay.style.display = "block";
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      popup.innerHTML = "";
      popup.style.display = "none";
      overlay.style.display = "none";
    });

    console.log(card.dataset.matchview);
    console.log(card.dataset.competition);
  }
};

const fetchData = () => {
  fetch(`${URLFeed}?token=${VideoAPI}`)
    .then((response) => response.json())
    .then((data) => {
      data.response.forEach((item) => {
        const { title, matchviewUrl, thumbnail, date, competition } = item;
        teams.some((team) => title.includes(team))
          ? (container.innerHTML += `
        <div class="card-container hide">
            <div class="card" data-thumbnail="${thumbnail}" data-date="${date}" data-competition="${competition}" data-matchview="${matchviewUrl}" >
                <img class="card-img" src="${thumbnail}" alt="thumbnail" />
            </div>
            <h2 class="card-title">${title}⚽</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#034694" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,154.7C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        `)
          : null;

        const cards = document.querySelectorAll(".card-container");
        cards.forEach((card) => {
          card.addEventListener("click", openPopup);
        });

        setTimeout(() => {
          loadingSkeleton.style.display = "none";
          cards.forEach((card) => {
            card.classList.remove("hide");
          });

          container.style.display = "grid";
        }, 1000);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

/*Menu*/

menuBtn.addEventListener("click", () => {
  menuContainer.classList.toggle("active");
  menu.classList.toggle("active");

  menuBtn.classList.toggle("active");
  lines.forEach((line) => {
    line.classList.toggle("active");
  });
});

/*Home Button*/

homeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("#container").scrollIntoView({
      behavior: "smooth",
      top: 0,
    });

    document.querySelector(".live-stream").style.display = "none";
    document.querySelector("#container").style.display = "grid";

    if (window.screen.width < 830) {
      menuContainer.classList.toggle("active");
      menu.classList.toggle("active");

      menuBtn.classList.toggle("active");
      lines.forEach((line) => {
        line.classList.toggle("active");
      });
    }
  });
});

/*Live Button*/

liveBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".live-stream").style.display = "block";
    document.querySelector(".live-stream").scrollIntoView({
      behavior: "smooth",
      top: 0,
    });
    document.querySelector("#container").style.display = "none";

    if (window.screen.width < 830) {
      menuContainer.classList.toggle("active");
      menu.classList.toggle("active");

      menuBtn.classList.toggle("active");
      lines.forEach((line) => {
        line.classList.toggle("active");
      });
    }
  });
});
