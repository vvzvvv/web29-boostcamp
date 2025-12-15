import { Link } from 'react-router-dom'

export default function Comparison() {
  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '10px' }}>🧪 캔버스 라이브러리 비교 실험</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        Cloud Learner 프로젝트를 위한 Demo #1 - 각 솔루션을 클릭하여 데모를
        확인하세요
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {/* React Flow */}
        <Link to="/demo-canvas/react-flow" style={{ textDecoration: 'none' }}>
          <div
            style={{
              border: '2px solid #1976d2',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: '#e3f2fd',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <h2 style={{ margin: '0 0 12px 0', color: '#1976d2' }}>
              React Flow
            </h2>
            <p
              style={{ margin: '0 0 16px 0', color: '#333', lineHeight: '1.6' }}
            >
              노드 기반 다이어그램에 특화된 라이브러리
            </p>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>장점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>계층 구조 표현 (parent-child)</li>
                <li>드래그 앤 드롭 기본 제공</li>
                <li>Mini Map, Controls 등 편의 기능</li>
                <li>React 친화적</li>
              </ul>
              <strong>단점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>커스터마이징 제약이 있을 수 있음</li>
                <li>번들 사이즈 증가</li>
              </ul>
            </div>
          </div>
        </Link>

        {/* Cytoscape */}
        <Link to="/demo-canvas/cytoscape" style={{ textDecoration: 'none' }}>
          <div
            style={{
              border: '2px solid #388e3c',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: '#c8e6c9',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <h2 style={{ margin: '0 0 12px 0', color: '#388e3c' }}>
              Cytoscape.js
            </h2>
            <p
              style={{ margin: '0 0 16px 0', color: '#333', lineHeight: '1.6' }}
            >
              복잡한 그래프 시각화를 위한 강력한 라이브러리
            </p>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>장점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>복잡한 네트워크 관계 표현에 강함</li>
                <li>다양한 레이아웃 알고리즘</li>
                <li>생물정보학, 네트워크 분석에 검증됨</li>
                <li>확장성이 뛰어남</li>
              </ul>
              <strong>단점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>러닝 커브가 있음</li>
                <li>React 통합이 React Flow보다 번거로움</li>
              </ul>
            </div>
          </div>
        </Link>

        {/* Canvas API */}
        <Link to="/demo-canvas/canvas" style={{ textDecoration: 'none' }}>
          <div
            style={{
              border: '2px solid #f57c00',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: '#fff3e0',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <h2 style={{ margin: '0 0 12px 0', color: '#f57c00' }}>
              Canvas API
            </h2>
            <p
              style={{ margin: '0 0 16px 0', color: '#333', lineHeight: '1.6' }}
            >
              순수 Canvas API를 사용한 직접 구현
            </p>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>장점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>완전한 커스터마이징 가능</li>
                <li>퍼포먼스 최적화 자유도 높음</li>
                <li>번들 사이즈 최소화</li>
                <li>애니메이션 제어 용이</li>
              </ul>
              <strong>단점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>모든 기능을 직접 구현해야 함</li>
                <li>개발 시간 증가</li>
                <li>유지보수 부담</li>
              </ul>
            </div>
          </div>
        </Link>

        {/* Konva */}
        <Link to="/demo-canvas/konva" style={{ textDecoration: 'none' }}>
          <div
            style={{
              border: '2px solid #9c27b0',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: '#f3e5f5',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <h2 style={{ margin: '0 0 12px 0', color: '#9c27b0' }}>Konva</h2>
            <p
              style={{ margin: '0 0 16px 0', color: '#333', lineHeight: '1.6' }}
            >
              Canvas 기반 2D 드로잉 라이브러리
            </p>
            <div style={{ fontSize: '14px', color: '#555' }}>
              <strong>장점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>React 통합 (react-konva)</li>
                <li>드래그 앤 드롭 기본 제공</li>
                <li>애니메이션 API 풍부</li>
                <li>이벤트 처리 직관적</li>
              </ul>
              <strong>단점:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>계층 구조 표현이 덜 직관적</li>
                <li>번들 사이즈 증가 (~200KB)</li>
              </ul>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link
          to="/"
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
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
