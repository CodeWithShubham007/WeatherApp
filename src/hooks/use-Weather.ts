import { Coordinates } from "@/Api/types";
import { weatherAPI } from "@/Api/Weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ['weather', coords] as const,
    Forecast: (coords: Coordinates) => ['Forecast', coords] as const,
    location: (coords: Coordinates) => ['location', coords] as const,
    search: (query: string) => ['location-search', query] as const,
} as const

// API call for weather
export function useWeatherQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ?weatherAPI.getCurrentWeather(coordinates) : null, enabled: !!coordinates,
    })
}

// API call for Forecast
export function useForecastQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.Forecast(coordinates ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ?weatherAPI.getForecast(coordinates) : null, enabled: !!coordinates,
    })
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ?weatherAPI.reverseGeocode(coordinates) : null, enabled: !!coordinates,
    })
}

export function useLocationSearch(query: string){
    return useQuery({ queryKey: WEATHER_KEYS.search(query), queryFn: () => weatherAPI.searchLocations(query), enabled: query.length >= 3})

}