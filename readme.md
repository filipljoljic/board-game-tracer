# Ultimate Board Game Tracker

A Next.js application for tracking board game sessions, managing groups, and viewing leaderboards and statistics.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / yarn / pnpm

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repo-url>
    cd board-game-tracker
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Setup Database**
    Initialize the SQLite database and seed it with default data:

    ```bash
    npx prisma migrate dev
    npm run seed  # If you have a seed script configured, or use `npx prisma db seed`
    ```

4.  **Run the app**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

- **`app/`**: Next.js App Router pages and API routes.
- **`components/`**: Reusable React components (UI, Dialogs, Charts).
- **`prisma/`**: Database schema (`schema.prisma`) and SQLite file (`dev.db`).
- **`lib/`**: Utility functions and database client.

## ⚙️ Configuration

### Environment Variables (`.env`)

The application relies on a `.env` file in the root directory.

- **`DATABASE_URL`**: Connection string for the database. Defaults to `file:./dev.db` for local SQLite.

### Database

The project uses **SQLite** for simplicity.

- **Location**: `prisma/dev.db` (created after migration).
- **Management**: You can view and edit the database using Prisma Studio:
  ```bash
  npx prisma studio
  ```

## ✨ Features

- **Group Management**: Create groups, add/remove members.
- **Game Library**: Manage board games and custom scoring templates.
- **Session Tracking**: Record game sessions with detailed scoring.
- **Leaderboards**: View group standings based on league points.
- **Statistics**: Deep dive into player performance (Win Rate, Placement Distribution, Favorite Games).

## 📚 Documentation

For detailed technical documentation, architecture, and API reference, please see [DOCUMENTATION.md](./DOCUMENTATION.md).
