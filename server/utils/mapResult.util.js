export const mapAlumni = (alumni) => {
  return {
    id: alumni._id,
    profileImage: alumni.profileImage,
    name: alumni.name,
    username: alumni.username,
    email: alumni.email,
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
