"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLink } from "./actions";
import type { Link } from "@/db/schema";

interface EditLinkDialogProps {
  link: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditLinkDialog({
  link,
  open,
  onOpenChange,
}: EditLinkDialogProps) {
  const [url, setUrl] = useState(link.originalUrl);
  const [shortCode, setShortCode] = useState(link.shortCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if nothing changed - close dialog without making a server request
    if (url === link.originalUrl && shortCode === link.shortCode) {
      onOpenChange(false);
      return;
    }

    setLoading(true);

    const result = await updateLink({
      id: link.id,
      originalUrl: url,
      shortCode,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      // Success - close dialog
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the URL or short code for this link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-url">Original URL</Label>
              <Input
                id="edit-url"
                type="url"
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-shortCode">Short Code</Label>
              <Input
                id="edit-shortCode"
                type="text"
                placeholder="my-link"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                pattern="[a-zA-Z0-9-_]+"
                minLength={3}
                maxLength={10}
                required
              />
              <p className="text-sm text-muted-foreground">
                3-10 characters, letters, numbers, hyphens, and underscores only
              </p>
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
