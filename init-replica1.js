rs.initiate({
    _id: "shard1rs",
    members: [
      { _id: 0, host: "shard1-primary:27018" },
      { _id: 1, host: "shard1-secondary1:27018" },
      { _id: 2, host: "shard1-secondary2:27018" }
    ]
  });