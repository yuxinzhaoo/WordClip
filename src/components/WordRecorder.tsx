import { useState } from "react";

type Props = {
  onRecord: (word: string) => void;
};

export default function WordRecorder({ onRecord }: Props) {
  const [word, setWord] = useState("");

  return (
    <div className="space-y-2">
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter word..."
        className="border p-2 rounded w-full"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          if (word) {
            onRecord(word);
            setWord("");
          }
        }}
      >
        Record Word at Current Time
      </button>
    </div>
  );
}
