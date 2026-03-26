const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-gradient font-semibold">Thamsanqa Ndelu</span>. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/Ndelu-Blose" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/thamsanqa-ndelu" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
