let currentMode = "arrivals";

async function searchFlight() {

    const flightNo = document
        .getElementById("flightInput")
        .value
        .trim()
        .toUpperCase();

    const data = await loadFlights();

    const list = data[currentMode] || [];

    const flight = list.find(f =>
        f.flight.toUpperCase() === flightNo
    );

    if (flight) {

        updateFlightCard(flight, data.updated);

        saveRecentSearch(flightNo);

    } else {

        showFlightNotFound();

    }

}