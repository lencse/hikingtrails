#!/usr/bin/env bash

if [ "$GITHUB_EVENT_NAME" -eq "push" ]
then
    echo PROD
fi

if [ "$GITHUB_EVENT_NAME" -eq "pull_request" ]
then
    echo PREVIEW
fi
