rs.initiate({
  _id: "config_server",
  members: [
    { _id: 0, host: "configSrv:27017" }
  ]
});