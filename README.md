# api-produto
# http://localhost:8080/api-docs


KubeDev

Criação manual sem dockercompose

docker network create produto_net
docker network connect produto_net <container_id>

docker volume create mongo_vol

docker container run -d --name=mongodb -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mongopwd -v mongo_vol:/data/db --network produto_net -p 27017:27017 mongo:4.4.3


docker container run -d -p 8080:8080 --network produto_net -e MONGODB_URI=mongodb://mongouser:mongopwd@mongodb:27017/admin frafaelptu/api-produto:v1
