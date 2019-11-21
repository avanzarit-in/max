terraform {
  required_version = "0.12.13"
  backend "s3" {
    bucket = "max-dealer-app-terraform-infra"
    key    = "development"
    region = "us-east-1"
  }
}

provider "null" {
  version = "~> 2.1"
}

provider "template" {
  version = "~> 2.1"
}

variable environment {

}

provider "aws" {
  version = "~> 2.7"
  max_retries = 20
  profile = "default"
}

module "core" {
  source = "./core"
}

module "sap-api"{
  source="./api"
  sap-api-lambda-source-bucket-id = module.core.sap-api-lambda-source-bucket-id
  lambda-source = "../sap-api/sap-api.zip"
  lambda-s3-key = "v1.0.0/sap-api.zip"
  handler = "api.handler"
  runtime = "nodejs10.x"
  function-name = "SapApi"
  timeout = 7
}

output "sap_api_base_url" {
  value = "${module.sap-api.base_url}"
}

