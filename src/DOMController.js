import weatherController from "./weatherController";

function importAll(folder) {
  let images = {};
  folder.keys().map((item, index) => {
    images[item.replace("./", "")] = folder(item);
  });
  return images;
}

export default (function () {
  const images = importAll(
    require.context("./icons", false, /\.(png|jpe?g|svg)$/)
  );
  const searchButton = document.querySelector("#submit-search")
  const searchBar = document.querySelector("#search-bar");

  searchBar.addEventListener("search", search);
  searchButton.addEventListener("click", search);

  async function search() {
    const location = searchBar.value;
    const isValid = await weatherController.validateLocation(location);

    if (isValid){
      displayWeatherInfo(location);
      searchBar.setCustomValidity("");
    } else {
      searchBar.setCustomValidity("Invalid Location")
      searchBar.reportValidity();
    }
  }

  const displayWeatherInfo = async function (location) {
    const data = await weatherController.retrieveWeatherData(location);

    const cityName = document.querySelector('.city-name')
    const cityTemp = document.querySelector('.city-temp')
    const cityDescription = document.querySelector('.city-description')
    const cityFeels = document.querySelector('.city-feels')
    const cityHumidity = document.querySelector('.city-humidity')
    const cityWind = document.querySelector('.city-wind')
    const cityVisibility = document.querySelector('.city-visibility')

    const cardIcon = document.querySelector(".card-icon");

    cityName.textContent = `${data.resolvedAddress}`;
    cityTemp.textContent = `${data.temp}`;

    cityDescription.textContent = `${data.description}`;
    cityFeels.textContent = `Feels like: ${data.feelslike}`;
    cityHumidity.textContent = `Humidity: ${data.humidity}%`;
    cityWind.textContent = `Wind Speed: ${data.windspeed} mph`;
    cityVisibility.textContent = `Visibility: ${data.visibility} miles`;

    cardIcon.src = images[`${data.icon}.svg`];

    addDegreeSymbol(cityTemp);
    addDegreeSymbol(cityFeels);
  };

  function addDegreeSymbol(element) {
    const sup = document.createElement('sup');
    sup.textContent = "°";
    element.appendChild(sup);
  }

  return {
    displayWeatherInfo
  };
})();
