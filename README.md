# Cal Clone 🗓️

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

<br />

**A powerful, open-source scheduling infrastructure for everyone.**
<br />
Seamlessly manage availability, bookings, and event types with a modern, high-performance interface.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Deployment](#-deployment)

</div>

---

## 🚀 Features

This project serves as a robust foundation for scheduling applications, cloning core functionalities of popular tools like Calendly.

-   **📅 seamless Booking System**: Intuitive interface for users to book appointments.
-   **🎨 Custom Event Types**: Flexible configuration for meeting durations (15m, 30m, etc.) and descriptions.
-   **⏱️ Availability Management**: sophisticated controls for setting weekly working hours.
-   **⚡ Real-time Performance**: Powered by Supabase and Prisma for instant data updates.
-   **📱 Responsive & Accessible**: Fully responsive UI built with Tailwind CSS, accessible on interactions.

## 🛠️ Tech Stack

Built with the latest web standards for performance and scalability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router for modern routing and SSR. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe code for better maintainability. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS for rapid UI development. |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Robust relational database. |
| **ORM** | [Prisma](https://www.prisma.io/) | Next-generation ORM for Node.js and TypeScript. |
| **Cloud** | [Supabase](https://supabase.com/) | Backend-as-a-Service for database hosting. |

## 📂 Project Structure

A quick look at the top-level directory structure.

```txt
cal-clone/
├── app/                  # Next.js App Router pages and layouts
│   ├── actions.ts        # Server Actions for mutations
│   ├── bookings/         # Booking management routes
│   └── [username]/       # Dynamic public profile pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions and shared logic
│   └── prisma.ts         # Prisma client instantiation
├── prisma/               # Database schema and seeds
│   ├── schema.prisma     # Data model definition
│   └── seed.ts           # Database seeding script
├── public/               # Static assets
└── ...
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
-   **Node.js** (v18+)
-   **npm** or **yarn** or **pnpm**
-   A **Supabase** project (or any PostgreSQL instance)

### 1. Clone the Repository

```bash
git clone https://github.com/upasanatharu/cal.git
cd cal_clone-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory. You can duplicate a `.env.example` if available, or use the template below:

```env
# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (Required for migrations)
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-region.pooler.supabase.com:5432/postgres"
```

### 4. Database Setup

Initialize your database schema and seed it with default data.

```bash
# Push schema to database
npx prisma db push

# Seed with initial data (creates default user 'upasana')
npx prisma db seed
```

### 5. Run the Application

Start the development server.

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 🚀 Deployment

### Vercel (Recommended)

1.  Push your code to [GitHub](https://github.com/).
2.  Import your project into [Vercel](https://vercel.com/).
3.  Add the `DATABASE_URL` and `DIRECT_URL` in the **Environment Variables** settings.
4.  Click **Deploy**.

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
