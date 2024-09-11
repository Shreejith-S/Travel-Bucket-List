import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Insert from './Insert'

import { useNavigate } from 'react-router-dom'

import img from './Travel.jpg'
import adminimag from './PersonAdmin.png'

//for dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Tooltip, } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
// import AddLocationIcon from '@mui/icons-material/AddLocation';
import FavoriteIcon from '@mui/icons-material/Favorite';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DoneIcon from '@mui/icons-material/Done';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';

// import CloseIcon from '@mui/icons-material/Close';

export default function Index() {
    let Value;
    let navigate = useNavigate()
    if (localStorage.getItem('Destiny') == null) {
        Value = []
    }
    else {
        Value = JSON.parse(localStorage.getItem('Destiny'))
    }


    useEffect(() => {
        localStorage.setItem('Destiny', JSON.stringify(Value))
        if (localStorage.getItem('Token') == null) {
            navigate('/')
        }

        else {

            console.log('Empty')
        }

    }, [destiny])



    //for dialog
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };


    const [insertTrue, setInsertTrue] = useState(false)

    const [destinyList, setDestinyList] = useState([])

    const [count, setCount] = useState(0)

    const [idvalue, setIDvalue] = useState([])
    const [editvalue, setEditValue] = useState([])

    const main = useRef(null)
    const mainTag = () => {
        // //for main header
        // const mainItem = main.current;
        // mainItem.style.display = 'none';
        // mainItem.style.border = 'none';
        //for main insert
        setInsertTrue(true)
    }
    const handleCard = (item) => {
        console.log('ITEM', item);
        setIDvalue(item);
        setEditValue(item);
        setOpen(true);
    }

    useEffect(() => {
        destiny = JSON.parse(localStorage.getItem('Destiny'))
        setDestinyList(destiny)

    }, [count,])

    var destiny;


    // console.log(destinyList, 'DestinyList')


    const ONCHANGE = (e) => {
        setIDvalue({ ...idvalue, [e.target.name]: e.target.value })
    }
    const AddLocation = () => {
        let isLocationEmpty = false;
        let isFPlaceEmpty = false;

        for (let i = 0; i < idvalue.location.length; i++) {
            if (idvalue.location[i].length === 0) {
                isLocationEmpty = true

            }
        }
        for (let i = 0; i < idvalue.famousPlace.length; i++) {
            if (idvalue.famousPlace[i].length === 0) {

                isFPlaceEmpty = true
            }
        }


        if (isLocationEmpty || isFPlaceEmpty) {

            alert('Empty Location or Famous Place Found');
        }
        else if (!idvalue.desc || !idvalue.totalBudget) {
            alert('Empty Description or totalBudget Found');

        }
        else {

            setIDvalue({ ...idvalue, location: [...idvalue.location, []] })
        }


    }
    const AddFamousPlace = () => {
        let isLocationEmpty = false;
        let isFPlaceEmpty = false;

        for (let i = 0; i < idvalue.location.length; i++) {
            if (idvalue.location[i].length === 0) {
                isLocationEmpty = true

            }
        }
        for (let i = 0; i < idvalue.famousPlace.length; i++) {
            if (idvalue.famousPlace[i].length === 0) {

                isFPlaceEmpty = true
            }
        }


        if (isLocationEmpty || isFPlaceEmpty) {

            alert('Empty Location or Famous Place Found');
        }
        else if (!idvalue.desc || !idvalue.totalBudget) {
            alert('Empty Description or totalBudget Found');

        }
        else {

            setIDvalue({ ...idvalue, famousPlace: [...idvalue.famousPlace, []] })
        }
    }


    const handleChangeLocation = (value, index) => {
        const UpdatedLocation = [...idvalue.location]
        UpdatedLocation[index] = value
        // console.log('UpdateValue', UpdatedLocation)
        setIDvalue({ ...idvalue, location: UpdatedLocation })
    }

    const handleChangeFamousPlace = (value, index) => {

        const UpdatedFamousPlace = [...idvalue.famousPlace]
        UpdatedFamousPlace[index] = value
        // console.log('FamousPlace', UpdatedFamousPlace)
        setIDvalue({ ...idvalue, famousPlace: UpdatedFamousPlace })
    }

    const index = destinyList?.findIndex((e) => e.id == idvalue.id);

    const SaveChanges = () => {
        let isLocationEmpty = false;
        let isFPlaceEmpty = false;

        for (let i = 0; i < idvalue.location.length; i++) {
            if (idvalue.location[i].length === 0) {
                isLocationEmpty = true

            }
        }
        for (let i = 0; i < idvalue.famousPlace.length; i++) {
            if (idvalue.famousPlace[i].length === 0) {

                isFPlaceEmpty = true
            }
        }


        if (isLocationEmpty || isFPlaceEmpty) {

            alert('Empty Location or Famous Place Found');
        }
        else if (!idvalue.desc || !idvalue.totalBudget) {
            alert('Empty Description or totalBudget Found');

        }
        else {

            console.log('EditedValue', editvalue)
            console.log('SaveChanges', idvalue)
            console.log('Index', index)


            if (idvalue.pinned) {
                pinValue?.splice(index, 1, idvalue)
                console.log('all value include Updated value ', pinValue)
                localStorage.setItem('PinDestiny', JSON.stringify(pinValue))
                setOpen(false);
                
            }
            else {
                destinyList?.splice(index, 1, idvalue)
                console.log('all value include Updated value ', destinyList)
                localStorage.setItem('Destiny', JSON.stringify(destinyList))
                setOpen(false);
            }

        }

    }

    //delete function
    const [deletedItem, setDeletedItem] = useState('')
    const [openDelete, setOpenDelete] = useState(false)

    const closeDletedPopUp = () => {
        setOpenDelete(false);
    };

    const Deletedestiny = async (item) => {
        if (item.pinned) {
            let value = (pinValue.filter((e) => {
                return e !== item
            }))
            setPinValue(value)
            localStorage.setItem('PinDestiny', JSON.stringify(value))
            await setOpen(false)
            await setOpenDelete(false)

        }
        else {
            let value = (destinyList.filter((e) => {
                return e !== item
            }))
            setDestinyList(value)
            localStorage.setItem('Destiny', JSON.stringify(value))
            await setOpen(false)
            await setOpenDelete(false)

        }

    }

    const handleDeleteIcon = (item) => {
        setOpenDelete(true)
        setDeletedItem(item)
    }

    //delete particular location
    const LocationDelete = (index, selectedLocation) => {
        console.log('LocationDelete', index);
        console.log('selectedLocation', selectedLocation);
        console.log('Location', idvalue.location)

        let value = idvalue.location.filter((e) => {
            return e !== selectedLocation
        })

        if (idvalue.pinned) {
            let AllIdValue = [...pinValue]

            let indexW = AllIdValue.findIndex((e) => e.id == idvalue.id)
            idvalue.location = value
            AllIdValue.splice(indexW, 1, idvalue)

            console.log('All', AllIdValue)
            // idvalue.location = value
            setPinValue(AllIdValue)
            localStorage.setItem('PinDestiny', JSON.stringify(AllIdValue))
        }
        else {
            let AllIdValue = [...destinyList]

            let indexW = AllIdValue.findIndex((e) => e.id == idvalue.id)
            idvalue.location = value
            AllIdValue.splice(indexW, 1, idvalue)

            console.log('All', AllIdValue)
            // idvalue.location = value
            setDestinyList(AllIdValue)
            localStorage.setItem('Destiny', JSON.stringify(AllIdValue))
        }

    }
    //delete particular famousPlace
    const FamousPlaceDelete = (index, selectedPlace) => {

        if (idvalue.pinned) {
            let value = idvalue.famousPlace.filter((e) => {
                return e !== selectedPlace
            })
            let AllIdValue = [...pinValue]

            let indexW = AllIdValue.findIndex((e) => e.id == idvalue.id)
            idvalue.famousPlace = value
            AllIdValue.splice(indexW, 1, idvalue)

            console.log('All', AllIdValue)
            setPinValue(AllIdValue)
            localStorage.setItem('PinDestiny', JSON.stringify(AllIdValue))
        }
        else {
            let value = idvalue.famousPlace.filter((e) => {
                return e !== selectedPlace
            })
            let AllIdValue = [...destinyList]

            let indexW = AllIdValue.findIndex((e) => e.id == idvalue.id)
            idvalue.famousPlace = value
            AllIdValue.splice(indexW, 1, idvalue)

            console.log('All', AllIdValue)
            setDestinyList(AllIdValue)
            localStorage.setItem('Destiny', JSON.stringify(AllIdValue))
        }


    }

    const Push2Pin = (item) => {
        console.log('HelloPin', item)
        let makepintrue = item.pinned = true
        console.log('MAkeTRue', makepintrue)
        setPinValue([...pinValue, item])
        let value = (destinyList.filter((e) => {
            return e !== item
        }))

        setDestinyList(value)
        localStorage.setItem('Destiny', JSON.stringify(value))
    }

    const RemovePin = (item) => {
        console.log('HelloPin', item)
        let makepinfalse = item.pinned = false
        console.log('makepinfalse', makepinfalse)
        let value = (pinValue.filter((e) => {
            return e !== item
        }))
        setPinValue(value.reverse())
        const MergedValue = [...destinyList, item]
        setDestinyList(MergedValue)

        localStorage.setItem('Destiny', JSON.stringify(MergedValue))
        // setDestinyList([...destinyList, [item]])
    }
    console.log('DestinyList...', destinyList)

    let initPin;
    if (localStorage.getItem('PinDestiny') == null) {
        initPin = []
    }
    else {
        initPin = JSON.parse(localStorage.getItem('PinDestiny'))
    }
    const [pinValue, setPinValue] = useState(initPin)





    useEffect(() => {
        localStorage.setItem('PinDestiny', JSON.stringify(pinValue))

    }, [pinValue])

    const handleCheckBox = (index, item, checked) => {

        let value = pinValue[index].checked = checked;
        console.log(pinValue, 'Piii')
        localStorage.setItem('PinDestiny', JSON.stringify(pinValue))
        let pin = JSON.parse(localStorage.getItem('PinDestiny'))
        setPinValue(pin)

    }

    const handleCheckBox2 = (index, item, checked) => {

        let value = destinyList[index].checked = checked;
        console.log(destinyList, 'Piii')
        localStorage.setItem('Destiny', JSON.stringify(destinyList))
        let destinyy = JSON.parse(localStorage.getItem('Destiny'))
        setDestinyList(destinyy)

    }

    let card = useRef(null)
    const [sidebar, setSideBar] = useState(false)

    // menu.current.style.display = 'none'
    const MenuBar = () =>
        setSideBar((prev) => !prev);
    // console.log('SS', sidebar)

    const handleLogout = async()=>{
        localStorage.removeItem("Token");
        await navigate("/login")
        
    }
    return (
        <>
            <div className="main-container">
                <div className="navbar">


                    <span className='navbarMenu' >

                        {sidebar ? (
                            <CloseIcon onClick={MenuBar} style={{ fontSize: '50px' }} />
                        ) :
                            <MenuIcon onClick={MenuBar} style={{ fontSize: '50px' }} />
                        }


                    </span>

                    <span style={{ marginLeft: '18px' }}>

                        <img style={{ width: '55px', borderRadius: '50%' }} src={img} alt="" />
                    </span>
                    <h1 style={{ fontWeight: 'normal', position: 'relative' }}>Travel Backet List</h1>
                    <div style={{ position: 'absolute', right: '0' }}>
                        <span style={{ position: 'relative', right: '20px' }}>
                            <img style={{ width: '43px', borderRadius: '50%' }} src={adminimag} alt="" />

                        </span>
                    </div>
                </div>

                <div className="GRID-div">

                    {sidebar && (
                        <div className='sidebar'>
                            <div >
                                <p> <HomeIcon />  <span>Home</span></p>
                                {/* <p><PhoneIcon />  <span>Phone</span></p>
                                <p><AddLocationIcon />  <span>Add Location</span></p>
                                <p><FavoriteIcon />  <span>Famous Place</span></p> */}
                                <p style={{cursor:'pointer'}} onClick={handleLogout}>  <LogoutIcon /><span>Logout</span></p>

                            </div>

                        </div>
                    )}

                    <div className="mainDIV">
                        {!insertTrue && (

                            <div ref={main} id='main' className="main-header">
                                <h1 onClick={mainTag} style={{ fontWeight: 'normal', padding: '12px' }}>Create New Destination</h1>
                            </div>
                        )}


                        {insertTrue && (
                            <div className='insert'>
                                <Insert setInsertTrue={setInsertTrue} count={count} setCount={setCount} />
                            </div>
                        )}

                        <div className="All-map">
                            <div className="PinnedDestiny">
                                {pinValue.length == 0 ? '' : (
                                    <h4 style={{ display: 'block', width: '100%', marginLeft: '20px', color: '#7a7272', fontSize: '13px' }}>
                                        PRIORITIZE DESTINATION

                                    </h4>
                                )}

                                {pinValue?.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index}>
                                                <div ref={card} className="card" >
                                                    <span >
                                                        <FormControlLabel className='CheckBoxClass'
                                                            control={
                                                                <Checkbox
                                                                    style={{ color: 'black' }}
                                                                    checked={item?.checked}
                                                                    onChange={(e) => handleCheckBox(index, item, e.target.checked)}

                                                                />
                                                            }

                                                        />
                                                    </span>
                                                    {item.checked && (
                                                        <span className='SpanVisited'>
                                                            <span className='SpanDIV'>
                                                                <span className='SpanDIVinside'>
                                                                    visited
                                                                    <span className='doneIcon'>
                                                                        <DoneIcon style={{ fontSize: '18' }} />

                                                                    </span>

                                                                </span>
                                                            </span>
                                                        </span>


                                                    )}
                                                    <span style={{ position: 'relative', float: 'right', left: '-12px' }}>
                                                        <Tooltip title='Unpin destiny'>
                                                            <PushPinIcon onClick={() => RemovePin(item)} className='Pin' style={{ color: 'black' }} />
                                                        </Tooltip>
                                                    </span>
                                                    <div onClick={() => handleCard(item)}>

                                                        <h1 style={{ textDecoration: item.checked ? 'line-through' : '', marginTop: '0' }}>{item.title}</h1>

                                                        {item.location.map((location, index) => (
                                                            <span style={{ fontSize: '19px' }} >
                                                                <span style={{ textDecoration: item.checked ? 'line-through' : '' }}>{location}</span>

                                                                {index < item.location.length - 1 && ','}
                                                            </span>
                                                        ))}
                                                    </div>


                                                </div>



                                            </div>


                                        </>
                                    )
                                })}

                            </div>
                            <div className="card-container">
                                <p style={{ position: 'relative', left: '10px', fontWeight: '400', fontSize: '20px' }}>
                                    {destinyList?.length == 0 ? 'No Destiny List' : ''}
                                </p>

                                {destinyList.length == 0 ? '' : (
                                    <h4 style={{ display: 'block', width: '100%', marginLeft: '20px', color: '#7a7272', fontSize: '13px' }}>
                                        OTHER

                                    </h4>
                                )}
                                {destinyList?.map((item, index) => {
                                    return (
                                        <>
                                            <div key={index}>
                                                <div className="card" >
                                                    <span >
                                                        <FormControlLabel className='CheckBoxClass'
                                                            control={
                                                                <Checkbox
                                                                    style={{ color: 'black' }}

                                                                    checked={item?.checked}
                                                                    onChange={(e) => handleCheckBox2(index, item, e.target.checked)}

                                                                />
                                                            }

                                                        />
                                                    </span>
                                                    {item.checked && (
                                                        <span className='SpanVisited'>
                                                            <span className='SpanDIV'>
                                                                <span className='SpanDIVinside'>
                                                                    visited
                                                                    <span className='doneIcon'>
                                                                        <DoneIcon style={{ fontSize: '18' }} />

                                                                    </span>

                                                                </span>
                                                            </span>
                                                        </span>


                                                    )}
                                                    <span style={{ position: 'relative', float: 'right', left: '-12px' }}>
                                                        <Tooltip title='Pin destiny'>
                                                            <PushPinIcon onClick={() => Push2Pin(item)} className='Pin' style={{ color: 'white' }} />
                                                        </Tooltip>

                                                    </span>
                                                    <div onClick={() => handleCard(item)}>

                                                        <h1 style={{ textDecoration: item.checked ? 'line-through' : '', marginTop: '0' }}>{item.title}</h1>

                                                        {item.location.map((location, index) => (
                                                            <span style={{ fontSize: '19px' }}>

                                                                <span style={{ textDecoration: item.checked ? 'line-through' : '' }}>{location}</span>

                                                                {index < item.location.length - 1 && ','}
                                                            </span>
                                                        ))}
                                                    </div>


                                                </div>



                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                </div>




                <Dialog
                    fullWidth
                    style={{ height: '700px', overflowWrap: 'anywhere', }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle sx={{ backgroundColor: 'black' }} id="alert-dialog-title">


                        <span >

                            <input required placeholder='No title added .......' name='title' value={idvalue?.title} onChange={ONCHANGE} style={{ fontSize: '25px', backgroundColor: 'black', color: 'white' }} className='PInput' type="text" />

                        </span>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                        style={{ color: 'red' }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Location */}


                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <br />
                            <span style={{ fontSize: '20px', color: 'grey' }}>
                                Locations you want to go:
                            </span>
                            <br />

                            <span style={{ marginLeft: '40px' }} >
                                {idvalue?.location?.length == 0 ?

                                    <input required placeholder='No location added....' name='location'
                                        onChange={(e) => handleChangeLocation(e.target.value, 0)}
                                    />


                                    : ''}


                            </span>
                            {idvalue.location?.map((location, index) => (
                                <div style={{ marginLeft: '40px' }}>

                                    <p style={{ margin: '0', marginTop: '10px' }}>
                                        {index + 1}.
                                        <input required placeholder='No location added ..... ' name='location'
                                            onChange={(e) => handleChangeLocation(e.target.value, index)}
                                            className='PInput' type="text" value={location} />
                                        <DeleteIcon onClick={() => LocationDelete(index, location)} style={{ color: 'red' }} />
                                    </p>
                                </div>
                            ))}

                            {/* addlocation btn to add extra location */}
                            <br />
                            <span style={{ marginLeft: '50px' }}>
                                <Tooltip title='Add New Location'>
                                    <AddLocationIcon sx={{ color: '#187246' }} onClick={AddLocation} /></Tooltip>
                                {/* <Button size='small' variant='contained' color='success' >New location</Button> */}
                            </span>
                        </DialogContentText>
                        <br />
                        {/* Famous Place */}


                        <DialogContentText id="alert-dialog-description">
                            <span style={{ fontSize: '20px' }}>Famous Place you want to Visit:</span>
                            <br />

                            <span style={{ marginLeft: '40px' }} >
                                {idvalue?.famousPlace?.length == 0 ?

                                    <input required placeholder='No famous place added....' name='famousPlace' onChange={(e) => handleChangeFamousPlace(e.target.value, 0)} className='PInput' type="text" />

                                    : ''}


                            </span>

                            {idvalue.famousPlace?.map((place, index) => (
                                <div style={{ marginLeft: '40px' }}>

                                    <p style={{ margin: '0', marginTop: '10px' }}>
                                        {index + 1}.
                                        <input required placeholder='No famous place added ....' name='famousPlace' onChange={(e) => handleChangeFamousPlace(e.target.value, index)} className='PInput' type="text" value={place} />
                                        <DeleteIcon onClick={() => FamousPlaceDelete(index, place)} style={{ color: 'red' }} />


                                    </p>
                                </div>
                            ))}

                            {/* addfamousPlace btn to add extra famousPlace */}
                            <br />
                            <span style={{ marginLeft: '50px' }}>
                                <Tooltip title={'New Famous Place'}>
                                    <AddIcon style={{ color: 'green' }} onClick={AddFamousPlace} />
                                </Tooltip>
                                {/* <Button size='small' variant='contained' color='success' >New Famous Place</Button> */}
                            </span>
                        </DialogContentText>
                        <br />
                        {/* Description */}



                        <DialogContentText id="alert-dialog-description">

                            <span style={{ fontSize: '20px' }}>Description:</span>
                            <br />
                            <div style={{ marginLeft: '40px' }}>
                                <p style={{ margin: '0', marginTop: '10px' }}>


                                    <textarea required placeholder='No description added....' name='desc' onChange={ONCHANGE} className='PInput textareaDesc ' type="text" value={(idvalue.desc)} />
                                    <DeleteIcon style={{ color: 'red' }} />

                                </p>
                            </div>
                        </DialogContentText>
                        <br />



                        {/* TotalBudget */}
                        <DialogContentText id="alert-dialog-description">

                            <span style={{ fontSize: '20px', }}>Total Budget:</span>

                            <div style={{ marginLeft: '40px' }}>

                                <p style={{ margin: '0', marginTop: '10px' }}>
                                    <input required placeholder='No total budget added....' name='totalBudget' onChange={ONCHANGE} className='PInput' type="text" value={(idvalue.totalBudget)} />
                                    <DeleteIcon style={{ color: 'red' }} />

                                </p>
                            </div>
                        </DialogContentText>
                        <br />


                    </DialogContent>

                    <DialogActions>
                        <Tooltip title='Save Changes' style={{ margin: '10px 20px' }}>
                            <Button type='submit'>
                                <CheckIcon sx={{ color: 'green' }} onClick={SaveChanges} />
                            </Button>
                        </Tooltip>
                        <Tooltip title='Delete' style={{ margin: '10px 20px' }}>
                            <DeleteIcon onClick={() => handleDeleteIcon(idvalue)} sx={{ color: 'red' }} />
                        </Tooltip>

                        {/* <Button variant='contained' color='error' onClick={handleClose} autoFocus>
                            Close
                        </Button> */}
                    </DialogActions>
                </Dialog>

                {/* Delete Pop Up */}
                <Dialog


                    style={{ height: '250px', }}
                    open={openDelete}
                    onClose={closeDletedPopUp}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to delete this Destiny?"}
                    </DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='error' onClick={() => Deletedestiny(deletedItem)}>Yes</Button>
                        <Button variant='contained' color='primary' onClick={closeDletedPopUp} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}
