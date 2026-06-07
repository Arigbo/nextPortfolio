import { redirect } from "next/navigation";

export default function CommunityRedirect() {
  redirect("/about#community");
  return null;
}

