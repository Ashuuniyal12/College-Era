import React, { useState } from 'react'
import './FollowersCard.css'
import User from '../User/User'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../API/UserRequest'

const FollowersCard = () => {

    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPerson = async () => {
            const { data } = await getAllUser();
            setPersons(data);
            console.log(data);
        }
        fetchPerson();
    }, [])
    return (
        <div className="FollowersCard w-full rounded-full gap-4 flex flex-col text-sm">
            <h3>People You May Know</h3>

            {persons.map((person, id) => {
                if (person._id !== user._id) {
                    return (
                        <User person={person} key={id} />
                    )
                }
            })}
        </div>
    )
}

export default FollowersCard