const {Schema, model} = require('mongoose');
const TeacherSchema = Schema({
    name: {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    assignedSchoolGrade: {
      type: String,
      required: [true, 'El grado es requerido'],
     
    },
    birth:{
        type: Date,
        required: [true, 'Fecha de nacimiento es requerida'],
    },
    status: {
      type: Boolean,
      default: true
    }
});

TeacherSchema.methods.toJSON = function() {
  const { __v, _id, ...teacher } = this.toObject();
  teacher.uid = _id;
  return teacher;
}

module.exports = model( 'Teacher', TeacherSchema);