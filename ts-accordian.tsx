//App.tsx
import React, { useState } from "react";
import "./styles.css";

interface IAccordionItem {
  question: string;
  answer: string;
  onClick: () => void;
  isOpen: boolean;
}

// interface IuseAccordionInput {
//   initialIndex: number;
// }

interface IuseAccordionOutput {
  curQuestion: number;
  handleClick: (index: number) => void;
}

interface IAccordionItems {
  question: string;
  answer: string;
}

const useAccordion = (initialIndex: number): IuseAccordionOutput => {
  const [curQuestion, setCurQuestion] = useState(initialIndex);
  const handleClick = (index: number) => {
    setCurQuestion(index + 1);
  };
  return { curQuestion, handleClick };
};

const AccordianItem: React.FC<IAccordionItem> = ({
  question,
  answer,
  onClick,
  isOpen,
}) => {
  return (
    <div className="accordion-item">
      <span className="question" onClick={onClick}>
        {question}
      </span>
      {isOpen && <p className="answer">{answer}</p>}
    </div>
  );
};

const Accordian: React.FC<{ items: IAccordionItems[] }> = ({ items }) => {
  const { curQuestion, handleClick } = useAccordion(0);
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordianItem
          key={index}
          question={item.question}
          answer={item.answer}
          onClick={() => handleClick(index)}
          isOpen={index + 1 === curQuestion}
        />
      ))}
    </div>
  );
};

const items: IAccordionItems[] = [
  { question: "Question 1", answer: "Answer 1" },
  { question: "Question 2", answer: "Answer 2" },
  { question: "Question 3", answer: "Answer 3" },
  { question: "Question 4", answer: "Answer 4" },
];

const App: React.FC = () => {
  return (
    <div className="accordion">
      <h1>Accordion</h1>
      <Accordian items={items} />
    </div>
  );
};

export default App;

//styles.css
.App {
  font-family: sans-serif;
  text-align: center;
}

.accordian {
  border: 1px solid lightgray;
  padding: 10px;
  margin: 10px;
}

.accordian-item {
  border: 1px solid black;
  background-color: lightgray;
  display: flex;
  flex-direction: column; /* Stack question and answer vertically */
}

.question {
  margin-top: 10px;
  margin-bottom: 0;
  padding: 1px;
}

.answer {
  margin-top: 0;
  padding: 10px;
  height: 0;
  transition: height 0.3s;
}

