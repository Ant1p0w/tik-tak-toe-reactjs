import React, {useEffect, useState} from 'react';
import {FieldValue} from "../TicTacToe";


interface IGameField {
    fieldValue: 0 | 1 | null;
    handleOnClick: () => void;
}

export function GameField({fieldValue, handleOnClick}: IGameField) {

    function valueToText(value: number|null) {
        switch (value) {
            case 0:
                return 'O';
            case 1:
                return 'X';
        }
        return '';
    }

    return (
        <div onClick={handleOnClick} className="gameField">
            {valueToText(fieldValue)}
        </div>
    );
}
