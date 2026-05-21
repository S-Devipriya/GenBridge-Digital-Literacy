import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/video/$id")({
  head: () => ({ meta: [{ title: "Video — GenBridge" }] }),
  component: VideoPlayer,
});

const VIDEOS: Record<string, { title: string; src: string; desc: string }> = {
  welcome: {
    title: "Welcome to GenBridge",
    src: "/welcome.mp4",
    desc: "A short welcome video showing how to navigate our website.",
  },
};

function VideoPlayer() {
  const { id } = Route.useParams();
  const video = VIDEOS[id] ?? VIDEOS.welcome;
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  }
  function toggleMute() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }
  function changeRate(r: number) {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = r;
    setRate(r);
  }
  function seek(pct: number) {
    const v = ref.current;
    if (!v || !duration) return;
    v.currentTime = (pct / 100) * duration;
    setProgress(pct);
  }
  function fullscreen() {
    const v = ref.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  }
  function fmt(s: number) {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  return (
    <>
      <section className="unified-panel video-player-panel">
        <h2 className="course-side-heading">{video.title}</h2>
        <p className="course-side-meta">{video.desc}</p>
        <div className="video-stage">
          <video
            ref={ref}
            src={video.src}
            className="video-element"
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
            }}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            playsInline
          />
          <div className="video-controls">
            <button type="button" className="video-ctrl-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? "⏸" : "▶"}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="video-progress-bar"
              aria-label="Seek"
            />
            <span className="video-time-label">
              {fmt(ref.current?.currentTime ?? 0)} / {fmt(duration)}
            </span>
            <button type="button" className="video-ctrl-btn" onClick={toggleMute} aria-label="Mute">
              {muted ? "🔇" : "🔊"}
            </button>
            <select
              className="video-rate-select"
              value={rate}
              onChange={(e) => changeRate(Number(e.target.value))}
              aria-label="Playback speed"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>
            <button type="button" className="video-ctrl-btn" onClick={fullscreen} aria-label="Fullscreen">
              ⛶
            </button>
          </div>
        </div>
      </section>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}