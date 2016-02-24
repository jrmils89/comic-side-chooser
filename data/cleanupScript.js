module.exports = function() {
  var Cleanup = require('../models/cleanup.js');
  var Message = require('../models/message.js');

  //
  // console.log("Hello");


  Cleanup.findOne({
    boolean: true
  }, function(err, data) {
    if (data.date <= new Date((Date.now() - 1000 * 60 * 30))) {
      // Cleanup old data and update to today
      Message.remove({
          "timeSent" : {"$lte": new Date(Date.now() - 1000 * 60 * 30)}
      }, function(err) {
        Cleanup.findOneAndUpdate({boolean:true}, {date: Date.now()}, function(err, data) {
          // Cleaned up
        })
      })
    } else {
      // Do nothing
    };
  });
};
