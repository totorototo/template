export const location = (
  { enableHighAccuracy = true, timeout = 20000, maximumAge = 1000 } = {}
) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy,
      timeout,
      maximumAge
    });
  });
