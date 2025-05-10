export interface Coordinates{
    lat: number;
    lon: number;
}
// type for Geocoding Response

export interface GeocodingResponse{
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string
}

// type for weather conditions
export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

// type for weather data

export interface WeatherData{
    coord: Coordinates;
    weather: WeatherCondition[];
    main : {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number
    };
    wind: {
        speed: number;
        deg: number;
    };
    sys:{
        sunrise: number;
        sunset: number;
        country: string;
    };
    name: string;
    dt: number;
}

// Type for Forecast
export interface ForecastData{
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherData['weather'];
        wind: WeatherData["wind"];
        dt_txt: string;
    }>;
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    }
}
