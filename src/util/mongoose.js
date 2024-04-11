// fix loi render giao dien cua thu vien mongoose
module.exports = {
  mutipleMongooseToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
  },

  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },  
};
