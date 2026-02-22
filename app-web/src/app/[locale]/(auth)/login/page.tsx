import { Suspense } from "react";
import LoginForm from "./_components/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-emerald-100">
      {/* Large SVG logo as background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="/greencircle-vector.svg"
          alt=""
          className="h-[min(80vw,70vh)] w-auto opacity-[0.08]"
          aria-hidden
        />
      </div>
      <div className="relative z-10 w-full">
        <Suspense fallback={<p className="text-center text-emerald-700">Loading...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
