import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import { CreateLinkDialog } from "./create-link-dialog";
import { LinkItem } from "./link-item";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getUserLinks(userId);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your shortened links
            </p>
          </div>
          <CreateLinkDialog />
        </div>

        {links.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No links yet. Create your first shortened link!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
