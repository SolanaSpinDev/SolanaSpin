﻿namespace SolanaSpin.Framework.Core.Paging;

public class PaginationFilter : BaseFilter
{
    public int PageNumber { get; set; }

    public int PageSize { get; set; } = int.MaxValue;
    public IEnumerable<string>? OrderBy { get; set; }
}
