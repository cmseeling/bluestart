#!/usr/bin/env sh

set -e

USER="${USER:-"vscode"}"

home_dir="$(eval echo ~${USER})"

echo "home_dir: ${home_dir}"

cp -r /home/config/fish "${home_dir}/.config/fish"
echo "set fish config"
cp /home/config/starship.toml "${home_dir}/.config/starship.toml"
echo "set starship config"
cp -r /home/config/helix "${home_dir}/.config/helix"
echo "set helix config"
$EXTRA_CONFIGS
# cp -r /home/config/lsd "${home_dir}/.config/lsd"
# echo "set lsd config"
# cp -r /home/config/yazi "${home_dir}/.config/yazi"
# echo "set yazi config"
# cp -r /home/config/zellij "${home_dir}/.config/zellij"
# echo "set zellij config"

chown -R "${USER}:${USER}" "${home_dir}/.config"
echo "set config ownership"
echo "done!"
