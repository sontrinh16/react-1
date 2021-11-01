import React, { useEffect, useState } from "react";
import axios from "axios";
import ListMessage from "./ListMessage";

const URL = "https://60dff0ba6b689e001788c858.mockapi.io/heroes";

const ListHeroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [select, setSelect] = useState({
        id: -1,
        name: ""
    })
    const [messages, setMessages] = useState([]);

    const handleChange = (event) => {
        const filterArray = [...heroes.filter(x => x.id !== select.id), {
            id: select.id,
            name: event.target.value
        }];
        filterArray.sort((x,y) => x.id - y.id);
        setHeroes(filterArray);

    }

    const clearMessages = () => {
        setMessages([]);
    }

    useEffect(()=>{
        axios.get(URL).then((result) => {
            setHeroes(result.data)
        })
    }, [])
    return (
        <div>
            <h1>Tour of Heroes</h1>
            <h4>My heroes</h4>
            <div>
                <ul style={{listStyleType: "none"}}>
                    {heroes.map(hero => 
                    <li sty key={hero.id}>
                        <button onClick={()=>{
                            setSelect(hero);
                            setMessages([...messages, hero.id]);
                        }}>
                            <p>{hero.id} | {hero.name}</p>
                        </button>
                    </li>
                    )}
                </ul>
                <div>
                    <p>
                        {select.name.toUpperCase()} DETAILS 
                    </p>
                    <p>
                        id: {select.id > 0 ? select.id : undefined}
                    </p>
                    <div>
                        <label>
                            Hero name
                            <input
                                name="name"
                                type="textbox"
                                onChange={handleChange}
                                />
                        </label>
                    </div>
                    <div>
                       <button onClick={clearMessages}>
                           Clear message
                       </button>
                    </div>
                    <div>
                       <ListMessage list={messages}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListHeroes;