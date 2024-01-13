import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search === '') {
            fetch(`https://volunteer-network-server-gamma.vercel.app/my-events?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setEvents(data))
        } else {
            fetch(`https://volunteer-network-server-gamma.vercel.app/eventSearch?text=${search}`)
                .then(res => res.json())
                .then(data => {
                    const searchData = data.filter(event => event.email === user?.email);
                    setEvents(searchData);
                })
        }
    }, [user, search])

    const handleDelete = (event) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://volunteer-network-server-gamma.vercel.app/event/${event._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const remaining = events.filter(ent => ent._id !== event._id)
                            setEvents(remaining);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Event Summary</h2>
            <div className='text-center bg-white w-100 my-3 rounded-2 py-2 px-4'>
                <input onChange={(e) => setSearch(e.target.value)} class="form-control w-50" list="datalistOptions" id="exampleDataList" placeholder="search..." />
                <datalist id="datalistOptions">
                    {events?.map(event => <option key={event._id} value={event.eventTitle} />)}
                </datalist>
            </div>
            <div className='m-3 m-md-4 bg-white p-2 p-md-4 rounded-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Image</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Entry Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map((event, index) => (
                            <tr key={index}>
                                <th scope="row">{1 + index}</th>
                                <td><img style={{ width: '40px', height: '30px', borderRadius: '5px' }} src={event.image} alt="" /></td>
                                <td>{event.eventTitle}</td>
                                <td>{moment(event.entryDate).format("LL")}</td>
                                <td><Link to={`/admin/editEvent/${event._id}`}>
                                    <FaEdit style={{ height: '30px', width: '20px', cursor: 'pointer' }} className='text-success me-3' />
                                </Link>
                                    <FaTrashAlt onClick={() => handleDelete(event)} style={{ height: '30px', width: '20px', cursor: 'pointer' }} className='text-danger' /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEvents;