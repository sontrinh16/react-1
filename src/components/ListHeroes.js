import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListMessage from './ListMessage';
import style from './style';

const URL = 'https://60dff0ba6b689e001788c858.mockapi.io/heroes';

const ListHeroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [select, setSelect] = useState({
    id: -1,
    name: '',
  });
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    const filterArray = [
      ...heroes.filter((x) => x.id !== select.id),
      {
        id: select.id,
        name: event.target.value,
      },
    ];
    filterArray.sort((x, y) => x.id - y.id);
    setHeroes(filterArray);
    setSelect({
      id: select.id,
      name: event.target.value,
    });
  };

  const handleClick = (e, hero) => {
    setSelect(hero);
    setMessages([...messages, hero.id]);
  };

  const changeOver = (e, hero) => {
    if(hero.id !== select.id){
      e.target.style.background = '#ffcdc9';
    }
  };

  const changeLeft = (e, hero) => {
    if(hero.id !== select.id){
      e.target.style.background = '#fceceb';
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    axios.get(URL).then((result) => {
      setHeroes(result.data);
    });
  }, []);
  return (
    <div style={{ margin: "10px" }}>
      <h1 style={{ color: '#f0c5aa' }}>Tour of Heroes</h1>
      <h5>My heroes</h5>
      <div>
        <ul className="list-group col-8" style={{ listStyleType: 'none' }}>
          {heroes.map((hero) => (
            <li
              className="list-group-item"
              key={hero.id}
              onClick={(e) => {
                handleClick(e, hero)
              }}
              style={(hero.id === select.id) ? style.selectedList : style.list}
              onMouseOver={(e) => {
                changeOver(e, hero)
              }}
              onMouseLeave={(e) => {
                changeLeft(e, hero)
              }}
            >
              <span style={{ marginRight: '20px' }}>{hero.id}</span>
              {hero.name}
            </li>
          ))}
        </ul>
        {select.id !== -1 && (
          <div style={{ marginTop: '20px' }}>
            <p>{select.name.toUpperCase()} DETAILS</p>
            <p>id: {select.id > 0 ? select.id : undefined}</p>
            <div>
              <label>
                Hero name:
                <input
                  name="name"
                  type="textbox"
                  onChange={handleChange}
                  value={select.name}
                  style={style.input}
                />
              </label>
            </div>
          </div>
        )}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#ff7575' }}>Messages</h3>
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearMessages}
            >
              Clear message
            </button>
          </div>
          <ListMessage list={messages} />
        </div>
      </div>
    </div>
  );
};

export default ListHeroes;
