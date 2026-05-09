// Lightweight weather API wrapper using Open-Meteo (no API key required).
// We translate Open-Meteo data to a unified shape used by the UI.

import axios from "axios";

const GEO = "https://geocoding-api.open-meteo.com/v1/search";
const WX = "https://api.open-meteo.com/v1/forecast";
const AQI = "https://air-quality-api.open-meteo.com/v1/air-quality";

// WMO weather codes -> condition + isDay-aware label
const WMO = {
  0: { main: "Clear", desc: "Clear sky" },
  1: { main: "Clear", desc: "Mainly clear" },
  2: { main: "Clouds", desc: "Partly cloudy" },
  3: { main: "Clouds", desc: "Overcast" },
  45: { main: "Fog", desc: "Foggy" },
  48: { main: "Fog", desc: "Rime fog" },
  51: { main: "Drizzle", desc: "Light drizzle" },
  53: { main: "Drizzle", desc: "Drizzle" },
  55: { main: "Drizzle", desc: "Heavy drizzle" },
  61: { main: "Rain", desc: "Light rain" },
  63: { main: "Rain", desc: "Rain" },
  65: { main: "Rain", desc: "Heavy rain" },
  71: { main: "Snow", desc: "Light snow" },
  73: { main: "Snow", desc: "Snow" },
  75: { main: "Snow", desc: "Heavy snow" },
  77: { main: "Snow", desc: "Snow grains" },
  80: { main: "Rain", desc: "Rain showers" },
  81: { main: "Rain", desc: "Heavy showers" },
  82: { main: "Rain", desc: "Violent showers" },
  85: { main: "Snow", desc: "Snow showers" },
  86: { main: "Snow", desc: "Heavy snow showers" },
  95: { main: "Thunderstorm", desc: "Thunderstorm" },
  96: { main: "Thunderstorm", desc: "Storm w/ hail" },
  99: { main: "Thunderstorm", desc: "Severe storm" },
};

export async function geocodeCity(query) {
  const { data } = await axios.get(GEO, {
    params: { name: query, count: 5, language: "en", format: "json" },
  });
  return (data.results || []).map((r) => ({
    name: r.name,
    country: r.country,
    admin: r.admin1,
    lat: r.latitude,
    lon: r.longitude,
    label: `${r.name}${r.admin1 ? ", " + r.admin1 : ""}, ${r.country}`,
  }));
}

export async function reverseGeocode(lat, lon) {
  try {
    // Top priority: OpenStreetMap/Nominatim or BigDataCloud (free, client-side friendly)
    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client`,
      { params: { latitude: lat, longitude: lon, localityLanguage: "en" } }
    );
    if (data && (data.city || data.locality || data.principalSubdivision)) {
      const city = data.city || data.locality || "Unknown Region";
      const admin = data.principalSubdivision || "";
      const country = data.countryName || "";
      return {
        name: city,
        country: country,
        admin: admin,
        lat,
        lon,
        label: `${city}${admin ? ", " + admin : ""}${country ? ", " + country : ""}`,
      };
    }
  } catch (err) {
    console.error("Reverse geocode failed:", err);
  }
  
  return { name: "Current Location", country: "", admin: "", lat, lon, label: "Current Location" };
}

export async function fetchWeather({ lat, lon, units = "metric" }) {
  const tempUnit = units === "imperial" ? "fahrenheit" : "celsius";
  const windUnit = units === "imperial" ? "mph" : "kmh";

  const [{ data }, aqi] = await Promise.all([
    axios.get(WX, {
      params: {
        latitude: lat,
        longitude: lon,
        current:
          "temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,cloud_cover,uv_index,visibility",
        hourly:
          "temperature_2m,weather_code,precipitation_probability,uv_index",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max",
        temperature_unit: tempUnit,
        wind_speed_unit: windUnit,
        timezone: "auto",
        forecast_days: 7,
      },
    }),
    axios
      .get(AQI, {
        params: {
          latitude: lat,
          longitude: lon,
          current: "us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide",
          timezone: "auto",
        },
      })
      .catch(() => null),
  ]);

  const c = data.current;
  const cond = WMO[c.weather_code] || { main: "Clear", desc: "Clear" };
  const isDay = !!c.is_day;

  // Build hourly (next 24 from now)
  const nowIso = c.time;
  const hi = data.hourly.time.indexOf(nowIso);
  const startIdx = hi >= 0 ? hi : 0;
  const hourly = Array.from({ length: 24 }).map((_, i) => {
    const idx = startIdx + i;
    return {
      time: data.hourly.time[idx],
      temp: data.hourly.temperature_2m[idx],
      code: data.hourly.weather_code[idx],
      pop: data.hourly.precipitation_probability?.[idx] ?? 0,
      cond: WMO[data.hourly.weather_code[idx]] || cond,
    };
  });

  const daily = data.daily.time.map((t, i) => ({
    date: t,
    code: data.daily.weather_code[i],
    cond: WMO[data.daily.weather_code[i]] || cond,
    max: data.daily.temperature_2m_max[i],
    min: data.daily.temperature_2m_min[i],
    sunrise: data.daily.sunrise[i],
    sunset: data.daily.sunset[i],
    uv: data.daily.uv_index_max[i],
    pop: data.daily.precipitation_probability_max?.[i] ?? 0,
    wind: data.daily.wind_speed_10m_max?.[i] ?? 0,
  }));

  return {
    units,
    location: { lat, lon },
    timezone: data.timezone,
    current: {
      temp: c.temperature_2m,
      feels: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      isDay,
      code: c.weather_code,
      cond,
      wind: c.wind_speed_10m,
      windDir: c.wind_direction_10m,
      pressure: c.pressure_msl,
      cloud: c.cloud_cover,
      uv: c.uv_index,
      visibility: c.visibility,
      time: c.time,
      sunrise: daily[0]?.sunrise,
      sunset: daily[0]?.sunset,
    },
    hourly,
    daily,
    aqi: aqi
      ? {
          us: aqi.data.current.us_aqi,
          pm25: aqi.data.current.pm2_5,
          pm10: aqi.data.current.pm10,
          o3: aqi.data.current.ozone,
          no2: aqi.data.current.nitrogen_dioxide,
        }
      : null,
  };
}
