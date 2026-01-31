import Student from "../../models/student.model.js";
import Alumni from "../../models/alumni.model.js";
import Request from "../../models/request.model.js";
import Event from "../../models/event.model.js";
import { UserRole, RequestStatus } from "../../config/enums.config.js";
import { ApiError, handleServerError } from "../../utils/error.util.js";

const getUserOverviewService = async (userId, role) => {
  try {
    // Common: Fetch upcoming events
    const now = new Date();
    const upcomingEventsCount = await Event.countDocuments({
      date: { $gte: now },
    });

    const top2UpcomingEvents = await Event.find({
      date: { $gte: now },
    })
      .sort({ date: 1 })
      .limit(2)
      .select("name date");

    const eventsData = {
      upcoming: upcomingEventsCount,
      top2UpcomingEvents:
        top2UpcomingEvents.length > 0
          ? {
              event1: top2UpcomingEvents[0]
                ? {
                    name: top2UpcomingEvents[0].name,
                    date: top2UpcomingEvents[0].date,
                  }
                : null,
              event2: top2UpcomingEvents[1]
                ? {
                    name: top2UpcomingEvents[1].name,
                    date: top2UpcomingEvents[1].date,
                  }
                : null,
            }
          : { event1: null, event2: null },
    };

    if (role === UserRole.STUDENT) {
      // Student-specific data
      const student = await Student.findById(userId).populate("alumniConnections");

      // Count accepted and pending connections
      const acceptedConnectionsCount = student.alumniConnections.length;

      const pendingRequestsCount = await Request.countDocuments({
        sender: userId,
        status: RequestStatus.PENDING,
      });

      // Get all alumni IDs to which student has sent requests (pending or accepted)
      const sentRequestsAlumniIds = await Request.find({
        sender: userId,
        status: { $in: [RequestStatus.PENDING, RequestStatus.ACCEPTED] },
      }).distinct("receiver");

      // Get recommended mentors (alumni with matching skills to student interests)
      // Exclude: already connected alumni + alumni with pending/accepted requests
      const recommendedMentors = await Alumni.find({
        verificationStatus: "APPROVED",
        skills: { $in: student.interests || [] },
        _id: {
          $nin: [
            ...student.alumniConnections, // Exclude connected alumni
            ...sentRequestsAlumniIds, // Exclude alumni with sent requests
          ],
        },
      })
        .limit(2)
        .select("name profileImage linkedinUrl skills currentCompany experience");

      return {
        events: eventsData,
        connections: {
          accepted: acceptedConnectionsCount,
          pending: pendingRequestsCount,
        },
        recommendedMentorsTop2: {
          mentor1: recommendedMentors[0]
            ? {
                id: recommendedMentors[0]._id,
                name: recommendedMentors[0].name,
                profileImage: recommendedMentors[0].profileImage,
                linkedinUrl: recommendedMentors[0].linkedinUrl,
                interests: recommendedMentors[0].skills,
                currentCompany: recommendedMentors[0].currentCompany,
                experience: recommendedMentors[0].experience,
              }
            : null,
          mentor2: recommendedMentors[1]
            ? {
                id: recommendedMentors[1]._id,
                name: recommendedMentors[1].name,
                profileImage: recommendedMentors[1].profileImage,
                linkedinUrl: recommendedMentors[1].linkedinUrl,
                interests: recommendedMentors[1].skills,
                currentCompany: recommendedMentors[1].currentCompany,
                experience: recommendedMentors[1].experience,
              }
            : null,
        },
      };
    } else if (role === UserRole.ALUMNI) {
      // Alumni-specific data
      const alumni = await Alumni.findById(userId).populate("studentConnections");

      // Count accepted connections
      const acceptedConnectionsCount = alumni.studentConnections.length;

      // Count pending requests (requests sent to this alumni)
      const pendingRequestsCount = await Request.countDocuments({
        receiver: userId,
        status: RequestStatus.PENDING,
      });

      // Get top 2 pending student requests
      const pendingRequests = await Request.find({
        receiver: userId,
        status: RequestStatus.PENDING,
      })
        .sort({ createdAt: -1 })
        .limit(2)
        .populate("sender", "name profileImage linkedinUrl interests");

      return {
        events: eventsData,
        connections: {
          accepted: acceptedConnectionsCount,
          pending: pendingRequestsCount,
        },
        studentRequestsTop2: {
          student1: pendingRequests[0]
            ? {
                id: pendingRequests[0]._id,
                name: pendingRequests[0].sender.name,
                profileImage: pendingRequests[0].sender.profileImage,
                linkedinUrl: pendingRequests[0].sender.linkedinUrl,
                interests: pendingRequests[0].sender.interests,
              }
            : null,
          student2: pendingRequests[1]
            ? {
                id: pendingRequests[1]._id,
                name: pendingRequests[1].sender.name,
                profileImage: pendingRequests[1].sender.profileImage,
                linkedinUrl: pendingRequests[1].sender.linkedinUrl,
                interests: pendingRequests[1].sender.interests,
              }
            : null,
        },
      };
    } else {
      throw new ApiError(400, "Invalid user role");
    }
  } catch (err) {
    handleServerError(err);
  }
};

export default getUserOverviewService;
