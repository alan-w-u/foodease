import "./Cuisine.css"
import { useState, useEffect } from "react"
import { getImageFor } from "../pexels"

function Cuisine(props) {
  const [image, setImage] = useState('');

  useEffect(() => {
    getImageFor(props.cuisine + "%20" + props.dish)
      .then((res) => {
        setImage(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="cuisine"
      style={{ backgroundImage: "url(\"" + image + "\")" }}
      onClick={() => {
        document.getElementById('restaurant').scrollIntoView();
        props.callback(props.cuisine, props.dish);
      }} >
      <h3>{props.cuisine}</h3>
      <p>{props.dish}</p>
    </div>
  )
}

export default Cuisine
