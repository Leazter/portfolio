"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Icon } from "@iconify/react";

type DialogAboutMeProps = {
  initialDescription: string;
  onUpdated?: () => void;
};

export default function DialogAboutMe({
  initialDescription,
  onUpdated,
}: DialogAboutMeProps) {
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("about_me")
      .update({ description })
      .eq("id", 1) // assume only one row with id=1
      .select(); // returns updated row
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      onUpdated?.();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm font-bold bg-linear-to-r from-primary-500 to-secondary-300">
          <Icon icon="lucide:pen-line" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit About Me</DialogTitle>
          <DialogDescription>
            Modify your About Me text and save below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
