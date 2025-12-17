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

type DialogServicesProps = {
  serviceId: string | number;
  initialTitle: string;
  initialDescription: string;
  onUpdated?: () => void;
};

export default function DialogServices({
  serviceId,
  initialTitle,
  initialDescription,
  onUpdated,
}: DialogServicesProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("services")
      .update({ title, description })
      .eq("id", serviceId)
      .select();

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      onUpdated?.();
    }
  }

  return (
    <Dialog>
      {/* Trigger Button Outside of the Form */}
      <DialogTrigger asChild>
        <Button className="text-sm font-bold bg-linear-to-r from-primary-500 to-secondary-300">
          <Icon icon="lucide:pen-line" />
        </Button>
      </DialogTrigger>

      {/* DialogContent Contains the Form */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

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

