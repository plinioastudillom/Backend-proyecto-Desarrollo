const { response } = require('express');
const { DocumentType } = require('../models')

const getStudentDocument =  async(req, res = response ) => {

    const query = { status: true };

    const [ studentDocuments ] = await Promise.all([
        StudentDocument.find(query).populate('user', 'name')
    ]);
    
    res.json({
        studentDocuments
    })

}

const studentDocumentPost = async(req, res = response) => {

    const { status, user, ...body } = req.body;
    const data = {
        ...body,
        user: req.user._id
    }
    const studentDocumentDB = new StudentDocument( data );
    // save DB
    await studentDocumentDB.save();

    res.status(201).json(studentDocumentDB);
}

module.exports = {
    studentDocumentPost, 
    getStudentDocument
}