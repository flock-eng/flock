# Flock-Web

## Overview

A web application built with Next.js and React, featuring secure authentication through NextAuth and KeyCloak. The application is containerized and deployed in a Kubernetes cluster.

The application can be accessed here:

```bash
open "https://$(kubectl get ing flock-web-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
```

## Local Development with Telepresence

Ensure you have a `.env.local` file in the `flock-web` folder with the following contents (values are hidden):

```bash
KEYCLOAK_CLIENT_ID=flock-web
KEYCLOAK_CLIENT_SECRET=<from keycloak>
KEYCLOAK_ISSUER=<flock realm URL>
NEXT_PUBLIC_FLOCK_API_URL=<tailnet domain>
AUTH_SECRET=<ask wcygan>
```

Deploy the app locally:

```bash
cd flock-web
npm install
npm run dev
```

Create an intercept for the service:

```bash
telepresence connect

telepresence intercept flock-web \
  --namespace default \
  --service flock-web \
  --port 3000:http
```

Finally, open the application in your browser:

```bash
open "https://$(kubectl get ing flock-web-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
```

## DNS Settings for KeyCloak

Because our NextJS app is rendered server-side, we had to follow [Expose a tailnet HTTPS service to your cluster workloads](https://tailscale.com/kb/1438/kubernetes-operator-cluster-egress#expose-a-tailnet-https-service-to-your-cluster-workloads) to expose the KeyCloak service to NextJs within the cluster.

This way we can avoid errors like `getaddrinfo ENOTFOUND auth.<custom-domain>.ts.net`
