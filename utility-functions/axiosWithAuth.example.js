import React from "react";

import axiosWithAuth, { axiosWithAuthCancellable } from "./axiosWithAuth";
import {
  Container,
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Link,
  Fab,
  Button,
} from "@material-ui/core";

export default class FriendsList extends React.Component {
  state = {
    friends: [],
    isLoading: true,
  };

  componentDidMount() {
    const {
      unmounted,
      isCancel,
      axiosWithAuth,
      cancelAPICall,
    } = axiosWithAuthCancellable();
    this.cancelAPICall = cancelAPICall.bind(this);

    axiosWithAuth()
      .get("/friends")
      .then(r => {
        if (unmounted()) return;
        this.setState({ friends: r.data });
        this.setState({ isLoading: false });
      })
      .catch(e => {
        !unmounted() && this.setState({ isLoading: false });
        isCancel(e) ? console.log(e.message) : console.error(e);
      });
  }

  componentWillUnmount() {
    this.cancelAPICall();
  }

  render() {
    return this.state.isLoading ? (
      <LinearProgress />
    ) : (
      <Container className="friends-list">
        {this.state.friends.map(friend => (
          <FriendCard
            key={friend.id}
            {...friend}
            setFriends={friends => this.setState({ friends })}
          />
        ))}
      </Container>
    );
  }
}

export function FriendCard(props) {
  const [editing, setEditing] = React.useState(false);
  const [state, setState] = React.useState(props);
  function toggleEditing() {
    setEditing(!editing);
  }

  function updateFriend({ name, age, email }) {
    axiosWithAuth()
      .put(`/friends/${state.id}`, { name, age, email })
      .then(r => setState(r.data.find(x => x.id === state.id)))
      .catch(console.error);
  }

  function deleteFriend() {
    axiosWithAuth()
      .delete(`/friends/${state.id}`)
      //.then(r => { console.log(r); return r; })
      .then(r => props.setFriends(r.data))
      .catch(console.error);
  }

  return (
    <Card className="friend-card">
      <CardContent>
        {editing ? (
          <>
            <FriendForm
              {...state}
              editingExisting={true}
              toggleEditing={toggleEditing}
              submitForm={updateFriend}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteFriend}
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Fab size="small" style={{ float: "right" }}>
              <EditIcon onClick={toggleEditing} />
            </Fab>
            <Typography variant="h3">{state.name}</Typography>
            <Typography>Age: {state.age}</Typography>
            <Link href={`mailto:${state.email}`}>{state.email}</Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
