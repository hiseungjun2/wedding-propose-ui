import { AnimatePresence } from 'framer-motion';
import MotionDiv from '@/components/MotionDiv';
import '@/assets/styles/ImageModal.css';

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="image-modal-backdrop"
          onClick={onClose}
        >
          <MotionDiv
            type="zoomIn"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imageSrc} 
              alt="Enlarged" 
              className="image-modal-img"
            />
            <button
              onClick={onClose}
              className="image-modal-close"
              aria-label="Close"
            >
              ×
            </button>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
