// ---- Scroll reveal: fade sections in as they enter the screen ----
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// ---- Pop-ups: shared behavior (X button, click outside, Escape) ----
function setUpDialog(dialog) {
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());

  // Close when clicking the dark area outside the pop-up
  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
  });

  // Give the page its scrolling back once the pop-up is closed
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("locked");
  });
}

function openDialog(dialog) {
  dialog.showModal();
  document.documentElement.classList.add("locked");
}

// ---- Project pop-up: clicking a tile opens its details ----
const projectDialog = document.getElementById("project-dialog");
const projectTitle = document.getElementById("dialog-title");
const projectChart = projectDialog.querySelector(".dialog-chart");
const projectBody = projectDialog.querySelector(".dialog-body");
setUpDialog(projectDialog);

document.querySelectorAll(".project").forEach((project) => {
  project.querySelector(".tile").addEventListener("click", () => {
    projectTitle.textContent = project.querySelector(".tile-title").textContent;
    projectChart.innerHTML = "";
    projectChart.appendChild(project.querySelector(".chart").cloneNode(true));
    projectBody.innerHTML = project.querySelector(".detail").innerHTML;
    openDialog(projectDialog);
  });
});

// ---- Resume pop-up: clicking the page opens both pages, bigger ----
const resumeDialog = document.getElementById("resume-dialog");
setUpDialog(resumeDialog);

document.querySelector(".resume-open").addEventListener("click", () => {
  openDialog(resumeDialog);
});
