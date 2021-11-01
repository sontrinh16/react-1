import React, { useState } from "react";
import style from './style'

const ListMessage = (props) => {
    return (
        <div className="row">
            <ul className="list-group col-8" style={style.ul}>
                {props.list.map(mess => 
                    <li className="list-group-item" style={style.spacing} key={mess}>
                        <label>
                            HeroesComponent: Selected hero id={mess}
                        </label>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ListMessage;