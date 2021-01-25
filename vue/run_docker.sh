npm run build
docker build -t todo_front_image .
docker kill todo_front
docker rm todo_front
docker run -d --name todo_front -p 9005:80 todo_front_image
docker rmi todo_front_image
