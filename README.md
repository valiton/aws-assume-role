# aws-assume-role-cicd
# aws-assume-role

Simple CLI for running commands in the context an assumed AWS role, such as a
CI/CD pipeline or any other script.

This tool fetches temporary AWS credentials for an assumed IAM role so that it
can be used together with the `env` command which is available in nearly all standard shells.

## Installation

`npm i @valiton/aws-assume-role --save-dev`

## Usage in Script

The `env` command (standard in most shells) allows to run command with certain environment
variables.
(If you are unsure you can test if `env` is available by running `which env`).

You can the call commands that in the context of an assumed role with the following pattern.

```sh
env [NAME=VALUE ...] command [arg ...]
```

The examples below use `aws s3 ls` but you can run any command that talks to the AWS API there.

### Example with explicit option

```sh
env $(assume-role --role arn:aws:iam::123456789:role/role-name) aws s3 ls
```

### Example with role passed via env variable
```sh
# with env variable
export AWS_ROLE="arn:aws:iam::123456789:role/role-name"
env $(assume-role) aws s3 ls
```

## Help

```
$ assume --help
```

