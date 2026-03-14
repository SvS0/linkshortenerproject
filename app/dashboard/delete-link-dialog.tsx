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
import { deleteLink } from "./actions";

interface DeleteLinkDialogProps {
  linkId: number;
  shortCode: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLinkDialog({
  linkId,
  shortCode,
  open,
  onOpenChange,
}: DeleteLinkDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    const result = await deleteLink(linkId);

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the link /{shortCode}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-sm text-destructive py-2">{error}</div>}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
