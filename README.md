# Full_Stuck_Training

Training Simple UI  
This project can do:
- User Login And Register
- Login Reserve
- Token Timeout Mechanism
- Select Store And Check Some Food
- Add Food To Shopping Cart
- Check Order And Delete Order

## Tools
Development Environment
- WSL
- Docker

Codind Style Manage
- Eslint
-- Airbnb
- Prettier

Frontend
- React
- ANTD
- Axios
- Webpack
- SASS

Backend
- Express
- JWT
-- jsonwebtoken
- Nodemon
- Typeorm
- TypeScript

Database
- postgreSQL
- Redis

## Getting started

To make it easy for you to get started with this repo, here's a list of recommended next steps.

### Development Environment
- Windows install WSl => https://learn.microsoft.com/zh-tw/windows/wsl/install  
- WSl install Docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh  // need to wait 20s
sudo service docker start
sudo apt install docker-compose
```

### Get repo To Local
```
git clone https://github.com/meowen0228/React_Node.js_EAT.git
```
### Download npm packages
- open frontend and backend folder By VScode  
- open terminal
```
npm i
```

###  postgreSQL And Redis
in backend folder
```
docker-compose up -d
```
