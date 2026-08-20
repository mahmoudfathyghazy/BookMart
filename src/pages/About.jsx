function About() {
  return (
    <div className="container py-5" style={{ maxWidth: "720px" }}>
      <h1 className="h3 mb-4">About BookMart</h1>

      <h2 className="h5">What is BookMart?</h2>
      <p>
        BookMart is a simple online marketplace for school supplies and a
        small selection of electronics, built to make back-to-school shopping
        easier for students.
      </p>

      <h2 className="h5">What can users buy?</h2>
      <p>
        Notebooks, stationery, calculators, bags, and a handful of everyday
        electronics and accessories — everything you'd need on a typical
        school supply list.
      </p>

      <h2 className="h5">Why did we build it?</h2>
      <p>
        BookMart was developed as a university React project, focused on
        practicing component-based UI design, routing, and state management
        in a real-world style application.
      </p>

      <h2 className="h5">Technologies used</h2>
      <ul>
        <li>React 19 + Vite</li>
        <li>React Router</li>
        <li>Bootstrap 5</li>
        <li>json-server (mock API)</li>
      </ul>
    </div>
  );
}

export default About;
