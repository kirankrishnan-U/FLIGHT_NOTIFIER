const API_URL =
    "https://flight-notifier-api.kirankrishnanu555.workers.dev/";

async function loadFlights() {
    try {
        const flightInput = document
            .getElementById("flightInput")
            .value
            .trim()
            .toUpperCase();

        if (!flightInput) {
            return {
                arrivals: [],
                departures: [],
                error: "Please enter a flight number"
            };
        }

        const response = await fetch(
            API_URL + "?flight=" + encodeURIComponent(flightInput)
        );

        const result = await response.json();

        // Worker/API error
        if (!response.ok || !result.success) {
            console.error("Flight API error:", result);

            return {
                arrivals: [],
                departures: [],
                error: result.error || "Unable to fetch flight"
            };
        }

        // Convert Worker response into the format
        // the existing search.js expects
        const flight = {
            flight: result.flight,
            airline: result.airline,

            origin: result.departure?.airport || "-",
            destination: result.arrival?.airport || "-",

            scheduled: result.arrival?.scheduled || null,
            estimated: result.arrival?.estimated || null,
            actual: result.arrival?.actual || null,

            terminal: result.arrival?.terminal || "-",
            gate: result.arrival?.gate || "-",

            status: result.status || "unknown"
        };

        return {
            updated: result.updated,
            arrivals: [flight],
            departures: []
        };

    } catch (err) {
        console.error("Unable to contact flight API:", err);

        return {
            arrivals: [],
            departures: [],
            error: "Unable to contact flight server"
        };
    }
}
