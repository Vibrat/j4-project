"use client";
import { useToast } from "@/components/ui/use-toast";
import { VideoContainer, YoutubeVideo } from "@/features/feed/ui";
import { useGetMessagesQuery } from "@/services/notification";
import { useGetVideosQuery } from "@/services/video";
import { useEffect } from "react";

export default function Home() {
  const { toast } = useToast();
  const {
    data: videos
  } = useGetVideosQuery({
    skip: 0,
    limit: 10,
  }, {     
    pollingInterval: 15000,
  });
  const { data: notification } = useGetMessagesQuery(undefined, {});
  useEffect(() => {
    if (notification) {
      toast({
        title: notification.title,
        description: (
          <div className="space-y-2">
            <div>{notification.description}</div>
            <div>
              <YoutubeVideo url={notification.url} />
            </div>
          </div>
        ),
      });
    }
  }, [notification]);
  return (
    <main className="flex flex-col items-start space-y-8 min-h-screen p-0 lg:p-24 my-4">
      {videos?.map((video) => (
        <VideoContainer key={video.id} data={video} />
      ))}
    </main>
  );
}
