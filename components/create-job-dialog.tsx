"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result.error) {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
      } else {
        console.error("failed to create job:", result.error);
      }
    } catch (error) {}
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className="flex items-center gap-2
            rounded-lg border border-gray-300
            bg-white px-4 py-2
            text-sm font-medium
            shadow-sm
            transition-all duration-200
            hover:bg-gray-100 hover:shadow-md
            active:scale-[0.98]
            cursor-pointer"
        >
          <Plus />
          Add Job
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  value={formData.company}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  value={formData.position}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location </Label>
                <Input
                  id="location"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  value={formData.location}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary </Label>
                <Input
                  id="salary"
                  placeholder="e.g., $100k - $150k"
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  value={formData.salary}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job URL </Label>
              <Input
                id="jobUrl"
                placeholder="https://..."
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
                value={formData.jobUrl}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated) </Label>
              <Input
                id="tags"
                placeholder="React, Tailwind, High Pay"
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                value={formData.tags}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description </Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Brief description of the role..."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes </Label>
              <Textarea
                id="notes"
                rows={4}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                value={formData.notes}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
