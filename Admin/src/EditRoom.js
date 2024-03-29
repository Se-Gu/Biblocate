import { useEffect, useState } from 'react';
import './EditRoom.css';
import axios from 'axios';
import room_img from "./ARTROOM.jpg";
import shelf_img from "./raf2.jpg";
import * as webConfig from "./webConfig";

function EditShelf({page, setPage, room, setRoom}) {
    const [retrieved, setRetrieved] = useState([]);
    const [added, setAdded] = useState({num: 0, list: []});
    const [deleted, setDeleted] = useState([]);
    const [updated, setUpdated] = useState([]);
    const [selected, setSelected] = useState(null);
    const [roomDims, setRoomDims] = useState({width: null, height: null});
    const [callNums, setCallNums] = useState({lcnb: null, lcne: null, rcnb: null, rcne: null});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get( webConfig.baseImage + room.roomId).then((response) => {
            // console.log(response.data);
            //setRoomDims({width: 2892, height: 2223});
        });
        setLoading(true);
        axios.get( webConfig.shelvesIn + room.roomId).then((response) => {
            // console.log(response.data);
            setRetrieved(response.data);
            setUpdated(response.data);
            setLoading(false);
        });
    }, []);

    const findUpdated = () => {
        console.log(updated.filter((instance) => { return !retrieved.includes(instance); }));
        return updated.filter((instance) => {
            return !retrieved.includes(instance);
        });
    }

    const handleSave = () => {
        console.log(added.list);
        /*
        let saveDto = {Added: added.list, Updated: added.list, Deleted: ["del","ete"]};
        const response = fetch("https://localhost:7013/api/Shelves/Save/" + room.roomId, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({saveDto: saveDto}), // body data type must match "Content-Type" header
        });
        */
        
        axios.post( webConfig.shelvesSave + room.roomId, [...added.list, ...updated].map((instance) => {delete instance.ShelfId; console.log(instance); return instance;}) )
        // {}, {
        //    params: { 
        //        saveDto: {Added: added.list, Updated: added.list, Deleted: ["del","ete"]}
        //    }
        //})
        // {saveDto: {Added: added.list, Updated: [{}], Deleted: ["del","ete"]}}, {contentType: 'application/json'} )
        .then((response) => {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        
        setRoom({roomId: null, roomName: null});
        setPage({homePage: true});
    }

    const handleCancel = () => {
        setRoom({roomId: null, roomName: null});
        setPage({homePage: true});
    }

    const handleSelect = (id, lcnbIn, lcneIn, rcnbIn, rcneIn) => { 
        setSelected(id);
        setCallNums({lcnb: lcnbIn, lcne: lcneIn, rcnb: rcnbIn, rcne: rcneIn});
    }

    const handleAdd = () => {
        setAdded({num: added.num+1, list: [...added.list, {ShelfId: "a" + added.num, RoomId: room.roomId, XCoordinate: 0, YCoordinate: 0, LeftCallNumberBegin: "",
            LeftCallNumberEnd: "", RightCallNumberBegin: "", RightCallNumberEnd: "", Width: 80, Height: 450}]});
        handleSelect("a" + added.num, "", "", "", "");
    }

    const handleDelete = () => {
        // if ( added.list.some(instance => instance.ShelfId === selected) ){
        if ( selected[0] === "a" ){
            setAdded({...added, list: added.list.filter(instance => instance.ShelfId !== selected)});
        }
        else {
            setDeleted([...deleted, selected]);
            setUpdated(updated.filter(instance => instance.ShelfId !== selected));
        }
        setSelected(null);
    }

    const handleUpdate = (obj) => {
        setCallNums(obj); 
        if ( selected[0] === "a" ){
            setAdded({...added, list: added.list.map(instance => {
                if (instance.ShelfId === selected){
                    return {...instance, 
                        LeftCallNumberBegin: obj.lcnb,
                        LeftCallNumberEnd: obj.lcne,
                        RightCallNumberBegin: obj.rcnb,
                        RightCallNumberEnd: obj.rcne};
                } else {
                    return instance;
                }
            })});
        }
        else {
            setUpdated(updated.map(instance => {
                if (instance.ShelfId === selected){
                    return {...instance, 
                        LeftCallNumberBegin: obj.lcnb,
                        LeftCallNumberEnd: obj.lcne,
                        RightCallNumberBegin: obj.rcnb,
                        RightCallNumberEnd: obj.rcne};
                } else {
                    return instance;
                }
            }));
        }
    }

    const handleMove = (x, y) => {
        if ( selected[0] === "a" ){
            setAdded({...added, list: added.list.map(instance => {
                if (instance.ShelfId === selected 
                    && roomDims.width >= instance.XCoordinate + instance.Width + x && instance.XCoordinate + x >= 0 
                    && roomDims.height >= instance.YCoordinate + instance.Height + y && instance.YCoordinate + y >= 0 ){
                    return {...instance, XCoordinate: instance.XCoordinate + x, YCoordinate: instance.YCoordinate + y};
                } else {
                    return instance;
                }
            })});
        }
        else {
            setUpdated(updated.map(instance => {
                if (instance.ShelfId === selected
                    && roomDims.width >= instance.XCoordinate + instance.Width + x && instance.XCoordinate + x >= 0 
                    && roomDims.height >= instance.YCoordinate + instance.Height + y && instance.YCoordinate + y >= 0 ){
                    return {...instance, XCoordinate: instance.XCoordinate + x, YCoordinate: instance.YCoordinate + y};
                } else {
                    return instance;
                }
            }));
        }
    }

    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        setRoomDims({width: naturalWidth, height: naturalHeight});
        //setWidth(naturalWidth);
        //setHeight(naturalHeight);
      };

    return (
        <div>
        <p>Edit {page.roomName}</p>
        {loading && <p>LOADING...</p>}
            <div className="mainToolbar">
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
            {selected !== null && <div>
                <div className="shelfToolbar">
                    <button onClick={() => handleMove(-50,0)}>left</button>
                    <button onClick={() => handleMove(50,0)}>right</button>
                    <button onClick={() => handleMove(0,-50)}>up</button>
                    <button onClick={() => handleMove(0,50)}>down</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <div className="CallNumToolbar">
                <input id="lcnb" onChange={(e) => handleUpdate({...callNums, lcnb: e.target.value})} value={callNums.lcnb}></input>
                <input id="lcne" onChange={(e) => handleUpdate({...callNums, lcne: e.target.value})} value={callNums.lcne}></input>
                <input id="rcnb" onChange={(e) => handleUpdate({...callNums, rcnb: e.target.value})} value={callNums.rcnb}></input>
                <input id="rcne" onChange={(e) => handleUpdate({...callNums, rcne: e.target.value})} value={callNums.rcne}></input>
                </div>
            </div>
            }
            <div className="roomWrapper">
                <img src={webConfig.baseImage + room.roomId} alt="room_img" onLoad={handleImageLoad}
                    className="roomImg" onClick={()=>setSelected(null)}/> 
                {
                    updated.map(shelf => 
                    <img
                        key={shelf.ShelfId} 
                        id={shelf.ShelfId} 
                        src={shelf_img} 
                        alt="shelf_img" 
                        className={selected === shelf.ShelfId ? "shelfImg active": "shelfImg"}
                        onClick={()=>handleSelect(shelf.ShelfId, shelf.LeftCallNumberBegin, shelf.LeftCallNumberEnd, shelf.RightCallNumberBegin, shelf.RightCallNumberEnd)}
                        style={{left: shelf.XCoordinate / roomDims.width * 100 + "%", top: shelf.YCoordinate / roomDims.height * 100 + "%",
                            width: shelf.Width / roomDims.width * 100 + "%", height: shelf.Height / roomDims.height * 100 + "%"}}
                    /> 
                    )
                }
                {
                    added.list.map(shelf => 
                    <img
                        key={shelf.ShelfId} 
                        id={shelf.ShelfId} 
                        src={shelf_img} 
                        alt="shelf_img" 
                        className={selected === shelf.ShelfId ? "shelfImg active": "shelfImg"}
                        onClick={()=>handleSelect(shelf.ShelfId, shelf.LeftCallNumberBegin, shelf.LeftCallNumberEnd, shelf.RightCallNumberBegin, shelf.RightCallNumberEnd)}
                        style={{left: shelf.XCoordinate / roomDims.width * 100 + "%", top: shelf.YCoordinate / roomDims.height * 100 + "%",
                            width: shelf.Width / roomDims.width * 100 + "%", height: shelf.Height / roomDims.height * 100 + "%"}}
                    /> 
                    )
                }
            </div>
        </div>
    );
}

export default EditShelf;
  