//App.tsx
import React, { useState } from "react";
import "./styles.css";

interface StarComponentProps {}

const StarComponent: React.FC<StarComponentProps> = () => {
  const [currentStarClicked, setCurrentStarCicked] = useState<number>(0);
  const handleClick = (currentStar: number) => {
    setCurrentStarCicked(currentStar);
  };
  return (
    <div className="stars">
      <h1>Star Component</h1>
      {[1, 2, 3, 4, 5].map((currentStar) => {
        return (
          <span
            className={
              currentStar <= currentStarClicked ? "star filled" : "star"
            }
            onClick={() => handleClick(currentStar)}
          >
            S
          </span>
        );
      })}
    </div>
  );
};

interface AppProps {}
const App: React.FC<AppProps> = () => {
  return (
    <div>
      <StarComponent />
    </div>
  );
};

export default App;


//style.css
.stars {
  font-size: 24px;
}

.star {
  cursor: pointer;
  margin-right: 5px;
}
.filled {
  color: gold;
}
