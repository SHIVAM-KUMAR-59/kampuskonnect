export const mapAlumni = (alumni) => {
  return {
    id: alumni._id,
    profileImage: alumni.profileImage,
    name: alumni.name,
    username: alumni.username,
    email: alumni.email,
    bio: alumni.bio,
    phoneNumber: alumni.phoneNumber,
    linkedinUrl: alumni.linkedinUrl,
    currentCompany: alumni.currentCompany,
    passoutYear: alumni.passoutYear,
    branch: alumni.branch,
    skills: alumni.skills,
    role: alumni.role,
    studentConnections: alumni.studentConnections,
    verificationStatus: alumni.verificationStatus,
    createdAt: alumni.createdAt,
    updatedAt: alumni.updatedAt,
  };
};

export const mapStudent = (student) => {
  return {
    id: student._id,
    profileImage: student.profileImage,
    name: student.name,
    username: student.username,
    email: student.email,
    bio: student.bio,
    phoneNumber: student.phoneNumber,
    linkedinUrl: student.linkedinUrl,
    branch: student.branch,
    graduationYear: student.graduationYear,
    role: student.role,
    interests: student.interests,
    alumniConnections: student.alumniConnections,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
};

export const mapAdmin = (admin) => {
  return {
    id: admin._id,
    profileImage: admin.profileImage,
    name: admin.name,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
};

export const mapRequest = (request) => {
  return {
    id: request._id,
    sender: mapStudent(request.sender),
    note: request.note,
    status: request.status,
    createdAt: request.createdAt,
  };
};

export const mapEvent = (event) => {
  return {
    id: event._id,
    name: event.name,
    description: event.description,
    bannerImage: event.bannerImage,
    registrationFee: event.registrationFee,
    mode: event.mode,
    venue: event.venue,
    date: event.date,
    deadline: event.deadline,
    duration: event.duration,
    startTime: event.startTime,
    endTime: event.endTime,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };
};
