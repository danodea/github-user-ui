import { Link, useLoaderData, useLocation } from "react-router-dom";

export default function UserDetails() {
  const { followerData, orgData, repoData } = useLoaderData() as Record<
    string,
    Record<string, string>[]
  >;

  const { user, avatar } = useLocation().state;

  return (
    <>
      <header className="my-8">
        <img
          className="rounded-md m-auto"
          src={avatar}
          height="150px"
          width="150px"
        />
        <h1 className="text-3xl text-center text-gray-600">{user}</h1>
      </header>
      <div className="flex flex-col gap-16">
        <div id="repos">
          <h2 className="text-center font-bold text-xl mb-4">Repos</h2>
          {repoData?.length ? (
            <ul className="md:columns-2">
              {repoData.map((repo) => {
                return (
                  <li className="flex flex-row" key={repo.id}>
                    <a href={repo.html_url}>
                      <span className="font-semibold">{repo.name} </span>
                      {repo.description ? `- ${repo.description}` : ""}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center">This user has no public repos.</div>
          )}
        </div>
        <div className="flex flex-col gap-12 md:flex-row md:gap-24 md:mb-4 md:justify-around">
          <div id="orgs">
            <h2 className="text-center font-bold text-xl">Organizations</h2>
            {orgData?.length ? (
              <ul className="space-y-4 space-x-4 columns-2">
                {orgData.map((org) => {
                  return (
                    <li className="flex flex-row" key={org.id}>
                      <img
                        height="50px"
                        width="50px"
                        className="rounded-md mr-2"
                        src={org.avatar_url}
                      />
                      <span className="mt-2">{org.login}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center">
                This user has no public organizations.
              </div>
            )}
          </div>
          <div id="followers">
            <h2 className="text-center font-bold text-xl">Top 5 Followers</h2>
            {followerData?.length ? (
              <ul>
                {followerData.slice(0, 5).map((follower) => {
                  return (
                    <li className="text-center font-semibold" key={follower.id}>
                      <a href={follower.html_url}>{follower.login}</a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center">
                This user has no public followers.
              </div>
            )}
          </div>
        </div>
        <footer className="text-center mb-16 font-semibold text-xl">
          <Link
            className="border border-black rounded-md px-4 py-2 bg-slate-200"
            to="/"
          >
            Home
          </Link>
        </footer>
      </div>
    </>
  );
}
