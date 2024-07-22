import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

const NoteForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/newNote', { title, note });
            setSuccess('Note saved successfully!');
            setTitle('');
            setNote('');
            setError(null);
        } catch (err) {
            setError('Failed to save note');
            setSuccess(null);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create a New Note
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Note"
                    variant="outlined"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    margin="normal"
                    required
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="primary">{success}</Typography>}
            </form>
        </Container>
    );
};

export default NoteForm;
