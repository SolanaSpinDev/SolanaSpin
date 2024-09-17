﻿using System.ComponentModel;
using MediatR;

namespace SolanaSpin.WebApi.Todo.Features.Create.v1;
public record CreateTodoCommand(
    [property: DefaultValue("Hello World!")] string Title,
    [property: DefaultValue("Important Note.")] string Note) : IRequest<CreateTodoResponse>;



