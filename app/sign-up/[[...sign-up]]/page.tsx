import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign up — AJ Digital Dashboard" };

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <main className="flex items-center justify-center py-24 px-4 text-tx2">
        Authentication is not configured yet.
      </main>
    );
  }
  return (
    <main className="flex items-center justify-center py-16 px-4">
      <SignUp />
    </main>
  );
}
