import VideoSlider from "../com/VideoSlider";
import styles from "./Home.module.scss";

const Home = () => {
  let slidess = [
    {
      src: "/mov/spring.mp4",
      title: "Spring",
   
    },
    {
      src: "/mov/summer.mp4",
      title: "Summer",
      
    },
    {
      src: "/mov/autumn.mp4",
      title: "Autumn",
     
    },
    {
      src: "/mov/winter.mp4",
      title: "Winter",
     
    }
  ];
  return (
    <div className={styles.home}>
      <div className={styles.sb}>
        <VideoSlider slides={slidess} />
      </div>
    </div>
  );
};

export default Home;
