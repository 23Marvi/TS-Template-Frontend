# Typescript/Angular frontend template
This is a template for a frontend project using Angular and Typescript. It includes a basic setup for a frontend project.

I've left the most basic setup possible with the following features:
- Angular 17
- State management with ngxs
    - Basic setup with a two states and actions for user and language
- Basic routing
- eslint
- Translations (see package.json for commands)
- jwtDecode + HttpInterceptor for authentication for easy backend integration

## Getting started
1. Clone the repository
2. Search for `ts-template-frontend` and replace it with your project name
3. Run `git remote remove origin` to remove the remote repository
4. Run `git remote add origin <your-repository-url>` to add your remote repository
5. Run `npm install`
6. Run `npm start` to start the development server