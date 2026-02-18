export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  tags: string[];
  content: string; // HTML string
}

export const defaultPosts: BlogPost[] = [
  {
    slug: "silence-of-concrete",
    title: "침묵하는 콘크리트 앞에서 : AI 시대, 건축가의 '생각'은 어디로 가는가?",
    category: "건축의 단상 (Thinking)",
    excerpt:
      "도구는 바뀌었지만, '고민의 무게'는 바뀌지 않았다. AI 시대에 건축가의 깊이란 무엇인가.",
    date: "2026-02-18",
    image: "/images/blog-01.jpg",
    tags: [
      "건축가",
      "건축학도",
      "AI건축",
      "공간철학",
      "건축포트폴리오",
      "DOYOUNGCOM",
    ],
    content: `<blockquote>"건축은 침묵과 빛으로 빚어낸 진실이다."<br>— Louis Kahn</blockquote>

<p>오후 4시의 햇살이 콘크리트 벽을 긁고 지나가는 시간.<br>벽에 붙은 트레이싱지 위에는 수십 번 고쳐 그린 평면도가 있고,<br>책상 위에는 정교하게 깎은 모형이 놓여 있습니다.</p>

<p>사진 속 저 선배님(혹은 스승님)은 지금 무슨 생각을 하고 계실까요?<br>아마도 중력에 대해, 재료의 물성에 대해, 그리고 이 공간에 머물 사람에 대해 치열하게 고민하고 계실 겁니다.</p>

<p>저 흑백 사진 속의 <strong>'밀도(Density)'</strong>.<br>이것이 제가 건축을 사랑하게 된 이유이자, 넘어야 할 거대한 산입니다.</p>

<h2>01. 손의 시대 vs 데이터의 시대</h2>

<p>저는 2000년대에 태어나 스마트폰과 함께 자랐고, 대학에서는 캐드(CAD)와 코딩을 배웠습니다.<br>선배님들이 로트링 펜으로 밤새워 그렸던 도면을, 저는 마우스 클릭 몇 번과 단축키로 그려냅니다.<br>최근에는 생성형 AI가 그 과정마저 단축시키고 있죠.</p>

<p>누군가는 묻습니다.<br><em>"AI가 다 해주면, 건축가의 '혼'은 어디에 있는가?"</em></p>

<p>저는 이 사진을 보며 그 답을 찾습니다.<br>도구는 바뀌었지만, <strong>'고민의 무게'</strong>는 바뀌지 않았기 때문입니다.</p>

<h2>02. Act Young, Think Deep.</h2>

<p>DOYOUNGCOM이 말하는 '젊음(Young)'은 단순히 도구를 빨리 다루는 것이 아닙니다.<br>AI에게 반복적인 작업과 수백 개의 시안 생성을 맡기고,<br>확보된 그 시간을 사진 속 저분처럼 '깊게 생각하는 데' 쓰는 것.</p>

<p>그것이 제가 지향하는 <strong>스마트한 건축(Smart Architecture)</strong>입니다.</p>

<p>AI는 '그리는(Drawing)' 시간을 줄여줍니다.</p>

<p>그 덕분에 저는 '짓는(Building)' 본질과 '사는(Living)' 사람에게 더 집중할 수 있습니다.</p>

<p>과거의 건축가가 100시간을 그려서 1시간을 고민했다면,<br>저는 1시간 만에 그려내고 100시간을 고민하고 싶습니다.<br>그것이 기술이 우리에게 준 진짜 선물 아닐까요?</p>

<h2>03. 연결(COM)을 위하여</h2>

<p>콘크리트 벽에 기대어 있는 저분의 고독은 아름답지만,<br>한편으로는 현장과의 괴리감이 느껴지기도 합니다.</p>

<p>저는 <strong>'고독한 예술가'</strong>보다는 <strong>'민첩한 조율자'</strong>가 되고 싶습니다.<br>복잡한 시공 현장과 클라이언트의 모호한 요구 사이에서,<br>데이터와 논리, 그리고 감각적인 시각화로 <strong>'명쾌한 해답'</strong>을 제시하는 건축가.</p>

<p>사진 속의 중후함은 아직 제 것이 아닙니다.<br>하지만 저 깊은 눈빛만큼은 닮고 싶습니다.</p>

<p><strong>가볍게 움직이되(Act Young),<br>생각의 뿌리는 단단하게(Think Deep).</strong></p>

<p>오늘도 저는 모니터 앞의 수많은 픽셀 속에서,<br>저 콘크리트 벽과 같은 단단한 가치를 찾습니다.</p>`,
  },
];
