export type GalleryImage = { src: string; alt: string; caption: string; kind?: "Achievement" | "Participation" };
export type Project = {
  slug: string; title: string; shortTitle: string; category: string; date: string;
  description: string; stack: string[]; problem: string; contribution: string;
  approach: { title: string; text: string }[]; results: { value: string; label: string }[];
  outcome: string; kind?: 'booking' | 'lunar' | 'workflow';
  repositoryUrl?: string; images?: GalleryImage[]; features?: string[]; setup?: string;

};
export const projects: Project[] = [
  {
    slug: 'event-booking', title: 'Scalable Event Booking Platform', shortTitle: 'Built for the rush.', category: 'Distributed systems', date: 'August 2026', kind: 'booking',
    description: 'A ticketing system designed for the moment everyone clicks at once.',
    features: ['JWT authentication and role-based access control', 'Expiring inventory holds and idempotent checkout', 'Redis queueing and caching'],
    stack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'Redis', 'Docker', 'Nginx', 'JMeter'],
    problem: 'Ticket booking brings several challenges together: concurrent demand, limited inventory, and checkouts that may be retried. The platform explores how to coordinate admission, reservations, and payment-flow state under load.',
    contribution: 'Developed a microservices-based event-ticketing platform, from authentication and inventory holds to checkout and load testing.',
    approach: [
      { title: 'Control admission', text: 'Redis-based queueing and caching manage access to the booking flow. JWT authentication and role-based access control separate user permissions.' },
      { title: 'Protect the reservation', text: 'Concurrent reservations use expiring inventory holds. Idempotent checkout handles repeated requests, with MySQL providing persistence.' },
      { title: 'Test the complete flow', text: 'Containerized the platform with Docker and load-tested it with JMeter, measuring throughput, errors, and checkout completion under concurrent demand.' },
    ],
    results: [{ value: '1,000', label: 'Concurrent test users' }, { value: '143', label: 'Requests per second' }, { value: '0%', label: 'Errors in the load test' }],
    outcome: 'The documented test processed 7,000 requests, with 100% checkout completion for successfully admitted users. These are results from the project load test, rather than production traffic.'
  },
  {
    slug: 'lunar-navigation', title: 'Lunar Surface Navigation', shortTitle: 'Finding a way forward.', category: 'Geospatial AI', date: 'June 2025', kind: 'lunar',
    description: 'Turning Chandrayaan-2 observations into safer paths across the lunar south pole.',
    features: ['Terrain hazard detection from aligned lunar datasets', 'Route planning with PRM-RL', 'Interactive Three.js rover simulation'],
    stack: ['Chandrayaan-2 data', 'Computer vision', 'PRM-RL', 'Georeferencing', 'Three.js'],
    problem: 'Planning a route across the Moon’s south pole requires aligning different observations, identifying terrain hazards, and finding a navigable path through an unfamiliar landscape.',
    contribution: 'Analyzed Chandrayaan-2 datasets, compared hazard-detection and path-planning methods, and developed an interactive 3D rover simulation to visualize planned routes.',
    approach: [
      { title: 'Understand the terrain', text: 'Aligned datasets through georeferencing and explored YOLOv8, Digital Terrain Models, and Hough Transform with Canny edge detection for hazard identification. The latter produced the best results within the project comparison.' },
      { title: 'Find a navigable path', text: 'Compared more than five path-planning algorithms and selected PRM-RL based on its performance in the project evaluation.' },
      { title: 'Make the data explorable', text: 'Used the Imaging Infrared Spectrometer’s 3 μm hydration feature to identify potential water-ice sites, and built a Three.js rover simulation to communicate the planned route.' },
    ],
    results: [{ value: '5+', label: 'Planning algorithms evaluated' }, { value: '1st', label: 'Runner-up in the ISRO BAH problem statement' }, { value: '3D', label: 'Interactive rover simulation' }],
    outcome: 'The project earned first runner-up in its problem statement at ISRO Bharatiya Antariksh Hackathon 2025. The simulation illustrates route planning; it is not a deployed rover system.'
  },
  {
    slug: 'workflow-generator', title: 'No-Code Workflow Generator', shortTitle: 'From intent to execution.', category: 'Agentic AI', date: 'October 2025', kind: 'workflow',
    description: 'Natural-language ideas become visual, executable AI workflows.',
    features: ['Natural-language workflow generation', 'Visual workflow graphs and persistent storage', 'Asynchronous execution with interchangeable model providers'],
    stack: ['React', 'FastAPI', 'ReactFlow', 'Agno', 'OpenAI', 'Gemini', 'Groq'],
    problem: 'Connecting AI tasks into a working process involves both expressing the workflow and coordinating its execution. This project explores a natural-language entry point to that process.',
    contribution: 'Built a full-stack workflow automation platform that converts prompts into visual workflow graphs, backed by an asynchronous execution engine and multi-agent orchestration.',
    approach: [
      { title: 'Start with intent', text: 'Convert a natural-language prompt into a dynamically generated workflow graph, represented visually with ReactFlow.' },
      { title: 'Compose the execution', text: 'Use modular nodes and concurrent task scheduling to execute the workflow asynchronously, with persistent workflow storage.' },
      { title: 'Keep models interchangeable', text: 'Integrate OpenAI, Gemini, and Groq through the orchestration layer to support model-agnostic execution.' },
    ],
    results: [{ value: 'Finalist', label: 'Media.net aiVolution 2025' }, { value: '3', label: 'Model providers integrated' }, { value: 'Async', label: 'Concurrent task execution' }],
    outcome: 'Built as a Media.net aiVolution Hackathon 2025 finalist project, demonstrating prompt-to-workflow generation and execution across multiple model providers.'
  },
];
export type Experience = { company: string; role: string; period: string; place: string; summary: string; highlights: string[]; images?: GalleryImage[] };
export const experience: Experience[] = [
  { company: 'Wissen Technology', role: 'Trainee Analyst', period: 'Jul 2026 — Present', place: 'Mumbai', summary: 'Building foundations in enterprise engineering through training in Java, Spring Boot, and AI frameworks.', highlights: [] },
  { company: 'Swiggy', role: 'SDE Intern', period: 'Sep 2025 — Jun 2026', place: 'Bengaluru', summary: 'Built tools for the people behind everyday operations—from conversational analytics to warehouse systems.', highlights: ['Built a React, AG Grid, FastAPI, and PostgreSQL spreadsheet alternative for 500k+ row datasets, saving 8 hours of analysis per day and improving FnV fill rate by up to 2%.', 'Developed a guarded conversational SQL interface with LangChain, chart suggestions, chat history, and LangSmith observability. Received the AI Explorer Award in February 2026.', 'Created an in-house ZPL label-printing system with a Python UI, saving ₹26 lakh annually.'] },
  { company: 'Dimension Six Technologies', role: 'Software Development Intern', period: 'Feb — Jul 2025', place: 'Mumbai', summary: 'Worked on real-time cyclist safety: vehicle detection, risk assessment, and voice alerts through a Flutter interface.', highlights: ['Converted the inference pipeline to Edge TPU-compatible TensorFlow Lite, reducing inference time by 95.5% and enabling deployment on Raspberry Pi 4 with Google Coral TPU.'] },
  { company: 'Ultraceuticals', role: 'AI / ML Intern', period: 'Nov 2024 — Apr 2025', place: 'Research & AI', summary: 'Explored drug–target relationships through research retrieval, Gemini-based RAG, and graph neural networks.', highlights: ['Processed drug–target data and research papers to assist researchers in identifying potential candidates and predicting missing interactions.'] },
];
export const additionalProjects: Project[] = [
  { slug: 'healthcare-crm', title: 'Healthcare CRM', shortTitle: 'Healthcare CRM', category: 'Full-stack · Mumbai Hacks', date: '2025', description: 'Hospital and doctor portals with 55+ REST endpoints, a conversational AI receptionist, and real-time operational dashboards.', stack: [], problem: '', contribution: '', approach: [], results: [], outcome: '' },
  { slug: 'geospatial-tourism-analysis', title: 'Geospatial Tourism Analysis', shortTitle: 'Geospatial Tourism Analysis', category: 'Computer vision · Geospatial', date: '2025', description: 'ResNet-50 image features and a hierarchical latent-variable model explore tourism patterns and hidden points of interest across Mumbai.', stack: [], problem: '', contribution: '', approach: [], results: [], outcome: '' },
  { slug: 'automatic-ad-optimization', title: 'Automatic Ad Optimization', shortTitle: 'Automatic Ad Optimization', category: 'Agentic AI · Marketing', date: '2025', description: 'AI agents and Vertex AI support budget allocation, ad generation, targeting, and performance tracking.', stack: [], problem: '', contribution: '', approach: [], results: [], outcome: '' },
  { slug: 'adaptive-quiz-platform', title: 'Adaptive Quiz Platform', shortTitle: 'Adaptive Quiz Platform', category: 'EdTech · Reinforcement learning', date: '2024', description: 'A learning platform combining RAG, multimodal document questions, and Q-learning to adapt quiz difficulty. Second runner-up at Datahack 3.0.', stack: [], problem: '', contribution: '', approach: [], results: [], outcome: '' },
  { slug: 'crop-recommendation-engine', title: 'Crop Recommendation Engine', shortTitle: 'Crop Recommendation Engine', category: 'Geospatial AI · Agriculture', date: '2024', description: 'GIS, soil-report OCR, weather, and forecasts for 300+ crops inform recommendations. Grand finalist at IIIT Lucknow HackoFiesta 6.0.', stack: [], problem: '', contribution: '', approach: [], results: [], outcome: '' },
  { slug: 'smart-waste-management', title: 'Smart Waste Management', shortTitle: 'Smart Waste Management', category: 'Computer vision · Routing', date: '2024', description: 'Bin-level detection and capacitated vehicle routing connect waste monitoring to collection planning. Winner at PICT Techfiesta 2024.', stack: [], problem: '', contribution: '', approach: [], results: [], outcome: '' },
];
export const skills = [
  { title: 'Engineering', items: 'Python, Java, React, Spring Boot, FastAPI, Flask, REST APIs' },
  { title: 'Intelligence', items: 'PyTorch, TensorFlow, LangChain, LangGraph, RAG, OpenCV' },
  { title: 'Data & systems', items: 'PostgreSQL, MySQL, Redis, MongoDB, Docker, Git, QGIS' },
];

export const profiles = {
  github: 'https://github.com/rajat-masanagi',
  linkedin: 'https://www.linkedin.com/in/rajat-masanagi/',
  leetcode: 'https://leetcode.com/u/rajat_masanagi/',
  codolio: 'https://codolio.com/profile/lyses',
};
export const education = [
  { school: 'Mumbai University', qualification: 'B.Tech, Computer Science & Engineering (Data Science)', period: '2022–2026', place: 'Mumbai', detail: 'Honours in Computational Finance', grade: '9.43 / 10 CGPA', coursework: ['Data Structures and Algorithms', 'Operating Systems', 'Database Systems', 'Communication Networks', 'Web Engineering', 'Machine Learning', 'Data Engineering', 'Information Security'] },
];
export const achievements = [
  { value: '7×', title: 'Hackathon winner', description: 'Including Techfiesta, Sanshodhan, Hack To Crack, and NEXUS ML.' },
  { value: 'Top 30', title: 'ISRO Bharatiya Antariksh', description: 'Among 34,000 participants, 2025.' },
  { value: 'Top 11', title: 'Bajaj Finserv Health HackRX', description: 'Among 45,000+ participants.' },
];
export const certificates: GalleryImage[] = [
  {
    "src": "/images/certificates/adobe-hackathon.webp",
    "alt": "Adobe Hackathon",
    "caption": "Adobe Hackathon"
  },
  {
    "src": "/images/certificates/aivolution.webp",
    "alt": "aiVolution",
    "caption": "aiVolution"
  },
  {
    "src": "/images/certificates/aws-cloud-foundations.webp",
    "alt": "AWS Cloud Foundations",
    "caption": "AWS Cloud Foundations"
  },
  {
    "src": "/images/certificates/aws-data-engineering.webp",
    "alt": "AWS Data Engineering",
    "caption": "AWS Data Engineering"
  },
  {
    "src": "/images/certificates/bah-25-isro.webp",
    "alt": "BAH 25 ISRO",
    "caption": "BAH 25 ISRO"
  },
  {
    "src": "/images/certificates/bah-isro-certificate.webp",
    "alt": "BAH ISRO Certificate",
    "caption": "BAH ISRO Certificate"
  },
  {
    "src": "/images/certificates/cisco-python-essentials-1.webp",
    "alt": "CISCO Python Essentials 1",
    "caption": "CISCO Python Essentials 1"
  },
  {
    "src": "/images/certificates/cisco-python-essentials-2.webp",
    "alt": "CISCO Python Essentials 2",
    "caption": "CISCO Python Essentials 2"
  },
  {
    "src": "/images/certificates/csi-hackathon-spit-2024-certificate.webp",
    "alt": "CSI Hackathon SPIT 2024 Certificate",
    "caption": "CSI Hackathon SPIT 2024 Certificate"
  },
  {
    "src": "/images/certificates/csi-hackathon-spit-2025-certificate.webp",
    "alt": "CSI Hackathon SPIT 2025 Certificate",
    "caption": "CSI Hackathon SPIT 2025 Certificate"
  },
  {
    "src": "/images/certificates/datazen-kjsce-2024-certificate.webp",
    "alt": "DataZen KJSCE 2024 Certificate",
    "caption": "DataZen KJSCE 2024 Certificate"
  },
  {
    "src": "/images/certificates/djsce-datahack-3-0-certificate.webp",
    "alt": "DJSCE Datahack 3.0 Certificate",
    "caption": "DJSCE Datahack 3.0 Certificate"
  },
  {
    "src": "/images/certificates/err-404-6-0-mhsscoe-certificate.webp",
    "alt": "Err 404 6.0 MHSSCOE Certificate",
    "caption": "Err 404 6.0 MHSSCOE Certificate"
  },
  {
    "src": "/images/certificates/ey-technothon.webp",
    "alt": "EY Technothon",
    "caption": "EY Technothon"
  },
  {
    "src": "/images/certificates/flipkart-grid.webp",
    "alt": "Flipkart Grid",
    "caption": "Flipkart Grid"
  },
  {
    "src": "/images/certificates/hack-to-crack-2-0-vimeet-certificate.webp",
    "alt": "Hack to Crack 2.0 ViMEET Certificate",
    "caption": "Hack to Crack 2.0 ViMEET Certificate"
  },
  {
    "src": "/images/certificates/hackhaven-slrtce-certificate.webp",
    "alt": "HackHaven SLRTCE Certificate",
    "caption": "HackHaven SLRTCE Certificate"
  },
  {
    "src": "/images/certificates/hackjmi-ieee-jmi-certificate.webp",
    "alt": "HACKJMI IEEE JMI Certificate",
    "caption": "HACKJMI IEEE JMI Certificate"
  },
  {
    "src": "/images/certificates/hackrx.webp",
    "alt": "HackRX",
    "caption": "HackRX"
  },
  {
    "src": "/images/certificates/imagine-piwot-certificate.webp",
    "alt": "IMAGINE Piwot Certificate",
    "caption": "IMAGINE Piwot Certificate"
  },
  {
    "src": "/images/certificates/innovize-vjti-certificate.webp",
    "alt": "Innovize VJTI Certificate",
    "caption": "Innovize VJTI Certificate"
  },
  {
    "src": "/images/certificates/istd-itm-certificate.webp",
    "alt": "ISTD ITM Certificate",
    "caption": "ISTD ITM Certificate"
  },
  {
    "src": "/images/certificates/itsa-sfit-certificate.webp",
    "alt": "ITSA SFIT Certificate",
    "caption": "ITSA SFIT Certificate"
  },
  {
    "src": "/images/certificates/loreal-sustainability-certificate.webp",
    "alt": "Loreal Sustainability Certificate",
    "caption": "Loreal Sustainability Certificate"
  },
  {
    "src": "/images/certificates/lt-createch-certificate.webp",
    "alt": "LT Createch Certificate",
    "caption": "LT Createch Certificate"
  },
  {
    "src": "/images/certificates/nexus-djsce-certificate.webp",
    "alt": "Nexus DJSCE Certificate",
    "caption": "Nexus DJSCE Certificate"
  },
  {
    "src": "/images/certificates/robotics-workshop-iitb-certificate.webp",
    "alt": "Robotics Workshop IITB Certificate",
    "caption": "Robotics Workshop IITB Certificate"
  },
  {
    "src": "/images/certificates/sbi-hackaithon.webp",
    "alt": "SBI HackAIThon",
    "caption": "SBI HackAIThon"
  },
  {
    "src": "/images/certificates/techfiesta-pict-certificate.webp",
    "alt": "TechFiesta PICT Certificate",
    "caption": "TechFiesta PICT Certificate"
  },
  {
    "src": "/images/certificates/technograd-djsce-certificate.webp",
    "alt": "TechnoGrad DJSCE Certificate",
    "caption": "TechnoGrad DJSCE Certificate"
  },
  {
    "src": "/images/certificates/vasantdada-ideathon.webp",
    "alt": "Vasantdada Ideathon",
    "caption": "Vasantdada Ideathon"
  }
];
export const certificateFolderUrl = 'https://drive.google.com/drive/folders/1-0DQLJ1Cc1iDzu5q3PwyqJmEozIdkCGN';
export const publication = {
  title: 'Quantum U-Net with Uncertainty Quantification for Brain Tumor Segmentation: A Hybrid Quantum-Classical Approach',
  url: 'https://reference-global.com/article/10.2478/ijssis-2026-0063',
  date: 'September 2026',
  summary: 'A simulated six-qubit quantum circuit within a 3D U-Net, evaluated through a nine-model ablation study on BraTS 2020.',
  journal: 'International Journal on Smart Sensing and Intelligent Systems',
};
export const allProjects = [...projects, ...additionalProjects];
