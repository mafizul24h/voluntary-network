import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';

const image_Hosting_Key = import.meta.env.VITE_IMAGE_API_TOKEN;

const EditEvent = () => {
    const { user } = useContext(AuthContext);
    const loadedEvent = useLoaderData();
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const imageURL = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`

    // console.log(loadedEvent);

    const handleUpdateEvent = (event) => {
        event.preventDefault();

        const form = event.target;
        const eventTitle = form.title.value;
        const eventDate = form.date.value;
        const description = form.description.value;

        const newEvent = {
            eventTitle, eventDate, description, email: user?.email
        }

        const formData = new FormData();
        formData.append('image', image);

        fetch(imageURL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.success) {
                    newEvent.image = resData.data.display_url;

                    console.log(newEvent);
                    fetch(`http://localhost:5000/updateEvent/${loadedEvent._id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newEvent)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data);
                            if (data.modifiedCount > 0) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your event has been update",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                event.target.reset();
                                navigate('/admin/myEvent')
                            }
                        })
                }
            })
    }
    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Update {loadedEvent.eventTitle}</h2>
            <div className='m-3 m-md-4 bg-white p-2 p-md-4 rounded-2'>
                <form onSubmit={handleUpdateEvent}>
                    <div className='row row-cols-1 row-cols-lg-2 mb-2'>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Title</label>
                            <input type="text" name='title' className="form-control" defaultValue={loadedEvent.eventTitle} />
                        </div>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Date</label>
                            <input type="date" name='date' className="form-control" defaultValue={loadedEvent.eventDate} />
                        </div>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Description</label>
                            <textarea className="form-control" name="description" defaultValue={loadedEvent.description} cols="10" rows="2"></textarea>
                        </div>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Banner</label>
                            <input type="file" name='banner' onChange={(e) => setImage(e.target.files[0])} className="form-control" required/>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Update Event" />
                    <button onClick={() => navigate(-1)} className='btn btn-danger ms-3'>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;