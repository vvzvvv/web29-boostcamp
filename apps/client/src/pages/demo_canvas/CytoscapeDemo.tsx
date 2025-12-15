import { useEffect, useRef } from 'react'
import cytoscape, { type Core } from 'cytoscape'

export default function CytoscapeDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<Core | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Cytoscape 인스턴스 생성
    const cy = cytoscape({
      container: containerRef.current,

      // Compound 노드 지원
      boxSelectionEnabled: false,

      elements: [
        // VPC
        {
          data: { id: 'vpc', label: 'VPC\n10.0.0.0/16' },
          classes: 'vpc',
        },

        // Subnets
        {
          data: {
            id: 'subnet-public',
            label: 'Public Subnet\n10.0.1.0/24',
            parent: 'vpc',
          },
          classes: 'subnet-public',
        },
        {
          data: {
            id: 'subnet-private',
            label: 'Private Subnet\n10.0.2.0/24',
            parent: 'vpc',
          },
          classes: 'subnet-private',
        },

        // Instances
        {
          data: {
            id: 'instance-1',
            label: 'Instance 1',
            parent: 'subnet-public',
          },
          classes: 'instance',
        },
        {
          data: {
            id: 'instance-2',
            label: 'Instance 2',
            parent: 'subnet-private',
          },
          classes: 'instance',
        },

        // Internet Gateway
        {
          data: { id: 'igw', label: '🌐 IGW' },
          classes: 'igw',
        },

        // Edges
        { data: { source: 'igw', target: 'vpc' } },
      ],

      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'text-wrap': 'wrap',
            'font-size': '12px',
            'border-width': 2,
            color: '#000',
          },
        },
        {
          selector: ':parent',
          style: {
            'text-valign': 'top',
            'text-halign': 'center',
          },
        },
        {
          selector: '.vpc',
          style: {
            'background-color': '#e3f2fd',
            'border-color': '#1976d2',
            shape: 'roundrectangle',
          },
        },
        {
          selector: '.subnet-public',
          style: {
            'background-color': '#c8e6c9',
            'border-color': '#388e3c',
            shape: 'roundrectangle',
          },
        },
        {
          selector: '.subnet-private',
          style: {
            'background-color': '#ffccbc',
            'border-color': '#e64a19',
            shape: 'roundrectangle',
          },
        },
        {
          selector: '.instance',
          style: {
            'background-color': '#fff',
            'border-color': '#666',
            shape: 'rectangle',
            width: 100,
            height: 50,
          },
        },
        {
          selector: '.igw',
          style: {
            'background-color': '#fff3e0',
            'border-color': '#f57c00',
            shape: 'ellipse',
            width: 100,
            height: 60,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#f57c00',
            'target-arrow-color': '#f57c00',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],

      layout: {
        name: 'preset',
        fit: true,
        padding: 50,
        animate: false,
      },
    })

    // 레이아웃 수동 조정 - compound 노드는 자식을 포함하도록 자동 크기 조정됨
    cy.nodes('[id="igw"]').position({ x: 400, y: 100 })
    cy.nodes('[id="vpc"]').position({ x: 400, y: 350 })
    cy.nodes('[id="subnet-public"]').position({ x: 250, y: 350 })
    cy.nodes('[id="subnet-private"]').position({ x: 550, y: 350 })
    cy.nodes('[id="instance-1"]').position({ x: 250, y: 350 })
    cy.nodes('[id="instance-2"]').position({ x: 550, y: 350 })

    // 레이아웃 재계산
    cy.fit(undefined, 50)

    cyRef.current = cy

    return () => {
      cy.destroy()
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
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
        <h2 style={{ margin: '0 0 10px 0' }}>Cytoscape.js Demo</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          그래프 기반 클라우드 인프라 시각화
          <br />
          - 복잡한 네트워크 관계 표현에 강점
          <br />
          - 다양한 레이아웃 알고리즘 지원
          <br />- 계층 구조 (parent-child) 표현
        </p>
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f5f5f5',
        }}
      />
    </div>
  )
}
