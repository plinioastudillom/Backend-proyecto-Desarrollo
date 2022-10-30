const {Schema, model} = require('mongoose');
const StudentSchema = Schema({
    name: {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    status: {
      type: Boolean,
      default: true
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

StudentSchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  
  return data;
}

module.exports = model( 'Student', StudentSchema);