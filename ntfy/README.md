# nfty

**From the official ntfy dockerhub image documentation**

This is the Docker image for ntfy. The image contains both server and a CLI to publish and subscribe to topics. It is available for amd64, armv7 and arm64. It should be pretty straight forward to use. Check out up-to-date instructions in the documentation.

The server exposes its web UI and the API on port 80, so you need to expose that in Docker. To use the persistent message cache, you also need to map a volume to /var/cache/ntfy. To change other settings, you should map /etc/ntfy, so you can edit /etc/ntfy/server.yml.

Basic usage (no cache or additional config):

```
docker run -p 80:80 -it binwiederhier/ntfy serve
```

With persistent cache (configured as command line arguments):

```
docker run \
  -v /var/cache/ntfy:/var/cache/ntfy \
  -p 80:80 \
  -it \
  binwiederhier/ntfy \
    --cache-file /var/cache/ntfy/cache.db \
    serve
```

With other config options (configured via /etc/ntfy/server.yml, see configuration for details):

```
docker run \
  -v /etc/ntfy:/etc/ntfy \
  -p 80:80 \
  -it \
  binwiederhier/ntfy \
  serve
```

Alternatively, you may wish to build a customized Docker image that can be run with fewer command-line arguments and without delivering the configuration file separately.

```
FROM binwiederhier/ntfy
COPY server.yml /etc/ntfy/server.yml
ENTRYPOINT ["ntfy", "serve"]
```

This image can be pushed to a container registry and shipped independently. All that's needed when running it is mapping ntfy's port to a host port.