# aws-assume-role

Simple CLI for running commands in the context an assumed AWS role, such as a
CI/CD pipeline or any other script.

This tool fetches temporary AWS credentials for an assumed IAM role so that it
can be used together with the `env` command which is available in nearly all standard shells.

## Installation

`npm i @valiton/aws-assume-role --save-dev`

## Usage in Script

The `env` command (standard in most shells) allows to run command with certain environment
variables. (If you are unsure you can test if `env` is available by running `which env`).
This package expects valid aws credentials, which have permission to assume the
role in the environment.

You can the call commands that run in the context of an assumed role with the following pattern.

```sh
env [NAME=VALUE ...] command [arg ...]
```

The examples below use `aws s3 ls` but you can run any command that talks to the AWS API there.

### Examples
```sh
# set the AWS_ROLE as an env var
export AWS_ROLE="arn:aws:iam::123456789:role/role-name"
# alternatively you can add the --role option
#   assume-role --role arn:aws:iam::123456789:role/role-name

# when package is not installed yet previously
env $(npx @valiton/aws-assume-role) aws s3 ls

# when package has been installed globally:
env $(assume-role) aws s3 ls
```

## Help

```sh
$ assume-role --help

Usage: assume-role [options]

Options:
  -r --role [arn]          Role ARN to assume (env AWS_ROLE default)
  -d --duration [seconds]  Session length (30 minute default) (default: 1800)
  -b --debug
  -h --help                output usage information
```

