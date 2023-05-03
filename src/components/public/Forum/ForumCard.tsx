import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Forum } from "@prisma/client";
import Link from "next/link";

interface ForumCardProps {
  forum: Forum;
}

export const ForumCard = ({ forum }: ForumCardProps) => {
  return (
    <Link href={`/forums/${forum.id}`} className="block">
      <Card>
        <CardHeader>
          <CardTitle>{forum.title}</CardTitle>
          <CardDescription>{forum.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
