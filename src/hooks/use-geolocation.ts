import type { Coordinates } from "@/Api/types";
import { useEffect, useState } from "react";

interface GeolocationState{
    coordinates: Coordinates | null
    error: string | null;
    isLoading: boolean
}


export function useGeolocation(){
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error:  null,
        isLoading: true
    })

    const getLocation = () => {
        setLocationData((prev) => ({...prev, isLoading: true, error: null}));

        // handle error location not found
        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false
            })
            return
        }

        navigator.geolocation.getCurrentPosition((position) =>{
            setLocationData({
                coordinates : {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                error: null,
                isLoading: false
            })
        }, (err)=> {
            let errorMessage : string;
            switch(err.code){
                case err.PERMISSION_DENIED:
                    errorMessage = "Location Premission denied. Please Enale location access."
                    break;
                case err.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable."
                    break;
                case err.TIMEOUT:
                    errorMessage = "Location request Timeout."
                    break;
                default:
                    errorMessage= "An Unknown error occurred;"
            }
            setLocationData({
                coordinates : null,
                error: errorMessage,
                isLoading: false
            });
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

    useEffect(() => {
        getLocation();
    }, [])
    return {
        ...locationData, getLocation
    }
}