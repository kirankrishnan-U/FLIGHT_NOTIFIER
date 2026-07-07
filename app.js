// Initialize page

date.value = new Date().toISOString().slice(0,10);

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

let currentMode = "arrivals";

document.getElementById("arrivalBtn").addEventListener("click", () => {
    currentMode = "arrivals";
});

document.getElementById("departureBtn").addEventListener("click", () => {
    currentMode = "departures";
});