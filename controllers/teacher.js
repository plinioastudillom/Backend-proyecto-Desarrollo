const { response, request } = require('express');
const Teacher = require('../models/teacher');
const bcrypt = require('bcryptjs');

const teacherGet = async (req = request, res = response) => {
    const { limit = 5, from } = req.query;
    const query = { status: true };
    
    const [total, teachers ] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
            .skip(Number(from))
            //.limit(Number(limit))
    ]);
    res.json({
        total,
        teachers
    });
}

const teacherPost = async (req, res = response) => {
    const { name, assignedSchoolGrade, birth } = req.body;
    const teacher = new Teacher({ name, assignedSchoolGrade, birth });
    //save BD
    await teacher.save();
    res.json({
        teacher
    });
}

const teacherPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id,  ...rest } = req.body;
    const teacher = await Teacher.findByIdAndUpdate( id, rest );
    res.json({
        teacher
    });
}


const teacherDelete = async (req, res = response) => {
    const { id } = req.params;
    
    //delete user ID
    //const user = await User.findByIdAndDelete( id );
    const teacher = await Teacher.findByIdAndUpdate(id, { status: false });
    const teacherAuth = req.user;
    res.json({
        teacher, 
        teacherAuth
    });
}




module.exports = {
    teacherGet,
    teacherPost,
    teacherPut,
    teacherDelete,
}