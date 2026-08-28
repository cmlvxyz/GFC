import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Download, RotateCcw, FastForward } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  speaker?: string;
  date?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  speaker,
  date
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error('Audio playback error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  if (!audioUrl) {
    return (
      <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-2xl text-xs text-slate-500 dark:text-[#A1A1A1] border border-slate-200 dark:border-white/10 text-center italic">
        (Walang naka-attach na audio recording sa sermon na ito sa ngayon)
      </div>
    );
  }

  return (
    <div className="bg-slate-900 dark:bg-black/60 text-white p-5 rounded-2xl shadow-xl border border-amber-500/30 dark:border-[#D4AF37]/30 space-y-3">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="min-w-0">
          <div className="text-[10px] text-amber-300 dark:text-[#D4AF37] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
            🎧 Audio Recording ng Sermon
          </div>
          <div className="font-serif font-bold text-sm sm:text-base text-white truncate">{title}</div>
          {speaker && <div className="text-xs text-slate-300 dark:text-[#A1A1A1]">{speaker} {date ? `• ${date}` : ''}</div>}
        </div>

        {/* Speed presets for senior comfort */}
        <div className="flex items-center gap-1 bg-white/10 border border-white/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => changeSpeed(0.8)}
            className={`px-2 py-1 rounded-lg font-bold transition-all ${
              playbackSpeed === 0.8 ? 'bg-[#D4AF37] text-black font-extrabold' : 'text-slate-300 dark:text-[#A1A1A1] hover:text-white'
            }`}
            title="Mabagal para sa madaling pag-unawa (Seniors 0.8x)"
          >
            0.8x (Mabagal)
          </button>
          <button
            onClick={() => changeSpeed(1.0)}
            className={`px-2 py-1 rounded-lg font-bold transition-all ${
              playbackSpeed === 1.0 ? 'bg-[#D4AF37] text-black font-extrabold' : 'text-slate-300 dark:text-[#A1A1A1] hover:text-white'
            }`}
          >
            1x
          </button>
          <button
            onClick={() => changeSpeed(1.2)}
            className={`px-2 py-1 rounded-lg font-bold transition-all ${
              playbackSpeed === 1.2 ? 'bg-[#D4AF37] text-black font-extrabold' : 'text-slate-300 dark:text-[#A1A1A1] hover:text-white'
            }`}
          >
            1.2x
          </button>
        </div>
      </div>

      {/* Scrub Bar */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
        />
        <div className="flex justify-between text-xs text-[#A1A1A1] font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => skipTime(-10)}
            className="p-2 rounded-full hover:bg-white/10 text-[#A1A1A1] hover:text-white transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="I-rewind nang 10 segundo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#D4AF37] hover:brightness-110 text-black font-bold flex items-center justify-center shadow-lg transition-all transform active:scale-95"
            title={isPlaying ? "I-pause" : "I-play ang audio"}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => skipTime(10)}
            className="p-2 rounded-full hover:bg-white/10 text-[#A1A1A1] hover:text-white transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="I-forward nang 10 segundo"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume & Download */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={toggleMute} className="text-[#A1A1A1] hover:text-white">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <a
            href={audioUrl}
            download={`${title.replace(/\s+/g, '_')}_GospelFC.mp3`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-white/10"
            title="I-download ang sermon audio file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">I-download</span>
          </a>
        </div>
      </div>
    </div>
  );
};
