FROM rust:1.93.1-alpine AS builder
RUN apk add --no-cache git
WORKDIR /build
RUN git clone https://codeberg.org/cseeling/env-variable-provider-rs .
RUN cargo build --release

FROM node:lts-alpine

COPY --from=builder /build/target/release/evp-rs /usr/local/bin/evp-rs

RUN deluser node

RUN sed -i 's/#community/community/' /etc/apk/repositories

RUN apk update && apk upgrade && apk add --no-cache \
  fish \
  starship \
  helix \
  helix-tree-sitter-vendor \
  bat \
  delta \
  fzf \
  lsd \
  ripgrep \
  yazi \
  zellij \
  zoxide \
  lazygit

RUN npm install -g pnpm
RUN corepack enable pnpm

COPY ./config /home/config/