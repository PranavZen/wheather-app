
const key = "e2ca3099e28abc76d0696b035ca00364"

export const APIfetch = (cityname) => {

      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`)
      .then(response => {
            return response.json();
      })
      .catch(err => {
            console.error(err);
      })
}

export default APIfetch;
 