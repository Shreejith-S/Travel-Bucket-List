import React, { useEffect, useState } from 'react'
import { TextField, Button, Tooltip } from '@mui/material'
import Index from './Index'
// import { useNavigate } from 'react-router-dom'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddIcon from '@mui/icons-material/Add';

export default function Insert({ setInsertTrue, count, setCount }) {
    const [allInsert, setAllInsert] = useState([])

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState([])
    const [famousPlace, setFamousPlace] = useState([])
    const [desc, setDesc] = useState('')
    const [totalBudget, setTotalBudget] = useState('')




    const [newLocation, setNewLocation] = useState('')
    const [newfamousplace, setNewFamousPlace] = useState('')


    //addnewLocation
    const AddLocation = () => {
        if (newLocation) {
            setLocation(prevLocation => [...prevLocation, newLocation])
            setNewLocation('')
        }

    }

    //addnewfamousPlace
    const AddFamousPlace = () => {
        if (newfamousplace) {
            setFamousPlace(prevPlace => [...prevPlace, newfamousplace])
            setNewFamousPlace('')

        }
    }



    const SubmitList = () => {
        if (!title || !location || !famousPlace || !desc || !totalBudget) {
            alert('Something Should not Empty')
        }
        else {
            let id;
            if (destiny.length == 0) {
                id = 101;
            }
            else {
                id = destiny[destiny.length - 1].id + 1;
            }
            const Field = {
                id: id,
                title: title,
                desc: desc,
                location: location,
                famousPlace: famousPlace,
                totalBudget: totalBudget,
                checked: false,
                pinned: false,
            }
            setDestiny([...destiny, Field])
            setCount(prevCount => [prevCount + 1])
            setTimeout(() => {
                setInsertTrue(false)

            }, [200])

        }

    }

    let initvalue;
    if (localStorage.getItem('Destiny') == null) {
        initvalue = []
    }
    else {
        initvalue = JSON.parse(localStorage.getItem('Destiny'))
    }
    const [destiny, setDestiny] = useState(initvalue)


    useEffect(() => {
        localStorage.setItem('Destiny', JSON.stringify(destiny))
        //  setInsertTrue(true)

    }, [destiny])



    return (
        <>
            <div className='AboutInsert' >
                <div className="container">
                    <div className="title">
                        <TextField value={title} name='title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />

                    </div>
                    <div className="location">
                        <TextField value={newLocation} name='location' placeholder='Location' onChange={(e) => setNewLocation(e.target.value)} />

                        {/* <Button variant='contained' color='success'>Add Location</Button> */}
                        <Tooltip title='Add Location'>
                            <AddLocationIcon style={{ float: 'left', margin: '10px 0', marginLeft: '14px', color: 'green', cursor: 'pointer' }} onClick={AddLocation} />
                        </Tooltip>
                        <br />
                        <br />
                        <br />

                        {location.map((location, index) => (
                            <ul key={index} style={{ textAlign: 'left', fontSize: '18px' }}>
                                <li>{location}</li>
                            </ul>
                        ))}



                    </div>
                    <div className="desc">
                        <TextField value={desc} multiline rows={4} name='desc' onChange={(e) => setDesc(e.target.value)} placeholder='Description' />

                    </div>
                    <div className="famousPlace">
                        <TextField value={newfamousplace} name='famousPlace' placeholder='Famous-place' onChange={(e) => setNewFamousPlace(e.target.value)} />

                        {/* <Button style={{ float: 'left', marginTop: '10px', marginBottom: '15px' }} variant='contained' color='success' >Add Famous Place</Button> */}
                        <Tooltip title='Add Famous Place'>
                            <AddIcon style={{ float: 'left', marginTop: '10px', marginBottom: '15px', marginLeft: '14px', color: 'green', cursor: 'pointer' }} onClick={AddFamousPlace} />
                        </Tooltip>

                        <br />
                        <br />
                        <br />

                        {famousPlace.map((place, index) => (
                            <ul key={index} style={{ textAlign: 'left', fontSize: '18px' }}>
                                <li>{place}</li>
                            </ul>
                        ))}



                    </div>
                    <div className="totalBudget">
                        <TextField required value={totalBudget} placeholder='TotalBudget' name='totalBudget' onChange={(e) => setTotalBudget(e.target.value)} />

                    </div>
                    <div className='btn' style={{ textAlign: 'center' }}>
                        <Button style={{ textAlign: 'center', marginTop: '10px', marginBottom: '15px' }} variant='contained' color='success' type='submit' onClick={SubmitList} >Submit List</Button>
                    </div>
                </div>

            </div>

        </>
    )
}

