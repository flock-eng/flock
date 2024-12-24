# Teleprsenence

## Why

Telepresence is a tool that allows you to run a service locally while connecting to a remote Kubernetes cluster. This is useful for debugging or iterating on services that are running in a remote cluster.

## How

Follow these steps to install and use Telepresence:

### Installation

```bash
# Install the telepresence CLI
brew install telepresenceio/telepresence/telepresence-oss

# Install the traffic manager
telepresence helm install

# Install the traffic agent
telepresence connect

# Check the status of the traffic agent
telepresence list
```

If needed, it can be uninstalled with:

```bash
# Uninstall the traffic manager
telepresence helm uninstall
```

### Flock-Web

Make sure the app is running locally:

```bash
cd flock-web
npm install
npm run dev
```

Create an intercept for the service:

```bash
telepresence intercept flock-web \
  --namespace default \
  --service flock-web \
  --port 3000:http
```

Next, visit <https://app.domain.ts.net/> to see the service running locally.

The correct address for this can be derived through either of these commands:

```bash
kubectl get ing flock-web-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 

open "https://$(kubectl get ing flock-web-ingress --no-headers \
  | awk '{print $4}')"

open "https://$(kubectl get ing flock-web-ingress \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
```

Finally, begin making changes to the service locally. The changes will be reflected in the remote cluster when you connect over the ingress.

When you're done, do this to clean up the intercept:

```bash
telepresence leave flock-web
```

## Flock-API

The address for the app can be found at:

```bash
kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

Then, it can be used in this command:

```bash
domain=$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
curl -X POST \
  -H "Content-Type: application/json" \
  "https://${domain}/frontend.v1.ProfilePageService/GetProfilePage" \
  -d '{"username": "testuser"}'
```

Or like this:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  "https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/frontend.v1.ProfilePageService/GetProfilePage" \
  -d '{"username":"testuser"}'
```

Next, let's start the app, make a change, create an intercept, then try the `curl` again.

Here is the small change:

```diff
diff --git a/flock-api/internal/profile_page/service.go b/flock-api/internal/profile_page/service.go
index 39648fd..72f4fb4 100644
--- a/flock-api/internal/profile_page/service.go
+++ b/flock-api/internal/profile_page/service.go
@@ -13,5 +13,5 @@ func NewService() *Service {
 }
 
 func (s *Service) GetProfilePage(ctx context.Context, request *frontendv1.GetProfilePageRequest) (*frontendv1.GetProfilePageResponse, error) {
-       return nil, errors.New("frontend.v1.ProfilePageService.GetProfilePage is not implemented")
+       return nil, errors.New("frontend.v1.ProfilePageService.GetProfilePage is not implemented yet")
 }
```

Next, let's start the app:

```bash
cd flock-api
go run cmd/main.go
```

Then, create an intercept:

```bash
telepresence intercept flock-api \
  --namespace default \
  --service flock-api \
  --port 8080:8080
```

Finally, try the `curl` again:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  "https://$(kubectl get ing flock-api-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/frontend.v1.ProfilePageService/GetProfilePage" \
  -d '{"username":"testuser"}'
{"code":"unimplemented","message":"frontend.v1.ProfilePageService.GetProfilePage is not implemented yet"}
```

When you're done, do this to clean up the intercept:

```bash
telepresence leave flock-api
```
