# POC for Amruth's Blogs

### by Amruth Kuntamalla

This repo consists of the frontend part of the solution hosted on Vercel.

> NOTE: For the backend repository: https://github.com/amruth-k99/amruth-blogs-backend

## Features

- The project uses SSR and Incremental Static Rendering(ISR) to generate new blogs.
- Configured for SEO with Open Graph(OG) tags and title tags for all the Static sites generated
- A user can create a post and comment to any post
- A user can check his activities in the homepage grouped by date

## Tech Stack

- [Next JS] - A React Framework
- [TypeScript] - Strongly-typed JavaScript
- [Tailwind] - CSS framework
- [node.js] - event-driven I/O for the backend
- [MongoDB] - Persistent Database
- [AWS Serverless Application Model(SAM)] - To deploy functions to AWS Lambda
- [Vercel] - Hosting the frontend


## Installation

This repo requires NPM installed on the machine.

Install the dependencies and devDependencies and start the dev server.

```sh
cd recent-activity-frontend
npm i
npm run dev
```

Please create an environment file for the local development (.env.local) with following contents:

```
NEXT_PUBLIC_ENV_URL=http://localhost:3000
```

For production environments...

```sh
npm run build
NODE_ENV=production npm start
```

## Dependencies used

- react-icons
- react-toastify
- react-loading-skeleton
- moment

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[tailwind]: https://tailwindcss.com
[aws serverless application model(sam)]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
[next js]: https://nextjs.org
[node.js]: http://nodejs.org
[mongodb]: https://www.mongodb.com/
[TypeScript]: https://www.typescriptlang.org/
[vercel]: https://www.vercel.com/

## Testing

Cypress is being used to testing
