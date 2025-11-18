import { useEffect, useState } from "react";
import axios from "axios";
import type { WeatherAPI, WeatherData } from "../types/weather";
import styles from "./Weather.module.scss";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");

  const API_KEY = "89d6c114ec7bbbfd4be0ebc38e323833";
  const KAKAO_KEY = "ca423af37c9fa74dd71cfff0c76f9c36";

  // 시간 표시
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatTime = now.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // 지도 + 날씨
  useEffect(() => {
    // ⭐ 기본 좌표(서울시청)
    const DEFAULT_LAT = 37.5665;
    const DEFAULT_LNG = 126.9780;

    // 지도 그리기 함수
    const loadMap = (lat: number, lng: number) => {
      const mapInit = () => {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById("map") as HTMLElement;

          const mapOption = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
          });

          marker.setMap(map);
        });
      };

      // 이미 카카오맵 로드됨
      if (window.kakao && window.kakao.maps) {
        mapInit();
      } else {
        // 스크립트 없으면 새로 추가
        const script = document.createElement("script");

        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`;

        script.onload = () => mapInit();

        // 중복 방지
        if (!document.querySelector(`script[src*="dapi.kakao.com"]`)) {
          document.body.appendChild(script);
        } else {
          mapInit();
        }
      }
    };

    // 🔥 geolocation 실행
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // 날씨 가져오기
        try {
          const { data } = await axios.get<WeatherAPI>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
          );

          const reData: WeatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          };

          setWeather(reData);
        } catch {
          setError("날씨정보를 불러오지 못했습니다");
        }

        // 지도 로드
        loadMap(latitude, longitude);
      },

      // ❌ geolocation 실패 시 (GitHub Pages에서 대부분 여기로 빠짐)
      async () => {
        console.warn("⚠ 위치 정보를 가져오지 못해 기본 위치(서울)로 표시합니다.");

        // 날씨 기본 위치로 가져오기
        try {
          const { data } = await axios.get<WeatherAPI>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${DEFAULT_LAT}&lon=${DEFAULT_LNG}&appid=${API_KEY}&units=metric&lang=kr`
          );

          const reData: WeatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          };

          setWeather(reData);
        } catch {
          setError("날씨정보를 불러오지 못했습니다");
        }

        // 기본좌표로 지도 표시
        loadMap(DEFAULT_LAT, DEFAULT_LNG);
      },

      { timeout: 3000 }
    );
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!weather) return null;

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
  );
};

export default Weather;
