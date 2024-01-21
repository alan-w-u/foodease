import { useState, useEffect } from "react"
import { getImageFor } from "../pexels"

function Cuisine(props) {
  const [image, setImage] = useState("");
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
    <div 
      style={{ borderRadius: "1rem", textShadow: "2px 2px 1px rgba(0,0,0,0.9)",  padding: "4rem 0", color: "white", backgroundSize: "cover", backgroundColor: "grey", backgroundImage: "url(\"" + image +"\")" }}
      onClick={() => {
        document.getElementById('restaurant').scrollIntoView();
        props.callback(props.cuisine, props.dish);
      }}
    >
      <h3>{props.cuisine}</h3>
      <p>{props.dish}</p>
    </div>
  )
}

export default Cuisine