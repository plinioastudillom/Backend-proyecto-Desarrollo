const { Schema, model } = require('mongoose');

const StudentDocument = Schema({
    studenId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    documentId: {
        type: Schema.Types.ObjectId,
        ref: 'DocumentType',
        required: true
    },
    documentName: {
        type: String,
        required: [true, 'El documento es requerido']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


StudentDocument.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'StudentDocument', StudentDocument );