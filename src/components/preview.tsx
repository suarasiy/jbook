import './preview.css';
import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head>
      <style>
        html { background-color: white }
        span.error-runtime {
          display: block;
          margin: .3rem .15rem;
          color: red;
          font-weight: bold;
        }
        .error {
          font-family: consolas;
          display: block;
          width: fit-content;
          position: relative;
          background-color: rgba(255, 0, 0, 0.23);
          padding: 11px 13px;
          overflow: hidden;
          border-radius: 2px;
        }
        .error::before {
          position: absolute;
          content: '';
          background-color: red;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
        }
        .error span {
          color: red;
          margin: .15rem .15rem 0;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div class="error">' + '<span class="error-runtime">' + 'Runtime Error' + '</span>' + '<span>' + err + '</span>' + '</div>';
          throw err;
        }

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        })

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false)
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && (
        <div className="error">
          <span className="error-runtime">Error Runtime</span>
          <span>{err}</span>
        </div>
      )}
    </div>
  );
};

export default Preview;
