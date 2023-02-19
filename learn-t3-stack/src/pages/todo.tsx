import { type NextPage } from "next";
import { useState, type FC } from "react";
import { object } from "zod";

let todoListItems:object[] = [
    {
        text:"Clean room"
    },
    {
        text:"Get groceries"
    },
    {
        text:"Get groceries"
    }
]

function renderToDo(item:object) {
    return(
        <div className="flex w-full space-x-2 justify-between">
            <button type="submit">❌</button>
            <input className="border" type="text" placeholder="Task goes here ..." value={item.text}/>
        </div>
    );
}

export default function NextPage() {
    return(
        <>
            <div className="flex justify-center items-center h-screen w-screen">
                <div className="flex border p-4">
                    <form className="space-y-4">
                        {todoListItems.map(renderToDo)}
                        <div className="flex space-x-4 justify-between">
                            <button className="border" type="submit">Add task</button>
                            <button className="border" type="submit">Clear list</button>
                        </div>
                        </form>
                </div>
            </div>
        </>
    );

};