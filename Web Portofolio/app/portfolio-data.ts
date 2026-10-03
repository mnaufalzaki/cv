export type Language = "en" | "id";

export type LocalizedText = {
  en: string;
  id: string;
};

export type Project = {
  slug: string;
  title: string;
  description: LocalizedText;
  category: string;
  year: string;
  tags: string[];
  github: string;
  demo?: string;
  featured: boolean;
};

export const profile = {
  name: "Muhammad Naufal Zaki",
  handle: "@naufallzakki",
  title: {
    en: "Information Systems Student",
    id: "Mahasiswa Sistem Informasi",
  },
  bio: {
    en: "Information Systems undergraduate at Airlangga University and BSI Scholarship awardee with experience in leadership, stakeholder coordination, partnerships, and operational project management. Developing a career at the intersection of technology, business, and organizational transformation, with interests in enterprise systems, technology risk, financial technology, and emerging technologies. Strong in communication, analytical thinking, cross-functional collaboration, and structured problem-solving.",
    id: "Mahasiswa Sistem Informasi di Universitas Airlangga dan penerima beasiswa BSI Scholarship. Memiliki pengalaman dalam kepemimpinan, koordinasi berbagai pihak, kemitraan strategis, serta pengelolaan proyek operasional. Tertarik mengembangkan karier yang menghubungkan teknologi, bisnis, dan perubahan organisasi, khususnya dalam sistem enterprise, risiko teknologi, fintech, dan perkembangan teknologi baru. Didukung kemampuan komunikasi, berpikir analitis, kolaborasi lintas fungsi, serta pemecahan masalah secara terstruktur.",
  },
  location: "Surabaya, Indonesia",
  email: "naufalz562@gmail.com",
  github: "https://github.com/mnaufalzaki",
  linkedin: "https://www.linkedin.com/in/naufalz/",
  cv: "/muhammad-naufal-zaki-cv.pdf",
};

export const experiences = [
  {
    organization: "BSI Scholarship UNAIR",
    role: {
      en: "Coordinator of BSI Scholarship Inspirasi UNAIR",
      id: "Koordinator BSI Scholarship Inspirasi UNAIR",
    },
    type: { en: "Contract", id: "Kontrak" },
    period: { en: "Nov 2025 — Present", id: "Nov 2025 — Sekarang" },
    location: "Surabaya",
    tags: [
      "Leadership",
      "Stakeholder Coordination",
      "Community Engagement",
      "Program Operations",
    ],
    bullets: [
      {
        en: "Initiated and led the BSI Scholarship UNAIR Iftar Gathering, bringing together 32 awardees across scholarship categories and creating an inclusive space to strengthen trust, connection, and a shared sense of belonging.",
        id: "Menginisiasi dan memimpin BSI Scholarship UNAIR Iftar Gathering yang mempertemukan 32 penerima beasiswa lintas kategori, serta menciptakan ruang inklusif untuk memperkuat rasa percaya, koneksi, dan rasa saling memiliki.",
      },
      {
        en: "Structured team responsibilities, delegated tasks, and directed the overall execution of the event, including venue selection, reservations, operational planning, and coordination of event requirements.",
        id: "Menyusun pembagian tanggung jawab tim, mendelegasikan tugas, dan mengarahkan keseluruhan eksekusi acara mulai dari pemilihan lokasi, manajemen reservasi, perencanaan operasional, hingga koordinasi logistik.",
      },
      {
        en: "Led the coordination and ongoing support of BSI Scholarship Inspirasi awardees across scholarship disbursement, blazer distribution, training, mentoring, development sessions, and program responsibilities, while ensuring clear communication and accessible support.",
        id: "Mengoordinasikan dan mendampingi penerima BSI Scholarship Inspirasi secara berkelanjutan dalam proses pencairan dana, distribusi jas almamater/blazer, pelatihan, mentoring, sesi pengembangan diri, hingga pemenuhan tanggung jawab program dengan komunikasi yang jelas dan responsif.",
      },
      {
        en: "Initiated the BSI Scholarship UNAIR Company Profile initiative for an 80+ awardee community across three scholarship tracks, coordinating availability polling with 72 respondents and coordinating 50+ participants throughout the photoshoot execution.",
        id: "Menginisiasi pembuatan Company Profile BSI Scholarship UNAIR bagi 80+ penerima beasiswa dari tiga jalur seleksi, mengoordinasikan survei ketersediaan waktu bersama 72 responden, serta memandu 50+ peserta selama pelaksanaan sesi pemotretan.",
      },
      {
        en: "Collaborated with scholarship coordinators, the design team, vendors, and participants to align communication, schedules, budgets, and execution quality, while building familiarity and improving the quality of relationships.",
        id: "Berkolaborasi aktif dengan koordinator beasiswa, tim desain, vendor, dan partisipan untuk menyelaraskan komunikasi, jadwal kerja, alokasi anggaran, serta mutu eksekusi demi menjaga kelancaran program dan memperkuat relasi antarpemangku kepentingan.",
      },
    ],
  },
  {
    organization: "Loka Coffee",
    role: {
      en: "Marketing & Partnerships Associate",
      id: "Marketing & Partnerships Associate",
    },
    type: { en: "Part-time", id: "Part-time" },
    period: { en: "Jun 2025 — Mar 2026", id: "Jun 2025 — Mar 2026" },
    location: "Surabaya",
    tags: [
      "Partnerships",
      "Brand Marketing",
      "Social Media Strategy",
      "Community Management",
    ],
    bullets: [
      {
        en: "Secured and managed partnerships with 5 external organizations, aligning collaboration objectives, deliverables, timelines, and operational requirements.",
        id: "Menjalin dan mengelola kemitraan dengan 5 organisasi eksternal, menyelaraskan tujuan kolaborasi, deliverables, linimasa kerja, serta kebutuhan operasional.",
      },
      {
        en: "Coordinated 3 partner and community events from planning through on-site execution, managing partner requirements, timelines, and operational logistics.",
        id: "Mengoordinasikan 3 acara mitra dan komunitas mulai dari tahap perencanaan hingga eksekusi di lokasi, mengelola kebutuhan mitra, jadwal acara, serta logistik operasional.",
      },
      {
        en: "Negotiated collaboration arrangements between Loka Coffee and external partners, balancing business objectives with partner needs to establish mutually beneficial partnerships.",
        id: "Menegosiasikan kesepakatan kolaborasi antara Loka Coffee dan mitra eksternal, menyeimbangkan target bisnis dengan kebutuhan mitra guna membangun kerja sama yang saling menguntungkan.",
      },
      {
        en: "Monitored monthly Instagram performance and adjusted content strategies, contributing to a 321% increase in monthly views from 9.5K to 40K, with peak account reach of 8,787.",
        id: "Memantau performa bulanan Instagram dan menyesuaikan strategi konten, berkontribusi pada peningkatan tayangan bulanan sebesar 321% dari 9,5K menjadi 40K dengan jangkauan akun tertinggi mencapai 8.787.",
      },
    ],
  },
  {
    organization: "American Corner",
    role: { en: "Media Production", id: "Produksi Media" },
    type: { en: "Internship", id: "Magang" },
    period: { en: "Dec 2024 — Dec 2025", id: "Des 2024 — Des 2025" },
    location: "Surabaya",
    tags: [
      "Video Production",
      "Audiovisual Production",
      "Creative Content",
    ],
    bullets: [
      {
        en: "Produced and edited approximately 3 video projects per month, translating creative concepts into polished outputs aligned with program objectives.",
        id: "Memproduksi dan menyunting sekitar 3 proyek video per bulan, menerjemahkan konsep kreatif menjadi karya visual berkualitas yang selaras dengan tujuan program.",
      },
      {
        en: "Supported technical production for approximately 4 routine programs per month, handling camera feeds, audio mixing, lighting, and recording setup.",
        id: "Mendukung produksi teknis untuk sekitar 4 program rutin per bulan, meliputi penanganan input kamera, audio mixing, tata pencahayaan, dan persiapan rekaman.",
      },
      {
        en: "Collaborated with program and content teams to coordinate production requirements and ensure smooth execution of live and recorded activities.",
        id: "Berkolaborasi dengan tim program dan konten untuk mengoordinasikan kebutuhan produksi guna memastikan kelancaran kegiatan, baik siaran langsung maupun rekaman.",
      },
      {
        en: "Troubleshot technical issues in real time during live events, helping maintain uninterrupted program execution.",
        id: "Mengatasi kendala teknis secara real-time saat acara siaran langsung untuk menjaga kelancaran program tanpa gangguan.",
      },
    ],
  },
  {
    organization: "Organizing Committee, Class of 2024 SMA 1 Tawangsari",
    role: { en: "Treasurer", id: "Bendahara" },
    type: { en: "Committee", id: "Kepanitiaan" },
    period: { en: "Nov 2023 — May 2024", id: "Nov 2023 — Mei 2024" },
    location: "Sukoharjo",
    tags: ["Budgeting", "Cost Optimization", "Financial Reporting"],
    bullets: [
      {
        en: "Managed a budget of IDR 60 million for batch activities over 7 months, ensuring 100% accuracy in financial records and transaction tracking.",
        id: "Mengelola anggaran kegiatan angkatan sebesar Rp60 juta selama 7 bulan dengan akurasi pencatatan dan pelacakan transaksi 100%.",
      },
      {
        en: "Designed and supervised budget allocation strategies for various events, achieving cost savings of approximately 12% while maintaining quality.",
        id: "Merancang dan mengawasi alokasi anggaran berbagai program kerja, berhasil mencapai efisiensi biaya sekitar 12% tanpa menurunkan mutu kegiatan.",
      },
      {
        en: "Prepared detailed financial reports periodically, enhancing transparency and accountability within the committee.",
        id: "Menyusun laporan pertanggungjawaban keuangan berkala secara terperinci guna menjaga transparansi dan akuntabilitas kepanitiaan.",
      },
      {
        en: "Coordinated with the management team to organize successful event prom attended by 345 participants, receiving positive feedback for smooth execution and memorable experiences.",
        id: "Bekerja sama dengan tim inti dalam menyelenggarakan acara prom kelulusan yang diikuti 345 peserta, serta meraih apresiasi positif atas kelancaran dan keberhasilan acara.",
      },
    ],
  },
  {
    organization: "Organizing Committee, Class of 2024 SMA 1 Tawangsari",
    role: {
      en: "Screenwriter & Story Development",
      id: "Penulis Skenario & Pengembangan Cerita",
    },
    type: { en: "Committee", id: "Kepanitiaan" },
    period: { en: "Dec 2023 — Jul 2024", id: "Des 2023 — Jul 2024" },
    location: "Sukoharjo",
    tags: ["Storytelling", "Production", "Team Coordination"],
    bullets: [
      {
        en: "Conceptualized and developed storyline for high school graduation film, creating meaningful memories for 300+ graduating students.",
        id: "Merancang dan mengembangkan konsep cerita untuk film kelulusan angkatan, mempersembahkan karya kenangan bermakna bagi 300+ siswa.",
      },
      {
        en: "Authored the majority of the screenplay, ensuring cohesive narrative structure and authentic dialogue that effectively reflected the student experience.",
        id: "Menulis naskah skenario utama dengan struktur narasi yang kohesif serta dialog autentik yang merefleksikan dinamika kehidupan sekolah.",
      },
      {
        en: "Supervised the entire production process from pre-production through completion, ensuring 100% adherence to storyboard specifications and script requirements.",
        id: "Mengawasi alur produksi secara menyeluruh dari praproduksi hingga pascaproduksi, memastikan kesesuaian 100% terhadap storyboard dan naskah.",
      },
      {
        en: "Coordinated with the production team to manage a rigorous filming schedule, guaranteeing all scenes were completed on time while maintaining fidelity to the original creative vision.",
        id: "Mengatur jadwal pengambilan gambar yang padat bersama kru produksi, memastikan seluruh adegan tuntas tepat waktu sesuai visi kreatif yang ditargetkan.",
      },
    ],
  },
  {
    organization: "Rohani Islam · SMA 1 Tawangsari",
    role: { en: "Public Relations", id: "Hubungan Masyarakat" },
    type: { en: "Organization", id: "Organisasi" },
    period: { en: "Apr 2023 — Nov 2023", id: "Apr 2023 — Nov 2023" },
    location: "Sukoharjo",
    tags: [
      "Public Relations",
      "Stakeholder Communication",
      "Event Coordination",
    ],
    bullets: [
      {
        en: "Coordinated communication and information dissemination for organizational programs while collaborating with OSIS, MPK, and school representatives.",
        id: "Mengoordinasikan alur komunikasi dan diseminasi informasi program organisasi sekaligus berkolaborasi aktif dengan perwakilan OSIS, MPK, dan pihak sekolah.",
      },
      {
        en: "Supported the coordination of Pesantren Kilat and Tadarus activities, organizing participant schedules, activity flow, and Quran recitation sessions.",
        id: "Mendukung koordinasi kegiatan Pesantren Kilat dan Tadarus, mengatur jadwal peserta, alur kegiatan, hingga pelaksanaan sesi tilawah Al-Qur'an.",
      },
      {
        en: "Collaborated with fellow committee members on event logistics and on-site coordination, helping programs run according to schedule and resolving operational issues as they arose.",
        id: "Berkolaborasi dengan sesama panitia dalam penanganan logistik dan koordinasi lapangan, memastikan seluruh program terlaksana sesuai jadwal serta menyelesaikan kendala operasional secara langsung.",
      },
    ],
  },
];

const repositoryBase =
  "https://github.com/mnaufalzaki/CS-Fundamentals-UNAIR/tree/main";

export const projects: Project[] = [
  {
    slug: "nusacarbon-blockchain-platform",
    title: "NusaCarbon: Carbon Credit Marketplace & MRV Verification",
    description: {
      en: "A comprehensive web and mobile prototype for a blockchain-based carbon credit marketplace, engineered for transparent MRV (Measurement, Reporting, and Verification) workflows and the prevention of double offset claims.",
      id: "Prototipe platform web dan aplikasi mobile marketplace kredit karbon berbasis blockchain untuk verifikasi MRV (Measurement, Reporting, and Verification) yang transparan serta pencegahan klaim ganda (*double offset claims*) dalam perdagangan karbon.",
    },
    category: "Web & Mobile",
    year: "2026",
    tags: ["Java", "Dart", "Flutter", "Prototype", "Web App"],
    github: `${repositoryBase}/NusaCarbonWEB`,
    featured: true,
  },
  {
    slug: "credit-default-risk-ai",
    title: "Credit Default Risk AI",
    description: {
      en: "A machine-learning project exploring credit default risk through structured data and model-driven analysis.",
      id: "Pengembangan model machine learning untuk memprediksi dan menganalisis risiko gagal bayar kredit berdasarkan data terstruktur.",
    },
    category: "Data & ML",
    year: "2026",
    tags: ["Python", "Machine Learning", "Streamlit"],
    github: `${repositoryBase}/CreditDefaultRiskAI`,
    featured: true,
  },
  {
    slug: "academic-advising-decision-support-system",
    title: "Academic Advising Decision Support System (AADSS)",
    description: {
      en: "A lightweight, rule-based Academic Advising Decision Support System designed for faculty academic advisors at Universitas Airlangga, featuring automated KRS credit ceiling calculations, multi-semester cohort progress tracking, milestone checkpoint risk detection, and ad-hoc advising simulation.",
      id: "Sistem pendukung keputusan berbasis aturan yang membantu dosen wali Sistem Informasi Universitas Airlangga dalam perwalian akademik. Mendukung perhitungan batas maksimal SKS secara otomatis, pemantauan perkembangan akademik setiap angkatan dari semester ke semester, deteksi dini risiko pada evaluasi studi, serta simulasi perwalian tanpa memerlukan dataset.",
    },
    category: "Data & ML",
    year: "2026",
    tags: ["Python", "Streamlit", "Plotly", "Pandas", "Data Analytics"],
    github: `${repositoryBase}/Academic%20Advising%20Decision%20Support%20System%20(AADSS)`,
    featured: true,
  },
  {
    slug: "stock-price-prediction-ga-rf",
    title: "Stock Trend Classification with Genetic Algorithm & Random Forest",
    description: {
      en: "An empirical machine-learning study leveraging Genetic Algorithms for optimal feature selection in Random Forest models to classify daily price movement trends on Bank Central Asia (BBCA.JK) equities.",
      id: "Studi komparasi machine learning yang memanfaatkan Genetic Algorithm untuk seleksi fitur optimal pada model Random Forest dalam mengklasifikasikan tren pergerakan saham Bank Central Asia (BBCA.JK).",
    },
    category: "Data & ML",
    year: "2026",
    tags: ["Python", "Genetic Algorithm", "Random Forest", "Finance"],
    github: `${repositoryBase}/Stock%20Price%20Prediction%20(GA%20%2B%20RF)`,
    featured: true,
  },
  {
    slug: "customer-segmentation",
    title: "Customer Segmentation with K-Means & K-Modes",
    description: {
      en: "Customer segmentation analysis using K-Means and K-Modes to identify distinct behavioral and spending profiles across numerical and categorical customer data.",
      id: "Analisis segmentasi pelanggan menggunakan K-Means dan K-Modes untuk mengidentifikasi profil perilaku serta pola pengeluaran pelanggan pada data numerik dan kategorikal.",
    },
    category: "Data & ML",
    year: "2026",
    tags: ["Python", "Clustering", "Data Analysis"],
    github: `${repositoryBase}/Clustering%20%26%20Customer%20Segmentation`,
    featured: true,
  },
  {
    slug: "car-price-prediction",
    title: "Car Price Prediction",
    description: {
      en: "A regression project for estimating vehicle prices and evaluating prediction performance.",
      id: "Penerapan model regresi untuk estimasi valuasi harga kendaraan dan evaluasi performa prediksi metrik data.",
    },
    category: "Data & ML",
    year: "2026",
    tags: ["Python", "Regression", "Model Evaluation"],
    github: `${repositoryBase}/Car%20Price%20Prediction`,
    featured: false,
  },
  {
    slug: "wine-quality-classification",
    title: "Wine Quality Classification",
    description: {
      en: "A classification exercise exploring data preparation, model training, and performance interpretation.",
      id: "Studi klasifikasi kualitas berbasis data yang berfokus pada persiapan data, pelatihan model, dan interpretasi akurasi.",
    },
    category: "Data & ML",
    year: "2026",
    tags: ["Python", "Classification", "Data Preparation"],
    github: `${repositoryBase}/Wine%20Quality%20Classification`,
    featured: false,
  },
  {
    slug: "decision-tree-classification",
    title: "Decision Tree Classification",
    description: {
      en: "A focused implementation of a decision-tree classification workflow.",
      id: "Implementasi terfokus dari alur klasifikasi menggunakan algoritma decision tree.",
    },
    category: "Fundamentals",
    year: "2026",
    tags: ["Python", "Decision Tree", "Classification"],
    github: `${repositoryBase}/Decision%20Tree%20Classification`,
    featured: false,
  },
  {
    slug: "imbalanced-data-handling",
    title: "Imbalanced Data Handling",
    description: {
      en: "An academic exploration of techniques for preparing and learning from imbalanced datasets.",
      id: "Eksplorasi teknik penanganan ketidakseimbangan data (*class imbalance*) dalam pemodelan machine learning.",
    },
    category: "Fundamentals",
    year: "2026",
    tags: ["Python", "Data Preparation", "Machine Learning"],
    github: `${repositoryBase}/Imbalanced%20Data%20Handling`,
    featured: false,
  },
  {
    slug: "feature-extraction-selection",
    title: "Feature Extraction & Selection",
    description: {
      en: "A practical study of reducing, extracting, and selecting useful features for modeling.",
      id: "Studi rekayasa fitur (*feature engineering*) untuk reduksi dimensi dan pemilihan fitur optimal dalam pemodelan data.",
    },
    category: "Fundamentals",
    year: "2026",
    tags: ["Python", "Feature Engineering", "Data Preparation"],
    github: `${repositoryBase}/Feature%20Extraction%20%26%20Selection`,
    featured: false,
  },
  {
    slug: "data-normalization",
    title: "Data Normalization",
    description: {
      en: "A fundamentals exercise focused on normalization techniques and their role in data preparation.",
      id: "Implementasi berbagai teknik normalisasi data sebagai tahapan penting dalam pra-pemrosesan data (*data preprocessing*).",
    },
    category: "Fundamentals",
    year: "2026",
    tags: ["Python", "Normalization", "Data Preparation"],
    github: `${repositoryBase}/Data%20Normalization`,
    featured: false,
  },
];

export const stackGroups = [
  {
    number: "01",
    title: { en: "Technical foundations", id: "Fondasi Teknis & Data" },
    items: [
      "Python",
      "Tableau",
      "Machine Learning",
      "Data Preparation",
      "Git & GitHub",
    ],
  },
  {
    number: "02",
    title: { en: "Application & delivery", id: "Aplikasi & Pengembangan Produk" },
    items: [
      "Java",
      "Flutter",
      "Dart",
      "Docker",
      "Streamlit",
      "Web Development",
    ],
  },
  {
    number: "03",
    title: { en: "Leadership & operations", id: "Kepemimpinan & Operasional" },
    items: [
      "Stakeholder Coordination",
      "Partnerships",
      "Event Operations",
      "Budgeting",
      "Media Production",
    ],
  },
];

export const impactStats = [
  {
    value: "50+",
    label: {
      en: "awardees coordinated in a cross-scholarship initiative across three categories",
      id: "penerima beasiswa dikoordinasikan dalam inisiatif lintas kategori",
    },
  },
  {
    value: "IDR 60M",
    label: {
      en: "activity budget managed with accountable records",
      id: "anggaran kegiatan angkatan dikelola secara akuntabel dan transparan",
    },
  },
  {
    value: "5",
    label: {
      en: "external partnerships established through strategic collaboration",
      id: "kemitraan eksternal berhasil dibangun melalui kolaborasi strategis",
    },
  },
  {
    value: "+321%",
    label: {
      en: "monthly Instagram views growth from 9.5K to 40K",
      id: "pertumbuhan tayangan bulanan Instagram dari 9,5 ribu ke 40 ribu",
    },
  },
];
