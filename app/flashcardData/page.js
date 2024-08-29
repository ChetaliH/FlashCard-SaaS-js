'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRouter } from 'next/navigation';
import { Grid, Card, CardContent, Typography, Container, Box } from "@mui/material";

export default function FlashcardDataPage() {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchFlashcards() {
            // Check if router.query.id is defined
            const collectionId = router.query.id;

            if (!collectionId) {
                console.log("No collectionId in query parameters.");
                setLoading(false);
                return;
            }

            try {
                // Assuming 'USER_ID' should be dynamically determined
                const userId = 'USER_ID'; // Replace this with the actual user ID or context
                const flashcardsCollectionRef = collection(db, 'users', userId, collectionId);
                const querySnapshot = await getDocs(flashcardsCollectionRef);

                if (!querySnapshot.empty) {
                    const flashcardsData = querySnapshot.docs.map(doc => doc.data());
                    setFlashcards(flashcardsData);
                    console.log("Flashcards fetched for collection:", collectionId, flashcardsData);
                } else {
                    console.log("No flashcards found for collection:", collectionId);
                }
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            } finally {
                setLoading(false);
            }
        }

        // Ensure router.query.id is available before calling fetchFlashcards
        if (router.query && router.query.id) {
            fetchFlashcards();
        }
    }, [router.query]);

    if (loading) {
        return <Typography variant="h6" component="div">Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Flashcards
                </Typography>
                {flashcards.length > 0 ? (
                    <Grid container spacing={2}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Front: {flashcard.front}
                                        </Typography>
                                        <Typography variant="body1" component="div">
                                            Back: {flashcard.back}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h6" component="div">
                        No flashcards found in this collection.
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
