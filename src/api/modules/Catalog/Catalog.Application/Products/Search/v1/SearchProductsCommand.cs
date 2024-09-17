using FSH.Framework.Core.Paging;
using SolanaSpin.WebApi.Catalog.Application.Products.Get.v1;
using MediatR;

namespace SolanaSpin.WebApi.Catalog.Application.Products.Search.v1;

public record SearchProductsCommand(PaginationFilter filter) : IRequest<PagedList<ProductResponse>>;
