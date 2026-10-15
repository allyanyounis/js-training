// Concept used:
// Reusable Component
// Props

function Rating({ value }) {

  const stars = Array(5).fill("⭐");
  return (
    <p>

      {
        stars.map((star) => (
          star
        ))
      }

      {value}

    </p>
  );

}

export default Rating;