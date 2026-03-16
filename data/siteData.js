// ============================================================
// Centralized Site Data — แก้ข้อมูลทั้งหมดที่ไฟล์เดียว
// ============================================================

// ─── Personal Info ───────────────────────────────────────────
export const personalInfo = {
  name: { th: 'ชิษณุพงษ์ ลิ้มสกุล', en: 'Chisanupong Limsakul' },
  email: 'chisanupong.limsakul@gmail.com',
  phone: '098-990-4873',
  phoneTel: 'tel:0989904873',
  address: { th: '4 หมู่ 5 ห้วยพระ อ.ดอนตูม จ.นครปฐม', en: 'Nakhon Pathom, Thailand' },
  github: 'https://github.com/zvcx22545',
  githubDisplay: 'github.com/zvcx22545',
};

// ─── Tech Tags (About section) ──────────────────────────────
export const techTags = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Next.js', 'MySQL', 'Oracle', 'Git'];

// ─── Career Goals ────────────────────────────────────────────
export const careerGoals = [
  {
    th: 'เพื่อพัฒนาทักษะการเขียนโปรแกรม และหาประสบการณ์การทำงานเพื่อเพิ่มศักยภาพตนเองในด้านต่างๆ',
    en: 'To develop programming skills and gain real-world experience to enhance capabilities',
  },
  {
    th: 'อยากพัฒนาตนเองในด้านการทำงานเป็นทีม และเรียนรู้ในองค์กรทั้งด้าน ความคิด การทำงาน การวางแผนการทำงาน',
    en: 'To grow through teamwork, learn organizational practices, and improve project planning skills',
  },
];

// ─── Skills ──────────────────────────────────────────────────
export const skills = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Next.js', 'Bootstrap 5', 'Tailwind CSS'],
    gradient: 'from-violet-500 to-violet-600',
    borderColor: 'border-violet-500/20',
    bgColor: 'bg-violet-500/8',
    dotColor: 'bg-violet-400',
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Node.js', 'Express.js', 'REST API', 'PHP (PDO)'],
    gradient: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/8',
    dotColor: 'bg-cyan-400',
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['MySQL (Basic)', 'Oracle', 'SQL Query'],
    gradient: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500/20',
    bgColor: 'bg-pink-500/8',
    dotColor: 'bg-pink-400',
  },
  {
    category: 'Tools',
    icon: '🔧',
    items: ['Git', 'GitHub', 'Postman', 'Figma (Basic)'],
    gradient: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/8',
    dotColor: 'bg-blue-400',
  },
];

// ─── Experiences ─────────────────────────────────────────────
export const experiences = [
  {
    title: { th: 'เว็บแลกสินค้า Mybeer', en: 'Mybeer E-Commerce Website' },
    description: {
      th: 'มีประสบการณ์ในการทำหน้าเว็บแลกสินค้า Mybeer โดยเป็นเว็บที่ต้องนำคะแนนมาแลกสินค้าที่หน้าเว็บ โดยใช้ HTML CSS JS jQuery',
      en: 'Developed a product exchange web page for Mybeer — a points-based product redemption system using HTML, CSS, JS, jQuery',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    color: 'violet',
  },
  {
    title: { th: 'เว็บสะสมแต้ม / สั่งซื้อสินค้า Mybeer', en: 'Mybeer Points & Shopping System' },
    description: {
      th: 'มีประสบการณ์ในการทำเว็บสะสมแต้มจากการซื้อสินค้าของ Mybeer โดยใช้ HTML CSS JS jQuery',
      en: 'Built a loyalty points collection and product ordering system for Mybeer using HTML, CSS, JS, jQuery',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    color: 'cyan',
  },
  {
    title: { th: 'Landing Page ของ Mybeer', en: 'Mybeer Landing Page' },
    description: {
      th: 'มีประสบการณ์ในการทำ Landing Page ของ Mybeer โดยใช้ HTML CSS JS jQuery',
      en: 'Created a Landing Page for Mybeer using HTML, CSS, JS, jQuery',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    link: 'https://myworld-virtual-store.com/present/',
    color: 'pink',
  },
  {
    title: { th: 'โปรเจกต์จบการศึกษา', en: 'Web Project (Graduation)' },
    description: {
      th: 'ทำโปรเจคเอกสารการศึกษาโดยใช้ HTML CSS JS PHP (PDO) ในการออกแบบหน้าเว็บไซต์ และ เชื่อมต่อฐานข้อมูล',
      en: 'Built a document management web project using HTML, CSS, JS, PHP (PDO) with database integration',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'PDO'],
    link: 'https://github.com/zvcx22545/Webproject',
    color: 'violet',
  },
  {
    title: { th: 'ระบบบริจาคโลหิต (สภากาชาดไทย)', en: 'Blood Donation System (Thai Red Cross)' },
    description: {
      th: 'มีส่วนร่วมในการพัฒนา และ แก้ไขปัญหา (Bug fixing) ของระบบบริจาคโลหิตของสภากาชาดไทย',
      en: 'Contributed to development and bug fixing for the Thai Red Cross Blood Donation System',
    },
    tech: ['Bug Fixing', 'Development'],
    color: 'cyan',
  },
];

// ─── Projects ────────────────────────────────────────────────
export const projects = [
  {
    title: { th: 'Mybeer Landing Page', en: 'Mybeer Landing Page' },
    description: {
      th: 'ทำ Landing Page สำหรับ Mybeer เพื่อนำเสนอสินค้าและบริการ โดยใช้ HTML CSS JS jQuery',
      en: 'Created a Landing Page for Mybeer to showcase products and services using HTML, CSS, JS, jQuery',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    link: 'https://myworld-virtual-store.com/present/',
    github: null,
    color: 'violet',
  },
  {
    title: { th: 'โปรเจกต์จบ - Web Project', en: 'Graduation Web Project' },
    description: {
      th: 'โปรเจกต์เอกสารการศึกษา ใช้ HTML CSS JS PHP (PDO) ในการออกแบบหน้าเว็บ และเชื่อมต่อฐานข้อมูล',
      en: 'A document management system using HTML, CSS, JS, PHP (PDO) with database connection and web design',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'PDO', 'MySQL'],
    link: null,
    github: 'https://github.com/zvcx22545/Webproject',
    color: 'cyan',
  },
  {
    title: { th: 'ระบบแลกสินค้า Mybeer', en: 'Mybeer Exchange System' },
    description: {
      th: 'ระบบเว็บแลกสินค้าด้วยคะแนน ตะกร้า และระบบสั่งซื้อสินค้า พัฒนาด้วย HTML CSS JS jQuery',
      en: 'Product exchange system with points, shopping cart, and ordering built with HTML, CSS, JS, jQuery',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    link: null,
    github: null,
    color: 'pink',
  },
];

// ─── Education ───────────────────────────────────────────────
export const educationData = [
  {
    period: '2020 - 2024',
    degree: { th: 'ปริญญาตรี', en: "Bachelor's Degree" },
    school: {
      th: 'มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน',
      en: 'Kasetsart University, Kamphaeng Saen Campus',
    },
    faculty: {
      th: 'คณะศิลปศาสตร์และวิทยาศาสตร์',
      en: 'Faculty of Liberal Arts and Science',
    },
    icon: '🎓',
    color: 'violet',
  },
  {
    period: '2014 - 2020',
    degree: { th: 'มัธยมศึกษา', en: 'High School' },
    school: {
      th: 'โรงเรียนพระปฐมวิทยาลัย (ปฐมวิทยา 2)',
      en: 'Phra Pathom Witthayalai School',
    },
    faculty: null,
    icon: '📚',
    color: 'cyan',
  },
];

// ─── Contact Info ────────────────────────────────────────────
export const contactInfo = [
  { icon: '📧', labelKey: 'contact.email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: '📱', labelKey: 'contact.phone', value: personalInfo.phone, href: personalInfo.phoneTel },
  { icon: '🔗', label: 'GitHub', value: personalInfo.githubDisplay, href: personalInfo.github, external: true },
];

// ─── Shared Color Map ────────────────────────────────────────
export const colorMap = {
  violet: {
    dot: 'bg-violet-400',
    line: 'from-violet-400 to-violet-600',
    badge: 'bg-violet-500/15 border-violet-500/20 text-violet-300',
    border: 'border-violet-500/20',
    borderHover: 'border-violet-500/20 hover:border-violet-500/40',
    bg: 'bg-violet-500/5',
    accent: 'from-violet-500 to-violet-600',
    periodBadge: 'bg-violet-500/20 text-violet-300',
    gradient: 'from-violet-500 to-violet-600',
  },
  cyan: {
    dot: 'bg-cyan-400',
    line: 'from-cyan-400 to-cyan-600',
    badge: 'bg-cyan-500/15 border-cyan-500/20 text-cyan-300',
    border: 'border-cyan-500/20',
    borderHover: 'border-cyan-500/20 hover:border-cyan-500/40',
    bg: 'bg-cyan-500/5',
    accent: 'from-cyan-500 to-cyan-600',
    periodBadge: 'bg-cyan-500/20 text-cyan-300',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  pink: {
    dot: 'bg-pink-400',
    line: 'from-pink-400 to-pink-600',
    badge: 'bg-pink-500/15 border-pink-500/20 text-pink-300',
    border: 'border-pink-500/20',
    borderHover: 'border-pink-500/20 hover:border-pink-500/40',
    bg: 'bg-pink-500/5',
    accent: 'from-pink-500 to-pink-600',
    periodBadge: 'bg-pink-500/20 text-pink-300',
    gradient: 'from-pink-500 to-pink-600',
  },
  blue: {
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/15 border-blue-500/20 text-blue-300',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/8',
    gradient: 'from-blue-500 to-blue-600',
  },
};

// ─── Email Form Fields ───────────────────────────────────────
export const emailFormFields = [
  { id: 1, labelKey: 'contact.form.name', fieldKey: 'name', placeholder: 'contact.form.namePlaceholder', required: true },
  { id: 2, labelKey: 'contact.form.email', fieldKey: 'email', placeholder: 'contact.form.emailPlaceholder', required: true },
  { id: 3, labelKey: 'contact.form.subject', fieldKey: 'title', placeholder: 'contact.form.subjectPlaceholder', required: true },
  { id: 4, labelKey: 'contact.form.message', fieldKey: 'message', placeholder: 'contact.form.messagePlaceholder', required: true, isTextArea: true },
];
