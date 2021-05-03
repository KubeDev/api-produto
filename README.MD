# KubeDev Product Api
A CRUD Node.JS application for Kubernetes study time 

## Envs and Secrets
This repository contains declared envs and commited secrets for study purposes only, do not commit them in production!

## Milestones and Steps to reproduce:
- [x] Create a Kubernetes Cluster with K3d or Minikube

`k3d cluster create --agents 1 --servers 1 -p"8080:30000@loadbalancer"`

Note: Port 30000 is binded for correct link with service in [K3d cluster](https://k3d.io/)

- [x] Apply cluster secrets 

`kubectl apply -f k8s/secrets.yaml`

- [x] Build and push Docker application's image

`docker build -t <DockerUser>/kubedev-product-api:v1 -f src/Dockerfile src`
`docker tag <DockerUser>/kubedev-product-api:v1 <DockerUser>/kubedev-product-api:latest`

Note: Do not forget to change the pushed images value in `k8s/api/deployment.yaml`

- [x] Apply API manifests

`kubectl apply -f k8s/api/`

- [x] Apply Mongo manifests

`kubectl apply -f k8s/mongo/`
