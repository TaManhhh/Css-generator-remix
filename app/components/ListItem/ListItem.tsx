import React from 'react'
import { Card, Text, Icon } from '@shopify/polaris';
import { LinksFunction } from '@remix-run/node';
import {
    DragHandleMinor, EditMinor, DeleteMinor
} from '@shopify/polaris-icons';
import listItem from './list-item.css'
import { BoxShadowI } from '~/types/index.type';
interface ListItem{
    data:any;
    editData:any;
    setEditData:any
    setData:any
    shadow:any
}

const ListItem = ({data, editData,setData, setEditData,shadow}:ListItem) => {


//  const onDelete = (id: number) => {
//      const handleEditClick = (item: any) => {
//     setEditData(item);
//   };
//     const updatedData = data.filter((item: any) => item.id !== id);
//     setData(updatedData);
//   };
    return (
        <Card roundedAbove="xs">
            <div className='list-item'>
                <div className='list-shadow'>
                    <Icon
                        source={DragHandleMinor}
                        color="base"
                    />
                    <div>
                        {data.shiftRight}
                    </div>
                </div>
                <div className='list-button'>
                    <span><Icon
                        source={EditMinor}
                        color="base"
                    /></span>
                    <span  ><Icon
                        source={DeleteMinor}
                        color="base"

                    /></span>
                </div>
            </div>
        </Card>
    )
}

export default ListItem
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: listItem }]
}