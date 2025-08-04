# 🌐 IrviQuiz - End-to-End DevOps Project

This repository demonstrates a **real-world DevOps pipeline**, covering **CI/CD, Infrastructure as Code (IaC), GitOps, containerization, networking, and future observability/security enhancements**.

---

## ✅ **Key Features**

* **Application:** .NET Core (API + Web)
* **Containerization:** Docker
* **Registry:** Docker Hub
* **CI/CD:** GitHub Actions (CI) + ArgoCD (GitOps for CD)
* **Infrastructure:** Terraform for Azure AKS
* **Configuration Management:** Ansible for post-provisioning
* **Networking & Security:** NGINX Ingress + Cloudflare SSL
* **Upcoming:** Prometheus + Grafana (Monitoring), Trivy + SonarQube (Security)

---

## 📂 **Repository Structure**

```
IrviQuiz/
├── .github/
│   └── workflows/
│       └── ci_pipeline.yml            # CI pipeline for build & push
├── Infra/
│   ├── Terraform/                     # IaC for Azure resources
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   └── Ansible/                       # Post-provision automation
│       └── playbook.yml
├── k8s/                               # Kubernetes manifests for deployments
│   ├── namespace.yaml
│   ├── irviquiz-api-deployment.yaml
│   ├── irviquiz-web-deployment.yaml
│   ├── api-ingress.yaml
│   └── web-ingress.yaml
├── IrviQuiz.API/                      # API service code
│   ├── Dockerfile
│   └── ...
├── IrviQuiz.Web/                      # Frontend code
│   ├── Dockerfile
│   └── ...
├── docker-compose.yaml                # Local development stack
└── IrviQuiz.sln                       # .NET solution file
```

---

## 🏗 **Architecture Overview**

The solution is structured into **four layers**:

### **1. Application Layer**

* .NET Core API and Web UI
* Containerized using Docker

### **2. CI/CD Layer**

* CI: GitHub Actions builds and pushes Docker images to Docker Hub
* CD: ArgoCD deploys manifests from GitHub to AKS using GitOps principles

### **3. Infrastructure & Automation**

* Terraform provisions Azure Kubernetes Service (AKS) and related resources
* Ansible configures cluster resources (namespaces, RBAC, secrets, ArgoCD setup)

### **4. Networking & Security**

* NGINX Ingress for routing
* Cloudflare for SSL and custom domain

---

## 🚀 **How to Deploy**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/IrviQuiz.git
cd IrviQuiz
```

### **2. Local Development (Optional)**

```bash
docker-compose up -d --build
```

Access the app at: `http://localhost:8080`

### **3. Provision Infrastructure (Terraform)**

```bash
cd Infra/Terraform
terraform init
terraform apply
```

Set credentials and variables in `terraform.tfvars`.

### **4. Configure AKS (Ansible)**

```bash
ansible-playbook playbook.yml -i hosts
```

### **5. Deploy with ArgoCD**

Push changes to the main branch. ArgoCD auto-syncs to AKS.

---

## 🔐 **Required Secrets**

* `AZURE_SUBSCRIPTION_ID`
* `AZURE_CLIENT_ID`
* `AZURE_CLIENT_SECRET`
* `AZURE_TENANT_ID`
* `DOCKERHUB_USERNAME`
* `DOCKERHUB_TOKEN`

---

## 🔮 **Next Steps**

* Add observability
* Integrate security scanning: Trivy & SonarQube
* Implement quality gates and automated testing in CI pipeline
* Add cost optimization strategies (FinOps)

---

## 🛠 **Tech Stack**

| Component     | Tool                           |
| ------------- | ------------------------------ |
| IaC           | Terraform (Azure)              |
| Config Mgmt   | Ansible                        |
| CI            | GitHub Actions                 |
| CD            | ArgoCD                         |
| Orchestration | AKS (Kubernetes)               |
| Networking    | NGINX Ingress + Cloudflare     |
| Observability | Prometheus, Grafana (upcoming) |
| Security      | Trivy, SonarQube (upcoming)    |

---
