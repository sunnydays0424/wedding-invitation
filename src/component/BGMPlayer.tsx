import { useState, useEffect, useRef } from "react"
import soundOnIcon from "../icons/sound-on.png"
import soundOffIcon from "../icons/sound-off.png"

// 💡 1. 음원 파일을 직접 import 합니다! (파일이 있는 경로에 맞게 수정)
import bgmFile from "./background-music.mp3" 

export const BGMPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // 💡 2. import한 변수를 오디오 객체에 넣어줍니다.
    audioRef.current = new Audio(bgmFile)
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