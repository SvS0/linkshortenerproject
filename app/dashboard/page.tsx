import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();

  console.log(userId);
  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
    </div>
  );
}
