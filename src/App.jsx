import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ProposeView from './views/ProposeView.jsx'

function App() {
  return (
      // 전체 배경 레이아웃은 App에서 담당
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <ProposeView />
      </div>
    );
}

export default App
