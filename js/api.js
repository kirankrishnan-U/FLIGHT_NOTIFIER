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

        /*
         * Send flight number + selected date
         */
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

        /*
         * Worker/API error
         */
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

        /*
         * Check which tab is selected
         */
        const mode =
            typeof currentMode !== "undefined"
                ? currentMode
                : "arrivals";

        /*
         * =====================================================
         * ARRIVALS
         * =====================================================
         */

        if (mode === "arrivals") {

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
        }

        /*
         * =====================================================
         * DEPARTURES
         * =====================================================
         */

        if (mode === "departures") {

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
                    result.departure?.scheduled || null,

                estimated:
                    result.departure?.estimated || null,

                actual:
                    result.departure?.actual || null,

                terminal:
                    result.departure?.terminal || "-",

                gate:
                    result.departure?.gate || "-",

                status:
                    result.status || "unknown"
            };

            return {

                updated:
                    result.updated,

                arrivals:
                    [],

                departures:
                    [flight]
            };
        }

        /*
         * Safety fallback
         */
        return {

            arrivals: [],

            departures: [],

            error: "Unknown flight mode"
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
