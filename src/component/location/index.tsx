import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            [2호선/수인분당선] <b>선릉역 5번출구</b> 도보 5분
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            ① <b>KT 강남지사</b> 하차
            <br />
            → <span style={{ color: "blue" }}>간선(파랑)</span>: 141(도봉산), 242(중랑, 신내역),
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;361(여의도)
            <br />
            ② <b>한국기술센터, 상록회관</b> 하차
            <br />
            → 간선(파랑): 146(상계동), 341(하남),
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;360(송파), 740(덕은동)
            <br />
            → 직행버스(빨강): 1100(차산리), 2000(진벌리), 
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;1700(연대농장입구, 도곡리), 7007(광릉내), 
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;9303(하남)
            <br />
            → 급행버스(빨강): 8001(대성리)
            <br />
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            ① 네비게이션 이용시
            <br />
            : <b> "서울상록회관" 또는 "서울시 강남구 언주로 
            <br />
            &nbsp;&nbsp;508"</b> 입력
            <br />
            ② 경부고속도로
            <br />
            : 양재IC 진입하시어 양재대로에서 매봉터널,
            <br />
            &nbsp;&nbsp;강남세브란스병원 방면으로 진입하여 직집
            <br />
          </div>
          <div />
          <div className="content">
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
