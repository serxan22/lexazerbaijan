import { siteConfig } from "@/config/site";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/i18n-config";

const categoryKeys = [
  "constitutional-law",
  "criminal-law",
  "administrative-law",
  "corporate-law",
  "civil-law",
  "international-law",
  "eu-law",
  "human-rights",
  "labor-law",
  "tax-law",
  "legal-theory",
  "court-decisions",
  "legal-reform",
  "student-research"
] as const;

type CategorySlug = (typeof categoryKeys)[number];

export const dictionaries = {
  en: {
    site: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      description:
        "A modern legal knowledge hub for Azerbaijan's students, researchers, lawyers, and academics.",
      journal: "Legal journal",
      location: "Azerbaijan",
      fallbackMember: "LexAzerbaijan member",
      legalContributor: "Legal contributor",
      legalAuthor: "Legal author",
      independentResearcher: "Independent researcher",
      legalCommunity: "Azerbaijan legal community"
    },
    nav: {
      articles: "Articles",
      comingSoon: "Coming soon",
      categories: "Categories",
      authors: "Authors",
      about: "About",
      practiceAreas: "Practice Areas",
      explore: "Explore",
      exploreArticles: "Explore Articles",
      submitArticle: "Submit Article",
      submitYourArticle: "Submit Your Article",
      login: "Login",
      dashboard: "Dashboard",
      publicProfile: "Public profile",
      admin: "Admin",
      signOut: "Sign out",
      navigation: "Navigation",
      language: "Language",
      discussions: "Discussions",
      cases: "Cases",
      usCases: "US Cases",
      echrCases: "ECHR Cases",
      euCases: "EU Cases",
      askLexAI: "Ask LexAI"
    },
    footer: {
      body:
        "A professional platform for legal scholarship, case comments, legal opinions, and reform-minded analysis by Azerbaijan's young legal community.",
      platform: "Platform",
      legal: "Legal",
      editorialPolicy: "Editorial Policy",
      contact: "Contact",
      disclaimer: "Disclaimer",
      disclaimerBody:
        "Articles are for educational and informational purposes only. They do not constitute legal advice and do not create a lawyer-client relationship.",
      rights: "All rights reserved.",
      reviewed: "Reviewed publishing for serious legal ideas."
    },
    common: {
      search: "Search",
      searchArticles: "Search articles",
      filter: "Filter",
      category: "Category",
      sortArticles: "Sort articles",
      latest: "Latest",
      mostLiked: "Most liked",
      mostViewed: "Most viewed",
      allCategories: "All categories",
      uncategorized: "Uncategorized",
      readingTime: "Reading time",
      minuteShort: "min",
      views: "Views",
      likes: "Likes",
      comments: "Comments",
      articles: "Articles",
      comingSoon: "Coming soon",
      published: "Published",
      pending: "Pending",
      edit: "Edit",
      delete: "Delete",
      submit: "Submit",
      save: "Save",
      saveDraft: "Save draft",
      approve: "Approve",
      reject: "Reject",
      report: "Report",
      bookmark: "Bookmark",
      share: "Share",
      send: "Send",
      subscribe: "Subscribe",
      loading: "Loading legal analysis...",
      unpublished: "Unpublished",
      updated: "Updated",
      view: "View",
      saving: "Saving...",
      sending: "Sending...",
      submitting: "Submitting...",
      posting: "Posting comment...",
      noReports: "No reports.",
      headerSearchPlaceholder: "Search articles...",
      headerSearchNoResults: "No matching articles found.",
      headerSearchSearching: "Searching...",
      recentlySearched: "Recently searched",
      popularSearches: "Popular searches",
      toggleTheme: "Toggle color theme",
      lightMode: "Light",
      darkMode: "Dark",
      openSection: "Open section",
      summarizeCase: "Summarize case",
      officialSource: "Official source",
      loadingSummary: "Generating summary...",
      summarizeArticle: "Summarize article",
      articleSummary: "LexAI article summary"
    },
    status: {
      draft: "Draft",
      pending_review: "Pending review",
      approved: "Approved",
      rejected: "Rejected"
    },
    languages: {
      en: "English",
      az: "Azerbaijani",
      ru: "Russian"
    },
    roles: {
      user: "User",
      author: "Author",
      editor: "Editor",
      admin: "Admin"
    },
    messages: {
      checkFields: "Check the highlighted fields.",
      articleSubmissionLimit: "Article submission limit reached. Please try again later.",
      coverTooLarge: "Cover image must be smaller than 5 MB.",
      coverUploadFailed: "Cover upload failed.",
      unableToSaveArticle: "Unable to save article.",
      commentTooShort: "Comment is too short.",
      commentRateLimit: "You are commenting too quickly. Please wait a moment.",
      commentPosted: "Comment posted.",
      reportClearReason: "Please give a clear reason.",
      reportLimit: "Report limit reached. Please try again later.",
      reportReceived: "Report received for editorial review.",
      rejectionReason: "Add a clear rejection reason.",
      articleRejected: "Article rejected with reason.",
      validRole: "Choose a valid role.",
      roleUpdated: "Role updated.",
      categoryFields: "Check the category fields.",
      categorySaved: "Category saved.",
      articleUpdated: "Article updated.",
      newsletterRateLimit: "Too many newsletter requests. Please try again later.",
      validEmail: "Enter a valid email address.",
      subscribed: "You're subscribed.",
      contactRateLimit: "Too many contact requests. Please try again later.",
      messageSent: "Message sent. The editorial team will respond soon.",
      accountCreated: "Account created. Check your email to confirm your account, then sign in.",
      passwordResetSent: "Password reset instructions have been sent.",
      sourcesHeading: "Sources / References",
      deletedArticle: "Deleted article"
    },
    categories: {
      "constitutional-law": {
        name: "Constitutional Law",
        description: "Constitutional interpretation, institutions, separation of powers, and public accountability."
      },
      "criminal-law": {
        name: "Criminal Law",
        description: "Criminal justice, procedure, sentencing, rights of suspects, and reform analysis."
      },
      "administrative-law": {
        name: "Administrative Law",
        description: "Administrative procedure, public authorities, judicial review, and regulatory practice."
      },
      "corporate-law": {
        name: "Corporate Law",
        description: "Companies, governance, transactions, compliance, financial regulation, and commercial practice."
      },
      "civil-law": {
        name: "Civil Law",
        description: "Private law, obligations, property, family law, and civil procedure."
      },
      "international-law": {
        name: "International Law",
        description: "Public international law, treaties, international institutions, and cross-border analysis."
      },
      "eu-law": {
        name: "EU Law",
        description: "European Union law, approximation, comparative regulation, and integration analysis."
      },
      "human-rights": {
        name: "Human Rights",
        description: "Domestic, European, and international human rights analysis."
      },
      "labor-law": {
        name: "Labor Law",
        description: "Employment law, workplace rights, labor relations, and social protection."
      },
      "tax-law": {
        name: "Tax Law",
        description: "Taxation, fiscal policy, compliance, and tax dispute analysis."
      },
      "legal-theory": {
        name: "Legal Theory",
        description: "Jurisprudence, legal method, interpretation, and philosophy of law."
      },
      "court-decisions": {
        name: "Court Decisions",
        description: "Case comments and careful reading of notable judgments and procedural developments."
      },
      "legal-reform": {
        name: "Legal Reform",
        description: "Legal gaps, institutional reform, policy proposals, and legislative analysis."
      },
      "student-research": {
        name: "Student Research",
        description: "Reviewed legal writing by students and early-career researchers."
      }
    },
    home: {
      eyebrow: "LexAzerbaijan",
      headline: "A modern platform for legal ideas, analysis, and young legal voices.",
      subheadline:
        "Publish legal articles, case comments, research notes, legal opinions, and reform analysis with a serious editorial standard for Azerbaijan's legal community.",
      proof: [
        ["Reviewed publishing", "Draft, pending review, approved, and rejected workflows"],
        ["Legal community", "Students, researchers, lawyers, academics, and editors"],
        ["Knowledge hub", "Public law, corporate law, human rights, EU law, and more"]
      ],
      storyKicker: "Legal knowledge infrastructure",
      storyHeadline: "Azerbaijan's legal ideas deserve a platform with editorial gravity.",
      storyBody:
        "LexAzerbaijan brings legal publishing, professional discussion, case-law discovery, author portfolios, and responsible AI assistance into one calm research environment.",
      storyPrimaryCta: "Browse articles",
      storySecondaryCta: "Submit article",
      storyScrollHint: "Scroll through the platform",
      storyFrames: [
        {
          eyebrow: "Frame 01",
          title: "A modern legal knowledge platform for Azerbaijan.",
          body: "Built for students, lawyers, researchers, academics, public sector candidates, and young professionals who want legal work to be discoverable and credible.",
          signal: "Research, education, and professional visibility"
        },
        {
          eyebrow: "Frame 02",
          title: "Publish legal articles with a serious editorial surface.",
          body: "Article cards, categories, reading metadata, references, comments, likes, bookmarks, and sharing are organized around legal substance rather than noise.",
          signal: "Articles and legal research"
        },
        {
          eyebrow: "Frame 03",
          title: "Discuss legal issues in a professional debate room.",
          body: "Discussions are presented as structured legal threads, with author context, reply counts, moderation readiness, and a tone suited for legal argument.",
          signal: "Community without casual-feed chaos"
        },
        {
          eyebrow: "Frame 04",
          title: "Ask LexAI as a research assistant, not a toy chatbot.",
          body: "LexAI supports concept explanation, structure suggestions, case summarization, drafting help, and research orientation with a clear legal-advice disclaimer.",
          signal: "Responsible AI assistance"
        },
        {
          eyebrow: "Frame 05",
          title: "Explore case-law from multiple legal traditions.",
          body: "US, ECHR, and EU case areas are framed as selected research gateways with search, court metadata, citations, sources, and LexAI summaries where available.",
          signal: "US, ECHR, and EU cases"
        },
        {
          eyebrow: "Frame 06",
          title: "Turn writing into a public legal portfolio.",
          body: "Author profiles highlight biography, affiliations, articles, views, likes, interests, verification, and contribution signals for professional discovery.",
          signal: "Author profiles and credibility"
        },
        {
          eyebrow: "Frame 07",
          title: "Move from idea to editorial review with clarity.",
          body: "The submission experience guides contributors through idea, draft, sources, confirmations, and pending review while preserving Supabase-backed workflows.",
          signal: "Idea to Draft to Sources to Review"
        },
        {
          eyebrow: "Frame 08",
          title: "Join the research culture.",
          body: "Read legal analysis, contribute reviewed writing, join discussions, search cases, build your profile, and use LexAI responsibly.",
          signal: "Articles, discussions, LexAI, cases"
        }
      ],
      cinematic: {
        heroEyebrow: "LexAzerbaijan",
        heroTitle: "The legal knowledge layer of Azerbaijan.",
        heroBody:
          "A premium legal-tech platform for publishing research, debating legal ideas, exploring case-law, building legal portfolios, and using LexAI responsibly.",
        ctaExplore: "Explore Articles",
        ctaSubmit: "Submit Article",
        ctaLexAi: "Try LexAI",
        statArticles: "Research signals",
        statAuthors: "Contributors",
        statFields: "Legal fields",
        frameProgressLabel: "Frame",
        archiveLabel: "Editorial archive",
        intelligenceLabel: "Legal intelligence",
        previewQuestion: "Can LexAI structure a human-rights case note?",
        previewAnswer:
          "It can outline issues, authorities, arguments, and cautions while reminding you to verify the law.",
        knowledgeMapLabel: "Knowledge map",
        editorialStatusLabel: "Editorial path",
        discussionCards: [
          {
            tag: "Constitutional Law",
            title: "How should proportionality review develop?",
            body: "A structured debate format for doctrinal questions, reform proposals, and comparative reasoning.",
            meta: "12 replies"
          },
          {
            tag: "Human Rights",
            title: "Balancing public interest and individual guarantees",
            body: "Professional threads keep legal arguments, sources, and counterpoints in a readable research room.",
            meta: "8 replies"
          },
          {
            tag: "Commercial Practice",
            title: "What makes a contract note useful for young lawyers?",
            body: "Topic clusters help writers turn practical observations into reusable legal knowledge.",
            meta: "5 replies"
          }
        ],
        topicChips: ["Public law", "Human rights", "Commercial practice", "EU law", "Court decisions", "Legal reform"],
        lexAiUserMessage: "Summarize the legal issue and suggest an article structure.",
        lexAiAnswer:
          "LexAI can map the issue, separate authorities from commentary, propose headings, and flag verification points.",
        caseSearchPlaceholder: "Search cases across selected sources",
        caseCards: [
          {
            court: "US",
            title: "CourtListener gateway",
            body: "Search selected federal and state opinions, then summarize available text with LexAI.",
            href: "/cases"
          },
          {
            court: "ECHR",
            title: "HUDOC gateway",
            body: "Explore European human-rights judgments with application metadata and summaries.",
            href: "/echr-cases"
          },
          {
            court: "EU",
            title: "EU case-law gateway",
            body: "Browse selected CJEU and General Court decisions for comparative research.",
            href: "/eu-cases"
          }
        ],
        portfolioSignal:
          "Profiles turn reviewed writing into a professional legal portfolio with articles, views, likes, interests, and contribution signals.",
        pipelineSteps: ["Idea", "Draft", "Sources", "Submit", "Editorial Review", "Published"],
        reviewNote:
          "The workflow keeps authorship, originality, sources, AI acknowledgement, and editorial review visible before publication.",
        commandEyebrow: "Live platform index",
        commandTitle: "The homepage becomes a legal command center.",
        commandBody:
          "Latest writing, contributor visibility, legal fields, AI assistance, cases, and discussion routes stay connected without returning to a simple blog feed.",
        finalEyebrow: "Enter the institution",
        finalTitle: "Read, publish, debate, research, and build your legal identity.",
        finalBody:
          "LexAzerbaijan brings the public-facing legal community into one premium research surface.",
        frames: [
          {
            eyebrow: "Frame 01",
            title: "The Legal Knowledge Layer of Azerbaijan",
            body: "A cinematic entry into articles, research, cases, community discussion, and responsible legal AI.",
            cta: "Explore the platform"
          },
          {
            eyebrow: "Frame 02",
            title: "Publish Legal Research",
            body: "Contributors can turn legal analysis, case comments, reform notes, and academic writing into reviewed public work.",
            cta: "Submit an article"
          },
          {
            eyebrow: "Frame 03",
            title: "Discuss Legal Ideas",
            body: "Discussions are shaped as serious legal debate rooms with topic clusters, replies, and professional context.",
            cta: "Join discussions"
          },
          {
            eyebrow: "Frame 04",
            title: "LexAI Legal Assistant",
            body: "Ask for structure, issue mapping, explanations, summaries, and research orientation while keeping legal judgement human.",
            cta: "Open LexAI"
          },
          {
            eyebrow: "Frame 05",
            title: "Explore Cases",
            body: "Search selected US, ECHR, and EU case-law gateways with court metadata and LexAI summary concepts.",
            cta: "Explore cases"
          },
          {
            eyebrow: "Frame 06",
            title: "Build Your Legal Portfolio",
            body: "Author profiles help serious writers become discoverable through articles, engagement, interests, and credentials.",
            cta: "View authors"
          },
          {
            eyebrow: "Frame 07",
            title: "From Draft to Review",
            body: "The submission path makes idea, draft, sources, confirmations, and editorial review feel clear and trustworthy.",
            cta: "Start submitting"
          },
          {
            eyebrow: "Frame 08",
            title: "One Premium Legal Surface",
            body: "Articles, discussions, LexAI, cases, authors, bookmarks, and dashboards converge into a modern legal institution.",
            cta: "Explore articles"
          }
        ]
      },
      featuredEyebrow: "Featured analysis",
      featuredTitle: "Editor-selected legal writing",
      latestEyebrow: "Latest articles",
      latestTitle: "New legal ideas and case notes",
      categoriesEyebrow: "Categories",
      categoriesTitle: "Browse by legal field",
      categoriesBody: "From constitutional law to student research, categories keep serious legal work discoverable.",
      whyEyebrow: "Why publish here?",
      whyTitle: "A serious home for early legal scholarship.",
      whyBody:
        "LexAzerbaijan is designed for legal writing that deserves more than a social media post and less friction than a traditional journal submission.",
      whyCards: [
        ["Build a credible legal portfolio", "Students and young lawyers can collect reviewed writing in one public professional profile."],
        ["Editorial review before publication", "Submissions are checked for relevance, originality, tone, and basic legal quality."],
        ["Research culture for Azerbaijan", "The platform makes doctrinal notes, case comments, and reform ideas easier to find and cite."]
      ],
      topAuthorsEyebrow: "Top authors",
      topAuthorsTitle: "Trusted voices in the community",
      viewAuthors: "View authors",
      newsletterTitle: "Follow new legal writing",
      newsletterBody:
        "Receive editor-selected articles, case comments, and legal reform notes from Azerbaijan's young legal community.",
      dailyTermsEyebrow: "Daily Legal Learning",
      dailyTermsTitle: "Today's Legal Terms",
      dailyTermsBody: "Learn important legal terminology through short professional explanations updated daily."
    },
    pages: {
      articlesTitle: "Legal analysis library",
      articlesBody: "Search approved public articles, legal opinions, court decision comments, and research notes.",
      articlesDescription: "Browse legal articles, analysis, case comments, research notes, and legal opinions.",
      noArticlesTitle: "No articles found",
      noArticlesBody: "Try a different search term, category, or sort option.",
      categoriesTitle: "Legal fields and topics",
      categoriesBody:
        "Explore public law, corporate practice, criminal justice, international law, EU law, human rights, and student research.",
      authorsTitle: "Legal voices",
      authorsBody:
        "Students, researchers, lawyers, and academics building public legal portfolios through reviewed writing.",
      authorsDescription: "Discover authors publishing legal analysis on LexAzerbaijan.",
      aboutTitle:
        "Promoting legal research culture, academic discussion, and young legal voices in Azerbaijan.",
      aboutBody:
        "LexAzerbaijan exists to give serious legal writing a professional home: articles, case comments, legal reform ideas, research notes, and academic-style posts that help the community reason together.",
      aboutCards: [
        ["For students", "A place to publish reviewed legal research and build a visible portfolio before entering practice."],
        ["For professionals", "A disciplined outlet for legal opinions, case notes, and practical analysis across practice areas."],
        ["For academia", "A bridge between academic legal writing and public professional discussion."]
      ],
      editorialStandard: "Editorial standard",
      editorialStandardBody:
        "The platform is built around reviewed publishing. Articles should be original, properly sourced, written in a professional tone, and useful to readers who care about Azerbaijani law, comparative law, institutions, courts, reform, and legal education.",
      contactTitle: "Reach the editorial team",
      contactBody: "Send questions about submissions, editorial review, partnerships, or platform support.",
      contactCards: [
        ["Editorial email", "editorial@lexazerbaijan.az"],
        ["Submission questions", "Ask about categories, review status, or article scope."],
        ["Legal disclaimer", "Contact responses do not constitute legal advice."]
      ],
      policyTitle: "Reviewed legal publishing standards",
      policyBody:
        "Articles are reviewed before publication. The goal is to protect scholarly quality, professional tone, reader trust, and the integrity of the legal community.",
      policyCards: [
        ["Review before publication", "Submitted articles enter pending review and become public only after approval by an editor or admin."],
        ["No plagiarism", "Authors must submit original writing and cite sources, judgments, legislation, and academic materials fairly."],
        ["No hate speech or attacks", "Personal attacks, harassment, discriminatory speech, and abusive commentary are not allowed."],
        ["Educational purpose", "Legal information should help readers understand law and policy; it should not mislead readers into treating articles as legal advice."]
      ],
      legalDisclaimer: "Legal disclaimer",
      legalDisclaimerBody:
        "Articles published on this platform are for educational and informational purposes only. They do not constitute legal advice, do not replace consultation with a qualified lawyer, and do not create a lawyer-client relationship. Authors are responsible for their own views and citations.",
      submitTitle: "Publish legal analysis",
      submitBody: "Drafts are private to you. Submitted work is reviewed before publication.",
      discussionsBody: "Start a legal topic, ask a question, or join ongoing legal discussions with other users.",
      noDiscussions: "No discussions yet. Start the first discussion.",
      startDiscussion: "Start a Discussion",
      discussionTitle: "Discussion title",
      creatingDiscussion: "Creating discussion...",
      createDiscussion: "Create Discussion",
      noMessages: "No messages yet. Start the discussion.",
      discussionBodyPlaceholder: "Write the discussion text...",
      lexAiEyebrow: "AI legal research assistant",
      lexAiTitle: "Ask LexAI",
      lexAiBody: "Ask legal research questions, structure arguments, simplify doctrines, summarize cases, or prepare study notes.",
      lexAiPanelTitle: "Research session",
      lexAiEmpty: "Start a research conversation with LexAI.",
      lexAiPlaceholder: "Ask a legal research question...",
      lexAiThinking: "Thinking...",
      lexAiYou: "You",
      lexAiAssistant: "LexAI",
      lexAiCapabilitiesTitle: "What LexAI can help with",
      lexAiCapabilities: [
        "Legal concept explanation",
        "Article drafting support",
        "Case summarization",
        "Argument and counterargument structure",
        "Research orientation"
      ],
      lexAiDisclaimer: "LexAI supports education and research only. It is not a substitute for professional legal advice.",
      casesEyebrow: "Case-law research",
      casesTitle: "Cases",
      casesBody: "Search selected case-law sources inside LexAzerbaijan. Case areas are research gateways and should not be treated as complete databases.",
      usCasesBody: "Search selected US case-law through CourtListener-powered results.",
      echrCasesBody: "Search European Court of Human Rights judgments and decisions through HUDOC-powered results.",
      euCasesBody: "Search selected CJEU and General Court case-law, including preliminary references, annulment actions, and institutional disputes.",
      usCasePlaceholder: "Search US cases, e.g. freedom of speech, due process, Miranda...",
      echrCasePlaceholder: "Search ECHR cases, e.g. Article 8, freedom of expression, Azerbaijan...",
      euCasePlaceholder: "Search EU cases, e.g. Costa, supremacy, Commission v Italy...",
      caseDateFiled: "Date filed",
      caseDate: "Date",
      caseApplicationNo: "Application no",
      caseRespondent: "Respondent",
      caseSummaryTitle: "LexAI case summary",
      noEuCases: "No EU cases found in the current selected database.",
      copyrightPolicy: "Copyright Policy",
      aiContentPolicy: "AI Content Policy",
      authorAgreement: "Author Agreement",
      policyEyebrow: "Legal Policy",
      copyrightTitle: "Copyright Policy",
      copyrightIntro: "LexAzerbaijan respects intellectual property rights and expects authors and users to do the same.",
      copyrightOwnershipTitle: "1. Ownership of Content",
      copyrightOwnershipBody: "Unless otherwise stated, authors retain copyright ownership of original materials submitted to and published by LexAzerbaijan. By submitting content, authors grant LexAzerbaijan a non-exclusive license to publish, display, archive, distribute, promote, format, edit, and adapt the work for publication purposes.",
      copyrightResponsibilitiesTitle: "2. Author Responsibilities",
      copyrightResponsibilitiesBody: "Authors confirm that their submissions are original or properly licensed, do not infringe third-party rights, include proper citations, and do not contain unlawful, defamatory, fraudulent, or misleading material.",
      copyrightProhibitedTitle: "3. Prohibited Conduct",
      copyrightProhibitedBody: "Plagiarism, unauthorized reproduction, mass-copying, falsified citations, fabricated authorities, and deceptively generated content are prohibited.",
      copyrightComplaintsTitle: "4. Copyright Complaints",
      copyrightComplaintsBody: "If you believe that material published on LexAzerbaijan infringes your rights, contact us at editorial@lexazerbaijan.az with proof of ownership, the article URL, and an explanation of the alleged infringement.",
      aiTitle: "AI Content Policy",
      aiIntro: "Rules for responsible AI-assisted writing and LexAI use.",
      aiPurposeTitle: "1. Purpose",
      aiPurposeBody: "LexAzerbaijan permits limited and responsible use of AI tools for brainstorming, language improvement, structure, summarization, grammar correction, and research assistance.",
      aiResponsibilityTitle: "2. Human Responsibility",
      aiResponsibilityBody: "All submitted content must undergo meaningful human review. Authors remain responsible for factual accuracy, legal accuracy, citations, originality, and compliance with ethical and academic standards.",
      aiProhibitedTitle: "3. Prohibited AI Use",
      aiProhibitedBody: "Publishing AI-generated content without human review, fabricating legal authorities, impersonation, misleading legal advice, and unlawful reproduction of copyrighted works are prohibited.",
      aiDisclaimerTitle: "4. LexAI Disclaimer",
      aiDisclaimerBody: "LexAI is an educational legal research assistant. It does not provide legal advice and may produce inaccurate or incomplete responses. Users should independently verify all legal information.",
      authorTitle: "Author Agreement",
      authorIntro: "Terms that apply when contributors submit content to LexAzerbaijan.",
      authorBody: "By submitting content to LexAzerbaijan, contributors agree that:",
      authorTerms: [
        "The submitted work is original or properly licensed.",
        "The author grants LexAzerbaijan a non-exclusive license to publish, archive, distribute, and promote the work.",
        "The author is responsible for the accuracy and legality of the submission.",
        "Citations, quotations, and referenced materials are properly attributed.",
        "LexAzerbaijan has editorial discretion regarding publication, editing, revision requests, or removal.",
        "LexAzerbaijan may remove content that violates platform policies, academic standards, or applicable law.",
        "AI-assisted writing remains subject to human responsibility and verification."
      ]
    },
    article: {
      notFound: "Article not found",
      disclaimer:
        "This article is published for educational and informational purposes only and does not constitute legal advice.",
      aboutAuthor: "About the author",
      authorFallback: "Legal author and contributor to LexAzerbaijan.",
      relatedEyebrow: "Related articles",
      relatedTitle: "Continue reading",
      contents: "Contents",
      commentsBody: "Moderated discussion for legal substance and professional tone.",
      noComments: "No comments yet. Start a careful discussion.",
      commentPlaceholder: "Add a professional comment...",
      postComment: "Post comment",
      reportTitle: "Report article",
      reportBody:
        "Reports go to the editorial team for review. Use this for plagiarism, hate speech, personal attacks, or serious accuracy concerns.",
      reportPlaceholder: "Explain the issue clearly...",
      submitReport: "Submit report",
      submitReportPending: "Submitting report..."
    },
    forms: {
      email: "Email",
      password: "Password",
      fullName: "Full name",
      username: "Username",
      name: "Name",
      subject: "Subject",
      message: "Message",
      loginTitle: "Login",
      loginDescription: "Access your articles, dashboard, bookmarks, and editorial tools.",
      loginPending: "Signing in...",
      registrationSuccessful: "Registration successful!",
      goToLogin: "Go to Login",
      forgotPassword: "Forgot password?",
      createAccount: "Create account",
      usernameHint: "Username must be 3-30 characters and can only contain lowercase letters, numbers, and underscores.",
      passwordHint: "Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.",
      signupTitle: "Create account",
      signupDescription: "Build a public legal writing profile and submit articles for editorial review.",
      signupPending: "Creating account...",
      alreadyHaveAccount: "Already have an account?",
      resetTitle: "Reset password",
      resetDescription: "Enter your email and we will send password reset instructions.",
      sendReset: "Send reset link",
      profileTitle: "Profile setup",
      profileDescription: "Your public profile helps readers understand your academic and professional background.",
      avatarUrl: "Avatar URL",
      university: "University",
      workplace: "Workplace",
      bio: "Bio",
      interests: "Areas of interest",
      linkedin: "LinkedIn",
      website: "Website",
      saveProfile: "Save profile",
      savingProfile: "Saving profile...",
      contactSend: "Send message",
      articleManuscript: "Article manuscript",
      articleManuscriptDescription: "Submissions enter editorial review before appearing publicly.",
      submissionWorkflow: "Submission workflow",
      workflowIdea: "Idea",
      workflowDraft: "Draft",
      workflowSources: "Sources",
      workflowSubmit: "Submit",
      workflowReview: "Editorial review",
      title: "Title",
      subtitle: "Subtitle",
      abstract: "Short abstract",
      content: "Main content",
      contentPlaceholder: "Write the article body here...",
      sources: "Sources / references",
      articleLanguage: "Article language",
      articleLanguageDescription: "Choose the language readers will see for this submission.",
      publicationDetails: "Publication details",
      publicationDetailsDescription: "Classification helps readers discover your legal analysis.",
      category: "Category",
      selectCategory: "Select category",
      tags: "Tags",
      uploadCover: "Upload cover image",
      coverUrl: "Cover image URL",
      submitForReview: "Submit for review",
      saveEditorialChanges: "Save editorial changes",
      savingChanges: "Saving changes...",
      savingDraft: "Saving draft...",
      consentTitle: "Copyright & Author Confirmation",
      consentDescription: "By submitting this article, you confirm that:",
      consentOriginal: "the article is your original work or properly licensed;",
      consentRights: "you have the right to publish the submitted material;",
      consentNoInfringement: "the submission does not infringe copyright or third-party rights;",
      consentCitations: "citations and references are properly attributed;",
      consentAiReview: "AI-assisted writing, if used, has been meaningfully reviewed by a human author;",
      consentPolicies: "you agree to the LexAzerbaijan Copyright Policy, AI Content Policy, and Author Agreement.",
      consentCheckbox: "I confirm that I have read and accepted the copyright, authorship, and AI content policies of LexAzerbaijan.",
      acceptAndSubmit: "Accept & Submit"
    },
    dashboard: {
      title: "Dashboard",
      editProfile: "Edit profile",
      newArticle: "New article",
      savedArticles: "Saved Articles",
      savedArticlesBody: "Articles you bookmarked for later reading.",
      backToDashboard: "Back to Dashboard",
      noSavedArticles: "No saved articles yet",
      noSavedArticlesBody: "Bookmark articles to quickly access them later.",
      submittedArticles: "Submitted articles",
      profile: "Your profile",
      submissions: "Your submissions",
      noSubmissionsTitle: "No submissions yet",
      noSubmissionsBody: "Start with a case comment, legal opinion, or short research note.",
      notSet: "Not set",
      reviseTitle: "Revise article",
      reviseBody: "You can edit drafts, rejected articles, and pending work before approval.",
      editDraft: "Edit draft"
    },
    admin: {
      title: "Platform control room",
      eyebrow: "Admin dashboard",
      body: "Review submissions, manage users and categories, inspect reports, and monitor platform statistics.",
      totalUsers: "Total users",
      totalPublished: "Published",
      pendingArticles: "Pending articles",
      totalViews: "Total views",
      manageComments: "Manage Comments",
      manageDiscussions: "Manage Discussions",
      allArticles: "All Articles",
      users: "Users",
      categories: "Categories",
      reports: "Reports",
      popular: "Popular",
      noPending: "No pending articles.",
      manageUsers: "Manage users",
      existingCategories: "Existing categories",
      mostPopular: "Most popular articles",
      adminEdit: "Admin edit",
      editSubmission: "Edit submission",
      editBody: "Editorial changes preserve the article status.",
      rejectionPlaceholder: "Rejection reason...",
      rejecting: "Rejecting...",
      categoryName: "Category name",
      categoryDescription: "Short description",
      saveCategory: "Save category",
      savingCategory: "Saving category..."
    },
    empty: {
      pageTitle: "This page could not be found.",
      pageBody: "The article, author profile, or platform page you requested may have moved or is not public.",
      unauthorizedTitle: "You do not have access to this page.",
      unauthorizedBody: "This area is restricted to authorized editors or administrators.",
      backDashboard: "Back to dashboard"
    }
  },
  az: {
    site: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      description: "Azərbaycanın tələbələri, tədqiqatçıları, hüquqşünasları və akademikləri üçün müasir hüquqi bilik platforması.",
      journal: "Hüquq jurnalı",
      location: "Azərbaycan",
      fallbackMember: "LexAzerbaijan üzvü",
      legalContributor: "Hüquqi müəllif",
      legalAuthor: "Hüquq müəllifi",
      independentResearcher: "Müstəqil tədqiqatçı",
      legalCommunity: "Azərbaycan hüquq icması"
    },
    nav: {
      articles: "Məqalələr",
      comingSoon: "Tezliklə",
      categories: "Kateqoriyalar",
      authors: "Müəlliflər",
      about: "Haqqında",
      practiceAreas: "Hüquq sahələri",
      explore: "Oxu",
      exploreArticles: "Məqalələri oxu",
      submitArticle: "Məqalə göndər",
      submitYourArticle: "Məqaləni göndər",
      login: "Daxil ol",
      dashboard: "Panel",
      publicProfile: "İctimai profil",
      admin: "Admin",
      signOut: "Çıxış",
      navigation: "Naviqasiya",
      language: "Dil",
      discussions: "Müzakirələr",
      cases: "Məhkəmə işləri",
      usCases: "ABŞ məhkəmə işləri",
      echrCases: "AİHM qərarları",
      euCases: "Aİ hüququ işləri",
      askLexAI: "LexAI ilə soruş"
    },
    footer: {
      body: "Azərbaycanın gənc hüquq icması üçün hüquqi araşdırma, məhkəmə qərarı şərhləri, hüquqi rəylər və islahat yönümlü təhlillər platforması.",
      platform: "Platforma",
      legal: "Hüquqi",
      editorialPolicy: "Redaksiya siyasəti",
      contact: "Əlaqə",
      disclaimer: "Diskleymer",
      disclaimerBody: "Məqalələr yalnız maarifləndirici və məlumat məqsədlidir. Hüquqi məsləhət sayılmır və vəkil-müştəri münasibəti yaratmır.",
      rights: "Bütün hüquqlar qorunur.",
      reviewed: "Ciddi hüquqi ideyalar üçün redaktə olunan nəşr."
    },
    common: {
      search: "Axtar",
      searchArticles: "Məqalələrdə axtar",
      filter: "Filtrlə",
      category: "Kateqoriya",
      sortArticles: "Məqalələri sırala",
      latest: "Ən yeni",
      mostLiked: "Ən çox bəyənilən",
      mostViewed: "Ən çox baxılan",
      allCategories: "Bütün kateqoriyalar",
      uncategorized: "Kateqoriyasız",
      readingTime: "Oxuma müddəti",
      minuteShort: "dəq",
      views: "Baxış",
      likes: "Bəyənmə",
      comments: "Şərhlər",
      articles: "Məqalələr",
      comingSoon: "Tezliklə",
      published: "Dərc olunub",
      pending: "Gözləmədə",
      edit: "Redaktə et",
      delete: "Sil",
      submit: "Göndər",
      save: "Yadda saxla",
      saveDraft: "Qaralama kimi saxla",
      approve: "Təsdiqlə",
      reject: "Rədd et",
      report: "Şikayət et",
      bookmark: "Yadda saxla",
      share: "Paylaş",
      send: "Göndər",
      subscribe: "Abunə ol",
      loading: "Hüquqi təhlil yüklənir...",
      unpublished: "Dərc olunmayıb",
      updated: "Yenilənib",
      view: "Bax",
      saving: "Yadda saxlanılır...",
      sending: "Göndərilir...",
      submitting: "Göndərilir...",
      posting: "Şərh göndərilir...",
      noReports: "Şikayət yoxdur.",
      headerSearchPlaceholder: "Məqalələrdə axtar...",
      headerSearchNoResults: "Uyğun məqalə tapılmadı.",
      headerSearchSearching: "Axtarılır...",
      recentlySearched: "Son axtarışlar",
      popularSearches: "Populyar axtarışlar",
      toggleTheme: "Rəng rejimini dəyiş",
      lightMode: "İşıqlı",
      darkMode: "Tünd",
      openSection: "Bölməni aç",
      summarizeCase: "Qərarı xülasə et",
      officialSource: "Rəsmi mənbə",
      loadingSummary: "Xülasə hazırlanır...",
      summarizeArticle: "Məqaləni xülasə et",
      articleSummary: "LexAI məqalə xülasəsi"
    },
    status: {
      draft: "Qaralama",
      pending_review: "Baxışdadır",
      approved: "Təsdiqlənib",
      rejected: "Rədd edilib"
    },
    languages: {
      en: "İngiliscə",
      az: "Azərbaycanca",
      ru: "Rusca"
    },
    roles: {
      user: "İstifadəçi",
      author: "Müəllif",
      editor: "Redaktor",
      admin: "Admin"
    },
    messages: {
      checkFields: "İşarələnmiş xanaları yoxlayın.",
      articleSubmissionLimit: "Məqalə göndərmə limiti dolub. Zəhmət olmasa sonra yenidən cəhd edin.",
      coverTooLarge: "Üzlük şəkli 5 MB-dan kiçik olmalıdır.",
      coverUploadFailed: "Üzlük şəklini yükləmək mümkün olmadı.",
      unableToSaveArticle: "Məqaləni saxlamaq mümkün olmadı.",
      commentTooShort: "Şərh çox qısadır.",
      commentRateLimit: "Çox tez-tez şərh yazırsınız. Zəhmət olmasa bir az gözləyin.",
      commentPosted: "Şərh göndərildi.",
      reportClearReason: "Zəhmət olmasa aydın səbəb yazın.",
      reportLimit: "Şikayət limiti dolub. Zəhmət olmasa sonra yenidən cəhd edin.",
      reportReceived: "Şikayət redaksiya baxışı üçün qəbul edildi.",
      rejectionReason: "Aydın rədd səbəbi əlavə edin.",
      articleRejected: "Məqalə səbəb göstərilməklə rədd edildi.",
      validRole: "Düzgün rol seçin.",
      roleUpdated: "Rol yeniləndi.",
      categoryFields: "Kateqoriya xanalarını yoxlayın.",
      categorySaved: "Kateqoriya saxlanıldı.",
      articleUpdated: "Məqalə yeniləndi.",
      newsletterRateLimit: "Çox sayda abunə sorğusu göndərilib. Zəhmət olmasa sonra yenidən cəhd edin.",
      validEmail: "Düzgün e-poçt ünvanı daxil edin.",
      subscribed: "Abunə oldunuz.",
      contactRateLimit: "Çox sayda əlaqə sorğusu göndərilib. Zəhmət olmasa sonra yenidən cəhd edin.",
      messageSent: "Mesaj göndərildi. Redaksiya komandası tezliklə cavab verəcək.",
      accountCreated: "Hesab yaradıldı. Hesabı təsdiqləmək üçün e-poçtunuzu yoxlayın, sonra daxil olun.",
      passwordResetSent: "Şifrəni sıfırlamaq üçün təlimat göndərildi.",
      sourcesHeading: "Mənbələr / istinadlar",
      deletedArticle: "Silinmiş məqalə"
    },
    categories: {
      "constitutional-law": { name: "Konstitusiya hüququ", description: "Konstitusiya şərhi, dövlət institutları, hakimiyyət bölgüsü və ictimai hesabatlılıq." },
      "criminal-law": { name: "Cinayət hüququ", description: "Cinayət ədaləti, proses, cəza, şübhəli şəxslərin hüquqları və islahat təhlili." },
      "administrative-law": { name: "İnzibati hüquq", description: "İnzibati icraat, dövlət orqanları, məhkəmə nəzarəti və tənzimləmə praktikası." },
      "corporate-law": { name: "Korporativ hüquq", description: "Şirkətlər, idarəetmə, əqdlər, komplayens, maliyyə tənzimlənməsi və kommersiya praktikası." },
      "civil-law": { name: "Mülki hüquq", description: "Öhdəliklər, əmlak, ailə hüququ, xüsusi hüquq və mülki proses." },
      "international-law": { name: "Beynəlxalq hüquq", description: "Beynəlxalq publik hüquq, müqavilələr, beynəlxalq institutlar və sərhədlərarası təhlil." },
      "eu-law": { name: "Aİ hüququ", description: "Avropa İttifaqı hüququ, uyğunlaşdırma, müqayisəli tənzimləmə və inteqrasiya təhlili." },
      "human-rights": { name: "İnsan hüquqları", description: "Milli, Avropa və beynəlxalq insan hüquqları təhlili." },
      "labor-law": { name: "Əmək hüququ", description: "Məşğulluq, işçi hüquqları, əmək münasibətləri və sosial müdafiə." },
      "tax-law": { name: "Vergi hüququ", description: "Vergitutma, fiskal siyasət, komplayens və vergi mübahisələri." },
      "legal-theory": { name: "Hüquq nəzəriyyəsi", description: "Hüquq fəlsəfəsi, hüquqi metod, şərh və nəzəri yanaşmalar." },
      "court-decisions": { name: "Məhkəmə qərarları", description: "Qərar şərhləri, məhkəmə təhlili və prosessual yeniliklər." },
      "legal-reform": { name: "Hüquqi islahat", description: "Hüquqi boşluqlar, institusional islahat, siyasət təklifləri və qanunvericilik təhlili." },
      "student-research": { name: "Tələbə araşdırmaları", description: "Tələbələr və gənc tədqiqatçılar tərəfindən hazırlanmış redaktə olunan hüquqi yazılar." }
    },
    home: {
      eyebrow: "LexAzerbaijan",
      headline: "Hüquqi ideyalar, təhlil və gənc hüquq səsləri üçün müasir platforma.",
      subheadline: "Hüquqi məqalələr, məhkəmə qərarı şərhləri, araşdırma qeydləri, hüquqi rəylər və islahat təhlillərini ciddi redaksiya standartı ilə dərc edin.",
      proof: [
        ["Redaktə olunan nəşr", "Qaralama, baxış, təsdiq və rədd edilmə iş axını"],
        ["Hüquq icması", "Tələbələr, tədqiqatçılar, hüquqşünaslar, akademiklər və redaktorlar"],
        ["Bilik mərkəzi", "Publik hüquq, korporativ hüquq, insan hüquqları, Aİ hüququ və daha çox"]
      ],
      storyKicker: "Hüquqi bilik infrastrukturu",
      storyHeadline: "Azərbaycanın hüquqi ideyaları redaksiya çəkisi olan platformaya layiqdir.",
      storyBody: "LexAzerbaijan hüquqi nəşri, peşəkar müzakirəni, məhkəmə işi axtarışını, müəllif portfoliolarını və məsuliyyətli AI dəstəyini sakit araşdırma mühitində birləşdirir.",
      storyPrimaryCta: "Məqalələrə bax",
      storySecondaryCta: "Məqalə göndər",
      storyScrollHint: "Platformanı scroll ilə kəşf edin",
      storyFrames: [
        {
          eyebrow: "Kadr 01",
          title: "Azərbaycan üçün müasir hüquqi bilik platforması.",
          body: "Hüquqi işinin tapılan və etibarlı görünməsini istəyən tələbələr, hüquqşünaslar, tədqiqatçılar, akademiklər, dövlət qulluğu namizədləri və gənc peşəkarlar üçün hazırlanıb.",
          signal: "Araşdırma, təhsil və peşəkar görünürlük"
        },
        {
          eyebrow: "Kadr 02",
          title: "Hüquqi məqalələri ciddi redaksiya səthində dərc edin.",
          body: "Məqalə kartları, kateqoriyalar, oxu metadatası, istinadlar, şərhlər, bəyənmələr, yadda saxlamalar və paylaşım hüquqi məzmun ətrafında qurulub.",
          signal: "Məqalələr və hüquqi araşdırma"
        },
        {
          eyebrow: "Kadr 03",
          title: "Hüquqi məsələləri peşəkar debat otağında müzakirə edin.",
          body: "Müzakirələr müəllif konteksti, cavab sayı, moderasiya hazırlığı və hüquqi arqumentə uyğun tonla strukturlaşdırılmış mövzular kimi təqdim olunur.",
          signal: "Sadə sosial lent deyil, hüquqi icma"
        },
        {
          eyebrow: "Kadr 04",
          title: "LexAI-dan oyuncaq çatbot kimi deyil, araşdırma köməkçisi kimi istifadə edin.",
          body: "LexAI anlayış izahı, struktur təklifləri, iş xülasəsi, yazı dəstəyi və araşdırma istiqaməti verir; hüquqi məsləhət olmadığı açıq göstərilir.",
          signal: "Məsuliyyətli AI dəstəyi"
        },
        {
          eyebrow: "Kadr 05",
          title: "Müxtəlif hüquq ənənələrindən məhkəmə işlərini araşdırın.",
          body: "ABŞ, AİHM və Aİ işləri axtarış, məhkəmə metadatası, istinadlar, rəsmi mənbələr və mümkün olduqda LexAI xülasələri ilə seçilmiş araşdırma qapılarıdır.",
          signal: "ABŞ, AİHM və Aİ işləri"
        },
        {
          eyebrow: "Kadr 06",
          title: "Yazını ictimai hüquqi portfolioya çevirin.",
          body: "Müəllif profilləri bioqrafiya, əlaqələr, məqalələr, baxışlar, bəyənmələr, maraqlar, doğrulama və töhfə göstəricilərini peşəkar görünürlük üçün göstərir.",
          signal: "Müəllif profilləri və etibar"
        },
        {
          eyebrow: "Kadr 07",
          title: "İdeyadan redaksiya baxışına aydın keçid.",
          body: "Göndəriş təcrübəsi müəllifi ideya, qaralama, mənbələr, təsdiqlər və gözləyən baxış mərhələlərindən keçirərək Supabase iş axınını qoruyur.",
          signal: "İdeya, Qaralama, Mənbələr, Baxış"
        },
        {
          eyebrow: "Kadr 08",
          title: "Araşdırma mədəniyyətinə qoşulun.",
          body: "Hüquqi təhlil oxuyun, redaktə olunan yazı göndərin, müzakirələrə qoşulun, iş axtarın, profil qurun və LexAI-dan məsuliyyətlə istifadə edin.",
          signal: "Məqalələr, müzakirələr, LexAI, işlər"
        }
      ],
      cinematic: {
        heroEyebrow: "LexAzerbaijan",
        heroTitle: "Azərbaycanın hüquqi bilik qatı.",
        heroBody:
          "Hüquqi araşdırma dərc etmək, hüquqi ideyaları müzakirə etmək, məhkəmə praktikasını araşdırmaq, portfolio qurmaq və LexAI-dan məsuliyyətlə istifadə etmək üçün premium hüquq-texnologiya platforması.",
        ctaExplore: "Məqalələrə bax",
        ctaSubmit: "Məqalə göndər",
        ctaLexAi: "LexAI sınayın",
        statArticles: "Araşdırma siqnalları",
        statAuthors: "Töhfəçilər",
        statFields: "Hüquq sahələri",
        frameProgressLabel: "Kadr",
        archiveLabel: "Redaksiya arxivi",
        intelligenceLabel: "Hüquqi intellekt",
        previewQuestion: "LexAI insan hüquqları işi üzrə qeyd strukturu qura bilər?",
        previewAnswer:
          "O, məsələni, mənbələri, arqumentləri və ehtiyat qeydlərini ayıra bilər, eyni zamanda hüququ yoxlamağı xatırladır.",
        knowledgeMapLabel: "Bilik xəritəsi",
        editorialStatusLabel: "Redaksiya yolu",
        discussionCards: [
          {
            tag: "Konstitusiya hüququ",
            title: "Proporsionallıq yoxlaması necə inkişaf etməlidir?",
            body: "Doktrinal suallar, islahat təklifləri və müqayisəli hüquqi düşüncə üçün strukturlaşdırılmış debat formatı.",
            meta: "12 cavab"
          },
          {
            tag: "İnsan hüquqları",
            title: "İctimai maraq və fərdi təminatlar arasında balans",
            body: "Peşəkar mövzular hüquqi arqumentləri, mənbələri və əks mövqeləri oxunaqlı araşdırma məkanında saxlayır.",
            meta: "8 cavab"
          },
          {
            tag: "Kommersiya praktikası",
            title: "Müqavilə qeydi gənc hüquqşünas üçün nə zaman faydalıdır?",
            body: "Mövzu klasterləri praktiki müşahidələri təkrar istifadə olunan hüquqi biliyə çevirməyə kömək edir.",
            meta: "5 cavab"
          }
        ],
        topicChips: ["Publik hüquq", "İnsan hüquqları", "Kommersiya praktikası", "Aİ hüququ", "Məhkəmə qərarları", "Hüquqi islahat"],
        lexAiUserMessage: "Hüquqi məsələni xülasə et və məqalə strukturu təklif et.",
        lexAiAnswer:
          "LexAI məsələni xəritələndirə, mənbələri şərhdən ayıra, başlıqlar təklif edə və yoxlama nöqtələrini göstərə bilər.",
        caseSearchPlaceholder: "Seçilmiş mənbələrdə iş axtarın",
        caseCards: [
          {
            court: "ABŞ",
            title: "CourtListener qapısı",
            body: "Seçilmiş federal və ştat qərarlarını axtarın, mövcud mətni LexAI ilə xülasə edin.",
            href: "/cases"
          },
          {
            court: "AİHM",
            title: "HUDOC qapısı",
            body: "Avropa insan hüquqları qərarlarını ərizə metadatası və xülasələrlə araşdırın.",
            href: "/echr-cases"
          },
          {
            court: "Aİ",
            title: "Aİ məhkəmə praktikası qapısı",
            body: "Müqayisəli araşdırma üçün AƏM və Ümumi Məhkəmə qərarlarına baxın.",
            href: "/eu-cases"
          }
        ],
        portfolioSignal:
          "Profil səhifələri redaktə olunan yazını məqalələr, baxışlar, bəyənmələr, maraqlar və töhfə siqnalları ilə peşəkar hüquqi portfolioya çevirir.",
        pipelineSteps: ["İdeya", "Qaralama", "Mənbələr", "Göndər", "Redaksiya baxışı", "Dərc"],
        reviewNote:
          "İş axını müəllifliyi, orijinallığı, mənbələri, AI açıqlamasını və redaksiya baxışını dərcdən əvvəl görünən saxlayır.",
        commandEyebrow: "Canlı platforma indeksi",
        commandTitle: "Ana səhifə hüquqi komanda mərkəzinə çevrilir.",
        commandBody:
          "Son yazılar, müəllif görünürlüğü, hüquq sahələri, AI dəstəyi, məhkəmə işləri və müzakirə marşrutları sadə blog lentinə qayıtmadan birlikdə işləyir.",
        finalEyebrow: "İnstituta daxil olun",
        finalTitle: "Oxuyun, dərc edin, müzakirə edin, araşdırın və hüquqi kimliyinizi qurun.",
        finalBody:
          "LexAzerbaijan ictimai hüquq icmasını bir premium araşdırma səthində birləşdirir.",
        frames: [
          {
            eyebrow: "Kadr 01",
            title: "Azərbaycanın hüquqi bilik qatı",
            body: "Məqalələrə, araşdırmaya, işlərə, icma müzakirəsinə və məsuliyyətli hüquqi AI-a kinematik giriş.",
            cta: "Platformanı kəşf et"
          },
          {
            eyebrow: "Kadr 02",
            title: "Hüquqi araşdırma dərc edin",
            body: "Töhfəçilər hüquqi təhlili, iş şərhini, islahat qeydini və akademik yazını redaktə olunan ictimai işə çevirə bilirlər.",
            cta: "Məqalə göndər"
          },
          {
            eyebrow: "Kadr 03",
            title: "Hüquqi ideyaları müzakirə edin",
            body: "Müzakirələr mövzu klasterləri, cavablar və peşəkar kontekstlə ciddi hüquqi debat otaqları kimi qurulur.",
            cta: "Müzakirələrə qoşul"
          },
          {
            eyebrow: "Kadr 04",
            title: "LexAI hüquqi köməkçi",
            body: "Struktur, məsələ xəritəsi, izahlar, xülasələr və araşdırma istiqaməti istəyin, hüquqi qərarı isə insanda saxlayın.",
            cta: "LexAI aç"
          },
          {
            eyebrow: "Kadr 05",
            title: "Məhkəmə işlərini araşdırın",
            body: "ABŞ, AİHM və Aİ üzrə seçilmiş məhkəmə praktikası qapılarını məhkəmə metadatası və LexAI xülasə konsepti ilə axtarın.",
            cta: "İşlərə bax"
          },
          {
            eyebrow: "Kadr 06",
            title: "Hüquqi portfolio qurun",
            body: "Müəllif profilləri ciddi yazıçıları məqalələr, iştirak, maraqlar və peşəkar göstəricilər vasitəsilə görünən edir.",
            cta: "Müəlliflərə bax"
          },
          {
            eyebrow: "Kadr 07",
            title: "Qaralamadan baxışa",
            body: "Göndəriş yolu ideya, qaralama, mənbələr, təsdiqlər və redaksiya baxışını aydın və etibarlı göstərir.",
            cta: "Göndərməyə başla"
          },
          {
            eyebrow: "Kadr 08",
            title: "Bir premium hüquqi səth",
            body: "Məqalələr, müzakirələr, LexAI, işlər, müəlliflər, yadda saxlamalar və kabinetlər müasir hüquqi institutda birləşir.",
            cta: "Məqalələrə bax"
          }
        ]
      },
      featuredEyebrow: "Seçilmiş təhlillər",
      featuredTitle: "Redaktorların seçdiyi hüquqi yazılar",
      latestEyebrow: "Son məqalələr",
      latestTitle: "Yeni hüquqi ideyalar və qərar şərhləri",
      categoriesEyebrow: "Kateqoriyalar",
      categoriesTitle: "Hüquq sahəsinə görə bax",
      categoriesBody: "Konstitusiya hüququndan tələbə araşdırmalarına qədər kateqoriyalar ciddi hüquqi yazıları tapmağı asanlaşdırır.",
      whyEyebrow: "Niyə burada dərc etməli?",
      whyTitle: "Erkən hüquqi araşdırmalar üçün ciddi məkan.",
      whyBody: "LexAzerbaijan sosial şəbəkə postundan daha ciddi, klassik jurnal prosesindən isə daha əlçatan hüquqi yazılar üçün hazırlanıb.",
      whyCards: [
        ["Etibarlı hüquqi portfolio qur", "Tələbələr və gənc hüquqşünaslar redaktə olunmuş yazılarını ictimai profildə toplaya bilirlər."],
        ["Dərcdən əvvəl redaksiya baxışı", "Məqalələr aktuallıq, orijinallıq, ton və əsas hüquqi keyfiyyət baxımından yoxlanılır."],
        ["Azərbaycan üçün araşdırma mədəniyyəti", "Platforma doktrinal qeydləri, qərar şərhlərini və islahat ideyalarını tapmağı və istinad etməyi asanlaşdırır."]
      ],
      topAuthorsEyebrow: "Top müəlliflər",
      topAuthorsTitle: "İcmada etibarlı səslər",
      viewAuthors: "Müəlliflərə bax",
      newsletterTitle: "Yeni hüquqi yazıları izlə",
      newsletterBody: "Azərbaycanın gənc hüquq icmasından redaktor seçimi məqalələri, qərar şərhlərini və islahat qeydlərini al.",
      dailyTermsEyebrow: "Gündəlik hüquqi öyrənmə",
      dailyTermsTitle: "Bugünün hüquqi terminləri",
      dailyTermsBody: "Hər gün yenilənən qısa və professional izahlarla hüquqi terminləri öyrənin."
    },
    pages: {
      articlesTitle: "Hüquqi təhlil kitabxanası",
      articlesBody: "Təsdiqlənmiş ictimai məqalələri, hüquqi rəyləri, məhkəmə qərarı şərhlərini və araşdırma qeydlərini axtar.",
      articlesDescription: "Hüquqi məqalələr, təhlillər, qərar şərhləri, araşdırma qeydləri və hüquqi rəylər.",
      noArticlesTitle: "Məqalə tapılmadı",
      noArticlesBody: "Başqa axtarış sözü, kateqoriya və ya sıralama seç.",
      categoriesTitle: "Hüquq sahələri və mövzular",
      categoriesBody: "Publik hüquq, korporativ praktika, cinayət ədaləti, beynəlxalq hüquq, Aİ hüququ, insan hüquqları və tələbə araşdırmaları.",
      authorsTitle: "Hüquqi səslər",
      authorsBody: "Redaktə olunan yazılarla ictimai hüquqi portfolio quran tələbələr, tədqiqatçılar, hüquqşünaslar və akademiklər.",
      authorsDescription: "LexAzerbaijan-da hüquqi təhlil dərc edən müəllifləri kəşf edin.",
      aboutTitle: "Azərbaycanda hüquqi araşdırma mədəniyyətini, akademik müzakirəni və gənc hüquq səslərini təşviq etmək.",
      aboutBody: "LexAzerbaijan ciddi hüquqi yazılara peşəkar məkan verir: məqalələr, qərar şərhləri, islahat ideyaları, araşdırma qeydləri və akademik üslublu yazılar.",
      aboutCards: [
        ["Tələbələr üçün", "Praktikaya başlamazdan əvvəl redaktə olunmuş hüquqi araşdırmalar dərc etmək və görünən portfolio qurmaq üçün məkan."],
        ["Peşəkarlar üçün", "Hüquqi rəylər, qərar qeydləri və praktik təhlillər üçün nizamlı nəşr mühiti."],
        ["Akademiya üçün", "Akademik hüquqi yazı ilə ictimai peşəkar müzakirə arasında körpü."]
      ],
      editorialStandard: "Redaksiya standartı",
      editorialStandardBody: "Platforma redaktə olunan nəşr prinsipi üzərində qurulub. Məqalələr orijinal, mənbəli, peşəkar tonda və Azərbaycan hüququ, müqayisəli hüquq, institutlar, məhkəmələr, islahat və hüquq təhsili ilə maraqlanan oxucular üçün faydalı olmalıdır.",
      contactTitle: "Redaksiya komandası ilə əlaqə",
      contactBody: "Göndərişlər, redaksiya baxışı, əməkdaşlıq və platforma dəstəyi barədə sual göndərin.",
      contactCards: [
        ["Redaksiya e-poçtu", "editorial@lexazerbaijan.az"],
        ["Göndəriş sualları", "Kateqoriyalar, baxış statusu və məqalə mövzusu barədə soruşun."],
        ["Hüquqi diskleymer", "Əlaqə cavabları hüquqi məsləhət sayılmır."]
      ],
      policyTitle: "Redaktə olunan hüquqi nəşr standartları",
      policyBody: "Məqalələr dərcdən əvvəl yoxlanılır. Məqsəd elmi keyfiyyəti, peşəkar tonu, oxucu etibarını və hüquq icmasının bütövlüyünü qorumaqdır.",
      policyCards: [
        ["Dərcdən əvvəl baxış", "Göndərilən məqalələr baxış mərhələsinə düşür və yalnız redaktor və ya admin təsdiqindən sonra ictimai olur."],
        ["Plagiat qadağandır", "Müəlliflər orijinal yazı təqdim etməli və mənbələrə, qərarlara, qanunvericiliyə və akademik materiallara düzgün istinad etməlidirlər."],
        ["Nifrət nitqi və şəxsi hücum yoxdur", "Şəxsi hücum, təqib, diskriminativ nitq və təhqiredici şərhlərə icazə verilmir."],
        ["Maarifləndirici məqsəd", "Hüquqi məlumat oxucuya hüququ və siyasəti anlamağa kömək etməlidir; məqalələr hüquqi məsləhət kimi təqdim edilməməlidir."]
      ],
      legalDisclaimer: "Hüquqi diskleymer",
      legalDisclaimerBody: "Platformada dərc olunan məqalələr yalnız maarifləndirici və məlumat məqsədlidir. Hüquqi məsləhət sayılmır, ixtisaslı hüquqşünasla məsləhətləşməni əvəz etmir və vəkil-müştəri münasibəti yaratmır. Müəlliflər öz fikirləri və istinadlarına görə məsuliyyət daşıyırlar.",
      submitTitle: "Hüquqi təhlil dərc et",
      submitBody: "Qaralamalar yalnız sizə görünür. Göndərilən yazılar dərcdən əvvəl redaksiya baxışından keçir.",
      discussionsBody: "Hüquqi mövzu başladın, sual verin və ya digər istifadəçilərlə müzakirələrə qoşulun.",
      noDiscussions: "Hələ müzakirə yoxdur. İlk müzakirəni başladın.",
      startDiscussion: "Müzakirə başlat",
      discussionTitle: "Müzakirə başlığı",
      creatingDiscussion: "Müzakirə yaradılır...",
      createDiscussion: "Müzakirə yarat",
      noMessages: "Hələ mesaj yoxdur. Müzakirəni başladın.",
      discussionBodyPlaceholder: "Müzakirə mətnini yazın...",
      lexAiEyebrow: "AI hüquqi araşdırma köməkçisi",
      lexAiTitle: "LexAI-dan soruş",
      lexAiBody: "Hüquqi araşdırma sualları verin, arqument qurun, doktrinaları sadələşdirin, işləri xülasə edin və ya dərs qeydləri hazırlayın.",
      lexAiPanelTitle: "Araşdırma sessiyası",
      lexAiEmpty: "LexAI ilə araşdırma söhbətinə başlayın.",
      lexAiPlaceholder: "Hüquqi araşdırma sualı verin...",
      lexAiThinking: "Düşünür...",
      lexAiYou: "Siz",
      lexAiAssistant: "LexAI",
      lexAiCapabilitiesTitle: "LexAI necə kömək edə bilər",
      lexAiCapabilities: [
        "Hüquqi anlayışların izahı",
        "Məqalə yazısına dəstək",
        "Məhkəmə işi xülasəsi",
        "Arqument və əks-arqument strukturu",
        "Araşdırma istiqaməti"
      ],
      lexAiDisclaimer: "LexAI yalnız təhsil və araşdırma dəstəyi üçündür. Peşəkar hüquqi məsləhəti əvəz etmir.",
      casesEyebrow: "Məhkəmə işi araşdırması",
      casesTitle: "Məhkəmə işləri",
      casesBody: "LexAzerbaijan daxilində seçilmiş məhkəmə işi mənbələrində axtarış edin. Bu bölmələr araşdırma qapılarıdır və tam database kimi qəbul edilməməlidir.",
      usCasesBody: "CourtListener nəticələri ilə seçilmiş ABŞ məhkəmə işlərini axtarın.",
      echrCasesBody: "HUDOC nəticələri ilə Avropa İnsan Hüquqları Məhkəməsinin qərar və qərardadlarını axtarın.",
      euCasesBody: "Preliminar sorğular, ləğv iddiaları və institusional mübahisələr daxil olmaqla seçilmiş Aİ məhkəmə işlərini axtarın.",
      usCasePlaceholder: "ABŞ işlərində axtar: söz azadlığı, due process, Miranda...",
      echrCasePlaceholder: "AİHM işlərində axtar: Maddə 8, ifadə azadlığı, Azərbaycan...",
      euCasePlaceholder: "Aİ işlərində axtar: Costa, üstünlük, Commission v Italy...",
      caseDateFiled: "Qeydiyyat tarixi",
      caseDate: "Tarix",
      caseApplicationNo: "Ərizə nömrəsi",
      caseRespondent: "Cavabdeh dövlət",
      caseSummaryTitle: "LexAI iş xülasəsi",
      noEuCases: "Cari seçilmiş bazada Aİ işi tapılmadı.",
      copyrightPolicy: "Müəllif hüquqları siyasəti",
      aiContentPolicy: "Süni intellekt məzmun siyasəti",
      authorAgreement: "Müəllif razılaşması",
      policyEyebrow: "Hüquqi siyasət",
      copyrightTitle: "Müəllif hüquqları siyasəti",
      copyrightIntro: "LexAzerbaijan əqli mülkiyyət hüquqlarına hörmət edir və müəlliflərdən, istifadəçilərdən də eyni yanaşmanı gözləyir.",
      copyrightOwnershipTitle: "1. Məzmun üzərində hüquqlar",
      copyrightOwnershipBody: "Başqa cür göstərilmədiyi halda, LexAzerbaijan-a təqdim edilən və dərc olunan orijinal materiallar üzərində müəlliflik hüquqları müəllifdə qalır. Məzmun təqdim etməklə müəllif LexAzerbaijan-a həmin materialı dərc etmək, göstərmək, arxivləşdirmək, yaymaq, tanıtmaq, formatlaşdırmaq, redaktə etmək və nəşrə uyğunlaşdırmaq üçün qeyri-eksklüziv icazə verir.",
      copyrightResponsibilitiesTitle: "2. Müəllifin məsuliyyəti",
      copyrightResponsibilitiesBody: "Müəlliflər təqdim etdikləri yazının orijinal olduğunu və ya lazımi icazələrlə istifadə edildiyini, üçüncü şəxslərin hüquqlarını pozmadığını, istinadların düzgün verildiyini və qanunsuz, böhtan xarakterli, aldadıcı və ya yanlış məzmun daşımadığını təsdiqləyirlər.",
      copyrightProhibitedTitle: "3. Qadağan edilən hallar",
      copyrightProhibitedBody: "Plagiat, üçüncü tərəf materiallarının icazəsiz köçürülməsi, kütləvi copy-paste, saxta istinadlar, uydurma hüquqi mənbələr və aldadıcı şəkildə yaradılmış məzmun qadağandır.",
      copyrightComplaintsTitle: "4. Müəllif hüquqları ilə bağlı müraciətlər",
      copyrightComplaintsBody: "LexAzerbaijan-da dərc olunmuş materialın hüquqlarınızı pozduğunu düşünürsünüzsə, mülkiyyətinizi təsdiq edən sübut, məqalənin linki və pozuntu izahı ilə editorial@lexazerbaijan.az ünvanına müraciət edin.",
      aiTitle: "Süni intellekt məzmun siyasəti",
      aiIntro: "Süni intellekt dəstəyi ilə yazı və LexAI istifadəsi üçün məsuliyyətli qaydalar.",
      aiPurposeTitle: "1. Məqsəd",
      aiPurposeBody: "LexAzerbaijan süni intellekt alətlərindən ideya toplamaq, dili yaxşılaşdırmaq, strukturu qurmaq, xülasə hazırlamaq, qrammatikanı düzəltmək və araşdırmaya dəstək məqsədilə məhdud və məsuliyyətli istifadəni qəbul edir.",
      aiResponsibilityTitle: "2. İnsan nəzarəti və məsuliyyət",
      aiResponsibilityBody: "Təqdim edilən bütün məzmun insan tərəfindən mənalı şəkildə yoxlanılmalıdır. Faktiki dəqiqlik, hüquqi dəqiqlik, istinadlar, orijinallıq və akademik-etik standartlara uyğunluq müəllifin məsuliyyətində qalır.",
      aiProhibitedTitle: "3. Qadağan edilən süni intellekt istifadəsi",
      aiProhibitedBody: "İnsan yoxlaması olmadan AI ilə yaradılmış məzmunun dərc edilməsi, uydurma hüquqi mənbələr yaratmaq, şəxsləri və qurumları təqlid etmək, yanlış hüquqi məsləhət görüntüsü yaratmaq və müəllif hüquqları ilə qorunan əsərləri qanunsuz çoxaltmaq qadağandır.",
      aiDisclaimerTitle: "4. LexAI barədə qeyd",
      aiDisclaimerBody: "LexAI yalnız tədris və araşdırma məqsədli hüquqi köməkçidir. Hüquqi məsləhət vermir və cavabları natamam və ya səhv ola bilər. İstifadəçilər hüquqi məlumatları müstəqil şəkildə yoxlamalıdırlar.",
      authorTitle: "Müəllif razılaşması",
      authorIntro: "LexAzerbaijan-a məzmun təqdim edən müəlliflərə tətbiq olunan şərtlər.",
      authorBody: "LexAzerbaijan-a məzmun təqdim etməklə müəllif aşağıdakıları qəbul edir:",
      authorTerms: [
        "Təqdim edilən yazı orijinaldır və ya lazımi icazələrlə istifadə olunur.",
        "Müəllif LexAzerbaijan-a yazını dərc etmək, arxivləşdirmək, yaymaq və tanıtmaq üçün qeyri-eksklüziv icazə verir.",
        "Yazının dəqiqliyi və qanuniliyinə görə müəllif məsuliyyət daşıyır.",
        "Sitatlar, istinadlar və istifadə olunan materiallar düzgün göstərilir.",
        "LexAzerbaijan dərc, redaktə, düzəliş tələbi və ya silinmə barədə redaksiya səlahiyyətini saxlayır.",
        "Platforma qaydalarını, akademik standartları və ya tətbiq olunan hüququ pozan məzmun silinə bilər.",
        "AI dəstəyi ilə yazılmış məzmun yenə də insan məsuliyyəti və yoxlaması tələb edir."
      ]
    },
    article: {
      notFound: "Məqalə tapılmadı",
      disclaimer: "Bu məqalə yalnız maarifləndirici və məlumat məqsədilə dərc olunur və hüquqi məsləhət sayılmır.",
      aboutAuthor: "Müəllif haqqında",
      authorFallback: "LexAzerbaijan müəllifi və hüquqi yazı iştirakçısı.",
      relatedEyebrow: "Oxşar məqalələr",
      relatedTitle: "Oxumağa davam et",
      contents: "Mündəricat",
      commentsBody: "Hüquqi məzmun və peşəkar ton üçün moderasiya olunan müzakirə.",
      noComments: "Hələ şərh yoxdur. Düşünülmüş müzakirəyə başlayın.",
      commentPlaceholder: "Peşəkar şərh əlavə edin...",
      postComment: "Şərh göndər",
      reportTitle: "Məqalədən şikayət et",
      reportBody: "Şikayətlər redaksiya komandasına göndərilir. Plagiat, nifrət nitqi, şəxsi hücum və ya ciddi dəqiqlik problemi üçün istifadə edin.",
      reportPlaceholder: "Problemi aydın izah edin...",
      submitReport: "Şikayət göndər",
      submitReportPending: "Şikayət göndərilir..."
    },
    forms: {
      email: "E-poçt",
      password: "Şifrə",
      fullName: "Ad və soyad",
      username: "İstifadəçi adı",
      name: "Ad",
      subject: "Mövzu",
      message: "Mesaj",
      loginTitle: "Daxil ol",
      loginDescription: "Məqalələrinizə, panelə, yadda saxlanılanlara və redaksiya alətlərinə daxil olun.",
      loginPending: "Daxil olunur...",
      registrationSuccessful: "Qeydiyyat uğurludur!",
      goToLogin: "Daxil olmaya keç",
      forgotPassword: "Şifrəni unutmusunuz?",
      createAccount: "Hesab yarat",
      usernameHint: "İstifadəçi adı 3-30 simvol olmalı, yalnız kiçik hərflər, rəqəmlər və alt xətdən ibarət ola bilər.",
      passwordHint: "Şifrə ən azı 8 simvol olmalı və hərf, rəqəm və xüsusi simvol kombinasiyası daxil etməlidir.",
      signupTitle: "Hesab yarat",
      signupDescription: "İctimai hüquqi yazı profili yaradın və məqalələri redaksiya baxışına göndərin.",
      signupPending: "Hesab yaradılır...",
      alreadyHaveAccount: "Artıq hesabınız var?",
      resetTitle: "Şifrəni sıfırla",
      resetDescription: "E-poçtunuzu daxil edin, şifrəni sıfırlamaq üçün təlimat göndərək.",
      sendReset: "Sıfırlama linki göndər",
      profileTitle: "Profil qurulması",
      profileDescription: "İctimai profil oxuculara akademik və peşəkar fonunuzu anlamağa kömək edir.",
      avatarUrl: "Avatar URL",
      university: "Universitet",
      workplace: "İş yeri",
      bio: "Bio",
      interests: "Maraq sahələri",
      linkedin: "LinkedIn",
      website: "Vebsayt",
      saveProfile: "Profili saxla",
      savingProfile: "Profil saxlanılır...",
      contactSend: "Mesaj göndər",
      articleManuscript: "Məqalə mətni",
      articleManuscriptDescription: "Göndərişlər ictimai görünməzdən əvvəl redaksiya baxışından keçir.",
      submissionWorkflow: "Göndəriş iş axını",
      workflowIdea: "İdeya",
      workflowDraft: "Qaralama",
      workflowSources: "Mənbələr",
      workflowSubmit: "Göndər",
      workflowReview: "Redaksiya baxışı",
      title: "Başlıq",
      subtitle: "Alt başlıq",
      abstract: "Qısa xülasə",
      content: "Əsas mətn",
      contentPlaceholder: "Məqalənin əsas mətnini burada yazın...",
      sources: "Mənbələr / istinadlar",
      articleLanguage: "Məqalənin dili",
      articleLanguageDescription: "Bu göndərişin oxuculara hansı dildə görünəcəyini seçin.",
      publicationDetails: "Nəşr detalları",
      publicationDetailsDescription: "Təsnifat oxucuların hüquqi təhlilinizi tapmasına kömək edir.",
      category: "Kateqoriya",
      selectCategory: "Kateqoriya seç",
      tags: "Teqlər",
      uploadCover: "Üzlük şəkli yüklə",
      coverUrl: "Üzlük şəkli URL",
      submitForReview: "Baxışa göndər",
      saveEditorialChanges: "Redaksiya dəyişikliklərini saxla",
      savingChanges: "Dəyişikliklər saxlanılır...",
      savingDraft: "Qaralama saxlanılır...",
      consentTitle: "Müəlliflik və hüquqi təsdiq",
      consentDescription: "Bu məqaləni göndərməklə siz aşağıdakıları təsdiqləyirsiniz:",
      consentOriginal: "məqalə sizin orijinal işinizdir və ya lazımi icazələrlə istifadə olunur;",
      consentRights: "təqdim etdiyiniz materialı dərc etmək hüququnuz var;",
      consentNoInfringement: "göndəriş müəllif hüquqlarını və üçüncü şəxslərin hüquqlarını pozmur;",
      consentCitations: "istinadlar və mənbələr düzgün göstərilib;",
      consentAiReview: "AI dəstəyi istifadə olunubsa, məzmun insan müəllif tərəfindən mənalı şəkildə yoxlanılıb;",
      consentPolicies: "LexAzerbaijan-ın Müəllif hüquqları siyasəti, AI məzmun siyasəti və Müəllif razılaşması ilə razılaşırsınız.",
      consentCheckbox: "LexAzerbaijan-ın müəllif hüquqları, müəlliflik və AI məzmun qaydalarını oxuduğumu və qəbul etdiyimi təsdiqləyirəm.",
      acceptAndSubmit: "Qəbul et və göndər"
    },
    dashboard: {
      title: "Panel",
      editProfile: "Profili redaktə et",
      newArticle: "Yeni məqalə",
      savedArticles: "Yadda saxlanmış məqalələr",
      savedArticlesBody: "Sonra oxumaq üçün yadda saxladığınız məqalələr.",
      backToDashboard: "Panelə qayıt",
      noSavedArticles: "Hələ yadda saxlanmış məqalə yoxdur",
      noSavedArticlesBody: "Məqalələri sonra tez tapmaq üçün yadda saxlayın.",
      submittedArticles: "Göndərilən məqalələr",
      profile: "Profiliniz",
      submissions: "Göndərişləriniz",
      noSubmissionsTitle: "Hələ göndəriş yoxdur",
      noSubmissionsBody: "Qərar şərhi, hüquqi rəy və ya qısa araşdırma qeydi ilə başlayın.",
      notSet: "Qeyd olunmayıb",
      reviseTitle: "Məqaləni yenilə",
      reviseBody: "Qaralamaları, rədd edilmiş yazıları və təsdiqdən əvvəl baxışda olan yazıları redaktə edə bilərsiniz.",
      editDraft: "Qaralamanı redaktə et"
    },
    admin: {
      title: "Platforma idarəetmə mərkəzi",
      eyebrow: "Admin paneli",
      body: "Göndərişləri nəzərdən keçirin, istifadəçiləri və kateqoriyaları idarə edin, şikayətləri və statistikaları izləyin.",
      totalUsers: "Ümumi istifadəçi",
      totalPublished: "Dərc olunub",
      pendingArticles: "Baxışdakı məqalələr",
      totalViews: "Ümumi baxış",
      manageComments: "Şərhləri idarə et",
      manageDiscussions: "Müzakirələri idarə et",
      allArticles: "Bütün məqalələr",
      users: "İstifadəçilər",
      categories: "Kateqoriyalar",
      reports: "Şikayətlər",
      popular: "Populyar",
      noPending: "Baxışda məqalə yoxdur.",
      manageUsers: "İstifadəçiləri idarə et",
      existingCategories: "Mövcud kateqoriyalar",
      mostPopular: "Ən populyar məqalələr",
      adminEdit: "Admin redaktəsi",
      editSubmission: "Göndərişi redaktə et",
      editBody: "Redaksiya dəyişiklikləri məqalə statusunu saxlayır.",
      rejectionPlaceholder: "Rədd səbəbi...",
      rejecting: "Rədd edilir...",
      categoryName: "Kateqoriya adı",
      categoryDescription: "Qısa təsvir",
      saveCategory: "Kateqoriyanı saxla",
      savingCategory: "Kateqoriya saxlanılır..."
    },
    empty: {
      pageTitle: "Bu səhifə tapılmadı.",
      pageBody: "İstədiyiniz məqalə, müəllif profili və ya platforma səhifəsi köçürülmüş və ya ictimai olmaya bilər.",
      unauthorizedTitle: "Bu səhifəyə girişiniz yoxdur.",
      unauthorizedBody: "Bu bölmə yalnız səlahiyyətli redaktorlar və administratorlar üçündür.",
      backDashboard: "Panelə qayıt"
    }
  },
  ru: {
    site: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      description: "Современная правовая платформа для студентов, исследователей, юристов и академического сообщества Азербайджана.",
      journal: "Юридический журнал",
      location: "Азербайджан",
      fallbackMember: "Участник LexAzerbaijan",
      legalContributor: "Автор правовых материалов",
      legalAuthor: "Юридический автор",
      independentResearcher: "Независимый исследователь",
      legalCommunity: "Правовое сообщество Азербайджана"
    },
    nav: {
      articles: "Статьи",
      comingSoon: "Скоро",
      categories: "Категории",
      authors: "Авторы",
      about: "О проекте",
      practiceAreas: "Отрасли права",
      explore: "Читать",
      exploreArticles: "Читать статьи",
      submitArticle: "Подать статью",
      submitYourArticle: "Подать статью",
      login: "Войти",
      dashboard: "Кабинет",
      publicProfile: "Публичный профиль",
      admin: "Админ",
      signOut: "Выйти",
      navigation: "Навигация",
      language: "Язык",
      discussions: "Обсуждения",
      cases: "Судебные дела",
      usCases: "Дела США",
      echrCases: "Практика ЕСПЧ",
      euCases: "Дела права ЕС",
      askLexAI: "Спросить LexAI"
    },
    footer: {
      body: "Профессиональная платформа для правовых исследований, комментариев к судебным решениям, юридических мнений и реформаторского анализа молодого правового сообщества Азербайджана.",
      platform: "Платформа",
      legal: "Правовая информация",
      editorialPolicy: "Редакционная политика",
      contact: "Контакты",
      disclaimer: "Дисклеймер",
      disclaimerBody: "Материалы предназначены только для образовательных и информационных целей. Они не являются юридической консультацией и не создают отношений адвокат-клиент.",
      rights: "Все права защищены.",
      reviewed: "Редакционная публикация для серьезных правовых идей."
    },
    common: {
      search: "Поиск",
      searchArticles: "Поиск статей",
      filter: "Фильтр",
      category: "Категория",
      sortArticles: "Сортировка статей",
      latest: "Новые",
      mostLiked: "Популярные по лайкам",
      mostViewed: "Популярные по просмотрам",
      allCategories: "Все категории",
      uncategorized: "Без категории",
      readingTime: "Время чтения",
      minuteShort: "мин",
      views: "Просмотры",
      likes: "Лайки",
      comments: "Комментарии",
      articles: "Статьи",
      comingSoon: "Скоро",
      published: "Опубликовано",
      pending: "На рассмотрении",
      edit: "Редактировать",
      delete: "Удалить",
      submit: "Отправить",
      save: "Сохранить",
      saveDraft: "Сохранить черновик",
      approve: "Одобрить",
      reject: "Отклонить",
      report: "Пожаловаться",
      bookmark: "В закладки",
      share: "Поделиться",
      send: "Отправить",
      subscribe: "Подписаться",
      loading: "Загрузка правового анализа...",
      unpublished: "Не опубликовано",
      updated: "Обновлено",
      view: "Открыть",
      saving: "Сохранение...",
      sending: "Отправка...",
      submitting: "Отправка...",
      posting: "Публикация комментария...",
      noReports: "Жалоб нет.",
      headerSearchPlaceholder: "Поиск статей...",
      headerSearchNoResults: "Подходящие статьи не найдены.",
      headerSearchSearching: "Поиск...",
      recentlySearched: "Недавние запросы",
      popularSearches: "Популярные запросы",
      toggleTheme: "Переключить тему",
      lightMode: "Светлая",
      darkMode: "Темная",
      openSection: "Открыть раздел",
      summarizeCase: "Кратко изложить дело",
      officialSource: "Официальный источник",
      loadingSummary: "Подготовка краткого обзора...",
      summarizeArticle: "Кратко изложить статью",
      articleSummary: "Краткое изложение LexAI"
    },
    status: {
      draft: "Черновик",
      pending_review: "На рассмотрении",
      approved: "Одобрено",
      rejected: "Отклонено"
    },
    languages: {
      en: "Английский",
      az: "Азербайджанский",
      ru: "Русский"
    },
    roles: {
      user: "Пользователь",
      author: "Автор",
      editor: "Редактор",
      admin: "Админ"
    },
    messages: {
      checkFields: "Проверьте выделенные поля.",
      articleSubmissionLimit: "Лимит подачи статей исчерпан. Пожалуйста, попробуйте позже.",
      coverTooLarge: "Обложка должна быть меньше 5 МБ.",
      coverUploadFailed: "Не удалось загрузить обложку.",
      unableToSaveArticle: "Не удалось сохранить статью.",
      commentTooShort: "Комментарий слишком короткий.",
      commentRateLimit: "Вы слишком быстро отправляете комментарии. Пожалуйста, подождите немного.",
      commentPosted: "Комментарий опубликован.",
      reportClearReason: "Пожалуйста, укажите понятную причину.",
      reportLimit: "Лимит жалоб исчерпан. Пожалуйста, попробуйте позже.",
      reportReceived: "Жалоба получена для редакционного рассмотрения.",
      rejectionReason: "Добавьте понятную причину отклонения.",
      articleRejected: "Статья отклонена с указанием причины.",
      validRole: "Выберите корректную роль.",
      roleUpdated: "Роль обновлена.",
      categoryFields: "Проверьте поля категории.",
      categorySaved: "Категория сохранена.",
      articleUpdated: "Статья обновлена.",
      newsletterRateLimit: "Слишком много запросов подписки. Пожалуйста, попробуйте позже.",
      validEmail: "Введите корректный email.",
      subscribed: "Вы подписаны.",
      contactRateLimit: "Слишком много контактных запросов. Пожалуйста, попробуйте позже.",
      messageSent: "Сообщение отправлено. Редакция скоро ответит.",
      accountCreated: "Аккаунт создан. Проверьте email для подтверждения, затем войдите.",
      passwordResetSent: "Инструкции по сбросу пароля отправлены.",
      sourcesHeading: "Источники / ссылки",
      deletedArticle: "Удаленная статья"
    },
    categories: {
      "constitutional-law": { name: "Конституционное право", description: "Конституционное толкование, институты, разделение властей и публичная подотчетность." },
      "criminal-law": { name: "Уголовное право", description: "Уголовная юстиция, процесс, наказание, права подозреваемых и реформы." },
      "administrative-law": { name: "Административное право", description: "Административная процедура, публичные органы, судебный контроль и регуляторная практика." },
      "corporate-law": { name: "Корпоративное право", description: "Компании, управление, сделки, комплаенс, финансовое регулирование и коммерческая практика." },
      "civil-law": { name: "Гражданское право", description: "Частное право, обязательства, имущество, семейное право и гражданский процесс." },
      "international-law": { name: "Международное право", description: "Публичное международное право, договоры, международные институты и трансграничный анализ." },
      "eu-law": { name: "Право ЕС", description: "Право Европейского союза, гармонизация, сравнительное регулирование и интеграция." },
      "human-rights": { name: "Права человека", description: "Национальный, европейский и международный анализ прав человека." },
      "labor-law": { name: "Трудовое право", description: "Занятость, права работников, трудовые отношения и социальная защита." },
      "tax-law": { name: "Налоговое право", description: "Налогообложение, фискальная политика, комплаенс и налоговые споры." },
      "legal-theory": { name: "Теория права", description: "Юриспруденция, правовой метод, толкование и философия права." },
      "court-decisions": { name: "Судебные решения", description: "Комментарии к делам, анализ решений и процессуальные изменения." },
      "legal-reform": { name: "Правовая реформа", description: "Пробелы в праве, институциональные реформы, предложения и законодательный анализ." },
      "student-research": { name: "Студенческие исследования", description: "Редактируемые правовые материалы студентов и молодых исследователей." }
    },
    home: {
      eyebrow: "LexAzerbaijan",
      headline: "Современная платформа для правовых идей, анализа и молодых юридических голосов.",
      subheadline: "Публикуйте юридические статьи, комментарии к судебным решениям, исследовательские заметки, правовые мнения и анализ реформ с серьезным редакционным стандартом.",
      proof: [
        ["Редактируемые публикации", "Черновик, рассмотрение, одобрение и отклонение"],
        ["Правовое сообщество", "Студенты, исследователи, юристы, академики и редакторы"],
        ["Центр знаний", "Публичное право, корпоративное право, права человека, право ЕС и многое другое"]
      ],
      storyKicker: "Инфраструктура правовых знаний",
      storyHeadline: "Правовые идеи Азербайджана заслуживают платформы с редакционной серьезностью.",
      storyBody: "LexAzerbaijan объединяет юридические публикации, профессиональные обсуждения, поиск судебной практики, портфолио авторов и ответственную AI-помощь в спокойной исследовательской среде.",
      storyPrimaryCta: "Смотреть статьи",
      storySecondaryCta: "Отправить статью",
      storyScrollHint: "Прокрутите платформу",
      storyFrames: [
        {
          eyebrow: "Кадр 01",
          title: "Современная платформа правовых знаний для Азербайджана.",
          body: "Создана для студентов, юристов, исследователей, академиков, кандидатов в публичный сектор и молодых специалистов, которым важна видимость и доверие к правовой работе.",
          signal: "Исследования, образование и профессиональная видимость"
        },
        {
          eyebrow: "Кадр 02",
          title: "Публикуйте юридические статьи в серьезной редакционной среде.",
          body: "Карточки статей, категории, метаданные чтения, ссылки, комментарии, лайки, закладки и обмен выстроены вокруг правового содержания.",
          signal: "Статьи и правовые исследования"
        },
        {
          eyebrow: "Кадр 03",
          title: "Обсуждайте правовые вопросы в профессиональном пространстве дебатов.",
          body: "Обсуждения выглядят как структурированные правовые темы с контекстом автора, числом ответов, готовностью к модерации и тоном для юридического аргумента.",
          signal: "Сообщество без хаоса соцленты"
        },
        {
          eyebrow: "Кадр 04",
          title: "Используйте LexAI как исследовательского помощника, а не игрушечный чатбот.",
          body: "LexAI помогает объяснять понятия, предлагать структуру, кратко излагать дела, поддерживать черновики и ориентировать в исследовании с ясным дисклеймером.",
          signal: "Ответственная AI-помощь"
        },
        {
          eyebrow: "Кадр 05",
          title: "Изучайте судебную практику разных правовых традиций.",
          body: "Разделы США, ЕСПЧ и ЕС представлены как избранные исследовательские шлюзы с поиском, метаданными суда, цитатами, источниками и резюме LexAI, где это возможно.",
          signal: "Дела США, ЕСПЧ и ЕС"
        },
        {
          eyebrow: "Кадр 06",
          title: "Превратите тексты в публичное юридическое портфолио.",
          body: "Профили авторов показывают биографию, аффилиации, статьи, просмотры, лайки, интересы, верификацию и сигналы вклада для профессионального поиска.",
          signal: "Профили авторов и доверие"
        },
        {
          eyebrow: "Кадр 07",
          title: "Переходите от идеи к редакционному рассмотрению ясно.",
          body: "Подача ведет автора через идею, черновик, источники, подтверждения и ожидание проверки, сохраняя Supabase-процессы.",
          signal: "Идея, черновик, источники, проверка"
        },
        {
          eyebrow: "Кадр 08",
          title: "Присоединяйтесь к культуре исследования.",
          body: "Читайте анализ, отправляйте проверяемые материалы, участвуйте в обсуждениях, ищите дела, развивайте профиль и используйте LexAI ответственно.",
          signal: "Статьи, обсуждения, LexAI, дела"
        }
      ],
      cinematic: {
        heroEyebrow: "LexAzerbaijan",
        heroTitle: "Правовой слой знаний Азербайджана.",
        heroBody:
          "Премиальная legal-tech платформа для публикации исследований, обсуждения правовых идей, изучения судебной практики, создания портфолио и ответственного использования LexAI.",
        ctaExplore: "Смотреть статьи",
        ctaSubmit: "Отправить статью",
        ctaLexAi: "Попробовать LexAI",
        statArticles: "Сигналы исследований",
        statAuthors: "Авторы",
        statFields: "Отрасли права",
        frameProgressLabel: "Кадр",
        archiveLabel: "Редакционный архив",
        intelligenceLabel: "Правовой интеллект",
        previewQuestion: "Может ли LexAI структурировать заметку по делу о правах человека?",
        previewAnswer:
          "Он может выделить вопросы, источники, аргументы и оговорки, напоминая о необходимости проверять право.",
        knowledgeMapLabel: "Карта знаний",
        editorialStatusLabel: "Редакционный путь",
        discussionCards: [
          {
            tag: "Конституционное право",
            title: "Как должен развиваться тест пропорциональности?",
            body: "Структурированный формат дебатов для доктринальных вопросов, реформ и сравнительного правового мышления.",
            meta: "12 ответов"
          },
          {
            tag: "Права человека",
            title: "Баланс публичного интереса и индивидуальных гарантий",
            body: "Профессиональные темы сохраняют аргументы, источники и контраргументы в удобном исследовательском пространстве.",
            meta: "8 ответов"
          },
          {
            tag: "Коммерческая практика",
            title: "Что делает договорную заметку полезной для молодых юристов?",
            body: "Тематические кластеры помогают превращать практические наблюдения в повторно используемое правовое знание.",
            meta: "5 ответов"
          }
        ],
        topicChips: ["Публичное право", "Права человека", "Коммерческая практика", "Право ЕС", "Судебные решения", "Правовая реформа"],
        lexAiUserMessage: "Кратко изложи правовой вопрос и предложи структуру статьи.",
        lexAiAnswer:
          "LexAI может разложить вопрос, отделить источники от комментария, предложить заголовки и отметить точки проверки.",
        caseSearchPlaceholder: "Поиск дел по выбранным источникам",
        caseCards: [
          {
            court: "США",
            title: "Шлюз CourtListener",
            body: "Ищите выбранные федеральные и штатные решения, затем резюмируйте доступный текст с LexAI.",
            href: "/cases"
          },
          {
            court: "ЕСПЧ",
            title: "Шлюз HUDOC",
            body: "Изучайте европейские решения по правам человека с метаданными заявлений и резюме.",
            href: "/echr-cases"
          },
          {
            court: "ЕС",
            title: "Шлюз практики ЕС",
            body: "Просматривайте отдельные решения Суда ЕС и Общего суда для сравнительного исследования.",
            href: "/eu-cases"
          }
        ],
        portfolioSignal:
          "Профили превращают проверенные тексты в профессиональное юридическое портфолио со статьями, просмотрами, лайками, интересами и сигналами вклада.",
        pipelineSteps: ["Идея", "Черновик", "Источники", "Отправка", "Редакционная проверка", "Публикация"],
        reviewNote:
          "Процесс делает авторство, оригинальность, источники, признание AI и редакционную проверку видимыми до публикации.",
        commandEyebrow: "Живой индекс платформы",
        commandTitle: "Главная становится правовым командным центром.",
        commandBody:
          "Новые материалы, видимость авторов, отрасли права, AI-помощь, дела и обсуждения остаются связанными без возврата к простой блоговой ленте.",
        finalEyebrow: "Войти в институт",
        finalTitle: "Читайте, публикуйте, спорьте, исследуйте и создавайте правовую идентичность.",
        finalBody:
          "LexAzerbaijan объединяет публичное правовое сообщество в одной премиальной исследовательской среде.",
        frames: [
          {
            eyebrow: "Кадр 01",
            title: "Правовой слой знаний Азербайджана",
            body: "Кинематографичный вход в статьи, исследования, дела, обсуждения сообщества и ответственное правовое AI.",
            cta: "Исследовать платформу"
          },
          {
            eyebrow: "Кадр 02",
            title: "Публикуйте правовые исследования",
            body: "Авторы могут превращать анализ, комментарии к делам, заметки о реформах и академические тексты в проверенные публичные материалы.",
            cta: "Отправить статью"
          },
          {
            eyebrow: "Кадр 03",
            title: "Обсуждайте правовые идеи",
            body: "Обсуждения устроены как серьезные комнаты правовых дебатов с темами, ответами и профессиональным контекстом.",
            cta: "К обсуждениям"
          },
          {
            eyebrow: "Кадр 04",
            title: "Правовой помощник LexAI",
            body: "Запрашивайте структуру, карту вопросов, объяснения, резюме и направление исследования, сохраняя юридическое суждение за человеком.",
            cta: "Открыть LexAI"
          },
          {
            eyebrow: "Кадр 05",
            title: "Изучайте дела",
            body: "Ищите избранные шлюзы судебной практики США, ЕСПЧ и ЕС с метаданными суда и концепцией резюме LexAI.",
            cta: "Смотреть дела"
          },
          {
            eyebrow: "Кадр 06",
            title: "Создавайте юридическое портфолио",
            body: "Профили авторов помогают серьезным авторам становиться видимыми через статьи, вовлечение, интересы и профессиональные сигналы.",
            cta: "Смотреть авторов"
          },
          {
            eyebrow: "Кадр 07",
            title: "От черновика к проверке",
            body: "Подача делает идею, черновик, источники, подтверждения и редакционную проверку понятными и надежными.",
            cta: "Начать подачу"
          },
          {
            eyebrow: "Кадр 08",
            title: "Одна премиальная правовая среда",
            body: "Статьи, обсуждения, LexAI, дела, авторы, закладки и кабинеты сходятся в современном правовом институте.",
            cta: "Смотреть статьи"
          }
        ]
      },
      featuredEyebrow: "Избранный анализ",
      featuredTitle: "Материалы, выбранные редакцией",
      latestEyebrow: "Новые статьи",
      latestTitle: "Новые правовые идеи и комментарии к делам",
      categoriesEyebrow: "Категории",
      categoriesTitle: "Поиск по отрасли права",
      categoriesBody: "От конституционного права до студенческих исследований: категории помогают находить серьезные правовые материалы.",
      whyEyebrow: "Зачем публиковаться здесь?",
      whyTitle: "Серьезное пространство для ранней правовой науки.",
      whyBody: "LexAzerbaijan создан для правовых текстов, которые серьезнее поста в соцсетях, но доступнее традиционной журнальной подачи.",
      whyCards: [
        ["Создайте убедительное юридическое портфолио", "Студенты и молодые юристы могут собрать отредактированные материалы в публичном профессиональном профиле."],
        ["Редакционная проверка до публикации", "Материалы проверяются на актуальность, оригинальность, тон и базовое юридическое качество."],
        ["Культура исследований для Азербайджана", "Платформа упрощает поиск и цитирование доктринальных заметок, комментариев к делам и идей реформ."]
      ],
      topAuthorsEyebrow: "Лучшие авторы",
      topAuthorsTitle: "Надежные голоса сообщества",
      viewAuthors: "Смотреть авторов",
      newsletterTitle: "Следите за новыми правовыми материалами",
      newsletterBody: "Получайте статьи, комментарии к судебным решениям и заметки о правовых реформах, выбранные редакцией.",
      dailyTermsEyebrow: "Ежедневное юридическое обучение",
      dailyTermsTitle: "Юридические термины дня",
      dailyTermsBody: "Изучайте важные юридические термины через короткие профессиональные объяснения, обновляемые ежедневно."
    },
    pages: {
      articlesTitle: "Библиотека правового анализа",
      articlesBody: "Ищите одобренные публичные статьи, правовые мнения, комментарии к судебным решениям и исследовательские заметки.",
      articlesDescription: "Юридические статьи, анализ, комментарии к делам, исследовательские заметки и правовые мнения.",
      noArticlesTitle: "Статьи не найдены",
      noArticlesBody: "Попробуйте другой поисковый запрос, категорию или сортировку.",
      categoriesTitle: "Отрасли права и темы",
      categoriesBody: "Публичное право, корпоративная практика, уголовная юстиция, международное право, право ЕС, права человека и студенческие исследования.",
      authorsTitle: "Юридические голоса",
      authorsBody: "Студенты, исследователи, юристы и академики, создающие публичные правовые портфолио через редактируемые публикации.",
      authorsDescription: "Авторы, публикующие правовой анализ на LexAzerbaijan.",
      aboutTitle: "Продвигать культуру правовых исследований, академическую дискуссию и молодые юридические голоса в Азербайджане.",
      aboutBody: "LexAzerbaijan дает серьезным правовым текстам профессиональное пространство: статьи, комментарии к делам, идеи реформ, исследовательские заметки и академические публикации.",
      aboutCards: [
        ["Для студентов", "Место для публикации редактируемых правовых исследований и создания видимого портфолио до начала практики."],
        ["Для профессионалов", "Дисциплинированная площадка для правовых мнений, заметок по делам и практического анализа."],
        ["Для академии", "Мост между академическим правовым письмом и публичной профессиональной дискуссией."]
      ],
      editorialStandard: "Редакционный стандарт",
      editorialStandardBody: "Платформа основана на принципе редакционной публикации. Статьи должны быть оригинальными, снабженными источниками, написанными профессиональным тоном и полезными для читателей, интересующихся азербайджанским правом, сравнительным правом, институтами, судами, реформами и юридическим образованием.",
      contactTitle: "Связаться с редакцией",
      contactBody: "Отправьте вопросы о подаче материалов, редакционном рассмотрении, партнерстве или поддержке платформы.",
      contactCards: [
        ["Редакционный email", "editorial@lexazerbaijan.az"],
        ["Вопросы по подаче", "Спросите о категориях, статусе рассмотрения или теме статьи."],
        ["Правовой дисклеймер", "Ответы через форму контакта не являются юридической консультацией."]
      ],
      policyTitle: "Стандарты редактируемых правовых публикаций",
      policyBody: "Статьи проходят проверку до публикации. Цель — защитить научное качество, профессиональный тон, доверие читателей и целостность правового сообщества.",
      policyCards: [
        ["Проверка до публикации", "Поданные статьи переходят на рассмотрение и становятся публичными только после одобрения редактором или администратором."],
        ["Плагиат запрещен", "Авторы должны подавать оригинальные тексты и корректно цитировать источники, решения, законодательство и академические материалы."],
        ["Без языка ненависти и личных атак", "Личные атаки, преследование, дискриминационные высказывания и оскорбительные комментарии запрещены."],
        ["Образовательная цель", "Правовая информация должна помогать понимать право и политику; статьи не должны восприниматься как юридическая консультация."]
      ],
      legalDisclaimer: "Правовой дисклеймер",
      legalDisclaimerBody: "Статьи, опубликованные на платформе, предназначены только для образовательных и информационных целей. Они не являются юридической консультацией, не заменяют консультацию квалифицированного юриста и не создают отношений адвокат-клиент. Авторы несут ответственность за свои взгляды и ссылки.",
      submitTitle: "Опубликовать правовой анализ",
      submitBody: "Черновики видны только вам. Поданные материалы проходят редакционное рассмотрение до публикации.",
      discussionsBody: "Начните правовую тему, задайте вопрос или присоединитесь к обсуждениям с другими пользователями.",
      noDiscussions: "Обсуждений пока нет. Начните первое обсуждение.",
      startDiscussion: "Начать обсуждение",
      discussionTitle: "Название обсуждения",
      creatingDiscussion: "Создание обсуждения...",
      createDiscussion: "Создать обсуждение",
      noMessages: "Сообщений пока нет. Начните обсуждение.",
      discussionBodyPlaceholder: "Напишите текст обсуждения...",
      lexAiEyebrow: "AI-помощник для правовых исследований",
      lexAiTitle: "Спросить LexAI",
      lexAiBody: "Задавайте вопросы по правовым исследованиям, структурируйте аргументы, упрощайте доктрины, кратко излагайте дела или готовьте учебные заметки.",
      lexAiPanelTitle: "Исследовательская сессия",
      lexAiEmpty: "Начните исследовательский диалог с LexAI.",
      lexAiPlaceholder: "Задайте вопрос по правовому исследованию...",
      lexAiThinking: "Думаю...",
      lexAiYou: "Вы",
      lexAiAssistant: "LexAI",
      lexAiCapabilitiesTitle: "С чем помогает LexAI",
      lexAiCapabilities: [
        "Объяснение правовых понятий",
        "Поддержка черновиков статей",
        "Краткое изложение судебных дел",
        "Структура аргументов и контраргументов",
        "Ориентация в исследовании"
      ],
      lexAiDisclaimer: "LexAI предназначен только для образования и исследований. Он не заменяет профессиональную юридическую консультацию.",
      casesEyebrow: "Исследование судебной практики",
      casesTitle: "Судебные дела",
      casesBody: "Ищите избранные источники судебной практики внутри LexAzerbaijan. Разделы являются исследовательскими шлюзами и не должны восприниматься как полные базы данных.",
      usCasesBody: "Ищите избранную судебную практику США через результаты CourtListener.",
      echrCasesBody: "Ищите решения и постановления Европейского суда по правам человека через результаты HUDOC.",
      euCasesBody: "Ищите избранные дела Суда ЕС и Общего суда, включая преюдициальные запросы, иски об аннулировании и институциональные споры.",
      usCasePlaceholder: "Поиск дел США: freedom of speech, due process, Miranda...",
      echrCasePlaceholder: "Поиск дел ЕСПЧ: Article 8, freedom of expression, Azerbaijan...",
      euCasePlaceholder: "Поиск дел ЕС: Costa, supremacy, Commission v Italy...",
      caseDateFiled: "Дата подачи",
      caseDate: "Дата",
      caseApplicationNo: "Номер жалобы",
      caseRespondent: "Ответчик",
      caseSummaryTitle: "Резюме дела LexAI",
      noEuCases: "В текущей выбранной базе дела ЕС не найдены.",
      copyrightPolicy: "Политика авторских прав",
      aiContentPolicy: "Политика использования ИИ",
      authorAgreement: "Соглашение автора",
      policyEyebrow: "Правовая политика",
      copyrightTitle: "Политика авторских прав",
      copyrightIntro: "LexAzerbaijan уважает права интеллектуальной собственности и ожидает того же от авторов и пользователей.",
      copyrightOwnershipTitle: "1. Права на материалы",
      copyrightOwnershipBody: "Если не указано иное, авторы сохраняют авторские права на оригинальные материалы, поданные и опубликованные на LexAzerbaijan. Отправляя материал, автор предоставляет LexAzerbaijan неисключительное разрешение публиковать, показывать, архивировать, распространять, продвигать, форматировать, редактировать и адаптировать материал для публикации.",
      copyrightResponsibilitiesTitle: "2. Ответственность автора",
      copyrightResponsibilitiesBody: "Авторы подтверждают, что представленные материалы являются оригинальными или используются на законном основании, не нарушают права третьих лиц, содержат корректные ссылки и не включают незаконную, клеветническую, вводящую в заблуждение или недостоверную информацию.",
      copyrightProhibitedTitle: "3. Запрещенные действия",
      copyrightProhibitedBody: "Плагиат, несанкционированное копирование чужих материалов, массовое копирование, ложные ссылки, вымышленные правовые источники и обманно созданный контент запрещены.",
      copyrightComplaintsTitle: "4. Жалобы по авторским правам",
      copyrightComplaintsBody: "Если вы считаете, что материал на LexAzerbaijan нарушает ваши права, напишите на editorial@lexazerbaijan.az, приложив подтверждение прав, ссылку на материал и описание предполагаемого нарушения.",
      aiTitle: "Политика использования ИИ",
      aiIntro: "Правила ответственного использования ИИ при написании материалов и работе с LexAI.",
      aiPurposeTitle: "1. Цель",
      aiPurposeBody: "LexAzerbaijan допускает ограниченное и ответственное использование инструментов ИИ для поиска идей, улучшения языка, структуры, краткого изложения, проверки грамматики и исследовательской поддержки.",
      aiResponsibilityTitle: "2. Ответственность человека",
      aiResponsibilityBody: "Все поданные материалы должны проходить осмысленную проверку человеком. Автор отвечает за фактическую и правовую точность, ссылки, оригинальность и соблюдение академических и этических стандартов.",
      aiProhibitedTitle: "3. Запрещенное использование ИИ",
      aiProhibitedBody: "Запрещены публикация ИИ-контента без проверки человеком, создание вымышленных правовых источников, имитация лиц или учреждений, вводящие в заблуждение юридические советы и незаконное воспроизведение охраняемых авторским правом материалов.",
      aiDisclaimerTitle: "4. Дисклеймер LexAI",
      aiDisclaimerBody: "LexAI является образовательным помощником для правовых исследований. Он не предоставляет юридические консультации и может давать неполные или неточные ответы. Пользователи должны самостоятельно проверять правовую информацию.",
      authorTitle: "Соглашение автора",
      authorIntro: "Условия, применимые к авторам, подающим материалы на LexAzerbaijan.",
      authorBody: "Отправляя материал на LexAzerbaijan, автор соглашается со следующим:",
      authorTerms: [
        "Материал является оригинальным или используется на законном основании.",
        "Автор предоставляет LexAzerbaijan неисключительное право публиковать, архивировать, распространять и продвигать материал.",
        "Автор отвечает за точность и законность поданного материала.",
        "Цитаты, ссылки и использованные материалы указаны корректно.",
        "LexAzerbaijan сохраняет редакционное право решать вопросы публикации, редактирования, запроса исправлений или удаления.",
        "Материалы, нарушающие правила платформы, академические стандарты или применимое право, могут быть удалены.",
        "Материалы, подготовленные с помощью ИИ, всё равно требуют человеческой ответственности и проверки."
      ]
    },
    article: {
      notFound: "Статья не найдена",
      disclaimer: "Эта статья опубликована только в образовательных и информационных целях и не является юридической консультацией.",
      aboutAuthor: "Об авторе",
      authorFallback: "Юридический автор и участник LexAzerbaijan.",
      relatedEyebrow: "Похожие статьи",
      relatedTitle: "Продолжить чтение",
      contents: "Содержание",
      commentsBody: "Модерируемая дискуссия по правовому содержанию и профессиональному тону.",
      noComments: "Комментариев пока нет. Начните содержательную дискуссию.",
      commentPlaceholder: "Добавьте профессиональный комментарий...",
      postComment: "Опубликовать комментарий",
      reportTitle: "Пожаловаться на статью",
      reportBody: "Жалобы направляются редакции. Используйте форму для плагиата, языка ненависти, личных атак или серьезных вопросов точности.",
      reportPlaceholder: "Четко объясните проблему...",
      submitReport: "Отправить жалобу",
      submitReportPending: "Отправка жалобы..."
    },
    forms: {
      email: "Email",
      password: "Пароль",
      fullName: "Полное имя",
      username: "Имя пользователя",
      name: "Имя",
      subject: "Тема",
      message: "Сообщение",
      loginTitle: "Войти",
      loginDescription: "Получите доступ к статьям, кабинету, закладкам и редакционным инструментам.",
      loginPending: "Вход...",
      registrationSuccessful: "Регистрация успешна!",
      goToLogin: "Перейти ко входу",
      forgotPassword: "Забыли пароль?",
      createAccount: "Создать аккаунт",
      usernameHint: "Имя пользователя должно содержать 3-30 символов: строчные буквы, цифры и нижнее подчеркивание.",
      passwordHint: "Пароль должен быть не короче 8 символов и включать буквы, цифры и специальные символы.",
      signupTitle: "Создать аккаунт",
      signupDescription: "Создайте публичный профиль юридического автора и отправляйте статьи на редакционное рассмотрение.",
      signupPending: "Создание аккаунта...",
      alreadyHaveAccount: "Уже есть аккаунт?",
      resetTitle: "Сброс пароля",
      resetDescription: "Введите email, и мы отправим инструкции по сбросу пароля.",
      sendReset: "Отправить ссылку",
      profileTitle: "Настройка профиля",
      profileDescription: "Публичный профиль помогает читателям понять ваш академический и профессиональный опыт.",
      avatarUrl: "URL аватара",
      university: "Университет",
      workplace: "Место работы",
      bio: "Биография",
      interests: "Сферы интересов",
      linkedin: "LinkedIn",
      website: "Сайт",
      saveProfile: "Сохранить профиль",
      savingProfile: "Сохранение профиля...",
      contactSend: "Отправить сообщение",
      articleManuscript: "Рукопись статьи",
      articleManuscriptDescription: "Материалы проходят редакционное рассмотрение до публичной публикации.",
      submissionWorkflow: "Процесс подачи",
      workflowIdea: "Идея",
      workflowDraft: "Черновик",
      workflowSources: "Источники",
      workflowSubmit: "Отправка",
      workflowReview: "Редакционная проверка",
      title: "Заголовок",
      subtitle: "Подзаголовок",
      abstract: "Краткая аннотация",
      content: "Основной текст",
      contentPlaceholder: "Напишите основной текст статьи здесь...",
      sources: "Источники / ссылки",
      articleLanguage: "Язык статьи",
      articleLanguageDescription: "Выберите язык, на котором читатели увидят этот материал.",
      publicationDetails: "Детали публикации",
      publicationDetailsDescription: "Классификация помогает читателям находить ваш правовой анализ.",
      category: "Категория",
      selectCategory: "Выберите категорию",
      tags: "Теги",
      uploadCover: "Загрузить обложку",
      coverUrl: "URL обложки",
      submitForReview: "Отправить на рассмотрение",
      saveEditorialChanges: "Сохранить редакционные изменения",
      savingChanges: "Сохранение изменений...",
      savingDraft: "Сохранение черновика...",
      consentTitle: "Подтверждение авторства и прав",
      consentDescription: "Отправляя эту статью, вы подтверждаете, что:",
      consentOriginal: "статья является вашей оригинальной работой или используется на законном основании;",
      consentRights: "у вас есть право опубликовать представленный материал;",
      consentNoInfringement: "материал не нарушает авторские права и права третьих лиц;",
      consentCitations: "цитаты, источники и ссылки указаны корректно;",
      consentAiReview: "если использовался ИИ, текст был осмысленно проверен человеком-автором;",
      consentPolicies: "вы соглашаетесь с Политикой авторских прав, Политикой использования ИИ и Соглашением автора LexAzerbaijan.",
      consentCheckbox: "Я подтверждаю, что прочитал(а) и принимаю правила LexAzerbaijan об авторских правах, авторстве и использовании ИИ.",
      acceptAndSubmit: "Принять и отправить"
    },
    dashboard: {
      title: "Кабинет",
      editProfile: "Редактировать профиль",
      newArticle: "Новая статья",
      savedArticles: "Сохраненные статьи",
      savedArticlesBody: "Статьи, которые вы сохранили для последующего чтения.",
      backToDashboard: "Вернуться в кабинет",
      noSavedArticles: "Сохраненных статей пока нет",
      noSavedArticlesBody: "Добавляйте статьи в закладки, чтобы быстро найти их позже.",
      submittedArticles: "Поданные статьи",
      profile: "Ваш профиль",
      submissions: "Ваши материалы",
      noSubmissionsTitle: "Материалов пока нет",
      noSubmissionsBody: "Начните с комментария к делу, правового мнения или краткой исследовательской заметки.",
      notSet: "Не указано",
      reviseTitle: "Редактировать статью",
      reviseBody: "Вы можете редактировать черновики, отклоненные материалы и тексты на рассмотрении до одобрения.",
      editDraft: "Редактировать черновик"
    },
    admin: {
      title: "Центр управления платформой",
      eyebrow: "Админ-панель",
      body: "Рассматривайте материалы, управляйте пользователями и категориями, проверяйте жалобы и статистику платформы.",
      totalUsers: "Всего пользователей",
      totalPublished: "Опубликовано",
      pendingArticles: "Статьи на рассмотрении",
      totalViews: "Всего просмотров",
      manageComments: "Управлять комментариями",
      manageDiscussions: "Управлять обсуждениями",
      allArticles: "Все статьи",
      users: "Пользователи",
      categories: "Категории",
      reports: "Жалобы",
      popular: "Популярное",
      noPending: "Статей на рассмотрении нет.",
      manageUsers: "Управление пользователями",
      existingCategories: "Существующие категории",
      mostPopular: "Самые популярные статьи",
      adminEdit: "Редактирование админом",
      editSubmission: "Редактировать материал",
      editBody: "Редакционные изменения сохраняют статус статьи.",
      rejectionPlaceholder: "Причина отклонения...",
      rejecting: "Отклонение...",
      categoryName: "Название категории",
      categoryDescription: "Краткое описание",
      saveCategory: "Сохранить категорию",
      savingCategory: "Сохранение категории..."
    },
    empty: {
      pageTitle: "Страница не найдена.",
      pageBody: "Запрошенная статья, профиль автора или страница платформы могла быть перемещена или не является публичной.",
      unauthorizedTitle: "У вас нет доступа к этой странице.",
      unauthorizedBody: "Этот раздел доступен только уполномоченным редакторам и администраторам.",
      backDashboard: "Вернуться в кабинет"
    }
  }
} as const;

export type Dictionary = typeof dictionaries.en;

export async function getLocale(): Promise<Locale> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;
  return isLocale(locale) ? locale : defaultLocale;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return dictionaries[locale ?? (await getLocale())] as Dictionary;
}

export function categorySlugFromName(name?: string | null): CategorySlug | null {
  if (!name) return null;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return categoryKeys.includes(slug as CategorySlug) ? (slug as CategorySlug) : null;
}

export function localizeCategory(
  category: { name: string; slug?: string | null; description?: string | null } | null,
  dictionary: Dictionary
) {
  if (!category) return null;
  const key = categorySlugFromName(category.slug ?? category.name);
  if (!key) return category;

  return {
    ...category,
    name: dictionary.categories[key].name,
    description: dictionary.categories[key].description
  };
}
