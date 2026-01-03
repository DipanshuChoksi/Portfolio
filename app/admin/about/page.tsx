function AboutSection() {
  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">About section</h2>
      <form action="/hello" method="post">
        <input type="text" name="name" placeholder="Enter your name..." />
        <input
          type="text"
          name="profession"
          placeholder="Enter your profession..."
        />
        <input type="text" name=""/>
      </form>
    </div>
  );
}

export default AboutSection;
