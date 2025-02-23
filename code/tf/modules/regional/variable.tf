# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ CloudFront S3 websitehosting redirect Stack - Terraform variable.tf variable                                                                     ║
# ╠═════════════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════╣
# ║ vpc_map                 │ map(string)                       │ VPC settings map.                                                                  ║
# ║ subnet_map_list         │ list(map(string))                 │ Subnet settings map list.                                                          ║
# ║ nacl_assoc_list         │ list(string)                      │ NACL settings list.                                                                ║
# ║ vpcep_gw_map            │ map(string)                       │ VPC Endpoint settings map.                                                         ║
# ║ vpcep_if_map_list       │ list(map(string))                 │ VPC Endpoint settings map.                                                         ║
# ║ partition               │ string                            │ Partition.                                                                         ║
# ║ ec2_map                 │ map(string)                       │ EC2 settings map.                                                                  ║
# ║ cert_issue_domain_name  │ string                            │ Domain name of the certificate to be issued.                                       ║
# ║ hostzone_id             │ string                            │ Hostzone id.                                                                       ║
# ║ alb_fqdn                │ string                            │ ALB FQDN.                                                                          ║
# ║ bucket_name             │ string                            │ S3 Bucket Name.                                                                    ║
# ╚═════════════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════╝

variable "vpc_map" {
  type        = map(string)
  description = "VPC settings map."
}

variable "subnet_map_list" {
  type        = list(map(string))
  description = "Subnet settings map."
}

variable "nacl_assoc_list" {
  type        = list(string)
  description = "NACL settings map."
}

variable "vpcep_gw_map" {
  type        = map(string)
  description = "VPC Endpoint settings map."
}

variable "vpcep_if_map_list" {
  type        = list(map(string))
  description = "VPC Endpoint settings map."
}

variable "partition" {
  type        = string
  description = "partition."
}

variable "ec2_map" {
  type        = map(string)
  description = "EC2 settings map."
}

variable "cert_issue_domain_name" {
  type        = string
  description = "Domain name for which the certificate should be issued."
}

variable "hostzone_id" {
  type        = string
  description = "Hostzone id."
}

variable "alb_fqdn" {
  type        = string
  description = "ALB FQDN."
}

variable "bucket_name" {
  type        = string
  description = "S3 Bucket Name."
}
