FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update -y && \
  apt-get install -y \
  curl \
  unzip

RUN curl -s -O -L -J https://github.com/duckdb/duckdb/releases/download/v0.7.1/duckdb_cli-linux-aarch64.zip && \
  unzip duckdb_cli-linux-aarch64.zip