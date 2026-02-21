#!/usr/bin/env bash

set -e

USER="${USER:-"vscode"}"

echo "Installing Delta for git diff"

su ${USER} -c "git config --global core.pager delta"
su ${USER} -c "git config --global interactive.diffFilter 'delta --color-only'"
su ${USER} -c "git config --global delta.navigate true"
su ${USER} -c "git config --global delta.dark true"
su ${USER} -c "git config --global delta.side-by-side true"
su ${USER} -c "git config --global merge.conflictStyle zdiff3"

echo "done!"
