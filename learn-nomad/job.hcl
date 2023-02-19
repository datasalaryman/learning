job "todo-application" {
    datacenters = ["dc1"]

    group "echo" {
        count = 1

        task "server" {

            driver = "docker"

            config {
                image = "hashicorp/http-echo:latest"
                // command = "docker run"

                args = [
                    "-listen", ":8080",
                    "-text", "Hello and welcome to 127.0.0.1 running on port 8080!"
                ]
                // ports = ["consul_port"]
            }

            resources {
                network {
                    mbits = 10
                    port "http" {
                        static = 8080
                    }
                }
            }

        }

    }
}