// ---- Headings scale up/down as their section scrolls in and out ----
const scaleHeads = document.querySelectorAll(".scalehead");

if ("IntersectionObserver" in window) {
  const headIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("in-view", entry.isIntersecting);
    });
  }, { threshold: 0.3 });
  scaleHeads.forEach((el) => headIO.observe(el));
} else {
  scaleHeads.forEach((el) => el.classList.add("in-view"));
}

// ---- Shared pop-up behavior (X button, click outside, Escape) ----
function setUpDialog(dialog) {
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("locked");
  });
}

function openDialog(dialog) {
  dialog.showModal();
  dialog.querySelector(".dialog-inner").scrollTop = 0;
  document.documentElement.classList.add("locked");
}

// ---- Project pop-up: clicking a card opens its write-up ----
const projectDialog = document.getElementById("project-dialog");
const projectEyebrow = document.getElementById("dialog-eyebrow");
const projectTitle = document.getElementById("dialog-title");
const projectChart = projectDialog.querySelector(".dialog-chart");
const projectBody = projectDialog.querySelector(".dialog-body");
setUpDialog(projectDialog);

document.querySelectorAll(".project").forEach((project) => {
  project.querySelector(".tile").addEventListener("click", () => {
    const detail = project.querySelector(".detail");

    projectTitle.textContent = project.querySelector(".tile-title").textContent;
    projectEyebrow.textContent = detail.querySelector(".eyebrow")?.textContent || "";

    projectChart.innerHTML = "";
    const chart = project.querySelector(".chart").cloneNode(true);
    projectChart.classList.toggle("is-placeholder", chart.classList.contains("placeholder"));
    projectChart.appendChild(chart);

    projectBody.innerHTML = detail.innerHTML;

    openDialog(projectDialog);
  });
});
