FROM binwiederhier/ntfy

ARG DEBIAN_FRONTEND=noninteractive

COPY server.yml /etc/ntfy/server.yml

ENTRYPOINT ["ntfy", "serve"]

# WORKDIR /app

# RUN apt-get update -y && \
#     apt-get install -y \
#     build-essential \
#     curl

# RUN mkdir -p /etc/apt/keyrings && \
#     curl -fsSL https://archive.heckel.io/apt/pubkey.txt | \
#     gpg --dearmor -o /etc/apt/keyrings/archive.heckel.io.gpg && \
#     apt-get install -y apt-transport-https

# RUN echo 'deb [arch=arm64 signed-by=/etc/apt/keyrings/archive.heckel.io.gpg] https://archive.heckel.io/apt debian main' \
#     > /etc/apt/sources.list.d/archive.heckel.io.list

# RUN apt-get update -y && \
#     apt-get install ntfy && \
#     systemctl enable ntfy

# ENTRYPOINT [ "systemctl", "start", "ntfy" ]