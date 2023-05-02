import { ProjectEditForm } from "@/components/ProjectEditForm";
import { getApiUrl } from "@/lib/get-api-url";
import { Project } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectShowPage({
  params: { id },
}: IndexPageProps) {
  const response = await fetch(getApiUrl(`api/projects/${id}`), {
    method: "GET",
    cache: "no-store",
  });
  const project: Project = await response.json();

  if (!project) {
    return <div className="p-4">Project not found</div>;
  }

  return (
    <div className="p-4 gap-4 container mx-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
        <ProjectEditForm project={project} />
      </div>
      <div className="w-full lg:w-1/2">
        <Tabs defaultValue="forums">
          <TabsList>
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
          <TabsContent value="forums">
            <Card>
              <CardHeader>
                <CardTitle>Forum Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <CardTitle>Blog Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}