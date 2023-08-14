import { Link, useLoaderData, useNavigation } from "react-router-dom";

export default function FrontPage() {
  const usersData = useLoaderData() as Array<Record<string, string>> | null;
  const navState = useNavigation().state;

  return (
    <div
      className={navState === "loading" ? "transition-opacity opacity-25" : ""}
    >
      <header className="my-16 text-center">
        <h1 className="font-bold text-3xl mb-2">Real Front End Tech Screen</h1>
        <div>Click a user to see their info!</div>
      </header>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8">
        {usersData ? (
          usersData.map((user) => {
            return (
              <Link
                to={`/users/${user.login}`}
                state={{ user: user.login, avatar: user.avatar_url }}
                className="flex flex-row border border-black rounded-md px-4 py-2 bg-slate-200"
                key={user.id}
              >
                <img
                  className="rounded-md"
                  src={user.avatar_url}
                  height="50px"
                  width="50px"
                />
                <div className="ml-2 mt-2">{user.login}</div>
              </Link>
            );
          })
        ) : (
          <div>User data not available. Please try again later</div>
        )}
      </div>
    </div>
  );
}
