const server = require("./app");
const port = 8090;
server.listen(port, () =>{
    console.log("Server listen on port " + port);
})