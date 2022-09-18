const { response, request } = require('express');
const Student = require('../models/student');

const studentsGet = async (req = request, res = response) => {
    const { limit = 5, from } = req.query;
    const query = { status: true };
    
    const [total, students ] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .skip(Number(from))
            //.limit(Number(limit))
    ]);
    res.json({
        total,
        students
    });
}

const studentPost = async (req, res = response) => {
    const { status, ...body } = req.body;
    const data = {
        ...body
       
    }
    const studentDB = new Student( data );
    // save DB
    await studentDB.save();

    res.status(201).json(studentDB);
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
    studentDelete
}