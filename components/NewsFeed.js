import { useEffect } from 'react';

export default function NewsFeed() {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div
      className="w-full max-w-lg my-4 flex flex-col items-center justify-center rounded-mac overflow-hidden shadow-lg border-2"
      style={{
        background: "#ededed", // cinza claro
        borderColor: "#CBA135", // dourado escuro
        borderStyle: "solid"
      }}
    >
      {/* Links lado a lado */}
      <div className="w-full flex items-center justify-center gap-6 py-2 bg-transparent">
        {/* X/Twitter */}
        <a
          href="https://x.com/furia?lang=en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline"
        >
          <img
            src="/x-logo.png"
            alt="Logo X"
            width={28}
            height={28}
            style={{ marginRight: 6 }}
          />
          <span className="text-gray-700 font-semibold text-sm">
            Acompanhe @FURIA
          </span>
        </a>
        {/* Instagram */}
        <a
          href="https://instagram.com/furiagg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline"
        >
          <img
            src="/instagram.png"
            alt="Instagram"
            width={28}
            height={28}
            style={{ marginRight: 6 }}
          />
          <span className="text-gray-700 font-semibold text-sm">
            Siga no Instagram
          </span>
        </a>
      </div>

    </div>
  );
}
