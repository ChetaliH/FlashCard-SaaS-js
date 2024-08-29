'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { Grid, Card, CardActionArea, CardContent, Container, Typography, Box } from "@mui/material";

export default function Flashcards() {
    const [flashcardCollections, setFlashcardCollections] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        async function getFlashcardCollections() {
            if (!user) {
                console.log("User is not authenticated");
                return;
            }

            console.log("Fetching flashcard collections for user:", user.uid);

            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const collections = userData.flashcards || [];
                    setFlashcardCollections(collections);
                    console.log("Flashcard collections fetched:", collections);
                } else {
                    console.log("No user document found!");
                }
            } catch (error) {
                console.error("Error fetching flashcard collections:", error);
            }
        }

        if (!loading) {
            getFlashcardCollections();
        }
    }, [user, loading]);

    const handleCollectionClick = async (id) => {
        setSelectedCollectionId(id);

        try {
            const userDocRef = doc(db, 'users', user.uid);
            const flashcardsCollectionRef = collection(userDocRef, id); // Sub-collection for the selected collection
            const querySnapshot = await getDocs(flashcardsCollectionRef);

            if (!querySnapshot.empty) {
                const flashcardsData = querySnapshot.docs.map(doc => doc.data());
                setFlashcards(flashcardsData);
                router.push(`/flashcardData`);
                console.log("Flashcards fetched for collection:", id, flashcardsData);
            } else {
                console.log("No flashcards found for collection:", id);
            }
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcardCollections.length > 0 ? (
                    flashcardCollections.map((collection) => (
                        <Grid item xs={12} sm={6} md={4} key={collection.id}>
                            <Card>
                                <CardActionArea onClick={() => handleCollectionClick(collection.id)}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {collection.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" component="div" sx={{ mt: 4 }}>
                        No flashcard collections found.
                    </Typography>
                )}
            </Grid>

            {selectedCollectionId && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Flashcards in Collection
                    </Typography>
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
                </Box>
            )}
        </Container>
    );
}
