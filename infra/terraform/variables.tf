variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for naming resources"
  default     = "barbershop"
}

variable "db_username" {
  description = "Database username"
  default     = "barbershop"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}
