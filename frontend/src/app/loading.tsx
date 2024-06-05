import { Skeleton } from "@/components/ui/skeleton"

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center space-x-4 h-screen w-screen">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}

export default LoadingScreen