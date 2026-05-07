import { siteConfig } from "@/config/site";
import type { ArticleCardItem, ArticleDetail, AuthorSummary, CategorySummary } from "@/lib/content-types";

const categoryDescriptions: Record<string, string> = {
  "Constitutional Law": "Constitutional interpretation, institutions, separation of powers, and public accountability.",
  "Criminal Law": "Criminal justice, procedure, sentencing, rights of suspects, and reform analysis.",
  "Administrative Law": "Administrative procedure, public authorities, judicial review, and regulatory practice.",
  "Corporate Law": "Companies, governance, transactions, compliance, financial regulation, and commercial practice.",
  "Human Rights": "Rights-based analysis across domestic, European, and international legal frameworks.",
  "Court Decisions": "Case comments and careful reading of notable judgments and procedural developments.",
  "Student Research": "Emerging scholarly work by law students and early-career researchers."
};

export const demoCategories: CategorySummary[] = siteConfig.categories.map((name, index) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    name,
    slug,
    description: categoryDescriptions[name] ?? "Legal scholarship, analysis, and commentary.",
    count: Math.max(3, 18 - index)
  };
});

export const demoAuthors: AuthorSummary[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    fullName: "Aysel Mammadova",
    username: "aysel_mammadova",
    avatarUrl: null,
    bio: "LL.M. candidate researching administrative justice and constitutional remedies in Azerbaijan.",
    university: "Baku State University",
    workplace: null,
    interests: ["Administrative Law", "Human Rights", "Legal Reform"],
    socialLinks: { linkedin: "https://linkedin.com" },
    role: "author",
    totalViews: 18400,
    totalLikes: 1240,
    publishedCount: 16
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    fullName: "Murad Aliyev",
    username: "murad_aliyev",
    avatarUrl: null,
    bio: "Corporate lawyer focused on governance, capital markets, and practical legal writing.",
    university: null,
    workplace: "Caspian Legal Group",
    interests: ["Corporate Law", "Tax Law", "EU Law"],
    socialLinks: { linkedin: "https://linkedin.com", website: "https://example.com" },
    role: "editor",
    totalViews: 26700,
    totalLikes: 1910,
    publishedCount: 23
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    fullName: "Nigar Hasanli",
    username: "nigar_hasanli",
    avatarUrl: null,
    bio: "Research assistant writing about criminal procedure, evidence, and fair trial guarantees.",
    university: "ADA University",
    workplace: null,
    interests: ["Criminal Law", "Court Decisions", "Human Rights"],
    socialLinks: { linkedin: "https://linkedin.com" },
    role: "author",
    totalViews: 12100,
    totalLikes: 880,
    publishedCount: 11
  }
];

const [administrativeLaw, corporateLaw, humanRights, courtDecisions, legalReform] = [
  demoCategories[2],
  demoCategories[3],
  demoCategories[7],
  demoCategories[11],
  demoCategories[12]
];

export const demoArticles: ArticleCardItem[] = [
  {
    id: "aaaaaaaa-0000-4000-8000-000000000001",
    title: "İnzibati susma və effektiv müdafiə hüququ",
    slug: "administrative-silence-effective-remedy",
    subtitle: "Prosessual müddətlərin dövlət idarəçiliyinə etibar üçün əhəmiyyəti.",
    abstract:
      "İnzibati susma vətəndaşlarla real müdafiə vasitələri arasında ən praktik maneələrdən biridir. Bu qeyd daha aydın hüquqi nəticələr, inzibati praktikanın daha yaxşı açıqlanması və institusional gecikməyə uyğun məhkəmə müdafiəsi təklif edir.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    language: "az",
    category: administrativeLaw,
    author: demoAuthors[0],
    status: "approved",
    viewsCount: 8420,
    likesCount: 612,
    readingTime: 8,
    publishedAt: "2026-04-17T09:00:00.000Z",
    createdAt: "2026-04-14T09:00:00.000Z",
    updatedAt: "2026-04-17T09:00:00.000Z",
    tags: ["public administration", "remedies", "procedure"]
  },
  {
    id: "aaaaaaaa-0000-4000-8000-000000000002",
    title: "Corporate Governance Lessons from Minority Shareholder Disputes",
    slug: "corporate-governance-minority-shareholder-disputes",
    subtitle: "A practical view of transparency, fiduciary duties, and evidence.",
    abstract:
      "Minority shareholder disputes expose the distance between formal rights and real access to information. This article maps recurring governance failures and proposes a more disciplined approach to documentation and board decision-making.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    language: "en",
    category: corporateLaw,
    author: demoAuthors[1],
    status: "approved",
    viewsCount: 11300,
    likesCount: 790,
    readingTime: 11,
    publishedAt: "2026-04-08T10:00:00.000Z",
    createdAt: "2026-04-02T10:00:00.000Z",
    updatedAt: "2026-04-08T10:00:00.000Z",
    tags: ["governance", "shareholders", "companies"]
  },
  {
    id: "aaaaaaaa-0000-4000-8000-000000000003",
    title: "Мотивированные судебные решения как гарантия справедливого суда",
    slug: "reasoned-judgments-fair-trial-guarantee",
    subtitle: "Разница между разрешением дела и объяснением права.",
    abstract:
      "Мотивированные решения не являются формальностью. Они делают апелляционный пересмотр возможным, ограничивают произвол и помогают юридическому сообществу учиться на судебной практике.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    language: "ru",
    category: courtDecisions,
    author: demoAuthors[2],
    status: "approved",
    viewsCount: 7600,
    likesCount: 544,
    readingTime: 9,
    publishedAt: "2026-03-29T10:00:00.000Z",
    createdAt: "2026-03-25T10:00:00.000Z",
    updatedAt: "2026-03-29T10:00:00.000Z",
    tags: ["fair trial", "judgments", "evidence"]
  },
  {
    id: "aaaaaaaa-0000-4000-8000-000000000004",
    title: "Hüquq klinikaları və tələbə araşdırmalarının gələcəyi",
    slug: "legal-clinics-future-student-research",
    subtitle: "Auditoriya təhlilini ictimai hüquqi biliyə çevirmək.",
    abstract:
      "Hüquq klinikaları doktrinal təhsil ilə ictimai xidmət arasında körpü yarada bilər. Bu model tələbələrə araşdırma qeydləri, qərar şərhləri və islahat ideyalarını redaksiya nəzarəti ilə dərc etmək imkanı verir.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    language: "az",
    category: legalReform,
    author: demoAuthors[0],
    status: "approved",
    viewsCount: 5200,
    likesCount: 430,
    readingTime: 6,
    publishedAt: "2026-03-18T10:00:00.000Z",
    createdAt: "2026-03-14T10:00:00.000Z",
    updatedAt: "2026-03-18T10:00:00.000Z",
    tags: ["education", "clinics", "research culture"]
  },
  {
    id: "aaaaaaaa-0000-4000-8000-000000000005",
    title: "Анализ воздействия на права человека в публичных решениях",
    slug: "human-rights-impact-analysis-public-decision-making",
    subtitle: "Небольшая институциональная привычка с большой ценностью для верховенства права.",
    abstract:
      "Публичные органы могут снижать риски для прав до возникновения споров, фиксируя анализ воздействия на права человека. Статья предлагает практичную рамку для политических команд и административных юристов.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80",
    language: "ru",
    category: humanRights,
    author: demoAuthors[2],
    status: "approved",
    viewsCount: 9100,
    likesCount: 701,
    readingTime: 10,
    publishedAt: "2026-03-02T10:00:00.000Z",
    createdAt: "2026-02-26T10:00:00.000Z",
    updatedAt: "2026-03-02T10:00:00.000Z",
    tags: ["rights", "policy", "public law"]
  }
];

function demoContent(article: ArticleCardItem) {
  if (article.language === "az") {
    return `
    <h2 id="kontekst">Kontekst</h2>
    <p>${article.abstract}</p>
    <p>Ciddi hüquqi nəşr mədəniyyəti aydın problem, diqqətli mənbələr və doktrinanı institutlarla bağlayan yazı tələb edir. Gənc hüquqşünaslar və tədqiqatçılar üçün bu, qısa şərhlərdən kənara çıxıb yoxlanıla, istinad edilə və inkişaf etdirilə bilən arqumentlər qurmaq deməkdir.</p>
    <h2 id="huquqi-problem">Hüquqi problem</h2>
    <p>Əsas məsələ yalnız qaydanın mövcudluğu deyil, həmin qaydanın ondan təsirlənən şəxslər tərəfindən anlaşıla və istifadə oluna bilməsidir. Hüquqi müəyyənlik sabit prosedurlar, açıq əsaslandırma və mübahisəni təhlilə çevirən yazılı iz tələb edir.</p>
    <blockquote>Hüquqi təhlil praktika, prosedur və prinsipi eyni ictimai müzakirənin hissələri kimi oxuyanda daha güclü olur.</blockquote>
    <h2 id="tehlil">Təhlil</h2>
    <p>Üç sual faydalıdır. Hüquqi çərçivə təsirlənən şəxslərə real dinlənilmə imkanı verirmi? Qərar qəbul edənlər əsas səbəbləri izah edirmi? Məhkəmələr və ya nəzarət orqanları problemi başqa sahədə qeyri-müəyyənlik yaratmadan düzəldə bilirmi?</p>
    <h3 id="praktik-neticeler">Praktik nəticələr</h3>
    <p>Praktiklər üçün dərs sübut bazasını erkən qorumaqdır. Tələbələr üçün dərs şüarlarla deyil, mənbələrlə yazmaqdır. İnstitutlar üçün dərs hüquqi əsaslandırmanı yoxlanıla bilən etməkdir.</p>
    <h2 id="netice">Nəticə</h2>
    <p>Azərbaycanın gənc hüquq icması intizamlı təhlillər dərc etməklə hüquqi mədəniyyəti gücləndirə bilər. Belə platformanın dəyəri təkcə sürət deyil; ciddi hüquqi ideyalara peşəkar məkan verməsidir.</p>
  `;
  }

  if (article.language === "ru") {
    return `
    <h2 id="context">Контекст</h2>
    <p>${article.abstract}</p>
    <p>Серьезная культура правовых публикаций требует ясных проблем, аккуратных источников и письма, которое связывает доктрину с институтами. Для молодых юристов и исследователей это означает переход от коротких комментариев к аргументам, которые можно проверять, цитировать и развивать.</p>
    <h2 id="legal-problem">Правовая проблема</h2>
    <p>Главный вопрос не только в существовании нормы, но и в том, могут ли затронутые лица понять и использовать ее. Правовая определенность требует устойчивых процедур, публичного обоснования и записей, которые превращают спор в анализ, а не в предположения.</p>
    <blockquote>Правовой анализ сильнее, когда рассматривает практику, процедуру и принцип как части одного публичного разговора.</blockquote>
    <h2 id="analysis">Анализ</h2>
    <p>Полезны три вопроса. Дает ли правовая рамка затронутым лицам реальный путь быть услышанными? Объясняют ли принимающие решения органы существенные причины? Могут ли суды или органы пересмотра исправить проблему без новой неопределенности?</p>
    <h3 id="practical-implications">Практические последствия</h3>
    <p>Для практиков урок состоит в раннем сохранении материалов дела. Для студентов — писать с источниками, а не лозунгами. Для институтов — делать правовое обоснование доступным для проверки.</p>
    <h2 id="conclusion">Заключение</h2>
    <p>Молодое правовое сообщество Азербайджана может укреплять правовую культуру через дисциплинированный анализ. Ценность такой платформы не только в скорости, а в профессиональном доме для серьезных правовых идей.</p>
  `;
  }

  return `
    <h2 id="context">Context</h2>
    <p>${article.abstract}</p>
    <p>A serious legal publishing culture depends on clear problems, careful sources, and writing that connects doctrine to institutions. For young lawyers and researchers, this means moving beyond short commentary and building arguments that can be reviewed, cited, and improved.</p>
    <h2 id="legal-problem">The Legal Problem</h2>
    <p>The central issue is not only whether the current rule exists, but whether it can be understood and used by the people affected by it. Legal certainty requires stable procedures, public reasoning, and a record that allows disagreement to become analysis rather than speculation.</p>
    <blockquote>Legal analysis is strongest when it treats practice, procedure, and principle as parts of the same public conversation.</blockquote>
    <h2 id="analysis">Analysis</h2>
    <p>Three questions are useful. First, does the legal framework give affected persons a realistic route to be heard? Second, do decision-makers explain the reasons that matter? Third, can courts or reviewing bodies correct the problem without creating uncertainty elsewhere?</p>
    <p>The answers will differ across public law, commercial law, criminal procedure, and human rights. Still, the method is shared: identify the rule, test it against institutional practice, and propose reform with enough precision that another lawyer can challenge it.</p>
    <h3 id="practical-implications">Practical Implications</h3>
    <p>For practitioners, the practical lesson is to preserve the record early. For students, the lesson is to write with sources, not slogans. For institutions, the lesson is to make legal reasoning easier to inspect.</p>
    <h2 id="conclusion">Conclusion</h2>
    <p>Azerbaijan's young legal community can strengthen legal culture by publishing disciplined analysis. The value of a platform like this is not speed alone; it is giving serious legal ideas a professional home.</p>
  `;
}

export const demoArticleDetails: ArticleDetail[] = demoArticles.map((article, index) => ({
  ...article,
  content: demoContent(article),
  related: demoArticles.filter((candidate) => candidate.id !== article.id).slice(index % 2, index % 2 + 3)
}));
