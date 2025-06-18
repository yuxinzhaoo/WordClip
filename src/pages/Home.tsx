import { useRef, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import WordRecorder from "../components/WordRecorder";
import type { WordRecord } from "../types";
import YouTubeWordRecorder from "../components/YouTubeWordRecorder";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 WordClip 学习助手</h1>
      <YouTubeWordRecorder />
    </div>
  );
}
