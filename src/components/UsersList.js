import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [dofetchUsers, isLoadingUser, loadingUserError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dofetchUsers();
  }, [dofetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUser) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUserError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} primary onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && "Error Creating User"}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
