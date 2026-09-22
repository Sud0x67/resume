/**
 * 简历内容（中英双语）—— 修改简历只需要编辑这个文件。
 * Resume content (zh / en) — edit this file to update the resume.
 *
 * 目录结构（两个语言字段一一对应）：
 *   meta       头部信息（姓名 / 头衔 / 职业方向）
 *   contact    联系方式（type: email | github | location | link）
 *   about      个人简介段落
 *   work       工作经历
 *   openSource 开源社区身份
 *   research   研究成果 / 论文
 *   education  教育经历
 *   skills     技能（分组）
 *   ui         界面文案
 */
const GITHUB_USER = 'Sud0x67';
const GITHUB_AVATAR_FALLBACK = 'https://avatars.githubusercontent.com/u/18216229?v=4';

/* GitHub 上未被过滤掉的兜底项目（API 限流或离线时展示） */
const REPO_FALLBACK = [
  { name: 'mrvf', html_url: 'https://github.com/Sud0x67/mrvf', description: 'This is the code for paper MrMIX.', language: 'Python', stargazers_count: 6 },
  { name: 'team-aligned', html_url: 'https://github.com/Sud0x67/team-aligned', description: 'An AI productivity app that lets you communicate with your silicon-based teammates just like with humans.', language: 'TypeScript', stargazers_count: 4 },
  { name: 'agent-patterns-lab', html_url: 'https://github.com/Sud0x67/agent-patterns-lab', description: 'Implementations of different agent patterns and mini evaluation on them.', language: 'Python', stargazers_count: 1 },
];

const DATA = {
  zh: {
    meta: {
      name: 'Sud0x67',
      headline: '高级开发工程师',
      focus: 'Flink · Kubernetes · 工作流调度 · AI Agent',
    },
    contact: [
      { type: 'email', label: 'jokeroller@163.com', href: 'mailto:jokeroller@163.com' },
      { type: 'github', label: 'github.com/Sud0x67', href: 'https://github.com/Sud0x67' },
      { type: 'link', label: 'sud0x67.github.io', href: 'https://sud0x67.github.io/' },
      { type: 'location', label: '杭州 · Hangzhou' },
    ],
    about: [
      'Apache Flink / Kubernetes 子项目 / Apache DolphinScheduler Contributor。目前在负责智能调优服务 以及 LLM 驱动的 AI Agent 建设，曾经负责工作流调度核心链路。',
      '同济大学硕士（计算机科学与技术，研究方向为多智能体强化学习）、本科（材料科学与工程）。长期活跃于开源社区，关注流计算、调度系统与云原生基础设施。',
    ],
    work: [
      {
        company: '阿里云 · 阿里巴巴集团',
        role: '开发工程师',
        period: '2023.05 – 至今',
        location: '杭州',
        bullets: [
          '负责云上工作流调度核心链路的开发与稳定性建设，覆盖任务编排、优先级调度与资源分配等关键环节。',
          '负责智能调优服务建设：基于作业指标、日志、状态事件为流作业提供参数与资源配置的自动调优，降低作业失败率与资源成本。',
          '负责大数据平台 AI 助手建设：将自然语言问答、故障诊断与常见运维操作接入平台，缩短问题定位路径，提升用户效率。',
        ],
      },
    ],
    openSource: [
      { org: 'Apache Flink', role: 'Contributor', desc: '参与社区 issue 修复与特性讨论，关注 SQL模块。' },
      { org: 'Kubernetes 子项目', role: 'Contributor', desc: '参与 Kubernetes 子项目的代码贡献，修复k8s client java 问题 。' },
      { org: 'Apache DolphinScheduler', role: 'Contributor', desc: '参与工作流调度相关功能的开发。' }
    ],
    research: [
      {
        title: 'Priority Over Quantity: A Self-Incentive Credit Assignment Scheme for Cooperative Multiagent Reinforcement Learning',
        venue: 'IEEE Transactions on Computational Social Systems（2024，第 11 卷第 6 期）',
        desc: '针对合作式多智能体强化学习中的信用分配难题，提出自激励信用分配方案，缓解部分智能体“搭便车”的问题；算法代码已开源。',
        link: 'https://ieeexplore.ieee.org/abstract/document/10630533',
      }
    ],
    education: [
      {
        school: '同济大学',
        degree: '硕士 · 计算机科学与技术',
        period: '2020.09 – 2023.06',
        desc: '研究方向：多智能体强化学习（值函数分解、QMIX 系列算法）。',
      },
      {
        school: '同济大学',
        degree: '学士 · 材料科学与工程',
        period: '2014.09 – 2018.06',
        desc: '材料科学与工程学院。',
      },
    ],
    skills: [
      { category: '流计算与大数据', items: ['流计算控制台', '流作业运维服务', '工作流编排'] },
      { category: '云原生与调度', items: ['Kubernetes', '流计算', '工作流调度系统设计'] },
      { category: '编程语言', items: ['Java', 'Python'] },
      { category: 'AI 与研究', items: ['LLM Agent 应用开发'] },
    ],
    ui: {
      lang: 'zh',
      pdfBtn: '下载 PDF',
      pdfDone: '已生成 PDF',
      pdfFail: 'PDF 生成失败，请重试',
      exporting: '正在生成 PDF…',
      sectionAbout: '个人简介',
      sectionWork: '工作经历',
      sectionResearch: '研究成果',
      sectionEducation: '教育经历',
      sectionProjects: '开源项目',
      projectsHint: '按 star 数排序，每日由 GitHub Actions 更新',
      sectionContact: '联系方式',
      sectionSkills: '技能',
      sectionOpenSource: '开源社区',
      sectionStats: 'GitHub',
      statsSince: '加入于',
      updatedAt: '更新于',
      footerNote: '本页由 GitHub Pages 托管，项目数据来自 GitHub API。© 2026 Sud0x67',
      langTag: 'zh-CN',
    },
  },

  en: {
    meta: {
      name: 'Sud0x67',
      headline: 'Senior Software Engineer',
      focus: 'Flink · Kubernetes · Workflow Scheduling · AI Agent',
    },
    contact: [
      { type: 'email', label: 'jokeroller@163.com', href: 'mailto:jokeroller@163.com' },
      { type: 'github', label: 'github.com/Sud0x67', href: 'https://github.com/Sud0x67' },
      { type: 'link', label: 'sud0x67.github.io', href: 'https://sud0x67.github.io/' },
      { type: 'location', label: 'Hangzhou, China' },
    ],
    about: [
      'Apache Flink / Kubernetes subproject / Apache DolphinScheduler contributor. Currently at Alibaba Cloud, leading the intelligent tuning service and the LLM-powered AI agent initiative, having previously owned the core workflow-scheduling pipeline.',
      'Received an M.S. in Computer Science (multi-agent reinforcement learning) and a B.S. in Materials Science and Engineering, both from Tongji University. Long-term open-source contributor, focused on stream processing, scheduling systems and cloud-native infrastructure.',
    ],
    work: [
      {
        company: 'Alibaba Cloud (Alibaba Group)',
        role: 'Software Engineer',
        period: '2023.05 – Present',
        location: 'Hangzhou',
        bullets: [
          'Own the development and stability of the core workflow-scheduling pipeline on the cloud big-data platform, covering job orchestration, priority scheduling and resource allocation.',
          'Lead the intelligent tuning service: automatically tunes parameters and resource configurations for streaming jobs based on job metrics, logs and state events, reducing job failure rates and resource cost.',
          'Lead the AI assistant for the big-data platform: integrates natural-language Q&A, fault diagnosis and routine ops actions into the platform, shortening the path from symptom to root cause and improving user productivity.',
        ],
      },
    ],
    openSource: [
      { org: 'Apache Flink', role: 'Contributor', desc: 'Fixing issues and joining feature discussions, focused on the SQL modules.' },
      { org: 'Kubernetes subprojects', role: 'Contributor', desc: 'Code contributions to Kubernetes subprojects, including fixes for kubernetes-client/java.' },
      { org: 'Apache DolphinScheduler', role: 'Contributor', desc: 'Contributions to workflow-scheduling features.' },
    ],
    research: [
      {
        title: 'Priority Over Quantity: A Self-Incentive Credit Assignment Scheme for Cooperative Multiagent Reinforcement Learning',
        venue: 'IEEE Transactions on Computational Social Systems, 2024 (vol. 11, no. 6)',
        desc: 'Proposes a self-incentive credit assignment scheme for cooperative MARL that mitigates the free-rider (lazy-agent) problem; reference code is open-sourced.',
        link: 'https://ieeexplore.ieee.org/abstract/document/10630533',
      },
    ],
    education: [
      {
        school: 'Tongji University',
        degree: 'M.S. in Computer Science & Technology',
        period: '2020.09 – 2023.06',
        desc: 'Research focus: multi-agent reinforcement learning (value function factorisation, QMIX-family algorithms).',
      },
      {
        school: 'Tongji University',
        degree: 'B.S. in Materials Science & Engineering',
        period: '2014.09 – 2018.06',
        desc: 'School of Materials Science and Engineering.',
      },
    ],
    skills: [
      { category: 'Stream Processing & Big Data', items: ['Stream computing console', 'Streaming-job O&M service', 'Workflow orchestration'] },
      { category: 'Cloud Native & Scheduling', items: ['Kubernetes', 'Stream computing', 'Workflow scheduling system design'] },
      { category: 'Programming Languages', items: ['Java', 'Python'] },
      { category: 'AI & Research', items: ['LLM agent application development'] },
    ],
    ui: {
      lang: 'en',
      pdfBtn: 'Download PDF',
      pdfDone: 'PDF generated',
      pdfFail: 'Failed to generate PDF, please retry',
      exporting: 'Generating PDF…',
      sectionAbout: 'Profile',
      sectionWork: 'Experience',
      sectionResearch: 'Research',
      sectionEducation: 'Education',
      sectionProjects: 'Open-Source Projects',
      projectsHint: 'sorted by stars, refreshed daily via GitHub Actions',
      sectionContact: 'Contact',
      sectionSkills: 'Skills',
      sectionOpenSource: 'Open Source',
      sectionStats: 'GitHub',
      statsSince: 'on GitHub since',
      updatedAt: 'Updated',
      footerNote: 'Hosted on GitHub Pages. Project data from the GitHub API. © 2026 Sud0x67',
      langTag: 'en',
    },
  },
};

const LANG_COLORS = {
  Java: '#b07219', Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  Go: '#00ADD8', HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Rust: '#dea584',
  C: '#555555', 'C++': '#f34b7d', Jupyter: '#DA5B0B', Dockerfile: '#384d54',
};
