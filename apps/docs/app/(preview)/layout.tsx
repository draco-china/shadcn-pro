export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background">
      {children}
    </div>
  )
}
