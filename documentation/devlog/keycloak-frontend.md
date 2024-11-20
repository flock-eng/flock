## [keycloack + frontend TODOS](https://github.com/flock-eng/flock/issues):
note: update keycloak.md or make a new documentation file after
### [programmatic realm configuration](https://github.com/flock-eng/flock/issues/6)
- created a realm-config.json in flock-kc/realms
  - future clients at 8080 & 3000 or alternate ports for example
- created a realm-config.yaml in flock-kc and deployed it
```bash
kubectl apply -f flock-kc/realm-config.yaml
```
- updated the values.yaml file with:
```yaml
extraEnvVars:
  - name: KEYCLOAK_IMPORT
    value: /opt/keycloak/data/import/realm-config.json

extraVolumeMounts:
  - name: realm-config
    mountPath: /opt/keycloak/data/import
    readOnly: true

extraVolumes:
  - name: realm-config
    configMap:
      name: keycloak-realm-config
```
- redeploy keycloak
```bash
helm upgrade --install keycloak bitnami/keycloak -f values.yaml --namespace keycloak --create-namespace```
- verifying the deployment: TODO STILL
```bash
kubectl port-forward --namespace keycloak svc/keycloak 9091:80 
```
- verify the new realm was created and clients were configured
- now we can test register / login features

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

### connect to keycloak from flock-web (integration)


### connect flock-api to flock-web to render pages


### buildout rest of flock-web post integration testing for auth




#### resources:

* [Keycloak Docs](https://www.keycloak.org/docs/latest/server_admin/#_configuring-realms)
* [Keycloak NextJS integration example](https://github.com/diego3g/keycloak-nextjs-example/tree/main/src)
* [NextJS Docs](https://nextjs.org/docs/app/getting-started/installation)
* [Shadcn Docs](https://ui.shadcn.com/docs/installation/next)
* 