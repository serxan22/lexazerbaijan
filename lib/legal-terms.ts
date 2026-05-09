export type LegalTerm = {
  term: {
    en: string;
    az: string;
    ru: string;
  };
  definition: {
    en: string;
    az: string;
    ru: string;
  };
};

export const legalTerms: LegalTerm[] = [
  {
    term: {
      en: "Mens rea",
      az: "Mens rea",
      ru: "Mens rea"
    },
    definition: {
      en: "The mental element or criminal intent required for liability.",
      az: "Cinayət məsuliyyəti üçün tələb olunan subyektiv niyyət elementi.",
      ru: "Психологический элемент или преступный умысел для уголовной ответственности."
    }
  },
  {
    term: {
      en: "Actus reus",
      az: "Actus reus",
      ru: "Actus reus"
    },
    definition: {
      en: "The physical act that forms the basis of a criminal offense.",
      az: "Cinayət əməlini təşkil edən fiziki hərəkət.",
      ru: "Физическое действие, образующее состав преступления."
    }
  },
  {
    term: {
      en: "Ultra vires",
      az: "Ultra vires",
      ru: "Ultra vires"
    },
    definition: {
      en: "An action taken beyond legal authority or power.",
      az: "Qanuni səlahiyyətdən kənar həyata keçirilən hərəkət.",
      ru: "Действие, совершённое за пределами законных полномочий."
    }
  },
  {
    term: {
      en: "Due diligence",
      az: "Due diligence",
      ru: "Due diligence"
    },
    definition: {
      en: "Reasonable investigation and care before making a legal or business decision.",
      az: "Hüquqi və ya biznes qərarı verməzdən əvvəl lazımi araşdırma və ehtiyatlılıq.",
      ru: "Разумная проверка и осторожность перед принятием юридического или бизнес-решения."
    }
  },
  {
    term: {
      en: "Subsidiarity",
      az: "Subsidiarlıq prinsipi",
      ru: "Принцип субсидиарности"
    },
    definition: {
      en: "Principle that decisions should be made at the closest effective level.",
      az: "Qərarların ən yaxın və effektiv səviyyədə qəbul edilməsini nəzərdə tutan prinsip.",
      ru: "Принцип принятия решений на максимально близком и эффективном уровне."
    }
  },
  {
    term: {
      en: "Stare decisis",
      az: "Stare decisis",
      ru: "Stare decisis"
    },
    definition: {
      en: "Doctrine requiring courts to follow legal precedents.",
      az: "Məhkəmələrin əvvəlki presedentlərə əməl etməsini tələb edən prinsip.",
      ru: "Доктрина, требующая следования судебным прецедентам."
    }
  }
];
