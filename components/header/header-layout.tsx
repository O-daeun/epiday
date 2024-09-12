interface Props {
  className?: string;
}

export default function HeaderLayout({ children, className = '' }) {
  return (
    <header className={`border-var-gray-150 flex h-20 items-center border-b ${className}`}>
      {children}
    </header>
  );
}
