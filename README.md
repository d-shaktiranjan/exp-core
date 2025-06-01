# ex-core

Core utilities and middleware for building robust Express applications, including standard API responses, async error handling, request sanitization, and extended request types.

## Installation

```sh
npm install exp-core
```

## Usages

### Util functions

#### successResponse

Sends a standardized successful API response.

```js
import { successResponse } from "exp-core";

const getUsers = (req, res) => {
    const users = []; // your logic to fetch users would go here

    return successResponse(res, {
        message: "Users fetched successfully.",
        statusCode: 200,
        data: { users: [] },
        meta: { totalCount: 50 },
    });
};
```

#### errorResponse

Sends a standardized error API response.

```js
import { errorResponse } from "exp-core";

const updateUser = async (req, res) => {
    if (!req.user)
        return errorResponse(res, {
            message: "User not found",
            statusCode: 401,
        });
};
```

### Middlewares

#### aw

Wraps an async Express route handler to catch errors and forward them to a standardized error response.

```js
import { aw } from "exp-core";

router.get(
    "/users",
    aw(async (req, res) => {
        const users = await userService.getAllUsers();
        return successResponse(res, {
            message: "Users fetched successfully.",
            data: { users },
        });
    }),
);
```

#### initRequestBody

Middleware to ensure `req.body` is always initialized as an object.

- In Express 5, `req.body` is `undefined` by default if no body-parsing middleware
- is used. This middleware sets `req.body` to `{}` if it's undefined.

```js
import express from "express";
import { initRequestBody } from "exp-core";

const app = express();
app.use(initRequestBody);
```

### Libs (custom classes)

### ApiError

Custom error class for handling API-specific errors with support for HTTP status codes and detailed validation or field-level errors.

- Extends the built-in `Error` class to include additional properties commonly used
- in API error responses.

```js
import { ApiError } from "exp-core";

const userValidatorUtil = (userData) => {
    if (!userData.email || !userData.email.trim())
        throw new ApiError("Invalid input data", 422);
};
```
