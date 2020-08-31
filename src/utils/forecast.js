const request = require("request");
const forecast = (lat, lng, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=2f7e8a669caf645ba8465341f71418bb&query=${lat},${lng}&units=m`;

  console.log("lat and lng", lat, lng);

  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback("Could not connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Could not find weather for given location", undefined);
    } else {
      const weatherInfo = response.body.current;
      callback(
        undefined,
        `It is currently ${weatherInfo.temperature} degrees out and it feel like ${weatherInfo.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
