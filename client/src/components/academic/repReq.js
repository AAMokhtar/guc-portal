import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function getRequests()
{
    let res = [
        {objectID: "438577463", senderID: "43247548357", receiverID: "4yu453y8543", status: "Pending", comment: "kjdlksfjal;dkdjfsdsal", replacement: {replacementDay: new Date(2020, 5, 6), replacementSlot: {slot: {weekday: "Monday", number: "Second", location: "47587389435", course: "3234758295749", staffID: "ac-3"}}}, sentDate: new Date(2020, 5, 12), responseDate: null},
        {objectID: "676458933", senderID: "43247548357", receiverID: "4yu453y8543", status: "Accepted", comment: "adskfjhdaskljfhdslkjahfjldsajh", replacement: {replacementDay: new Date(2020, 5, 6), replacementSlot: {slot: {weekday: "Tuesday", number: "First", location: "47587389435", course: "3234758295749", staffID: "ac-4"}}}, sentDate: new Date(2020, 5, 12), responseDate: new Date(2021, 1, 1)},
        {objectID: "943789587", senderID: "43247548357", receiverID: "4yu453y8543", status: "Rejected", comment: "dfasndhsakljdhflkahdflkadsf", replacement: {replacementDay: new Date(2020, 5, 6), replacementSlot: {slot: {weekday: "Sunday", number: "Fifth", location: "47587389435", course: "3234758295749", staffID: "ac-8"}}}, sentDate: new Date(2020, 5, 12), responseDate: new Date(2021, 1, 1)}
    ]

    return res;
}

function filterRequests(requests)
{
    const n = requests.length;

    let pending = [];
    let accepted = [];
    let rejected = [];

    for(let i=0; i<n; i++)
    {
        const req = requests[i];

        if(req.status === "Pending")
            pending.push(req);
        else if(req.status === "Accepted")
            accepted.push(req);
        else if(req.status === "Rejected")
            rejected.push(req);
    }

    const res = {p: pending, a: accepted, r: rejected};

    return res;
}

function PendingItem({req, index, func})
{
    const{addAccepted, removePending, addRejected} = func;

    const updateAcc = (req, index) => {
        removePending(index);
        addAccepted(req);
    }

    const updateRej = (req, index) => {
        removePending(index);
        addRejected(req);
    }

    return (
        <div className="card text-white bg-primary mb-3" key={req.objectID}>
                <div className="card-body">
                    <div className="d-block mb-3">
                        <p className="d-inline">Sender: {req.senderID}</p>
                        <p className="d-inline ms-3">Course: {req.replacement.replacementSlot.slot.course}</p>
                        <p className="d-inline ms-3">Date: {req.replacement.replacementDay.toLocaleString('en-GB')}</p>
                        <p className="d-inline ms-3">Slot: {req.replacement.replacementSlot.slot.weekday} {req.replacement.replacementSlot.slot.number}</p>
                        <p className="d-inline ms-3">Sent: {req.sentDate.toLocaleString('en-GB')}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success" onClick={() => updateAcc(req, index) }>Accept</button>
                        <button className="btn btn-danger ms-3" onClick={() => updateRej(req, index) }>Reject</button>
                    </div>
                </div>
            </div>
    )
}

function Pending(props)
{
    const pending = props.pending;

    const func = props.func;

    return ( pending.length===0 ? <p style={{textAlign:"center"}}>There are no pending requests</p> :
        pending.map( (req, i) => 
            <PendingItem req={req} index={i} func={func}/> 
        )
    );
}

function AcceptedItem({req})
{
    return (
        <div className="card text-white bg-primary mb-3" key={req.objectID}>
                <div className="card-body">
                    <div className="d-block mb-3">
                        <p className="d-inline">Sender: {req.senderID}</p>
                        <p className="d-inline ms-3">Course: {req.replacement.replacementSlot.slot.course}</p>
                        <p className="d-inline ms-3">Date: {req.replacement.replacementDay.toLocaleString('en-GB')}</p>
                        <p className="d-inline ms-3">Slot: {req.replacement.replacementSlot.slot.weekday} {req.replacement.replacementSlot.slot.number}</p>
                        <p className="d-inline ms-3">Sent: {req.sentDate.toLocaleString('en-GB')}</p>
                        <p className="d-inline ms-3">Response: {req.responseDate.toLocaleString('en-GB')}</p>
                    </div>
                </div>
            </div>
    )
}

function Accepted(props)
{
    const accepted = props.accepted;

    return ( accepted.length===0 ? <p style={{textAlign:"center"}}>There are no accepted requests</p> :
        accepted.map( req => 
           <AcceptedItem req={req}/>
        )
    )
}

function RejectedItem({req})
{
    return (
        <div className="card text-white bg-primary mb-3" key={req.objectID}>
                <div className="card-body">
                    <div className="d-block mb-3">
                        <p className="d-inline">Sender: {req.senderID}</p>
                        <p className="d-inline ms-3">Course: {req.replacement.replacementSlot.slot.course}</p>
                        <p className="d-inline ms-3">Date: {req.replacement.replacementDay.toLocaleString('en-GB')}</p>
                        <p className="d-inline ms-3">Slot: {req.replacement.replacementSlot.slot.weekday} {req.replacement.replacementSlot.slot.number}</p>
                        <p className="d-inline ms-3">Sent: {req.sentDate.toLocaleString('en-GB')}</p>
                        <p className="d-inline ms-3">Response: {req.responseDate.toLocaleString('en-GB')}</p>
                    </div>
                </div>
            </div>
    )
}

function Rejected(props)
{
    const rejected = props.rejected;

    return ( rejected.length===0 ? <p style={{textAlign:"center"}}>There are no rejected requests</p> :
       rejected.map( req => 
            <RejectedItem req={req}/>
        )
    )
}



function Replacement()
{
    const requests = getRequests();
    const [pending, setPending] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);

    const [addReq, setAddReq] = useState(false);

    //Mount 
    useEffect( () => {
        const {p, a, r} = filterRequests( requests );
        setPending(p);
        setAccepted(a);
        setRejected(r);
    }, []);

    //TODO: mongoose
    const addAccepted = (req) => {
        req.responseDate = new Date();
        setAccepted( [...accepted, req] );
    }
    const removePending = (i) => {
        pending.splice(i,1);
        setPending(pending);
    }
    
    const addRejected = (req) => {
        req.responseDate = new Date();
        setRejected( [...rejected, req] );
    }

    const vals = {
        addAccepted: addAccepted,
        removePending: removePending,
        addRejected: addRejected
    }
;
    
    return (
        <div className="m-5">
            <h4 className="mb-4">Replacement Request</h4>
        <div className="d-flex justify-content-center m-4">
            <Link className="btn btn-success" to="/academic/send-replacement">Send Replacement</Link>
        </div>
        <div>
            <h5>Pending</h5>
            <Pending pending= {pending} func={vals}/>
        </div>

        <div>
            <h5>Accepted</h5>
            <Accepted accepted={accepted}/>
        </div>

        <div>
            <h5>Rejected</h5>
            <Rejected rejected={rejected}/>
        </div>
        </div>
    )
}

export default Replacement;