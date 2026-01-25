# refactor/#85-provider-diagram 브랜치 작업 정리

## 🏗️ ProblemFormProvider 기반 전체 구조

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           /problems/[id]/page.tsx (Server Component)             │
│                                                                                  │
│   const { title, description, tags, serviceMappers, diagram }                    │
│       = await getProblemData(id)                                                 │
│                                                                                  │
│   return <ProblemDetailClient                                                    │
│            problemId={id}                                                        │
│            title={title}                                                         │
│            description={description}                                             │
│            tags={tags}                                                           │
│            problemData={serviceMappers}                                          │
│            diagramData={diagram}                                                 │
│            initialFeedback={mockFeedbackMessages}                                │
│          />                                                                      │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    ProblemDetailClient (Client Component)                        │
│                                                                                  │
│   ┌───────────────────────────────────────────────────────────────────────────┐ │
│   │                        ProblemFormProvider                                 │ │
│   │                                                                           │ │
│   │   const methods = useForm({ defaultValues })   ◄── Factory로 생성         │ │
│   │   const [feedback, setFeedback] = useState()   ◄── 피드백 상태 통합        │ │
│   │   const [isSubmitting, setIsSubmitting] = useState()                      │ │
│   │                                                                           │ │
│   │   <ProblemFormContext.Provider value={{                                   │ │
│   │     form,                          ◄── form 객체 직접 노출                 │ │
│   │     feedback, isSubmitting, submitProblem                                 │ │
│   │   }}>                                                                     │ │
│   │     {children}                                                            │ │
│   │   </ProblemFormContext.Provider>                                          │ │
│   └───────────────────────────────────────────────────────────────────────────┘ │
│                                        │                                         │
│         <div className="grid grid-cols-[1fr,400px] gap-6">                       │
│              ┌─────────────────────────┴─────────────────────────┐               │
│              │                                                   │               │
│              ▼                                                   ▼               │
│   ┌─────────────────────────┐                    ┌─────────────────────────┐    │
│   │     스크롤 영역 (Left)    │                    │    스티키 영역 (Right)   │    │
│   │                         │                    │                         │    │
│   │  ┌───────────────────┐  │                    │  ┌───────────────────┐  │    │
│   │  │  ProblemHeader    │  │                    │  │   SubmitButton    │  │    │
│   │  │  (문제 제목/설명)   │  │                    │  └───────────────────┘  │    │
│   │  └───────────────────┘  │                    │           │             │    │
│   │           │             │                    │           ▼             │    │
│   │           ▼             │                    │  ┌───────────────────┐  │    │
│   │  ┌───────────────────┐  │                    │  │   DiagramPanel    │  │    │
│   │  │ ProblemFormContent│  │  ──── watch() ───▶ │  │   (다이어그램만)    │  │    │
│   │  │  (서비스 폼 렌더링) │  │                    │  └───────────────────┘  │    │
│   │  └───────────────────┘  │                    │           │             │    │
│   │                         │                    │           ▼             │    │
│   │                         │                    │  ┌───────────────────┐  │    │
│   │                         │                    │  │  FeedbackPanel    │  │    │
│   │                         │                    │  │  (Context 피드백)  │  │    │
│   │                         │                    │  └───────────────────┘  │    │
│   └─────────────────────────┘                    └─────────────────────────┘    │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 📁 파일 구조

```
apps/web/src/
├── contexts/
│   └── problem-form-context.tsx       # ProblemFormProvider + useProblemForm Hook
│
├── app/(guest)/problems/[id]/
│   ├── page.tsx                        # Server Component (데이터 fetch)
│   ├── problem-detail-client.tsx       # Client Component (2컬럼 레이아웃 + Provider)
│   │
│   └── components/
│       ├── index.ts                    # 컴포넌트 export
│       ├── problem-header.tsx          # 문제 제목/설명/태그 표시
│       ├── problem-form-content.tsx    # 서비스 컴포넌트 렌더링
│       ├── diagram-panel.tsx           # ReactFlow 다이어그램 (다이어그램만 담당)
│       │
│       └── sticky/                     # 스티키 영역 컴포넌트
│           ├── index.ts
│           ├── submit-button.tsx       # 제출 버튼
│           └── feedback-panel.tsx      # 피드백 표시
│
├── components/aws-services/
│   ├── registry/
│   │   ├── registry.ts                 # AWS 서비스 레지스트리 (defaultValues 포함)
│   │   └── form-defaults-factory.ts    # 서비스별 동적 defaultValues 생성 Factory
│   │
│   └── s3/s3-bucket-create/
│       └── s3-bucket-create.tsx        # 외부 control 주입 방식으로 변경
│
├── lib/problem/
│   ├── get-problem-data.ts             # 문제 데이터 fetch (title, description, tags 포함)
│   └── mock-diagram-data.ts            # 다이어그램 목 데이터
│
└── types/
    └── diagram.ts                      # DiagramData 타입 정의
```


## 🔍 각 컴포넌트 역할

### 1️⃣ ProblemFormProvider - Form + Feedback 통합 상태 관리

```tsx
// contexts/problem-form-context.tsx
'use client'

interface ProblemFormContextValue<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>         // form 객체 직접 노출 (유연성 확보)
  feedback: FeedbackDetail[]     // 피드백 상태 통합
  isSubmitting: boolean
  submitProblem: () => Promise<void>
}

export function ProblemFormProvider<T extends FieldValues>({
  children,
  defaultValues,
  problemId,
  initialFeedback = [],
}: ProblemFormProviderProps<T>) {
  const methods = useForm<T>({ defaultValues })
  const [feedback, setFeedback] = useState<FeedbackDetail[]>(initialFeedback)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitProblem = useCallback(async () => {
    setIsSubmitting(true)
    // TODO: 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setFeedback(initialFeedback)
    setIsSubmitting(false)
  }, [problemId, initialFeedback])

  const contextValue = useMemo(
    () => ({
      form: methods,
      feedback,
      isSubmitting,
      submitProblem,
    }),
    [methods, feedback, isSubmitting, submitProblem],
  )

  // ... Provider 반환
}

export function useProblemForm<T extends FieldValues = FieldValues>() {
  const context = useContext(ProblemFormContext)
  if (!context) {
    throw new Error('useProblemForm must be used within ProblemFormProvider')
  }
  return context as ProblemFormContextValue<T>
}
```

### 2️⃣ ProblemDetailClient - 2컬럼 레이아웃 + Provider + Factory

```tsx
// problem-detail-client.tsx
'use client'

export default function ProblemDetailClient({
  problemId,
  title,
  description,
  tags,
  problemData,
  diagramData,
  initialFeedback,
}: ProblemDetailClientProps) {
  // Factory 패턴으로 서비스별 defaultValues 병합
  const defaultValues = useMemo(
    () => mergeServiceDefaultValues(problemData),
    [problemData],
  )

  return (
    <ProblemFormProvider
      defaultValues={defaultValues}
      problemId={problemId}
      initialFeedback={initialFeedback}
    >
      <div className="grid grid-cols-[1fr,400px] gap-6">
        {/* 왼쪽: 스크롤 영역 */}
        <div className="space-y-6 overflow-y-auto">
          <ProblemHeader title={title} description={description} tags={tags} />
          <ProblemFormContent problemData={problemData} />
        </div>

        {/* 오른쪽: 스티키 영역 */}
        <div className="relative h-full">
          <div className="sticky top-24 space-y-4">
            <SubmitButton />
            <DiagramPanel diagramData={diagramData} />
            <FeedbackPanel />
          </div>
        </div>
      </div>
    </ProblemFormProvider>
  )
}
```

### 3️⃣ ProblemHeader - 문제 설명 컴포넌트

```tsx
// components/problem-header.tsx
interface ProblemHeaderProps {
  title: string
  description: string
  tags?: string[]
}

export function ProblemHeader({ title, description, tags }: ProblemHeaderProps) {
  return (
    <div className="bg-card space-y-4 rounded-lg border p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-muted rounded-full px-3 py-1 text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
```

### 4️⃣ sticky 컴포넌트 - 단일 책임 원칙 적용

```tsx
// components/sticky/submit-button.tsx
'use client'

export function SubmitButton() {
  const { isSubmitting, submitProblem } = useProblemForm()

  return (
    <Button className="w-full" onClick={submitProblem} disabled={isSubmitting}>
      {isSubmitting ? '제출 중...' : '제출하기'}
    </Button>
  )
}

// components/sticky/feedback-panel.tsx
'use client'

export function FeedbackPanel() {
  const { feedback } = useProblemForm()

  if (feedback.length === 0) return null

  return <FeedbackDetailCard feedback={feedback} />
}
```

### 5️⃣ DiagramPanel - 다이어그램만 담당

```tsx
// components/diagram-panel.tsx
'use client'

export function DiagramPanel({ diagramData }: DiagramPanelProps) {
  const { form } = useProblemForm<S3BucketFormData>()
  const formData = form.watch()

  const [nodes, , onNodesChange] = useNodesState(diagramData.nodes)
  const [edges, , onEdgesChange] = useEdgesState(diagramData.edges)

  // formData 변경 시 노드 업데이트 로직 (향후 구현)
  void formData

  return (
    <div className="h-[400px] rounded-xl border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={awsNodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
```

### 6️⃣ ProblemFormContent - 서비스 컴포넌트 렌더링

```tsx
// components/problem-form-content.tsx
'use client'

export function ProblemFormContent({ problemData }: ProblemFormContentProps) {
  const { form } = useProblemForm<FieldValues>()
  const { control, setValue } = form

  return (
    <>
      {problemData.map((mapper, index) => {
        const { Component, config } = serviceMapper(mapper)
        const formKey = createServiceKey(mapper.serviceName, mapper.serviceTask)

        return (
          <Component
            key={`${formKey}-${index}`}
            control={control}
            config={config}
            setValue={setValue}
            formKey={formKey}
          />
        )
      })}
    </>
  )
}
```

### 7️⃣ form-defaults-factory - 서비스별 동적 defaultValues 생성

```tsx
// components/aws-services/registry/form-defaults-factory.ts

/**
 * 서비스 키 생성 함수 (서비스명_태스크명 형식)
 */
export function createServiceKey(
  serviceName: string,
  serviceTask: string,
): string {
  return `${serviceName}_${serviceTask}`
}

/**
 * 여러 서비스의 기본값을 병합하여 반환합니다.
 * 복합 문제(예: S3 + CloudFront)를 지원합니다.
 *
 * @example
 * // 단일 서비스
 * mergeServiceDefaultValues([{ serviceName: 'S3', serviceTask: 'bucket-create', ... }])
 * // => { S3_bucket-create: { general: {...}, ... } }
 *
 * @example
 * // 복합 서비스
 * mergeServiceDefaultValues([
 *   { serviceName: 'S3', serviceTask: 'bucket-create', ... },
 *   { serviceName: 'CloudFront', serviceTask: 'origin-settings', ... }
 * ])
 * // => { S3_bucket-create: {...}, CloudFront_origin-settings: {...} }
 */
export function mergeServiceDefaultValues(
  mappers: IServiceMapper[],
): FieldValues {
  return mappers.reduce<FieldValues>((acc, mapper) => {
    const key = createServiceKey(mapper.serviceName, mapper.serviceTask)
    const defaultValues = getServiceDefaultValues(
      mapper.serviceName,
      mapper.serviceTask,
    )
    return { ...acc, [key]: defaultValues }
  }, {})
}
```


## 📊 데이터 흐름 다이어그램

```
     page.tsx                  ProblemFormProvider                    컴포넌트들
        │                               │                                 │
        │  title, description, tags     │                                 │
        │  problemData                  │                                 │
        │  + diagramData                │                                 │
        │  + initialFeedback            │                                 │
        │────────────────────────────▶  │                                 │
        │                               │                                 │
        │                     ┌─────────┴─────────┐                       │
        │                     │ mergeServiceDefault│                      │
        │                     │   Values(Factory) │                       │
        │                     └─────────┬─────────┘                       │
        │                               │                                 │
        │                     ┌─────────┴─────────┐                       │
        │                     │    useForm()      │                       │
        │                     │   + useState()    │                       │
        │                     │   (feedback)      │                       │
        │                     └─────────┬─────────┘                       │
        │                               │                                 │
        │                               │  Context (form + feedback)      │
        │                               │─────────────────────────────▶   │
        │                               │                                 │
        │                               │          ┌──────────────────────┴──────────────────────┐
        │                               │          │                      │                      │
        │                               │   ProblemHeader          ProblemFormContent      Sticky 영역
        │                               │   (title, desc)                 │              (Submit, Diagram,
        │                               │                                 │               Feedback)
        │                               │                          form.control             │
        │                               │                          form.setValue     form.watch()
        │                               │                                 │               submitProblem
        │                               │                                 ▼                      │
        │                               │                          ┌─────────────┐               │
        │                               │                          │  S3Bucket   │               │
        │                               │                          │  CloudFront │               │
        │                               │                          └─────────────┘               │
        │                               │                                 │                      │
        │                               │                        user input │                    │
        │                               │                                 ▼                      │
        │                               │◀─────────── form 상태 업데이트 ──────────────────────────│
        │                               │                                                        │
        │                               │──────────── form.watch() 트리거 ───────────────────────▶│
        │                               │                                                        │
        │                               │                                              다이어그램 업데이트
        │                               │                                                        │
        │                     ┌─────────┴─────────┐                                              │
        │                     │   submitProblem() │                                              │
        │                     │  setFeedback()    │                                              │
        │                     └─────────┬─────────┘                                              │
        │                               │                                                        │
        │                               ▼                                                        │
        │                        API 제출 + 피드백 업데이트 ─────────────────────────────────────────▶│
        │                                                                                        │
```


## 🆕 새로 추가된 타입

### DiagramData

```tsx
// types/diagram.ts
import type { Edge, Node } from '@xyflow/react'

export type AwsNodeData =
  | AwsServiceNodeData
  | AwsResourceNodeData
  | AwsGroupNodeData

export type AwsNode = Node<AwsNodeData>

export interface DiagramData {
  nodes: AwsNode[]
  edges: Edge[]
}
```

### ProblemData

```tsx
// lib/problem/get-problem-data.ts
export interface ProblemData {
  title: string
  description: string
  tags: string[]
  serviceMappers: IServiceMapper[]
  diagram: DiagramData
}
```


## 핵심 포인트

| 질문 | 답변 |
|---|---|
| useForm 어디에? | ProblemFormProvider에서 한 번만 생성 |
| Context에서 form 접근? | `form` 객체 직접 노출 (form.control, form.watch 등) |
| defaultValues 생성? | form-defaults-factory의 Factory 패턴으로 동적 생성 |
| 피드백 상태 관리? | ProblemFormProvider에서 form과 함께 통합 관리 |
| 복합 문제 지원? | mergeServiceDefaultValues로 여러 서비스 defaultValues 병합 |
| 다이어그램 연동? | DiagramPanel에서 form.watch()로 form 데이터 구독 |
| 레이아웃? | grid-cols-[1fr,400px] 2컬럼 레이아웃 |
| 컴포넌트 분리? | sticky 폴더로 SubmitButton, FeedbackPanel 분리 (SRP) |


## 주요 변경사항 요약

1. **ProblemFormContext 개선** - form 객체 직접 노출 (유연성 확보)
2. **2컬럼 그리드 레이아웃** - 왼쪽(스크롤) / 오른쪽(스티키) 영역 분리
3. **ProblemHeader 추가** - 문제 제목, 설명, 태그 표시
4. **sticky 컴포넌트 분리** - SubmitButton, FeedbackPanel 단일 책임
5. **DiagramPanel 단순화** - 다이어그램 렌더링만 담당
6. **getProblemData 확장** - title, description, tags 반환
7. **Factory 패턴 적용** - 서비스별 동적 defaultValues 생성 (복합 문제 지원)
8. **S3BucketCreate 리팩토링** - 내부 useForm 제거, 외부에서 control 주입받는 방식


## 정리

```tsx
// 계층 구조
<ProblemFormProvider>              // useForm + 피드백 상태 통합
  defaultValues={                  // Factory로 생성
    mergeServiceDefaultValues(problemData)
  }
  <div className="grid grid-cols-[1fr,400px]">
    {/* 왼쪽 스크롤 영역 */}
    <ProblemHeader />              // 문제 설명
    <ProblemFormContent />         // 서비스 폼 렌더링 (form.control 사용)

    {/* 오른쪽 스티키 영역 */}
    <SubmitButton />               // 제출 버튼 (submitProblem 사용)
    <DiagramPanel />               // 다이어그램 (form.watch 사용)
    <FeedbackPanel />              // 피드백 (feedback 사용)
  </div>
</ProblemFormProvider>

// 핵심 패턴
1. Factory Pattern: 서비스별 defaultValues 동적 생성
2. Context Pattern: Form + Feedback 상태 통합 관리 (form 객체 직접 노출)
3. Composition: 서비스 컴포넌트에 control 주입 (IoC)
4. SRP: sticky 컴포넌트 분리 (SubmitButton, DiagramPanel, FeedbackPanel)
```
