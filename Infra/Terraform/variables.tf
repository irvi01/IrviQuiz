variable "location" {
  description = "Azure region"
  default     = "eastus"
}

variable "resource_group_name" {
  description = "Resource Group name"
  default     = "rg-irviquiz-dev"
}

variable "aks_cluster_name" {
  description = "AKS Cluster name"
  default     = "aks-irviquiz-dev"
}

variable "client_id" {
  description = "Client ID for the AKS cluster"
  type        = string
}

variable "client_secret" {
  description = "Client Secret for the AKS cluster"
  type        = string
  sensitive   = true
}

variable "tenant_id" {
  description = "Azure Tenant ID"
  type        = string
}

variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}
