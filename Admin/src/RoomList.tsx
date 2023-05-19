import axios from "axios";
import React, { useEffect, useState } from "react";
import './RoomList.css';

function RoomList({setPage, setRoom}) {
    const [rooms, setRooms] = useState([{RoomId: 1, RoomName: "NO ROOMS"}]);
    const [addExtend, setAddExtend] = useState(false);
    const [addName, setAddName] = useState("");
    const [selectedFile, setSelectedFile] = useState( null );

    const handlePage = (room) => {
        setRoom({roomId: room.RoomId, roomName: room.RoomName});
        setPage({homePage: false});
    }

    const getRooms = () => {
        axios.get("https://localhost:7013/api/Rooms").then((response) => {
            // console.log(response.data);
            setRooms(response.data);
        });
    }

    useEffect(() => {
        getRooms();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(addName);
        if(selectedFile){
            const formData = new FormData();
            formData.append(
                "image",
                selectedFile,
                addName
            );
            //{room: {RoomName: addName, Base_Image: selectedFile}}
            axios.post("https://localhost:7013/api/Rooms", formData)
            .then((response) => {
            // console.log(response.data);
            getRooms();
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
       
    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };
    
    const onFileUpload = () => {
        const formData = new FormData();

        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        console.log(this.state.selectedFile);
        
        axios.post("api/uploadfile", formData);
    };
    
    return (
        <div>
            <p>Rooms</p>
            <ul className="wrapper">
                { rooms.map( room => <li key={room.RoomId}><button className="roomButton" onClick={() => handlePage(room)}>{room.RoomName}</button></li>) }
            </ul>
            <div>
                <button className="roomButton" onClick={() => {addExtend ? setAddExtend(false) : setAddExtend(true)}}>Add Room +</button>
                {addExtend &&
                    <form onSubmit={handleSubmit} className="addForm">  
                        <label htmlFor="newRoomName">Room name:</label>
                        <input id="newRoomName" onChange={(e) => setAddName(e.target.value)} value={addName}></input>
                        <div>
                            <input type="file" onChange={onFileChange} />
                        </div>
                        <button>Submit</button>
                    </form>}
            </div>
        </div>
    );
}

export default RoomList;
