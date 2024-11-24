# flock-web docs
- for more loose details, visit documentation/devlog/keycloak-frontend.md

**Run the frontend locally:**
```bash
# navigate to frontend root directory
cd flock-web
# npm install
npm i
# run the application
npm run dev
```

**Run the frontend on docker:**
```bash
# navigate to frontend root directory
cd flock-web
# build the image
docker build -t flock-web:latest .
# run the container
docker run -p 3000:3000 flock-web:latest
```

**Deploy the frontend on kubernetes:**
```bash
# follow the readme in the source directory of this project first 
# note: frontend might already be running if it's in the skaffold file

# load env vars
eval $(minikube docker-env)
# build the image
docker build -t flock-web:latest ./flock-web

# deploy the k8s files
kubectl apply -f flock-web/k8s/deployment.yaml
kubectl apply -f flock-web/k8s/service.yaml

# get the service URL
minikube service flock-web --url
```