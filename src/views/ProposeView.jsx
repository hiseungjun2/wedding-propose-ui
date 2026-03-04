import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import data from '@/config/data.json';
import MotionDiv from '@/components/MotionDiv';
import MotionButton from '@/components/MotionButton';
import CherryBlossoms from '@/components/CherryBlossoms';
import ImageModal from '@/components/ImageModal';

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

  const reset = () => {
    setIsStarted(false);
    setStep(0);
    setIsFinished(false);
  };

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

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
              <MotionDiv key={`step-${step}`} type="fadeRight" className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                {/* 단일 이미지 처리 */}
                {data[step].image && (
                  <div 
                    className="mb-4 overflow-hidden shadow-sm" 
                    style={{ borderRadius: '20px', width: '100%', maxHeight: '250px', cursor: 'zoom-in' }}
                    onClick={() => openModal(data[step].image)}
                  >
                    <img 
                      src={data[step].image} 
                      alt="step-image" 
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* 다중 이미지(그리드) 처리 */}
                {data[step].images && data[step].images.length > 0 && (
                  <div className="row g-2 mb-4 w-100">
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
                
                <h2 className={`card-title mb-5 fw-bold ${data[step].color}`} style={{ fontSize: '1.2rem', lineHeight: '1.6', wordBreak: 'keep-all' }}>
                  {data[step].text}
                </h2>

                <MotionButton
                  className="btn-primary-rose btn px-4 py-3 shadow-sm mt-auto"
                  style={{ width: 'fit-content', minWidth: '120px', borderRadius: '15px' }}
                  onClick={next}
                >
                  {data[step].btn}
                </MotionButton>
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