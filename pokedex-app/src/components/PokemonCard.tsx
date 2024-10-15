import React from "react";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
  color: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  imageUrl,
  color,
}) => {
  const navigate = useNavigate();
  const [textColor, setTextColor] = React.useState<string>("white");

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  React.useEffect(() => {
    if (color === "#F5F5F5") {
      // 배경이 흰색일 때(노말 타입) 폰트 색상을 검정색으로 변경
      setTextColor("black");
    } else {
      setTextColor("white");
    }
  }, [color]);

  return (
    <div
      className="pokemon-card"
      onClick={handleClick}
      style={{ ...styles.card }}
    >
      <img src={imageUrl} alt={name} style={styles.image} />
      <div
        style={{ ...styles.textBox, backgroundColor: color, color: textColor }}
      >
        <span>{name.toUpperCase()}</span>{" "}
        <span style={styles.id}>#{id.toString().padStart(3, "0")}</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  card: {
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  image: {
    width: "200px",
    height: "200px",
  },
  textBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
  },
  id: {
    marginLeft: "10px",
    fontWeight: "bold",
  },
};

export default PokemonCard;
