//App.tsx
import React, { useState } from "react";
import "./styles.css";

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
interface InputWordProps {
  word: string;
  handleChange: ChangeEventHandler;
}
interface SearchWordProps {
  searchedWords: string[];
}
interface WordSearchHook {
  word: string;
  handleChange: ChangeEventHandler;
  searchedWords: string[];
}
const wordDatabase = ["apple", "mango", "watermelon", "pineapple", "orange"];

const useWordSearch = (): WordSearchHook => {
  const [word, setWord] = useState<string>("");
  const [searchedWords, setSearchedWords] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent) => {
    if (e.target.value.trim() === "") {
      setSearchedWords([]);
      setWord("");
      return;
    }
    setWord(e.target.value.trim());

    const matchingWords: string[] = wordDatabase.filter((dictWord: string) =>
      dictWord.includes(word)
    );
    setSearchedWords(matchingWords);
  };

  return { word, handleChange, searchedWords };
};

const InputWord: React.FC<InputWordProps> = ({ word, handleChange }) => {
  return (
    <input
      type="text"
      value={word}
      placeholder="Enter search word"
      onChange={handleChange}
    />
  );
};

const SearchedWords: React.FC<SearchWordProps> = ({ searchedWords }) => {
  return (
    searchedWords && (
      <ol>
        {searchedWords.map((mword, index) => {
          return <li key={index}>{mword}</li>;
        })}
      </ol>
    )
  );
};

const App = () => {
  const { word, handleChange, searchedWords } = useWordSearch();
  return (
    <div className="App">
      <InputWord word={word} handleChange={handleChange} />
      <SearchedWords searchedWords={searchedWords} />
    </div>
  );
};

export default App;
