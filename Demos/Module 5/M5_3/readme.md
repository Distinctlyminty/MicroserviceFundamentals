# Deploying the API with Docker

This guide will walk you through the steps to build the Docker image and push to Docker Hub.

In order to do this, you will need to have installed Docker Desktop and have configured a repository on Docker Hub.

## Step 1: Build the Docker image

1. **Open the solution in Visual Studio Code**  Make sure you're in the the root of the project.  That's the folder that contains the Dockerfile.

2. **Build the image**  In the terminal execute the following command

``` bash
docker build -f Dockerfile -t vehicleservice .
```

3. **Tag the image with the repository**: You will need your account name and repository name from Docker Hub

``` bash
docker tag vehicleservice {accountName}/{repositoryName}
// example: docker tag vehicleservice jamesmillar/vehicleService
```

4. **Log in to Docker Hub**: Use your docker credentials.

```bash
docker login
```

5. **Push the image to the container repository**: Execute the following command providing the details of your repository:

``` bash
docker push {accountName}/{repositoryName}
```

Your Docker image should now be available in your repository with the :latest tag

You can now use this container in your host of choice such as Azure App Service or Kuberntetes.