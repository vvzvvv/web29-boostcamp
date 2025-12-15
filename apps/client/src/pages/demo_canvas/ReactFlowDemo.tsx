import { useCallback } from 'react'
import {
  ReactFlow,
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// 클라우드 인프라를 시뮬레이션하는 초기 노드들
const initialNodes: Node[] = [
  {
    id: 'vpc-1',
    type: 'default',
    data: { label: 'VPC (10.0.0.0/16)' },
    position: { x: 250, y: 50 },
    style: {
      color: 'black',
      backgroundColor: '#e3f2fd',
      border: '2px solid #1976d2',
      padding: '20px',
      width: 500,
      height: 400,
    },
  },
  {
    id: 'subnet-public',
    type: 'default',
    data: { label: 'Public Subnet\n(10.0.1.0/24)' },
    position: { x: 50, y: 150 },
    parentId: 'vpc-1',
    extent: 'parent',
    style: {
      color: 'black',
      backgroundColor: '#c8e6c9',
      border: '2px solid #388e3c',
      padding: '15px',
    },
  },
  {
    id: 'subnet-private',
    type: 'default',
    data: { label: 'Private Subnet\n(10.0.2.0/24)' },
    position: { x: 300, y: 150 },
    parentId: 'vpc-1',
    extent: 'parent',
    style: {
      color: 'black',
      backgroundColor: '#ffccbc',
      border: '2px solid #e64a19',
      padding: '15px',
    },
  },
  {
    id: 'instance-1',
    type: 'default',
    data: { label: 'EC2 Instance 1' },
    position: { x: 30, y: 80 },
    parentId: 'subnet-public',
    extent: 'parent',
    style: {
      color: 'black',
      backgroundColor: '#fff',
      border: '1px solid #666',
      fontSize: '12px',
    },
  },
  {
    id: 'instance-2',
    type: 'default',
    data: { label: 'EC2 Instance 2' },
    position: { x: 30, y: 80 },
    parentId: 'subnet-private',
    extent: 'parent',
    style: {
      color: 'black',
      backgroundColor: '#fff',
      border: '1px solid #666',
      fontSize: '12px',
    },
  },
  {
    id: 'igw',
    type: 'default',
    data: { label: '🌐 Internet Gateway' },
    position: { x: 350, y: -100 },
    style: {
      color: 'black',
      backgroundColor: '#fff3e0',
      border: '2px solid #f57c00',
    },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'igw',
    target: 'vpc-1',
    animated: true,
    style: { stroke: '#f57c00' },
  },
]

export default function ReactFlowDemo() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
        <h2 style={{ margin: '0 0 10px 0' }}>React Flow Demo</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          클라우드 인프라 시뮬레이션 예시
          <br />
          - 노드 드래그 가능
          <br />
          - 노드 간 연결 가능
          <br />- 계층 구조 표현 (VPC → Subnet → Instance)
        </p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
