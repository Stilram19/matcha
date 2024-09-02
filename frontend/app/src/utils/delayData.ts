import { useEffect } from "react";

export const delayData = (then: (data: any) => void) => {
    useEffect(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(1), 5000);
        })
        promise.then(() => {
            // console.log('setting favs');
            then([
                {
                    "id": 0,
                    "firstName": "Hellis",
                    "lastName": "Smith",
                    "profilePicture": "/imgs/test.jpg",
                    "lastMessage": "Hello, I just wanna tell that your task has been done and you should contact",
                    isFavorite: false,
                    unreadCount: 1
                },
                {
                    "id": 1,
                    "firstName": "Jane",
                    "lastName": "Smith",
                    "profilePicture": "/imgs/Avatar.png",
                    "lastMessage": "Are we still on for the meeting tomorrow?",
                    isFavorite: true,
                    unreadCount: 0
                },
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                    "profilePicture": "/imgs/man_placeholder1.jpg",
                    "lastMessage": "Don't forget to check the report I sent you.",
                    isFavorite: false,
                    unreadCount: 0
                }
            ])
        })
    }, [])
}