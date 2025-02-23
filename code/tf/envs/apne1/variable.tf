# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ CloudFront S3 websitehosting redirect Stack - Terraform variable.tf variable                                                                     ║
# ╠═════════════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════╣
# ║ cert_issue_domain_name  │ string                            │ Domain name of the certificate to be issued.                                       ║
# ║ hostzone_id             │ string                            │ Hostzone id.                                                                       ║
# ╚═════════════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════╝

variable "cert_issue_domain_name" {
  type        = string
  description = "Domain name for which the certificate should be issued."
}

variable "hostzone_id" {
  type        = string
  description = "Hostzone id."
}
