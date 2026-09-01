let currentMode = "arrivals";

async function searchFlight() {

    const flightNo = document
        .getElementById("flightInput")
        .value
        .trim()
        .toUpperCase();

    if (!flightNo) {
        showFlightNotFound();
        return;
    }

    try {

        const data = await loadFlights();

        console.log("Flight data received:", data);

        // API error
        if (data.error) {
            console.error("Search error:", data.error);
            showFlightNotFound();
            return;
        }

        const list = data[currentMode] || [];

        const flight = list.find(f =>
            f.flight &&
            f.flight.toUpperCase() === flightNo
        );

        if (flight) {

            updateFlightCard(flight, data.updated);

            saveRecentSearch(flightNo);

        } else {

            console.log("Flight not found in:", list);
            showFlightNotFound();

        }

    } catch (error) {

        console.error("Search failed:", error);
        showFlightNotFound();

    }
}


// Arrivals / Departures buttons

document.getElementById("arrivalBtn").addEventListener("click", () => {

    currentMode = "arrivals";

    console.log("Mode: arrivals");

});


document.getElementById("departureBtn").addEventListener("click", () => {

    currentMode = "departures";

    console.log("Mode: departures");

});
