// Initialize page

const dateInput = document.getElementById("date");
const flightInput = document.getElementById("flightInput");

dateInput.value = new Date().toISOString().slice(0, 10);

flightInput.value = localStorage.flight || "";

if (flightInput.value) {
    searchFlight();
}

function toggleFav() {
    alert("Favourite feature coming soon");
}

function toggleNotify() {
    alert("Notification feature coming soon");
}
