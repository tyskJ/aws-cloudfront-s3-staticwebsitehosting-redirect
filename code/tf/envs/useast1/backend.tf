terraform {
  backend "s3" {
    bucket  = "tf-20250223-useast1"
    key     = "tfstate/terraform.tfstate"
    profile = "admin"
    region  = "us-east-1"
  }
}
