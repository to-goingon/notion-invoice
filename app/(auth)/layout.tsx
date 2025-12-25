export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/50 flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Next.js Starter</h1>
        <p className="text-muted-foreground mt-2 text-sm">Welcome to your authentication portal</p>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
