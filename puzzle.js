let confettis = document.querySelector(".confetti-cont");
let container = document.querySelector(".gift-container");


gsap.set(container, { opacity: 1 });

let explosion = gsap.timeline({ paused: true });

// create 100 confetti elements
for (let i = 0; i < 100; i++) {
  let c = document.createElement("div");
  c.innerHTML = gsap.utils.random(["🎁", "✨", "⭐", "🎈", "👍"]);
  c.setAttribute("class", "confetti");
  confettis.appendChild(c);

  explosion.to(
    c,
    {
      keyframes: [
        {
          opacity: 1,
          duration: 0.01
        },
        {
          duration: 3,
          physics2D: {
            velocity: "random(200, 650)",
            angle: "random(250, 290)",
            gravity: 300
          }
        },
        {
          opacity: 0,
          duration: 0.3,
          delay: -2
        }
      ]
    },
    Math.random() * 2
  );
}
let tl = gsap.timeline({
  paused: true
});
tl.to(".top", {
  z: 110,
  duration: 0.2,
  ease: "back.out"
})
  .to(
    ".top",
    {
      rotate: 360,
      transformOrigin: "center center",
      duration: 1,
      ease: "back.out"
    },
    "-=0.2"
  )
  .to(".top", {
    z: 80,
    scale: 0.9,
    rotateY: -240,
    x: -15,
    duration: 1.2,
    transformOrigin: "center left",
    ease: "sine.inOut",
    onStart: () => {
      explosion.play(0);
    }
  })
  .reverse();

let card = document.querySelector(".card");
let letters = document.querySelector(".letters");
let isOpen;
function checkPuzzle(e) {
  e.preventDefault();
  isOpen = !isOpen;
  const ans = document.getElementById("ans").value;
  const cardState = Flip.getState(
    ".card, .gift-container, .content--open, .content--closed",
    { props: "borderRadius,padding" }
  );
  console.log(ans)
  // write regexp to check if ans is "sand" case insensitive
  if (/^sand$/i.test(ans)) {
    // alert("Correct!");

    //   if (isOpen) {
//     document.body.appendChild(letters);
//   } else {
//     container.appendChild(letters);
//     explosion.progress(0).pause();
//   }
  // document.body.classList.toggle("open");
// explosion.progress(0).pause();


    // todo write a display modal function to view once it is correct so return status ok or good

    // Notify YOU by email
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "your-email@example.com",
        message: "Someone solved the puzzle!"
      })
    }).then(response => {
         Flip.from(cardState, {
          absolute: '.card',
          nested: true,
          duration: 0.75,
          ease: "sine.inOut",
          toggleClass: 'flipping',
          onStart: () => {
            isOpen ? tl.timeScale(1).play() : tl.timeScale(1.5).reverse()
            ;
          },
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.5, delay: 0.75, overwrite: true }
            );
          },
          onLeave: (elements) => {
            gsap.fromTo(
              elements,
              { autoAlpha: 1 },
              { autoAlpha: 0, duration: 0.01, overwrite: true }
            );
          }

          //after the animation
          // window.location.reload();
          

  }).then(() => {
      setTimeout(() => {alert("Thank you for playing\nYou Should be receiving your gift within 19th December!");;}, 3000);
    });
      // window.location.reload();
    });
  } else {
    alert("Wrong answer, try again!");
  }
}


// prevent default form submission behavior
const form = document.getElementById("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
});

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", checkPuzzle);


