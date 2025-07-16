const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        // mongodb_username: 'mrrishitgondaliya@gmail.com',
        // mongodb_password: '2YkcXq43KyPk0vqp',
        // mongodb_clustername: 'cluster0',
        mongo_url:
          "mongodb+srv://rishit_gondaliya:SQF4m5kn0GqumnGt@node-1.wkgcf.mongodb.net/next-blog-dev?retryWrites=true&w=majority&appName=node-1",
        // mongodb_database: "next-blog-dev",
      },
    };
  }

  return {
    env: {
      // mongodb_username: 'mrrishitgondaliya@gmail.com',
      // mongodb_password: '2YkcXq43KyPk0vqp',
      // mongodb_clustername: 'cluster0',
      mongo_url:
        "mongodb+srv://rishit_gondaliya:SQF4m5kn0GqumnGt@node-1.wkgcf.mongodb.net/next-blog?retryWrites=true&w=majority&appName=node-1",
      mongodb_database: "next-blog",
    },
  };
};
