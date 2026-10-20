# Gather — Our Community

A responsive React directory that fetches people from JSONPlaceholder and lets you search by name and expand each profile for contact details.

## Run locally

```sh
npm install
npm run dev
```

## Features

- Loads users from `https://jsonplaceholder.typicode.com/users` with Axios.
- Displays loading, error/retry, and no-results states.
- Filters the directory by name as you type.
- Expands a profile to show its address, phone number, and website.
- Responsive layout with keyboard-accessible controls.

Build for production with `npm run build`; check source style with `npm run lint`.
