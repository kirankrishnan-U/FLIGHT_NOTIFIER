function updateFlightCard(f){

    document.getElementById("flightTitle").innerHTML =
        f.flight;

    document.getElementById("status").innerHTML =
        f.status;

    document.getElementById("origin").innerHTML =
        f.origin;

    document.getElementById("scheduled").innerHTML =
        f.scheduled;

    document.getElementById("estimated").innerHTML =
        f.estimated;

    document.getElementById("terminal").innerHTML =
        f.terminal;

    document.getElementById("gate").innerHTML =
        f.gate || "-";

    document.getElementById("updated").innerHTML =
        data.updated || "-";

}

function showFlightNotFound(){

    alert("Flight not found");

}