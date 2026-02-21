if status is-interactive
    # Commands to run in interactive sessions can go here
end

# Fish command history
function history
    builtin history --show-time='%F %T '
end

# Starship Prompt
function starship_transient_prompt_func
    starship module time
end
starship init fish | source
enable_transience

# FZF / Zozide / Mise
fzf --fish | source
zoxide init fish | source

#$mise$ mise activate fish | source

set -gx EDITOR hx

# Yazi
function y
    set tmp (mktemp -t "yazi-cwd.XXXXXX")
    yazi $argv --cwd-file="$tmp"
    if set cwd (command cat -- "$tmp"); and [ -n "$cwd" ]; and [ "$cwd" != "$PWD" ]
        builtin cd -- "$cwd"
    end
    rm -f -- "$tmp"
end

# directory aliases
# LSD / Zoxide
abbr -a ls lsd -Al --tree --depth 1
abbr -a ls-al lsd -Al --ignore-config
abbr -a cd z

abbr -a lz lazygit
