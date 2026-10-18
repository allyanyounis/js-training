
function LoadingSkeleton() {
  return (
    <div className="recipe-grid">

      {Array.from({ length: 6 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
