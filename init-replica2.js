rs.initiate({
    _id: "shard2rs",
    members: [
      { _id: 0, host: "shard2-primary:27019" },
      { _id: 1, host: "shard2-secondary1:27019" },
      { _id: 2, host: "shard2-secondary2:27019" }
    ]
  });