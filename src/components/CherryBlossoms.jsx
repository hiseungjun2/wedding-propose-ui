import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = ({ id }) => {
  const [config] = useState(() => ({
    left: Math.random() * 100, // 시작 위치 (0~100%)
    size: Math.random() * 10 + 10, // 크기 (10~20px)
    duration: Math.random() * 5 + 5, // 떨어지는 시간 (5~10s)
    delay: Math.random() * 10, // 지연 시간
    xOffset: Math.random() * 100 - 50, // 좌우 흔들림 범위
    rotation: Math.random() * 360, // 초기 회전
  }));

  return (
    <motion.div
      initial={{ 
        top: -20, 
        left: `${config.left}%`, 
        opacity: 0, 
        rotate: config.rotation,
        scale: 0.5 
      }}
      animate={{ 
        top: '110vh', 
        left: `${config.left + config.xOffset}%`,
        opacity: [0, 1, 1, 0],
        rotate: config.rotation + 720,
        scale: 1
      }}
      transition={{ 
        duration: config.duration, 
        repeat: Infinity, 
        delay: config.delay,
        ease: "linear"
      }}
      style={{
        position: 'fixed',
        width: config.size,
        height: config.size * 1.2,
        backgroundColor: '#ffb7c5',
        borderRadius: '0% 100% 0% 100% / 0% 100% 0% 100%',
        boxShadow: '0 0 5px rgba(255, 183, 197, 0.5)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

const CherryBlossoms = ({ count = 30 }) => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    setPetals(Array.from({ length: count }, (_, i) => i));
  }, [count]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {petals.map((id) => (
        <Petal key={id} id={id} />
      ))}
    </div>
  );
};

export default CherryBlossoms;
