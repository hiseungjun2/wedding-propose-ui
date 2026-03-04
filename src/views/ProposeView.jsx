import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import data from '@/config/data.json';
import MotionDiv from '@/components/MotionDiv';
import MotionButton from '@/components/MotionButton';
import CherryBlossoms from '@/components/CherryBlossoms';
import ImageModal from '@/components/ImageModal';
import '@/assets/styles/ProposeView.css';

const ProposeView = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const reset = () => {
    setIsStarted(false);
    setStep(0);
    setIsFinished(false);
  };

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  // 마지막 단계인지 확인
  const isLastStep = step === data.length - 1;

  return (
    <div className="vw-100 d-flex align-items-center justify-content-center px-3" style={{ height: '100dvh', overflow: 'hidden', backgroundColor: '#fff5f7', position: 'fixed', top: 0, left: 0 }}>
      <CherryBlossoms count={40} />
      
      <ImageModal 
        isOpen={isModalOpen} 
        imageSrc={selectedImage} 
        onClose={() => setIsModalOpen(false)} 
      />

      {isFinished && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1050, pointerEvents: 'none' }}>
          <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} recycle={false} />
        </div>
      )}

      {/* 내비게이션 화살표: 시작되었고 마지막 단계가 아닐 때만 노출 */}
      {isStarted && !isFinished && !isLastStep && (
        <>
          <button 
            className="nav-arrow left" 
            onClick={prev} 
            disabled={step === 0}
            aria-label="Previous"
          >
            ❮
          </button>
          <button 
            className="nav-arrow right" 
            onClick={next}
            aria-label="Next"
          >
            ❯
          </button>
        </>
      )}

      {/* 마지막 단계에서만 이전으로 돌아가기 위한 왼쪽 화살표 노출 (선택 사항) */}
      {isStarted && !isFinished && isLastStep && (
        <button 
          className="nav-arrow left" 
          onClick={prev} 
          aria-label="Previous"
        >
          ❮
        </button>
      )}

      <MotionDiv
        type="cardIn"
        className="card shadow-lg border-0 text-center"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '25px',
          minHeight: '450px', // 조금 더 여유있게 조정
          height: 'auto',      // 내용에 따라 늘어나도록
          maxHeight: '90vh',   // 화면을 넘지 않도록
          zIndex: 1060,
          padding: '1.5rem 1.2rem',
          overflowY: 'auto'    // 내용이 많으면 스크롤 생성
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center w-100 py-2">
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <MotionDiv key="intro" type="fadeUp" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <h1 className="display-6 fw-bold text-charcoal mb-5" style={{ lineHeight: '1.5', wordBreak: 'keep-all' }}>
                  사랑하는<br /><span className="text-rose">하영이</span>에게
                </h1>
                <MotionButton
                  className="btn-primary-rose btn px-5 py-3 shadow"
                  onClick={() => setIsStarted(true)}
                >
                  열어보기 💌
                </MotionButton>
              </MotionDiv>
            ) : !isFinished ? (
              <MotionDiv key={`step-${step}`} type="fadeRight" className="d-flex flex-column align-items-center justify-content-center w-100">
                {/* 단일 이미지 처리: 가장 안정적인 기본 div 구조로 복구 */}
                {data[step].image && (
                  <div 
                    className="mb-4 overflow-hidden shadow-sm" 
                    style={{ 
                      borderRadius: '15px', 
                      width: '100%', 
                      maxWidth: '320px', // 너무 커지지 않게 제한
                      cursor: 'zoom-in' 
                    }}
                    onClick={() => openModal(data[step].image)}
                  >
                    <img 
                      src={data[step].image} 
                      alt="step" 
                      className="w-100"
                      style={{ height: 'auto', display: 'block' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* 다중 이미지(그리드) 처리 */}
                {data[step].images && data[step].images.length > 0 && (
                  <div className="row g-2 mb-4 w-100 justify-content-center">
                    {data[step].images.map((imgSrc, idx) => (
                      <div key={idx} className="col-6">
                        <div 
                          className="overflow-hidden shadow-sm" 
                          style={{ borderRadius: '12px', aspectRatio: '1/1', cursor: 'zoom-in' }}
                          onClick={() => openModal(imgSrc)}
                        >
                          <img 
                            src={imgSrc} 
                            alt={`step-image-${idx}`} 
                            className="w-100 h-100 object-fit-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <h2 className={`card-title mb-0 fw-bold text-center ${data[step].color}`} style={{ fontSize: '1.1rem', lineHeight: '1.6', wordBreak: 'keep-all', whiteSpace: 'pre-wrap', width: '100%' }}>
                  {data[step].text}
                </h2>
                
                {/* 마지막 단계일 때만 중앙 버튼 노출 */}
                {isLastStep && (
                  <MotionButton
                    className="btn-primary-rose btn px-5 py-3 shadow-sm mt-3"
                    style={{ width: 'fit-content', minWidth: '150px', borderRadius: '15px' }}
                    onClick={next}
                  >
                    {data[step].btn || 'YES! ❤️'}
                  </MotionButton>
                )}
              </MotionDiv>
            ) : (
              <MotionDiv key="result" type="zoomIn" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <h1 className="display-1 mb-4">💍</h1>
                <h2 className="fw-bold text-rose mb-3" style={{ fontSize: '2rem' }}>Yes! I Do!</h2>
                <p className="text-muted mb-5" style={{ fontSize: '1.1rem' }}>우리 예쁘게 잘 살자 ❤️</p>
                <MotionButton
                  className="btn-outline-secondary btn-sm py-2 px-4"
                  style={{ width: 'fit-content', borderRadius: '10px' }}
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
