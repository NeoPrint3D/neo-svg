import Card from "../components/Card";
function Home(props) {
  const { currentUser, users, search } = props;
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-64 h-36 carousel rounded-box carousel-vertical bg-indigo-900`}
      >
        {users && currentUser ? (
          users.docs.map((user) => {
            const userRef = user.data();
            if (
              userRef.name.toLowerCase().includes(search.toLowerCase()) &&
              userRef.uid !== currentUser.uid
            ) {
              return <div className="my-5"><Card key={userRef.uid} user={userRef} /></div>;
            }
          })
        ) : (
          <div className="flex h-full w-full justify-center items-center">
            <h5 className="text-4xl"> Sign in to see who's on</h5>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
