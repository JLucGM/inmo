const HeaderSection = ({ title, description }) => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
        {title}
      </h1>
      <p className="mt-4 text-lg text-gray-400">
        {description}
      </p>
    </header>
  );
};

export default HeaderSection;
