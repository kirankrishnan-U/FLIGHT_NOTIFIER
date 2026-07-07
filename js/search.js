async function searchFlight() {

    const flight = document
        .getElementById("flightInput")
        .value
        .trim()
        .toUpperCase();

    const data = await loadFlights();

    const mode = currentMode || "arrivals";

    const result = data[mode].find(f =>
        f.flight.toUpperCase() === flight
    );

    if (result) {

        updateFlightCard(result);

        saveRecentSearch(flight);

    } else {

        showFlightNotFound();

    }

}