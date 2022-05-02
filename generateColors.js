const axios = require("axios");
const hsl = require("hsl-to-hex");

const hslHelper = (value) => {
  return hsl(value, 100, 50);
};

const generate = async () => {
  try {
    const apiCalls = [];

    // delete db
    await axios.delete("https://helpful-h.herokuapp.com/api/colors");

    for (let index = 1; index <= 100; index++) {
      const hue = Math.floor(index * 3.4);

      let group = "red";

      switch (hue) {
        case value:
          if (value <= 20) group = "red";
          break;
        case value:
          if (value <= 45) group = "orange";
          break;
        case value:
          if (value <= 63) group = "yellow";
          break;
        case value:
          if (value <= 160) group = "green";
          break;
        case value:
          if (value <= 256) group = "blue";
          break;
        case value:
          if (value <= 335) group = "purple";
          break;

        default:
          break;
      }

      apiCalls.push(
        axios.post("https://hh-json-server.herokuapp.com/colors", {
          hue,
          saturation: 100,
          light: 50,
          hex: hslHelper(hue),
          group,
        })
      );
    }

    await Promise.all(apiCalls);

    console.log("Success");
  } catch (error) {
    console.error("Failed to generate color data", error);
  }
};

generate();
