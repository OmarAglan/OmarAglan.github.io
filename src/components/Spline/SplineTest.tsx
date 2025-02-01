import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import './SplineTest.css';

export default function SplineTest() {
  const [isLoadingFS, setIsLoadingFS] = useState(true);
  const [isLoadingGD, setIsLoadingGD] = useState(true);

  return (
    <div className="project-buttons">
      <div className="project-button fullstack">
        <div className="spline-wrapper">
          {isLoadingFS && <div className="loading">Loading...</div>}
          <Spline
            onLoad={() => setIsLoadingFS(false)}
            scene="https://prod.spline.design/GGgJkmPOcJ99js-X/scene.splinecode"
          />
        </div>
        <span>Full Stack</span>
      </div>

      <div className="project-button gamedev">
        <div className="spline-wrapper">
          {isLoadingGD && <div className="loading">Loading...</div>}
          <Spline
            onLoad={() => setIsLoadingGD(false)}
            scene="https://prod.spline.design/GGgJkmPOcJ99js-X/scene.splinecode"
          />
        </div>
        <span>Game Dev</span>
      </div>
    </div>
  );
}
