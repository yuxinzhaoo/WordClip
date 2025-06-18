import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

type Props = {
  videoId: string;
  onPlayerReady: (player: any) => void;
};

export default function VideoPlayer({ videoId, onPlayerReady }: Props) {
  return (
    <YouTube
      videoId={videoId}
      opts={{ height: "390", width: "640", playerVars: { autoplay: 0 } }}
      onReady={(event) => onPlayerReady(event.target)}
    />
  );
}
