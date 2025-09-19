export default function ProjectsPage() {
    const projects = [
      { title: "Portfolio Website", desc: "Built with Next.js & TailwindCSS", link: "#" },
      { title: "Todo App", desc: "Fullstack app with Node.js backend", link: "#" },
    ];
  
    return (
      <section className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="p-4 rounded-xl shadow hover:shadow-lg transition bg-white">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600">{project.desc}</p>
              <a href={project.link} className="text-blue-500 mt-2 inline-block">View →</a>
            </div>
          ))}
        </div>
      </section>
    );
  }
  