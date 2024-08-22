# 1st run a db container

docker build -t mydb -f dockerfiledb .

docker run -d  -p 27017:27017 --name mydb mydb

#  build application

docker build -t shuoflybuys/mytestapp:latest -f dockerfile .

docker run -d -e MONGO_URL=mongodb://host.docker.internal:27017/goexpert -p 3000:3000 --name myapplication myapplication 

# local test

export MONGO_URL=mongodb://localhost:27017/goexpert

node server.js

# ssh -i /path/to/your-key-pair.pem ec2-user@public-ip

# docker-compose up --build 

# curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe333", "email": "john.doe333@example.com"}'

