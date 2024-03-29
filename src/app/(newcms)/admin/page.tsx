import Link from "next/link";
export default async function Page() {
  const scopes = ["read:user", "user:email", "repo"];

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.append("client_id", process.env.GITHUB_ID ?? "");
  url.searchParams.append("scope", scopes.join(","));

  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Welcome to the Admin Panel</h1>

      <div className="grid grid-cols-2 text-center mt-20">
        <div className="col-span-2">
          <Link href={url.toString()}>Click to Login with GitHub</Link>
        </div>
      </div>
    </div>
  );
}
