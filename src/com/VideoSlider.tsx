import { useEffect, useRef, useState } from "react";
import styles from "./VideoSlider.module.scss";
interface Slide {
  src: string;
  title: string;
  subtitle?: string;
}

interface Props {
  slides: Slide[];
  autoplay?: boolean;
  intervalMs?: number;
}
const VideoSlider: React.FC<Props> = ({
  slides,
  intervalMs = 6000,
  autoplay = true,
}) => {
  let [index, setIndex] = useState(0);
  let timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = window.setInterval(() => {
      setIndex((k) => (k + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, intervalMs, autoplay]);

  let kkk = slides[index];

  return (
    <div className={styles.VideoSlider}>
      <video
        key={kkk.src}
        className={styles.video}
        src={kkk.src}
        autoPlay
        muted
        loop
        playsInline // 모바일로 넘어가면 전체화면으로 강제변환되는데 페이지안에서 플레이되게 해주는 명령
      />
      <div className={styles.overaly} key={index}>
        <h2 className={styles.title}>{kkk.title}</h2>
        <p className={styles.subtitle}>{kkk.subtitle}</p>
      </div>
    </div>
  );
};

export default VideoSlider;
