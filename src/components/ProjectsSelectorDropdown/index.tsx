"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/tailwind-utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project } from "@prisma/client";
import { notFound, useRouter } from "next/navigation";

interface ProjectsSelectorDropdownProps {
  projects: Project[];
}

export const ProjectsSelectorDropdown = ({
  projects,
}: ProjectsSelectorDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  if (!projects.length) {
    return notFound();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] lg:w-full justify-between"
        >
          {value
            ? projects.find(
                (project) =>
                  `${project.title.toLowerCase()}:${String(project.id)}` ===
                  value
              )?.title
            : "Select project"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {projects.map((project) => {
              return (
                <CommandItem
                  key={project.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue);

                    router.push(`/projects/${project.id}`);
                  }}
                  value={`${project.title.toLowerCase()}:${String(project.id)}`}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value ===
                        `${project.title.toLowerCase()}:${String(project.id)}`
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {project.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
