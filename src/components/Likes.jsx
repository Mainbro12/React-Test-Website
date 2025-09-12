import { useState } from "react";

function Likes() {
  const [likes, setLikes] = useState(0);
  const handleLike = () => {
    setLikes(likes + 1);
  };

  return <button onClick={handleLike}>Лайків: {likes}</button>;
}
export default Likes;
