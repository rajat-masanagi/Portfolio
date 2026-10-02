export type GalleryImage = { src: string; alt: string; caption: string; rotation?: -90 | 90; kind?: "Achievement" | "Participation" };
export type Project = {
  slug: string; title: string; shortTitle: string; category: string;
  description: string; stack: string[]; problem: string; contribution: string;
  approach: { title: string; text: string }[]; results: { value: string; label: string }[];
  outcome: string; kind?: 'booking' | 'lunar' | 'workflow';
  flow?: [string, string, string]; repositoryUrl?: string; repositoryNote?: string; images?: GalleryImage[]; features?: string[]; setup?: string;

};
export const projects: Project[] = [
  {
    "slug": "event-booking",
    "repositoryUrl": "https://github.com/rajat-masanagi/Event-Booking",
    "title": "Scalable Event Booking Platform",
    "shortTitle": "Built for the rush.",
    "category": "Distributed systems",
    "kind": "booking",
    "description": "A ticketing system designed for the moment everyone clicks at once.",
    "features": [
      "JWT authentication and role-based access control",
      "Expiring inventory holds and idempotent checkout",
      "Redis queueing and caching"
    ],
    "stack": [
      "Java",
      "Spring Boot",
      "Angular",
      "MySQL",
      "Redis",
      "Docker",
      "Nginx",
      "JMeter"
    ],
    "problem": "Ticket booking brings several challenges together: concurrent demand, limited inventory, and checkouts that may be retried. The platform explores how to coordinate admission, reservations, and payment-flow state under load.",
    "contribution": "Developed a microservices-based event-ticketing platform, from authentication and inventory holds to checkout and load testing.",
    "approach": [
      {
        "title": "Control admission",
        "text": "Redis-based queueing and caching manage access to the booking flow. JWT authentication and role-based access control separate user permissions."
      },
      {
        "title": "Protect the reservation",
        "text": "Concurrent reservations use expiring inventory holds. Idempotent checkout handles repeated requests, with MySQL providing persistence."
      },
      {
        "title": "Test the complete flow",
        "text": "Containerized the platform with Docker and load-tested it with JMeter, measuring throughput, errors, and checkout completion under concurrent demand."
      }
    ],
    "results": [
      {
        "value": "1,000",
        "label": "Concurrent test users"
      },
      {
        "value": "125.7",
        "label": "HTTP requests per second"
      },
      {
        "value": "0%",
        "label": "Errors in the load test"
      }
    ],
    "outcome": "The repository’s latest documented run completed checkout for all 1,000 buyers with 13,986 HTTP requests and no HTTP errors. This was a single-host, single-ticket-service test; p95 latency was 4.72 seconds. Inventory matched confirmed orders, and no buyer exceeded the four-ticket limit. These results describe the local test, not production capacity."
  },
  {
    "slug": "lunar-navigation",
    "title": "Lunar Surface Navigation",
    "shortTitle": "Finding a way forward.",
    "category": "Geospatial AI",
    "kind": "lunar",
    "description": "Turning Chandrayaan-2 observations into safer paths across the lunar south pole.",
    "features": [
      "Terrain hazard detection from aligned lunar datasets",
      "Route planning with PRM-RL",
      "Interactive Three.js rover simulation"
    ],
    "stack": [
      "Chandrayaan-2 data",
      "Computer vision",
      "PRM-RL",
      "Georeferencing",
      "Three.js"
    ],
    "problem": "Planning a route across the Moon’s south pole requires aligning different observations, identifying terrain hazards, and finding a navigable path through an unfamiliar landscape.",
    "contribution": "Analyzed Chandrayaan-2 datasets, compared hazard-detection and path-planning methods, and developed an interactive 3D rover simulation to visualize planned routes.",
    "approach": [
      {
        "title": "Understand the terrain",
        "text": "Aligned datasets through georeferencing and explored YOLOv8, Digital Terrain Models, and Hough Transform with Canny edge detection for hazard identification. The latter produced the best results within the project comparison."
      },
      {
        "title": "Find a navigable path",
        "text": "Compared more than five path-planning algorithms and selected PRM-RL based on its performance in the project evaluation."
      },
      {
        "title": "Make the data explorable",
        "text": "Used the Imaging Infrared Spectrometer’s 3 μm hydration feature to identify potential water-ice sites, and built a Three.js rover simulation to communicate the planned route."
      }
    ],
    "results": [
      {
        "value": "5+",
        "label": "Planning algorithms evaluated"
      },
      {
        "value": "1st",
        "label": "Runner-up in the ISRO BAH problem statement"
      },
      {
        "value": "3D",
        "label": "Interactive rover simulation"
      }
    ],
    "outcome": "The project earned first runner-up in its problem statement at ISRO Bharatiya Antariksh Hackathon 2025. The simulation illustrates route planning; it is not a deployed rover system."
  },
  {
    "slug": "workflow-generator",
    "kind": "workflow",
    "title": "No-Code Workflow Generator",
    "shortTitle": "From intent to execution.",
    "category": "Agentic AI",
    "description": "A React and FastAPI prototype bringing specialized AI agents and marketing outreach into one workspace.",
    "features": [
      "Specialized text, CSV, document-RAG, and web agents",
      "Zoom and voice-agent integrations",
      "Marketing-email workflow with session context and file uploads",
      "Configurable model providers and integration credentials"
    ],
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "FastAPI",
      "Python",
      "RAG",
      "Groq",
      "OpenAI",
      "Gemini"
    ],
    "problem": "Working across documents, datasets, the web, and outreach tools often means switching between separate applications. The platform explores a shared interface for delegating those tasks to specialized agents.",
    "contribution": "Built a full-stack prototype with a React and TypeScript frontend, a FastAPI backend, and agent endpoints for text, CSV, document retrieval, web research, Zoom, voice, and marketing outreach.",
    "approach": [
      {
        "title": "Give each task an entry point",
        "text": "FastAPI exposes separate endpoints for text, CSV, RAG, web, Zoom, and voice tasks. Structured requests and file uploads provide the context required by each agent."
      },
      {
        "title": "Coordinate the outreach workflow",
        "text": "The marketing workflow accepts company and product information, sender details, and an uploaded file. Session identifiers, cached results, retries, and retry delays support repeatable runs."
      },
      {
        "title": "Connect the workspace",
        "text": "The Vite and React frontend calls the backend on a shared API boundary. Provider and integration settings live in backend environment configuration, keeping credentials out of the frontend."
      }
    ],
    "results": [
      {
        "value": "7",
        "label": "Agent and workflow endpoints"
      },
      {
        "value": "Finalist",
        "label": "Media.net aiVolution 2025"
      }
    ],
    "outcome": "A full-stack prototype for experimenting with specialist agents and AI-assisted outreach. The repository is private; this overview is based on its supplied README. Individual integrations require their own credentials and dependencies.",
    "repositoryNote": "Private repository",
    "setup": "Backend (Python 3.10+): create a virtual environment, install backend/requirements.txt, copy backend/.env.example to backend/.env, and configure the integrations you intend to use.\n\nFrom backend/:\nuvicorn app:app --reload --port 8000\n\nFrontend (Node.js 18+), in a second terminal:\ncd frontend\nnpm install\nnpm run dev\n\nPoint the frontend at http://localhost:8000. Keep provider keys and service-account credentials in the backend environment.",
    "flow": [
      "Task & context",
      "Specialist agents",
      "Workflow output"
    ]
  }
];
export type Experience = { company: string; role: string; period: string; place: string; summary: string; highlights: string[]; images?: GalleryImage[] };
export const experience: Experience[] = [
  { company: 'Wissen Technology', role: 'Trainee Analyst', period: 'Jul 2026 — Present', place: 'Mumbai', summary: 'Building foundations in enterprise engineering through training in Java, Spring Boot, and AI frameworks.', highlights: [] },
  { company: 'Swiggy', role: 'SDE Intern', period: 'Sep 2025 — Jun 2026', place: 'Bengaluru', summary: 'Built tools for the people behind everyday operations—from conversational analytics to warehouse systems.', highlights: ['Built a React, AG Grid, FastAPI, and PostgreSQL spreadsheet alternative for 500k+ row datasets, saving 8 hours of analysis per day and improving FnV fill rate by up to 2%.', 'Developed a guarded conversational SQL interface with LangChain, chart suggestions, chat history, and LangSmith observability. Received the AI Explorer Award in February 2026.', 'Created an in-house ZPL label-printing system with a Python UI, saving ₹26 lakh annually.'] },
  { company: 'Dimension Six Technologies', role: 'Software Development Intern', period: 'Feb — Jul 2025', place: 'Mumbai', summary: 'Worked on real-time cyclist safety: vehicle detection, risk assessment, and voice alerts through a Flutter interface.', highlights: ['Converted the inference pipeline to Edge TPU-compatible TensorFlow Lite, reducing inference time by 95.5% and enabling deployment on Raspberry Pi 4 with Google Coral TPU.'] },
  { company: 'Ultraceuticals', role: 'AI / ML Intern', period: 'Nov 2024 — Apr 2025', place: 'Research & AI', summary: 'Explored drug–target relationships through research retrieval, Gemini-based RAG, and graph neural networks.', highlights: ['Processed drug–target data and research papers to assist researchers in identifying potential candidates and predicting missing interactions.'] },
];
export const additionalProjects: Project[] = [
  {
    "slug": "healthcare-crm",
    "title": "Healthcare CRM",
    "shortTitle": "Healthcare CRM",
    "category": "Full-stack · Mumbai Hacks",
    "description": "Connected hospital and doctor portals for patient care, capacity planning, and operational visibility.",
    "stack": [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "ReAct"
    ],
    "problem": "Patient care depends on information moving between doctors, hospital operations, and administrative teams. Capacity, billing, inventory, and patient transfers need to stay coordinated as demand changes.",
    "contribution": "Built hospital and doctor portals backed by more than 55 REST endpoints, with operational dashboards and a conversational AI receptionist.",
    "features": [
      "Separate hospital and doctor portals for patient management",
      "Capacity, billing, and automated patient-transfer workflows",
      "Severity-tiered alerts and low-stock inventory detection",
      "A 3D AI-avatar receptionist for natural-language data queries"
    ],
    "approach": [
      {
        "title": "Connect the operational data",
        "text": "Used Node.js, Express, TypeScript, PostgreSQL, and Prisma to expose patient and operational workflows through a shared API layer."
      },
      {
        "title": "Make status visible",
        "text": "Built dashboards for patient management, alerts, and inventory. A live environmental feed brings weather, air quality, and city events into the regional demand-planning view."
      },
      {
        "title": "Let teams ask questions",
        "text": "Added an AI receptionist that uses natural-language ReAct SQL querying to help users explore the underlying operational information."
      }
    ],
    "results": [
      {
        "value": "55+",
        "label": "REST endpoints"
      },
      {
        "value": "2",
        "label": "Role-specific portals"
      }
    ],
    "outcome": "Built at Mumbai Hacks 2025, the project brings clinical and operational views into one workflow, from managing patients to coordinating transfers.",
    "flow": [
      "Patient data",
      "Care operations",
      "Shared visibility"
    ],
    "repositoryUrl": "https://github.com/rajat-masanagi/Healthcare-CRM",
    "repositoryNote": "Repository access may be required."
  },
  {
    "slug": "adaptive-quiz-platform",
    "title": "Adaptive Quiz Platform",
    "shortTitle": "Adaptive Quiz Platform",
    "category": "EdTech · Reinforcement learning",
    "repositoryUrl": "https://github.com/rajat-masanagi/Gamified_Learning",
    "description": "The learning platform combines adaptive quizzes, AI-assisted study tools, and gamified learning paths for students and employees.",
    "stack": [
      "React",
      "Vite",
      "Flask",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Gemini",
      "LLaMA"
    ],
    "problem": "Static study material gives every learner the same path. Students need a way to practice from their own documents, understand visual content, and adjust the challenge as their understanding improves.",
    "contribution": "Developed a learning platform for document-based questions, adaptive quizzes, flashcards, and diagram interpretation, with performance-driven question difficulty.",
    "features": [
      "Personalized learning roadmaps with rewards, badges, and leaderboards",
      "Adaptive quizzes informed by previous answers",
      "Blueprint and diagram interpretation with AI assistance",
      "SWOT dashboards and company tools for assigning and tracking tasks"
    ],
    "approach": [
      {
        "title": "Organize the learning journey",
        "text": "The company portal onboards employees and assigns tasks. Learners receive a personalized roadmap with milestones, rewards, and progress tracking."
      },
      {
        "title": "Adapt the practice",
        "text": "Quiz difficulty responds to learner performance, while retrieval-augmented study tools support questions about learning material. The project also explores Q-learning for personalized practice."
      },
      {
        "title": "Make progress actionable",
        "text": "SWOT dashboards present learning strengths and areas to improve. Diagram interpretation and text-to-speech content offer additional ways to work through complex material."
      }
    ],
    "results": [
      {
        "value": "2nd",
        "label": "Runner-up · Datahack 3.0"
      },
      {
        "value": "RAG",
        "label": "Document-grounded study aids"
      }
    ],
    "outcome": "The adaptive-quiz work earned second runner-up at Datahack 3.0. The linked repository develops the broader gamified-learning experience with company and employee workflows.",
    "flow": [
      "Study material",
      "Adaptive practice",
      "Learning feedback"
    ]
  },
  {
    "slug": "crop-recommendation-engine",
    "title": "Crop Recommendation Engine",
    "shortTitle": "Crop Recommendation Engine",
    "category": "Geospatial AI · Agriculture",
    "repositoryUrl": "https://github.com/rajat-masanagi/Crop-Reccomendation",
    "description": "Soil, weather, and market signals brought together to help farmers compare crop choices for a specific location.",
    "stack": [
      "React",
      "Flask",
      "TensorFlow",
      "LSTM",
      "Rasterio",
      "Plotly",
      "Bhuvan data",
      "Gemini"
    ],
    "problem": "A crop can suit the soil yet perform poorly against weather or market conditions. Useful recommendations need to consider the farm’s location, soil profile, growing period, and access to nearby markets together.",
    "contribution": "Developed a geospatial dashboard and crop-recommendation pipeline combining soil-report extraction, satellite-derived parameters, weather trends, and crop-price forecasts.",
    "features": [
      "Location-based soil and environmental dashboards",
      "OCR-based nitrogen, phosphorus, and potassium extraction from soil reports",
      "Historical weather trends and LSTM forecasting",
      "Crop-price forecasts and nearby-market context for recommendations"
    ],
    "approach": [
      {
        "title": "Read the land",
        "text": "Mapped farm coordinates into geospatial raster datasets to retrieve soil and environmental parameters. The dashboard combines these with soil-report values and current weather."
      },
      {
        "title": "Look beyond current conditions",
        "text": "Used historical trends and LSTM forecasting to examine conditions over a growing period. Market analysis considers harvesting timelines and proximity to APMC markets."
      },
      {
        "title": "Bring the signals together",
        "text": "A Gemini agent combines GIS, weather, soil, and market information into crop recommendations. The React and Plotly interface makes the underlying signals explorable."
      }
    ],
    "results": [
      {
        "value": "300+",
        "label": "Crops in price-forecasting scope"
      },
      {
        "value": "Finalist",
        "label": "IIIT Lucknow HackoFiesta 6.0"
      }
    ],
    "outcome": "A grand-finalist project at IIIT Lucknow HackoFiesta 6.0, combining farm conditions and market context in an interactive decision-support prototype.",
    "flow": [
      "Soil & weather",
      "Forecasts & markets",
      "Crop choices"
    ]
  },
  {
    "slug": "smart-waste-management",
    "title": "Smart Waste Management",
    "shortTitle": "Smart Waste Management",
    "category": "Computer vision · Routing",
    "repositoryUrl": "https://github.com/rajat-masanagi/Waste_Management",
    "description": "The platform connects bin monitoring, collection-route planning, and community participation in waste management.",
    "stack": [
      "Flutter",
      "Node.js",
      "Django",
      "OpenCV",
      "YOLOv8",
      "Google Maps API",
      "Gemini"
    ],
    "problem": "Fixed collection routes can send trucks to bins that do not need servicing while full bins wait. Collection teams and residents also need practical ways to coordinate action and find disposal guidance.",
    "contribution": "Developed a waste-management platform with bin-fill detection, capacity-aware truck routing, community-event workflows, and AI-assisted disposal and reuse guidance.",
    "features": [
      "OpenCV-based bin-fill detection",
      "Capacity-aware collection routes using Google Maps services",
      "Community-event registration, barcode attendance, and certificates",
      "WasteBot disposal guidance and ReuseIt upcycling suggestions"
    ],
    "approach": [
      {
        "title": "Identify collection needs",
        "text": "Used computer vision to detect bin-fill levels and surface the bins that need attention, so collection planning can respond to demand."
      },
      {
        "title": "Plan around truck capacity",
        "text": "Applied the Capacitated Vehicle Routing Problem to route planning with Google Maps APIs. The repository demonstrates routes for four trucks serving thirteen bins."
      },
      {
        "title": "Include the community",
        "text": "Connected Flutter, Node.js, and Django services for events and notifications. Gemini-backed assistance answers waste-disposal questions and suggests ways to reuse items."
      }
    ],
    "results": [
      {
        "value": "Winner",
        "label": "PICT Techfiesta 2024"
      },
      {
        "value": "4",
        "label": "Trucks in the route demo"
      },
      {
        "value": "13",
        "label": "Bins in the route demo"
      }
    ],
    "outcome": "Winner at PICT’s international Techfiesta hackathon in 2024. The project demonstrates how bin monitoring, collection planning, and participation tools can work together; the route figures describe the repository demo.",
    "flow": [
      "Bin monitoring",
      "Route planning",
      "Collection & reuse"
    ]
  },
  {
    "slug": "text-social",
    "title": "Event-Driven Social Media Platform",
    "shortTitle": "Social Media Platform",
    "category": "System design · Event-driven architecture",
    "repositoryUrl": "https://github.com/rajat-masanagi/Social-Media",
    "description": "How a social platform separates transactional writes from personalized feeds and full-text search.",
    "stack": [
      "Java",
      "Spring Boot",
      "Spring Cloud Gateway",
      "Kafka",
      "MySQL",
      "Cassandra",
      "Elasticsearch",
      "React",
      "Docker"
    ],
    "problem": "Posts, relationships, feeds, and search have different storage and query needs. Keeping them in sync without tightly coupling every request is the central design challenge.",
    "contribution": "Built a text-only social platform with authentication, posts, threaded replies, follows, likes, personalized feeds, and search across independently owned services.",
    "features": [
      "JWT authentication behind a Spring Cloud Gateway",
      "Transactional outbox for publishing content events",
      "Hybrid feed generation in Cassandra",
      "Independent Elasticsearch indexing with idempotent updates"
    ],
    "approach": [
      {
        "title": "Commit the fact before publishing it",
        "text": "Social Service owns authoritative data in MySQL. A post and its outbox record are saved in one transaction; a background publisher sends the versioned event to Kafka. This avoids treating the database write and broker publish as one unreliable dual write."
      },
      {
        "title": "Build separate views of the same event",
        "text": "Feed and Search services use different Kafka consumer groups. Each receives the content event and builds a query-specific projection in Cassandra or Elasticsearch. Stable content IDs allow duplicate deliveries to be handled idempotently."
      },
      {
        "title": "Balance write cost against read cost",
        "text": "Ordinary authors use fan-out-on-write for feeds. Celebrity posts are merged when a timeline is read, avoiding a write to every follower for each popular author. Feed hydration uses OpenFeign to retrieve authoritative content."
      }
    ],
    "results": [
      {
        "value": "3",
        "label": "Domain services"
      },
      {
        "value": "1",
        "label": "Transactional source of truth"
      }
    ],
    "outcome": "The design makes its consistency boundary explicit: a successful post is committed in MySQL, while feeds and search catch up asynchronously. At-least-once delivery can produce duplicates; idempotent consumers handle replay, and retained Kafka events can rebuild read models.",
    "flow": [
      "MySQL & outbox",
      "Kafka events",
      "Feed & search"
    ],
    "setup": "With Docker Compose and approximately 4 GB of available memory, run from the repository root:\n\ndocker compose up --build -d\ndocker compose ps\n\nOpen http://localhost:8915.\n\nStop the local stack with:\ndocker compose down"
  },
  {
    "slug": "repoatlas",
    "title": "GitHub Repository Analyzer",
    "shortTitle": "GitHub Repository Analyzer",
    "category": "Developer tools · Grounded AI",
    "repositoryUrl": "https://github.com/rajat-masanagi/GitHub-Repository-Analyzer",
    "description": "Turning a public GitHub repository into an explorable architecture map with evidence-backed explanations.",
    "stack": [
      "React",
      "TypeScript",
      "React Flow",
      "Java",
      "Spring Boot",
      "Spring AI",
      "Ollama",
      "Pinecone",
      "Caffeine"
    ],
    "problem": "A folder tree tells you where files live, but rarely explains how a codebase fits together. AI summaries are more useful when readers can trace their claims to the actual source and ask follow-up questions in context.",
    "contribution": "Built a repository-analysis tool with a focused folder tree, inferred feature and architecture views, technology summaries, and source-linked chat.",
    "features": [
      "Validated public GitHub URL ingestion without cloning",
      "Asynchronous analysis jobs with caching and deduplication",
      "Interactive repository structure and architecture views",
      "Repository- and commit-scoped retrieval for grounded chat"
    ],
    "approach": [
      {
        "title": "Bound what enters the system",
        "text": "The backend validates the public GitHub URL, then reads repository metadata, the tree, and a focused selection of text files through GitHub’s API. It does not fetch arbitrary user-supplied URLs."
      },
      {
        "title": "Turn files into a navigable explanation",
        "text": "An asynchronous orchestrator sends bounded file groups to Ollama for local summaries. The frontend polls job status, then renders the folder tree, architecture graph, language view, and supporting file links."
      },
      {
        "title": "Keep follow-up answers tied to the source",
        "text": "Local embeddings are indexed in Pinecone under repository and commit keys. Chat retrieves matching chunks before asking Ollama to respond with source links, keeping the conversation tied to the analyzed code version."
      }
    ],
    "results": [
      {
        "value": "Local",
        "label": "Model inference with Ollama"
      },
      {
        "value": "RAG",
        "label": "Source-linked chat"
      }
    ],
    "outcome": "The analyzer makes unfamiliar repositories easier to explore while keeping supporting evidence close to the explanation. Its architecture graph is AI-inferred and should be checked against the linked files; model inference runs locally, while vectors are stored in Pinecone.",
    "flow": [
      "Repository files",
      "Analysis & indexing",
      "Maps & grounded chat"
    ],
    "setup": "Requires Java 21, Maven, Node.js 20+, Ollama, and a Pinecone index with 768 dimensions and cosine distance. Configure the repository’s .env.example with your own provider settings.\n\nInstall the local models:\nollama pull qwen2.5:3b-instruct\nollama pull nomic-embed-text:v1.5\n\nStart the backend from backend/:\nmvn spring-boot:run\n\nIn another terminal, from frontend/:\nnpm ci\nnpm run dev"
  }
];
export const skills = [
  { title: 'Engineering', items: 'Python, Java, JavaScript, TypeScript, C, React, Angular, Flutter, Node.js, Express, Spring Boot, Spring Cloud, FastAPI, Flask, Django, REST APIs, JWT authentication, microservices' },
  { title: 'Intelligence', items: 'PyTorch, TensorFlow, scikit-learn, NumPy, Pandas, LangChain, LangGraph, LlamaIndex, Spring AI, RAG, AI agents, OpenCV, YOLO, NLP, reinforcement learning, time-series forecasting, recommender systems, Ollama' },
  { title: 'Data & systems', items: 'PostgreSQL, MySQL, MongoDB, Redis, Cassandra, Elasticsearch, Kafka, RabbitMQ, ActiveMQ, Pinecone, ChromaDB, Firebase, Prisma, Docker, Git, Nginx, JMeter, QGIS, Tableau' },
];
export const problemSolving = 'Data structures and algorithms, operating systems, database systems, computer networks, probability and statistics, information security, high-performance computing, and quantitative finance.';

export const profiles = {
  github: 'https://github.com/rajat-masanagi',
  linkedin: 'https://www.linkedin.com/in/rajat-masanagi/',
  leetcode: 'https://leetcode.com/u/rajat_masanagi/',
  codolio: 'https://codolio.com/profile/lyses',
};
export const education = [
  { school: 'Mumbai University', qualification: 'B.Tech, Computer Science & Engineering (Data Science)', period: '2022–2026', place: 'Mumbai', detail: 'Honours in Computational Finance', grade: '9.43 / 10 CGPA', coursework: ['Data Structures and Algorithms', 'Operating Systems', 'Database Systems', 'Communication Networks', 'Web Engineering', 'Machine Learning', 'Deep Learning', 'Reinforcement Learning', 'Data Engineering', 'Big Data', 'Natural Language Processing', 'Computer Vision', 'Time Series Analysis', 'Information Security', 'High Performance Computing', 'Probability and Statistics', 'Quantitative Portfolio Management'] },
];
export const achievements = [
  { value: '7×', title: 'Hackathon winner', description: 'Including Techfiesta, Sanshodhan, Hack To Crack, NEXUS ML, Technograd, Datahack, and Err 404.' },
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
    "rotation": -90,
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
    "rotation": -90,
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
    "rotation": -90,
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
    "rotation": -90,
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
    "rotation": -90,
    "alt": "TechFiesta PICT Certificate",
    "caption": "TechFiesta PICT Certificate"
  },
  {
    "src": "/images/certificates/technograd-djsce-certificate.webp",
    "rotation": -90,
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
