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

```