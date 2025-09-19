export default function ContactPage() {
    return (
      <section className="max-w-xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Feel free to reach out if you want to collaborate or just say hi 👋
        </p>
        <a href="mailto:youremail@example.com" className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">
          Say Hello
        </a>
      </section>
    );
  }
  