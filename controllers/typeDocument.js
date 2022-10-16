const { response } = require('express');
const { DocumentType } = require('../models')

const getDocumentType =  async(req, res = response ) => {

    const query = { status: true };

    const [ documentsTypes ] = await Promise.all([
        DocumentType.find(query).populate('user', 'name')
    ]);
    
    res.json({
        documentsTypes
    })

}

const documentTypePost = async(req, res = response) => {

    const name = req.body.name.toUpperCase();


    const data = {
        name,
        user: req.user._id
    }

    const documentType = new DocumentType( data );

    // save DB
    await documentType.save();

    res.status(201).json(documentType);
}

module.exports = {
    documentTypePost, 
    getDocumentType
}