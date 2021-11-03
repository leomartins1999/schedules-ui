import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner";

import Accordion from "react-bootstrap/Accordion"
import { useState } from "react";
import { useHistory } from "react-router";

function handleSubmit(event, args, functions) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    createSchedule(args, functions)
}

async function createSchedule({ name, file }, { setLoading, createSchedule, redirectTo }) {
    setLoading(true)

    const resp = await createSchedule(name, file)

    if (resp.status === "SUCCESS") redirectTo(`/schedules/${resp.value}`);
    else {
        console.log("Error creating schedule!");
        setLoading(false)
    }
}

function CreateScheduleForm({ service }) {
    const history = useHistory()

    const [name, setName] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false);

    const args = {
        name: name,
        file: file
    }

    const functions = {
        createSchedule: service.createSchedule,
        setLoading: setLoading,
        redirectTo: history?.push
    }

    return (
        <Accordion className="pt-2 pb-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Upload new Schedule</Accordion.Header>
                <Accordion.Body>
                    <Form className="pt-1" onSubmit={(e) => handleSubmit(e, args, functions)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Schedule name</Form.Label>
                            <Form.Control type="text" placeholder="Enter schedule name" onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>File</Form.Label>
                            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
                        </Form.Group>
                        {
                            loading ? <Spinner animation="border" /> : <Button variant="primary" type="submit">Create Schedule</Button>
                        }
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default CreateScheduleForm
