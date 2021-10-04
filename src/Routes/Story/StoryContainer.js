import React from "react";
import StoryPresenter from "./StoryPresenter";

import { dbService } from "fbase";

export default class extends React.Component {
    state = {
        storyObj: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
        } = this.props;
        try {
            const storyData = await dbService.doc(`story_box/${id}`).get();
            const storyObj = storyData.data();
            this.setState({
                storyObj,
            });
        }
        catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ loading: false });
        }
    }
    render() {
        const { storyObj, error, loading } = this.state;
        return (
            <StoryPresenter
                error={error}
                loading={loading}
                storyObj={storyObj}
            />
        )
    }
}