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
