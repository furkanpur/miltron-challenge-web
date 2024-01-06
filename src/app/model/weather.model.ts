export interface WeatherDataModel {
  "temperature": number;
  "humidity": number;
  "pressure": number;
  "precipitation": {
    "probability": number;
    "rain": boolean;
    "snow": boolean;
    "sleet": boolean;
    "hail": boolean;
  },
  "time": string;
  "wind": {
    "direction": string;
    "angle": number;
    "speed": number;
  }
}
