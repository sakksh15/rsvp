document.addEventListener("DOMContentLoaded", function () {
    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(section => {
            section.classList.add("hidden");
        });

        const targetSection = document.getElementById(sectionId);
        targetSection.classList.remove("hidden");

        // Smooth scrolling to the section
        targetSection.scrollIntoView({ behavior: "smooth" });
    }

    window.enterWebsite = function () {
        showSection("events");
    };

    window.goToRSVP = function () {
        showSection("rsvp");
    };

    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const attendance = document.getElementById("attendance").value;

        if (name === "" || email === "" || attendance === "") {
            alert("Please fill out all fields.");
            return;
        }

        // Send data to Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbwl_ugKoTQLlmRY-4py7s_mj2Rjplwp9SF5-mKMTTX13uzwi58KRw4sI0MXDKhoMIRzkw/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        name: document.getElementById("name").value, 
        email: document.getElementById("email").value, 
        attendance: document.getElementById("attendance").value
    }),
})
.then(response => response.json())
.then(data => {
    console.log("Server Response:", data);
    if (data.status === "success") {
        document.querySelector("form").reset();
        showSection("thank-you");
    } else {
        alert("Error submitting RSVP: " + data.message);
    }
})
.catch(error => {
    console.error("Submission Error:", error);
    alert("There was a problem submitting your RSVP. Please try again.");
});


    });
});
