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
    experience: alumni.experience,
    passoutYear: alumni.passoutYear,
    branch: alumni.branch,
    skills: alumni.skills,
    role: alumni.role,
    studentConnections: alumni.studentConnections
      ? alumni.studentConnections[0] &&
        typeof alumni.studentConnections[0] === "object" &&
        alumni.studentConnections[0]._id
        ? alumni.studentConnections.map((student) => {
            return {
              id: student._id,
              profileImage: student.profileImage,
              name: student.name,
              email: student.email,
              bio: student.bio,
              interests: student.interests,
              graduationYear: student.graduationYear,
              branch: student.branch,
              linkedinUrl: student.linkedinUrl,
            };
          })
        : alumni.studentConnections
      : [],
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
    alumniConnections: student.alumniConnections
      ? student.alumniConnections[0] &&
        typeof student.alumniConnections[0] === "object" &&
        student.alumniConnections[0]._id
        ? student.alumniConnections.map((alumni) => {
            return {
              id: alumni._id,
              profileImage: alumni.profileImage,
              name: alumni.name,
              email: alumni.email,
              bio: alumni.bio,
              skills: alumni.skills,
              currentCompany: alumni.currentCompany,
              passoutYear: alumni.passoutYear,
              branch: alumni.branch,
              linkedinUrl: alumni.linkedinUrl,
            };
          })
        : student.alumniConnections
      : [],
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

export const mapChat = (chat, userId) => {
  return {
    id: chat._id,

    student: chat.student
      ? {
          id: chat.student._id,
          name: chat.student.name,
          profileImage: chat.student.profileImage,
          email: chat.student.email,
          bio: chat.student.bio,
        }
      : null,

    alumni: chat.alumni
      ? {
          id: chat.alumni._id,
          name: chat.alumni.name,
          profileImage: chat.alumni.profileImage,
          email: chat.alumni.email,
          bio: chat.alumni.bio,
        }
      : null,

    lastMessage: chat.lastMessage
      ? {
          id: chat.lastMessage._id,
          sender: chat.lastMessage.sender,
          content: chat.lastMessage.content,
          isRead: chat.lastMessage.isRead,
          isEdited: chat.lastMessage.edited,
          timestamp: chat.lastMessage.timestamp,
        }
      : null,

    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  };
};

export const mapOneChat = (chat, userId) => {
  const student = chat.student
    ? {
        id: chat.student._id.toString(),
        name: chat.student.name,
        profileImage: chat.student.profileImage,
        email: chat.student.email,
        bio: chat.student.bio,
        role: "STUDENT",
      }
    : null;

  const alumni = chat.alumni
    ? {
        id: chat.alumni._id.toString(),
        name: chat.alumni.name,
        profileImage: chat.alumni.profileImage,
        email: chat.alumni.email,
        bio: chat.alumni.bio,
        role: "ALUMNI",
      }
    : null;

  // determine who is logged-in user & who is receiver
  let user = null;
  let receiver = null;

  if (student && student.id === userId) {
    user = student;
    receiver = alumni;
  } else if (alumni && alumni.id === userId) {
    user = alumni;
    receiver = student;
  }

  return {
    id: chat._id.toString(),

    user,
    receiver,

    lastMessage: chat.lastMessage
      ? {
          id: chat.lastMessage._id.toString(),
          sender: chat.lastMessage.sender.toString(),
          content: chat.lastMessage.content,
          isRead: chat.lastMessage.isRead,
          isEdited: chat.lastMessage.edited,
          timestamp: chat.lastMessage.timestamp,
        }
      : null,

    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  };
};

export const mapMessage = (message) => {
  return {
    id: message._id,
    sender: message.sender,
    content: message.content,
    chatId: message.chatId,
    isRead: message.isRead,
    isEdited: message.edited,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
};
