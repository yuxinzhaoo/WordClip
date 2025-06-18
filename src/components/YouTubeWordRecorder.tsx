import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

type WordRecord = {
  word: string;
  time: number;
};

function extractVideoId(url: string): string | null {
  const regex = /(?:\?v=|\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function YouTubeWordRecorder() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [word, setWord] = useState("");
  const [records, setRecords] = useState<WordRecord[]>([]);
  const playerRef = useRef<any>(null);

  const handleLoadVideo = () => {
    const id = extractVideoId(videoUrl);
    if (id) {
      setVideoId(id);
    } else {
      alert("无效的 YouTube 链接");
    }
  };

  const handleRecord = () => {
    const currentTime = playerRef.current?.getCurrentTime?.() || 0;
    if (word) {
      setRecords([...records, { word, time: Math.floor(currentTime) }]);
      setWord("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="输入 YouTube 视频链接"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleLoadVideo}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          加载视频
        </button>
      </div>

      {videoId && (
        <>
          <YouTube
            videoId={videoId}
            opts={{ height: "390", width: "640", playerVars: { autoplay: 0 } }}
            onReady={(event) => (playerRef.current = event.target)}
          />

          <div className="flex space-x-2 mt-4">
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="输入单词..."
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleRecord}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              记录单词
            </button>
          </div>
        </>
      )}

      {records.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">📋 已记录：</h2>
          <ul className="mt-2 space-y-1">
            {records.map((r, i) => (
              <li key={i}>
                • <strong>{r.word}</strong> @ {r.time}s
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
