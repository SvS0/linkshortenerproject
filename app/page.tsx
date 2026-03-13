import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, BarChart3, LayoutDashboard, Zap, Shield, Globe } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 gap-8 px-6 py-24 text-center">
        <Badge variant="secondary" className="mb-2">
          Free to use · No credit card required
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl max-w-2xl">
          Shorten, Share {'&'} Track Your Links
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl">
          Create short, memorable links in seconds. Monitor clicks and manage
          all your URLs from one simple dashboard.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2">
              <Zap className="size-4" />
              Get Started for Free
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-20 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Everything you need to manage links
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful features packed into a simple, easy-to-use interface.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Link2 className="size-8 text-primary mb-2" />
                <CardTitle>Instant Link Shortening</CardTitle>
                <CardDescription>
                  Paste any long URL and get a clean, short link in one click.
                  Perfect for social media, emails, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="size-8 text-primary mb-2" />
                <CardTitle>Click Analytics</CardTitle>
                <CardDescription>
                  Track how many times each link has been clicked. Understand
                  your audience and measure performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <LayoutDashboard className="size-8 text-primary mb-2" />
                <CardTitle>Unified Dashboard</CardTitle>
                <CardDescription>
                  Manage all your shortened links from one place. Edit,
                  delete, or copy links with ease.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="size-8 text-primary mb-2" />
                <CardTitle>Lightning Fast Redirects</CardTitle>
                <CardDescription>
                  Our infrastructure ensures your links resolve instantly so
                  your visitors never wait.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="size-8 text-primary mb-2" />
                <CardTitle>Secure {'&'} Reliable</CardTitle>
                <CardDescription>
                  Your links are protected and always available. Built on
                  enterprise-grade infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="size-8 text-primary mb-2" />
                <CardTitle>Share Anywhere</CardTitle>
                <CardDescription>
                  Your short links work everywhere — social media, SMS,
                  newsletters, and printed materials.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6 items-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join today and start managing your links smarter.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="gap-2">
              <Zap className="size-4" />
              Create Your Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Link Shortener. All rights reserved.
      </footer>
    </div>
  );
}
