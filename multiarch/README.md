do this for each image tar
```
docker load -i image-name.tar
```

then just do 
```
docker compose up --build -d
```
## Enabling Docker Buildx

Before building multi-platform Docker images, you need to enable and set up `buildx`:

```bash
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap
```

This sets up a new builder instance and makes it the current one in use.

---

## Building Multiarch Images (for Each Service)

To build a multi-platform Docker image for each service in the `multiarch` folder (without pushing to a registry), run the following command from the directory that contains the service’s `Dockerfile`:

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t image-name:multiarch \
  --output type=oci,dest=image-name.tar \
  .
```

> ⚠️ The `--output type=oci` is used because the default `docker` output does not support manifest lists.

You’ll need to run this command **for each service**.

