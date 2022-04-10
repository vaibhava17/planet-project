const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlants = [];

const isHabitablePlanets = planet => {
      return planet["koi_disposition"] === "CONFIRMED"
            && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
            && planet["koi_prad"] < 1.6;
}

fs.createReadStream("kepler_data.csv")
      .pipe(parse({
            comment: "#",
            columns: true,
            // delimiter: ","
      }))
      .on("data", data => {
            if (isHabitablePlanets(data)) {
                  habitablePlants.push(data);
            }
      })
      .on("error", err => {
            console.log(err);
      })
      .on("end", () => {
            console.log(`${habitablePlants.length} habitable planets found!`);
            console.log(habitablePlants.map((planet) => {
                  return `${planet["kepler_name"]} is a habitable planet!`
            }));
      });
