let SText;

const loadtube = async (SText) => {
  if (SText === "1005") {
    const CardContainer = document.getElementById("card_container");
    card_container.textContent = "";
    const div = document.createElement("div");
    div.innerHTML = `<div class="flex flex-col justify-center items-center gap-4">
      <img class="mt-16 flex text-center" src="./img/Icon.png" alt="">
      <p class="text-3xl font-bold flex text-center">Oops!! Sorry, There is no <br>content here
           </p>
           
           </div>
  `;
    CardContainer.appendChild(div);
  } else {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${SText}`
    );
    const data = await res.json();
    const tube = data.data;
    displaycard(tube);
  }
};
// loadtube();
const displaycard = (tube) => {
  //   console.log(tube);

  const CardContainer = document.getElementById("card_container");
  card_container.textContent = "";
  tube.forEach((videos) => {
    const TubeCard = document.createElement("div");

    // for time
    let postedDate = videos.others.posted_date;
    let time;
    if (postedDate > 59) {
      time = convertTime(postedDate);
    } else {
      time = " ";
    }
    // for card
    TubeCard.classList = `w-[312px] pt-2 gap-2`;
    // 3: set inner html
    TubeCard.innerHTML = `
                <div class="relative">
              <img src="${
                videos?.thumbnail
              }" class="h-[200px] w-[312px] rounded-md " />
       
               <div class="absolute bottom-24 right-2 h-6 w-auto bg-black text-white">
        ${time}
        </div>

          <div class="flex flex-row gap-3 mt-2">
            <img src="${
              videos?.authors[0]?.profile_picture
            }" class="h-[40px] w-[40px] rounded-full " />
            <div class="flex flex-col">
              <p class="text-base font-bold">${videos?.title}</p>
              <div class="flex flex-row gap-2">
                <p class="font-light ">${
                  videos?.authors[0]?.profile_name
                }</p>
                <div>${
                  videos?.authors[0]?.verified
                    ? '<img src="./img/verified.png" >'
                    : " "
                }
              </div>
              </div>
              <p class="font-light" >${videos?.others?.views} views</p>
            </div>
          </div>
          </div>


          `;

    CardContainer.appendChild(TubeCard);
  });
};
const AllSearch = (SText) => {
  loadtube(SText);
  console.log(SText);
};

const convertTime = (postedDate) => {
  let sec = Math.floor(postedDate);
  let min = Math.floor(sec / 60);
  let hr = Math.floor(min / 60);
  sec = sec % 60;
  min = sec >= 30 ? min + 1 : min;
  min = min % 60;
  hr = hr % 24;
  return `${toDigit(hr)}hrs ${toDigit(min)}mins ago`;
};
const toDigit = (digit) => {
  return digit.toString().padStart(2, "0");
};
