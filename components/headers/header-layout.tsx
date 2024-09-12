interface Props {
  className?: string;
}

export default function HeaderLayout({ children, className = '' }) {
  return (
    <header
      className={`border-var-gray-150 fixed flex h-20 w-full items-center border-b bg-white ${className}`}
    >
      {children}
    </header>
  );
}
