import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
import {v4 as uuidv4} from 'uuid';
import {GameField} from "./GameField";

const ENDPOINT = 'http://localhost:3001';

export type FieldValue = {
    id: number,
    value: 0 | 1 | null
};

const defaultFieldValues: FieldValue[] = [
    {
        id: 1,
        value: null,
    },
    {
        id: 2,
        value: null,
    },
    {
        id: 3,
        value: null,
    },
    {
        id: 4,
        value: null,
    },
    {
        id: 5,
        value: null,
    },
    {
        id: 6,
        value: null,
    },
    {
        id: 7,
        value: null,
    },
    {
        id: 8,
        value: null,
    },
    {
        id: 9,
        value: null,
    }
];

const socket = socketIOClient(ENDPOINT);

export function TicTacToe() {
    const [gameId, setGameId] = useState(uuidv4());
    const [fieldValues, setFieldValues] = useState(defaultFieldValues);

    useEffect(() => {
        socket.on("updateGame", data => {
            setFieldValues(data.fieldValues);
        });

        socket.emit('startGame', gameId);
    }, []);

    function onFieldClick(id: number) {
        let newFieldValues = [...fieldValues];

        let fieldValue = newFieldValues.find(fieldValue => fieldValue.id === id);

        if (fieldValue) {
            fieldValue.value = 1;
            socket.emit('updateGame', {id: gameId, fieldValues: fieldValues});
        }
    }

    return (
        <div className="TicTakToeApp">
            <h1>TikTacToe Game</h1>
            <div className={"gameFields"}>
                {fieldValues.map((fieldValue) => <GameField key={fieldValue.id} handleOnClick={() => {
                    onFieldClick(fieldValue.id)
                }} fieldValue={fieldValue.value}/>)}
            </div>
        </div>
    );
}
