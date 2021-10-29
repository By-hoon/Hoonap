import React, { useState, useEffect } from "react";
import Router from "Components/Router";
import GlobalStyles from "./GlobalStyles";
import { authService, dbService } from "fbase";

const App = () => {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(true);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                dbService.doc(`userInfo/${user.uid}`).onSnapshot((snapshot) => {
                    const profileImg = snapshot.data();
                    setUserObj({
                        displayName: user.displayName,
                        profileImg: profileImg.profileAttachment,
                        uid: user.uid,
                        updateProfile: (args) => user.updateProfile(args),
                    });
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {init ? (
                <>
                    <Router
                        refreshUser={refreshUser}
                        isLoggedIn={Boolean(userObj)}
                        userObj={userObj}
                    />
                </>
            ) : (
                "Initializing..."
            )}
            <GlobalStyles />
        </>
    );
}

export default App;