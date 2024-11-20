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

#### notes:
- initialized the frontend in the folder flock-web
```bash
# barebones next app for flock-web
npx create-next-app@latest flock-web --typescript --tailwind --eslint

cd flock-web
# install shadcn
npx shadcn@latest init
# start the application
npm run dev
```
- 

### connect to keycloak from flock-web (integration)


### connect flock-api to flock-web to render pages




#### resources:

* [Keycloak Docs](https://www.keycloak.org/docs/latest/server_admin/#_configuring-realms)
* [Keycloak NextJS integration example](https://github.com/diego3g/keycloak-nextjs-example/tree/main/src)
* [NextJS Docs](https://nextjs.org/docs/app/getting-started/installation)
* [Shadcn Docs](https://ui.shadcn.com/docs/installation/next)
* 