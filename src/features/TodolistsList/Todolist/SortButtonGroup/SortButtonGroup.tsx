import React, {useCallback} from 'react';
import Button from "@mui/material/Button";
import {FilterValuesType} from "../../todolists-reducer";


type SortButtonGroupPropsType = {
    filter: FilterValuesType,
    id: string,
    changeFilter: (value: FilterValuesType, todolistId: string) => void
}


const SortButtonGroup = ({filter, id, changeFilter}: SortButtonGroupPropsType) => {

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [id, changeFilter])

    return (
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    );
};

export default SortButtonGroup;