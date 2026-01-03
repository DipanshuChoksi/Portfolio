function HeroSection() {
  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Hero section</h2>
      <form action="/hello" method="post" className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name..."
            className="p-2"
          />
        </div>
        <div>
          <input
            type="text"
            name="profession"
            placeholder="Enter your profession..."
            className="p-2"
          />
        </div>
        <div>
          <input
            type="text"
            name="intro_summary"
            placeholder="Enter your introduction summary..."
            className="p-2"
          />
        </div>
      </form>
    </div>
  );
}

export default HeroSection;
