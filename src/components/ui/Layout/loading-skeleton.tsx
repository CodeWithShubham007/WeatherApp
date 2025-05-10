import { Skeleton } from "../skeleton";

function WeatherSkeleton(){
    return(
        <div className="space-y-6">
            {/* <Skeleton className="h-[300px w-full rounded-xl" /> */}
            <div className="grid gap-6">
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <div>
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}

export default WeatherSkeleton;