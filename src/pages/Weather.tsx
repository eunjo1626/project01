import { useEffect, useState } from "react"
import axios from "axios"
import type { WeatherAPI, WeatherData } from "../types/weather"
import styles from "./Weather.module.scss"

const Weather = () => {
  const [ weather, setWeather ] = useState< WeatherData | null>(null)
  const [error, setError] = useState< string | null>(null)
  const [time, setTime] = useState<string>("")
  const API_KEY = "89d6c114ec7bbbfd4be0ebc38e323833"
  const KAKAO_KEY = "afb63d8e7376ee4e9d81fe94b2f2d3e0"

  useEffect( ()=>{
      const updateTime = () =>{
        const now = new Date()
        const formatTime = now.toLocaleString('ko-KR', {
          year:'numeric',
          month : 'long',
          day : 'numeric',
          weekday : 'long',
          hour:'2-digit',
          minute : '2-digit'
        })

        setTime( formatTime)
      }

      updateTime()
      const timer = setInterval( updateTime , 60*1000)

      return () => clearInterval(timer)
  },[]) // 날짜 시간 구하기

    useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    async pos => {
      const { latitude, longitude } = pos.coords;

      // 날씨
      try {
        const { data } = await axios.get<WeatherAPI>(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
        );

        const reData: WeatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          desc: data.weather[0].description
        };

        setWeather(reData);
      } catch {
        setError("날씨정보를 불러오지 못했습니다");
      }

      // 카카오맵 스크립트 로드
      const mapInit = () => {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map') as HTMLElement;
          const mapOption = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(latitude, longitude)
          });

          marker.setMap(map);
        });
      };

      if (window.kakao && window.kakao.maps) {
        mapInit(); // 이미 로드됨
      } else {
        const script = document.createElement("script");
        // script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services`;

        script.onload = () => mapInit();

        // 중복 스크립트 방지
        if (!document.querySelector(`script[src*="kakao"]`)) {
          document.body.appendChild(script);
        } else {
          mapInit();
        }
      }
    },
    err => {
      console.log(err);
      setError("위치정보를 가져올수 없습니다");
    }
  );
}, []);


    if (error) return <p className={styles.error}>{error}</p>
    if(!weather) return null
  
  return (
    <div className={styles.weather}>
      <div className={styles.info}>
        <h2>오늘의 현재 날씨</h2>
        <p>{time}</p>
        <div className={styles.datas}>
            <p>{weather.city}</p>
            <p>{weather.temp}℃</p>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
            <p>{weather.desc}</p>
        </div>
        <div className={styles.circle}></div>
      </div>
      <div id="map" className={styles.map}></div>
    </div>
  )
}

export default Weather