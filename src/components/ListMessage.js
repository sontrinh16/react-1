import React, { useState } from "react";

const ListMessage = (props) => {
    return (
        <div>
            <ul>
                {props.list.map(mess => 
                    <li key={mess}>
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