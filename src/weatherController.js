const API_KEY = "7YP995SCT84Z5W7WZMYRQRDZK";

export default (function () {
  const fetchData = function (location) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
      )
      .then(response => {
        if (response.ok) {
          resolve(response);
        } else {
          reject("Error");
        }
      })
    });
  };

  const processData = async function (data) {
    const processedData = await data.json();

    console.log(await processedData);

    const filteredProcessedData = {
      resolvedAddress: processedData.resolvedAddress,
      description: processedData.description,
      temp: processedData.currentConditions.temp,
      feelslike: processedData.currentConditions.feelslike,
      humidity: processedData.currentConditions.humidity,
      windspeed: processedData.currentConditions.windspeed,
      visibility: processedData.currentConditions.visibility,
      icon: processedData.currentConditions.icon,
    };

    return filteredProcessedData;
  };

  const validateLocation = async function (location) {
    try {
      await fetchData(location);
      return true;
    } catch {
      return false;
    }
  };

  const retrieveWeatherData = async function (location) {
    const data = await fetchData(location);
    const processedData = await processData(data);

    return await processedData;
  };

  return {
    retrieveWeatherData,
    validateLocation,
  };
})();
