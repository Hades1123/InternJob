export const FRONTEND =
  'React, Vue.js, Angular, Next.js, Nuxt.js, Tailwind CSS, Bootstrap'
    .toLowerCase()
    .split(',')
    .map((str) => str.trim());

export const BACKEND =
  'Node.js, NestJS, Express, Spring Boot, ASP.NET, Django, Flask, Prisma, FastAPI, Laravel'
    .toLowerCase()
    .split(',')
    .map((str) => str.trim());

export const PROGRAMING_LANGUAGE =
  'JavaScript, TypeScript, Python, Java, C++, C#, Go, PHP, Rust, Ruby, GDScript, Solidity'
    .toLowerCase()
    .split(',')
    .map((str) => str.trim());

export const MOBILE = 'React Native, Flutter, Swift, Kotlin, Dart'
  .toLowerCase()
  .split(',')
  .map((str) => str.trim());

export const DB_CLOUD =
  'PostgreSQL, MySQL, MongoDB, Redis, Oracle, AWS, Azure, Docker, Kubernetes'
    .toLowerCase()
    .split(',')
    .map((str) => str.trim());

export const OTHERS =
  'Jest, Vitest, Playwright, Cypress, Unity, Unreal Engine, Godot, GameMaker, Git, Jira, Postman, Figma'
    .toLowerCase()
    .split(',')
    .map((str) => str.trim());
