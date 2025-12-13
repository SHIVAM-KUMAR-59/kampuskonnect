export const Branch = {
  CSE: "CSE",
  CSCE: "CSCE",
  CSSE: "CSSE",
  ECE: "ECE",
  EEE: "EEE",
  MECH: "MECH",
  CIVIL: "CIVIL",
  IT: "IT",
  OTHER: "OTHER",
};

export const VerificationStatus = {
  APPLIED: "APPLIED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const RequestStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

export const UserRole = {
  STUDENT: "STUDENT",
  ALUMNI: "ALUMNI",
  ADMIN: "ADMIN",
};

export const EventMode = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

export const DomainCategories = {
  TECHNICAL: {
    WEB_DEVELOPMENT: "WEB DEVELOPMENT",
    MOBILE_DEVELOPMENT: "MOBILE DEVELOPMENT",
    BACKEND_DEVELOPMENT: "BACKEND DEVELOPMENT",
    FRONTEND_DEVELOPMENT: "FRONTEND DEVELOPMENT",
    FULL_STACK_DEVELOPMENT: "FULL STACK DEVELOPMENT",
    DEVOPS: "DEVOPS",
    SOFTWARE_TESTING: "SOFTWARE TESTING",
    DATABASE_MANAGEMENT: "DATABASE MANAGEMENT",
  },
  DATA_AND_AI: {
    DATA_SCIENCE: "DATA SCIENCE",
    MACHINE_LEARNING: "MACHINE LEARNING",
    ARTIFICIAL_INTELLIGENCE: "ARTIFICIAL INTELLIGENCE",
    BUSINESS_ANALYTICS: "BUSINESS ANALYTICS",
  },
  INFRASTRUCTURE: {
    CLOUD_COMPUTING: "CLOUD COMPUTING",
    CYBER_SECURITY: "CYBER SECURITY",
    NETWORK_ENGINEERING: "NETWORK ENGINEERING",
    BLOCKCHAIN: "BLOCKCHAIN",
  },
  HARDWARE_AND_SYSTEMS: {
    IOT: "INTERNET OF THINGS",
    ROBOTICS: "ROBOTICS",
    EMBEDDED_SYSTEMS: "EMBEDDED SYSTEMS",
  },
  DESIGN_AND_CREATIVE: {
    UI_UX_DESIGN: "UI/UX DESIGN",
    GAME_DEVELOPMENT: "GAME DEVELOPMENT",
  },
  BUSINESS_AND_MANAGEMENT: {
    PRODUCT_MANAGEMENT: "PRODUCT MANAGEMENT",
    DIGITAL_MARKETING: "DIGITAL MARKETING",
    CONTENT_WRITING: "CONTENT WRITING",
  },
  OTHER: {
    OTHER: "OTHER",
  },
};

// Flatten all domains into a single object
export const Domains = Object.values(DomainCategories).reduce((acc, category) => {
  return { ...acc, ...category };
}, {});

// Get all domain values
export const getDomainValues = () => Object.values(Domains);

// Check if domain is valid
export const isValidDomain = (domain) => getDomainValues().includes(domain);

// Get domains by category (useful for grouped dropdowns in UI)
export const getDomainsByCategory = () => DomainCategories;
