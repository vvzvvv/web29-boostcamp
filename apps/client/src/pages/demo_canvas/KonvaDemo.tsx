import { Stage, Layer, Rect, Text, Arrow } from 'react-konva'

export default function KonvaDemo() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10,
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 10px 0' }}>Konva Demo</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          Canvas 기반 2D 라이브러리
          <br />
          - React 통합 (react-konva)
          <br />
          - 드래그 앤 드롭 기본 제공
          <br />- 애니메이션과 이벤트 처리 용이
        </p>
      </div>

      <Stage width={900} height={650}>
        <Layer>
          {/* Internet Gateway */}
          <Rect
            x={375}
            y={30}
            width={150}
            height={70}
            fill="#fff3e0"
            stroke="#f57c00"
            strokeWidth={2}
            cornerRadius={35}
            draggable
          />
          <Text
            x={375}
            y={55}
            width={150}
            text="🌐 Internet Gateway"
            fontSize={13}
            fill="black"
            align="center"
          />

          {/* Arrow from IGW to VPC */}
          <Arrow
            points={[450, 100, 450, 150]}
            stroke="#f57c00"
            strokeWidth={3}
            fill="#f57c00"
          />

          {/* VPC */}
          <Rect
            x={100}
            y={150}
            width={700}
            height={450}
            fill="#e3f2fd"
            stroke="#1976d2"
            strokeWidth={3}
            cornerRadius={10}
            draggable
          />
          <Text
            x={100}
            y={165}
            width={700}
            text="VPC (10.0.0.0/16)"
            fontSize={16}
            fontStyle="bold"
            fill="black"
            align="center"
          />

          {/* Public Subnet */}
          <Rect
            x={150}
            y={220}
            width={280}
            height={200}
            fill="#c8e6c9"
            stroke="#388e3c"
            strokeWidth={2}
            cornerRadius={8}
            draggable
          />
          <Text
            x={150}
            y={235}
            width={280}
            text="Public Subnet"
            fontSize={14}
            fontStyle="bold"
            fill="black"
            align="center"
          />
          <Text
            x={150}
            y={255}
            width={280}
            text="(10.0.1.0/24)"
            fontSize={12}
            fill="black"
            align="center"
          />

          {/* Instance 1 in Public Subnet */}
          <Rect
            x={210}
            y={310}
            width={160}
            height={70}
            fill="#fff"
            stroke="#666"
            strokeWidth={1}
            cornerRadius={5}
            draggable
          />
          <Text
            x={210}
            y={335}
            width={160}
            text="EC2 Instance 1"
            fontSize={13}
            fill="black"
            align="center"
          />

          {/* Private Subnet */}
          <Rect
            x={470}
            y={220}
            width={280}
            height={200}
            fill="#ffccbc"
            stroke="#e64a19"
            strokeWidth={2}
            cornerRadius={8}
            draggable
          />
          <Text
            x={470}
            y={235}
            width={280}
            text="Private Subnet"
            fontSize={14}
            fontStyle="bold"
            fill="black"
            align="center"
          />
          <Text
            x={470}
            y={255}
            width={280}
            text="(10.0.2.0/24)"
            fontSize={12}
            fill="black"
            align="center"
          />

          {/* Instance 2 in Private Subnet */}
          <Rect
            x={530}
            y={310}
            width={160}
            height={70}
            fill="#fff"
            stroke="#666"
            strokeWidth={1}
            cornerRadius={5}
            draggable
          />
          <Text
            x={530}
            y={335}
            width={160}
            text="EC2 Instance 2"
            fontSize={13}
            fill="black"
            align="center"
          />
        </Layer>
      </Stage>
    </div>
  )
}
