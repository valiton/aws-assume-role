#!/usr/bin/env node

const AWS = require("aws-sdk");
const argv = require("commander");

argv
  .option(
    "-r --role [arn]",
    "Role ARN to assume (env AWS_ROLE default)",
    process.env.AWS_ROLE
  )
  .option(
    "-d --duration [seconds]",
    "Session length (30 minute default)",
    Number,
    process.env.AWS_SESSION_DURATION || 1800
  )
  .option("-b --debug")
  .parse(process.argv);

const assumeRole = (role, duration, debug) => {
  AWS.config.logger = debug ? process.stdout : undefined;

  const params = {
    RoleArn: role,
    RoleSessionName: "aws-assume-role",
    DurationSeconds: duration,
  };

  const STS = new AWS.STS();
  return STS.assumeRole(params)
    .promise()
    .then((data) => {
      const { AccessKeyId, SecretAccessKey, SessionToken } = data.Credentials;
      process.stdout.write(
        `AWS_ACCESS_KEY_ID=${AccessKeyId} AWS_SECRET_ACCESS_KEY=${SecretAccessKey} AWS_SESSION_TOKEN=${SessionToken}`
      );
    });
};

const run = () => {
  const { role, duration, debug } = argv;
  if (debug) console.log("args: ", { role, duration, debug });
  if (!role)
    return Promise.reject(
      new Error(
        "No role is set via 'AWS_ROLE env var' or '--role option'. See --help."
      )
    );
  return assumeRole(role, duration, debug);
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
