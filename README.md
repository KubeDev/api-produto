# api-produto
KubeDev

Mondo docker

docker volume create mongo_vol

docker container run -d -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mongopwd -v mongo_vol:/data/db -p 27017:27017 mongo:4.4.3


 docker container run -d -p 8080:8080 --network produto_net -e MONGODB_URI=mongodb://mongouser:mongopwd@tender_newton:27017/admin frafaelptu/api-produto:v1
