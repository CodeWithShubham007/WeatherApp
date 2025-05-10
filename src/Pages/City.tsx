import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CurrentWeather from "@/components/ui/Layout/CurrentWeather";
import { FavoriteButton } from "@/components/ui/Layout/Favorite-Button";
import HourlyTemprature from "@/components/ui/Layout/hourly_temp";
import WeatherSkeleton from "@/components/ui/Layout/loading-skeleton";
import WeatherDetails from "@/components/ui/Layout/WeatherDetails";
import WeatherForcast from "@/components/ui/Layout/WeatherForcast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-Weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const City = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  // console.log(params);
  
  const coordinates = {lat, lon};
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
        <Alert variant="destructive" className="w-[100%] sm:w-[50%] lg:w-[50%] mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                
            </AlertDescription>
        </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }


  return (
    <div className="space-y-4">
    {/* Fav City */}
    <div className="flex items-center justify-between">
        <h1 className="text-3xl text-center font-bold tracking-tight">
            {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        {/* favorite button */}
        <FavoriteButton data={{...weatherQuery.data, name:params.cityName}} />
    </div>

    {/* Current and Hourly weather */}
    <div className="grid gap-6">
        <div className="flex flex-col gap-4">
            <CurrentWeather data={weatherQuery.data} />
            <HourlyTemprature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
            <WeatherDetails data={weatherQuery.data} />
            <WeatherForcast data={forecastQuery.data} />
        </div>
    </div>
</div>
  )
}

export default City
