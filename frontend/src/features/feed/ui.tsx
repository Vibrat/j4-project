import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Video } from "@/services/video";
import React from "react";

export type VideoProps = {
  data: Video;
};

export const YoutubeVideo: React.FC<any> = ({ url }) => (
  <div className="video-responsive">
    <iframe
      className="w-full aspect-video"
      src={url}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export const VideoContainer: React.FC<VideoProps> = ({ data }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-start space-x-4 space-y-4">
      <div className="w-full lg:w-[400px]">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <YoutubeVideo url={data.url} />
        </AspectRatio>
      </div>
      <div className="space-y-4 flex-1">
        <div className="text-xl font-semibold">{data.title}</div>
        <div className="text-sm font-light">Shared By: {data.email}</div>
        <div className="text-sm font-semibold">Description:</div>
        <div className="text-sm font-normal text-wrap overflow-hidden w-full md:w-2/3 max-h-[120px]">
          {data.description}
        </div>
      </div>
    </div>
  );
};
