# api-produto
KubeDev

Mondo docker

docker volume create mongo_vol

docker container run -d -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mongopwd -v mongo_vol:/data/db -p 27017:27017 mongo:4.4.3
