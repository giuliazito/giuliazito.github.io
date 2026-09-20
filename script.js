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

// ---- Project pop-up: clicking a tile opens its details ----
const dialog = document.getElementById("project-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogChart = dialog.querySelector(".dialog-chart");
const dialogBody = dialog.querySelector(".dialog-body");

document.querySelectorAll(".project").forEach((project) => {
  const tile = project.querySelector(".tile");

  tile.addEventListener("click", () => {
    dialogTitle.textContent = project.querySelector(".tile-title").textContent;
    dialogChart.innerHTML = "";
    dialogChart.appendChild(project.querySelector(".chart").cloneNode(true));
    dialogBody.innerHTML = project.querySelector(".detail").innerHTML;

    dialog.showModal();
    document.documentElement.classList.add("locked");
  });
});

dialog.querySelector(".close").addEventListener("click", () => dialog.close());

// Close when clicking the dark area outside the pop-up
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  const inside = e.clientX >= r.left && e.clientX <= r.right &&
                 e.clientY >= r.top && e.clientY <= r.bottom;
  if (!inside) dialog.close();
});

dialog.addEventListener("close", () => {
  document.documentElement.classList.remove("locked");
});
