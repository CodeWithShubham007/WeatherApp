import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CurrentWeather from "@/components/ui/Layout/CurrentWeather";
import {FavoriteCitie} from "@/components/ui/Layout/Favorite-cities";
import HourlyTemprature from "@/components/ui/Layout/hourly_temp";
import WeatherSkeleton from "@/components/ui/Layout/loading-skeleton";
import WeatherDetails from "@/components/ui/Layout/WeatherDetails";
import WeatherForcast from "@/components/ui/Layout/WeatherForcast";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
    useForecastQuery,
    useReverseGeocodeQuery,
    useWeatherQuery,
} from "@/hooks/use-Weather";
import { AlertTriangle, MapPin, RefreshCcw, RefreshCw } from "lucide-react";

const Dashboard = () => {
    const {
        coordinates,
        error: locationError,
        getLocation,
        isLoading: locationLoading,
    } = useGeolocation();
    // console.log(coordinates);

    // call API to get location name from coordinates
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    // console.log(weatherQuery.data);
    // console.log(forecastQuery.data);
    // console.log(locationQuery.data);

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            // reload weather data
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (locationLoading) {
        return <WeatherSkeleton />;
    }

    // unable to fetch location
    if (locationError) {
        return (
            // <div className="w-full h-screen flex items-center justify-center">
            <Alert
                variant="destructive"
                className="w-[100%] sm:w-[50%] lg:w-[50%] mx-auto"
            >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button
                        onClick={getLocation}
                        variant={"outline"}
                        className="w-fit"
                    >
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
            // </div>
        );
    }

    // unable to find coordinates
    if (!coordinates) {
        return (
            <Alert
                variant="destructive"
                className="w-[100%] sm:w-[50%] lg:w-[50%] mx-auto"
            >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button
                        onClick={getLocation}
                        variant={"outline"}
                        className="w-fit"
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];
    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert
                variant="destructive"
                className="w-[100%] sm:w-[50%] lg:w-[50%] mx-auto"
            >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data, Please try again...</p>
                    <Button
                        onClick={handleRefresh}
                        variant={"outline"}
                        className="w-fit"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    // weather data is loading and forcasr data is loading
    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space-y-4">
            {/* Fav City */}
            <FavoriteCitie />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">
                    My Location
                </h1>
                <Button
                    variant="outline"
                    size={"icon"}
                    onClick={handleRefresh}
                    disabled={
                        weatherQuery.isFetching || forecastQuery.isFetching
                    }
                >
                    <RefreshCw
                        className={`h-6 w-6  ${
                            weatherQuery.isFetching ? "animate-spin" : ""
                        } `}
                    />
                </Button>
            </div>

            {/* Current and Hourly weather */}
            <div className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    <HourlyTemprature data={forecastQuery.data} />
                </div>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForcast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
