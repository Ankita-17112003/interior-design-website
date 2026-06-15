import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Floating shapes */}
        <div style={styles.shape1} />
        <div style={styles.shape2} />
        
        {/* Content */}
        <div style={styles.content}>
          <div style={styles.badge}>404</div>
          
          <h1 style={styles.title}>
            Oops!
          </h1>
          
          <p style={styles.message}>
            We couldn't find the page you're looking for.
          </p>
          
          <Link to="/" style={styles.button}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={styles.buttonIcon}>
              <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.99996 3.33333L3.33329 8L7.99996 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
    fontFamily: "'Inter', -apple-system, 'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    position: "relative",
    maxWidth: "460px",
    width: "100%",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  shape1: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "120px",
    height: "120px",
    background: "#f0f0f0",
    borderRadius: "50%",
    zIndex: 0,
  },
  shape2: {
    position: "absolute",
    bottom: "-40px",
    left: "-40px",
    width: "100px",
    height: "100px",
    background: "#f5f5f5",
    borderRadius: "50%",
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "48px 32px",
  },
  badge: {
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 600,
    color: "#a0a0a0",
    letterSpacing: "2px",
    marginBottom: "24px",
  },
  title: {
    fontSize: "clamp(28px, 6vw, 36px)",
    fontWeight: 600,
    color: "#1a1a1a",
    margin: 0,
    marginBottom: "12px",
    letterSpacing: "-0.02em",
  },
  message: {
    fontSize: "15px",
    color: "#666666",
    lineHeight: 1.6,
    marginBottom: "36px",
    maxWidth: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 28px",
    background: "#1a1a1a",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: 500,
    fontSize: "14px",
    transition: "all 0.25s ease",
    border: "none",
    cursor: "pointer",
  },
  buttonIcon: {
    transition: "transform 0.25s ease",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  ${styles.button}:hover {
    background: "#2a2a2a";
    transform: "translateY(-2px)";
    box-shadow: "0 8px 20px rgba(0, 0, 0, 0.12)";
  }
  
  ${styles.button}:hover svg {
    transform: "translateX(-3px)";
  }
`;

if (!document.querySelector("#not-found-card")) {
  styleSheet.id = "not-found-card";
  document.head.appendChild(styleSheet);
}

export default NotFound;