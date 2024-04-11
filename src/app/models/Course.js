// Defining a Model (database)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater'); // mongoose-slug-updater dictionary to fix plugin for Mongoose.
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');

const CourseSchema = new Schema({ 
  _id: { type: Number},
  name: { type: String, require: true, maxLength: 255, default: 'No name' },
  description: { type: String, maxLength: 600 },
  image: { type: String, require: true },
  videoId: { type: String, require: true },
  level:{ type: String }, 
  slug:{ type:String, slug: 'name', unique: true},
},
{
  timestamps: true,
  _id: false,
});




// Add plugins
CourseSchema.plugin(AutoIncrement);
mongoose.plugin(slug);

CourseSchema.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all'
});


module.exports = mongoose.model('Course', CourseSchema);

