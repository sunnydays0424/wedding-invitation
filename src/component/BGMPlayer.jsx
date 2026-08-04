import { useState, useEffect, useRef } from "react"
// 필요한 아이콘 이미지나 폰트어썸 등을 임포트하세요 (예시용 경로)
import soundOnIcon from "../icons/sound-on.png"
import soundOffIcon from "../icons/sound-off.png"

const baseUrl = import.meta.env.BASE_URL

export const BGMPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  // 오디오 객체를 useRef로 관리하여 컴포넌트가 리렌더링되어도 유지되도록 합니다.
  const audioRef = useRef(null)

  useEffect(() => {
    // public 폴더에 넣은 음악 파일 경로
    audioRef.current = new Audio(baseUrl + "background-music.mp3")
    audioRef.current.loop = true // 무한 반복 재생

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("자동 재생이 차단되었거나 에러가 발생했습니다:", error)
      })
    }
  }

  return (
    <div className="bgm-player-container" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 999 }}>
      <button 
        onClick={togglePlay}
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          border: "1px solid #ddd",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}
      >
        <img 
          src={isPlaying ? soundOnIcon : soundOffIcon} 
          alt="BGM Toggle" 
          style={{ width: "24px", height: "24px" }}
        />
      </button>
    </div>
  )
}