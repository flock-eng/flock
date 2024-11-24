## [keycloack + frontend TODOS](https://github.com/flock-eng/flock/issues):
note: update keycloak.md after auth has been tested

### [programmatic realm configuration](https://github.com/flock-eng/flock/issues/6)

**Environment Setup:**

```bash
# Start the k8s cluster
minikube start

# Start the Database
skaffold run -p infrastructure -m postgres-operator-installation -m flock-db-configuration

# Inner Loop: test KeyCoak
skaffold dev -p infrastructure -m keycloak-installation

# Port-Forward KeyCloak
kubectl port-forward --namespace keycloak svc/keycloak 9091:80

# At this point, you go can on to test the new functionality. When you're done, proceed with cleanup.

# Cleanup Everything
skaffold delete -p infrastructure
 ```

**Functional Testing:**

Visit http://localhost:9091/ and login to the administrative realm:

```json
{ 
  "username": "admin",
  "password": "password"
}
```

Visit http://localhost:9091/admin/master/console/#/flock/realm-settings/login and see that user registration is enabled:

<img width="500" alt="image" src="https://github.com/user-attachments/assets/6c1dd78c-b8e1-4188-b3b1-d910b6a046e9">


Visit http://localhost:9091/realms/flock/account and register with a new account

| Login Page | Register Page |
|--------|--------|
| <img width="500" alt="image" src="https://github.com/user-attachments/assets/aef3bee7-4dd1-46fe-834d-593bc168047c"> | <img width="500" alt="image" src="https://github.com/user-attachments/assets/95c2dee9-4d0c-44a2-a453-2d4493f86c69"> | 

```json
{ 
  "username": "foo",
  "password": "bar",
  "email": "foo@bar.com",
  "first_name": "foo",
  "last_name": "bar"
}
```
Register your account, then

| Account Page | Login Page |
|--------|--------|
| <img width="1728" alt="image" src="https://github.com/user-attachments/assets/58295a3a-dd40-42ab-afc3-5d362049b4d2"> | <img width="1728" alt="image" src="https://github.com/user-attachments/assets/de33508f-290f-4c8f-a17b-efaab2df6fd8"> |

### [build flock-web](https://github.com/flock-eng/flock/issues/8)

#### frontend tech
- NextTS (next-auth, etc..)
- Tailwind/Shadcn

#### initialized the frontend in the folder flock-web DONE
```bash
# initialize a barebones next app for flock-web
npx create-next-app@latest flock-web --typescript --tailwind --eslint

cd flock-web
# install shadcn
npx shadcn@latest init
npm i
# start the application
npm run dev

# add ui components to /flock-web/components/ui from shadcn ui library
npx shadcn@latest add button
# added 6 components in one (sub-components to make a sidebar)
npx shadcn@latest add sidebar

# install next-auth
npm install next-auth
```

#### building out web components and keycloak-auth with next-auth TODO
- starting in `flock-web/app/api/auth/[...nextauth]/route.ts` we have this structure
  - The square brackets ([...]) are a NextJS convention for dynamic API routes or catch-all routes
  - and for nextauth integration, the file should be named route.ts
```
flock-web/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   ├── route.ts (make this file)
│   ├── protected/
│   │   ├── authCheck.tsx (make this file)
│   │   ├── socialFeed.tsx (example)
│   ├── login.tsx (example)
│   ├── signup.tsx (example)
│   ├── ...
├── .env.local (make this file)
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── ...
```
- with the following client secrets in `.env.local`
```tsx
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=http://your-keycloak-domain/realms/your-realm
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```
- then we can make a authCheck.tsx file in /flock-web/app/protected/authCheck.tsx to check if authentication works
  - TODO:
```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>You need to be signed in to access this page.</div>;
  }

  return <div>Welcome, {session.user?.name}!</div>;
}
```

- next important tasks include:
  - double check realm creation & configuration on keycloak
  - testing auth on frontend-client & backend-client (tasks below)
  - making components for sign-in / login
  - making other web components and testing auth further

### configure flock-web dockerfile / kubernetes deployments


#### Dockerfile setup

**edited next.config.ts**
- Standalone mode is a special configuration introduced in Next.js to optimize the application for deployment in containerized environments or servers with minimal dependencies.
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone"
};

export default nextConfig;
```

**added a minimal dockerfile:**
- may need to edit this dockerfile as we build additional features
```dockerfile
# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

**test and run the container:**
```bash
cd flock-web
# build the image
docker build -t flock-web:latest .

# run the container
docker run -p 3000:3000 flock-web:latest
```
navigate to http://localhost:3000/ to see the application

#### Kubernetes setup

**created the k8s folder in flock-web/ and made minimal deployment and service files:**

**Deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flock-web
  namespace: default
  labels:
    app: flock-web
spec:
  replicas: 1
  selector:
    matchLabels:
      app: flock-web
  template:
    metadata:
      labels:
        app: flock-web
    spec:
      containers:
        - name: flock-web
          image: flock-web:latest
          imagePullPolicy: Never  # for local minikube development
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "development"
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
```

**Service.yaml:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: flock-web
  namespace: default
  labels:
    app: flock-web
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
      name: http
  selector:
    app: flock-web
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

#### add a minimal sign-in, register, and homepage
todo

### connect to keycloak from flock-web (integration)


### connect flock-api to flock-web to render pages


### buildout rest of flock-web post integration testing for auth




#### links:

* [Keycloak Docs](https://www.keycloak.org/docs/latest/server_admin/#_configuring-realms)
* [Keycloak-CFG-CLI](https://github.com/adorsys/keycloak-config-cli)
* [Keycloak NextJS integration example](https://github.com/diego3g/keycloak-nextjs-example/tree/main/src)
* [Similar Keycloak use cases](https://github.com/flock-eng/flock/issues/6#issuecomment-2495632423)
* [NextJS Docs](https://nextjs.org/docs/app/getting-started/installation)
* [Shadcn Docs](https://ui.shadcn.com/docs/installation/next)