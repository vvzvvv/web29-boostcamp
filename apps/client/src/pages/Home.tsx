import { Link } from 'react-router-dom'

function Home() {
  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h1>Cloud Learner - 클라우드 학습 시뮬레이터</h1>
      <p>
        클라우드 인프라를 실제 비용이나 위험 없이 시각적으로 학습할 수 있는 웹
        기반 시뮬레이터
      </p>

      <div style={{ marginTop: '40px' }}>
        <h2>개발 중인 기능</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '12px' }}>
            <Link
              to="/demo-canvas"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#1976d2',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
              }}
            >
              🧪 Demo #1: 캔버스 라이브러리 비교 실험
            </Link>
            <p style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>
              React Flow, Cytoscape.js, Canvas API를 비교하여 프로젝트에 적합한
              기술을 선정합니다.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
