export default function Footer() {
  return (
    <footer className="w-full border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Mire Farms. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

