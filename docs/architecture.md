# Architecture
This app is built on the [Architect framework](https://arc.codes/docs/en/guides/get-started/quickstart)

## Routing
For an overview look at [app.arc](../app.arc) and the routes listed under the `@http` pragma:

```md
@http
get /
get /artists/:artistId
get /api/artists/:artistId
post /logout

@views
get /
get /artists/:artistId
get /api/artists/:artistId
```

The code for endpoints lives under `src/http`. In development Arc mounts each in a [local sandbox environment](https://arc.codes/docs/en/guides/developer-experience/local-development); at deploy time each route is built as a Lambda and pushed to production on AWS.

## Shared modules and views
Architect automatically shares tree-shaken modules under `src/shared` to all endpoints.

To minimise bloat, modules under `src/views` are only shared to endpoints listed under the `@views` pragma

For further details on sharing code see [the official documentation](https://arc.codes/docs/en/guides/developer-experience/sharing-code)

## Static files
Architect saves static assets under `/public` to an S3 bucket that can be referenced with the `/_static` route