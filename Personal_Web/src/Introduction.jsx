import { useEffect, useState } from "react";
import "./css/intro.css";

const user = {
  imageUrl: "src\\assets\\83618c4992033c7b58752bd77dbe8ce8.png",
};

let textArray = ["Hello, I'm Erik Tierendi !", "I'm a Full-Stack Web Developer!", "Welcome to my Portfolio Website!", "Feel free to explore my projects!", "I'm passionate about coding!"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;


function Introduction() {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
    let timeout;

    if (!isDeleting && charIndex < textArray[index].length) {
      // typing
      timeout = setTimeout(() => {
        setText(text + textArray[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, typingDelay);
    } else if (isDeleting && charIndex > 0) {
      // erasing
      timeout = setTimeout(() => {
        setText(textArray[index].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, erasingDelay);
    } else if (!isDeleting && charIndex === textArray[index].length) {
      // pause before erasing
      timeout = setTimeout(() => setIsDeleting(true), newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      // move to next word
      setIsDeleting(false);
      setIndex((index + 1) % textArray.length);
    }

    return () => clearTimeout(timeout);
  }, [text, charIndex, isDeleting, index]);

    return (
    <div id="back_intro">
        <div className="intro">
            <div className="wrapper">
              <div className="text">{text}
                <span className={`cursor ${(!isDeleting && charIndex === textArray[index].length) ? 'blink' : ''}`}>_</span> </div>
              <div className="LearnMore"><a href="#">Learn More</a></div>
            </div>

            <img src={user.imageUrl} className="IMG"></img>
            
        </div>
    </div>
    )
}

export default Introduction;