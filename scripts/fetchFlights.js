const fs = require("fs");

const flights = {
    updated: new Date().toISOString(),
    arrivals: [
        {
            flight: "EK532",
            origin: "Dubai",
            scheduled: "02:55",
            estimated: "02:47",
            terminal: "T3",
            gate: "A12",
            status: "On Time"
        }
    ],
    departures: []
};

fs.writeFileSync(
    "data/flights.json",
    JSON.stringify(flights, null, 2)
);

console.log("Flight data updated.");