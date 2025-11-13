import VideoSlider from "../com/VideoSlider";
import styles from "./Home.module.scss";

const Home = () => {
  let slidess = [
    {
      src: import.meta.env.BASE_URL +"mov/spring.mp4",
      title: "Spring",
   
    },
    {
      src: import.meta.env.BASE_URL +"mov/summer.mp4",
      title: "Summer",
      
    },
    {
      src: import.meta.env.BASE_URL +"mov/autumn.mp4",
      title: "Autumn",
     
    },
    {
      src: import.meta.env.BASE_URL + "mov/winter.mp4",
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
