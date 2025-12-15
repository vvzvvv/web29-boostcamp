import { useEffect, useRef, useState } from 'react'

interface CloudNode {
  id: string
  type: 'vpc' | 'subnet' | 'instance' | 'igw'
  label: string
  x: number
  y: number
  width: number
  height: number
  color: string
  borderColor: string
  parent?: string
}

const cloudNodes: CloudNode[] = [
  {
    id: 'igw',
    type: 'igw',
    label: '🌐 Internet Gateway',
    x: 350,
    y: 50,
    width: 180,
    height: 60,
    color: '#fff3e0',
    borderColor: '#f57c00',
  },
  {
    id: 'vpc',
    type: 'vpc',
    label: 'VPC (10.0.0.0/16)',
    x: 100,
    y: 150,
    width: 600,
    height: 400,
    color: '#e3f2fd',
    borderColor: '#1976d2',
  },
  {
    id: 'subnet-pub',
    type: 'subnet',
    label: 'Public Subnet\n(10.0.1.0/24)',
    x: 130,
    y: 200,
    width: 250,
    height: 180,
    color: '#c8e6c9',
    borderColor: '#388e3c',
    parent: 'vpc',
  },
  {
    id: 'subnet-pri',
    type: 'subnet',
    label: 'Private Subnet\n(10.0.2.0/24)',
    x: 420,
    y: 200,
    width: 250,
    height: 180,
    color: '#ffccbc',
    borderColor: '#e64a19',
    parent: 'vpc',
  },
  {
    id: 'inst-1',
    type: 'instance',
    label: 'Instance 1',
    x: 170,
    y: 280,
    width: 120,
    height: 60,
    color: '#fff',
    borderColor: '#666',
    parent: 'subnet-pub',
  },
  {
    id: 'inst-2',
    type: 'instance',
    label: 'Instance 2',
    x: 480,
    y: 280,
    width: 120,
    height: 60,
    color: '#fff',
    borderColor: '#666',
    parent: 'subnet-pri',
  },
]

export default function CanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // 캔버스 그리기
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 배경
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // IGW → VPC 연결선
    ctx.beginPath()
    ctx.moveTo(440, 110)
    ctx.lineTo(400, 150)
    ctx.strokeStyle = '#f57c00'
    ctx.lineWidth = 3
    ctx.stroke()

    // 노드 그리기
    cloudNodes.forEach((node) => {
      ctx.fillStyle = node.color
      ctx.strokeStyle = node.borderColor
      ctx.lineWidth = 2

      // 둥근 사각형
      const radius = node.type === 'igw' ? 30 : 8
      ctx.beginPath()
      ctx.roundRect(node.x, node.y, node.width, node.height, radius)
      ctx.fill()
      ctx.stroke()

      // 텍스트
      ctx.fillStyle = '#000'
      ctx.font =
        node.type === 'vpc' ? 'bold 16px sans-serif' : '14px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const lines = node.label.split('\n')
      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          node.x + node.width / 2,
          node.y + node.height / 2 + (i - lines.length / 2 + 0.5) * 18,
        )
      })
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 크기 설정
    canvas.width = 800
    canvas.height = 600

    draw(ctx)
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 클릭한 노드 찾기 (역순으로 탐색하여 위에 있는 노드 우선)
    for (let i = cloudNodes.length - 1; i >= 0; i--) {
      const node = cloudNodes[i]
      if (
        x >= node.x &&
        x <= node.x + node.width &&
        y >= node.y &&
        y <= node.y + node.height
      ) {
        setDragging(node.id)
        setOffset({ x: x - node.x, y: y - node.y })
        break
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const node = cloudNodes.find((n) => n.id === dragging)
    if (node) {
      node.x = x - offset.x
      node.y = y - offset.y
      draw(ctx)
    }
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        <h2 style={{ margin: '0 0 10px 0' }}>Canvas API Demo</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          순수 Canvas API를 사용한 구현
          <br />
          - 완전한 커스터마이징 가능
          <br />
          - 드래그 기능 직접 구현
          <br />
          - 퍼포먼스 최적화 자유도 높음
          <br />- 모든 것을 직접 구현해야 함
        </p>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          border: '1px solid #ccc',
          cursor: dragging ? 'grabbing' : 'grab',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  )
}
