"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditLinkDialog } from "./edit-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";
import type { Link } from "@/db/schema";

interface LinkItemProps {
  link: Link;
}

export function LinkItem({ link }: LinkItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Card className="group transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg font-semibold">
                /{link.shortCode}
              </CardTitle>
              <CardDescription className="break-all">
                {link.originalUrl}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge variant="secondary">
                {link.clicks} {link.clicks === 1 ? "click" : "clicks"}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditOpen(true)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit link</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteOpen(true)}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete link</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Created {new Date(link.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <EditLinkDialog link={link} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteLinkDialog
        linkId={link.id}
        shortCode={link.shortCode}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
