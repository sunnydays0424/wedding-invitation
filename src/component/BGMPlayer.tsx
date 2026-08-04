import { useState, useEffect, useRef } from "react"
import soundOnIcon from "../icons/sound-on.png"
import soundOffIcon from "../icons/sound-off.png"
import bgmFile from "./background-music.mp3" 

export const BGMPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasInteracted = useRef<boolean>(false) // 중복 실행 방지용

  useEffect(() => {
    // 오디오 객체 생성
    audioRef.current = new Audio(bgmFile)
    audioRef.current.loop = true

    // 사용자의 첫 번째 터치/클릭/스크롤을 감지하는 함수
    const handleFirstInteraction = () => {
      if (hasInteracted.current || !audioRef.current) return

      audioRef.current.play().then(() => {
        setIsPlaying(true)
        hasInteracted.current = true // 한 번 재생되면 이벤트 리스너 해제 준비
        
        // 이벤트를 성공적으로 실행했으므로 리스너 제거
        window.removeEventListener("pointerdown", handleFirstInteraction)
        window.removeEventListener("keydown", handleFirstInteraction)
        window.removeEventListener("scroll", handleFirstInteraction)
      }).catch((error) => {
        console.log("자동 재생 대기 중...", error)
      })
    }

    // 화면 아무 곳이나 터치/클릭, 키보드 입력, 스크롤할 때 감지
    window.addEventListener("pointerdown", handleFirstInteraction)
    window.addEventListener("keydown", handleFirstInteraction)
    window.addEventListener("scroll", handleFirstInteraction)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      // 컴포넌트가 사라질 때 이벤트 정리
      window.removeEventListener("pointerdown", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
      window.removeEventListener("scroll", handleFirstInteraction)
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
        hasInteracted.current = true
      }).catch((error) => {
        console.log("재생 에러:", error)
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