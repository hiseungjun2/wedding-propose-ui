import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import data from '@/config/data.json';
import MotionDiv from '@/components/MotionDiv';
import MotionButton from '@/components/MotionButton';
import CherryBlossoms from '@/components/CherryBlossoms';

const ProposeView = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    if (step < data.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setIsStarted(false);
    setStep(0);
    setIsFinished(false);
  };

  return (
    <div className="vw-100 d-flex align-items-center justify-content-center px-3" style={{ height: '100dvh', overflow: 'hidden', backgroundColor: '#fff5f7', position: 'fixed', top: 0, left: 0 }}>
      <CherryBlossoms count={40} />

      {isFinished && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1050, pointerEvents: 'none' }}>
          <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} recycle={false} />
        </div>
      )}

      <MotionDiv
        type="cardIn"
        className="card shadow-lg border-0 text-center"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '25px',
          minHeight: '400px',
          zIndex: 1060,
          padding: '2rem 1.5rem'
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center w-100 h-100">
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <MotionDiv key="intro" type="fadeUp" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <h1 className="display-6 fw-bold text-dark mb-5" style={{ lineHeight: '1.4' }}>
                  사랑하는<br />하영이에게
                </h1>
                <MotionButton
                  className="btn-danger btn-lg px-5 py-3 shadow"
                  onClick={() => setIsStarted(true)}
                >
                  열어보기 💌
                </MotionButton>
              </MotionDiv>
            ) : !isFinished ? (
              <MotionDiv key={`step-${step}`} type="fadeRight" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <h2 className={`card-title mb-4 fw-bold ${data[step].color}`} style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>
                  {data[step].text}
                </h2>

                <MotionButton
                  className="btn-danger btn-lg w-100 py-3 shadow-sm"
                  style={{ minWidth: '280px' }}
                  onClick={next}
                >
                  {data[step].btn}
                </MotionButton>
              </MotionDiv>
            ) : (
              <MotionDiv key="result" type="zoomIn" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <h1 className="display-1 mb-4">💍</h1>
                <h2 className="fw-bold text-danger mb-3">Yes! I Do!</h2>
                <p className="text-muted mb-4">우리 예쁘게 잘 살자 ❤️</p>
                <MotionButton
                  className="btn-outline-secondary btn-sm py-2"
                  style={{ width: 'fit-content', minWidth: '100px' }}
                  onClick={reset}
                >
                  처음으로
                </MotionButton>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </MotionDiv>
    </div>
  );
};

export default ProposeView;