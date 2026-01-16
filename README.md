# Cal Clone 🗓️

A powerful and open-source scheduling platform clone, built with modern web technologies. Streamline your meeting coordination with ease.

## 🚀 Features

-   **Seamless Booking**: Easy-to-use interface for scheduling meetings.
-   **Custom Event Types**: Create various meeting types (e.g., 15 min, 30 min) with custom durations and descriptions.
-   **Availability Management**: Define your working hours and availability.
-   **Real-time Database**: Powered by Supabase/PostgreSQL for reliable data persistence.
-   **Responsive Design**: Optimized for all devices using Tailwind CSS.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
-   **ORM**: [Prisma](https://www.prisma.io/)

## 🏁 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   A [Supabase](https://supabase.com/) account (or any PostgreSQL database)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/upasanatharu/cal.git
    cd cal_clone-main
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**

    Create a `.env` file in the root directory and add your database connection strings:

    ```env
    # Connect to Supabase via connection pooling
    DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true"

    # Direct connection to the database (Required for migrations)
    DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-region.pooler.supabase.com:5432/postgres"
    ```

4.  **Database Setup:**

    Push the schema to your database and seed it with initial data (creates default user and events).

    ```bash
    # Push schema
    npx prisma db push

    # Seed database
    npx prisma db seed
    ```

    > **Note:** The seed script creates a default user `upasana` with email `admin@cal.com`.

5.  **Run the Application:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `DATABASE_URL` and `DIRECT_URL` environment variables in the Vercel dashboard.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
