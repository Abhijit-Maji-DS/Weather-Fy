export function getWeatherTheme(conditionId, isNight) {
  if (isNight) return 'night';
  if (conditionId >= 200 && conditionId < 300) return 'thunderstorm';
  if (conditionId >= 300 && conditionId < 600) return 'rainy';
  if (conditionId >= 600 && conditionId < 700) return 'snow';
  if (conditionId >= 700 && conditionId < 800) return 'mist';
  if (conditionId === 800) return 'sunny';
  if (conditionId > 800) return 'cloudy';
  return 'sunny';
}

export function isNightTime(dt, sunrise, sunset) {
  return dt < sunrise || dt > sunset;
}

// Apple Weather-style gradient configs (CSS gradient strings)
export function getThemeGradient(theme, isDark) {
  const gradients = {
    sunny: {
      light: 'linear-gradient(180deg, #4A90D9 0%, #74B9FF 30%, #A8D8EA 60%, #E8F4FD 100%)',
      dark: 'linear-gradient(180deg, #1a3a5c 0%, #2d5a87 30%, #1e3f66 60%, #0f2439 100%)',
    },
    cloudy: {
      light: 'linear-gradient(180deg, #6B8CAE 0%, #8BA4BE 30%, #A8B8C8 60%, #C5D0DA 100%)',
      dark: 'linear-gradient(180deg, #2a3a4a 0%, #3a4d5e 30%, #2d3f50 60%, #1a2a3a 100%)',
    },
    rainy: {
      light: 'linear-gradient(180deg, #4A6072 0%, #5E7A8C 30%, #7A96A8 60%, #8FAAB8 100%)',
      dark: 'linear-gradient(180deg, #1a2530 0%, #253545 30%, #1e2d3d 60%, #0f1a25 100%)',
    },
    night: {
      light: 'linear-gradient(180deg, #1B2838 0%, #2C3E6B 30%, #4A3F8A 60%, #6B4E9B 100%)',
      dark: 'linear-gradient(180deg, #0a0f1a 0%, #141e3a 30%, #1e1845 60%, #2a1f4a 100%)',
    },
    snow: {
      light: 'linear-gradient(180deg, #7B9CB8 0%, #9BB5CC 30%, #B8CDE0 60%, #D5E5F0 100%)',
      dark: 'linear-gradient(180deg, #2a3545 0%, #3a4a5a 30%, #2d3f50 60%, #1a2a38 100%)',
    },
    thunderstorm: {
      light: 'linear-gradient(180deg, #3A3A5C 0%, #4E4E72 30%, #5A5A7F 60%, #6E6E8F 100%)',
      dark: 'linear-gradient(180deg, #0f0f1e 0%, #1a1a30 30%, #151528 60%, #0a0a18 100%)',
    },
    mist: {
      light: 'linear-gradient(180deg, #7A8A9A 0%, #95A5B5 30%, #AAB8C5 60%, #C0CCD5 100%)',
      dark: 'linear-gradient(180deg, #252d35 0%, #353f48 30%, #2d363f 60%, #1a2028 100%)',
    },
  };
  const g = gradients[theme] || gradients.sunny;
  return isDark ? g.dark : g.light;
}

export function processHourlyForecast(forecast) {
  return forecast.list.slice(0, 8).map((item) => ({
    time: formatTime(item.dt, forecast.city.timezone),
    temp: Math.round(item.main.temp),
    condition: item.weather[0],
    pop: item.pop,
  }));
}

export function processDailyForecast(forecast) {
  const dailyMap = new Map();

  forecast.list.forEach((item) => {
    const date = new Date((item.dt + forecast.city.timezone) * 1000);
    const key = date.toISOString().split('T')[0];
    if (!dailyMap.has(key)) dailyMap.set(key, []);
    dailyMap.get(key).push(item);
  });

  const days = [];
  dailyMap.forEach((items, dateKey) => {
    const temps = items.map((i) => i.main.temp);
    const date = new Date(dateKey);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    days.push({
      date: dateKey,
      dayName: days.length === 0 ? 'Today' : dayNames[date.getUTCDay()],
      tempMin: Math.round(Math.min(...temps)),
      tempMax: Math.round(Math.max(...temps)),
      condition: getMostFrequentCondition(items.map((i) => i.weather[0])),
      humidity: Math.round(items.reduce((a, b) => a + b.main.humidity, 0) / items.length),
      wind: Math.round(items.reduce((a, b) => a + b.wind.speed, 0) / items.length),
      pop: Math.max(...items.map((i) => i.pop)),
    });
  });

  return days.slice(0, 7);
}

function getMostFrequentCondition(conditions) {
  const freq = new Map();
  conditions.forEach((c) => {
    const existing = freq.get(c.id);
    if (existing) existing.count++;
    else freq.set(c.id, { count: 1, condition: c });
  });
  let max = { count: 0, condition: conditions[0] };
  freq.forEach((v) => { if (v.count > max.count) max = v; });
  return max.condition;
}

function formatTime(dt, timezone) {
  const date = new Date((dt + timezone) * 1000);
  const hours = date.getUTCHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h} ${ampm}`;
}

export function formatTemp(temp, unit) {
  if (unit === 'fahrenheit') return `${Math.round(temp * 9 / 5 + 32)}\u00b0`;
  return `${Math.round(temp)}\u00b0`;
}

export function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export function getWeatherIcon(conditionId, isNight) {
  if (isNight && conditionId === 800) return { icon: '\u{1F319}', label: 'Clear Night' };
  if (conditionId >= 200 && conditionId < 300) return { icon: '\u26C8\uFE0F', label: 'Thunderstorm' };
  if (conditionId >= 300 && conditionId < 400) return { icon: '\u{1F326}\uFE0F', label: 'Drizzle' };
  if (conditionId >= 500 && conditionId < 600) return { icon: '\u{1F327}\uFE0F', label: 'Rain' };
  if (conditionId >= 600 && conditionId < 700) return { icon: '\u2744\uFE0F', label: 'Snow' };
  if (conditionId >= 700 && conditionId < 800) return { icon: '\u{1F32B}\uFE0F', label: 'Mist' };
  if (conditionId === 800) return { icon: '\u2600\uFE0F', label: 'Clear' };
  if (conditionId === 801) return { icon: '\u{1F324}\uFE0F', label: 'Partly Cloudy' };
  if (conditionId === 802) return { icon: '\u26C5', label: 'Cloudy' };
  return { icon: '\u2601\uFE0F', label: 'Overcast' };
}
