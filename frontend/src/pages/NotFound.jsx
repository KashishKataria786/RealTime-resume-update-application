
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
