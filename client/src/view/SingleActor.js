import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './SingleActor.css'
const SingleActor = () => {
    const params = useParams();
    const [actor, setActor] = useState({});
    const actorview = async () => {
      const test1 = await fetch(
        `http://127.0.0.1:8000/api/actors/${params.actorid}`
      );
      const test2 = await test1.json();
      setActor(test2);
    };
    useEffect(() => {
        actorview();
    }, []);
  return (
    <div className='icantsee'>
        <div className='dropittotheside'>
        <img width={400} height={225} src={actor.picture} alt=''/>
        {/* <span>{actor.name.first_name} {actor.name.last}</span> */}
        <span>{actor.biography}</span>
        </div>
    </div>
  )
}

export default SingleActor