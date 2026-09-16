import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { IMG_PREDSHKOLA_5_7_MAIN, VIDEO_DIAGNOSTICS_DEMO } from "./constants";
import { ymGoal } from "@/lib/ym";

// ── DiagnosticsVideoBlock — видео «Вот как выглядит диагностика» (секция #5-7) ─
export default function DiagnosticsVideoBlock() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    ymGoal("click_diagnostics_video");
    videoRef.current?.play();
  };

  return (
    <div className="diag-video-block">
      <span className="age-overline">посмотрите своими глазами</span>
      <h3 className="diag-video-title">Вот как выглядит диагностика</h3>

      <div className="diag-video-player">
        <video
          ref={videoRef}
          src={VIDEO_DIAGNOSTICS_DEMO || undefined}
          poster={IMG_PREDSHKOLA_5_7_MAIN}
          preload="none"
          controls={playing}
          playsInline
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button className="diag-video-play-btn" onClick={handlePlay} aria-label="Смотреть видео">
            <Icon name="Play" size={26} fill="currentColor" />
          </button>
        )}
      </div>

      <p className="diag-video-caption">
        Так выглядит занятие с Ириной Павловной. Диагностика проходит так же: один на один, с игрой и карточками
      </p>
    </div>
  );
}
