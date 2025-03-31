document.addEventListener("DOMContentLoaded", function () {
  function showSection(id) {
    document.querySelectorAll("section").forEach(section => {
      section.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  window.enterWebsite = function () {
    showSection("events");
  };

  window.goToRSVP = function () {
    showSection("rsvp");
  };
});
