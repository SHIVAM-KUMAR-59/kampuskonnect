import updateStudentProfileService from "../../../services/user/student/updateProfile.service.js";

const updateStudentProfileController = async (req, res, next) => {
    try {
        const user = await updateStudentProfileService(req.user, req.body);
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export default updateStudentProfileController;