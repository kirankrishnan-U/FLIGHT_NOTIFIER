function updateFlightCard(flight, updated) {

    document.getElementById("flightTitle").textContent = flight.flight;
    document.getElementById("status").textContent = flight.status;
    document.getElementById("origin").textContent = flight.origin;
    document.getElementById("scheduled").textContent = flight.scheduled;
    document.getElementById("estimated").textContent = flight.estimated;
    document.getElementById("terminal").textContent = flight.terminal || "-";
    document.getElementById("gate").textContent = flight.gate || "-";
    document.getElementById("updated").textContent = updated || "-";
}

function showFlightNotFound() {

    document.getElementById("flightTitle").textContent = "Flight Not Found";
    document.getElementById("status").textContent = "-";
    document.getElementById("origin").textContent = "-";
    document.getElementById("scheduled").textContent = "-";
    document.getElementById("estimated").textContent = "-";
    document.getElementById("terminal").textContent = "-";
    document.getElementById("gate").textContent = "-";
    document.getElementById("updated").textContent = "-";
}