import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Login - Future Ready Youth",
  description: "Secure login portal for Future Ready Youth administrators.",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/admin");
  }

  return <LoginClient />;
}
