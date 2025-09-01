import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <ContinueWithGoogleButton />
      </CardContent>
    </Card>
  );
}
