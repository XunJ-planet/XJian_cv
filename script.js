const revealItems = document.querySelectorAll(
  ".hero, .section-heading, .panel, .timeline-item, .publication-item, .contact-card, .footer"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));

const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear().toString();
}

const translations = {
  en: {
    meta: {
      title: "Xun Jian | Personal Website",
      description:
        "Xun Jian's personal resume website, featuring education, research experience, publications, skills, and contact information.",
    },
    nav: {
      about: "About",
      experience: "Experience",
      publications: "Publications",
      contact: "Contact",
    },
    hero: {
      title: "Geophysics Student",
      text:
        "I study geophysics at SUSTech and focus on using computation, observation, and quantitative analysis to understand Earth and planetary systems.",
      contact: "Contact Me",
      publications: "View Publications",
    },
    facts: {
      base: "Base",
      focus: "Focus",
      focusValue: "Geophysics, Exoplanets, Planetary science",
    },
    about: {
      heading: "About",
      body:
        "I am an undergraduate student in the Department of Earth and Space Sciences at Southern University of Science and Technology. My work spans numerical simulation of seismic waves, exoplanet-related light-curve analysis, and Earth radiation budget studies.",
      factLabel: "Earth and Space Sciences",
    },
    experience: {
      heading: "Experience",
      item1: {
        meta: "Education",
        body:
          "Undergraduate student in the Department of Earth and Space Sciences, majoring in Geophysics. Supervisors: Prof. Wei Zhang and Prof. Siteng Fan.",
      },
      item2: {
        meta: "SURF Student",
        body:
          "Summer student in the Division of Geological and Planetary Sciences, supervised by Prof. Yuk L. Yung, with research connected to climate and planetary science questions.",
      },
    },
    publications: {
      heading: "Publications & Presentations",
    },
    skills: {
      heading: "Skills",
      tools: "Tools",
      cLanguage: "C Language",
      scientificWriting: "Scientific Writing",
      dataVisualization: "Data Visualization",
      researchAreas: "Research Areas",
      earthObservation: "Earth Observation",
      climateAnalysis: "Climate Analysis",
      remoteSensing: "Remote Sensing",
    },
    contact: {
      heading: "Contact",
      body: "For collaboration, research opportunities, email is the fastest way to reach me.",
      backToTop: "Back to top",
    },
    footer: {
      text: '© <span id="year"></span> Xun Jian. Academic profile and resume website.',
    },
  },
  zh: {
    meta: {
      title: "简迅 | 个人主页",
      description: "简迅的个人主页，展示教育背景、研究经历、刊物、技能与联系方式。",
    },
    nav: {
      about: "关于我",
      experience: "经历",
      publications: "刊物",
      contact: "联系",
    },
    hero: {
      title: "地球物理本科生",
      text:
        "我目前就读于南方科技大学地球与空间科学系，关注通过计算、观测和定量分析理解地球与行星系统。",
      contact: "联系我",
      publications: "查看刊物",
    },
    facts: {
      base: "所在地",
      focus: "研究方向",
      focusValue: "地球物理、系外行星、行星科学",
    },
    about: {
      heading: "关于我",
      body:
        "我是南方科技大学地球与空间科学系本科生。我的研究主要涉及地震波数值模拟、地球作为系外行星的光变分析，以及地球辐射收支相关研究。",
      factLabel: "地球与空间科学系",
    },
    experience: {
      heading: "经历",
      item1: {
        meta: "教育背景",
        body: "南方科技大学地球与空间科学系本科生，专业为地球物理。导师：张伟教授、樊思腾教授。",
      },
      item2: {
        meta: "暑研学生",
        body: "加州理工学院地质与行星科学方向暑期学生，导师为 Yuk L. Yung 教授，研究内容与气候和行星科学问题相关。",
      },
    },
    publications: {
      heading: "刊物与会议报告",
    },
    skills: {
      heading: "技能",
      tools: "工具",
      cLanguage: "C 语言",
      scientificWriting: "科研写作",
      dataVisualization: "数据可视化",
      researchAreas: "研究领域",
      earthObservation: "地球观测",
      climateAnalysis: "气候分析",
      remoteSensing: "遥感",
    },
    contact: {
      heading: "联系我",
      body: "如需科研合作、学术交流或其他联系，邮件是最快的方式。",
      backToTop: "返回顶部",
    },
    footer: {
      text: '© <span id="year"></span> 简迅。学术个人主页与简历网站。',
    },
  },
};

const titleNode = document.querySelector("title");
const descriptionNode = document.querySelector('meta[name="description"]');
const langButtons = document.querySelectorAll(".lang-button");

function getNestedValue(object, path) {
  return path.split(".").reduce((current, key) => current?.[key], object);
}

function syncYear() {
  const currentYearNode = document.querySelector("#year");

  if (currentYearNode) {
    currentYearNode.textContent = new Date().getFullYear().toString();
  }
}

function applyLanguage(lang) {
  const locale = translations[lang] ? lang : "en";
  const content = translations[locale];

  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";

  if (titleNode) {
    titleNode.textContent = content.meta.title;
  }

  if (descriptionNode) {
    descriptionNode.setAttribute("content", content.meta.description);
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = getNestedValue(content, key);

    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    const value = getNestedValue(content, key);

    if (typeof value === "string") {
      node.innerHTML = value;
    }
  });

  syncYear();

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === locale);
  });

  window.localStorage.setItem("preferredLanguage", locale);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

applyLanguage(window.localStorage.getItem("preferredLanguage") || "en");
