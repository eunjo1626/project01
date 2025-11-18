import VideoSlider from "../com/VideoSlider";
import styles from "./Home.module.scss";
import spring from "../assets/mov/spring.mp4";
import summer from "../assets/mov/summer.mp4";
import autumn from "../assets/mov/autumn.mp4";
import winter from "../assets/mov/winter.mp4";


const Home = () => {
  let slidess = [
    {
      src: spring,
      title: "Spring",
   
    },
    {
      src: summer,
      title: "Summer",
      
    },
    {
      src: autumn,
      title: "Autumn",
     
    },
    {
      src: winter,
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
