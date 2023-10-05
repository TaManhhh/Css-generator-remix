import React, { useState } from 'react'
import { Card, hsbToRgb, Text, Icon } from '@shopify/polaris';
import { LinksFunction } from '@remix-run/node';
import {
    DragHandleMinor, EditMinor, DeleteMinor
} from '@shopify/polaris-icons';
import listItem from './list-item.css'
interface ListItem {
    data: any;
    editData: any;
    setEditData: any
    setData: any
    shadow: any,
    formData: any,
    type: string,
    index: number,
}

const ListItem = ({ data, setData, formData, type, index, setEditData, shadow }: ListItem) => {

    const formatColor = (color: any) => {
        const changeColor = hsbToRgb(color)
        return `rgba(${changeColor.red}, ${changeColor.green}, ${changeColor.blue})`;
    };
    const newFormData = { ...formData, color: formatColor(formData?.color) };
    const newShadow = { ...shadow, color: formatColor(shadow?.color) }
    const displayProperties = formData?.id === shadow?.id ? newFormData : newShadow;
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData("text/plain", index.toString());
        setDraggedItemIndex(index);
    };
    const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (draggedItemIndex === null || draggedItemIndex === index) return;
        setDraggedItemIndex(index);
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (draggedItemIndex === null) return;
        const targetIndex = Number(e.dataTransfer.getData("text/plain"));
        if (draggedItemIndex !== targetIndex) {
            const updatedData = [...data];
            const [draggedItem] = updatedData.splice(draggedItemIndex, 1);
            updatedData.splice(targetIndex, 0, draggedItem);
            setData(updatedData);
        }
        setDraggedItemIndex(null);
    };


    const handleEditClick = (item: any) => {
        setEditData(item);
    };

    const onDelete = (id: number) => {
        const updatedData = data.filter((item: any) => item.id !== id);
        setData(updatedData);
    };


    return (
        <div draggable key={shadow?.id} onDragStart={(e) => onDragStart(e, index)}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragOver={onDragOver}
            onDrop={onDrop} className={`list-item ${formData?.id === shadow?.id ? "active" : " inactive"}`} onClick={() => handleEditClick(shadow)}>
            <div className='list-shadow'>
                <Icon
                    source={DragHandleMinor}
                    color="base"
                />
                <div>
                    {type === "box"
                        ? displayProperties?.inset
                            ? `inset ${displayProperties?.shiftRight}px ${displayProperties?.shiftDown}px ${displayProperties?.blur}px ${displayProperties?.spread}px ${displayProperties?.color}`
                            : ` ${displayProperties?.shiftRight}px ${displayProperties?.shiftDown}px ${displayProperties?.blur}px ${displayProperties?.spread}px ${displayProperties?.color}`
                        : `${displayProperties?.shiftRight}px ${displayProperties?.shiftDown}px ${displayProperties?.blur}px ${displayProperties?.color}`}
                </div>
            </div>
            <div className='list-button'>
                <span><Icon
                    source={EditMinor}
                    color="base"
                /></span>
                <span onClick={() => onDelete(shadow.id)} ><Icon
                    source={DeleteMinor}
                    color="base"

                /></span >
            </div>
        </div>
    )

}
export default ListItem
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: listItem }]
}