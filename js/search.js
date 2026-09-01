async function searchFlight() {

    const input = document.getElementById("flightInput");

    if (!input) {
        console.error("flightInput element not found");
        return;
    }

    const flightNo = input.value.trim().toUpperCase();

    console.log("Searching for:", flightNo);
    console.log("Current mode:", currentMode);

    if (!flightNo) {
        showFlightNotFound();
        return;
    }

    try {

        const data = await loadFlights();

        console.log("API data received:", data);

        if (!data) {
            console.error("No data received");
            showFlightNotFound();
            return;
        }

        if (data.error) {
            console.error("API returned error:", data.error);
            showFlightNotFound();
            return;
        }

        // Search BOTH lists.
        // This avoids the Arrivals/Departures selection
        // preventing a valid flight from being displayed.
        const allFlights = [
            ...(data.arrivals || []),
            ...(data.departures || [])
        ];

        console.log("Flights available:", allFlights);

        const flight = allFlights.find(f =>
            f &&
            f.flight &&
            f.flight.toUpperCase() === flightNo
        );

        console.log("Matched flight:", flight);

        if (flight) {

            updateFlightCard(
                flight,
                data.updated
            );

            saveRecentSearch(flightNo);

        } else {

            console.error(
                "Flight not found. Looking for:",
                flightNo,
                "Available:",
                allFlights
            );

            showFlightNotFound();
        }

    } catch (error) {

        console.error("SEARCH ERROR:", error);

        showFlightNotFound();
    }
}


// Arrivals button

document.getElementById("arrivalBtn").addEventListener("click", function () {

    currentMode = "arrivals";

    console.log("Mode changed to arrivals");

});


// Departures button

document.getElementById("departureBtn").addEventListener("click", function () {

    currentMode = "departures";

    console.log("Mode changed to departures");

});
