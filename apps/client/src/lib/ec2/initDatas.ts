import { type Node, type Edge } from '@xyflow/react'

const initialNodes: Node[] = [
  {
    id: 'internet-gateway',
    type: 'input',
    position: { x: 250, y: 50 },
    data: { label: 'Internet Gateway' },
    style: {
      background: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      border: '2px solid #45a049',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'vpc',
    position: { x: 200, y: 150 },
    data: { label: 'VPC (10.0.0.0/16)' },
    style: {
      background: '#2196F3',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '8px',
      border: '2px solid #1976D2',
      fontSize: '14px',
      fontWeight: 'bold',
      width: '250px',
    },
  },
  {
    id: 'subnet',
    position: { x: 220, y: 270 },
    data: { label: 'Public Subnet\n(10.0.1.0/24)' },
    style: {
      background: '#FF9800',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '8px',
      border: '2px solid #F57C00',
      fontSize: '13px',
      fontWeight: 'bold',
      whiteSpace: 'pre-line',
    },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'internet-gateway',
    target: 'vpc',
    animated: true,
    style: { stroke: '#4CAF50', strokeWidth: 2 },
    label: '외부 트래픽',
    labelStyle: { fontSize: 12, fontWeight: 'bold' },
  },
  {
    id: 'e2',
    source: 'vpc',
    target: 'subnet',
    animated: true,
    style: { stroke: '#2196F3', strokeWidth: 2 },
    label: '라우팅',
    labelStyle: { fontSize: 12, fontWeight: 'bold' },
  },
]

const ec2Node: Node = {
  id: 'ec2',
  type: 'output',
  position: { x: 235, y: 400 },
  data: { label: 'EC2 Instance' },
  style: {
    background: '#E91E63',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #C2185B',
    fontSize: '14px',
    fontWeight: 'bold',
  },
}

const ec2Edge: Edge = {
  id: 'e3',
  source: 'subnet',
  target: 'ec2',
  animated: true,
  style: { stroke: '#FF9800', strokeWidth: 2 },
  label: '인스턴스 접근',
  labelStyle: { fontSize: 12, fontWeight: 'bold' },
}

export { initialNodes, initialEdges, ec2Node, ec2Edge }
