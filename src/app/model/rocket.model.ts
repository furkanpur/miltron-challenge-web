export interface RocketDataModel {
  "id": string;
  "model": string;
  "mass": number;
  "payload": {
    "description": string;
    "weight": number;
  };
  "telemetry": {
    "host": string;
    "port": number;
  };
  "status": string;
  "timestamps": {
    "launched": null;
    "deployed": null;
    "failed": null;
    "cancelled": null
  };
  "altitude": number;
  "speed": number;
  "acceleration": number;
  "thrust": number;
  "temperature": number;
}
