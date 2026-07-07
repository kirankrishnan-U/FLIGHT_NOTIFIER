const fs = require("fs");
const axios = require("axios");

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const FLIGHT = "EK532";

async function fetchFlight() {
    try {

        const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${FLIGHT}`;

        const response = await axios.get(url);

        if (!response.data.data.length) {
            throw new Error("Flight not found");
        }

        const f = response.data.data[0];

        const json = {
            updated: new Date().toISOString(),
            arrivals: [
                {
                    flight: f.flight.iata,
                    airline: f.airline.name,
                    origin: f.departure.airport,
                    destination: f.arrival.airport,
                    scheduled: f.arrival.scheduled,
                    estimated: f.arrival.estimated,
                    actual: f.arrival.actual,
                    terminal: f.arrival.terminal || "-",
                    gate: f.arrival.gate || "-",
                    status: f.flight_status
                }
            ],
            departures: []
        };

        fs.writeFileSync(
            "data/flights.json",
            JSON.stringify(json, null, 2)
        );

        console.log("Flight updated.");

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fetchFlight();