export const weatherData = (() => {
  const key = "9VETQD2WZMCXJAD8FHQS9ACK6";
  let data = {};

  const setData = async (city) => {
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      city +
      "?unitGroup=metric&include=days%2Chours%2Ccurrent%2Calerts%2Cevents&key=" +
      key +
      "&contentType=json";

    const newData = await fetch(url);
    data = await newData.json();
    console.log(data);
  };

  const getDay = (day) => {
    console.log(data.days[day]);
    return data.days[day];
  };

  return { setData, getDay };
})();
