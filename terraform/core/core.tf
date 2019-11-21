resource "aws_s3_bucket" "sap-api-lambda-source-bucket" {
  bucket = "sap-api-lambda-source"
  acl    = "private"
}