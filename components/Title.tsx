export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-3xl md:text-4xl text-center md:text-start font-bold">
      {children}
    </p>
  );
}
