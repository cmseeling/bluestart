import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,svelte}",
    "./pages/**/*.{js,jsx,ts,tsx,svelte}",
    './stories/**/*.{js,jsx,ts,tsx,svelte}'
  ],

  // Files to exclude
  exclude: [],

  // Main theme (Mocha by default)
  theme: {
    extend: {
      tokens: {
        colors: {
          rosewater: { value: '#f5e0dc' },
          flamingo: { value: '#f2cdcd' },
          pink: { value: '#f5c2e7' },
          mauve: { value: '#cba6f7' },
          red: { value: '#f38ba8' },
          maroon: { value: '#eba0ac' },
          peach: { value: '#fab387' },
          yellow: { value: '#f9e2af' },
          green: { value: '#a6e3a1' },
          teal: { value: '#94e2d5' },
          sky: { value: '#89dceb' },
          sapphire: { value: '#74c7ec' },
          blue: { value: '#89b4fa' },
          lavender: { value: '#b4befe' },
          text: { value: '#cdd6f4' },
          subtext1: { value: '#bac2de' },
          subtext0: { value: '#a6adc8' },
          overlay2: { value: '#9399b2' },
          overlay1: { value: '#7f849c' },
          overlay0: { value: '#6c7086' },
          surface2: { value: '#585b70' },
          surface1: { value: '#45475a' },
          surface0: { value: '#313244' },
          base: { value: '#1e1e2e' },
          mantle: { value: '#181825' },
          crust: { value: '#11111b' }
        }
      }
    },
    semanticTokens: {
      colors: {
        body: { value: '{colors.base}' },
        text: {
          regular: { value: '{colors.text}' },
          dark: { value: '{colors.surface0}' },
          subdued: { value: '{colors.subtext0}' }
        },
        positive: { value: '{colors.green}' },
        negative: { value: '{colors.red}' },
        links: {
          unread: { value: '{colors.blue}' },
          visited: { value: '{colors.mauve}' }
        },
        highlight: { value: '{colors.maroon}' }
      }
    }
  },

  // Alternative theme variants
  themes: {
    latte: {
      tokens: {
        colors: {
          rosewater: { value: '#dc8a78' },
          flamingo: { value: '#dd7878' },
          pink: { value: '#ea76cb' },
          mauve: { value: '#8839ef' },
          red: { value: '#d20f39' },
          maroon: { value: '#e64553' },
          peach: { value: '#fe640b' },
          yellow: { value: '#df8e1d' },
          green: { value: '#40a02b' },
          teal: { value: '#179299' },
          sky: { value: '#04a5e5' },
          sapphire: { value: '#209fb5' },
          blue: { value: '#1e66f5' },
          lavender: { value: '#7287fd' },
          text: { value: '#4c4f69' },
          subtext1: { value: '#5c5f77' },
          subtext0: { value: '#6c6f85' },
          overlay2: { value: '#7c7f93' },
          overlay1: { value: '#8c8fa1' },
          overlay0: { value: '#9ca0b0' },
          surface2: { value: '#acb0be' },
          surface1: { value: '#bcc0cc' },
          surface0: { value: '#ccd0da' },
          base: { value: '#eff1f5' },
          mantle: { value: '#e6e9ef' },
          crust: { value: '#dce0e8' }
        }
      },
      semanticTokens: {
        colors: {
          body: { value: 'colors.base' },
          text: { value: 'colors.text' },
          positive: { value: 'colors.green' },
          negative: { value: 'colors.red' }
        }
      }
    },
    frappe: {
      tokens: {
        colors: {
          rosewater: { value: '#f2d5cf' },
          flamingo: { value: '#eebebe' },
          pink: { value: '#f4b8e4' },
          mauve: { value: '#ca9ee6' },
          red: { value: '#e78284' },
          maroon: { value: '#ea999c' },
          peach: { value: '#ef9f76' },
          yellow: { value: '#e5c890' },
          green: { value: '#a6d189' },
          teal: { value: '#81c8be' },
          sky: { value: '#99d1db' },
          sapphire: { value: '#85c1dc' },
          blue: { value: '#8caaee' },
          lavender: { value: '#babbf1' },
          text: { value: '#c6d0f5' },
          subtext1: { value: '#b5bfe2' },
          subtext0: { value: '#a5adce' },
          overlay2: { value: '#949cbb' },
          overlay1: { value: '#838ba7' },
          overlay0: { value: '#737994' },
          surface2: { value: '#626880' },
          surface1: { value: '#51576d' },
          surface0: { value: '#414559' },
          base: { value: '#303446' },
          mantle: { value: '#292c3c' },
          crust: { value: '#232634' }
        }
      },
      semanticTokens: {
        colors: {
          body: { value: 'colors.base' },
          text: { value: 'colors.text' },
          positive: { value: 'colors.green' },
          negative: { value: 'colors.red' }
        }
      }
    },
    macchiato: {
      tokens: {
        colors: {
          rosewater: { value: '#f4dbd6' },
          flamingo: { value: '#f0c6c6' },
          pink: { value: '#f5bde6' },
          mauve: { value: '#c6a0f6' },
          red: { value: '#ed8796' },
          maroon: { value: '#ee99a0' },
          peach: { value: '#f5a97f' },
          yellow: { value: '#eed49f' },
          green: { value: '#a6da95' },
          teal: { value: '#8bd5ca' },
          sky: { value: '#91d7e3' },
          sapphire: { value: '#7dc4e4' },
          blue: { value: '#8aadf4' },
          lavender: { value: '#b7bdf8' },
          text: { value: '#cad3f5' },
          subtext1: { value: '#b8c0e0' },
          subtext0: { value: '#a5adcb' },
          overlay2: { value: '#939ab7' },
          overlay1: { value: '#8087a2' },
          overlay0: { value: '#6e738d' },
          surface2: { value: '#5b6078' },
          surface1: { value: '#494d64' },
          surface0: { value: '#363a4f' },
          base: { value: '#24273a' },
          mantle: { value: '#1e2030' },
          crust: { value: '#181926' }
        }
      },
      semanticTokens: {
        colors: {
          body: { value: 'colors.base' },
          text: { value: 'colors.text' },
          positive: { value: 'colors.green' },
          negative: { value: 'colors.red' }
        }
      }
    }
  },

  globalCss: {
    'html, body': {
      bg: 'body',
      color: 'text.regular'
    }
  },

  // Pregenerate the theme variants
  staticCss: {
    themes: ['latte', 'frappe', 'macchiato']
  },

  // The output directory for your css system
  outdir: "styled-system",
});
