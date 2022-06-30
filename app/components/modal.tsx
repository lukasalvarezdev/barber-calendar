function Modal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-black/70 py-8">
      <div
        className={`card container overscroll-y-contain overflow-y-auto relative max-w-sm max-h-[calc(100vh-4rem)] ${
          className ?? ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export { Modal };
