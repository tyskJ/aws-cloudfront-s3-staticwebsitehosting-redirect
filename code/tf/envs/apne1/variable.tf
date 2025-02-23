# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ CloudFront S3 websitehosting redirect Stack - Terraform variable.tf variable                                                                     ║
# ╠═════════════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════╣
# ║ cert_issue_domain_name  │ string                            │ Domain name of the certificate to be issued.                                       ║
# ║ hostzone_id             │ string                            │ Hostzone id.                                                                       ║
# ║ alb_fqdn                │ string                            │ ALB FQDN.                                                                          ║
# ║ bucket_name             │ string                            │ S3 Bucket Name.                                                                    ║
# ╚═════════════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════╝

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
