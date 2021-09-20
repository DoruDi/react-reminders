import React from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const ReminderList = ({title, id, removeFromList, handleEdit}) => {


    return (
        <li className='listItem'>
            <p>{title}</p>
            <DeleteForeverRoundedIcon className={'deleteBtn'}
                                      onClick={() => removeFromList(id)}
            />
            <ModeEditOutlineOutlinedIcon className={'editIcon'}
                                       onClick={() => handleEdit(id)}
            />
        </li>
    )
}

export default ReminderList;
