#!/usr/bin/env bash
#
# Build a docker image from a Dockerfile.
#

set -e

# Use argument $1 as $NAME.
# Use argument $2 as $TAG.
# Use default value if arguments are empty.
NAME=${1:-${NAME:-dev}}
APP_PATH=${2}
TAG=${3:-${TAG:-$NAME}}

# The absolute path of the top-level directory.
REPO_DIR=${REPO_DIR:-$(git rev-parse --show-toplevel)}
[[ -n $REPO_DIR ]] || (
  echo >&2 "Failed to find working directory"
  exit 1
)

# Assume the workspace contains context path `docker`.
DOCKERFILE=$REPO_DIR/$APP_PATH/$NAME.dockerfile
CONTEXT=$(dirname "$DOCKERFILE")

if [[ ! -f $DOCKERFILE ]]; then
  echo "Dockerfile $DOCKERFILE does not exist"
  exit 1
fi

echo "Building image from [$NAME.dockerfile] as [$TAG] ..."
docker build ${CONTEXT} -f ${DOCKERFILE} -t ${TAG} "${@:3}"
