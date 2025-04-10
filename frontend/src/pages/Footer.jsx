export default function Footer() {
    return (
      <footer className="bg-[#0a0018] text-white py-6 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <a
              href="https://github.com/sanketsonkusare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3b3346] transition"
            >
              <i className="fa-brands fa-github text-2xl"></i>
            </a>
            <a
              href="https://www.facebook.com/sassysanket"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3b3346] transition"
            >
              <i className="fa-brands fa-square-facebook text-2xl"></i>
            </a>
            <a
              href="https://www.instagram.com/sassysanket/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3b3346] transition"
            >
              <i className="fa-brands fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/sanketsonkusare/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3b3346] transition"
            >
              <i className="fa-brands fa-linkedin text-2xl"></i>
            </a>
          </div>
  
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
                <span>&copy; Made by Sanket</span>
                <a href="/privacy" className="hover:text-[#3b3346] transition">
                    Privacy
                </a>
                <a href="/terms" className="hover:text-[#3b3346] transition">
                    Terms
                </a>
            </div>
        </div>
      </footer>
    );
  }