import { Skeleton } from '@/Components/ui/skeleton';
import { Spinner } from '@/Components/ui/spinner';

function SidebarSkeleton() {
  return (
    <div className="flex h-screen w-64 flex-col gap-4 border-r bg-sidebar p-4 max-md:hidden">
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex flex-col gap-1 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3.5 w-28" style={{ width: `${50 + Math.random() * 40}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Skeleton className="h-5 w-5 rounded" />
      <Skeleton className="h-4 w-px" />
      <Skeleton className="h-4 w-20" />
      <div className="flex-1" />
      <Skeleton className="h-8 w-20 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

function CardsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>
      <div className="space-y-3">
        <div className="flex gap-4 pb-2 border-b">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3.5 flex-1" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-3.5 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3.5 w-64" />
      </div>
      <div className="rounded-xl border p-6 space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function GuestSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
          <Skeleton className="mx-auto h-5 w-40" />
          <Skeleton className="mx-auto h-3.5 w-56" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

function FrontendSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground animate-pulse">Cargando...</p>
      </div>
    </div>
  );
}

export default function PageLoader({ variant = 'authenticated' }) {
  if (variant === 'guest') {
    return <GuestSkeleton />;
  }

  if (variant === 'frontend') {
    return <FrontendSkeleton />;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarSkeleton />
      <div className="flex flex-1 flex-col">
        <HeaderSkeleton />
        <main className="flex-1 p-4 lg:p-8 space-y-6 bg-background">
          <CardsGridSkeleton />
          <TableSkeleton />
        </main>
      </div>
    </div>
  );
}

export { CardsGridSkeleton, TableSkeleton, FormSkeleton, HeaderSkeleton };
