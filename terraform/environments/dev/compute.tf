module "cluster" {
  source       = "../../modules/ecs/cluster"
  cluster_name = "fullstackhero"
}

module "webapi" {
  source          = "../../modules/ecs"
  vpc_id          = module.vpc.vpc_id
  environment     = var.environment
  cluster_id      = module.cluster.id
  service_name    = "webapi"
  container_name  = "app-webapi"
  container_image = "ghcr.io/fullstackhero/webapi:latest"
  subnet_ids      = [module.vpc.private_a_id, module.vpc.private_b_id]
  environment_variables = {
    DatabaseOptions__ConnectionString = module.rds.connection_string
    DatabaseOptions__Provider         = "postgresql"
    Serilog__MinimumLevel__Default    = "Error"
    CorsOptions__AllowedOrigins__0    = "http://${module.blazor.endpoint}"
    OriginOptions__OriginUrl          = "http://${module.webapi.endpoint}:8080"
  }
}

module "blazor" {
  source          = "../../modules/ecs"
  vpc_id          = module.vpc.vpc_id
  cluster_id      = module.cluster.id
  environment     = var.environment
  container_port  = 80
  service_name    = "blazor"
  container_name  = "app-blazor"
  container_image = "ghcr.io/fullstackhero/blazor:latest"
  subnet_ids      = [module.vpc.private_a_id, module.vpc.private_b_id]
  environment_variables = {
    BlazorClient_Settings__AppSettingsTemplate = "/usr/share/nginx/html/appsettings.json.TEMPLATE"
    BlazorClient_Settings__AppSettingsJson     = "/usr/share/nginx/html/appsettings.json"
    BlazorClient_ApiBaseUrl                    = "http://${module.webapi.endpoint}:8080"
    ApiBaseUrl                                 = "http://${module.webapi.endpoint}:8080"
  }
  entry_point = [
    "/bin/sh",
    "-c",
    "envsubst < $${BlazorClient_Settings__AppSettingsTemplate} > $${BlazorClient_Settings__AppSettingsJson} || echo 'envsubst failed' && find /usr/share/nginx/html -type f | xargs chmod +r || echo 'chmod failed' && echo 'Entry point execution completed' && cat /usr/share/nginx/html/appsettings.json && exec nginx -g 'daemon off;'"
  ]
}
