![Action Status](https://github.com/tair/ifad-frontend/workflows/Node%20CI/badge.svg)

# IFAD Frontend

This is the frontend web application that queries genome data from the
[ifad backend] and displays it in a graphical, interactive way.

[ifad backend]: https://github.com/tair/ifad-backend

## Dependencies

To get started, you'll need to have the following tools installed:

* [Node.js] (v12 or later)
* [Yarn]

[Node.js]: https://nodejs.org/en/download/
[Yarn]: https://classic.yarnpkg.com/en/docs/install/#debian-stable

## Running locally

To run the frontend application locally, you'll need to first make sure
you have the [backend server running locally] on port 3000.

[backend server running locally]: https://github.com/tair/ifad-backend#running-locally

As a one-time setup for the frontend, you'll want to copy the `.env.sample`
file and name it `.env`. This will cause the frontend to use the environemnt
variable values assigned there. Specifically, it tells the frontend which
address to find the backend server on.

```bash
cp .env.sample .env
```

Note: The .env file is included in the .gitignore for this repo intentionally,
make sure you don't commit it!

Once that's all taken care of, use yarn to install the project dependencies
and launch the frontend.

```bash
yarn && yarn start
```

If you have the backend server running (which you should), it will show a
warning that port 3000 is already in use, and it will ask if you want to use
another free port. Say yes, then it should launch the frontend on
`localhost:3001`.
