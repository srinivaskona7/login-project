#!/bin/bash

set -e

# --- Cluster/API Auth ---
API_SERVER="https://api.c-64cdbc0.kyma.ondemand.com"
SA_TOKEN="eyJhbGciOiJSUzI1NiIsImtpZCI6Im15aTRFYjFMbHlMcUV3NHhkMDJ4cTY5VElfSDhuZF8tTnFIaUxkckpYVzgifQ.eyJhdWQiOlsia3ViZXJuZXRlcyIsImdhcmRlbmVyIl0sImV4cCI6MTc1MjUyMzcxOCwiaWF0IjoxNzUyNTIwMTE4LCJpc3MiOiJodHRwczovL2FwaS5jLTY0Y2RiYzAua3ltYS5pbnRlcm5hbC5saXZlLms4cy5vbmRlbWFuZC5jb20iLCJqdGkiOiI4ZDNhZTA4OC1lYmZlLTQ2Y2UtODEzOC05ZjM4MDAyZWNiMmEiLCJrdWJlcm5ldGVzLmlvIjp7Im5hbWVzcGFjZSI6ImRlZmF1bHQiLCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoibXktYXBwLXNhIiwidWlkIjoiOTFkMTIzMjktYWNhOS00ZjA3LTk1YWUtYWZhZjY0Y2VhNGY5In19LCJuYmYiOjE3NTI1MjAxMTgsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0Om15LWFwcC1zYSJ9.uXP4c-IavwY8lfHMkkZ4fQ-D17_1jC-Q1BQbMVxbF-oaHYF2bergxWkPDXowKP-qg4VCwvBf6VS_zu2-dUlQ_WB_fy169pLNNaecAxWsPZvDTuY79ekCW42MCArRyEDkFd8fgq51frj6BRLZQY5FkWYpVOfLYL1HGw9dVrXZqgJRCJyC0JWOvNsICKDpf3QfJlIGIXlIKZziZg3dPiKB1VB9niRlfRsptsMiyeNpwLn2dCgDC0wpsadtTHpv1cRJeR8FTijcf4yKtWf6ghcBZaXJQUc8yjxRqpnMNVOQiYCrjTfptQ2WdX66zc1uh21rWx3lfzyTM4-t_t6pKjKh9eGeHJU9WnXl_VZ-Yb_5kDqCStUO724DRclzpAzOYzgPNNp2DLTZstoyNWaT5mckynxtzTNBoTqDSil1PzUy0REKaJA9k_WzokvQMvCrQQreksZQCFLp01EqaljwLwyLq1E8sAOnAlvzrzj3FIIXdyTtQlwPjRZKxwW05DjqT1rqjDddF2w5YMFhDkgHQPMKN4bmQJQPWWE8EDlhGcPSTRvgMShkzPobkkUtKDa2fJ-FsYxxCx_ThgZ3ZD50ORP6kPQOYE3ogoHYIOtoSBGVGaWfYezf51lTAv1w5S-5W5sx8OqgJJubqva6zDyw29vXTxU4mFlvIHiwI266_WWmDHQ"
CA_DATA="LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUQ1ekNDQWsrZ0F3SUJBZ0lSQU84Z0NnTWNPQWZXTWZRZzNzQVNYTWd3RFFZSktvWklodmNOQVFFTEJRQXcKRFRFTE1Ba0dBMVVFQXhNQ1kyRXdIaGNOTWpVd056QTVNRE0xTnpNNVdoY05NelV3TnpBNU1ETTFPRE01V2pBTgpNUXN3Q1FZRFZRUURFd0pqWVRDQ0FhSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnR1BBRENDQVlvQ2dnR0JBTXhrCnlBU2hCRzFCdTRVKytLejhuVG1hRWNQZFVIcFo5UFBDT0tVZExmUmVXVWUyUUZPU2FqQUhXaTIwUG1KVDVTTjUKb2tuZTB6Z3crYk5vWDluZHRKQnFFeGRnT3JzRlFIV09tdGVVQ0JBYjM1RGxRQ0d4eWVTaFE4RnR1OGpXbXgxMQorRjBNUVJJcnpYaVRRK1VPeUJoRGIyaVAzQ21lWXFoOE5DdEFhdGl4dTBZeDBiVHdqNERZeS9GSW5FY0gvYTIzCjkyYkY3R3B4QXNYNDdqNmRjTVJEQWs3bXNQK2ZKUkIwWUpQNUJGUytQek9MejlnQytXa1pjT2g4RGVIU1NZVkgKMHl6bFVxL2d3dnI5ZXlqTXY2b3ZLV2pjd0NOZmIzTGJVUllicE9aNTlIWWJqSmIrY2hOcUVaUk1LRHFVZ1ZySAp3ZDYvYStBUFVGcm1KM0JhTk9OcmI3M3E1SjZXZXR4c2VYWmxvc2R5bEhTR0pTYzJnMnJQQ0pOSWRvQ01lTlY4CnVTRWU5MXJWN2cyVzR6UzZFc05vTThtV2w3dTR6ajJucEx1dlFmbXpUK3M0aWZZOUFQeUNwbXBjRUtKbURxRXEKbkpCRnlNMlp3L1hpZHVrT2ZVc3AwV3p6M1ZhYlRqMHB5RUJMYW5Lb2dSVmVCYW5XejREN3VXZzI4U1p0d3dJRApBUUFCbzBJd1FEQU9CZ05WSFE4QkFmOEVCQU1DQWFZd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFCkZnUVVkaWlubkg2TFlKTGRadEhMd210WFFCOENOdk13RFFZSktvWklodmNOQVFFTEJRQURnZ0dCQUlOQ3RSRnQKUFVPTnVtMnFXbWdZNVFqdlV1M2hLOGxISlV6enBER0FFSXdSaGlZRC9aT3c1Q29QR04xUitLNnNWbUt6NkRYNQpKTk04ZzRhWkl6NTF1N0VlcElqUlRmMUxjZDdhYjlpYVFUdzgrMmpZWEFDQXV0Y0xYQ3BQREoySHRZRGt3enhvCk9FZk5vUmk5YUVXaGl2NjhiN1FZL0pBaUV4V0FQZThENDNEdDVqV2FiaTIzYm11dGZwN1ZDS0o3WjdWcUVHSUEKOVdNZ2FRaE51d05hV2pEeDJ5M0E0MU9TQy96RW9VYVZsTFVVbDV4a05CcmJRVmtQRmVDR1RWOHdJL09FZ0tBdQpkdEVybmplY1JHQWV1Z2d2UUpERE4ybVluU1V2ZzhRcFdhT0s3NFpmQVFPanh0WHBURTlmTVFLQVpDSWo2c01hClgwVUc3VDVOZVRabjdQUXRlUnhsVHNaOE1QNkUzaStBSnhTSmpjNEV5TzdTOE1wQUY5M2JZUk9LakdjVnUydVgKQWNtTXdXSitFZjBpWXBhUDVvakJCdFFxVUMvTkdWblE4OERUS3V4WmdONnFHYjJaR24rSmFBSEVjUUdXbG0xdApWK3lIRTJuWmpPL2NxRE1SZEQyZStoRjlyQlVtN05UVndadXBMb0hia1hWQ3VPNHI1L1JBYzdhZU93PT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo="

K8S_NAMESPACE="test"
KUBECONFIG_FILE="/tmp/sa_kubeconfig.yaml"

FRONTEND_DIR="frontend"
FRONTEND_IMAGE="sriniv7654/busybox2:frontend-new"
FRONTEND_DEPLOYMENT="frontend"

AUTH_DIR="auth-service"
AUTH_IMAGE="sriniv7654/busybox2:auth-service-new"
AUTH_DEPLOYMENT="auth-service"

PROFILE_DIR="profile-service"
PROFILE_IMAGE="sriniv7654/busybox2:profile-service-new"
PROFILE_DEPLOYMENT="profile-service"

# --- YAML for each service (deployment and service) ---
FRONTEND_YAML='
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: sriniv7654/busybox2:frontend-new
        imagePullPolicy: Always
        ports:
        - containerPort: 80
'

FRONTEND_SVC_YAML='
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
'

AUTH_YAML='
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      initContainers:
      - name: wait-for-mongodb
        image: busybox:1.28
        command: ["sh", "-c", "until nslookup mongodb-service; do echo waiting for mongodb; sleep 2; done;"]
      containers:
      - name: auth-service
        image: sriniv7654/busybox2:auth-service-new
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        env:
        - name: MONGO_URI
          value: "mongodb://root:user123@mongodb-service:27017/admin"
'

AUTH_SVC_YAML='
apiVersion: v1
kind: Service
metadata:
  name: auth-service
spec:
  selector:
    app: auth-service
  ports:
  - port: 3000
    targetPort: 3000
'

PROFILE_YAML='
apiVersion: apps/v1
kind: Deployment
metadata:
  name: profile-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: profile-service
  template:
    metadata:
      labels:
        app: profile-service
    spec:
      initContainers:
      - name: wait-for-mongodb
        image: busybox:1.28
        command: ["sh", "-c", "until nslookup mongodb-service; do echo waiting for mongodb; sleep 2; done;"]
      containers:
      - name: profile-service
        image: sriniv7654/busybox2:profile-service-new
        imagePullPolicy: Always
        ports:
        - containerPort: 3001
        env:
        - name: MONGO_URI
          value: "mongodb://root:user123@mongodb-service:27017/admin"
'

PROFILE_SVC_YAML='
apiVersion: v1
kind: Service
metadata:
  name: profile-service
spec:
  selector:
    app: profile-service
  ports:
  - port: 3001
    targetPort: 3001
'

# --- Manifest for full redeploy (replace this with your full multi-resource manifest if needed) ---
FULL_MANIFEST='
# Paste your full YAML manifest here for redeploy
'

setup_kubeconfig() {
    cat > "$KUBECONFIG_FILE" <<EOF
apiVersion: v1
kind: Config
current-context: kyma
clusters:
- name: kyma
  cluster:
    server: ${API_SERVER}
    certificate-authority-data: ${CA_DATA}
users:
- name: sa-user
  user:
    token: ${SA_TOKEN}
contexts:
- name: kyma
  context:
    cluster: kyma
    user: sa-user
    namespace: ${K8S_NAMESPACE}
EOF
}

deploy_service() {
    local service_name=$1
    local build_dir=$2
    local image_tag=$3
    local deployment_name=$4
    local deployment_yaml=$5
    local service_yaml=$6
    local svc_name=$7

    echo "---"
    echo "🚀 Starting deployment for: ${service_name}"
    echo "---"

    echo "Building Docker image..."
    docker build --progress=plain -t "${image_tag}" "${build_dir}"
    echo "Pushing Docker image..."
    docker push "${image_tag}"

    echo "Deleting old deployment and service..."
    kubectl --kubeconfig="${KUBECONFIG_FILE}" delete deployment "${deployment_name}" --ignore-not-found=true
    kubectl --kubeconfig="${KUBECONFIG_FILE}" delete service "${svc_name}" --ignore-not-found=true

    echo "Applying service YAML..."
    echo "${service_yaml}" | kubectl --kubeconfig="${KUBECONFIG_FILE}" apply -f -
    echo "Applying deployment YAML..."
    echo "${deployment_yaml}" | kubectl --kubeconfig="${KUBECONFIG_FILE}" apply -f -

    kubectl --kubeconfig="${KUBECONFIG_FILE}" rollout status "deployment/${deployment_name}" --timeout=3m

    echo "🎉 Deployment successful for: ${service_name}"
}

redeploy_environment() {
    echo "Deleting namespace (if exists)..."
    kubectl --kubeconfig="${KUBECONFIG_FILE}" delete namespace "${K8S_NAMESPACE}" --ignore-not-found=true
    while kubectl --kubeconfig="${KUBECONFIG_FILE}" get namespace "${K8S_NAMESPACE}" >/dev/null 2>&1; do
        sleep 5
    done
    echo "Creating namespace..."
    kubectl --kubeconfig="${KUBECONFIG_FILE}" create namespace "${K8S_NAMESPACE}"
    echo "Applying all resources..."
    echo "${FULL_MANIFEST}" | kubectl --kubeconfig="${KUBECONFIG_FILE}" apply --namespace="${K8S_NAMESPACE}" -f -
    for dep in ${AUTH_DEPLOYMENT} ${PROFILE_DEPLOYMENT} ${FRONTEND_DEPLOYMENT}; do
        kubectl --kubeconfig="${KUBECONFIG_FILE}" rollout status deployment/"$dep" --timeout=3m
    done
    echo "🎉 Environment fully redeployed!"
}

cleanup() {
    rm -f "$KUBECONFIG_FILE"
}
trap cleanup EXIT

if [ -z "$1" ]; then
    echo "❌ Error: Missing parameter. Please specify a deployment option." >&2
    echo "Usage: $0 {redeploy|1|2|3|all}" >&2
    exit 1
fi

setup_kubeconfig

case $1 in
    redeploy)
        redeploy_environment
        ;;
    1)
        deploy_service "Frontend" "$FRONTEND_DIR" "$FRONTEND_IMAGE" "$FRONTEND_DEPLOYMENT" "$FRONTEND_YAML" "$FRONTEND_SVC_YAML" "frontend-service"
        ;;
    2)
        deploy_service "Auth Service" "$AUTH_DIR" "$AUTH_IMAGE" "$AUTH_DEPLOYMENT" "$AUTH_YAML" "$AUTH_SVC_YAML" "auth-service"
        ;;
    3)
        deploy_service "Profile Service" "$PROFILE_DIR" "$PROFILE_IMAGE" "$PROFILE_DEPLOYMENT" "$PROFILE_YAML" "$PROFILE_SVC_YAML" "profile-service"
        ;;
    all)
        deploy_service "Frontend" "$FRONTEND_DIR" "$FRONTEND_IMAGE" "$FRONTEND_DEPLOYMENT" "$FRONTEND_YAML" "$FRONTEND_SVC_YAML" "frontend-service"
        deploy_service "Auth Service" "$AUTH_DIR" "$AUTH_IMAGE" "$AUTH_DEPLOYMENT" "$AUTH_YAML" "$AUTH_SVC_YAML" "auth-service"
        deploy_service "Profile Service" "$PROFILE_DIR" "$PROFILE_IMAGE" "$PROFILE_DEPLOYMENT" "$PROFILE_YAML" "$PROFILE_SVC_YAML" "profile-service"
        ;;
    *)
        echo "❌ Error: Invalid parameter '$1'." >&2
        echo "Usage: $0 {redeploy|1|2|3|all}" >&2
        exit 1
        ;;
esac

echo "✅ All requested operations are complete."
