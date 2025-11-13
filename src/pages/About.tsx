
import styles from './About.module.scss'


const About = () => {
  return (
      <div className={styles['about-container']}>
      <section className={styles['about-hero']}>
        <h1>About OnGi</h1>
        <p>사계절의 온기를 담은 감성 라이프스타일 스토어</p>
      </section>

      <section className={styles['about-content']}>
        <h2 className={styles.typing} style={{animationDelay:"1s"}}>우리의 이야기</h2>
        <p className={styles.fadeIn} style={{animationDelay:"2s"}}>
          OnGi는 계절이 바뀌는 순간마다 필요한 아이템들을 감각적으로 제안하는 브랜드입니다.<br />
          봄의 바람, 여름의 비, 가을의 공기, 겨울의 온기처럼 <br />
          일상 속 사계절을 담아내는 따뜻한 경험을 전합니다.
        </p>

        <h2 className={styles.typing} style={{animationDelay:"3s"}}>우리의 철학</h2>
        <p className={styles.fadeIn} style={{animationDelay:"4s"}}>
          우리는 단순히 상품을 판매하지 않습니다.<br />
          계절의 변화 속에서 느껴지는 감정과 분위기를 함께 나누고자 합니다.<br />
          당신의 하루에 어울리는 계절의 색을 더하는 것이 OnGi의 역할입니다.
        </p>

        <h2 className={styles.typing} style={{animationDelay:"5s"}}>Contact</h2>
        <p className={styles.fadeIn} style={{animationDelay:"6s"}}>문의: contact@ongi.co.kr</p>
      </section>
    </div>
    
  );
};

export default About;