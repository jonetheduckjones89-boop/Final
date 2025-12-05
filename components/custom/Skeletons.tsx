
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ResultsSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {/* Top Actions Skeleton */}
                <Card>
                    <CardHeader className="pb-3">
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Skeleton className="h-2 w-2 rounded-full mt-2" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                    <Skeleton className="h-3 w-full" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Summary Skeleton */}
                <Card>
                    <CardHeader className="pb-3 flex flex-row justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-8 w-20" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                {/* Chat Skeleton */}
                <Card className="h-[500px]">
                    <CardHeader>
                        <Skeleton className="h-5 w-40" />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-end h-[400px] space-y-4">
                        <Skeleton className="h-10 w-3/4 self-end rounded-2xl" />
                        <Skeleton className="h-16 w-3/4 rounded-2xl" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
