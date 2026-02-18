export interface Project {
  slug: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  location: string;
  problem: string;
  concept: string;
  conceptDetails: string[];
  whatIDid: string[];
  tools: string[];
  image: string;
  content?: string;
}

export const projects: Project[] = [
  {
    slug: "share-us",
    number: "01",
    category: "Housing / Graduation Work",
    title: "Share-Us",
    subtitle: "경계가 없는 집",
    location: "서울시 마포구 연남동 (가상 대지)",
    problem:
      "원룸은 너무 좁고, 셰어하우스는 프라이버시가 없다. 그 사이의 적절한 거리는?",
    concept: "따로 또 같이",
    conceptDetails: [
      "개인 방은 최소화하되, 방마다 작은 발코니를 두어 숨 쉴 틈을 줌.",
      "복도를 단순히 지나가는 길이 아니라, 소파를 두어 자연스럽게 마주치는 '거실의 확장'으로 설계.",
    ],
    whatIDid: [
      "1인 가구 설문조사",
      "유닛 평면 스터디",
      "모형 제작 (White Model)",
    ],
    tools: ["Rhino", "V-Ray", "Photoshop"],
    image: "/images/project-01.jpg",
  },
  {
    slug: "book-slope",
    number: "02",
    category: "Culture / Public",
    title: "Book-Slope",
    subtitle: "공원이 된 도서관",
    location: "동네 뒷산 언덕 부지",
    problem:
      "경사가 심해 버려진 땅. 주민들이 오르기 힘든 단절된 공간.",
    concept: "책 읽는 산책로",
    conceptDetails: [
      "건물을 덩어리(Mass)로 두지 않고, 경사 흐름에 맞춰 계단식으로 배치.",
      "지붕을 걸어 다닐 수 있는 데크로 만들어, 도서관을 이용하지 않는 사람도 공원처럼 지나갈 수 있게 연결(Connection).",
    ],
    whatIDid: [
      "대지 레벨(Level) 분석",
      "경사로 동선 계획",
      "단면도(Section) 상세화",
    ],
    tools: ["SketchUp", "AutoCAD", "Twinmotion"],
    image: "/images/project-02.jpg",
  },
  {
    slug: "brick-layer",
    number: "03",
    category: "Renovation / Commercial",
    title: "Brick Layer",
    subtitle: "붉은 벽돌 카페",
    location: "성수동 골목길",
    problem: "낡고 어두운 80년대 주택. 구조 보강이 필요함.",
    concept: "시간의 흔적 남기기",
    conceptDetails: [
      "기존의 붉은 벽돌 외관은 최대한 살리되, 답답한 벽을 털어내고 통유리(Curtain Wall)를 끼워 개방감 확보.",
      "철거한 폐자재(문짝, 타일)를 인테리어 소품으로 재활용(Upcycling)하여 공간의 기억을 보존.",
    ],
    whatIDid: [
      "기존 건물 실측 (현장 조사)",
      "철거 범위 설정",
      "내부 투시도",
    ],
    tools: ["Revit", "Enscape"],
    image: "/images/project-03.jpg",
  },
  {
    slug: "green-void",
    number: "04",
    category: "Office / Tower",
    title: "Green Void",
    subtitle: "숨 쉬는 오피스",
    location: "강남구 테헤란로 이면도로",
    problem:
      "빽빽한 빌딩 숲, 창문을 열 수 없는 답답한 업무 환경.",
    concept: "수직 정원 (Vertical Garden)",
    conceptDetails: [
      "건물 가운데를 비워내는 '보이드(Void)' 설계를 통해 빛과 바람이 들어오게 유도.",
      "각 층마다 휴게 테라스를 엇갈리게 배치하여, 위아래 층 사람들이 서로 보이고 소통할 수 있게 함.",
      "획일적인 유리 빌딩 사이에서 '초록색'이 보이는 휴식처 같은 입면 디자인.",
    ],
    whatIDid: [
      "오피스 기준층 코어(Core) 계획",
      "입면 디자인 스터디",
    ],
    tools: ["Rhino", "Grasshopper", "Illustrator"],
    image: "/images/project-04.jpg",
  },
  {
    slug: "alley-way",
    number: "05",
    category: "Urban Design",
    title: "Alley-Way",
    subtitle: "골목길 되살리기",
    location: "종로구 재래시장",
    problem:
      "불법 주차와 적치물로 걷기 불편한 시장 골목.",
    concept: "걷고 싶은 바닥 패턴",
    conceptDetails: [
      "차가 다니는 길과 사람이 다니는 길을 바닥 포장 재질(Paving)로 구분.",
      "시장 상인들이 물건을 진열할 수 있는 '모듈형 가판대(Street Furniture)'를 디자인하여 질서 정연하면서도 활기찬 분위기 조성.",
    ],
    whatIDid: [
      "현장 사진 매핑",
      "가로 시설물 디자인",
      "콜라주(Collage) 이미지",
    ],
    tools: ["Photoshop", "Illustrator"],
    image: "/images/project-05.jpg",
  },
  {
    slug: "module-shelter",
    number: "06",
    category: "Competition / Art",
    title: "Module Shelter",
    subtitle: "재난 대피소 공모전",
    location: "공모전 출품작",
    problem: "",
    concept: "누구나 조립 가능한 집",
    conceptDetails: [
      "육각 형태(Hexagon)의 모듈을 벌집처럼 이어 붙여 확장 가능.",
      "트럭 한 대에 실릴 수 있는 크기로 설계하여 운송 효율 극대화.",
      "접이식 가구 아이디어를 적용해 좁은 공간 활용도 높임.",
    ],
    whatIDid: [
      "아이디어 스케치",
      "모듈 결합 다이어그램",
      "패널 레이아웃",
    ],
    tools: ["SketchUp", "Photoshop"],
    image: "/images/project-06.jpg",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
