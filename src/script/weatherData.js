export const weatherData = (() => {
  const key = "9VETQD2WZMCXJAD8FHQS9ACK6";
  let data = {};

  const setData = async (city) => {
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      city +
      "?unitGroup=metric&include=days%2Chours%2Ccurrent%2Calerts%2Cevents&key=" +
      key +
      "&contentType=json&iconSet=icons2";

    const newData = await fetch(url);
    data = await newData.json();
    console.log(data);
  };

  const getResolvedAddress = () => {
    return data.resolvedAddress;
  };

  const getDatetime = (day) => {
    return getDay(day).datetime;
  };

  const getMaxTemperature = (day) => {
    return Math.round(getDay(day).tempmax);
  };

  const getMinTemperature = (day) => {
    return Math.round(getDay(day).tempmin);
  };

  const getFeelsLikeMax = (day) => {
    return Math.round(getDay(day).feelslikemax);
  };

  const getFeelsLikeMin = (day) => {
    return Math.round(getDay(day).feelslikemin);
  };

  const getDescription = (day) => {
    return getDay(day).description;
  };

  const getIcon = (day) => {
    return getDay(day).icon;
  };

  const getPrecipitationProbability = (day) => {
    return getDay(day).precipprob;
  };

  const getHours = (day) => {
    return getDay(day).hours;
  };

  /* --- Helper functions --- */

  const getDay = (day) => {
    return data.days[day];
  };

  return {
    setData,
    getResolvedAddress,
    getDatetime,
    getMaxTemperature,
    getMinTemperature,
    getFeelsLikeMax,
    getFeelsLikeMin,
    getDescription,
    getIcon,
    getPrecipitationProbability,
    getHours,
  };
})();
