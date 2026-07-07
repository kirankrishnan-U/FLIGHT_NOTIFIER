date.value=new Date().toISOString().slice(0,10);flightInput.value=localStorage.flight||'';function searchFlight(){const f=flightInput.value.toUpperCase();localStorage.flight=f;flightTitle.textContent=f||'No Flight Selected';fetch('data/status.json?'+Date.now()).then(r=>r.json()).then(d=>{status.textContent=d.status;origin.textContent=d.origin;scheduled.textContent=d.scheduled;estimated.textContent=d.estimated;terminal.textContent=d.terminal;gate.textContent=d.gate||'-';updated.textContent=new Date().toLocaleTimeString();});}function toggleFav(){alert('Favourite feature coming in live version');}function toggleNotify(){alert('Notifications will be enabled after live integration');}if(flightInput.value)searchFlight();let currentMode = "arrivals";

document.getElementById("arrivalBtn").addEventListener("click", () => {

    currentMode = "arrivals";

    document.getElementById("arrivalBtn").style.background = "#1565C0";
    document.getElementById("arrivalBtn").style.color = "white";

    document.getElementById("departureBtn").style.background = "";
    document.getElementById("departureBtn").style.color = "";

});

document.getElementById("departureBtn").addEventListener("click", () => {

    currentMode = "departures";

    document.getElementById("departureBtn").style.background = "#1565C0";
    document.getElementById("departureBtn").style.color = "white";

    document.getElementById("arrivalBtn").style.background = "";
    document.getElementById("arrivalBtn").style.color = "";

});