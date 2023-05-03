import { GoogleButton } from "@/components/public/GoogleButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu } from "lucide-react";

export default async function AuthenticationPage() {
  return (
    <div className="p-4">
      <Card className="p-4 max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold space-x-2 flex items-center justify-center">
            <Cpu /> <span>the-fullstack-app</span>
          </CardTitle>
          <CardDescription>
            Click on the button below to log in using your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}
