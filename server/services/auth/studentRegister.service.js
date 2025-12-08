import Student from '../../models/student.model.js'
import { ApiError, handleServerError } from '../../utils/error.util.js';
import { isValidEmail } from '../../utils/regex.util.js';

const studentRegisterService = async (name, email) => {
    try {

        if(!isValidEmail(email)) {
            throw new ApiError(400, "Invalid email format");
        }
        const existingStudent = await Student.findOne({ email });
        if(existingStudent) {
            throw new ApiError(400, "User with this email already exists");
        }
        
        const student = await Student.create({ name, username: email, email });
        return student
    }catch (err) {
        handleServerError(err)
    }
}

export default studentRegisterService