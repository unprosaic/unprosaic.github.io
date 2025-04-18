import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "./ui/slider";

interface MusicPlayerProps {
  audioSrc?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]); // Start with volume set to 50%
  const [songs, setSongs] = useState<string[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Load songs from the public/music directory
    fetch("/api/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error loading songs:", error));

    // Set audio volume based on initialized state when audio element is created
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100; // Apply initial volume
      audioRef.current.muted = false; // Ensure the audio is not muted
      if (volume[0] > 0 && isPlaying) {
        audioRef.current.play(); // Start playing if the player is set to play
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
      audioRef.current.muted = value[0] === 0; // Mute if volume is set to 0
    }
  };

  const skipSong = (direction: "next" | "prev") => {
    let newIndex =
      direction === "next"
        ? (currentSongIndex + 1) % songs.length
        : (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);

    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        src={songs[currentSongIndex]}
        onEnded={() => skipSong("next")}
      />
      <Button variant="ghost" size="icon" onClick={() => skipSong("prev")}>
        <SkipBack />
      </Button>
      <Button variant="ghost" size="icon" onClick={togglePlay}>
        {!isPlaying ? <VolumeX /> : <Volume2 />}
      </Button>
      <Button variant="ghost" size="icon" onClick={() => skipSong("next")}>
        <SkipForward />
      </Button>
      <div className="w-24">
        <Slider
          value={volume}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
