import { useState, useEffect } from "react"
import { getImageFor } from "../pexels"

function Cuisine(props) {
  const [image, setImage] = useState("");
  useEffect(() => {
    getImageFor(props.cuisine + "%20" + props.dish).then((res) => {
      console.log(res);
      setImage(res);
    });
  }, []);
  return (
    <div style={{borderRadius: "1rem", textShadow: "2px 2px 1px rgba(0,0,0,0.9)",  padding: "4rem 0", color: "white", backgroundSize: "cover", backgroundColor: "white", backgroundImage: "url(\"" + image +"\")"}}>
      <h3>{props.cuisine}</h3>
      <p>{props.dish}</p>
    </div>
  )
}

export default Cuisine