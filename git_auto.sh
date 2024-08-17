#!/bin/bash

# Script to automate git add, commit, and push

# Check for a commit message argument
if [ -z "$1" ]
then
  echo "Usage: $0 <commit-message>"
  exit 1
fi

# Set the commit message
commit_message=$1

# Run git commands
git add .
git commit -m "$commit_message"
git branch -M main
git push -u origin main

# Check if commands were successful
if [ $? -eq 0 ]
then
  echo "Git commands executed successfully."
else
  echo "An error occurred while executing Git commands."
fi
