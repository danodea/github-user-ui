import type { Params } from "react-router-dom";

export async function UserDetailsLoader({
  params,
}: {
  params: Params<string>;
}): Promise<Record<string, any>> {
  const urls = [
    `https://api.github.com/users/${params.user}/followers`, 
    `https://api.github.com/users/${params.user}/orgs`,
    `https://api.github.com/users/${params.user}/repos`,
  ]

  const returnObj = {    
    followerData: {},
    orgData: {},
    repoData: {},
  }

  try {
    await Promise.all(urls.map((url) => fetch(url).then(res => res.json())))
    .then((data) => {
      returnObj.followerData = data[0];
      returnObj.orgData = data[1];
      returnObj.repoData = data[2];
    })
  }

  catch {
    console.error('A network error occured while loading the user data')
  }

  finally {
    return returnObj
  }
}
  

  export async function FrontPageLoader(): Promise<Array<Record<string,string>> | null>{
  try {
    const usersResponse = await fetch(
      'https://api.github.com/users'
    );
    if (!usersResponse.ok) {
      throw new Error("Network response was not OK");
    }
    const usersData = await usersResponse.json();
    return usersData;
  }
  catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }

}