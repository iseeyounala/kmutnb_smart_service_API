// const express = require("express");
// const socketIO = require("socket.io");
// const app = express();
// const io = socketIO(3002);
// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

  // socket.on("disconnect", () => {
  //   socket.disconnect();
  //   console.log(`🔥: ${socket.id} user disconnected`);
  // });

//   socket.on("sent_data_driver", (e) => {
//     console.log(socket.id,e);
//     socket.id = e.driver_id;
//     // socket.to(socket.id).emit('call_back', "wowwww")
//     let data = {
//       driver_id: {}
//     };
//     socket.emit('data_driver', e)
//   });
// });

// module.exports = io;
