const API_URL =
    "https://flight-notifier-api.kirankrishnanu555.workers.dev/";

async function loadFlights() {
    try {

        const flightInput = document
            .getElementById("flightInput")
            .value
            .trim()
            .toUpperCase();

        const dateInput = document
            .getElementById("date")
            .value;

        if (!flightInput) {
            return {
                arrivals: [],
                departures: [],
                error: "Please enter a flight number"
            };
        }

        if (!dateInput) {
            return {
                arrivals: [],
                departures: [],
                error: "Please select a date"
            };
        }

        // Send BOTH flight number and selected date
        const url =
            API_URL +
            "?flight=" +
            encodeURIComponent(flightInput) +
            "&date=" +
            encodeURIComponent(dateInput);

        console.log("Requesting:", url);

        const response = await fetch(url);

        const result = await response.json();

        console.log("Flight API response:", result);

        // Worker/API error
        if (!response.ok || !result.success) {

            console.error(
                "Flight API error:",
                result
            );

            return {
                arrivals: [],
                departures: [],
                error:
                    result.error ||
                    "Unable to fetch flight"
            };
        }

        // Convert Worker response
        // into the format search.js expects
        const flight = {

            flight:
                result.flight,

            airline:
                result.airline,

            origin:
                result.departure?.airport || "-",

            destination:
                result.arrival?.airport || "-",

            scheduled:
                result.arrival?.scheduled || null,

            estimated:
                result.arrival?.estimated || null,

            actual:
                result.arrival?.actual || null,

            terminal:
                result.arrival?.terminal || "-",

            gate:
                result.arrival?.gate || "-",

            status:
                result.status || "unknown"
        };

        return {

            updated:
                result.updated,

            arrivals:
                [flight],

            departures:
                []
        };

    } catch (err) {

        console.error(
            "Unable to contact flight API:",
            err
        );

        return {

            arrivals: [],

            departures: [],

            error:
                "Unable to contact flight server"
        };
    }
}
