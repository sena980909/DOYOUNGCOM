export interface SkillItem {
  name: string;
  level: number; // 1-5
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface HistoryItem {
  label: string;
  description: string;
}

export interface Profile {
  name: string;
  nameEn: string;
  birth: string;
  education: string;
  contact: string;
  instagram: string;
  instagramUrl: string;
  tagline: string;
  aboutMe: string;
  doDescription: string;
  youngDescription: string;
  comDescription: string;
  history: HistoryItem[];
  skills: SkillCategory[];
  photo: string;
}

export const defaultProfile: Profile = {
  name: "두영컴",
  nameEn: "DOYOUNGCOM",
  birth: "200X.XX.XX",
  education: "XX대학교 건축학과 (5년제)",
  contact: "doyoungcom@gmail.com",
  instagram: "@do__zip",
  instagramUrl: "https://instagram.com/do__zip",
  tagline: "Engineer's Logic, Designer's Sense.",
  aboutMe:
    "건축을 전공하며, 설계와 기술 사이의 균형을 추구합니다.\nAI와 디지털 도구를 적극적으로 활용하여, 전통적인 건축의 한계를 넘어 새로운 공간적 가능성을 탐색합니다.",
  doDescription:
    "실행하다 (Act) — 생각에 머무르지 않고, 빠르게 실행합니다.",
  youngDescription:
    "젊다 (Fresh) — 관성을 거부하고, 항상 새로운 시각을 유지합니다.",
  comDescription:
    "소통하다 (Communicate) — 복잡함을 단순하게 번역하여 전달합니다.",
  history: [
    { label: "XX대학교 건축학과 재학", description: "5년제" },
    { label: "XX 건축사사무소 인턴", description: "" },
    { label: "XX 공모전 입상", description: "" },
  ],
  skills: [
    {
      category: "Design",
      items: [
        { name: "Rhino", level: 4 },
        { name: "SketchUp", level: 4 },
        { name: "AutoCAD", level: 4 },
      ],
    },
    {
      category: "Visualization",
      items: [
        { name: "Lumion", level: 4 },
        { name: "V-Ray", level: 3 },
        { name: "Photoshop", level: 4 },
        { name: "Illustrator", level: 3 },
      ],
    },
    {
      category: "Engineering",
      items: [{ name: "Revit", level: 3 }],
    },
  ],
  photo: "",
};
