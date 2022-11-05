const { response, request } = require('express');
const Student = require('../models/student');

const studentsGet = async (req = request, res = response) => {
    const { limit = 5, from } = req.query;
    const query = { status: true };
    
    const [total, students ] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .skip(Number(from)).populate('teacher', 'name assignedSchoolGrade').populate('documents.documentId', 'name')
            .select('lastname name teacher _id  ')
            //.limit(Number(limit))
    ]);
    res.json({
        total,
        students
    });
}


const getStudent = async (req, res = response) => {
    const { id } = req.params;
    const student = await Student.findById(id)
        .populate('user', 'name').populate('teacher', '_id').populate('documents.documentId');
    res.json(student);
}

const studentPost = async (req, res = response) => {
    const { status, user, ...body } = req.body;
    const data = {
        ...body,
        user: req.user._id
    }
    const studentDB = new Student( data );
    // save DB
    await studentDB.save();

    res.status(201).json(studentDB);
}

const studentPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id,  ...rest } = req.body;
    const student = await Student.updateMany( {_id: id}, {$set: rest} );
    res.status(201).json({
        student
    });
}

const studentDelete = async (req, res = response) => {
    const { id } = req.params;
    
    //delete user ID
    //const user = await User.findByIdAndDelete( id );
    const student = await Student.findByIdAndUpdate(id, { status: false });
    const userAuth = req.user;
    res.json({
        student, 
        userAuth
    });
}

module.exports = {
    studentPost,
    studentsGet,
    studentDelete,
    getStudent,
    studentPut
}