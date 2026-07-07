const DATA_FILE = "data/flights.json";

async function loadFlights() {
    try {
        const response = await fetch(DATA_FILE + "?t=" + Date.now());

        if (!response.ok) {
            throw new Error("Unable to load flight data");
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        return {
            arrivals: [],
            departures: []
        };
    }
}