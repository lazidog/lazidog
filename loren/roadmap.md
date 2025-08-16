# 🔧 Roadmap

## 1. ✅ Git & Workflow

### Git Basics
- `git init`, `clone`, `status`, `add`, `commit`, `push`, `pull`, ...
- `.gitignore`

### Git Commit Convention
- Conventional commits (`feat:`, `fix:`, `refactor:`...)

### Git Tagging
- What is SemVer?

### Git hooks

### SSH
- What is it? Used for? Setup
- How to connect to github

### Side Quests
- Rename multi commits in branch history
- Delete previous commit
- Revert faulty commit
- Replace code from `master` with `temp` branch
- Stash changes and reapply it on another branches
- Log commits from in a range of times
- Merge all commits of branch into one
- Setup 2 repos with different configs (name, email, ssh)
- Create a project in github using kanban board

📚 Resource:
- https://github.com/nccasia/ncc-git-basic

---

## 2. 🧠 JavaScript / TypeScript Fundamentals

### Language Basics
- Variables: `let`, `const`, scope
- Strict Mode
- Types: JS types, TS types
- `NaN`, `null`, `undefined`
- Objects, Arrays & built-in methods

### TypeScript Deep Dive
- `interface`, `type`, `union`, `intersection`
- `keyof`, `typeof`
- Generics
- Deep clone function (recursive type-safe)

### Advanced Data Structures
- `Map` vs `Set`: use cases, performance
- Implement LRU Cache with Map (optional)

### Dates & Files
- Timezone, DST
- Upload file
- Buffer vs Base64
- Request size limitations

### Modules & OOP
- ES Modules vs CommonJS
- Class, inheritance, composition
- Dependency injection (basic)

---

## 3. 🎯 Lint & Format

### Linting
- Eslint
- Common rules

### Formatting
- Prettier

### Side quests
- Config auto format on save (VSCode)
- Create git hook pre-commit to lint before commit

---

## 4. 🔁 Async & Event Loop

### Core Concepts
- Call stack
- Microtasks (Promise, `queueMicrotask`)
- Macrotasks (`setTimeout`, `setImmediate`)
- `process.nextTick`

### Async Patterns
- Callback hell
- Promise
- Async/Await

### Demo
- `Promise.all` + `for loop`
- Explain execution order

📚 Resources:
- https://www.youtube.com/watch?v=0SJE9dYdpps
- https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- https://www.youtube.com/watch?v=84QFDnZx7T4

---

## 5. 🛢️ SQL Fundamentals

### Basics
- `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- `JOIN`, `GROUP BY`, `HAVING`

### Advanced SQL
- Indexing (B-Tree, covering index)
- Subquery vs Nested vs Correlated
- Transactions
- Temporary Tables

### Optimization
- Query plan (`EXPLAIN`)
- Avoid N+1
- Deadlocks (optional)

📚 Practice:
- https://leetcode.com/studyplan/top-sql-50/
- https://use-the-index-luke.com/
- https://www.geeksforgeeks.org/sql-tutorial/?ref=shm
- https://www.thoughtspot.com/data-trends/data-modeling/optimizing-sql-queries

---

## 6. ⚙️ NodeJS

### Core Concepts
- What is Node.js?
- Differences from browser JS
- Global objects: `this`, `global`, `process`

### Modules
- CommonJS vs ES Modules
- `require`, `import`, `export`

### Node APIs
- EventEmitter
- Working with streams & buffers

### Performance & Workers
- Worker Threads (optional)
- Memory leaks
- Large data transfer (base64, image buffer)
- Shared memory with `SharedArrayBuffer`

📚 Resource:
- https://github.com/nccasia/nodejs/blob/main/chap1/nodejs-overview.md
- https://betterstack.com/community/guides/scaling-nodejs/nodejs-workers-explained/

---

## 7. 🌐 Backend Concepts

### Authentication
- Cookies vs JWT
- HTTP-only, Secure, SameSite
- OAuth (optional)

### Caching
- Client-side caching
- Server-side with Redis
- CDN (optional)

### Testing
- Unit testing with Vitest / Jest / Mocha
- Integration tests
- Test coverage (optional)

### Real-time
- WebSockets
- Event-based communication

### CI/CD (optional)
- GitHub Actions
  - Auto gen docs with Swagger
  - Auto deploy when new version arrived
  - Auto run test coverage on each pr
  - Auto run global test on every push

---

## 8. ⚙️ React

### 🧠 Core Concepts
- What is React? Why use it?
- JSX: Syntax and how it works
- Components:
  - Functional vs Class Components
  - Props and PropTypes
  - State and setState
  - Lifecycle methods (for class components)
- Virtual DOM & Reconciliation

### ⚙️ Component Architecture
- Container vs Presentational components
- Lifting state up
- Controlled vs Uncontrolled components
- Composition vs Inheritance

### 🎣 React Hooks
- useState, useEffect
- useContext, useReducer
- useMemo, useCallback
- Custom hooks

### 📦 State Management
- Context API
- Redux Toolkit (RTK)
  - Slices, Store, Middleware
- Zustand / Recoil (optional modern alternatives)

### 🧰 Routing & Navigation
- React Router (v6+)
  - BrowserRouter, Routes, Route, Link
  - Nested routes
  - useNavigate, useParams

### 🌐 Data Fetching
- Fetch API / Axios
- useEffect-based fetching
- React Query / SWR (caching, revalidation)

### 🎨 Styling in React
- CSS Modules / SCSS
- Styled-components / Emotion
- Tailwind CSS
- Component-level styling best practices

### 🧪 Testing
- Unit testing with Jest
- React Testing Library
- Mocking APIs and user interaction

### ⚙️ Performance Optimization
- Memoization with `React.memo`, `useMemo`, `useCallback`
- Lazy loading with `React.lazy` and `Suspense`
- Code splitting with dynamic imports

### 🔧 Advanced Patterns
- Render props
- Higher-order components (HOC)
- Compound components
- Error boundaries
- Portals

### 📦 Build Tools & Ecosystem
- Vite / Webpack / CRA (Create React App)
- Babel and JSX transpilation
- ESLint + Prettier setup
- Environment variables (.env)

### 🚀 Deployment & CI/CD
- Static hosting: Netlify, Vercel, GitHub Pages
- Dockerizing a React app (optional)
- GitHub Actions for CI/CD pipelines

📚 Resource:
- https://github.com/nccasia/ncc-react-basic
- https://github.com/nccasia/thinking-in-react

---

## 9. 🚀 Frameworks

### Express.js
- Routing, middleware
- Error handling
- Logging (morgan, winston)

### TypeORM
- Entities, Repositories
- Migrations
- QueryBuilder

### DTOs & Validation
- Data Transfer Objects
- Class-validator / Zod / Yup

### Redis Integration
- For caching
- Pub/Sub (optional)

---

## 10. 🏗️ Architecture (optional)

- Monolithic vs Microservices
- Monorepos
- Serverless (AWS Lambda, Vercel, etc.)
- API Gateway

---

## 11. 💡 Demo Projects

### Fullstack API Project
- Techs: TypeScript + Node.js + Express + TypeORM + Redis
- Features:
  - DTO + validation
  - Authentication (JWT)
  - Caching (Redis)
  - Rate Limiting
  - Realtime
  - Testing

### Image Proxy Server
- Upload image from client using `FormData`
- Handle buffer/base64
- Resize or transform with Worker Thread
- Cache API responses (in-memory, not Redis)
- Return processed image

---

## 🔗 Reference Materials

- Best practices
  https://github.com/goldbergyoni/nodebestpractices
  
- JS Event Loop:  
  https://www.youtube.com/watch?v=0SJE9dYdpps  
  https://www.youtube.com/watch?v=84QFDnZx7T4  
  https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick  

- NodeJS & Workers:  
  https://betterstack.com/community/guides/scaling-nodejs/nodejs-workers-explained/  

- SQL:  
  https://use-the-index-luke.com/  
  https://www.geeksforgeeks.org/sql-exercises/  
  https://leetcode.com/studyplan/top-sql-50/  
  https://www.thoughtspot.com/data-trends/data-modeling/optimizing-sql-queries  
