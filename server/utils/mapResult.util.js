export const mapAlumni = (alumni) => {
  return {
    id: alumni._id,
    profileImage: alumni.profileImage,
    name: alumni.name,
    email: alumni.email,
    role: alumni.role,
    verificationStatus: alumni.verificationStatus,
    createdAt: alumni.createdAt,
    updatedAt: alumni.updatedAt,
  };
};
