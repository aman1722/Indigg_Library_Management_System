const mongoose = require('mongoose');

const bookLogSchema =  mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  action: {
    type: String, // 'borrow' or 'return'
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const BookLogModel = mongoose.model('BookLog', bookLogSchema);

module.exports = {
    BookLogModel
};
