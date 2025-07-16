const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "rishit_gondaliya",
        mongodb_password: "SQF4m5kn0GqumnGt",
        mongodb_clustername: "node-1",
        mongodb_database: "next-blog-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "rishit_gondaliya",
      mongodb_password: "SQF4m5kn0GqumnGt",
      mongodb_clustername: "node-1",
      mongodb_database: "next-blog",
    },
  };
};
